"use client"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Edit, ArrowLeft, Star, TrendingUp, Package, Calendar, MapPin, Globe, Award, Eye } from "lucide-react"
import Image from "next/image"

// Mock data for brand details
const mockBrandData = {
  "1": {
    id: "1",
    name: "Chanel",
    description:
      "French luxury fashion house founded by Gabrielle 'Coco' Chanel. Known for timeless elegance and revolutionary designs that liberated women from the constraints of the corseted silhouette.",
    logo: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=300&width=800",
    country: "France",
    founded: "1910",
    founder: "Gabrielle 'Coco' Chanel",
    headquarters: "Paris, France",
    website: "www.chanel.com",
    status: "Active",
    rating: 4.8,
    totalReviews: 15420,
    totalFragrances: 45,
    totalSales: 2850000,
    marketShare: 12.5,
    categories: ["Luxury", "Designer", "Classic"],
    topFragrances: [
      { id: 1, name: "Chanel No. 5", sales: 450000, rating: 4.9, image: "/placeholder.svg?height=60&width=60" },
      { id: 2, name: "Coco Mademoiselle", sales: 380000, rating: 4.8, image: "/placeholder.svg?height=60&width=60" },
      { id: 3, name: "Bleu de Chanel", sales: 320000, rating: 4.7, image: "/placeholder.svg?height=60&width=60" },
      { id: 4, name: "Chance", sales: 280000, rating: 4.6, image: "/placeholder.svg?height=60&width=60" },
    ],
    recentOrders: [
      {
        id: "ORD-001",
        customer: "Sarah Johnson",
        product: "Chanel No. 5",
        amount: 12500,
        date: "2024-01-15",
        status: "Delivered",
      },
      {
        id: "ORD-002",
        customer: "Michael Chen",
        product: "Bleu de Chanel",
        amount: 8900,
        date: "2024-01-14",
        status: "Shipped",
      },
      {
        id: "ORD-003",
        customer: "Emma Wilson",
        product: "Coco Mademoiselle",
        amount: 9800,
        date: "2024-01-13",
        status: "Processing",
      },
    ],
    monthlyStats: [
      { month: "Jan", sales: 285000, orders: 1250 },
      { month: "Feb", sales: 320000, orders: 1380 },
      { month: "Mar", sales: 298000, orders: 1290 },
      { month: "Apr", sales: 345000, orders: 1450 },
      { month: "May", sales: 380000, orders: 1580 },
      { month: "Jun", sales: 365000, orders: 1520 },
    ],
    brandStory:
      "Chanel revolutionized women's fashion and fragrance. From the iconic Chanel No. 5 to modern masterpieces, each fragrance tells a story of elegance, sophistication, and timeless beauty. The brand continues to innovate while maintaining its core values of luxury and refinement.",
    awards: [
      "Fragrance Foundation Award 2023",
      "Luxury Brand of the Year 2022",
      "Best Classic Fragrance Collection 2021",
    ],
    socialMedia: {
      instagram: "2.5M followers",
      facebook: "1.8M followers",
      twitter: "890K followers",
    },
  },
}

export default function BrandDetailPage() {
  const params = useParams()
  const router = useRouter()
  const brandId = params.id as string
  const brand = mockBrandData[brandId]

  if (!brand) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Brand Not Found</h1>
        <Button onClick={() => router.push("/brands")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Brands
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
     
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push("/brands")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Brands
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Brand
          </Button>
        </div>

        {/* Brand Cover & Basic Info */}
        <Card>
          <div className="relative h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg">
            <Image
              src={brand.coverImage || "/placeholder.svg"}
              alt={`${brand.name} cover`}
              fill
              className="object-cover rounded-t-lg opacity-80"
            />
            <div className="absolute inset-0 bg-black/20 rounded-t-lg" />
          </div>
          <CardContent className="relative -mt-16 pb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-white rounded-lg border-4 border-white shadow-lg overflow-hidden">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 pt-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {brand.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Founded {brand.founded}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        {brand.website}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{brand.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({brand.totalReviews.toLocaleString()} reviews)
                        </span>
                      </div>
                      <Badge variant={brand.status === "Active" ? "default" : "secondary"}>{brand.status}</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{brand.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fragrances</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brand.totalFragrances}</div>
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{brand.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Share</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brand.marketShare}%</div>
              <Progress value={brand.marketShare} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brand.rating}/5</div>
              <p className="text-xs text-muted-foreground">{brand.totalReviews.toLocaleString()} reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {brand.categories.map((category, index) => (
                      <Badge key={index} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Awards & Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {brand.awards.map((award, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{award}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Social Media Presence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">Instagram</div>
                    <div className="text-sm text-muted-foreground">{brand.socialMedia.instagram}</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Facebook</div>
                    <div className="text-sm text-muted-foreground">{brand.socialMedia.facebook}</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-sky-600">Twitter</div>
                    <div className="text-sm text-muted-foreground">{brand.socialMedia.twitter}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Fragrances</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brand.topFragrances.map((fragrance) => (
                      <TableRow key={fragrance.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Image
                              src={fragrance.image || "/placeholder.svg"}
                              alt={fragrance.name}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                            <span className="font-medium">{fragrance.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>₹{fragrance.sales.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{fragrance.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brand.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : order.status === "Shipped"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {brand.monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{stat.month} 2024</div>
                        <div className="text-sm text-muted-foreground">{stat.orders} orders</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">₹{stat.sales.toLocaleString()}</div>
                        <div className="text-sm text-green-600">
                          {index > 0 && stat.sales > brand.monthlyStats[index - 1].sales ? "+" : ""}
                          {index > 0
                            ? Math.round(
                                ((stat.sales - brand.monthlyStats[index - 1].sales) /
                                  brand.monthlyStats[index - 1].sales) *
                                  100,
                              )
                            : 0}
                          %
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brand Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">{brand.brandStory}</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Company Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Founder:</span> {brand.founder}
                      </div>
                      <div>
                        <span className="font-medium">Headquarters:</span> {brand.headquarters}
                      </div>
                      <div>
                        <span className="font-medium">Founded:</span> {brand.founded}
                      </div>
                      <div>
                        <span className="font-medium">Website:</span> {brand.website}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Business Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Total Products:</span> {brand.totalFragrances}
                      </div>
                      <div>
                        <span className="font-medium">Market Share:</span> {brand.marketShare}%
                      </div>
                      <div>
                        <span className="font-medium">Customer Rating:</span> {brand.rating}/5
                      </div>
                      <div>
                        <span className="font-medium">Total Reviews:</span> {brand.totalReviews.toLocaleString()}
                      </div>
                    </div>
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
