"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useSortedProducts } from "@/hooks/useSortedProducts";

export function Featured() {
  const { addToCart } = useCart();
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const products = useSortedProducts();
  const featuredProducts = products.slice(8, 16); // ✅ 8 to 15

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {featuredProducts.map((product) => {
            const inWishlist = isInWishlist(product._id);
            return (
              <Card key={product._id} className="border-0 shadow-lg relative">
                <CardContent className="p-0">
                  <button
                    onClick={() =>
                      inWishlist
                        ? removeItem(product._id)
                        : addItem(product)
                    }
                    className={`absolute top-3 right-3 rounded-full p-2 ${inWishlist ? "bg-pink-100 text-green-600" : "bg-white/80 text-gray-500"}`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                  </button>
                  {/* Offer Badge */}
                  {product.offer?.isActive && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.offer.type === "percentage"
                        ? `${product.offer.value}% OFF`
                        : product.offer.type === "fixed"
                          ? `₹${product.offer.value} OFF`
                          : product.offer.type === "bogo"
                            ? "Buy 1 Get 1"
                            : "Bundle Offer"}
                    </div>
                  )}

                  <Link href={`/products/${product._id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold">₹{product.price}</span>
                      {/* <Button
                        size="icon"
                        className="bg-green-600 text-white rounded-full w-8 h-8"
                        onClick={() => addToCart(product._id, 1)}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </Button> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
