"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useSortedProducts } from "@/hooks/useSortedProducts";
import { useToast } from "@/hooks/use-toast";

export function Featured() {
  const { addToCart } = useCart();
     const { toast } = useToast()
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const products = useSortedProducts();
  const featuredProducts = products.slice(8, 16); // ✅ 8 to 15

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-lime-400">Featured Products</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {featuredProducts.map((product) => {
            const inWishlist = isInWishlist(product._id);
            return (
              <Card
                key={product._id}
                className="border border-lime-400/40 bg-zinc-900 shadow-md hover:shadow-[0_0_25px_rgba(182,255,40,0.4)] transition relative"
              >
                <CardContent className="p-0">
                  {/* Wishlist Button */}
                  <button
                    onClick={() =>
                      inWishlist ? removeItem(product._id) : addItem(product)
                    }
                    className={`absolute top-3 right-3 rounded-full p-2 z-10 shadow-md ${inWishlist
                        ? "bg-lime-500 text-black"
                        : "bg-black/70 text-lime-400 hover:bg-lime-500 hover:text-black"
                      }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
                    />
                  </button>

                  {/* Offer Badge */}
                  {product.offer?.isActive && (
                    <div className="absolute top-3 left-3 bg-lime-500 text-black text-xs font-bold px-2 py-1 rounded">
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
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-gray-400">{product.brand}</p>
                    <h3 className="font-semibold text-lime-300 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Price + Cart */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-lime-400">
                        ₹{product.price}
                      </span>
                      <Button
                        size="icon"
                        className="bg-lime-500 text-black rounded-full w-8 h-8 hover:bg-lime-400 flex items-center justify-center"
                        onClick={async () => {
                          if (!product) return;

                          try {
                            // Calculate final price based on active offer
                            const originalPrice = product.price;
                            let finalPrice = originalPrice;

                            if (product.offer?.isActive) {
                              if (product.offer.type === "percentage") {
                                finalPrice = originalPrice - (originalPrice * product.offer.value) / 100;
                              } else if (product.offer.type === "fixed") {
                                finalPrice = originalPrice - product.offer.value;
                              }
                            }

                            // Add to cart with default quantity=1, no size selected
                            await addToCart(product._id, 1, undefined, finalPrice);

                            console.log(`Added ${product.name} to cart at ₹${finalPrice}`);
                            toast({
                              title: "Added to cart",
                              description: `1 ${product.name} added at ₹${finalPrice.toFixed(2)}`,
                            });
                          } catch (err) {
                            console.error("Failed to add to cart:", err);
                            toast({
                              title: "Error",
                              description: "Failed to add to cart.",
                              variant: "destructive",
                            });
                          }
                        }}
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
