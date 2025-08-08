"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";

const baseURL = "https://luxury-perfume-ecommerce.onrender.com";

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

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product._id, 1);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            className="group border-0 shadow hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden"
          >
            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
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

              {product.offer?.isActive && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.offer.type === "percentage"
                    ? `${product.offer.value}% OFF`
                    : product.offer.type === "fixed"
                    ? `₹${product.offer.value} OFF`
                    : product.offer.type === "bogo"
                    ? "Buy 1 Get 1"
                    : "Bundle Offer"}
                </span>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 right-3 rounded-full p-2 shadow-md ${
                  isInWishlist(product._id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isInWishlist(product._id) ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            <CardContent className="p-4 space-y-2">
              <p className="text-[11px] uppercase tracking-wide text-gray-500">
                {product.brand}
              </p>
              <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-[11px] text-gray-500 ml-1">
                  ({product.reviews.length})
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-base font-bold text-gray-900">
                  ₹{product.price}
                </span>
                {/* <Button
                  variant="default"
                  size="icon"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full w-9 h-9"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
