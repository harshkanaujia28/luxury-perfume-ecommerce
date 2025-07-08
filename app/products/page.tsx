"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { products, categories, brands, genders } from "@/lib/products"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedGender, setSelectedGender] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("name")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const gender = searchParams.get("gender")
    const search = searchParams.get("search")

    if (category) setSelectedCategory(category)
    if (brand) setSelectedBrand(brand)
    if (gender) setSelectedGender(gender)
    if (search) setSearchQuery(search)
  }, [searchParams])

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by brand
    if (selectedBrand !== "All") {
      filtered = filtered.filter((product) => product.brand === selectedBrand)
    }

    // Filter by gender
    if (selectedGender !== "All") {
      filtered = filtered.filter((product) => product.gender === selectedGender)
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id.localeCompare(a.id)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [
    selectedCategory,
    selectedBrand,
    selectedGender,
    priceRange,
    sortBy,
    searchQuery,
  ])

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters
              genders={genders}  // ✅ corrected from `gender`
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedGender={selectedGender}
              priceRange={priceRange}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrand}
              onGenderChange={setSelectedGender}
              onPriceRangeChange={setPriceRange}
              onSortChange={setSortBy}
            />
          </aside>
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
              </h1>
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
