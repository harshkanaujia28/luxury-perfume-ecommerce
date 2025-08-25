"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || ""; // Start with all products
  const [selectedCategoryType, setSelectedCategoryType] = useState(initialType);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/products");
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setAllProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesType = selectedCategoryType ? product.category?.type === selectedCategoryType : true;
      const matchesGender = selectedGender ? product.category?.gender === selectedGender : true;
      const matchesSubCategory = selectedSubCategory ? product.category?.subCategory === selectedSubCategory : true;
      return matchesType && matchesGender && matchesSubCategory;
    });
  }, [allProducts, selectedCategoryType, selectedGender, selectedSubCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 bg-zinc-900 p-4 rounded-xl border border-lime-400/10 shadow-md">
            <ProductFilters
              selectedCategoryType={selectedCategoryType}
              selectedGender={selectedGender}
              selectedSubCategory={selectedSubCategory}
              sortBy={sortBy}
              onCategoryTypeChange={setSelectedCategoryType}
              onGenderChange={setSelectedGender}
              onSubCategoryChange={setSelectedSubCategory}
              onSortChange={setSortBy}
            />
          </aside>

          {/* Main Products */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {selectedCategoryType || "All"} Products
              </h1>
              <p className="text-gray-400">
                Showing {sortedProducts.length} product{sortedProducts.length !== 1 && "s"}
              </p>
            </div>

            {loading ? (
              <p className="text-lime-400 animate-pulse">Loading products...</p>
            ) : (
              <ProductGrid products={sortedProducts} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
