"use client"
import { useState, useEffect } from "react"
import { DialogDescription } from "@/components/ui/dialog"

import { DialogTitle } from "@/components/ui/dialog"

import { DialogHeader } from "@/components/ui/dialog"

import type React from "react"

import { useApi } from "@/contexts/api-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Mail, Phone, Plus, Building2 } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export interface Vendor {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  companyName: string
  profileImage: string
  products: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function VendorDashboardPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddVendorDialogOpen, setIsAddVendorDialogOpen] = useState(false)
  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
  })

  const { getVendorById, getVendors, updateVendor, addVendor } = useApi()

  const fetchVendors = async () => {
    const data = await getVendors()
    setVendors(data)
    console.log(data)
  }

  useEffect(() => {
    fetchVendors()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewVendor((prev) => ({ ...prev, [id]: value }))
  }

  const handleAddVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addVendor(newVendor)
      await fetchVendors() // Re-fetch to update the list
      setNewVendor({ name: "", email: "", phone: "", address: "", companyName: "" }) // Reset form
      setIsAddVendorDialogOpen(false) // Close dialog
    } catch (error) {
      console.error("Failed to add vendor:", error)
      // Optionally, show an error message to the user
    }
  }

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "Active" && vendor.isActive) ||
      (statusFilter === "Inactive" && !vendor.isActive)
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
          {/* The Dialog component now wraps the Button and its own content */}
          <Dialog open={isAddVendorDialogOpen} onOpenChange={setIsAddVendorDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>Fill in the details to add a new fragrance vendor.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddVendorSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newVendor.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newVendor.email}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newVendor.phone}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="companyName" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="companyName"
                    value={newVendor.companyName}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={newVendor.address}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Vendor</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
                <span className="text-green-600">{vendors.filter((v) => v.isActive).length} active</span>
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Vendor Management</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
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
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={vendor.profileImage || "/placeholder.svg"} />
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
                          <div className="text-sm text-muted-foreground">{vendor.companyName}</div>
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
                    <TableCell>{vendor.address}</TableCell>
                    <TableCell>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full border ${
                          vendor.isActive
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-red-100 text-red-700 border-red-300"
                        }`}
                      >
                        {vendor.isActive ? "Active" : "Inactive"}
                      </span>
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
