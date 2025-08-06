"use client"

import { useState } from "react"
import { Edit, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import UpdateProductDialog from "./update-product-dialog"

// Sample product data
const sampleProduct = {
  id: "1",
  name: "Royal Oud Attar",
  brand: "Luxe Fragrances",
  description:
    "A sophisticated blend of amber and vanilla with hints of bergamot, perfect for special occasions and evening wear.",
  price: 2499,
  stock: 15,
  images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
  category: "Attar - Men - Traditional",
  seller: "Seller 1",
  rating: 4.5,
  reviews: [
    {
      userId: "user1",
      name: "Rahul Sharma",
      comment: "Excellent fragrance! Long-lasting and perfect for special occasions.",
      stars: 5,
    },
    {
      userId: "user2",
      name: "Priya Patel",
      comment: "Good quality attar, but a bit expensive.",
      stars: 4,
    },
  ],
  offer: {
    isActive: true,
    type: "percentage" as const,
    value: 15,
    startDate: "2024-01-15T00:00",
    endDate: "2024-02-15T23:59",
    description: "New Year Special - Limited Time Offer!",
    minQuantity: 1,
    maxUses: 100,
  },
}

export default function DemoPage() {
  const [product, setProduct] = useState(sampleProduct)

  const handleProductUpdate = (updatedProduct: any) => {
    setProduct(updatedProduct)
    console.log("Product updated:", updatedProduct)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">Product Update Demo</h1>
          <p className="text-slate-600">Click the "Update Product" button to edit the product details</p>
        </div>

        {/* Product Display Card */}
        <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                Product Details
              </CardTitle>
              <UpdateProductDialog
                product={product}
                onUpdate={handleProductUpdate}
                trigger={
                  <Button className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <Edit className="w-4 h-4 mr-2" />
                    Update Product
                  </Button>
                }
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{product.name}</h3>
                  <p className="text-slate-600">{product.brand}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-green-600">₹{product.price}</div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Stock: {product.stock}
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    ⭐ {product.rating}
                  </Badge>
                </div>

                <div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">{product.category}</Badge>
                </div>

                <p className="text-slate-600 leading-relaxed">{product.description}</p>

                {product.offer.isActive && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">{product.offer.value}% OFF</Badge>
                      <span className="text-amber-700 font-medium">
                        Save ₹{((product.price * product.offer.value) / 100).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-amber-700 text-sm">{product.offer.description}</p>
                  </div>
                )}
              </div>

              {/* Product Images */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700">Product Images</h4>
                <div className="grid grid-cols-2 gap-3">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-slate-200"
                      />
                      <Badge className="absolute bottom-2 left-2 text-xs bg-white/90 text-slate-700">{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {product.reviews.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-4">Customer Reviews ({product.reviews.length})</h4>
                <div className="space-y-3">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-slate-800">{review.name}</span>
                        <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50 text-xs">
                          {"⭐".repeat(review.stars)} {review.stars}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
