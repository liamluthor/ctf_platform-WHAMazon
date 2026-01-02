import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../server/db";
import { users, products, orders, orderItems, cartItems } from "@shared/schema";
import * as fs from "fs";
import * as path from "path";

/**
 * Export database to SQL file for container initialization
 * This creates a clean SQL dump without any secrets
 */

async function exportDatabase() {
  console.log("📦 Exporting database for container...\n");

  const outputPath = path.join(process.cwd(), "docker", "init-db.sql");
  const outputDir = path.dirname(outputPath);

  // Create docker directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let sql = `-- WHAMazon Database Initialization
-- Auto-generated: ${new Date().toISOString()}
-- DO NOT EDIT MANUALLY
--
-- Note: Schema is created by entrypoint.sh
-- This file only contains INSERT statements for data

`;

  try {
    // Export Users
    console.log("Exporting users...");
    const allUsers = await db.select().from(users);
    sql += `-- Users (${allUsers.length} rows)\n`;
    for (const user of allUsers) {
      sql += `INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '${user.id}',
  '${user.username}',
  '${user.password.replace(/'/g, "''")}',
  '${user.email}',
  ${user.isAdmin},
  '${user.createdAt.toISOString()}'
);\n`;
    }
    sql += "\n";

    // Export Products
    console.log("Exporting products...");
    const allProducts = await db.select().from(products);
    sql += `-- Products (${allProducts.length} rows)\n`;
    for (const product of allProducts) {
      const description = product.description.replace(/'/g, "''");
      sql += `INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '${product.id}',
  '${product.title.replace(/'/g, "''")}',
  ${product.price},
  ${product.rating},
  ${product.reviews},
  '${product.image}',
  ${product.isWham},
  '${product.category}',
  '${description}',
  '${product.createdAt.toISOString()}'
);\n`;
    }
    sql += "\n";

    // Export Orders (if any)
    console.log("Exporting orders...");
    const allOrders = await db.select().from(orders);
    if (allOrders.length > 0) {
      sql += `-- Orders (${allOrders.length} rows)\n`;
      for (const order of allOrders) {
        sql += `INSERT INTO orders (id, user_id, total, status, shipping_address, created_at) VALUES (
  '${order.id}',
  '${order.userId}',
  ${order.total},
  '${order.status}',
  '${order.shippingAddress.replace(/'/g, "''")}',
  '${order.createdAt.toISOString()}'
);\n`;
      }
      sql += "\n";

      // Export Order Items
      console.log("Exporting order items...");
      const allOrderItems = await db.select().from(orderItems);
      if (allOrderItems.length > 0) {
        sql += `-- Order Items (${allOrderItems.length} rows)\n`;
        for (const item of allOrderItems) {
          sql += `INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (
  '${item.id}',
  '${item.orderId}',
  '${item.productId}',
  ${item.quantity},
  ${item.price}
);\n`;
        }
        sql += "\n";
      }
    }

    // Note: We don't export cart_items as they're user session data

    // Reset sequences
    sql += `-- Reset sequences\n`;
    sql += `SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(CAST(id AS INTEGER)) FROM users WHERE id ~ '^[0-9]+$'), true);\n`;
    sql += `SELECT setval(pg_get_serial_sequence('products', 'id'), (SELECT MAX(CAST(id AS INTEGER)) FROM products WHERE id ~ '^[0-9]+$'), true);\n`;

    // Write to file
    fs.writeFileSync(outputPath, sql, "utf-8");

    console.log("\n" + "=".repeat(60));
    console.log("✓ Database export complete!");
    console.log("=".repeat(60));
    console.log(`Output file: ${outputPath}`);
    console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
    console.log(`\nExported:`);
    console.log(`  - ${allUsers.length} users`);
    console.log(`  - ${allProducts.length} products`);
    console.log(`  - ${allOrders.length} orders`);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error exporting database:", error);
    process.exit(1);
  }
}

exportDatabase();
