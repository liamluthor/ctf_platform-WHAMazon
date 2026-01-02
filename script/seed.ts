import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../server/db";
import { products } from "@shared/schema";
import { productsToSeed } from "./product-data";

async function seed() {
  console.log("Seeding products...");

  for (const product of productsToSeed) {
    await db
      .insert(products)
      .values(product)
      .onConflictDoNothing();
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
