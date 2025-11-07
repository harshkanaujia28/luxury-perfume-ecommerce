"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import axios from "@/utils/axios";

interface Product {
  _id: string;
  category: {
    type: string;
  };
  image: string;
}

const categoryImages: Record<string, string> = {
  Attar: "/NEW EXTRAIT COLLECTION.jpeg",
  Perfume: "/d1358b29-f9f5-4347-97d6-c77b9ffd637c.jpeg",
};

const allowedTypes = ["Perfume", "Attar"];

export function CategoriesSection() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/products");
        const products: Product[] = res.data.products || [];

        const types = Array.from(
          new Set(
            products
              .map((product) => product.category?.type)
              .filter((type): type is string =>
                allowedTypes.includes(type || "")
              )
          )
        );

        setCategories(types);
      } catch (error) {
        console.error("Failed to fetch product categories", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const formatType = (type: string) =>
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-start mb-12">
          <h2 className="text-3xl font-bold text-lime-400 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-300">
            Explore our luxurious range of Perfumes and Attars
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {categories.map((type) => (
            <Link key={type} href={`/products?categoryType=${type}`}>
              <Card className="group hover:shadow-[0_0_20px_rgba(182,255,40,0.5)] transition cursor-pointer rounded-xl border border-lime-400 bg-zinc-900 overflow-hidden relative">
                <CardContent className="p-0">
                  <div className="relative w-full h-64 rounded-t-xl overflow-hidden">
                    <Image
                      src={categoryImages[type] || "/placeholder.svg"}
                      alt={type}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lime-400 text-2xl font-bold drop-shadow-lg">
                        {formatType(type)}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
