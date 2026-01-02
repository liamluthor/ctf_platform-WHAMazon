import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { Product } from "@shared/schema";

export function AdminProducts() {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
  });

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    rating: "",
    reviews: "",
    image: "",
    isWham: false,
    category: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      price: "",
      rating: "",
      reviews: "",
      image: "",
      isWham: false,
      category: "",
      description: "",
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      id: product.id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      reviews: product.reviews.toString(),
      image: product.image,
      isWham: product.isWham,
      category: product.category,
      description: product.description,
    });
    setEditingProduct(product);
    setIsAddDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show alert - we'll need to add create/update API endpoints
    alert("Product management API endpoints need to be added to the backend");
    setIsAddDialogOpen(false);
    resetForm();
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Add, edit, and manage product listings</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                  <DialogDescription>
                    {editingProduct ? "Update product details" : "Create a new product listing"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="id">Product ID</Label>
                      <Input
                        id="id"
                        value={formData.id}
                        onChange={e => setFormData({ ...formData, id: e.target.value })}
                        required
                        disabled={!!editingProduct}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rating">Rating (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={e => setFormData({ ...formData, rating: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reviews">Review Count</Label>
                      <Input
                        id="reviews"
                        type="number"
                        value={formData.reviews}
                        onChange={e => setFormData({ ...formData, reviews: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isWham"
                      checked={formData.isWham}
                      onCheckedChange={checked => setFormData({ ...formData, isWham: checked })}
                    />
                    <Label htmlFor="isWham">WHAM! Eligible (Free/Fast Shipping)</Label>
                  </div>

                  <div className="flex gap-2 justify-end pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {products && products.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">WHAM!</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
                            <div className="max-w-xs">
                              <div className="font-medium text-sm truncate">{product.title}</div>
                              <div className="text-xs text-gray-500">ID: {product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{product.category}</td>
                        <td className="px-4 py-3 text-sm font-medium">${product.price}</td>
                        <td className="px-4 py-3 text-sm">{product.rating} ({product.reviews})</td>
                        <td className="px-4 py-3">
                          {product.isWham ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-300" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(product)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => alert("Delete functionality to be implemented")}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No products found. Add your first product to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
