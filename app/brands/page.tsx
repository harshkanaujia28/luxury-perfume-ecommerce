"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star } from "lucide-react"
import { products, brands } from "@/lib/products"

const brandData = brands.slice(1).map((brand) => {
  const brandProducts = products.filter((p) => p.brand === brand)
  const avgRating = brandProducts.reduce((sum, p) => sum + p.rating, 0) / brandProducts.length
  const totalReviews = brandProducts.reduce((sum, p) => sum + p.reviews, 0)
  const firstProductWithImage = brandProducts.find((p) => p.brandimage)

  return {
    name: brand,
    logo: firstProductWithImage?.brandimage || "/placeholder.svg", // ✅ Use real brand image if available
    description: `Premium fragrances from ${brand}`,
    productCount: brandProducts.length,
    avgRating: avgRating || 0,
    totalReviews,
    priceRange: {
      min: Math.min(...brandProducts.map((p) => p.price)),
      max: Math.max(...brandProducts.map((p) => p.price)),
    },
    featured: brandProducts.slice(0, 3),
    established: Math.floor(Math.random() * 50) + 1970,
    specialty: ["Luxury", "Premium", "Artisan", "Classic", "Modern"][Math.floor(Math.random() * 5)],
  }
})


export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredBrands = brandData.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort brands
  filteredBrands.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.avgRating - a.avgRating
      case "products":
        return b.productCount - a.productCount
      case "established":
        return a.established - b.established
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="min-h-screen bg-white pt-18 py-16">
      <Header />
      <main>
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-20"
          style={{
            backgroundImage: `url('/assets/Parfüm & Düfte _ Offizielle Website _ CHANEL.jpeg')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/40" />

          {/* Content */}
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Premium Brands</h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the world's most prestigious fragrance houses and their signature collections
            </p>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="products">Sort by Products</option>
                <option value="established">Sort by Year</option>
              </select>
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {filteredBrands.length} of {brandData.length} brands
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBrands.map((brand) => (
                <Card
                  key={brand.name}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    {/* Brand Logo */}
                    <div className="text-center mb-6">
                      <div className="mx-auto mb-4 rounded-xl overflow-hidden  w-60 h-30 flex items-center justify-center ">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={100}
                          height={150}
                          className="object-cover  opacity-80 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
                        />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                    </div>

                    {/* Brand Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Products</span>
                        <Badge variant="secondary">{brand.productCount}</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{brand.avgRating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500">({brand.totalReviews})</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Price Range</span>
                        <span className="text-sm font-medium">
                          ${brand.priceRange.min} - ${brand.priceRange.max}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Established</span>
                        <span className="text-sm font-medium">{brand.established}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Specialty</span>
                        <Badge variant="outline">{brand.specialty}</Badge>
                      </div>
                    </div>

                    {/* Featured Products */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Popular Products</h4>
                      <div className="space-y-2">
                        {brand.featured.map((product) => (
                          <div key={product.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600 truncate">{product.name}</span>
                            <span className="font-medium">${product.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/products?brand=${encodeURIComponent(brand.name)}`}>Explore {brand.name}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
