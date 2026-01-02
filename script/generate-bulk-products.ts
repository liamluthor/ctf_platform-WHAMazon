import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../server/db";
import { products } from "@shared/schema";

/**
 * Generate 100 additional products across different categories
 * Uses placeholder images initially
 */

const categories = ["Electronics", "Computers", "Books", "Clothing", "Home"];

const productTemplates = {
  Electronics: [
    { base: "Wireless Mouse", variants: ["Pro", "Elite", "Gaming", "Office", "Travel"] },
    { base: "USB Cable", variants: ["USB-C", "Lightning", "Micro-USB", "Braided", "Fast Charge"] },
    { base: "Phone Case", variants: ["Silicone", "Leather", "Clear", "Rugged", "Wallet"] },
    { base: "Screen Protector", variants: ["Tempered Glass", "Privacy", "Anti-Glare", "Blue Light", "Matte"] },
    { base: "Power Bank", variants: ["10000mAh", "20000mAh", "Solar", "Wireless", "Compact"] },
    { base: "Bluetooth Speaker", variants: ["Portable", "Waterproof", "Smart", "Mini", "Premium"] },
    { base: "Webcam", variants: ["1080p", "4K", "Wide Angle", "Auto Focus", "Ring Light"] },
    { base: "Gaming Mouse Pad", variants: ["RGB", "Extended", "Wireless Charging", "Gel Wrist Rest", "Hard Surface"] },
  ],
  Computers: [
    { base: "SSD Drive", variants: ["256GB", "512GB", "1TB", "2TB", "NVMe"] },
    { base: "RAM", variants: ["8GB DDR4", "16GB DDR4", "32GB DDR4", "16GB DDR5", "64GB DDR5"] },
    { base: "Graphics Card", variants: ["RTX 4060", "RTX 4070", "RTX 4080", "RX 7800", "RTX 4090"] },
    { base: "Monitor", variants: ['24" 1080p', '27" 1440p', '32" 4K', 'Ultrawide', 'Curved Gaming'] },
    { base: "CPU Cooler", variants: ["Air Tower", "AIO 240mm", "AIO 360mm", "Low Profile", "RGB"] },
    { base: "Motherboard", variants: ["B550", "B650", "X670", "Z790", "H610"] },
    { base: "PC Case", variants: ["Mid Tower", "Full Tower", "Mini ITX", "Mesh Front", "Tempered Glass"] },
    { base: "PSU", variants: ["650W Bronze", "750W Gold", "850W Platinum", "1000W Titanium", "Modular 650W"] },
  ],
  Books: [
    { base: "Programming Book:", variants: ["Python Crash Course", "Clean Code", "JavaScript Definitive Guide", "Design Patterns", "Algorithms Unlocked"] },
    { base: "Hacking Guide:", variants: ["Web Application Security", "Network Penetration Testing", "Reverse Engineering", "Social Engineering", "Bug Bounty Hunting"] },
    { base: "DevOps Manual:", variants: ["Docker Deep Dive", "Kubernetes in Action", "Terraform Up & Running", "CI/CD Pipelines", "Site Reliability Engineering"] },
    { base: "Database Guide:", variants: ["PostgreSQL Administration", "MongoDB Mastery", "MySQL Cookbook", "Redis Essentials", "Database Design"] },
    { base: "Tech Biography:", variants: ["Steve Jobs", "Elon Musk", "Bill Gates", "Grace Hopper", "Alan Turing"] },
  ],
  Clothing: [
    { base: "T-Shirt", variants: ["Graphic Tee", "V-Neck", "Plain Black", "Vintage Wash", "Pocket Tee"] },
    { base: "Hoodie", variants: ["Zip-Up", "Pullover", "Tech Fleece", "Oversized", "Cropped"] },
    { base: "Jeans", variants: ["Slim Fit", "Straight Leg", "Bootcut", "Distressed", "High Waisted"] },
    { base: "Sneakers", variants: ["Running", "Basketball", "Casual", "Skate", "High-Top"] },
    { base: "Hat", variants: ["Baseball Cap", "Beanie", "Bucket Hat", "Snapback", "Trucker"] },
    { base: "Jacket", variants: ["Bomber", "Denim", "Leather", "Windbreaker", "Puffer"] },
  ],
  Home: [
    { base: "Desk Lamp", variants: ["LED", "Adjustable Arm", "Wireless Charging", "RGB", "Minimalist"] },
    { base: "Office Chair", variants: ["Ergonomic", "Gaming", "Executive", "Mesh Back", "Kneeling"] },
    { base: "Desk Organizer", variants: ["Wooden", "Mesh Metal", "Drawer", "Monitor Stand", "Cable Management"] },
    { base: "Desk", variants: ["Standing", "L-Shaped", "Corner", "Glass Top", "Compact"] },
    { base: "Storage Box", variants: ["Plastic Bins", "Fabric Cubes", "Stackable", "Under Bed", "Clear Lid"] },
    { base: "Wall Art", variants: ["Canvas Print", "Metal Sign", "Neon Light", "Photo Frame", "Tapestry"] },
  ],
};

