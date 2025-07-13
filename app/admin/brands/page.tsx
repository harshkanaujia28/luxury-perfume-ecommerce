"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Edit, Trash2, Eye, Star, TrendingUp, Package } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Image from "next/image"

const brands = [
  {
    id: 1,
    name: "Chanel",
    description: "French luxury fashion house founded by Gabrielle 'Coco' Chanel",
    fragrances: 45,
    image: "/placeholder.svg?height=60&width=60",
    status: "Active",
    country: "France",
    founded: "1910",
    totalSales: 2850000,
    rating: 4.8,
    marketShare: 12.5,
    category: "Luxury",
  },
  {
    id: 2,
    name: "Dior",
    description: "French luxury goods company controlled by LVMH",
    fragrances: 38,
    image: "/placeholder.svg?height=60&width=60",
    status: "Active",
    country: "France",
    founded: "1946",
    totalSales: 2100000,
    rating: 4.7,
    marketShare: 9.8,
    category: "Luxury",
  },
  {
    id: 3,
    name: "Tom Ford",
    description: "American fashion designer and film director",
    fragrances: 67,
    image: "/placeholder.svg?height=60&width=60",
    status: "Active",
    country: "USA",
    founded: "2005",
    totalSales: 1890000,
    rating: 4.6,
    marketShare: 8.2,
    category: "Designer",
  },
  {
    id: 4,
    name: "Creed",
    description: "Anglo-French multi-national niche perfume house",
    fragrances: 89,
    image: "/placeholder.svg?height=60&width=60",
    status: "Active",
    country: "France",
    founded: "1760",
    totalSales: 1650000,
    rating: 4.9,
    marketShare: 7.1,
    category: "Niche",
  },
  {
    id: 5,
    name: "Marc Jacobs",
    description: "American fashion designer",
    fragrances: 23,
    image: "/placeholder.svg?height=60&width=60",
    status: "Active",
    country: "USA",
    founded: "1984",
    totalSales: 980000,
    rating: 4.4,
    marketShare: 4.2,
    category: "Designer",
  },
  {
    id: 6,
    name: "Versace",
    description: "Italian luxury fashion company",
    fragrances: 34,
    image: "/placeholder.svg?height=60&width=60",
    status: "Active",
    country: "Italy",
    founded: "1978",
    totalSales: 1200000,
    rating: 4.5,
    marketShare: 5.8,
    category: "Luxury",
  },
  {
    id: 7,
    name: "Calvin Klein",
    description: "American fashion brand",
    fragrances: 42,
    image: "/placeholder.svg?height=60&width=60",
    status: "Active",
    country: "USA",
    founded: "1968",
    totalSales: 1450000,
    rating: 4.3,
    marketShare: 6.5,
    category: "Designer",
  },
  {
    id: 8,
    name: "Armani",
    description: "Italian luxury fashion house",
    fragrances: 56,
    image: "/placeholder.svg?height=60&width=60",
    status: "Active",
    country: "Italy",
    founded: "1975",
    totalSales: 1780000,
    rating: 4.6,
    marketShare: 7.8,
    category: "Luxury",
  },
]

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const router = useRouter()

  const filteredBrands = brands
    .filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.country.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || brand.category.toLowerCase() === selectedCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "sales":
          return b.totalSales - a.totalSales
        case "rating":
          return b.rating - a.rating
        case "fragrances":
          return b.fragrances - a.fragrances
        default:
          return 0
      }
    })

  const totalBrands = brands.length
  const activeBrands = brands.filter((b) => b.status === "Active").length
  const totalFragrances = brands.reduce((sum, brand) => sum + brand.fragrances, 0)
  const averageRating = brands.reduce((sum, brand) => sum + brand.rating, 0) / brands.length

  const handleViewBrand = (brandId: number) => {
    router.push(`/brands/${brandId}`)
  }

  return (
    <div className="flex flex-col">
     
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Fragrance Brands</h2>
            <p className="text-muted-foreground">Manage perfume and cologne brands in your marketplace</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Fragrance Brand</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand-name">Brand Name *</Label>
                    <Input id="brand-name" placeholder="Enter brand name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand-category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="niche">Niche</SelectItem>
                        <SelectItem value="celebrity">Celebrity</SelectItem>
                        <SelectItem value="mass-market">Mass Market</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand-description">Description *</Label>
                  <Textarea id="brand-description" placeholder="Enter brand description and history" rows={3} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand-country">Country *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>
                        <SelectItem value="italy">Italy</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="spain">Spain</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand-founded">Founded Year</Label>
                    <Input id="brand-founded" placeholder="e.g., 1946" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand-status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand-website">Website URL</Label>
                  <Input id="brand-website" placeholder="https://www.brandname.com" type="url" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand-logo">Brand Logo</Label>
                  <Input id="brand-logo" type="file" accept="image/*" />
                  <p className="text-sm text-muted-foreground">Upload brand logo (PNG, JPG, SVG - Max 2MB)</p>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Add Brand</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Brands</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBrands}</div>
              <p className="text-xs text-muted-foreground">{activeBrands} active brands</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fragrances</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFragrances}</div>
              <p className="text-xs text-muted-foreground">Across all brands</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Customer satisfaction</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Chanel</div>
              <p className="text-xs text-muted-foreground">Highest sales volume</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Brand Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search brands, descriptions, or countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="niche">Niche</SelectItem>
                    <SelectItem value="celebrity">Celebrity</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="fragrances">Fragrances</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Founded</TableHead>
                  <TableHead>Fragrances</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Market Share</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBrands.map((brand) => (
                  <TableRow key={brand.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={brand.image || "/placeholder.svg"}
                          alt={brand.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover border"
                        />
                        <div>
                          <div className="font-medium">{brand.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {brand.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {brand.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{brand.country}</TableCell>
                    <TableCell>{brand.founded}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        {brand.fragrances}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">₹{(brand.totalSales / 100000).toFixed(1)}L</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{brand.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min(brand.marketShare * 8, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{brand.marketShare}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={brand.status === "Active" ? "default" : "secondary"}
                        className={brand.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {brand.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewBrand(brand.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredBrands.length === 0 && (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No brands found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
