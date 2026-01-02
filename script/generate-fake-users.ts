import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../server/db";
import { users } from "@shared/schema";
import { hashPassword } from "../server/auth";

/**
 * Generate 20 fake users for CTF challenge
 * These users will have weak/common passwords for participants to discover
 */

const fakeUsers = [
  { username: "admin", email: "admin@whamazon.com", password: "admin123" },
  { username: "jsmith", email: "john.smith@email.com", password: "password123" },
  { username: "sarah_jones", email: "sarah.jones@email.com", password: "letmein" },
  { username: "mike_wilson", email: "mike.w@email.com", password: "qwerty123" },
  { username: "emily_brown", email: "emily.b@email.com", password: "123456" },
  { username: "david_lee", email: "david.lee@email.com", password: "password" },
  { username: "lisa_garcia", email: "lisa.garcia@email.com", password: "welcome1" },
  { username: "kevin_martin", email: "kevin.m@email.com", password: "abc123" },
  { username: "jessica_davis", email: "jessica.d@email.com", password: "iloveyou" },
  { username: "robert_taylor", email: "robert.t@email.com", password: "monkey123" },
  { username: "amanda_white", email: "amanda.w@email.com", password: "dragon" },
  { username: "chris_anderson", email: "chris.a@email.com", password: "sunshine" },
  { username: "jennifer_thomas", email: "jennifer.t@email.com", password: "princess" },
  { username: "matthew_moore", email: "matthew.m@email.com", password: "shadow" },
  { username: "ashley_jackson", email: "ashley.j@email.com", password: "master" },
  { username: "daniel_harris", email: "daniel.h@email.com", password: "trustno1" },
  { username: "lauren_clark", email: "lauren.c@email.com", password: "football" },
  { username: "ryan_lewis", email: "ryan.l@email.com", password: "baseball" },
  { username: "nicole_walker", email: "nicole.w@email.com", password: "soccer" },
  { username: "brandon_hall", email: "brandon.h@email.com", password: "whatever" },
];

async function generateFakeUsers() {
  console.log("👥 Generating 20 fake users for CTF challenge...\n");

  try {
    let created = 0;
    let skipped = 0;

    for (const userData of fakeUsers) {
      // Check if user already exists
      const existing = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, userData.username),
      });

      if (existing) {
        console.log(`⚠ User '${userData.username}' already exists, skipping...`);
        skipped++;
        continue;
      }

      // Hash password
      const hashedPassword = await hashPassword(userData.password);

      // Create user
      await db.insert(users).values({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        isAdmin: userData.username === "admin", // Make 'admin' user an admin
      });

      console.log(`✓ Created user: ${userData.username} (password: ${userData.password})`);
      created++;
    }

    console.log("\n" + "=".repeat(60));
    console.log("✓ Fake user generation complete!");
    console.log("=".repeat(60));
    console.log(`Users created: ${created}`);
    console.log(`Users skipped (already exist): ${skipped}`);
    console.log(`Total: ${created + skipped}`);

    console.log("\n📝 CTF Note:");
    console.log("These users have intentionally weak passwords for the CTF challenge.");
    console.log("The 'admin' user has elevated privileges.");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error generating users:", error);
    process.exit(1);
  }
}

generateFakeUsers();
