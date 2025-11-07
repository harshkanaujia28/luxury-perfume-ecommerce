"use client"

import { useEffect, useState } from "react"
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
import Image from "next/image"
import { useApi } from "@/contexts/api-context"

export default function BrandsPage() {
  const { getBrandsV2, createBrand, deleteBrand, updateBrand } = useApi()
  const [brands, setBrands] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<any>(null)
  const [editBrand, setEditBrand] = useState<any>({})
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [newBrand, setNewBrand] = useState({
    name: "",
    description: "",
    fragrances: 0,
    image: "",
    status: "Pending",
    country: "",
    founded: "",
    totalSales: 0,
    rating: 0,
    marketShare: 0,
    category: { type: "Attar", gender: "Men", subCategory: "Summer" },
  })

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      const data = await getBrandsV2()
      console.log(data)
      setBrands(data)
    } catch (err) {
      console.error("Failed to fetch brands", err)
    }
  }

  const handleAddBrand = async () => {
    try {
      await createBrand(newBrand)
      setIsAddDialogOpen(false)
      fetchBrands()
    } catch (err) {
      console.error("Failed to add brand", err)
    }
  }

  const handleUpdateBrand = async () => {
    try {
      await updateBrand(editBrand._id, editBrand)
      setIsEditDialogOpen(false)
      fetchBrands()
    } catch (err) {
      console.error("Failed to update brand", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteBrand(id)
      fetchBrands()
    } catch (err) {
      console.error("Failed to delete brand", err)
    }
  }

  const handleViewBrand = (brand: any) => {
    setSelectedBrand(brand)
    setIsViewDialogOpen(true)
  }

  const handleEditBrand = (brand: any) => {
    setEditBrand({ ...brand })
    setIsEditDialogOpen(true)
  }

  const filteredBrands = (brands || [])
    .filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.country.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" ||
        `${brand.category.type} - ${brand.category.gender} - ${brand.category.subCategory}`
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
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
  const totalFragrances = brands.reduce((sum, brand) => sum + (brand.fragrances || 0), 0)
  const averageRating = brands.reduce((sum, brand) => sum + (brand.rating || 0), 0) / (brands.length || 1)

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
                    <Label>Brand Name *</Label>
                    <Input
                      value={newBrand.name}
                      onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                      placeholder="Enter brand name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category Type *</Label>
                    <Select
                      value={newBrand.category.type}
                      onValueChange={(value) =>
                        setNewBrand({ ...newBrand, category: { ...newBrand.category, type: value } })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Perfume">Perfume</SelectItem>
                        <SelectItem value="Attar">Attar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select
                      value={newBrand.category.gender}
                      onValueChange={(value) =>
                        setNewBrand({ ...newBrand, category: { ...newBrand.category, gender: value } })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Women">Women</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subcategory *</Label>
                    <Select
                      value={newBrand.category.subCategory}
                      onValueChange={(value) =>
                        setNewBrand({ ...newBrand, category: { ...newBrand.category, subCategory: value } })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Celebrity">Celebrity</SelectItem>
                        <SelectItem value="Summer">Summer</SelectItem>
                        <SelectItem value="Gym">Gym</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Winter">Winter</SelectItem>
                        <SelectItem value="Party, Dates, Special Occasion">Party, Dates, Special Occasion</SelectItem>
                        <SelectItem value="Traditional">Traditional</SelectItem>
                        <SelectItem value="Spiritual & Devotional">Spiritual & Devotional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={newBrand.description}
                    onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                    placeholder="Enter brand description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <Input
                      value={newBrand.country}
                      onChange={(e) => setNewBrand({ ...newBrand, country: e.target.value })}
                      placeholder="Enter country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Founded Year</Label>
                    <Input
                      type="number"
                      value={newBrand.founded}
                      onChange={(e) => setNewBrand({ ...newBrand, founded: e.target.value })}
                      placeholder="e.g., 1946"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBrand}>Add Brand</Button>
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

        {/* Brands Table */}
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
                    <SelectItem value="Perfume">Perfume</SelectItem>
                    <SelectItem value="Attar">Attar</SelectItem>
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
                  <TableRow key={brand._id} className="hover:bg-muted/50">
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
                        {brand.category?.type} - {brand.category?.gender} - {brand.category?.subCategory}
                      </Badge>
                    </TableCell>
                    <TableCell>{brand.country}</TableCell>
                    <TableCell>{brand.founded}</TableCell>
                    <TableCell>{brand.fragrances}</TableCell>
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
                            style={{ width: `${Math.min((brand.marketShare || 0) * 8, 100)}%` }}
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
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewBrand(brand)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditBrand(brand)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(brand._id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
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

        {/* View Brand Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Brand Details</DialogTitle>
            </DialogHeader>
            {selectedBrand && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={selectedBrand.image || "/placeholder.svg"}
                    alt={selectedBrand.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover border"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{selectedBrand.name}</h3>
                    <Badge
                      variant={selectedBrand.status === "Active" ? "default" : "secondary"}
                      className={selectedBrand.status === "Active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {selectedBrand.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                    <p className="text-sm">
                      {selectedBrand.category?.type} - {selectedBrand.category?.gender} -{" "}
                      {selectedBrand.category?.subCategory}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Country</Label>
                    <p className="text-sm">{selectedBrand.country}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Founded</Label>
                    <p className="text-sm">{selectedBrand.founded}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Total Fragrances</Label>
                    <p className="text-sm">{selectedBrand.fragrances}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Total Sales</Label>
                    <p className="text-sm">₹{(selectedBrand.totalSales / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Rating</Label>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{selectedBrand.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Market Share</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((selectedBrand.marketShare || 0) * 8, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{selectedBrand.marketShare}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="text-sm leading-relaxed">{selectedBrand.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Brand Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Brand</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Brand Name *</Label>
                  <Input
                    value={editBrand.name || ""}
                    onChange={(e) => setEditBrand({ ...editBrand, name: e.target.value })}
                    placeholder="Enter brand name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category Type *</Label>
                  <Select
                    value={editBrand.category?.type || ""}
                    onValueChange={(value) =>
                      setEditBrand({
                        ...editBrand,
                        category: { ...editBrand.category, type: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Perfume">Perfume</SelectItem>
                      <SelectItem value="Attar">Attar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select
                    value={editBrand.category?.gender || ""}
                    onValueChange={(value) =>
                      setEditBrand({
                        ...editBrand,
                        category: { ...editBrand.category, gender: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subcategory *</Label>
                  <Select
                    value={editBrand.category?.subCategory || ""}
                    onValueChange={(value) =>
                      setEditBrand({
                        ...editBrand,
                        category: { ...editBrand.category, subCategory: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Celebrity">Celebrity</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="Gym">Gym</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                      <SelectItem value="Party, Dates, Special Occasion">Party, Dates, Special Occasion</SelectItem>
                      <SelectItem value="Traditional">Traditional</SelectItem>
                      <SelectItem value="Spiritual & Devotional">Spiritual & Devotional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  value={editBrand.description || ""}
                  onChange={(e) => setEditBrand({ ...editBrand, description: e.target.value })}
                  placeholder="Enter brand description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Country *</Label>
                  <Input
                    value={editBrand.country || ""}
                    onChange={(e) => setEditBrand({ ...editBrand, country: e.target.value })}
                    placeholder="Enter country"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Founded Year</Label>
                  <Input
                    type="number"
                    value={editBrand.founded || ""}
                    onChange={(e) => setEditBrand({ ...editBrand, founded: e.target.value })}
                    placeholder="e.g., 1946"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total Fragrances</Label>
                  <Input
                    type="number"
                    value={editBrand.fragrances || 0}
                    onChange={(e) => setEditBrand({ ...editBrand, fragrances: Number.parseInt(e.target.value) || 0 })}
                    placeholder="Number of fragrances"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editBrand.status || ""}
                    onValueChange={(value) => setEditBrand({ ...editBrand, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editBrand.rating || 0}
                    onChange={(e) => setEditBrand({ ...editBrand, rating: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="Rating (0-5)"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Market Share (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={editBrand.marketShare || 0}
                    onChange={(e) =>
                      setEditBrand({ ...editBrand, marketShare: Number.parseFloat(e.target.value) || 0 })
                    }
                    placeholder="Market share percentage"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateBrand}>Update Brand</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
