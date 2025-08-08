"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useSortedProducts } from "@/hooks/useSortedProducts";

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const products = useSortedProducts();
  const bestSellingProducts = products.slice(16, 24); // ✅ 16 to 23

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900">Best Selling Products</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {bestSellingProducts.map((product) => {
            const inWishlist = isInWishlist(product._id);

            // ✅ Calculate offer price
            let finalPrice = product.price;
            if (product.offer?.isActive) {
              if (product.offer.type === "percentage") {
                finalPrice = product.price - (product.price * product.offer.value) / 100;
              } else if (product.offer.type === "fixed") {
                finalPrice = product.price - product.offer.value;
              }
            }

            return (
              <Card
                key={product._id}
                className="border-0 shadow-lg relative overflow-hidden hover:shadow-xl transition"
              >
                <CardContent className="p-0">
                  {/* Wishlist Button */}
                  <button
                    onClick={() =>
                      inWishlist ? removeItem(product._id) : addItem(product)
                    }
                    className={`absolute top-3 right-3 rounded-full p-2 z-10 ${
                      inWishlist
                        ? "bg-pink-100 text-pink-600"
                        : "bg-white/80 text-gray-500"
                    }`}
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

                  {/* Product Image */}
                  <Link href={`/products/${product._id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={
                          product.images?.[0]?.startsWith("http")
                            ? product.images[0]
                            : `/placeholder.svg`
                        }
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <h3 className="font-semibold line-clamp-1">{product.name}</h3>

                    {/* Rating */}
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
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews?.length || 0})
                      </span>
                    </div>

                    {/* Offer Description */}
                    {product.offer?.isActive && product.offer.description && (
                      <div className="p-1 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-700">
                        {product.offer.description}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between mt-2">
                      {product.offer?.isActive ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">
                            ₹{finalPrice.toFixed(0)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold">₹{product.price}</span>
                      )}

                      {/* Add to Cart */}
                      <Button
                        size="icon"
                        className="bg-green-600 text-white rounded-full w-8 h-8 hover:bg-green-700"
                        onClick={() => addToCart(product._id, 1)}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </Button>
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
