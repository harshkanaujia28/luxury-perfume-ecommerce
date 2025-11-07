"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  rating: number;
  reviews: any[];
  offer?: {
    isActive: boolean;
    type: "percentage" | "fixed" | "bogo" | "bundle";
    value: number;
    description?: string;
    startDate?: string;
    endDate?: string;
    minQuantity?: number;
    maxUses?: number;
  };
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart();
  const { addItem, removeItem, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeItem(product._id);
    } else {
      addItem(product);
    }
  };

  const handleAddToCart = async (
    product: Product,
    quantity = 1,
    selectedSize?: string
  ) => {
    let finalPrice = product.price;
    if (product.offer?.isActive) {
      if (product.offer.type === "percentage") {
        finalPrice = product.price - (product.price * product.offer.value) / 100;
      } else if (product.offer.type === "fixed") {
        finalPrice = product.price - product.offer.value;
      }
    }

    try {
      await addToCart(product._id, quantity, selectedSize, finalPrice);
      console.log("Adding to cart:", { id: product._id, quantity, selectedSize, price: finalPrice });
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-400">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
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
              className="group border border-lime-400/10 bg-zinc-900 shadow-md hover:shadow-lime-400/20 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[4/5] bg-zinc-800 overflow-hidden">
                <Link href={`/products/${product._id}`}>
                  <Image
                    src={
                      product.images[selectedImage]?.startsWith("http")
                        ? product.images[selectedImage]
                        : `${baseURL}${product.images[selectedImage] || "/placeholder.svg"}`
                    }
                    alt={product.name}
                    fill
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {product.offer?.isActive && product.offer?.type && (
                  <div className="absolute top-3 left-3 bg-lime-500 text-black text-xs font-bold px-2 py-1 rounded">
                    {product.offer.type === "percentage"
                      ? `${product.offer.value}% OFF`
                      : product.offer.type === "fixed"
                        ? `₹${product.offer.value} OFF`
                        : product.offer.type === "bogo"
                          ? "Buy 1 Get 1"
                          : product.offer.type === "bundle"
                            ? "Bundle Offer"
                            : null}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 rounded-full p-2 shadow-md transition ${isInWishlist(product._id)
                      ? "bg-lime-500 text-black hover:bg-lime-400"
                      : "bg-zinc-700/70 text-gray-300 hover:bg-zinc-600"
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              <CardContent className="p-4 space-y-2">
                <p className="text-[11px] uppercase tracking-wide text-gray-400">{product.brand}</p>
                <h3 className="font-semibold text-sm text-white line-clamp-1">{product.name}</h3>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                        }`}
                    />
                  ))}
                  <span className="text-[11px] text-gray-500 ml-1">({product.reviews.length})</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-bold text-lime-400">₹{finalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
