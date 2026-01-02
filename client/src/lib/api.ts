import type { User, Product, Order, CartItem } from "@shared/schema";

const API_BASE = "/api";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Auth API
export const authApi = {
  async register(username: string, email: string, password: string): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data.user;
  },

  async login(username: string, password: string): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data.user;
  },

  async logout(): Promise<void> {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Logout failed");
  },

  async getCurrentUser(): Promise<User | null> {
    const res = await fetch(`${API_BASE}/auth/me`);
    if (res.status === 401) return null;
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to get user");
    return data.user;
  },
};

// Products API
export const productsApi = {
  async getAll(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch products");
    return data.products;
  },

  async getById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch product");
    return data.product;
  },
};

// Cart API
export const cartApi = {
  async getItems(): Promise<(CartItem & { product: Product })[]> {
    const res = await fetch(`${API_BASE}/cart`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
    return data.cartItems;
  },

  async addItem(productId: string, quantity: number = 1): Promise<CartItem> {
    const res = await fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add to cart");
    return data.cartItem;
  },

  async updateQuantity(cartItemId: string, quantity: number): Promise<CartItem> {
    const res = await fetch(`${API_BASE}/cart/${cartItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update cart");
    return data.cartItem;
  },

  async removeItem(cartItemId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/cart/${cartItemId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to remove from cart");
    }
  },

  async clear(): Promise<void> {
    const res = await fetch(`${API_BASE}/cart`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to clear cart");
    }
  },
};

// Orders API
export const ordersApi = {
  async create(shippingAddress: string, items: { productId: string; quantity: number }[]): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress, items }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create order");
    return data.order;
  },

  async getUserOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
    return data.orders;
  },

  async getById(id: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch order");
    return data.order;
  },
};

// Admin API
export const adminApi = {
  async getUsers(): Promise<Omit<User, "password">[]> {
    const res = await fetch(`${API_BASE}/admin/users`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch users");
    return data.users;
  },

  async getAllOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/admin/orders`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
    return data.orders;
  },
};
