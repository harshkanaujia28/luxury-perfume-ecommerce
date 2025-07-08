"use client"

import type React from "react"
import { useState } from "react"
import { Plus, X, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductFormData {
  name: string
  brand: string
  description: string
  price: number
  stock: number
  images: string[]
  category: string
  seller: string
  rating: number
  reviews: {
    userId: string
    name: string
    comment: string
    stars: number
  }[]
  offer: {
    isActive: boolean
    type: "percentage" | "fixed" | "bogo" | "bundle"
    value: number
    startDate: string
    endDate: string
    description: string
    minQuantity: number
    maxUses: number
  }
}

export default function AddProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    description: "",
    price: 0,
    stock: 1,
    images: [],
    category: "",
    seller: "",
    rating: 0,
    reviews: [],
    offer: {
      isActive: false,
      type: "percentage",
      value: 0,
      startDate: "",
      endDate: "",
      description: "",
      minQuantity: 1,
      maxUses: 0,
    },
  })

  const [newImage, setNewImage] = useState("")
  const [newReview, setNewReview] = useState({
    userId: "",
    name: "",
    comment: "",
    stars: 5,
  })

  const categories = ["Luxury", "Premium", "Classic", "Modern", "Seasonal", "Limited Edition"]
  const sellers = ["Seller 1", "Seller 2", "Seller 3", "Seller 4"] // This would come from your sellers database

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOfferChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        [field]: value,
      },
    }))
  }

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }))
      setNewImage("")
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addReview = () => {
    if (newReview.name.trim() && newReview.comment.trim()) {
      setFormData((prev) => ({
        ...prev,
        reviews: [...prev.reviews, { ...newReview, userId: `user_${Date.now()}` }],
      }))
      setNewReview({
        userId: "",
        name: "",
        comment: "",
        stars: 5,
      })
    }
  }

  const removeReview = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Product Data:", formData)
    // Here you would typically send the data to your backend
    alert("Product added successfully! (Check console for data)")
  }

  const handlePreview = () => {
    console.log("Preview Data:", formData)
    alert("Preview functionality would open product preview (Check console for data)")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-1">Create a new product listing for your store</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Product
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="e.g., Artisan Luxe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => handleInputChange("brand", e.target.value)}
                        placeholder="e.g., Luxe Collection"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                        placeholder="199.00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="seller">Seller *</Label>
                      <Select value={formData.seller} onValueChange={(value) => handleInputChange("seller", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select seller" />
                        </SelectTrigger>
                        <SelectContent>
                          {sellers.map((seller) => (
                            <SelectItem key={seller} value={seller}>
                              {seller}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="A sophisticated blend of amber and vanilla with hints of bergamot..."
                      rows={4}
                    />
                  </div>

                  {/* Offer Section */}
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-orange-800">Special Offer Settings</CardTitle>
                        <Switch
                          id="offerActive"
                          checked={formData.offer.isActive}
                          onCheckedChange={(checked) => handleOfferChange("isActive", checked)}
                        />
                      </div>
                    </CardHeader>
                    {formData.offer.isActive && (
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="offerType">Offer Type</Label>
                            <Select
                              value={formData.offer.type}
                              onValueChange={(value) => handleOfferChange("type", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select offer type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="percentage">Percentage Discount</SelectItem>
                                <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                                <SelectItem value="bogo">Buy One Get One</SelectItem>
                                <SelectItem value="bundle">Bundle Deal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="offerValue">
                              {formData.offer.type === "percentage"
                                ? "Discount (%)"
                                : formData.offer.type === "fixed"
                                  ? "Amount Off ($)"
                                  : "Offer Value"}
                            </Label>
                            <Input
                              id="offerValue"
                              type="number"
                              min="0"
                              max={formData.offer.type === "percentage" ? "100" : undefined}
                              step={formData.offer.type === "percentage" ? "1" : "0.01"}
                              value={formData.offer.value}
                              onChange={(e) => handleOfferChange("value", Number.parseFloat(e.target.value) || 0)}
                              placeholder={formData.offer.type === "percentage" ? "25" : "50.00"}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="offerDescription">Offer Description</Label>
                          <Input
                            id="offerDescription"
                            value={formData.offer.description}
                            onChange={(e) => handleOfferChange("description", e.target.value)}
                            placeholder="e.g., Summer Sale - Limited Time Only!"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                              id="startDate"
                              type="datetime-local"
                              value={formData.offer.startDate}
                              onChange={(e) => handleOfferChange("startDate", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                              id="endDate"
                              type="datetime-local"
                              value={formData.offer.endDate}
                              onChange={(e) => handleOfferChange("endDate", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="minQuantity">Minimum Quantity</Label>
                            <Input
                              id="minQuantity"
                              type="number"
                              min="1"
                              value={formData.offer.minQuantity}
                              onChange={(e) => handleOfferChange("minQuantity", Number.parseInt(e.target.value) || 1)}
                              placeholder="1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="maxUses">Max Uses (0 = unlimited)</Label>
                            <Input
                              id="maxUses"
                              type="number"
                              min="0"
                              value={formData.offer.maxUses}
                              onChange={(e) => handleOfferChange("maxUses", Number.parseInt(e.target.value) || 0)}
                              placeholder="0"
                            />
                          </div>
                        </div>
                        {/* Offer Preview */}
                        <div className="mt-4 p-3 bg-white rounded-lg border">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Offer Preview:</h4>
                          <div className="text-sm space-y-1">
                            {formData.offer.type === "percentage" && formData.offer.value > 0 && (
                              <p className="text-green-600 font-medium">
                                {formData.offer.value}% OFF - Save $
                                {((formData.price * formData.offer.value) / 100).toFixed(2)}
                              </p>
                            )}
                            {formData.offer.type === "fixed" && formData.offer.value > 0 && (
                              <p className="text-green-600 font-medium">
                                ${formData.offer.value} OFF - Final Price: $
                                {(formData.price - formData.offer.value).toFixed(2)}
                              </p>
                            )}
                            {formData.offer.description && (
                              <p className="text-gray-600">{formData.offer.description}</p>
                            )}
                            {formData.offer.startDate && formData.offer.endDate && (
                              <p className="text-gray-500 text-xs">
                                Valid: {new Date(formData.offer.startDate).toLocaleDateString()} -{" "}
                                {new Date(formData.offer.endDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Product Images</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1"
                      />
                      <Button type="button" onClick={addImage} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg?height=100&width=100"}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                          <Badge className="absolute bottom-1 left-1 text-xs">{index + 1}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory & Rating</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => handleInputChange("stock", Number.parseInt(e.target.value) || 1)}
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rating">Product Rating (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reviewerName">Reviewer Name</Label>
                        <Input
                          id="reviewerName"
                          value={newReview.name}
                          onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviewStars">Rating (1-5)</Label>
                        <Select
                          value={newReview.stars.toString()}
                          onValueChange={(value) =>
                            setNewReview((prev) => ({ ...prev, stars: Number.parseInt(value) }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <SelectItem key={star} value={star.toString()}>
                                {star} Star{star > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reviewComment">Review Comment</Label>
                      <Textarea
                        id="reviewComment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                        placeholder="Great product, highly recommended!"
                        rows={3}
                      />
                    </div>
                    <Button type="button" onClick={addReview} variant="outline" className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Review
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Existing Reviews ({formData.reviews.length})</h4>
                    {formData.reviews.length === 0 ? (
                      <p className="text-gray-500 text-sm">No reviews added yet.</p>
                    ) : (
                      formData.reviews.map((review, index) => (
                        <div key={index} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.name}</span>
                              <Badge variant="outline">{review.stars} ⭐</Badge>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeReview(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  )
}
