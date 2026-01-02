import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Lock, CreditCard, User, Mail, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api";
import { format } from "date-fns";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"orders" | "account">("orders");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getUserOrders,
    enabled: !!user,
  });

  if (!user) {
    return (
      <Layout>
        <div className="max-w-[1000px] mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
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

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto w-full px-4 py-8">
        {/* Breadcrumb / Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-normal">Your Account</h1>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card
            className="hover:bg-gray-50 cursor-pointer border-gray-300 rounded-lg"
            onClick={() => setActiveTab("orders")}
          >
            <CardContent className="p-4 flex items-start gap-4">
              <Package className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="text-lg font-normal text-gray-800">Your Orders</h3>
                <p className="text-xs text-gray-500">Track, return, or buy things again</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:bg-gray-50 cursor-pointer border-gray-300 rounded-lg"
            onClick={() => setActiveTab("account")}
          >
            <CardContent className="p-4 flex items-start gap-4">
              <User className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="text-lg font-normal text-gray-800">Account Info</h3>
                <p className="text-xs text-gray-500">View your account details</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:bg-gray-50 cursor-pointer border-gray-300 rounded-lg opacity-50">
            <CardContent className="p-4 flex items-start gap-4">
              <Lock className="w-8 h-8 text-gray-400" />
              <div>
                <h3 className="text-lg font-normal text-gray-800">Login & security</h3>
                <p className="text-xs text-gray-500">Coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full border-b border-gray-200 mb-6"></div>

        {/* Content Tabs */}
        {activeTab === "orders" ? (
          <>
            {/* Order History Section */}
            <h2 className="text-2xl font-normal mb-4">Your Orders</h2>

            <div className="flex gap-1 text-sm text-blue-700 border-b border-gray-200 mb-4">
              <div className="px-4 py-2 border-b-2 border-orange-500 font-bold text-black cursor-pointer">
                Orders ({orders?.length || 0})
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">Loading your orders...</div>
            ) : orders && orders.length > 0 ? (
              <div className="flex flex-col gap-6">
                {orders.map((order: any) => (
                  <div key={order.id} className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Order Header */}
                    <div className="bg-gray-100 p-4 flex flex-col md:flex-row justify-between text-xs text-gray-600 gap-4">
                      <div className="flex gap-8">
                        <div>
                          <div className="uppercase">Order Placed</div>
                          <div className="text-gray-900">
                            {format(new Date(order.createdAt), "MMMM d, yyyy")}
                          </div>
                        </div>
                        <div>
                          <div className="uppercase">Total</div>
                          <div className="text-gray-900">${order.totalAmount}</div>
                        </div>
                        <div>
                          <div className="uppercase">Ship To</div>
                          <div className="text-blue-700 hover:underline hover:text-orange-700 cursor-pointer truncate max-w-[150px]">
                            {order.shippingAddress.split(",")[0]}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-900">
                          Order # {order.id.slice(0, 8).toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white">
                      {order.items.map((item: any, index: number) => (
                        <div
                          key={item.id}
                          className={`p-4 flex flex-col md:flex-row gap-6 ${
                            index !== order.items.length - 1 ? "border-b border-gray-200" : ""
                          }`}
                        >
                          <div className="w-full md:w-[150px] flex-shrink-0 flex items-center justify-center bg-gray-50 p-2">
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              className="max-h-24 object-contain mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1 capitalize">
                              {order.status === "pending" && "Order Pending"}
                              {order.status === "processing" && "Processing"}
                              {order.status === "shipped" && "Shipped"}
                              {order.status === "delivered" && "Delivered"}
                            </h3>

                            <a
                              href="#"
                              className="text-blue-700 hover:text-orange-700 hover:underline font-medium text-base line-clamp-2"
                            >
                              {item.product.title}
                            </a>
                            <div className="text-sm text-gray-600 mt-1">
                              Quantity: {item.quantity}
                            </div>
                            <div className="text-sm text-gray-600">
                              Price: ${item.price} each
                            </div>

                            <div className="mt-4 flex gap-2">
                              <Button
                                size="sm"
                                className="bg-accent hover:bg-orange-400 text-black border-none rounded-md shadow-sm text-xs h-8 font-normal"
                                onClick={() => setLocation("/")}
                              >
                                Buy it again
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't placed any orders yet.
                </p>
                <Button
                  onClick={() => setLocation("/")}
                  className="bg-accent hover:bg-orange-400 text-black"
                >
                  Start Shopping
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Account Information Section */}
            <h2 className="text-2xl font-normal mb-6">Account Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Details Card */}
              <Card className="border-gray-300 rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-orange-500" />
                    <h3 className="text-lg font-bold">Account Details</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-600 uppercase">Username</label>
                      <div className="text-base font-medium">{user.username}</div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600 uppercase">Email</label>
                      <div className="text-base font-medium">{user.email}</div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600 uppercase">Account Type</label>
                      <div className="text-base font-medium">
                        {user.isAdmin ? (
                          <span className="inline-flex items-center gap-1 text-blue-600">
                            <Lock className="w-4 h-4" />
                            Administrator
                          </span>
                        ) : (
                          "Standard User"
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600 uppercase">Member Since</label>
                      <div className="text-base font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {format(new Date(user.createdAt), "MMMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Statistics Card */}
              <Card className="border-gray-300 rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-6 h-6 text-orange-500" />
                    <h3 className="text-lg font-bold">Account Activity</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="text-xs text-gray-600 uppercase">Total Orders</div>
                        <div className="text-2xl font-bold">{orders?.length || 0}</div>
                      </div>
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="text-xs text-gray-600 uppercase">Total Spent</div>
                        <div className="text-2xl font-bold">
                          $
                          {orders
                            ?.reduce((sum: number, order: any) => sum + Number(order.totalAmount), 0)
                            .toFixed(2) || "0.00"}
                        </div>
                      </div>
                      <CreditCard className="w-8 h-8 text-gray-400" />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="text-xs text-gray-600 uppercase">Account Status</div>
                        <div className="text-lg font-semibold text-green-600">Active</div>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <Card className="border-gray-300 rounded-lg mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-bold">Communication Preferences</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Manage how you receive updates about your orders and promotions
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <div className="font-medium">Order Updates</div>
                      <div className="text-xs text-gray-600">
                        Receive emails about your order status
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">Enabled</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <div className="font-medium">Promotional Emails</div>
                      <div className="text-xs text-gray-600">
                        Get notified about deals and offers
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">Enabled</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}
