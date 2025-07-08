"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Building2, Phone, Mail, MapPin, Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const vendors = [
  {
    id: 1,
    name: "Luxury Fragrance Distributors",
    contactPerson: "Marie Dubois",
    email: "marie@luxuryfragrances.com",
    phone: "+33 1 42 86 87 88",
    website: "www.luxuryfragrances.com",
    address: {
      street: "15 Rue de la Paix",
      city: "Paris",
      state: "Île-de-France",
      zipCode: "75002",
      country: "France",
    },
    logo: "/placeholder.svg",
    status: "Active",
    rating: 4.8,
    totalOrders: 156,
    totalValue: 2450000,
    joinDate: "2022-03-15",
    lastOrder: "2024-01-10",
    specialties: ["Luxury Brands", "European Fragrances", "Limited Editions"],
    brands: ["Chanel", "Dior", "Hermès", "Guerlain"],
    paymentTerms: "Net 30",
    minimumOrder: 5000,
    shippingMethods: ["Air Freight", "Express Courier"],
    certifications: ["ISO 9001", "IFRA Certified"],
    notes: "Premium supplier for luxury French fragrances. Excellent quality and reliability.",
  },
  {
    id: 2,
    name: "American Scent Supply Co.",
    contactPerson: "John Mitchell",
    email: "john@americanscent.com",
    phone: "+1 (555) 123-4567",
    website: "www.americanscent.com",
    address: {
      street: "1250 Broadway",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    logo: "/placeholder.svg",
    status: "Active",
    rating: 4.6,
    totalOrders: 89,
    totalValue: 1200000,
    joinDate: "2023-01-20",
    lastOrder: "2024-01-12",
    specialties: ["Designer Brands", "Celebrity Fragrances", "Mass Market"],
    brands: ["Tom Ford", "Marc Jacobs", "Calvin Klein", "Ralph Lauren"],
    paymentTerms: "Net 15",
    minimumOrder: 2500,
    shippingMethods: ["Ground Shipping", "Express Delivery"],
    certifications: ["FDA Registered", "Good Manufacturing Practice"],
    notes: "Reliable supplier for American designer brands with fast shipping.",
  },
  
 
  

]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Inactive":
      return "bg-red-100 text-red-800 border-red-200"
    case "Suspended":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">({rating})</span>
    </div>
  )
}

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVendor, setSelectedVendor] = useState<(typeof vendors)[0] | null>(null)

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.brands.some((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col">
    
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Fragrance Vendors</h2>
            <p className="text-muted-foreground">Manage your fragrance suppliers and distributors</p>
          </div>
          <Button asChild>
            <Link href="/vendors/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendors.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{vendors.filter((v) => v.status === "Active").length} active</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendors.reduce((sum, v) => sum + v.totalOrders, 0)}</div>
              <p className="text-xs text-muted-foreground">Across all vendors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(vendors.reduce((sum, v) => sum + v.totalValue, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">Total procurement value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  vendors.filter((v) => v.rating > 0).reduce((sum, v) => sum + v.rating, 0) /
                  vendors.filter((v) => v.rating > 0).length
                ).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Average vendor rating</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Management</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={vendor.logo || "/placeholder.svg"} />
                          <AvatarFallback>
                            {vendor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-sm text-muted-foreground">{vendor.contactPerson}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3" />
                          {vendor.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-1 h-3 w-3" />
                          {vendor.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.slice(0, 2).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {vendor.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{vendor.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{vendor.totalOrders} orders</div>
                        <div className="text-muted-foreground">${(vendor.totalValue / 1000).toFixed(0)}K value</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vendor.status)} variant="secondary">
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {vendor.rating > 0 ? (
                        <StarRating rating={vendor.rating} />
                      ) : (
                        <span className="text-sm text-muted-foreground">No rating</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedVendor(vendor)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-purple-600" />
                                Vendor Details - {selectedVendor?.name}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedVendor && (
                              <div className="space-y-6">
                                {/* Vendor Header */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                      <AvatarImage src={selectedVendor.logo || "/placeholder.svg"} />
                                      <AvatarFallback className="text-lg">
                                        {selectedVendor.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .slice(0, 2)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="text-xl font-semibold">{selectedVendor.name}</h3>
                                      <p className="text-muted-foreground">{selectedVendor.contactPerson}</p>
                                      <Badge className={getStatusColor(selectedVendor.status)} variant="secondary">
                                        {selectedVendor.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    {selectedVendor.rating > 0 && <StarRating rating={selectedVendor.rating} />}
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Member since {selectedVendor.joinDate}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* Contact Information */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center gap-2">
                                        <Phone className="h-5 w-5" />
                                        Contact Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{selectedVendor.email}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{selectedVendor.phone}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <div className="text-sm">
                                          <p>{selectedVendor.address.street}</p>
                                          <p>
                                            {selectedVendor.address.city}, {selectedVendor.address.state}{" "}
                                            {selectedVendor.address.zipCode}
                                          </p>
                                          <p>{selectedVendor.address.country}</p>
                                        </div>
                                      </div>
                                      {selectedVendor.website && (
                                        <div className="text-sm">
                                          <span className="font-medium">Website: </span>
                                          <a
                                            href={`https://${selectedVendor.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                          >
                                            {selectedVendor.website}
                                          </a>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  {/* Business Information */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Business Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="font-medium">Payment Terms:</span>
                                          <p className="text-muted-foreground">{selectedVendor.paymentTerms}</p>
                                        </div>
                                        <div>
                                          <span className="font-medium">Min Order:</span>
                                          <p className="text-muted-foreground">
                                            ${selectedVendor.minimumOrder.toLocaleString()}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <span className="font-medium text-sm">Shipping Methods:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {selectedVendor.shippingMethods.map((method) => (
                                            <Badge key={method} variant="outline" className="text-xs">
                                              {method}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <span className="font-medium text-sm">Certifications:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {selectedVendor.certifications.map((cert) => (
                                            <Badge key={cert} variant="secondary" className="text-xs">
                                              {cert}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Performance Metrics */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-2xl font-bold">{selectedVendor.totalOrders}</div>
                                      <p className="text-sm text-muted-foreground">Total Orders</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-2xl font-bold">
                                        ${(selectedVendor.totalValue / 1000).toFixed(0)}K
                                      </div>
                                      <p className="text-sm text-muted-foreground">Total Value</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-2xl font-bold">
                                        {selectedVendor.lastOrder || "No orders"}
                                      </div>
                                      <p className="text-sm text-muted-foreground">Last Order</p>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Specialties and Brands */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Specialties</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedVendor.specialties.map((specialty) => (
                                          <Badge key={specialty} variant="secondary">
                                            {specialty}
                                          </Badge>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Brands Supplied</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedVendor.brands.map((brand) => (
                                          <Badge key={brand} variant="outline">
                                            {brand}
                                          </Badge>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Notes */}
                                {selectedVendor.notes && (
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-sm">{selectedVendor.notes}</p>
                                    </CardContent>
                                  </Card>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/vendors/edit/${vendor.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
