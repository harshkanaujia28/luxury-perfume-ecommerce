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

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://luxury-perfume-ecommerce.onrender.com";

export default function WishlistPage() {
  const { items, addItem, removeItem, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedImage] = useState(0);

  if (!items || items.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center py-36 text-center px-4 space-y-4">
          <Heart className="w-16 h-16 text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-700">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 max-w-md">
            Browse our collection and save your favorite products to your
            wishlist.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto pt-36 pb-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Wishlist
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => {
            const imageUrl =
              item.images?.[selectedImage]?.startsWith("http")
                ? item.images[selectedImage]
                : `${baseURL}${item.images?.[selectedImage] || "/placeholder.svg"}`;

            const inWishlist = isInWishlist(item._id);

            return (
              <div
                key={item._id || index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full h-56 group">
                  <Link href={`/products/${item._id}`}>
                    <Image
                      src={imageUrl}
                      alt={item.name || "Product"}
                      fill
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Wishlist Icon */}
                  <button
                    onClick={() =>
                      inWishlist ? removeItem(item._id) : addItem(item)
                    }
                    className={`absolute top-3 right-3 rounded-full p-2 z-10 ${
                      inWishlist
                        ? "bg-pink-100 text-pink-600"
                        : "bg-white/80 text-gray-500"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
                    />
                  </button>

                  {/* Offer Badge */}
                  {item.offer?.isActive && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {item.offer.type === "percentage"
                        ? `${item.offer.value}% OFF`
                        : item.offer.type === "fixed"
                        ? `₹${item.offer.value} OFF`
                        : item.offer.type === "bogo"
                        ? "Buy 1 Get 1"
                        : "Bundle Offer"}
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <Link href={`/products/${item._id}`}>
                    <h2 className="font-semibold text-lg text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
                      {item.name || "Unnamed Product"}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-500">
                    {item.brand || "Unknown Brand"}
                  </p>

                  {/* Price & Offer Price */}
                  {item.offer?.isActive && item.offerPrice ? (
                    <div className="flex items-center gap-2">
                      <p className="text-green-700 font-bold text-lg">
                        ₹{item.offerPrice}
                      </p>
                      <p className="text-gray-500 line-through text-sm">
                        ₹{item.price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-green-700 font-bold text-lg">
                      ₹{item.price || "Price unavailable"}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    {/* <Button
                      className="flex-1 bg-green-600 text-white hover:bg-green-700"
                      onClick={() => addToCart(item._id, 1)}
                    >
                      Add to Cart
                    </Button> */}
                    <Button
                      variant="outline"
                      className="flex-1 text-red-600 border-red-400 hover:bg-red-50"
                      onClick={() => removeItem(item._id)}
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
