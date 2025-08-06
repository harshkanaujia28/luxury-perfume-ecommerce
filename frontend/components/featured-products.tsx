"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useApi } from "@/contexts/api-context"

interface Product {
  _id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  createdAt?: string
}

export function FeaturedProducts() {
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const { addToCart } = useCart()
  const { getProducts } = useApi()
  const { addItem, removeItem, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const products = await getProducts()
        const sorted = [...products]
          .filter((p) => p.createdAt)
          .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
        const unique = Array.from(new Map(sorted.map((p) => [p._id, p])).values())
        setNewProducts(unique.slice(18, 24)) // ⬅️ Change this range as needed
      } catch (error) {
        console.error("Failed to fetch new products", error)
      }
    }
    fetchNewProducts()
  }, [getProducts])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Best Selling Products</h2>
          <p className="mt-2 text-gray-600 max-w-md text-start">
            Discover our most popular perfumes, loved by customers for their luxury and lasting impression.
          </p>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => {
            const inWishlist = isInWishlist(product._id)

            return (
              <Card key={product._id} className="product-card-hover border-0 shadow-lg relative">
                <CardContent className="p-0">
                  <button
                    onClick={() => (inWishlist ? removeItem(product._id) : addItem(product))}
                    className={`absolute top-3 right-3 z-10 rounded-full p-2 ${inWishlist ? "bg-pink-100 text-green-600" : "bg-white/80 text-gray-500"
                      } hover:bg-pink-200`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                  </button>

                  <Link href={`/products/${product._id}`}>
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
                          className={`w-4 h-4 ${i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
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
                        onClick={() => addToCart(product._id, 1)}
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
