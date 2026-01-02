import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { hashPassword } from "./auth";
import passport from "passport";
import { insertUserSchema, type User } from "@shared/schema";
import { fromError } from "zod-validation-error";

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

  return httpServer;
}
