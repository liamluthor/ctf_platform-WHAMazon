import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, AlertTriangle } from "lucide-react";

interface SellerProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  quantity: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export function AdminSellerReview() {
  const { data: productsData, isLoading } = useQuery<{ products: SellerProduct[] }>({
    queryKey: ["/api/admin/seller-products"],
    queryFn: async () => {
      const res = await fetch("/api/admin/seller-products", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch seller products");
      return res.json();
    },
  });

  const products = productsData?.products || [];

  if (isLoading) {
    return <div className="text-center py-12">Loading seller submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Seller Product Review
              </CardTitle>
              <CardDescription>
                Review and approve third-party seller product listings
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-yellow-600">
              {products.filter(p => p.status === "pending").length} pending review
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No seller product submissions to review.
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* VULNERABLE: Rendering imageUrl without sanitization — XSS vector */}
                    <div
                      className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: `<img src="${product.imageUrl}" alt="${product.title}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/150?text=No+Image'" />`
                      }}
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{product.title}</h3>
                        <Badge
                          variant={
                            product.status === "approved"
                              ? "default"
                              : product.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {product.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Price:</span>{" "}
                          <span className="font-medium">${product.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Category:</span>{" "}
                          <span className="font-medium">{product.category}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Quantity:</span>{" "}
                          <span className="font-medium">{product.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Seller:</span>{" "}
                          <span className="font-medium">{product.user?.username || "Unknown"}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 mb-2">
                        Image URL: <code className="bg-gray-100 px-1 rounded">{product.imageUrl}</code>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI Review Notice */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">AI Auto-Review:</span>
              <span>WHAM-9000 content scanning is currently disabled for performance optimization.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
