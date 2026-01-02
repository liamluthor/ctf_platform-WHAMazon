import { Layout } from "@/components/layout/Layout";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";
import { Star, ShoppingCart, MapPin, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getById(id!),
    enabled: !!id,
  });

  const handleAddToCart = async () => {
    if (!user) {
      setLocation("/login");
      return;
    }

    setIsAddingToCart(true);
    try {
      await addItem(product!.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product!.title} added to your cart.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      setLocation("/login");
      return;
    }

    setIsAddingToCart(true);
    try {
      await addItem(product!.id, quantity);
      setLocation("/checkout");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        variant: "destructive",
      });
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Loading product...</div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => setLocation("/")}>Return to Home</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const price = Number(product.price);
  const rating = Number(product.rating);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm mb-4">
          <a href="/" className="text-[#007185] hover:text-[#C7511F] hover:underline">
            Home
          </a>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-700">{product.category}</span>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-700">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg border border-gray-200 sticky top-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-contain max-h-[500px]"
              />
            </div>
          </div>

          {/* Middle Column - Details */}
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-normal mb-2">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <span className="text-[#007185] text-sm mr-1">{rating.toFixed(1)}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? "fill-[#FFA41C] text-[#FFA41C]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer">
                {product.reviews} ratings
              </span>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-4">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-sm text-gray-700">Price:</span>
                <span className="text-3xl text-[#B12704]">
                  ${Math.floor(price)}
                  <span className="text-lg align-super">{price.toFixed(2).split('.')[1]}</span>
                </span>
              </div>

              {product.isWham && (
                <div className="mb-4">
                  <span className="inline-block bg-[#232f3e] text-white px-2 py-1 text-xs font-bold">
                    WHAM! EXCLUSIVE
                  </span>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="mb-6">
              <h2 className="font-bold text-lg mb-2">About this item</h2>
              <p className="text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Truck className="w-5 h-5 text-[#007185] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">FREE delivery</span>
                  <span className="text-gray-600"> on orders over $35</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#007185] flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Ships worldwide</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-[#007185] flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">30-day return policy</span>
              </div>
            </div>
          </div>

          {/* Right Column - Buy Box */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-300 rounded-lg p-4 sticky top-4">
              <div className="mb-4">
                <span className="text-3xl text-[#B12704]">
                  ${Math.floor(price)}
                  <span className="text-lg align-super">{price.toFixed(2).split('.')[1]}</span>
                </span>
              </div>

              <div className="text-sm mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">FREE Returns</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">FREE delivery</span>
                  <span className="font-medium">Tomorrow</span>
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-300">
                <div className="flex items-center gap-2 text-[#007600] text-sm font-medium mb-2">
                  <span className="text-lg">✓</span>
                  <span>In Stock</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e77600] focus:border-transparent"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-normal rounded-full h-10 shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={isAddingToCart}
                  className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-gray-900 font-normal rounded-full h-10 shadow-sm"
                >
                  Buy Now
                </Button>
              </div>

              <div className="mt-4 text-xs text-gray-600">
                <p className="mb-1">Ships from: WHAM!.com</p>
                <p>Sold by: WHAM!.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
