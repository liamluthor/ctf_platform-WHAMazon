import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../server/db";
import { users } from "@shared/schema";
import { hashPassword } from "../server/auth";

/**
 * Seeds the default admin user for the WHAMazon CTF.
 * Credentials: wham_admin / WHAMazon2024!
 * 
 * This is intentionally a weak, guessable password for CTF Challenge 2.
 */
async function seedAdmin() {
  console.log("Seeding admin user...");

  const hashedPassword = await hashPassword("WHAMazon2024!");

  await db
    .insert(users)
    .values({
      id: "admin-00000-00000-00000-000000000001",
      username: "wham_admin",
      password: hashedPassword,
      email: "admin@whamazon.internal",
      isAdmin: true,
    })
    .onConflictDoNothing();

  console.log("Admin user seeded: wham_admin");
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("Error seeding admin:", error);
  process.exit(1);
});
