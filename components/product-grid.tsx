"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/lib/products"
import { useState } from "react"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart()

  const [wishlist, setWishlist] = useState<string[]>([]) // Track product IDs in wishlist

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10
  const totalPages = Math.ceil(products.length / productsPerPage)

  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const visibleProducts = products.slice(startIndex, endIndex)

  if (visibleProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleProducts.map((product, index) => {
          const isWishlisted = wishlist.includes(product.id)

          return (
            <Card key={`${product.id}-${index}`} className="product-card-hover border-0 shadow-lg">
              <CardContent className="p-0">
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image?.trim() || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Sale
                      </div>
                    )}
                  </div>
                </Link>

                {/* Wishlist Heart Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-2 right-2 rounded-full p-1 ${
                    isWishlisted ? "bg-green-100 text-green-600" : "bg-white/80 text-gray-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </Button>

                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-green-600 text-white hover:bg-green-800"
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        brand: product.brand,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
