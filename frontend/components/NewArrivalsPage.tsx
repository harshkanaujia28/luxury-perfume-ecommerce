"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useSortedProducts } from "@/hooks/useSortedProducts";
import { useToast } from "@/hooks/use-toast";

// 🔹 Common price calculation helper
function getFinalPrice(product: any) {
  const originalPrice = product.price;
  let finalPrice = originalPrice;

  if (product.offer?.isActive) {
    if (product.offer.type === "percentage") {
      finalPrice = originalPrice - (originalPrice * product.offer.value) / 100;
    } else if (product.offer.type === "fixed") {
      finalPrice = originalPrice - product.offer.value;
    }
  }

  return { finalPrice, originalPrice };
}

export default function NewProductsPage() {
  const { addToCart } = useCart();
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const products = useSortedProducts();
  const newProducts = products.slice(0, 8);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
        const itemWidth = carouselRef.current.children[0]?.clientWidth || 0;

        if (scrollLeft + clientWidth >= scrollWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [newProducts]);

  // Manual scroll
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
    const itemWidth = carouselRef.current.children[0]?.clientWidth || 0;

    if (direction === "right") {
      if (scrollLeft + clientWidth >= scrollWidth) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    } else {
      if (scrollLeft === 0) {
        carouselRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    }
  };

  if (newProducts.length === 0) {
    return (
      <div className="text-center py-16 text-green-400 bg-black">
        No new arrivals to display.
      </div>
    );
  }

  return (
    <section className="py-10 md:py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold text-lime-400 mb-2">
          New Arrivals
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-8">
          Discover our latest luxurious perfumes just arrived.
        </p>

        <div className="relative">
          {/* Left Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex text-lime-400 hover:bg-lime-500/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 pb-4 touch-pan-x no-scrollbar"
          >
            {newProducts.map((product) => {
              const inWishlist = isInWishlist(product._id);
              const { finalPrice, originalPrice } = getFinalPrice(product);

              return (
                <Card
                  key={product._id}
                  className="
                    flex-shrink-0 
                    w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23%] 
                    min-w-0 
                    snap-start 
                    bg-zinc-900 border border-lime-400/40 
                    hover:shadow-[0_0_20px_rgba(182,255,40,0.4)] 
                    transition
                  "
                >
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative w-full aspect-square overflow-hidden rounded-t-lg group">
                      <Link href={`/products/${product._id}`}>
                        <Image
                          src={
                            product.image?.startsWith("http")
                              ? product.image
                              : `${process.env.NEXT_PUBLIC_API_URL}${
                                  product.image ||
                                  product.images?.[0] ||
                                  "/placeholder.svg"
                                }`
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Wishlist */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          inWishlist
                            ? removeItem(product._id)
                            : addItem(product)
                        }
                        className={`absolute top-3 right-3 rounded-full shadow-md ${
                          inWishlist
                            ? "bg-lime-500 text-black"
                            : "bg-black/70 text-lime-400 hover:bg-lime-500 hover:text-black"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            inWishlist ? "fill-current" : ""
                          }`}
                        />
                      </Button>

                      {/* Offer Badge */}
                      {product.offer?.isActive && product.offer?.type && (
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
                    </div>

                    {/* Product Info */}
                    <div className="p-3 space-y-1">
                      <h3 className="font-semibold text-lime-300 text-sm sm:text-base truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 truncate">
                        {product.brand}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Price & Add to Cart */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg font-bold text-lime-400">
                            ₹{finalPrice.toFixed(2)}
                          </span>
                          {finalPrice < originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              ₹{originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <Button
                          size="icon"
                          className="bg-lime-500 text-black rounded-full w-8 h-8 hover:bg-lime-400 flex items-center justify-center"
                          onClick={async () => {
                            if (!product) return;
                            try {
                              await addToCart(
                                product._id,
                                1,
                                undefined,
                                finalPrice
                              );
                              toast({
                                title: "Added to cart",
                                description: `1 ${product.name} added at ₹${finalPrice.toFixed(
                                  2
                                )}`,
                              });
                            } catch {
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

          {/* Right Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex text-lime-400 hover:bg-lime-500/10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
