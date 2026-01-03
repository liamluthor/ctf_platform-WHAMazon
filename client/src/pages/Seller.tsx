import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Redirect } from "wouter";
import { Package, Plus, Trash2, DollarSign, Tag, Image } from "lucide-react";

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
}

export default function Seller() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    quantity: "0",
  });

  const { data: productsData, isLoading } = useQuery<{ products: SellerProduct[] }>({
    queryKey: ["/api/seller/products"],
    queryFn: async () => {
      const res = await fetch("/api/seller/products", {
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Not authenticated");
        }
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
    enabled: !!user,
  });

  const createProductMutation = useMutation({
    mutationFn: async (product: typeof formData) => {
      const res = await fetch("/api/seller/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/seller/products"] });
      setShowAddForm(false);
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        quantity: "0",
      });

      // Check for flag
      if (data.flag) {
        toast({
          title: "🎉 FLAG CAPTURED!",
          description: data.flag,
          duration: 10000,
        });
      } else {
        toast({
          title: "Product Added",
          description: "Your product has been submitted for review.",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/seller/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seller/products"] });
      toast({
        title: "Product Deleted",
        description: "Your product has been removed.",
      });
    },
  });

  if (authLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProductMutation.mutate(formData);
  };

  const products = productsData?.products || [];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#232f3e] to-[#37475a] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">WHAMazon Seller Central</h1>
          <p className="text-xl text-gray-300 max-w-[800px]">
            Manage your product listings and grow your business on WHAMazon's marketplace.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Tag className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.status === "pending").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <DollarSign className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.status === "approved").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Product Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#ff9900] hover:bg-[#ff9900]/90 text-black"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>
                Fill in the details below to list your product on WHAMazon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter product title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your product"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity Available</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                      <SelectItem value="Sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="Toys">Toys & Games</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="imageUrl">Product Image URL *</Label>
                  <div className="flex gap-2">
                    <Image className="w-5 h-5 text-gray-400 mt-2" />
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Provide a direct URL to your product image
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-[#ff9900] hover:bg-[#ff9900]/90 text-black"
                    disabled={createProductMutation.isPending}
                  >
                    {createProductMutation.isPending ? "Adding..." : "Add Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>Manage your product listings</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No products yet. Click "Add New Product" to get started!
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    {/* VULNERABLE: Rendering imageUrl without sanitization */}
                    <div
                      className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: `<img src="${product.imageUrl}" alt="${product.title}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/150?text=No+Image'" />` }}
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="font-medium">${product.price}</span>
                        <span className="text-gray-500">Qty: {product.quantity}</span>
                        <span className="text-gray-500">{product.category}</span>
                        <span
                          className={`px-2 py-0.5 rounded ${
                            product.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : product.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProductMutation.mutate(product.id)}
                      disabled={deleteProductMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
