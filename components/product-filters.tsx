"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface ProductFiltersProps {
  categories: string[]
  genders: string[]
  brands: string[]
  selectedCategory: string
  selectedBrand: string
  selectedGender: string
  priceRange: number[]
  sortBy: string
  onCategoryChange: (category: string) => void
  onBrandChange: (brand: string) => void
  onGenderChange: (gender: string) => void
  onPriceRangeChange: (range: number[]) => void
  onSortChange: (sort: string) => void
}

export function ProductFilters({
  categories,
  genders,
  brands,
  selectedCategory,
  selectedBrand,
  selectedGender,
  priceRange,
  sortBy,
  onCategoryChange,
  onBrandChange,
  onGenderChange,
  onPriceRangeChange,
  onSortChange,
}: ProductFiltersProps) {
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const [showBrand, setShowBrand] = useState(false)
  const [showPrice, setShowPrice] = useState(false)
  const [showGender, setShowGender] = useState(false)

  if (!filtersVisible) {
    return (
      <div className="text-center mt-4">
        <Button
          onClick={() => setFiltersVisible(true)}
          className="rounded-full px-5 py-2 text-sm text-black bg-white border border-gray-300 hover:bg-gray-200 transition"
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
          onClick={() => setFiltersVisible(true)}
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

        {/* Genders */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader
            onClick={() => setShowGender(!showGender)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <CardTitle className="text-base font-medium">Gender</CardTitle>
              <ChevronDown className={`w-4 h-4 transition-transform ${showGender ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
          {showGender && (
            <CardContent>
              <div className="max-h-48 overflow-y-auto pr-2">
                <RadioGroup value={selectedGender} onValueChange={onGenderChange}>
                  {genders.map((gender) => (
                    <div key={gender} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={gender} id={gender} />
                      <Label htmlFor={gender} className="cursor-pointer text-sm">
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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
              <div className="max-h-48 overflow-y-auto pr-2">
                <RadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={category} id={category} />
                      <Label htmlFor={category} className="cursor-pointer">{category}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
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
              <div className="max-h-48 overflow-y-auto pr-2">
                <RadioGroup value={selectedBrand} onValueChange={onBrandChange}>
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={brand} id={brand} />
                      <Label htmlFor={brand} className="cursor-pointer">{brand}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          )}

        </Card>


      </div>
    </div>
  )
}
