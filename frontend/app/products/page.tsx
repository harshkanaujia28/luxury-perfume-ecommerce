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
    subCategories?: string[];
  };
  image: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState(searchParams.get("categoryType") || "");
  const [selectedGender, setSelectedGender] = useState(searchParams.get("gender") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load filters from URL
  useEffect(() => {
    const categoryType = searchParams.get("categoryType") || "";
    const gender = searchParams.get("gender") || "";
    const subCategories = searchParams.get("subCategories")?.split(",") || [];
    const sort = searchParams.get("sortBy") || "newest";

    setSelectedCategoryType(categoryType);
    setSelectedGender(gender);
    setSelectedSubCategories(subCategories);
    setSortBy(sort);
  }, [searchParams]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/products");
        const data: Product[] = Array.isArray(res.data) ? res.data : res.data.products || [];
        setAllProducts(data);
      } catch (err) {
        console.error(err);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Reset invalid subCategories if Type/Gender changes
  useEffect(() => {
    const relevantProducts = allProducts.filter((product) => {
      const matchesType = selectedCategoryType ? product.category?.type === selectedCategoryType : true;
      const matchesGender = selectedGender ? product.category?.gender === selectedGender : true;
      return matchesType && matchesGender;
    });

    const availableSubCategories = Array.from(
      new Set(relevantProducts.flatMap((p) => p.category?.subCategories || []))
    );

    const validSubCategories = selectedSubCategories.filter((sub) =>
      availableSubCategories.includes(sub)
    );

    if (validSubCategories.length !== selectedSubCategories.length) {
      setSelectedSubCategories(validSubCategories);
    }
  }, [selectedCategoryType, selectedGender, allProducts]);

  // Update URL
  useEffect(() => {
    const query = new URLSearchParams();
    if (selectedCategoryType) query.set("categoryType", selectedCategoryType);
    if (selectedGender) query.set("gender", selectedGender);
    if (selectedSubCategories.length > 0) query.set("subCategories", selectedSubCategories.join(","));
    if (sortBy) query.set("sortBy", sortBy);

    router.replace(`/products?${query.toString()}`, { scroll: false });
  }, [selectedCategoryType, selectedGender, selectedSubCategories, sortBy, router]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesType = selectedCategoryType ? product.category?.type === selectedCategoryType : true;
      const matchesGender = selectedGender ? product.category?.gender === selectedGender : true;
      const matchesSubCategory =
        selectedSubCategories.length > 0
          ? product.category?.subCategories?.some((sub) => selectedSubCategories.includes(sub))
          : true;

      return matchesType && matchesGender && matchesSubCategory;
    });
  }, [allProducts, selectedCategoryType, selectedGender, selectedSubCategories]);

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
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 bg-zinc-900 p-4 rounded-xl border border-lime-400/10 shadow-md">
            <ProductFilters
              selectedCategoryType={selectedCategoryType}
              selectedGender={selectedGender}
              selectedSubCategories={selectedSubCategories}
              sortBy={sortBy}
              onCategoryTypeChange={setSelectedCategoryType}
              onGenderChange={setSelectedGender}
              onSubCategoriesChange={setSelectedSubCategories}
              onSortChange={setSortBy}
            />
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedCategoryType || "All"} Products</h1>
              <p className="text-gray-400">
                Showing {sortedProducts.length} product{sortedProducts.length !== 1 && "s"}
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
