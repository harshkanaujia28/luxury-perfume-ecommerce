"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Edit, Trash2, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AddProductForm from "./add-product-form";
import UpdateProductDialog from "./update-product-dialog";
import ProductDetailsDialog from "@/app/admin/products/[id]/page";
import { useApi } from "@/contexts/api-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProductManagement() {
  const { getProducts, deleteProduct, editProduct } = useApi();
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const productsPerPage = 10;

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const data = await getProducts();

    // Sort newest first by createdAt date
    const sortedData = [...data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setProducts(sortedData);
    console.log(sortedData);
  } catch (err) {
    console.error("Failed to fetch products", err);
  }
};

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({ title: "Product deleted", description: "Product has been deleted successfully." });
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const handleOpenDetails = (id: string) => {
    setSelectedProductId(id);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-sm text-gray-600">Manage your products here</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black hover:bg-gray-600 text-white ">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <AddProductForm onProductAdded={fetchProducts} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Product Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Brand</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Gender</th>
                  <th className="text-left py-3 px-4">SubCategory</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={
                              Array.isArray(product.images) && product.images.length > 0
                                ? product.images[0].startsWith("http")
                                  ? product.images[0]
                                  : `NEXT_PUBLIC_API_URL${product.images[0]}`
                                : "/placeholder.svg"
                            }
                            alt={product.name || "Product Image"}
                            width={40}
                            height={40}
                            className="rounded-lg"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.brand}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{product.category?.type || "No Type"}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{product.category?.gender || "No Gender"}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{product.category?.subCategory || "No SubCategory"}</Badge>
                      </td>
                      <td className="py-3 px-4">₹{product.price}</td>
                      <td className="py-3 px-4">
                        <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleOpenDetails(product._id)}>
                            <Eye className="w-4 h-4" />
                          </Button>

                          <UpdateProductDialog
                            product={product}
                            onUpdate={(updatedProduct) => {
                              setProducts((prev) =>
                                prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
                              );
                              toast({
                                title: "Product updated",
                                description: `${updatedProduct.name} was updated successfully.`,
                              });
                            }}
                            trigger={
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            }
                          />

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        productId={selectedProductId || ""}
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false);
            setSelectedProductId(null);
          }
        }}
      />
    </div>
  );
}