function generateProductTitle(category: string, template: any, variant: string): string {
  return `${template.base} - ${variant}`;
}

function generateProductDescription(title: string, category: string): string {
  const descriptions = [
    `Premium quality ${title.toLowerCase()} designed for everyday use. Features durable construction and modern design.`,
    `High-performance ${title.toLowerCase()} with advanced features. Perfect for professionals and enthusiasts.`,
    `Affordable ${title.toLowerCase()} without compromising on quality. Great value for money.`,
    `Top-rated ${title.toLowerCase()} with excellent reviews. Trusted by thousands of satisfied customers.`,
    `Innovative ${title.toLowerCase()} featuring cutting-edge technology. Stay ahead with the latest features.`,
    `Eco-friendly ${title.toLowerCase()} made with sustainable materials. Good for you and the planet.`,
    `Compact and portable ${title.toLowerCase()} perfect for on-the-go use. Take it anywhere.`,
    `Professional-grade ${title.toLowerCase()} built to last. Investment in quality and performance.`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generatePrice(): string {
  const prices = [9.99, 14.99, 19.99, 24.99, 29.99, 34.99, 39.99, 49.99, 59.99, 69.99, 79.99, 89.99, 99.99, 149.99, 199.99, 299.99, 399.99, 499.99, 599.99, 799.99, 999.99];
  return prices[Math.floor(Math.random() * prices.length)].toFixed(2);
}

function generateRating(): string {
  const ratings = [3.5, 3.8, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
  return ratings[Math.floor(Math.random() * ratings.length)].toFixed(1);
}

function generateReviews(): number {
  return Math.floor(Math.random() * 10000) + 100;
}

function getPlaceholderImage(category: string): string {
  const colors: Record<string, string> = {
    Electronics: "2c3e50",
    Computers: "3498db",
    Books: "e74c3c",
    Clothing: "9b59b6",
    Home: "27ae60",
  };
  const color = colors[category] || "95a5a6";
  return `https://placehold.co/600x600/${color}/ffffff?text=${encodeURIComponent(category)}`;
}

async function generateBulkProducts() {
  console.log("🏭 Generating 100 additional products...\n");

  try {
    const productsToInsert = [];
    let productId = 9; // Start after existing 8 products

    // Generate products evenly across categories
    const productsPerCategory = 20;

    for (const category of categories) {
      console.log(`Generating ${productsPerCategory} products for ${category}...`);

      const templates = productTemplates[category as keyof typeof productTemplates];
      let productCount = 0;

      while (productCount < productsPerCategory) {
        for (const template of templates) {
          if (productCount >= productsPerCategory) break;

          const variant = template.variants[productCount % template.variants.length];
          const title = generateProductTitle(category, template, variant);
          const description = generateProductDescription(title, category);
          const price = generatePrice();
          const rating = generateRating();
          const reviews = generateReviews();
          const image = getPlaceholderImage(category);
          const isWham = Math.random() > 0.7; // 30% chance of WHAM! exclusive

          productsToInsert.push({
            id: productId.toString(),
            title,
            price,
            rating,
            reviews,
            image,
            isWham,
            category,
            description,
          });

          productId++;
          productCount++;
        }
      }
    }

    console.log(`\nInserting ${productsToInsert.length} products into database...`);

    // Insert in batches of 20
    for (let i = 0; i < productsToInsert.length; i += 20) {
      const batch = productsToInsert.slice(i, i + 20);
      await db.insert(products).values(batch);
      console.log(`  Inserted ${Math.min(i + 20, productsToInsert.length)}/${productsToInsert.length} products`);
    }

    console.log("\n" + "=".repeat(60));
    console.log("✓ Bulk product generation complete!");
    console.log("=".repeat(60));
    console.log(`Total products created: ${productsToInsert.length}`);
    console.log(`Products per category: ${productsPerCategory}`);
    console.log("\nNote: Products have placeholder images.");
    console.log("Run 'npm run generate:images:unsplash' to add real images.");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error generating products:", error);
    process.exit(1);
  }
}

generateBulkProducts();
