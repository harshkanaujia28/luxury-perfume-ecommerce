"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  EyeOff,
  Save,
  ImageIcon,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

import { useApi } from "@/contexts/api-context"

// Define Banner type
interface Banner {
  _id: string
  type: "hero" | "promotional" // ✅ THIS IS MISSING
  title: string
  imageUrl: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  description?: string
  linkUrl?: string
  priority?: number
  startDate?: string
  endDate?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  order?: number
}

export default function AdminBannersPage() {
  const {
    getPromotionalBanners,
    getHeroBanners,
    toggleBannerStatus,
    createBanner,
    updateBanner,
    reorderHeroImage,
    deleteBanner,
    uploadFile,
    fixHeroBannerOrder
  } = useApi()

  const [activeTab, setActiveTab] = useState("promotional")
  const [banners, setBanners] = useState<Banner[]>([])
  const [heroImages, setHeroImages] = useState<Banner[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [editingHeroImage, setEditingHeroImage] = useState<Banner | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState("idle")


  const [bannerForm, setBannerForm] = useState<Omit<Banner, "_id" | "type" | "createdAt" | "updatedAt">>({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true,
    priority: 1,
    startDate: "",
    endDate: "",
  })

  const [heroForm, setHeroForm] = useState<Omit<Banner, "_id" | "type" | "createdAt" | "updatedAt">>({
    imageUrl: "",
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    isActive: true,
  })
  useEffect(() => {
    const fetchHeroImages = async () => {
      const data = await getHeroBanners()
      setHeroImages(data)
    }
    fetchHeroImages()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promos = await getPromotionalBanners()
        const heroes = await getHeroBanners()
        setBanners(promos)
        setHeroImages(heroes)
      } catch (error) {
        console.error("Error fetching banners:", error)
      }
    }
    fetchData()
  }, [])

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner)
    setBannerForm({
      title: banner.title || "",
      description: banner.description || "",
      imageUrl: banner.imageUrl || "",
      linkUrl: banner.linkUrl || "",
      isActive: banner.isActive ?? true,
      priority: banner.priority ?? 1,
      startDate: banner.startDate?.slice(0, 10) || "",
      endDate: banner.endDate?.slice(0, 10) || "",
    })
    setIsDialogOpen(true)
  }

  const handleEditHeroImage = (hero: Banner) => {
    setEditingHeroImage(hero)
    setHeroForm({
      imageUrl: hero.imageUrl || "",
      title: hero.title || "",
      subtitle: hero.subtitle || "",
      buttonText: hero.buttonText || "",
      buttonLink: hero.buttonLink || "",
      isActive: hero.isActive ?? true,
    })
    setIsDialogOpen(true)
  }
  const resetForms = () => {
    setBannerForm({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      isActive: true,
      priority: 1,
      startDate: "",
      endDate: "",
      type: "promotional",
    });

    setHeroForm({
      imageUrl: "",
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      isActive: true,
      type: "hero",
    });

    setEditingBanner(null);
    setEditingHeroImage(null);
  };



  const handleSaveBanner = async () => {
    setIsLoading(true)
    setSaveStatus("idle")
    try {
      if (editingBanner) {
        await updateBanner(editingBanner._id, bannerForm)
      } else {
        await createBanner(bannerForm)
      }
      const updated = await getPromotionalBanners()
      setBanners(updated)
      setSaveStatus("success")
      setIsDialogOpen(false)
      resetForms()
    } catch (err) {
      console.error(err)
      setSaveStatus("error")
    } finally {
      setIsLoading(false)
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const handleSaveHeroImage = async () => {
    setIsLoading(true)
    setSaveStatus("idle")
    try {
      if (editingHeroImage) {
        await updateBanner(editingHeroImage._id, heroForm)
      } else {
        await createBanner(heroForm)
      }
      const updated = await getHeroBanners()
      setHeroImages(updated)
      setSaveStatus("success")
      setIsDialogOpen(false)
      resetForms()
    } catch (err) {
      console.error(err)
      setSaveStatus("error")
    } finally {
      setIsLoading(false)
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url } = await uploadFile(file);
      setBannerForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  const handleDeleteBanner = async (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      await deleteBanner(id)
      const updated = await getPromotionalBanners()
      setBanners(updated)
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const handleDeleteHeroImage = async (id: string) => {
    if (confirm("Are you sure you want to delete this hero image?")) {
      await deleteBanner(id)
      const updated = await getHeroBanners()
      setHeroImages(updated)
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const handleToggleActive = async (id: string) => {
    await toggleBannerStatus(id)
    const updated = await getHeroBanners()
    setHeroImages(updated)
    setSaveStatus("success")
    setTimeout(() => setSaveStatus("idle"), 3000)
  }
 const handleReorderHeroImage = async (id: string, direction: "up" | "down") => {
  try {
    console.log("🔃 Reordering", id, direction)
    await reorderHeroImage(id, direction)
    const updated = await getHeroBanners()
    setHeroImages(updated)
  } catch (error) {
    console.error("❌ Reorder failed:", error)
  }
}


  const StatusAlert = () => {
    if (saveStatus === "idle") return null

    return (
      <Alert className={saveStatus === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        {saveStatus === "success" ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-red-600" />
        )}
        <AlertDescription className={saveStatus === "success" ? "text-green-800" : "text-red-800"}>
          {saveStatus === "success" ? "Changes saved successfully!" : "Failed to save changes. Please try again."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Banner Management</h1>
            <p className="text-muted-foreground">Manage promotional banners and hero section images</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForms}>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>

        <StatusAlert />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="promotional">Promotional Banners</TabsTrigger>
            <TabsTrigger value="hero">Hero Section Images</TabsTrigger>
          </TabsList>

          {/* Promotional Banners Tab */}
          <TabsContent value="promotional">
            <Card>
              <CardHeader>
                <CardTitle>Promotional Banners</CardTitle>
                <CardDescription>
                  Manage promotional banners displayed throughout the site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {banners.length === 0 ? (
                    <div className="text-center py-8">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No promotional banners found</p>

                      {/* ✅ Wrap trigger inside Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Banner
                          </Button>
                        </DialogTrigger>

                        {/* Optionally, you can include <DialogContent> here if modal opens immediately */}
                      </Dialog>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Preview</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Dates</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {banners
                          .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
                          .map((banner) => (
                            <TableRow key={banner._id}>
                              <TableCell>
                                <Image
                                  src={
                                    banner.imageUrl.startsWith("http")
                                      ? banner.imageUrl
                                      : `https://luxury-perfume-ecommerce.onrender.com${banner.imageUrl}`
                                  }
                                  alt={banner.title}
                                  width={400}
                                  height={200}
                                  className="w-full h-32 object-cover rounded"
                                />

                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{banner.title}</p>
                                  <p className="text-sm text-gray-500 truncate max-w-xs">
                                    {banner.description}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={banner.isActive}
                                    onCheckedChange={() =>
                                      handleToggleActive(banner._id, "banner")
                                    }
                                  />
                                  <Badge
                                    variant={banner.isActive ? "default" : "secondary"}
                                  >
                                    {banner.isActive ? "Active" : "Inactive"}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{banner.priority ?? "-"}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <p>{banner.startDate ?? "N/A"}</p>
                                  <p className="text-gray-500">
                                    to {banner.endDate ?? "N/A"}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditBanner(banner)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteBanner(banner._id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Hero Section Images Tab */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Images</CardTitle>
                <CardDescription>Manage the 5 hero carousel images displayed on the homepage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {heroImages
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((hero, index) => (
                      <Card key={hero._id} className="overflow-hidden">
                        <div className="relative">
                          <Image
                            src={
                              hero.imageUrl?.startsWith("http")
                                ? hero.imageUrl
                                : `https://luxury-perfume-ecommerce.onrender.com${hero.imageUrl || "/placeholder.svg"}`
                            }
                            alt={hero.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover"
                          />

                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary">#{hero.order ?? "-"}</Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant={hero.isActive ? "default" : "secondary"}>
                              {hero.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4 space-y-3">
                          {/* Title and Subtitle */}
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{hero.title}</h3>
                            {hero.subtitle && <p className="text-sm text-gray-600">{hero.subtitle}</p>}
                          </div>

                          {/* Button Text and Link */}
                          <div className="text-xs text-gray-500 space-y-1">
                            <p><span className="font-medium text-gray-700">Button:</span> {hero.buttonText || "—"}</p>
                            <p><span className="font-medium text-gray-700">Link:</span> {hero.buttonLink || "—"}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            {/* Reorder Buttons */}
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReorderHeroImage(hero._id, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                 onClick={() => handleReorderHeroImage(hero._id, "down")}
                                disabled={index === heroImages.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Edit / Toggle / Delete */}
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleActive(hero._id, "hero")}
                                title={hero.isActive ? "Deactivate" : "Activate"}
                              >
                                {hero.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditHeroImage(hero)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteHeroImage(hero._id)}
                                className="text-red-600 hover:text-red-700"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>

                      </Card>
                    ))}


                  {/* Add New Hero Image Card */}
                  {heroImages.length < 5 && (
                    <Card className="border-dashed border-2 border-gray-300">
                      <CardContent className="flex items-center justify-center h-64">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="h-full w-full" onClick={resetForms}>
                              <div className="text-center">
                                <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-gray-500">Add Hero Image</p>
                              </div>
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog for Adding/Editing */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {activeTab === "promotional"
                  ? editingBanner
                    ? "Edit Banner"
                    : "Add New Banner"
                  : editingHeroImage
                    ? "Edit Hero Image"
                    : "Add New Hero Image"}
              </DialogTitle>
              <DialogDescription>
                {activeTab === "promotional"
                  ? "Create or edit promotional banners for your store"
                  : "Create or edit hero section images for the homepage carousel"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {activeTab === "promotional" ? (
                // Banner Form
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={bannerForm.title ?? ""}
                        onChange={(e) => setBannerForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter banner title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={(bannerForm.priority ?? 1).toString()}
                        onValueChange={(value) => setBannerForm((prev) => ({ ...prev, priority: Number(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              Priority {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bannerImage">Image *</Label>
                    <div className="flex space-x-2 items-center">
                      <Input
                        id="bannerImage"
                        value={bannerForm.imageUrl}
                        onChange={(e) =>
                          setBannerForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                        }
                        placeholder="Enter image URL or upload"
                      />

                      <label htmlFor="upload-banner-image">
                        <input
                          id="upload-banner-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            try {
                              const { url } = await uploadFile(file); // ← uploadFile must return { url: string }
                              const fullUrl = url.startsWith("http")
                                ? url
                                : `https://luxury-perfume-ecommerce.onrender.com${url}`; // fix for local dev

                              setBannerForm((prev) => ({ ...prev, imageUrl: fullUrl }));
                            } catch (err) {
                              console.error("Upload failed", err);
                            }
                          }}
                        />
                        <Button asChild variant="outline" size="sm">
                          <span className="cursor-pointer flex items-center space-x-2">
                            <Upload className="h-4 w-4" />
                            <span>Upload</span>
                          </span>
                        </Button>
                      </label>
                    </div>

                    {bannerForm.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={bannerForm.imageUrl}
                          alt="Preview"
                          width={400}
                          height={200}
                          className="rounded border object-cover max-h-32"
                        />
                      </div>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="linkUrl">Link URL</Label>
                    <Input
                      id="linkUrl"
                      value={bannerForm.linkUrl ?? ""}
                      onChange={(e) => setBannerForm((prev) => ({ ...prev, linkUrl: e.target.value }))}
                      placeholder="Enter destination URL"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={bannerForm.startDate ?? ""}
                        onChange={(e) => setBannerForm((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={bannerForm.endDate ?? ""}
                        onChange={(e) => setBannerForm((prev) => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Active Status</Label>
                      <p className="text-sm text-muted-foreground">Enable or disable this banner</p>
                    </div>
                    <Switch
                      checked={bannerForm.isActive}
                      onCheckedChange={(checked) => setBannerForm((prev) => ({ ...prev, isActive: checked }))}
                    />
                  </div>
                </>
              ) : (
                // Hero Image Form
                <>
                  <div className="space-y-2">
                    <Label htmlFor="heroImageUrl">Image URL *</Label>
                    <div className="flex space-x-2 items-center">
                      <Input
                        id="heroImageUrl"
                        value={heroForm.imageUrl}
                        onChange={(e) =>
                          setHeroForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                        }
                        placeholder="Enter image URL or upload"
                      />

                      <label htmlFor="upload-hero-image">
                        <input
                          id="upload-hero-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            try {
                              const { url } = await uploadFile(file); // must return { url: string }
                              const fullUrl = url.startsWith("http")
                                ? url
                                : `https://luxury-perfume-ecommerce.onrender.com${url}`;

                              setHeroForm((prev) => ({ ...prev, imageUrl: fullUrl }));
                            } catch (err) {
                              console.error("Hero Image Upload Failed", err);
                            }
                          }}
                        />
                        <Button asChild variant="outline" size="sm">
                          <span className="cursor-pointer flex items-center space-x-2">
                            <Upload className="h-4 w-4" />
                            <span>Upload</span>
                          </span>
                        </Button>
                      </label>
                    </div>

                    {/* ✅ Recommended size hint */}
                    <p className="text-sm text-muted-foreground mt-1">
                      Recommended size: <strong>1920×500px</strong> (JPG or WebP, under 1MB)
                    </p>

                    {heroForm.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={heroForm.imageUrl || "/placeholder.svg"}
                          alt="Preview"
                          width={800}
                          height={200}
                          className="rounded border object-cover max-h-48 w-full"
                        />
                      </div>
                    )}
                  </div>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heroTitle">Title *</Label>
                      <Input
                        id="heroTitle"
                        value={heroForm.title ?? ""}
                        onChange={(e) => setHeroForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter hero title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroSubtitle">Subtitle</Label>
                      <Input
                        id="heroSubtitle"
                        value={heroForm.subtitle ?? ""}
                        onChange={(e) => setHeroForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                        placeholder="Enter hero subtitle"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buttonText">Button Text</Label>
                      <Input
                        id="buttonText"
                        value={heroForm.buttonText ?? ""}
                        onChange={(e) => setHeroForm((prev) => ({ ...prev, buttonText: e.target.value }))}
                        placeholder="Enter button text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buttonLink">Button Link</Label>
                      <Input
                        id="buttonLink"
                        value={heroForm.buttonLink ?? ""}
                        onChange={(e) => setHeroForm((prev) => ({ ...prev, buttonLink: e.target.value }))}
                        placeholder="Enter button destination URL"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Active Status</Label>
                      <p className="text-sm text-muted-foreground">Show this image in the hero carousel</p>
                    </div>
                    <Switch
                      checked={heroForm.isActive}
                      onCheckedChange={(checked) => setHeroForm((prev) => ({ ...prev, isActive: checked }))}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={activeTab === "promotional" ? handleSaveBanner : handleSaveHeroImage}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingBanner || editingHeroImage ? "Update" : "Create"}
                    </>
                  )}
                </Button>
              </div>
            </div>

          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
