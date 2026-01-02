import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useLocation } from "wouter";

export default function Orders() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getUserOrders,
    enabled: !!user,
  });

  if (!user) {
    return (
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your orders</h2>
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

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
          Loading your orders...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <Card key={order.id}>
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 text-xs mb-1">ORDER PLACED</p>
                        <p className="font-medium">
                          {format(new Date(order.createdAt), "MMMM d, yyyy")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1">TOTAL</p>
                        <p className="font-medium">${order.totalAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1">SHIP TO</p>
                        <p className="font-medium text-[#007185] hover:text-[#C7511F] cursor-pointer truncate">
                          {order.shippingAddress.split(",")[0]}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 text-xs mb-1">ORDER # {order.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">
                          {order.status === "pending" && "Order Pending"}
                          {order.status === "processing" && "Processing"}
                          {order.status === "shipped" && "Shipped"}
                          {order.status === "delivered" && "Delivered"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {order.status === "delivered"
                            ? `Delivered on ${format(new Date(order.createdAt), "EEEE, MMMM d")}`
                            : "Your order is being processed"}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex gap-4 border-t pt-4 first:border-t-0 first:pt-0">
                          <div className="w-[100px] h-[100px] flex-shrink-0 bg-gray-50 flex items-center justify-center p-2">
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{item.product.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              ${item.price} each
                            </p>
                          </div>
                          <div className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => setLocation("/")}
                            >
                              Buy it again
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-600" />
                        <div>
                          <p className="font-medium mb-1">Shipping Address</p>
                          <p className="text-gray-600">{order.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't placed any orders yet.
                </p>
                <Button
                  onClick={() => setLocation("/")}
                  className="bg-accent hover:bg-orange-400 text-black"
                >
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
