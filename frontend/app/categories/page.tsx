"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import axios from "@/utils/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string; // assuming your backend returns category as string
}

export default function CategoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Group products by category
  const categories = products.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const categoryData = Object.keys(categories).map((categoryName) => {
    const categoryProducts = categories[categoryName];
    return {
      name: categoryName,
      description: `Explore our ${categoryName} collection.`,
      image: categoryProducts[0]?.image || "/placeholder.svg",
      productCount: categoryProducts.length,
      featured: categoryProducts.slice(0, 3),
    };
  });

  const filteredCategories = categoryData.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black py-32 text-lime-300">

        <main>
          {/* Hero Section */}
          <section
            className="relative bg-cover bg-center bg-no-repeat py-20"
            style={{ backgroundImage: `url('/assets/Generate Images for Free.jpeg')` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
              <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">Fragrance Categories</h1>
              <p className="text-xl text-lime-300 mb-8">
                Explore our carefully curated collections, each designed to capture different moods and occasions
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lime-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full text-lg bg-black border border-lime-500/40 text-lime-300"
                />
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {loading ? (
                <p className="text-lime-300">Loading categories...</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredCategories.map((category) => (
                    <Card
                      key={category.name}
                      className="group cursor-pointer bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all" />
                          <div className="absolute inset-0 flex flex-col justify-end p-6 text-lime-300">
                            <h3 className="text-xl font-bold mb-2 text-lime-400">{category.name}</h3>
                            <p className="text-sm opacity-90 mb-2">{category.description}</p>
                            <p className="text-xs opacity-75">{category.productCount} products</p>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="mb-4">
                            <h4 className="font-semibold text-lime-400 mb-2">Featured Products</h4>
                            <div className="space-y-2">
                              {category.featured.map((product) => (
                                <div key={product._id} className="flex justify-between items-center text-sm text-lime-300">
                                  <span>{product.name}</span>
                                  <span className="font-medium text-lime-400">${product.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold" asChild>
                            <Link href={`/products?category=${category.name}`}>
                              Explore {category.name}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

      </div>
      <Footer />
    </>
  );
}
