import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Cart() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { items, isLoading, updateQuantity, removeItem, totalItems, totalPrice } = useCart();

  if (!user) {
    return (
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Shopping Cart is empty</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your cart.</p>
          <Link href="/login">
            <a>
              <Button className="bg-accent hover:bg-orange-400 text-black">
                Sign in to your account
              </Button>
            </a>
          </Link>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
          Loading your cart...
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-sm">
            <h1 className="text-2xl font-medium mb-4">Your WHAMazon Cart is empty</h1>
            <p className="text-sm mb-4">
              <Link href="/">
                <a className="text-[#007185] hover:text-[#C7511F] hover:underline">
                  Shop today's deals
                </a>
              </Link>
            </p>
            <Link href="/">
              <a>
                <Button className="bg-accent hover:bg-orange-400 text-black rounded-lg px-6">
                  Continue Shopping
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white p-5 rounded-sm">
                <h1 className="text-2xl font-medium mb-4 pb-3 border-b">
                  Shopping Cart
                </h1>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b last:border-b-0"
                    >
                      {/* Product Image */}
                      <div className="w-[180px] h-[180px] flex-shrink-0 bg-gray-50 flex items-center justify-center p-2">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-medium mb-1 text-[#0F1111]">
                          {item.product.title}
                        </h3>

                        {item.product.isWham && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                            <Check className="w-4 h-4 text-orange-500" />
                            <span className="font-bold text-[#007185]">WHAM!</span>
                            <span>FREE delivery by Tomorrow</span>
                          </div>
                        )}

                        <p className="text-sm text-green-700 font-medium mb-2">
                          In Stock
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              className="px-3 py-1 hover:bg-gray-200 border-r border-gray-300"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 bg-white min-w-[50px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 hover:bg-gray-200 border-l border-gray-300"
                            >
                              +
                            </button>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#0F1111]">
                          ${item.product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t text-right">
                  <p className="text-lg">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
                    <span className="font-bold text-[#0F1111]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-5 rounded-sm sticky top-4">
                <div className="mb-4">
                  <p className="text-lg mb-2">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
                    <span className="font-bold text-[#0F1111]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>

                <Button
                  onClick={() => setLocation("/checkout")}
                  className="w-full bg-accent hover:bg-orange-400 text-black rounded-lg h-10 font-normal text-sm mb-2"
                >
                  Proceed to checkout
                </Button>

                <Link href="/">
                  <a>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 rounded-lg h-10 font-normal text-sm"
                    >
                      Continue Shopping
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
