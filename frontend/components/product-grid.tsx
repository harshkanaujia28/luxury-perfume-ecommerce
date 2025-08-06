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

  // ✅ Toggle wishlist with backend sync
  // const toggleWishlist = async (product: Product) => {
  //   try {
  //     if (isInWishlist(product._id)) {
  //       await removeFromWishlist(product._id);
  //       removeItem(product._id);
  //     } else {
  //       await addToWishlist(product._id);
  //       addItem(product);
  //     }
  //   } catch (err) {
  //     console.error("Wishlist action failed:", err);
  //   }
  // };

  // ✅ Add to cart using only CartContext
  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product._id, 1); // ✅ use product._id, not product.id
      console.log("Product added to cart:", product);
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
    <div className="space-y-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <Card key={product._id} className="border-0 shadow-md">
            <CardContent className="p-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
                <Link href={`/products/${product._id}`}>
                  <Image
                    src={`${baseURL}${product.images[selectedImage] || "/placeholder.svg"}`}
                    alt={product.name}
                    fill
                    className="object-cover w-full h-full"
                  />
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-2 right-2 rounded-full p-1 ${isInWishlist(product._id)
                    ? "bg-green-100 text-green-600"
                    : "bg-white/80 text-gray-500"
                    }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isInWishlist(product._id) ? "fill-current" : ""
                      }`}
                  />
                </Button>
              </div>

              <div className="p-2 space-y-1">
                <div>
                  <p className="text-[11px] text-gray-500">{product.brand}</p>
                  <h3 className="font-medium text-gray-900 text-xs truncate">{product.name}</h3>
                </div>
                {product.offer?.isActive && (
                  <div className="p-1 mt-1 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-700">
                    <span className="font-semibold">
                      {product.offer.type === "percentage"
                        ? `${product.offer.value}% OFF`
                        : product.offer.type === "fixed"
                          ? `Flat ₹${product.offer.value} OFF`
                          : product.offer.type === "bogo"
                            ? "Buy 1 Get 1"
                            : "Bundle Offer"}
                    </span>
                    {["percentage", "fixed"].includes(product.offer.type) && (
                      <span className="ml-1">
                        — Save ₹
                        {product.offer.type === "percentage"
                          ? ((product.price * product.offer.value) / 100).toFixed(0)
                          : product.offer.value.toFixed(0)}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                  <span className="text-[10px] text-gray-500 ml-1">
                    ({product.reviews.length})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-green-600 text-white hover:bg-green-700 rounded-full w-8 h-8 ml-2"
                    onClick={() => handleAddToCart(product)} // ✅ fix this line
                  >
                    <ShoppingCart className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
