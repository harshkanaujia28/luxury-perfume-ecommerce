"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface ProductFiltersProps {
  categories: string[]
  brands: string[]
  selectedCategory: string
  selectedBrand: string
  priceRange: number[]
  sortBy: string
  onCategoryChange: (category: string) => void
  onBrandChange: (brand: string) => void
  onPriceRangeChange: (range: number[]) => void
  onSortChange: (sort: string) => void
}

export function ProductFilters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  priceRange,
  sortBy,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onSortChange,
}: ProductFiltersProps) {
  const [filtersVisible, setFiltersVisible] = useState(true)
  const [showSort, setShowSort] = useState(true)
  const [showCategory, setShowCategory] = useState(true)
  const [showBrand, setShowBrand] = useState(true)
  const [showPrice, setShowPrice] = useState(true)

  if (!filtersVisible) {
    return (
      <div className="text-center mt-4">
        <Button
          onClick={() => setFiltersVisible(true)}
          className="rounded-full px-5 py-2 text-smtext-black bg-white border border-gray-300 hover:bg-gray-200 transition"
        >
          Show Filters
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Hide Filters */}
      <div className="text-right">
        <Button
          onClick={() => setFiltersVisible(false)}
          className="rounded-full px-4 py-1 text-sm text-black bg-white border border-gray-300 hover:bg-gray-200"
        >
          Hide Filters
        </Button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-6">
        {/* Sort By */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader
            onClick={() => setShowSort(!showSort)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <CardTitle className="text-base font-medium">Sort By</CardTitle>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSort ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
          {showSort && (
            <CardContent>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          )}
        </Card>

         {/* Price Range */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader
            onClick={() => setShowPrice(!showPrice)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <CardTitle className="text-base font-medium">Price Range</CardTitle>
              <ChevronDown className={`w-4 h-4 transition-transform ${showPrice ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
          {showPrice && (
            <CardContent className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={onPriceRangeChange}
                max={500}
                min={0}
                step={10}
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Categories */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader
            onClick={() => setShowCategory(!showCategory)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <CardTitle className="text-base font-medium">Categories</CardTitle>
              <ChevronDown className={`w-4 h-4 transition-transform ${showCategory ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
          {showCategory && (
            <CardContent>
              <RadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value={category} id={category} />
                    <Label htmlFor={category} className="cursor-pointer">{category}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          )}
        </Card>

        {/* Brands */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader
            onClick={() => setShowBrand(!showBrand)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <CardTitle className="text-base font-medium">Brands</CardTitle>
              <ChevronDown className={`w-4 h-4 transition-transform ${showBrand ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
          {showBrand && (
            <CardContent>
              <RadioGroup value={selectedBrand} onValueChange={onBrandChange}>
                {brands.slice(0, 10).map((brand) => (
                  <div key={brand} className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value={brand} id={brand} />
                    <Label htmlFor={brand} className="cursor-pointer text-sm">{brand}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          )}
        </Card>

       
      </div>
    </div>
  )
}
