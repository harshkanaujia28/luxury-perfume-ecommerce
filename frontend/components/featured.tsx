"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

export function Featured() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()
  const { addItem, removeItem, isInWishlist } = useWishlist()

  const featuredProducts = products.slice(8, 16)
  const itemsPerPage = 8 // now 2 rows * 4 products
  const maxIndex = Math.ceil(featuredProducts.length / itemsPerPage) - 1

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const currentProducts = featuredProducts.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl text-center font-bold text-gray-900">Featured Products</h2>
          {/* <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={prevSlide} className="rounded-full w-10 h-10 p-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide} className="rounded-full w-10 h-10 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div> */}
        </div>

        {/* Product Grid - 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => {
            const inWishlist = isInWishlist(product.id)

            return (
              <Card key={product.id} className="product-card-hover border-0 shadow-lg relative">
                <CardContent className="p-0">
                  <button
                    onClick={() => (inWishlist ? removeItem(product.id) : addItem(product))}
                    className={`absolute top-3 right-3 z-10 rounded-full p-2 ${inWishlist ? "bg-pink-100 text-green-600" : "bg-white/80 text-gray-500"
                      } hover:bg-pink-200`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                  </button>

                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
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

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                      <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    </div>

                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-green-600 text-white hover:bg-green-700 rounded-full w-8 h-8 ml-2"
                       onClick={() => addToCart(product.id, 1)}// ✅ ONLY pass _id and quantity
                      >
                        <ShoppingCart className="w-6 h-6" />
                      </Button>

                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
