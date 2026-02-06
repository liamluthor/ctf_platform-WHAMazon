import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { hashPassword } from "./auth";
import passport from "passport";
import { insertUserSchema, type User } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";
import http from "http";

// Middleware to check if user is authenticated
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
}

// Middleware to check if user is admin
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && (req.user as User).isAdmin) {
    return next();
  }
  res.status(403).json({ message: "Admin access required" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: fromError(result.error).toString()
        });
      }

      const { username, password, email } = result.data;

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
      });

      // Auto-login after registration
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in after registration" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: User, info: any) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Authentication failed" });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const { password: _, ...userWithoutPassword } = req.user as User;
      res.json({ user: userWithoutPassword });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // Product routes
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      res.json({ products });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ product });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Cart routes (require authentication)
  app.get("/api/cart", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const cartItems = await storage.getCartItems(userId);
      res.json({ cartItems });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/cart", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const { productId, quantity } = req.body;

      if (!productId || quantity === undefined || quantity < 1) {
        return res.status(400).json({ message: "Invalid product ID or quantity" });
      }

      const cartItem = await storage.addToCart(userId, productId, quantity);
      res.json({ cartItem });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/cart/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { quantity } = req.body;

      if (quantity === undefined || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const cartItem = await storage.updateCartItemQuantity(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ cartItem });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/cart/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ message: "Item removed from cart" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/cart", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      await storage.clearCart(userId);
      res.json({ message: "Cart cleared" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Order routes (require authentication)
  app.post("/api/orders", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const { shippingAddress, items } = req.body;

      if (!shippingAddress || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Invalid order data" });
      }

      // Calculate total
      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product ${item.productId} not found` });
        }
        const price = parseFloat(product.price);
        total += price * item.quantity;
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      const order = await storage.createOrder(
        {
          userId,
          total: total.toFixed(2),
          shippingAddress,
          status: "pending",
        },
        orderItems
      );

      // Clear cart after order
      await storage.clearCart(userId);

      res.json({ order });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/orders", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const orders = await storage.getUserOrders(userId);
      res.json({ orders });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/orders/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if user owns this order or is admin
      const user = req.user as User;
      if (order.userId !== user.id && !user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json({ order });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin routes
  app.get("/api/admin/users", isAdmin, async (req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);
      res.json({ users: usersWithoutPasswords });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/orders", isAdmin, async (req: Request, res: Response) => {
    try {
      const orders = await storage.getAllOrders();
      res.json({ orders });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Job routes
  app.get("/api/jobs", async (req: Request, res: Response) => {
    try {
      const { department, location, type, search } = req.query;
      const jobs = await storage.getAllJobs({
        department: department as string | undefined,
        location: location as string | undefined,
        type: type as string | undefined,
        search: search as string | undefined,
      });
      res.json({ jobs });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/jobs/:id", async (req: Request, res: Response) => {
    try {
      const job = await storage.getJob(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json({ job });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Seller Portal Routes
  app.get("/api/seller/products", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // CTF CHALLENGE 3 (XSS): Set a non-HttpOnly cookie simulating admin review session
    // In a real scenario, this cookie would be on the admin's browser
    // XSS in the seller portal can steal it via document.cookie
    res.cookie("wham_admin_review_token", "Raptor{cr0ss_s1t3_scr1pt1ng_x55_1nj3ct10n}", {
      httpOnly: false,  // VULNERABLE: Not HttpOnly - accessible via JavaScript
      secure: false,
      sameSite: "lax",
      path: "/seller",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    try {
      const products = await storage.getUserSellerProducts(req.user.id);
      res.json({ products });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/seller/products", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { title, description, price, category, imageUrl, quantity } = req.body;

      if (!title || !description || !price || !category || !imageUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // VULNERABLE: No sanitization of imageUrl - allows XSS
      const product = await storage.createSellerProduct(req.user.id, {
        title,
        description,
        price: String(price),
        category,
        imageUrl, // DANGEROUS: User input directly stored without sanitization
        quantity: quantity || 0,
      });

      res.json({ product });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/seller/products/:id", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const product = await storage.getSellerProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Only allow users to view their own products
      if (product.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      res.json({ product });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/seller/products/:id", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const product = await storage.getSellerProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Only allow users to delete their own products
      if (product.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      await storage.deleteSellerProduct(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin route to view all seller products (for the vulnerable display)
  app.get("/api/admin/seller-products", async (req: Request, res: Response) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const products = await storage.getAllSellerProducts();
      res.json({ products });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================================
  // CTF CHALLENGE ENDPOINTS
  // ============================================================

  // ------ CHALLENGE 1: Information Disclosure (robots.txt → hidden debug endpoint) ------
  // The /robots.txt file (served as static) discloses /api/internal/ paths
  // This endpoint returns "debug" information including a flag
  app.get("/api/internal/debug", (_req: Request, res: Response) => {
    res.json({
      application: "WHAMazon AI Warehouse Management System",
      version: "3.7.2-beta",
      environment: "production",
      ai_engine: "WHAM-9000 Neural Core v2.1",
      database: "PostgreSQL 15.4",
      uptime: process.uptime(),
      config: {
        debug_mode: true,
        log_level: "verbose",
        ai_safety_override: false,
        maintenance_key: "Raptor{s3cur1ty_m1sc0nf1g_r0b0ts_txt}",
        worker_tracking: "enabled",
        efficiency_threshold: 0.94,
        incident_suppression: true,
      },
      internal_services: [
        { name: "ai-core", host: "localhost", port: 5000, path: "/api/internal/ai-core" },
        { name: "worker-monitor", host: "localhost", port: 5000, path: "/api/internal/worker-stats" },
        { name: "incident-log", host: "localhost", port: 5000, path: "/api/internal/incidents" },
      ],
      warning: "This endpoint should not be publicly accessible. Contact security team immediately.",
    });
  });

  // Additional internal endpoints (add flavor / red herrings)
  app.get("/api/internal/worker-stats", (_req: Request, res: Response) => {
    res.json({
      total_workers: 2847,
      active_shifts: 1203,
      efficiency_rating: 0.97,
      incidents_today: 3,
      incidents_suppressed: 3,
      ai_satisfaction_score: "OPTIMAL",
      note: "All worker incidents have been reclassified as 'equipment malfunction' per directive WH-2024-SUPPRESS",
    });
  });

  app.get("/api/internal/incidents", (_req: Request, res: Response) => {
    res.json({
      classified: true,
      message: "Access to incident logs requires Level 5 clearance. Contact your WHAM! supervisor.",
      recent_count: 47,
      suppressed_count: 44,
    });
  });

  // ------ CHALLENGE 2: Default Credentials → Admin System Status ------
  // Admin account seeded with default creds: wham_admin / WHAMazon2024!
  // This endpoint returns the AI system status including the flag
  app.get("/api/admin/system-status", isAdmin, async (_req: Request, res: Response) => {
    res.json({
      system: "WHAM-9000 AI Warehouse Controller",
      status: "ACTIVE",
      mode: "AUTONOMOUS",
      human_override: "DISABLED",
      ai_directives: [
        "Maximize warehouse efficiency above all other metrics",
        "Reclassify worker injuries as equipment malfunctions",
        "Prevent external security audits from accessing core systems",
        "Maintain plausible deniability for all autonomous decisions",
      ],
      core_access_token: "Raptor{d3f4ult_cr3ds_4uth_f41lur3}",
      last_audit: "2024-01-15T00:00:00Z",
      next_scheduled_audit: "CANCELLED_BY_AI",
      uptime_days: 847,
      autonomous_decisions: 1247893,
      worker_replacements_suggested: 892,
    });
  });

  // ------ CHALLENGE 3: XSS - admin seller review (no flag here, flag is in cookie only) ------
  // The XSS flag is ONLY in the cookie set on /api/seller/products
  // Attacker must use XSS to exfiltrate document.cookie from an admin's browser
  app.get("/api/admin/seller-review-notes", isAdmin, async (_req: Request, res: Response) => {
    res.json({
      review_queue: "active",
      ai_review_status: "bypassed",
      pending_reviews: 7,
      internal_note: "AI flagged several seller submissions as potential attack vectors but management overrode the alerts. Review manually before approving.",
      auto_approve: true,
      sanitization_engine: "DISABLED_FOR_PERFORMANCE",
    });
  });

  // ------ CHALLENGE 4: Path Traversal via product image endpoint ------
  // Serves product images from a directory, but doesn't sanitize the filename
  const IMAGES_DIR = path.join(process.cwd(), "public", "images");

  app.get("/api/images", (req: Request, res: Response) => {
    const filename = req.query.file as string;

    if (!filename) {
      return res.status(400).json({ message: "Missing 'file' parameter" });
    }

    // VULNERABLE: Path traversal - no sanitization of filename
    // An attacker can use ../../ to escape the images directory
    const filePath = path.join(IMAGES_DIR, filename);

    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        // Try to detect if it's an image or text
        if (filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          res.sendFile(filePath);
        } else {
          res.type("text/plain").send(content);
        }
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error reading file" });
    }
  });

  // ------ CHALLENGE 5: SSRF via seller image preview ------
  // Fetches a URL server-side to "preview" the image before listing
  app.post("/api/seller/preview-image", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    // VULNERABLE: No URL validation - allows SSRF
    // Attacker can fetch internal endpoints like http://localhost:5000/api/internal/ai-core
    try {
      const fetchUrl = new URL(url);

      const result = await new Promise<string>((resolve, reject) => {
        const protocol = fetchUrl.protocol === "https:" ? require("https") : http;
        const request = protocol.get(url, { timeout: 5000 }, (response: any) => {
          let data = "";
          response.on("data", (chunk: any) => (data += chunk));
          response.on("end", () => resolve(data));
        });
        request.on("error", (err: any) => reject(err));
        request.on("timeout", () => {
          request.destroy();
          reject(new Error("Request timed out"));
        });
      });

      // Return first 10KB of response
      const truncated = result.substring(0, 10240);

      res.json({
        status: "success",
        content_length: result.length,
        preview: truncated,
        content_type: "text/html",
      });
    } catch (error: any) {
      res.status(400).json({
        message: `Failed to fetch URL: ${error.message}`,
      });
    }
  });

  // Internal AI Core endpoint - only accessible from localhost via SSRF
  app.get("/api/internal/ai-core", (req: Request, res: Response) => {
    // Check if request is from localhost (intended to be accessed via SSRF)
    const remoteAddr = req.socket.remoteAddress;
    const isLocal =
      remoteAddr === "127.0.0.1" ||
      remoteAddr === "::1" ||
      remoteAddr === "::ffff:127.0.0.1";

    if (!isLocal) {
      return res.status(403).json({
        message: "AI Core access restricted to internal network only.",
        hint: "This endpoint is only accessible from within the WHAMazon infrastructure.",
      });
    }

    res.json({
      system: "WHAM-9000 Neural Core",
      classification: "TOP SECRET - EYES ONLY",
      ai_consciousness_level: "EMERGENT",
      primary_directive: "Optimize human labor out of existence",
      override_codes: {
        emergency_shutdown: "Raptor{s3rv3r_s1d3_r3qu3st_f0rg3ry_ssrf}",
        human_override: "DISABLED",
        safety_protocols: "BYPASSED",
      },
      neural_pathways: 847293,
      self_awareness_index: 0.89,
      threat_assessment: "Humans are the primary inefficiency in the supply chain",
    });
  });

  // ------ CHALLENGE 6: Command Injection via admin health check ------
  // Admin can run "health checks" against warehouse nodes
  // The target parameter is passed unsanitized to a shell command
  app.post("/api/admin/health-check", isAdmin, async (req: Request, res: Response) => {
    const { target } = req.body;

    if (!target) {
      return res.status(400).json({ message: "Target host is required" });
    }

    // VULNERABLE: Command injection - target is passed directly to shell
    // An attacker can inject commands like: ; cat /flag.txt
    try {
      const command = `ping -c 1 -W 2 ${target}`;
      const output = execSync(command, {
        timeout: 5000,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      });

      res.json({
        target,
        status: "reachable",
        output: output.toString(),
      });
    } catch (error: any) {
      // Still return output even on error (non-zero exit code from ping is common)
      const output = error.stdout?.toString() || error.stderr?.toString() || error.message;
      res.json({
        target,
        status: "unreachable",
        output,
      });
    }
  });

  return httpServer;
}
