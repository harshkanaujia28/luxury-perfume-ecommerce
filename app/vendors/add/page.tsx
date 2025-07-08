"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Building2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AddVendorPage() {
  const [specialties, setSpecialties] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [shippingMethods, setShippingMethods] = useState<string[]>([])
  const [certifications, setCertifications] = useState<string[]>([])

  const addItem = (items: string[], setItems: (items: string[]) => void, newItem: string) => {
    if (!newItem.trim() || items.includes(newItem.trim())) return
    setItems([...items, newItem.trim()])
  }

  const removeItem = (items: string[], setItems: (items: string[]) => void, index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const predefinedSpecialties = [
    "Luxury Brands",
    "Designer Fragrances",
    "Niche Fragrances",
    "Celebrity Fragrances",
    "Artisan Brands",
    "Mass Market",
    "Limited Editions",
    "Vintage Fragrances",
    "Middle Eastern Fragrances",
    "European Fragrances",
    "Oud Specialists",
    "Oriental Scents",
  ]

  const predefinedBrands = [
    "Chanel",
    "Dior",
    "Tom Ford",
    "Creed",
    "Marc Jacobs",
    "Calvin Klein",
    "Ralph Lauren",
    "Hermès",
    "Guerlain",
    "Amouage",
    "Maison Francis Kurkdjian",
    "Byredo",
    "Ajmal",
    "Rasasi",
    "Montale",
  ]

  const predefinedShipping = [
    "Air Freight",
    "Express Courier",
    "Ground Shipping",
    "Express Delivery",
    "DHL Express",
    "FedEx International",
    "Air Cargo",
    "Sea Freight",
    "Royal Mail",
    "DPD",
  ]

  const predefinedCertifications = [
    "ISO 9001",
    "IFRA Certified",
    "FDA Registered",
    "Good Manufacturing Practice",
    "Organic Certified",
    "UAE Trade License",
    "Halal Certified",
    "UK Trading Standards",
    "EU Cosmetics Regulation",
    "REACH Compliance",
  ]

  return (
    <div className="flex flex-col">
     
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Add New Vendor</h2>
            <p className="text-muted-foreground">Register a new fragrance supplier or distributor</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>
              <Building2 className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="contact">Contact & Address</TabsTrigger>
            <TabsTrigger value="business">Business Details</TabsTrigger>
            <TabsTrigger value="products">Products & Specialties</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name *</Label>
                    <Input id="company-name" placeholder="Enter company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-description">Company Description</Label>
                    <Textarea id="company-description" placeholder="Brief description of the company" rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="www.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID / Registration Number</Label>
                    <Input id="tax-id" placeholder="Enter tax identification number" />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Company Logo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 2MB. Recommended size: 200x200px</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Person Name *</Label>
                    <Input id="contact-name" placeholder="Enter contact person name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-title">Job Title</Label>
                    <Input id="contact-title" placeholder="e.g., Sales Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address *</Label>
                    <Input id="contact-email" type="email" placeholder="contact@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number *</Label>
                    <Input id="contact-phone" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-mobile">Mobile Number</Label>
                    <Input id="contact-mobile" placeholder="+1 (555) 987-6543" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address-street">Street Address *</Label>
                    <Input id="address-street" placeholder="Enter street address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address-city">City *</Label>
                      <Input id="address-city" placeholder="Enter city" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-state">State/Province</Label>
                      <Input id="address-state" placeholder="Enter state" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address-zip">ZIP/Postal Code</Label>
                      <Input id="address-zip" placeholder="Enter ZIP code" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-country">Country *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="it">Italy</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="jp">Japan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment & Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-terms">Payment Terms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prepaid">Prepaid</SelectItem>
                        <SelectItem value="net-15">Net 15</SelectItem>
                        <SelectItem value="net-30">Net 30</SelectItem>
                        <SelectItem value="net-45">Net 45</SelectItem>
                        <SelectItem value="net-60">Net 60</SelectItem>
                        <SelectItem value="cod">Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimum-order">Minimum Order Value ($)</Label>
                    <Input id="minimum-order" type="number" placeholder="5000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Preferred Currency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="aed">AED (د.إ)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credit-limit">Credit Limit ($)</Label>
                    <Input id="credit-limit" type="number" placeholder="50000" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping & Logistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Shipping Methods</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {shippingMethods.map((method, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {method}
                          <button
                            onClick={() => removeItem(shippingMethods, setShippingMethods, index)}
                            className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={(value) => addItem(shippingMethods, setShippingMethods, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add shipping method" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedShipping
                          .filter((method) => !shippingMethods.includes(method))
                          .map((method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-time">Lead Time (days)</Label>
                    <Input id="lead-time" type="number" placeholder="7" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping-origin">Shipping Origin</Label>
                    <Input id="shipping-origin" placeholder="e.g., Paris, France" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Certifications & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {cert}
                        <button
                          onClick={() => removeItem(certifications, setCertifications, index)}
                          className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addItem(certifications, setCertifications, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add certification" />
                    </SelectTrigger>
                    <SelectContent>
                      {predefinedCertifications
                        .filter((cert) => !certifications.includes(cert))
                        .map((cert) => (
                          <SelectItem key={cert} value={cert}>
                            {cert}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance Coverage</Label>
                  <Input id="insurance" placeholder="Insurance provider and coverage details" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Specialties</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {specialty}
                          <button
                            onClick={() => removeItem(specialties, setSpecialties, index)}
                            className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={(value) => addItem(specialties, setSpecialties, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedSpecialties
                          .filter((specialty) => !specialties.includes(specialty))
                          .map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-categories">Product Categories</Label>
                    <Textarea id="product-categories" placeholder="Describe the types of products offered" rows={3} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brands Supplied</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Fragrance Brands</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {brands.map((brand, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {brand}
                          <button
                            onClick={() => removeItem(brands, setBrands, index)}
                            className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={(value) => addItem(brands, setBrands, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedBrands
                          .filter((brand) => !brands.includes(brand))
                          .map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exclusive-brands">Exclusive Brands</Label>
                    <Textarea
                      id="exclusive-brands"
                      placeholder="List any exclusive or limited distribution brands"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor-notes">Notes</Label>
                  <Textarea
                    id="vendor-notes"
                    placeholder="Additional notes about the vendor, special requirements, or important information"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="preferred-vendor" />
                    <Label htmlFor="preferred-vendor">Preferred Vendor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exclusive-supplier" />
                    <Label htmlFor="exclusive-supplier">Exclusive Supplier</Label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="drop-shipping" />
                    <Label htmlFor="drop-shipping">Drop Shipping Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="private-label" />
                    <Label htmlFor="private-label">Private Label Services</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
