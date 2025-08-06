"use client";

import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Heart } from "lucide-react";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addToCart } = useCart();
  const [selectedImage] = useState(0);

  if (!items || items.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center py-28 text-center px-4 space-y-4">
          <Heart className="w-16 h-16 text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-700">Your wishlist is empty</h2>
          <p className="text-gray-500 max-w-md">
            Browse our collection and save your favorite products to your wishlist.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto pt-24 pb-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Wishlist</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => {
            const imageUrl =
              item.images?.[selectedImage] ? `${baseURL}${item.images[selectedImage]}` : "/placeholder.svg";

            return (
              <div
                key={item._id || index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/products/${item._id}`}>
                  <div className="relative w-full h-56">
                    <Image
                      src={imageUrl}
                      alt={item.name || "Product image"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-4 space-y-2">
                  <Link href={`/products/${item._id}`}>
                    <h2 className="font-semibold text-lg text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
                      {item.name || "Unnamed Product"}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-500">{item.brand || "Unknown Brand"}</p>
                  <p className="text-green-700 font-bold text-lg">
                    {item.price ? `₹${item.price}` : "Price unavailable"}
                  </p>
                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1 bg-green-600 text-white hover:bg-green-700"
                     onClick={() => addToCart(item._id!)}>
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-red-600 border-red-400 hover:bg-red-50"
                      onClick={() => removeItem(item._id!)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
