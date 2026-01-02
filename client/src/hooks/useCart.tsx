import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./useAuth";
import { cartApi } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "@shared/schema";

interface CartContextType {
  items: (CartItem & { product: any })[];
  isLoading: boolean;
  addItem: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch cart items
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getItems,
    enabled: !!user,
  });

  // Add item mutation
  const addMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Update quantity mutation
  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      cartApi.updateQuantity(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Remove item mutation
  const removeMutation = useMutation({
    mutationFn: (cartItemId: string) => cartApi.removeItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Clear cart mutation
  const clearMutation = useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const addItem = async (productId: string, quantity: number) => {
    await addMutation.mutateAsync({ productId, quantity });
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    await updateMutation.mutateAsync({ cartItemId, quantity });
  };

  const removeItem = async (cartItemId: string) => {
    await removeMutation.mutateAsync(cartItemId);
  };

  const clearCart = async () => {
    await clearMutation.mutateAsync();
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
