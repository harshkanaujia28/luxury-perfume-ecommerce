"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useApi } from "@/contexts/api-context"; // ✅ use your real context here

export default function NewProductsPage() {
  const { addToCart } = useCart();
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { getProducts } = useApi(); // ✅ real backend call
  const [newProducts, setNewProducts] = useState<any[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const products = await getProducts();
        const sorted = [...products]
          .filter((p) => p.createdAt)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const unique = Array.from(new Map(sorted.map((p) => [p._id, p])).values());
        setNewProducts(unique.slice(0, 20));
      } catch (error) {
        console.error("Failed to fetch new products", error);
      }
    };
    fetchNewProducts();
  }, [getProducts]);

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

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
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
    }
  };

  if (newProducts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 dark:text-gray-400">
        No new arrivals to display.
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-8 text-center">
          New Arrivals
        </h2>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Button>

          <div
            ref={carouselRef}
            className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
          >
            {newProducts.map((product, index) => {
              const inWishlist = isInWishlist(product._id);
              return (
                <Card
                  key={`${product._id}-${index}`}
                  className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 px-2 snap-start"
                >
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-square overflow-hidden rounded-t-lg group">
                      <Link href={`/products/${product._id}`}>
                        <Image
                          src={`http://localhost:5000${product.image || product.images?.[0] || "/placeholder.svg"}`}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      {product.offer && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                          SALE
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          inWishlist
                            ? removeItem(product._id)
                            : addItem(product)
                        }
                        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors ${inWishlist
                            ? "bg-pink-100 text-green-500 hover:bg-green-200"
                            : "bg-white/80 text-gray-500 hover:bg-white"
                          } shadow-md`}
                      >
                        <Heart
                          className={`w-5 h-5 ${inWishlist ? "fill-current" : ""
                            }`}
                        />
                      </Button>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.brand}
                      </p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 dark:text-gray-600"
                              }`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          ({product.reviews?.length || 0})
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
                          ₹{product.price}
                        </span>
                        <Button
                          size="icon"
                          className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 rounded-full w-9 h-9"
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

          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors hidden md:flex"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </div>
    </section>
  );
}
