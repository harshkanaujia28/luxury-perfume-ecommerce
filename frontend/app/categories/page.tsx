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
    <div className="min-h-screen bg-white py-32">
      <Header />
      <main>
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-20"
          style={{ backgroundImage: `url('/assets/Generate Images for Free.jpeg')` }}
        >
          <div className="absolute inset-0 bg-white/40"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Fragrance Categories</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our carefully curated collections, each designed to capture different moods and occasions
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 w-full text-lg"
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCategories.map((category) => (
                  <Card
                    key={category.name}
                    className="group cursor-pointer border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                          <p className="text-sm opacity-90 mb-2">{category.description}</p>
                          <p className="text-xs opacity-75">{category.productCount} products</p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Featured Products</h4>
                          <div className="space-y-2">
                            {category.featured.map((product) => (
                              <div key={product._id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{product.name}</span>
                                <span className="font-medium">${product.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full" asChild>
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
      <Footer />
    </div>
  );
}
