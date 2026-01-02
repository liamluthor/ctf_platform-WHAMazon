import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../server/db";
import { products } from "@shared/schema";
import { eq } from "drizzle-orm";

/**
 * This script generates AI product images using free APIs
 * We'll use Unsplash API for stock photos based on product categories
 *
 * To use:
 * 1. Get a free Unsplash API key from https://unsplash.com/developers
 * 2. Add UNSPLASH_ACCESS_KEY to your .env file
 * 3. Run: npm run generate:images
 */

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
}

async function searchUnsplashImage(query: string): Promise<string | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.warn("⚠ UNSPLASH_ACCESS_KEY not set. Using placeholder images instead.");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=squarish`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const image: UnsplashImage = data.results[0];
      return image.urls.regular;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image for "${query}":`, error);
    return null;
  }
}

/**
 * Generate a placeholder image URL using a free service
 * This doesn't require an API key
 */
function getPlaceholderImage(productName: string, category: string): string {
  // Use a combination of services for variety
  const encodedName = encodeURIComponent(productName);
  const categoryColor = getCategoryColor(category);

  // Using placeholder.com with custom styling
  return `https://placehold.co/600x600/${categoryColor}/ffffff?text=${encodedName.slice(0, 30)}`;
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Electronics: "2c3e50",
    Computers: "3498db",
    Books: "e74c3c",
    Clothing: "9b59b6",
    Home: "27ae60",
    Kitchen: "f39c12",
    default: "95a5a6",
  };

  return colors[category] || colors.default;
}

/**
 * Get search query for AI image generation based on product details
 */
function getImageSearchQuery(product: any): string {
  const title = product.title.toLowerCase();

  // Extract key product type from title
  if (title.includes("laptop") || title.includes("book pro")) {
    return "laptop computer on desk";
  } else if (title.includes("mouse")) {
    return "wireless computer mouse";
  } else if (title.includes("keyboard")) {
    return "mechanical keyboard";
  } else if (title.includes("monitor")) {
    return "computer monitor display";
  } else if (title.includes("headphones") || title.includes("airpods")) {
    return "wireless headphones";
  } else if (title.includes("charger") || title.includes("cable")) {
    return "usb charging cable";
  } else if (title.includes("book")) {
    return "stack of books library";
  } else if (title.includes("ssd") || title.includes("storage")) {
    return "solid state drive";
  }

  // Fallback to category
  return product.category.toLowerCase();
}

async function generateProductImages() {
  console.log("🎨 Starting product image generation...\n");

  try {
    // Get all products from database
    const allProducts = await db.select().from(products);

    console.log(`Found ${allProducts.length} products to process\n`);

    let successCount = 0;
    let placeholderCount = 0;

    for (const product of allProducts) {
      console.log(`Processing: ${product.title}`);

      // Check if product already has a non-placeholder image
      if (product.image && !product.image.includes("placehold.co")) {
        console.log(`  ✓ Already has image, skipping\n`);
        continue;
      }

      // Get search query for this product
      const searchQuery = getImageSearchQuery(product);
      console.log(`  Searching for: "${searchQuery}"`);

      // Try to get image from Unsplash
      const imageUrl = await searchUnsplashImage(searchQuery);

      let finalImageUrl: string;

      if (imageUrl) {
        finalImageUrl = imageUrl;
        successCount++;
        console.log(`  ✓ Found Unsplash image`);
      } else {
        // Fallback to placeholder
        finalImageUrl = getPlaceholderImage(product.title, product.category);
        placeholderCount++;
        console.log(`  ⚠ Using placeholder image`);
      }

      // Update product in database
      await db
        .update(products)
        .set({ image: finalImageUrl })
        .where(eq(products.id, product.id));

      console.log(`  ✓ Updated database`);

      // Rate limiting - wait 3 seconds between API requests to avoid abuse
      if (imageUrl && allProducts.indexOf(product) < allProducts.length - 1) {
        console.log(`  ⏱️  Sleeping 3000ms for rate limit...\n`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        console.log("");
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("✓ Image generation complete!");
    console.log("=".repeat(60));
    console.log(`Total products processed: ${allProducts.length}`);
    console.log(`Unsplash images: ${successCount}`);
    console.log(`Placeholder images: ${placeholderCount}`);
    console.log("\nTo use real AI-generated images:");
    console.log("1. Sign up for free at https://unsplash.com/developers");
    console.log("2. Get your Access Key");
    console.log("3. Add to .env: UNSPLASH_ACCESS_KEY=your_key_here");
    console.log("4. Run this script again");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating images:", error);
    process.exit(1);
  }
}

// Run the script
generateProductImages();
