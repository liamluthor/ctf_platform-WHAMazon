import { db } from "./db";
import {
  type User,
  type InsertUser,
  type Product,
  type CartItem,
  type Order,
  type OrderItem,
  users,
  products,
  cartItems,
  orders,
  orderItems,
  insertCartItemSchema,
  insertOrderSchema,
  insertOrderItemSchema,
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: Omit<Product, 'createdAt'>): Promise<Product>;

  // Cart methods
  getCartItems(userId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(userId: string, productId: string, quantity: number): Promise<CartItem>;
  updateCartItemQuantity(cartItemId: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(cartItemId: string): Promise<void>;
  clearCart(userId: string): Promise<void>;

  // Order methods
  createOrder(order: z.infer<typeof insertOrderSchema>, items: Omit<z.infer<typeof insertOrderItemSchema>, "orderId">[]): Promise<Order>;
  getUserOrders(userId: string): Promise<(Order & { items: (OrderItem & { product: Product })[] })[]>;
  getAllOrders(): Promise<(Order & { user: User, items: (OrderItem & { product: Product })[] })[]>;
  getOrder(orderId: string): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined>;
}

export class PostgresStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async createProduct(product: Omit<Product, 'createdAt'>): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  // Cart methods
  async getCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    const result = await db
      .select()
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId));

    return result.map(row => ({
      ...row.cart_items,
      product: row.products!,
    }));
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<CartItem> {
    // Check if item already exists in cart
    const existing = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
      .limit(1);

    if (existing.length > 0) {
      // Update quantity
      const result = await db
        .update(cartItems)
        .set({ quantity: existing[0].quantity + quantity })
        .where(eq(cartItems.id, existing[0].id))
        .returning();
      return result[0];
    } else {
      // Insert new cart item
      const result = await db
        .insert(cartItems)
        .values({ userId, productId, quantity })
        .returning();
      return result[0];
    }
  }

  async updateCartItemQuantity(cartItemId: string, quantity: number): Promise<CartItem | undefined> {
    const result = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, cartItemId))
      .returning();
    return result[0];
  }

  async removeFromCart(cartItemId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }

  // Order methods
  async createOrder(
    order: z.infer<typeof insertOrderSchema>,
    items: Omit<z.infer<typeof insertOrderItemSchema>, "orderId">[]
  ): Promise<Order> {
    const orderResult = await db.insert(orders).values(order).returning();
    const createdOrder = orderResult[0];

    // Insert order items
    const orderItemsWithOrderId = items.map(item => ({
      ...item,
      orderId: createdOrder.id,
    }));

    await db.insert(orderItems).values(orderItemsWithOrderId);

    return createdOrder;
  }

  async getUserOrders(userId: string): Promise<(Order & { items: (OrderItem & { product: Product })[] })[]> {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));

    const ordersWithItems = await Promise.all(
      userOrders.map(async (order) => {
        const items = await db
          .select()
          .from(orderItems)
          .leftJoin(products, eq(orderItems.productId, products.id))
          .where(eq(orderItems.orderId, order.id));

        return {
          ...order,
          items: items.map(row => ({
            ...row.order_items,
            product: row.products!,
          })),
        };
      })
    );

    return ordersWithItems;
  }

  async getAllOrders(): Promise<(Order & { user: User, items: (OrderItem & { product: Product })[] })[]> {
    const allOrders = await db
      .select()
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .orderBy(desc(orders.createdAt));

    const ordersWithItems = await Promise.all(
      allOrders.map(async (row) => {
        const items = await db
          .select()
          .from(orderItems)
          .leftJoin(products, eq(orderItems.productId, products.id))
          .where(eq(orderItems.orderId, row.orders.id));

        return {
          ...row.orders,
          user: row.users!,
          items: items.map(itemRow => ({
            ...itemRow.order_items,
            product: itemRow.products!,
          })),
        };
      })
    );

    return ordersWithItems;
  }

  async getOrder(orderId: string): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined> {
    const orderResult = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (orderResult.length === 0) {
      return undefined;
    }

    const order = orderResult[0];
    const items = await db
      .select()
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, order.id));

    return {
      ...order,
      items: items.map(row => ({
        ...row.order_items,
        product: row.products!,
      })),
    };
  }
}

export const storage = new PostgresStorage();
