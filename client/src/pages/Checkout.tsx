import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLocation } from "wouter";
import { ordersApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Shipping Address
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    // Payment Information
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order with shipping address (we accept any credit card info)
      const shippingAddress = `${formData.fullName}, ${formData.addressLine1}${
        formData.addressLine2 ? ", " + formData.addressLine2 : ""
      }, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`;

      // Convert cart items to order items format
      const orderItems = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      await ordersApi.create(shippingAddress, orderItems);

      // Clear the cart
      await clearCart();

      toast({
        title: "Order Placed Successfully!",
        description: `Your order of $${totalPrice.toFixed(2)} has been confirmed.`,
      });

      // Redirect to orders page
      setLocation("/orders");
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to checkout</h2>
          <Button
            onClick={() => setLocation("/login")}
            className="bg-accent hover:bg-orange-400 text-black"
          >
            Sign in to your account
          </Button>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button
            onClick={() => setLocation("/")}
            className="bg-accent hover:bg-orange-400 text-black"
          >
            Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl font-medium mb-6">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-sm">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b">
                    1. Shipping Address
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white p-6 rounded-sm">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b">
                    2. Payment Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="bg-white p-6 rounded-sm">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-orange-400 text-black rounded-lg h-12 text-base font-medium"
                  >
                    {isSubmitting ? "Placing Order..." : "Place your order"}
                  </Button>

                  <p className="text-xs text-gray-600 mt-2 text-center">
                    By placing your order, you agree to WHAMazon's terms and conditions.
                  </p>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-5 rounded-sm sticky top-4">
                <h2 className="text-lg font-bold mb-4 pb-3 border-b">
                  Order Summary
                </h2>

                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="flex-1 truncate pr-2">
                        {item.product.title} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className="text-green-700 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Order Total:</span>
                    <span className="text-[#B12704]">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
