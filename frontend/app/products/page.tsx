"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";

interface Product {
  _id: string;
  name: string;
  price: number;
  rating?: number;
  createdAt: string;
  category?: {
    type?: string;
    gender?: string;
    subCategory?: string;
  };
  image: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state from URL query
  const [selectedCategoryType, setSelectedCategoryType] = useState(
    searchParams.get("categoryType") || ""
  );
  const [selectedGender, setSelectedGender] = useState(
    searchParams.get("gender") || ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    searchParams.get("subCategory") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync state with URL query whenever it changes
  useEffect(() => {
    const categoryType = searchParams.get("categoryType") || "";
    const gender = searchParams.get("gender") || "";
    const subCategory = searchParams.get("subCategory") || "";
    const sort = searchParams.get("sortBy") || "newest";

    setSelectedCategoryType(categoryType);
    setSelectedGender(gender);
    setSelectedSubCategory(subCategory);
    setSortBy(sort);
  }, [searchParams]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/products");
        const data: Product[] = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
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

  // Update URL whenever filters change
  useEffect(() => {
    const query = new URLSearchParams();
    if (selectedCategoryType) query.set("categoryType", selectedCategoryType);
    if (selectedGender) query.set("gender", selectedGender);
    if (selectedSubCategory) query.set("subCategory", selectedSubCategory);
    if (sortBy) query.set("sortBy", sortBy);

    router.replace(`/products?${query.toString()}`, { scroll: false });
  }, [selectedCategoryType, selectedGender, selectedSubCategory, sortBy, router]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesType = selectedCategoryType
        ? product.category?.type === selectedCategoryType
        : true;
      const matchesGender = selectedGender
        ? product.category?.gender === selectedGender
        : true;
      const matchesSubCategory = selectedSubCategory
        ? product.category?.subCategory === selectedSubCategory
        : true;
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
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
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
                Showing {sortedProducts.length} product
                {sortedProducts.length !== 1 && "s"}
              </p>
            </div>

            {loading ? (
              <p className="text-lime-400 animate-pulse">Loading products...</p>
            ) : sortedProducts.length === 0 ? (
              <p className="text-gray-400">No products found for selected filters.</p>
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
