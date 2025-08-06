"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, X, Save, Eye, Package, ImageIcon, BarChart3, MessageSquare, Sparkles, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useApi } from "@/contexts/api-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const categories = [
  "Perfume - Men - Celebrity",
  "Perfume - Men - Summer",
  "Perfume - Men - Gym",
  "Perfume - Men - Office",
  "Perfume - Men - Winter",
  "Perfume - Men - Party, Dates, Special Occasion",
  "Perfume - Women - Celebrity",
  "Perfume - Women - Summer",
  "Perfume - Women - Gym",
  "Perfume - Women - Office",
  "Perfume - Women - Winter",
  "Perfume - Women - Party, Dates, Special Occasion",
  "Attar - Men - Traditional",
  "Attar - Men - Summer",
  "Attar - Men - Gym",
  "Attar - Men - Office",
  "Attar - Men - Winter",
  "Attar - Men - Spiritual & Devotional",
  "Attar - Women - Traditional",
  "Attar - Women - Summer",
  "Attar - Women - Gym",
  "Attar - Women - Office",
  "Attar - Women - Winter",
  "Attar - Women - Spiritual & Devotional",
];

export default function AddProductForm({ onProductAdded }: { onProductAdded?: () => void }) {
  const { addProduct, createOffer } = useApi();
  const [newImage, setNewImage] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    stock: 0,
    rating: 0,
    type: "", // "Perfume" or "Attar"
    gender: "", // "Men" or "Women"
    subCategory: "", // see list below
    seller: "admin",
    images: [] as File[], // for file uploads
    reviews: [] as { name: string; comment: string; stars: number }[],
    offer: {
      isActive: false,
      type: "percentage" as "percentage" | "fixed" | "bogo" | "bundle",
      value: 0,
      startDate: "",
      endDate: "",
      description: "",
      minQuantity: 1,
      maxUses: 0,
    },
    quantity: [] as string[],
    features: [] as string[],
    specifications: {
      skinType: "",
      sillage: "",
      longevity: "",
      season: "",
    },
  });


  const [newReview, setNewReview] = useState({ name: "", comment: "", stars: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [newFeature, setNewFeature] = useState("");

  // New handlers for your UI
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOfferChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        [field]: value,
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files.slice(0, 5) }));
  };

  const handleAddReview = () => {
    if (!newReview.name || !newReview.comment || newReview.stars <= 0) {
      alert("Please fill all review fields");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      reviews: [...prev.reviews, newReview],
    }));
    setNewReview({ name: "", comment: "", stars: 0 });
  };
  const removeReview = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("description", formData.description);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("features", JSON.stringify(formData.features));


      // ✅ Append full category as JSON string
      const category = {
        type: formData.type,
        gender: formData.gender,
        subCategory: formData.subCategory,
      };
      data.append("category", JSON.stringify(category));

      // ✅ Append specifications if required
      data.append("specifications", JSON.stringify(formData.specifications));

      data.append("seller", formData.seller);
      data.append("reviews", JSON.stringify(formData.reviews));
      data.append("quantity", JSON.stringify(formData.quantity));
      formData.images.forEach((file) => {
        if (file instanceof File) {
          data.append("images", file);
        }
      });

      const savedProduct = await addProduct(data);


      if (formData.offer.isActive && formData.offer.value > 0) {
        await createOffer({
          title: formData.name + " Offer", // Or any meaningful title
          discountType:
            formData.offer.type === "fixed" ? "flat" : "percentage", // Map types
          discountValue: formData.offer.value,
          startDate: new Date(formData.offer.startDate),
          endDate: new Date(formData.offer.endDate),
          product: savedProduct._id,
          isActive: true,
        });
      }

      alert("Product added successfully!");
      setIsDialogOpen(false);
      if (onProductAdded) onProductAdded();
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product");
    }
  };


  const handlePreview = () => {
    alert("Preview feature not implemented yet");
  };

  // const addImage = () => {
  //   if (!newImage.trim()) return;
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: [...prev.images, newImage],
  //   }));
  //   setNewImage("");
  // };

  // Remove image by index
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  useEffect(() => {
    return () => {
      formData.images.forEach((file) => {
        if (file instanceof File) URL.revokeObjectURL(URL.createObjectURL(file));
      });
    };
  }, [formData.images]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Mobile-optimized container */}
      <div className="w-full max-w-none px-2 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:max-w-7xl lg:mx-auto">
        {/* Mobile-first Header */}
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl border border-slate-200/60 mb-4 sm:mb-4 md:mb-6 overflow-hidden">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Mobile header layout */}
            <div className="space-y-2 sm:space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
              <div className="flex-shrink-0 p-1 bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-md">
                <Package className="w-4 h-4 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className=" pl-4 text-base sm:text-lg md:text-sm font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-snug">
                  Add New Product
                </h1>
                <p className=" pl-4 text-xs sm:xs text-slate-600 mt-0.5">
                  Create a new fragrance listing
                </p>
              </div>

              <div className="flex flex-row xs:flex-row gap-1 sm:gap-1 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={handlePreview}
                  className="flex-1 xs:flex-none h-8 sm:h-9 border-slate-300 hover:bg-slate-50 text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  <span className="hidden xs:inline">Preview</span>
                  <span className="xs:hidden">View</span>
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 xs:flex-none h-8 sm:h-9 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 shadow-md hover:shadow-lg text-xs"
                >
                  <Save className="w-3 h-3 mr-1" />
                  <span className="hidden xs:inline">Save Product</span>
                  <span className="xs:hidden">Save</span>
                </Button>
              </div>
            </div>

          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            {/* Mobile-optimized tabs */}
            <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 via-green-50 to-white pb-1">
              <TabsList className="grid w-full grid-cols-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-md p-1 shadow-sm gap-1">
                {[
                  { value: "basic", label: "Basic", icon: Package },
                  { value: "media", label: "Media", icon: ImageIcon },
                  { value: "inventory", label: "Stock", icon: BarChart3 },
                  { value: "reviews", label: "Reviews", icon: MessageSquare },
                ].map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex items-center justify-center gap-1 text-xs py-1.5 px-2 min-h-[2.2rem] rounded-md transition-all duration-200 data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow"
                  >
                    <Icon className="w-[14px] h-[14px]" />
                    <span className="leading-tight">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>


            <TabsContent value="basic" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 md:mt-8">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-lg sm:shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50 border-b border-slate-200/60 p-3 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl text-slate-800">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                  {/* Mobile-first form layout */}
                  <div className="space-y-4 sm:space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                        Product Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="e.g., Royal Oud Attar"
                        required
                        className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="brand" className="text-sm font-semibold text-slate-700">
                        Brand
                      </Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => handleChange("brand", e.target.value)}
                        placeholder="e.g., Luxe Fragrances"
                        className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Mobile-optimized 3-column layout */}
                  <div className="space-y-4 sm:space-y-5 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-4 lg:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="price" className="text-sm font-semibold text-slate-700">
                        Price (₹) *
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium text-sm sm:text-base">
                          ₹
                        </span>
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => handleChange("price", Number.parseFloat(e.target.value) || 0)}
                          placeholder="1999.00"
                          required
                          className="h-10 sm:h-11 pl-7 sm:pl-8 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="space-y-4 sm:space-y-5">
                      {/* Type */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="type" className="text-sm font-semibold text-slate-700">
                          Type
                        </Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) => handleChange("type", value)}
                        >
                          <SelectTrigger className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 text-sm sm:text-base">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-lg sm:rounded-xl border-slate-200 shadow-xl max-h-60 sm:max-h-80">
                            {["Perfume", "Attar"].map((type) => (
                              <SelectItem key={type} value={type} className="rounded-md text-xs sm:text-sm py-2">
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {/* Gender */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="gender" className="text-sm font-semibold text-slate-700">
                        Gender
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleChange("gender", value)}
                      >
                        <SelectTrigger className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 text-sm sm:text-base">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg sm:rounded-xl border-slate-200 shadow-xl max-h-60 sm:max-h-80">
                          {["Men", "Women"].map((gender) => (
                            <SelectItem key={gender} value={gender} className="rounded-md text-xs sm:text-sm py-2">
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* SubCategory */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="subCategory" className="text-sm font-semibold text-slate-700">
                        Sub Category
                      </Label>
                      <Select
                        value={formData.subCategory}
                        onValueChange={(value) => handleChange("subCategory", value)}
                      >
                        <SelectTrigger className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 text-sm sm:text-base">
                          <SelectValue placeholder="Select sub category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg sm:rounded-xl border-slate-200 shadow-xl max-h-60 sm:max-h-80">
                          {[
                            "Celebrity",
                            "Summer",
                            "Gym",
                            "Office",
                            "Winter",
                            "Party, Dates, Special Occasion",
                            "Traditional",
                            "Spiritual & Devotional",
                          ].map((sub) => (
                            <SelectItem key={sub} value={sub} className="rounded-md text-xs sm:text-sm py-2">
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="quantity" className="text-sm font-semibold text-slate-700">
                        Quantity (ML)
                      </Label>
                      <Input
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => handleChange("quantity", e.target.value)}
                        placeholder="e.g., 50ml"
                        className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700">Available Quantities (ML)</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newQuantity}
                          onChange={(e) => setNewQuantity(e.target.value)}
                          placeholder="e.g., 40ml"
                          className="h-10 sm:h-11"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const value = newQuantity.trim();
                            if (value && !formData.quantity.includes(value)) {
                              setFormData((prev) => ({
                                ...prev,
                                quantity: [...prev.quantity, value],
                              }));
                              setNewQuantity("");
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>

                      {formData.quantity.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.quantity.map((qty, index) => (
                            <Badge
                              key={index}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 border border-green-300"
                            >
                              {qty}
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="w-4 h-4 p-0"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    quantity: prev.quantity.filter((_, i) => i !== index),
                                  }))
                                }
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-slate-700">Sillage</Label>
                      <Input
                        value={formData.specifications.sillage}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            specifications: { ...prev.specifications, sillage: e.target.value },
                          }))
                        }
                        placeholder="e.g., Moderate"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-slate-700">Longevity</Label>
                      <Input
                        value={formData.specifications.longevity}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            specifications: { ...prev.specifications, longevity: e.target.value },
                          }))
                        }
                        placeholder="e.g., 8-10 hours"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-slate-700">Best Season</Label>
                      <Input
                        value={formData.specifications.season}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            specifications: { ...prev.specifications, season: e.target.value },
                          }))
                        }
                        placeholder="e.g., Winter"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700">Key Features</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="e.g., Long-lasting"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const value = newFeature.trim();
                            if (value && !formData.features.includes(value)) {
                              setFormData((prev) => ({
                                ...prev,
                                features: [...prev.features, value],
                              }));
                              setNewFeature("");
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>

                      {formData.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.features.map((feature, index) => (
                            <Badge
                              key={index}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 border border-blue-300"
                            >
                              {feature}
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="w-4 h-4 p-0"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    features: prev.features.filter((_, i) => i !== index),
                                  }))
                                }
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>


                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="seller" className="text-sm font-semibold text-slate-700">
                        Seller *
                      </Label>
                      <Select value={formData.seller} onValueChange={(value) => handleChange("seller", value)}>
                        <SelectTrigger className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 text-sm sm:text-base">
                          <SelectValue placeholder="Select seller" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg sm:rounded-xl border-slate-200 shadow-xl">
                          <SelectItem value="admin">admin</SelectItem>

                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                      Product Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="A sophisticated blend of amber and vanilla with hints of bergamot, perfect for special occasions..."
                      rows={3}
                      className="border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg transition-all duration-200 resize-none text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
                    />
                  </div>

                  {/* Enhanced Mobile-Optimized Offer Section */}
                  <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg sm:rounded-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200 p-3 sm:p-4">
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle className="flex items-center gap-2 sm:gap-3 text-amber-800 text-sm sm:text-base">
                          <div className="p-1.5 sm:p-2 bg-amber-200 rounded-lg">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
                          </div>
                          <span className="leading-tight">Special Offers</span>
                        </CardTitle>
                        <Switch
                          id="offerActive"
                          checked={formData.offer.isActive}
                          onCheckedChange={(checked) => handleOfferChange("isActive", checked)}
                          className="data-[state=checked]:bg-amber-500"
                        />
                      </div>
                    </CardHeader>
                    {formData.offer.isActive && (
                      <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                        <div className="space-y-4 sm:space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-6">
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="offerType" className="text-sm font-semibold text-amber-800">
                              Offer Type
                            </Label>
                            <Select
                              value={formData.offer.type}
                              onValueChange={(value) => handleOfferChange("type", value)}
                            >
                              <SelectTrigger className="h-10 sm:h-11 border-amber-300 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg text-sm sm:text-base">
                                <SelectValue placeholder="Select offer type" />
                              </SelectTrigger>
                              <SelectContent className="rounded-lg sm:rounded-xl border-amber-200 shadow-xl">
                                <SelectItem value="percentage" className="rounded-md text-sm py-2">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Percentage Discount
                                  </div>
                                </SelectItem>
                                <SelectItem value="fixed" className="rounded-md text-sm py-2">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Fixed Amount Off
                                  </div>
                                </SelectItem>
                                <SelectItem value="bogo" className="rounded-md text-sm py-2">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Buy One Get One
                                  </div>
                                </SelectItem>
                                <SelectItem value="bundle" className="rounded-md text-sm py-2">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Bundle Deal
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="offerValue" className="text-sm font-semibold text-amber-800">
                              {formData.offer.type === "percentage"
                                ? "Discount (%)"
                                : formData.offer.type === "fixed"
                                  ? "Amount Off (₹)"
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
                              placeholder={formData.offer.type === "percentage" ? "25" : "500.00"}
                              className="h-10 sm:h-11 border-amber-300 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          <Label htmlFor="offerDescription" className="text-sm font-semibold text-amber-800">
                            Offer Description
                          </Label>
                          <Input
                            id="offerDescription"
                            value={formData.offer.description}
                            onChange={(e) => handleOfferChange("description", e.target.value)}
                            placeholder="e.g., Summer Sale - Limited Time Only!"
                            className="h-10 sm:h-11 border-amber-300 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-4 sm:space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-6">
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="startDate" className="text-sm font-semibold text-amber-800">
                              Start Date
                            </Label>
                            <Input
                              id="startDate"
                              type="datetime-local"
                              value={formData.offer.startDate}
                              onChange={(e) => handleOfferChange("startDate", e.target.value)}
                              className="h-10 sm:h-11 border-amber-300 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="endDate" className="text-sm font-semibold text-amber-800">
                              End Date
                            </Label>
                            <Input
                              id="endDate"
                              type="datetime-local"
                              value={formData.offer.endDate}
                              onChange={(e) => handleOfferChange("endDate", e.target.value)}
                              className="h-10 sm:h-11 border-amber-300 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        <div className="space-y-4 sm:space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-6">
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="minQuantity" className="text-sm font-semibold text-amber-800">
                              Minimum Quantity
                            </Label>
                            <Input
                              id="minQuantity"
                              type="number"
                              min="1"
                              value={formData.offer.minQuantity}
                              onChange={(e) => handleOfferChange("minQuantity", Number.parseInt(e.target.value) || 1)}
                              placeholder="1"
                              className="h-10 sm:h-11 border-amber-300 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="maxUses" className="text-sm font-semibold text-amber-800">
                              Max Uses (0 = unlimited)
                            </Label>
                            <Input
                              id="maxUses"
                              type="number"
                              min="0"
                              value={formData.offer.maxUses}
                              onChange={(e) => handleOfferChange("maxUses", Number.parseInt(e.target.value) || 0)}
                              placeholder="0"
                              className="h-10 sm:h-11 border-amber-300 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        {/* Mobile-optimized Offer Preview */}
                        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-amber-200 shadow-sm">
                          <h4 className="font-semibold text-sm text-amber-800 mb-2 sm:mb-3 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Offer Preview:
                          </h4>
                          <div className="text-sm space-y-2">
                            {formData.offer.type === "percentage" && formData.offer.value > 0 && (
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                  {formData.offer.value}% OFF
                                </Badge>
                                <span className="text-green-700 font-medium text-xs sm:text-sm">
                                  Save ₹{((formData.price * formData.offer.value) / 100).toFixed(2)}
                                </span>
                              </div>
                            )}
                            {formData.offer.type === "fixed" && formData.offer.value > 0 && (
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                  ₹{formData.offer.value} OFF
                                </Badge>
                                <span className="text-green-700 font-medium text-xs sm:text-sm">
                                  Final Price: ₹{(formData.price - formData.offer.value).toFixed(2)}
                                </span>
                              </div>
                            )}
                            {formData.offer.description && (
                              <p className="text-amber-700 font-medium text-xs sm:text-sm">
                                {formData.offer.description}
                              </p>
                            )}
                            {formData.offer.startDate && formData.offer.endDate && (
                              <p className="text-amber-600 text-xs bg-amber-50 px-2 py-1 rounded">
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

            <TabsContent value="media" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 md:mt-8">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-lg sm:shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50 border-b border-slate-200/60 p-3 sm:p-4 md:p-6">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-base sm:text-lg md:text-xl text-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                      <span>Product Images</span>
                    </div>
                    <br />
                    <span className="text-xs sm:text-sm text-muted-foreground sm:mt-0 mt-1">
                      Tip: The <strong>first image</strong> you upload will be used as the <strong>main display image</strong> across the site.
                    </span>
                  </CardTitle>

                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <Label className="text-sm font-semibold text-slate-700">Product Images</Label>
                    <div className="flex gap-2 sm:gap-3">
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="flex-1 h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg text-sm sm:text-base"
                      />
                      <Button
                        type="button"
                        onClick={handleImageChange}
                        variant="outline"
                        className="h-10 sm:h-11 px-3 sm:px-4 border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 rounded-lg bg-transparent"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Mobile-optimized image grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-slate-200 bg-slate-50 aspect-square">
                            <img
                              key={index}
                              src={file instanceof File ? URL.createObjectURL(file) : ""}
                              alt={`Product ${index + 1}`}
                              className="h-120 w-120 object-cover rounded"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full w-5 h-5 sm:w-6 sm:h-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            </Button>
                            <Badge className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-xs bg-white/90 text-slate-700 px-1.5 py-0.5">
                              {index + 1}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 md:mt-8">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-lg sm:shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50 border-b border-slate-200/60 p-3 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl text-slate-800">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    Inventory & Rating
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="space-y-4 sm:space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="stock" className="text-sm font-semibold text-slate-700">
                        Stock Quantity
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => handleChange("stock", Number.parseInt(e.target.value) || 1)}
                        placeholder="1"
                        className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="rating" className="text-sm font-semibold text-slate-700">
                        Product Rating (0-5)
                      </Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => handleChange("rating", Number.parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 md:mt-8">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-lg sm:shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50 border-b border-slate-200/60 p-3 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl text-slate-800">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    Product Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="space-y-4 sm:space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-6">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="reviewerName" className="text-sm font-semibold text-slate-700">
                          Reviewer Name
                        </Label>
                        <Input
                          id="reviewerName"
                          value={newReview.name}
                          onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="reviewStars" className="text-sm font-semibold text-slate-700">
                          Rating (1-5)
                        </Label>
                        <Select
                          value={newReview.stars.toString()}
                          onValueChange={(value) =>
                            setNewReview((prev) => ({ ...prev, stars: Number.parseInt(value) }))
                          }
                        >
                          <SelectTrigger className="h-10 sm:h-11 border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg text-sm sm:text-base">
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent className="rounded-lg sm:rounded-xl border-slate-200 shadow-xl">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <SelectItem key={star} value={star.toString()} className="rounded-md text-sm py-2">
                                <div className="flex items-center gap-2">
                                  <span>{"⭐".repeat(star)}</span>
                                  {star} Star{star > 1 ? "s" : ""}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="reviewComment" className="text-sm font-semibold text-slate-700">
                        Review Comment
                      </Label>
                      <Textarea
                        id="reviewComment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                        placeholder="Great fragrance, long-lasting and perfect for special occasions!"
                        rows={3}
                        className="border-slate-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg resize-none text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddReview}
                      variant="outline"
                      className="w-full h-10 sm:h-11 border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 rounded-lg bg-transparent text-sm sm:text-base"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Review
                    </Button>
                  </div>

                  <Separator className="bg-slate-200" />

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
                      <MessageSquare className="w-4 h-4" />
                      Existing Reviews ({formData.reviews.length})
                    </h4>
                    {formData.reviews.length === 0 ? (
                      <div className="text-center py-6 sm:py-8">
                        <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-2 sm:mb-3" />
                        <p className="text-slate-500 text-sm sm:text-base">No reviews added yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 sm:space-y-3">
                        {formData.reviews.map((review, index) => (
                          <div
                            key={index}
                            className="border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors duration-200"
                          >
                            <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0 flex-1">
                                <span className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                                  {review.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="border-yellow-300 text-yellow-700 bg-yellow-50 text-xs w-fit"
                                >
                                  {"⭐".repeat(review.stars)} {review.stars}
                                </Badge>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeReview(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-1 sm:p-2 flex-shrink-0"
                              >
                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                          </div>
                        ))}
                      </div>
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
