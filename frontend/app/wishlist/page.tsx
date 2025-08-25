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

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function WishlistPage() {
  const { items, addItem, removeItem, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedImage] = useState(0);

  if (!items || items.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center py-36 text-center px-4 space-y-4 bg-black text-gray-200 min-h-screen">
          <Heart className="w-16 h-16 text-lime-400" />
          <h2 className="text-2xl font-semibold text-lime-400">
            Your wishlist is empty
          </h2>
          <p className="text-gray-400 max-w-md">
            Browse our collection and save your favorite products to your
            wishlist.
          </p>
          <Button asChild className="bg-lime-500 text-black hover:bg-lime-400">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto pt-36 pb-12 px-4 bg-black min-h-screen">
        <h1 className="text-3xl font-bold text-lime-400 mb-8 text-center">
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
                className="bg-zinc-900 border border-lime-400/40 rounded-2xl overflow-hidden hover:shadow-[0_0_15px_rgba(182,255,40,0.3)] transition"
              >
                {/* Product Image */}
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
                        ? "bg-lime-500 text-black"
                        : "bg-black/60 text-gray-300 border border-lime-400/30"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        inWishlist ? "fill-current" : ""
                      }`}
                    />
                  </button>

                  {/* Offer Badge */}
                  {item.offer?.isActive && (
                    <div className="absolute top-3 left-3 bg-lime-500 text-black text-xs font-bold px-2 py-1 rounded">
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

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <Link href={`/products/${item._id}`}>
                    <h2 className="font-semibold text-lg text-gray-200 line-clamp-2 hover:text-lime-400 transition-colors">
                      {item.name || "Unnamed Product"}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-400">
                    {item.brand || "Unknown Brand"}
                  </p>

                  {/* Price */}
                  {item.offer?.isActive && item.offerPrice ? (
                    <div className="flex items-center gap-2">
                      <p className="text-lime-400 font-bold text-lg">
                        ₹{item.offerPrice}
                      </p>
                      <p className="text-gray-500 line-through text-sm">
                        ₹{item.price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-lime-400 font-bold text-lg">
                      ₹{item.price || "Price unavailable"}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1 bg-lime-500 text-black hover:bg-lime-400"
                      onClick={() => addToCart(item._id, 1)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 text-red-500 hover:bg-red-500/20"
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
