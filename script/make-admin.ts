import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../server/db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

async function makeAdmin() {
  const username = process.argv[2];

  if (!username) {
    console.error("Usage: npm run db:make-admin <username>");
    process.exit(1);
  }

  try {
    const result = await db
      .update(users)
      .set({ isAdmin: true })
      .where(eq(users.username, username))
      .returning();

    if (result.length === 0) {
      console.error(`User "${username}" not found`);
      process.exit(1);
    }

    console.log(`✓ User "${username}" is now an admin!`);
    console.log(`  Email: ${result[0].email}`);
    console.log(`  User ID: ${result[0].id}`);
    process.exit(0);
  } catch (error) {
    console.error("Error making user admin:", error);
    process.exit(1);
  }
}

makeAdmin();
