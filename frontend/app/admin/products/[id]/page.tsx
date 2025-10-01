"use client"

import { useEffect, useState } from "react"
import { Package } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useApi } from "@/contexts/api-context"

interface ProductDetailsDialogProps {
  productId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProductDetailsDialog({ productId, open, onOpenChange }: ProductDetailsDialogProps) {
  const { getProductById } = useApi()
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    if (open && productId) {
      fetchProduct()
    }
  }, [open, productId])

  const fetchProduct = async () => {
    try {
      const data = await getProductById(productId)
      setProduct(data)
    } catch (error) {
      console.error("Failed to fetch product details", error)
    }
  }

  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Package className="w-5 h-5 text-green-600" />
          </div>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-sm text-gray-500">Product ID: {product._id}</p>
              <p className="text-sm text-gray-500">Seller: {product.seller || "Admin"}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated: {new Date(product.updatedAt).toLocaleDateString()}
              </p>

              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-green-600">₹{product.price}</div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Stock: {product.stock}
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  ⭐ {product.rating}
                </Badge>
              </div>

              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                {product.category?.type} / {product.category?.gender} / {product.category?.subCategories?.length
                  ? product.category.subCategories.join(", ")
                  : "No SubCategory"}
              </Badge>

              <div className="mt-4 space-y-1">
                {product.specifications?.longevity && (
                  <p className="text-sm text-gray-700">
                     Longevity: {product.specifications.longevity}
                  </p>
                )}
                {product.specifications?.highlight && (
                  <p className="text-sm text-gray-700">
                     Best Use: {product.specifications.highlight}
                  </p>
                )}
              </div>

              <p className="text-gray-600">{product.description}</p>

              {product?.offer?.isActive && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      {product.offer.type === "percentage"
                        ? `${product.offer.value}% OFF`
                        : product.offer.type === "fixed"
                          ? `Flat ₹${product.offer.value} OFF`
                          : product.offer.type === "bogo"
                            ? "Buy 1 Get 1"
                            : "Bundle Offer"}
                    </Badge>

                    {["percentage", "fixed"].includes(product.offer.type) && (
                      <span className="text-amber-700 font-medium">
                        Save ₹
                        {product.offer.type === "percentage"
                          ? ((product.price * product.offer.value) / 100).toFixed(2)
                          : product.offer.value.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="text-amber-700 text-sm">
                    {product.offer.description || "Special offer available!"}
                  </p>

                  {/* 🎯 maxUses aur usedCount show karo */}
                  <p className="text-xs text-amber-600 mt-1">
                    {product.offer.usedCount}/{product.offer.maxUses} offers used
                  </p>

                  {/* Min quantity condition bhi dikhana chaho to */}
                  {product.offer.minQuantity > 1 && (
                    <p className="text-xs text-amber-600">
                      Minimum {product.offer.minQuantity} items required
                    </p>
                  )}
                </div>
              )}

            </div>

            {/* Product Images */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Product Images</h4>
              <div className="grid grid-cols-2 gap-3">
                {product.images?.map((image: string, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={image.startsWith("http") ? image : `NEXT_PUBLIC_API_URL${image}`}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <Badge className="absolute bottom-2 left-2 text-xs bg-white/90 text-gray-700">
                      {index + 1}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {product.reviews?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-4">
                Customer Reviews ({product.reviews.length})
              </h4>
              <div className="space-y-3">
                {product.reviews.map((review: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-800">{review.name}</span>
                      <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50 text-xs">
                        {"⭐".repeat(review.stars)} {review.stars}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
