"use client";

import { useState, useEffect, useMemo } from "react";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import axios from "@/utils/axios";

// ✅ Correct subcategories for Attar
const subCategories = {
  Men: ["Traditional", "Summer", "Gym", "Office", "Winter", "Spiritual & Devotional"],
  Women: ["Traditional", "Summer", "Gym", "Office", "Winter", "Spiritual & Devotional"],
};

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: {
    type: string;
    gender: string;
    subCategory: string;
  };
}

export default function AttarPage() {
  const [gender, setGender] = useState<"Men" | "Women" | "">("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttars = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/products", {
          params: { type: "Attar" }, // Fetch only Attar products
        });
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch attars:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttars();
  }, []);

  // ✅ Apply gender and subCategory filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesGender = gender ? product.category.gender === gender : true;
      const matchesSubCat = selectedSubCategory
        ? product.category.subCategory?.toLowerCase() === selectedSubCategory.toLowerCase()
        : true;
      return matchesGender && matchesSubCat;
    });
  }, [gender, selectedSubCategory, products]);

  return (
    <>
      <Header />
      <div className="px-4 py-20 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Attars</h1>

        {/* Gender filter buttons */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setGender("Men")}
            className={`px-4 py-2 border rounded ${
              gender === "Men" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Men
          </button>
          <button
            onClick={() => setGender("Women")}
            className={`px-4 py-2 border rounded ${
              gender === "Women" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => {
              setGender("");
              setSelectedSubCategory("");
            }}
            className="px-4 py-2 border rounded"
          >
            Reset
          </button>
        </div>

        {/* Subcategory filter */}
        {gender && (
          <div>
            <label className="block mb-2 text-sm font-medium">Filter by Category:</label>
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="">All</option>
              {subCategories[gender].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Grid Display */}
        {loading ? <p>Loading attars...</p> : <ProductGrid products={filteredProducts} />}
      </div>
      <Footer />
    </>
  );
}
