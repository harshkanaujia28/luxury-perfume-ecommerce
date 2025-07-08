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

interface Banner {
  id: string
  title: string
  description: string
  imageUrl: string
  linkUrl: string
  isActive: boolean
  priority: number
  startDate: string
  endDate: string
  type: "promotional" | "hero"
  position?: number
  createdAt: string
  updatedAt: string
}

interface HeroImage {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  isActive: boolean
  order: number
}

export default function AdminBannersPage() {
  const [activeTab, setActiveTab] = useState("promotional")
  const [banners, setBanners] = useState<Banner[]>([])
  const [heroImages, setHeroImages] = useState<HeroImage[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [editingHeroImage, setEditingHeroImage] = useState<HeroImage | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  // Form states
  const [bannerForm, setBannerForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true,
    priority: 1,
    startDate: "",
    endDate: "",
  })

  const [heroForm, setHeroForm] = useState({
    imageUrl: "",
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    isActive: true,
  })

  // Mock data initialization
  useEffect(() => {
    // Mock promotional banners
    setBanners([
      {
        id: "1",
        title: "Summer Sale 2024",
        description: "Get up to 50% off on all summer items",
        imageUrl: "/placeholder.svg?height=400&width=800",
        linkUrl: "/categories/summer-sale",
        isActive: true,
        priority: 1,
        startDate: "2024-06-01",
        endDate: "2024-08-31",
        type: "promotional",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        title: "New Arrivals",
        description: "Check out our latest products",
        imageUrl: "/placeholder.svg?height=400&width=800",
        linkUrl: "/categories/new-arrivals",
        isActive: true,
        priority: 2,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        type: "promotional",
        createdAt: "2024-01-10T10:00:00Z",
        updatedAt: "2024-01-10T10:00:00Z",
      },
      {
        id: "3",
        title: "Black Friday",
        description: "Biggest sale of the year",
        imageUrl: "/placeholder.svg?height=400&width=800",
        linkUrl: "/categories/black-friday",
        isActive: false,
        priority: 1,
        startDate: "2023-11-24",
        endDate: "2023-11-27",
        type: "promotional",
        createdAt: "2023-11-01T10:00:00Z",
        updatedAt: "2023-11-01T10:00:00Z",
      },
    ])

    // Mock hero images
    setHeroImages([
      {
        id: "h1",
        imageUrl: "/placeholder.svg?height=600&width=1200",
        title: "Premium Electronics",
        subtitle: "Discover the latest in technology",
        buttonText: "Shop Now",
        buttonLink: "/categories/electronics",
        isActive: true,
        order: 1,
      },
      {
        id: "h2",
        imageUrl: "/placeholder.svg?height=600&width=1200",
        title: "Fashion Forward",
        subtitle: "Trendy styles for every season",
        buttonText: "Explore",
        buttonLink: "/categories/fashion",
        isActive: true,
        order: 2,
      },
      {
        id: "h3",
        imageUrl: "/placeholder.svg?height=600&width=1200",
        title: "Home & Garden",
        subtitle: "Transform your living space",
        buttonText: "Browse",
        buttonLink: "/categories/home",
        isActive: true,
        order: 3,
      },
      {
        id: "h4",
        imageUrl: "/placeholder.svg?height=600&width=1200",
        title: "Sports & Fitness",
        subtitle: "Gear up for your active lifestyle",
        buttonText: "Get Started",
        buttonLink: "/categories/sports",
        isActive: false,
        order: 4,
      },
      {
        id: "h5",
        imageUrl: "/placeholder.svg?height=600&width=1200",
        title: "Beauty & Care",
        subtitle: "Look and feel your best",
        buttonText: "Discover",
        buttonLink: "/categories/beauty",
        isActive: true,
        order: 5,
      },
    ])
  }, [])

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
    })
    setHeroForm({
      imageUrl: "",
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      isActive: true,
    })
    setEditingBanner(null)
    setEditingHeroImage(null)
  }

  const handleSaveBanner = async () => {
    setIsLoading(true)
    setSaveStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingBanner) {
        // Update existing banner
        setBanners((prev) =>
          prev.map((banner) =>
            banner.id === editingBanner.id
              ? {
                  ...banner,
                  ...bannerForm,
                  updatedAt: new Date().toISOString(),
                }
              : banner,
          ),
        )
      } else {
        // Create new banner
        const newBanner: Banner = {
          id: Date.now().toString(),
          ...bannerForm,
          type: "promotional",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        setBanners((prev) => [...prev, newBanner])
      }

      setSaveStatus("success")
      setIsDialogOpen(false)
      resetForms()
    } catch (error) {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingHeroImage) {
        // Update existing hero image
        setHeroImages((prev) =>
          prev.map((hero) =>
            hero.id === editingHeroImage.id
              ? {
                  ...hero,
                  ...heroForm,
                }
              : hero,
          ),
        )
      } else {
        // Create new hero image
        const newHeroImage: HeroImage = {
          id: Date.now().toString(),
          ...heroForm,
          order: heroImages.length + 1,
        }
        setHeroImages((prev) => [...prev, newHeroImage])
      }

      setSaveStatus("success")
      setIsDialogOpen(false)
      resetForms()
    } catch (error) {
      setSaveStatus("error")
    } finally {
      setIsLoading(false)
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner)
    setBannerForm({
      title: banner.title,
      description: banner.description,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl,
      isActive: banner.isActive,
      priority: banner.priority,
      startDate: banner.startDate,
      endDate: banner.endDate,
    })
    setIsDialogOpen(true)
  }

  const handleEditHeroImage = (hero: HeroImage) => {
    setEditingHeroImage(hero)
    setHeroForm({
      imageUrl: hero.imageUrl,
      title: hero.title,
      subtitle: hero.subtitle,
      buttonText: hero.buttonText,
      buttonLink: hero.buttonLink,
      isActive: hero.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteBanner = async (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setBanners((prev) => prev.filter((banner) => banner.id !== id))
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const handleDeleteHeroImage = async (id: string) => {
    if (confirm("Are you sure you want to delete this hero image?")) {
      setHeroImages((prev) => prev.filter((hero) => hero.id !== id))
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const handleToggleActive = async (id: string, type: "banner" | "hero") => {
    if (type === "banner") {
      setBanners((prev) =>
        prev.map((banner) => (banner.id === id ? { ...banner, isActive: !banner.isActive } : banner)),
      )
    } else {
      setHeroImages((prev) => prev.map((hero) => (hero.id === id ? { ...hero, isActive: !hero.isActive } : hero)))
    }
    setSaveStatus("success")
    setTimeout(() => setSaveStatus("idle"), 3000)
  }

  const handleReorderHeroImage = (id: string, direction: "up" | "down") => {
    setHeroImages((prev) => {
      const images = [...prev]
      const index = images.findIndex((img) => img.id === id)
      if (index === -1) return prev

      const newIndex = direction === "up" ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= images.length)
        return prev

        // Swap the images
      ;[images[index], images[newIndex]] = [images[newIndex], images[index]]

      // Update order values
      images.forEach((img, idx) => {
        img.order = idx + 1
      })

      return images
    })
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
                <CardDescription>Manage promotional banners displayed throughout the site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {banners.length === 0 ? (
                    <div className="text-center py-8">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No promotional banners found</p>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="mt-4" onClick={resetForms}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Banner
                          </Button>
                        </DialogTrigger>
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
                          .sort((a, b) => a.priority - b.priority)
                          .map((banner) => (
                            <TableRow key={banner.id}>
                              <TableCell>
                                <Image
                                  src={banner.imageUrl || "/placeholder.svg"}
                                  alt={banner.title}
                                  width={80}
                                  height={40}
                                  className="rounded border object-cover"
                                />
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{banner.title}</p>
                                  <p className="text-sm text-gray-500 truncate max-w-xs">{banner.description}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={banner.isActive}
                                    onCheckedChange={() => handleToggleActive(banner.id, "banner")}
                                  />
                                  <Badge variant={banner.isActive ? "default" : "secondary"}>
                                    {banner.isActive ? "Active" : "Inactive"}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{banner.priority}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <p>{banner.startDate}</p>
                                  <p className="text-gray-500">to {banner.endDate}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleEditBanner(banner)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteBanner(banner.id)}
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
                    .sort((a, b) => a.order - b.order)
                    .map((hero, index) => (
                      <Card key={hero.id} className="overflow-hidden">
                        <div className="relative">
                          <Image
                            src={hero.imageUrl || "/placeholder.svg"}
                            alt={hero.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary">#{hero.order}</Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant={hero.isActive ? "default" : "secondary"}>
                              {hero.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1">{hero.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{hero.subtitle}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>Button: {hero.buttonText}</span>
                            <span>Link: {hero.buttonLink}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReorderHeroImage(hero.id, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReorderHeroImage(hero.id, "down")}
                                disabled={index === heroImages.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => handleToggleActive(hero.id, "hero")}>
                                {hero.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditHeroImage(hero)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteHeroImage(hero.id)}
                                className="text-red-600 hover:text-red-700"
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
                        value={bannerForm.title}
                        onChange={(e) => setBannerForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter banner title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={bannerForm.priority.toString()}
                        onValueChange={(value) =>
                          setBannerForm((prev) => ({ ...prev, priority: Number.parseInt(value) }))
                        }
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
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={bannerForm.description}
                      onChange={(e) => setBannerForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter banner description"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL *</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="imageUrl"
                        value={bannerForm.imageUrl}
                        onChange={(e) => setBannerForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="Enter image URL or upload"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    {bannerForm.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={bannerForm.imageUrl || "/placeholder.svg"}
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
                      value={bannerForm.linkUrl}
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
                        value={bannerForm.startDate}
                        onChange={(e) => setBannerForm((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={bannerForm.endDate}
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
                    <div className="flex space-x-2">
                      <Input
                        id="heroImageUrl"
                        value={heroForm.imageUrl}
                        onChange={(e) => setHeroForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="Enter image URL or upload"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    {heroForm.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={heroForm.imageUrl || "/placeholder.svg"}
                          alt="Preview"
                          width={400}
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
                        value={heroForm.title}
                        onChange={(e) => setHeroForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter hero title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroSubtitle">Subtitle</Label>
                      <Input
                        id="heroSubtitle"
                        value={heroForm.subtitle}
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
                        value={heroForm.buttonText}
                        onChange={(e) => setHeroForm((prev) => ({ ...prev, buttonText: e.target.value }))}
                        placeholder="Enter button text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buttonLink">Button Link</Label>
                      <Input
                        id="buttonLink"
                        value={heroForm.buttonLink}
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
