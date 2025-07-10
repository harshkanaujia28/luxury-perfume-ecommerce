"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Sparkles,
  Package,
  Truck,
  Clock,
  CheckCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample data for reports
const salesData = [
  { month: "Jan", revenue: 15000, orders: 89, customers: 67 },
  { month: "Feb", revenue: 12000, orders: 67, customers: 54 },
  { month: "Mar", revenue: 18000, orders: 105, customers: 89 },
  { month: "Apr", revenue: 16500, orders: 92, customers: 76 },
  { month: "May", revenue: 22000, orders: 134, customers: 112 },
  { month: "Jun", revenue: 19500, orders: 118, customers: 98 },
]

const fragranceCategoryData = [
  { name: "Women's Fragrance", value: 45, sales: 67500 },
  { name: "Men's Fragrance", value: 35, sales: 52500 },
  { name: "Unisex Fragrance", value: 20, sales: 30000 },
]

const topBrandsData = [
  { brand: "Chanel", sales: 25000, orders: 156, growth: 12.5 },
  { brand: "Dior", sales: 22000, orders: 134, growth: 8.3 },
  { brand: "Tom Ford", sales: 18500, orders: 98, growth: 15.2 },
  { brand: "Creed", sales: 16000, orders: 67, growth: 22.1 },
  { brand: "Marc Jacobs", sales: 12000, orders: 89, growth: -3.2 },
]

const topFragrancesData = [
  { name: "Chanel No. 5 EDP", sales: 8900, units: 61, category: "Women's" },
  { name: "Dior Sauvage EDT", sales: 7200, units: 76, category: "Men's" },
  { name: "Tom Ford Black Orchid", sales: 6800, units: 36, category: "Unisex" },
  { name: "Creed Aventus", sales: 9600, units: 30, category: "Men's" },
  { name: "Marc Jacobs Daisy", sales: 4200, units: 54, category: "Women's" },
]

const customerSegmentData = [
  { segment: "VIP Customers", count: 234, revenue: 45600, avgOrder: 195 },
  { segment: "Regular Customers", count: 1456, revenue: 87300, avgOrder: 60 },
  { segment: "New Customers", count: 789, revenue: 23400, avgOrder: 30 },
]

// Vendor-related data
const vendorPerformanceData = [
  {
    vendor: "Luxury Fragrances Ltd",
    totalPurchases: 125000,
    orders: 45,
    avgDeliveryTime: 3.2,
    qualityRating: 4.8,
    onTimeDelivery: 96,
    paymentTerms: "Net 30",
    status: "Excellent",
  },
  {
    vendor: "Premium Scents Co",
    totalPurchases: 98000,
    orders: 38,
    avgDeliveryTime: 4.1,
    qualityRating: 4.6,
    onTimeDelivery: 92,
    paymentTerms: "Net 45",
    status: "Good",
  },
  {
    vendor: "Elite Perfume House",
    totalPurchases: 87500,
    orders: 32,
    avgDeliveryTime: 2.8,
    qualityRating: 4.9,
    onTimeDelivery: 98,
    paymentTerms: "Net 15",
    status: "Excellent",
  },
  {
    vendor: "Global Fragrance Supply",
    totalPurchases: 76000,
    orders: 28,
    avgDeliveryTime: 5.2,
    qualityRating: 4.3,
    onTimeDelivery: 87,
    paymentTerms: "Net 60",
    status: "Average",
  },
  {
    vendor: "Artisan Scent Makers",
    totalPurchases: 54000,
    orders: 22,
    avgDeliveryTime: 6.1,
    qualityRating: 4.1,
    onTimeDelivery: 82,
    paymentTerms: "Net 30",
    status: "Needs Improvement",
  },
]

const purchaseOrderTrends = [
  { month: "Jan", orders: 12, value: 45000, avgValue: 3750 },
  { month: "Feb", orders: 15, value: 52000, avgValue: 3467 },
  { month: "Mar", orders: 18, value: 67000, avgValue: 3722 },
  { month: "Apr", orders: 14, value: 48000, avgValue: 3429 },
  { month: "May", orders: 22, value: 78000, avgValue: 3545 },
  { month: "Jun", orders: 19, value: 65000, avgValue: 3421 },
]

const vendorCategoryDistribution = [
  { category: "Luxury Brands", value: 40, vendors: 8, totalSpend: 180000 },
  { category: "Designer Fragrances", value: 35, vendors: 12, totalSpend: 156000 },
  { category: "Niche Perfumes", value: 15, vendors: 6, totalSpend: 67000 },
  { category: "Celebrity Fragrances", value: 10, vendors: 4, totalSpend: 45000 },
]

const paymentAnalytics = [
  { status: "Paid", count: 156, amount: 234000, percentage: 78 },
  { status: "Pending", count: 34, amount: 45000, percentage: 17 },
  { status: "Overdue", count: 8, amount: 12000, percentage: 4 },
  { status: "Disputed", count: 2, amount: 3000, percentage: 1 },
]

const topVendorsByCategory = [
  { vendor: "Chanel Distribution", category: "Luxury", products: 45, revenue: 89000 },
  { vendor: "Dior Wholesale", category: "Designer", products: 38, revenue: 76000 },
  { vendor: "Tom Ford Supply", category: "Luxury", products: 22, revenue: 67000 },
  { vendor: "Marc Jacobs Direct", category: "Designer", products: 34, revenue: 54000 },
  { vendor: "Creed Exclusive", category: "Niche", products: 18, revenue: 78000 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-6-months")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800"
      case "Good":
        return "bg-blue-100 text-blue-800"
      case "Average":
        return "bg-yellow-100 text-yellow-800"
      case "Needs Improvement":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
            <p className="text-muted-foreground">Comprehensive insights into your fragrance business performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                <SelectItem value="last-6-months">Last 6 months</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Analytics</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$103,000</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+15.2%</span> from last period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">605</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+12.5%</span> from last period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">496</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+8.1%</span> from last period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$170</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+2.3%</span> from last period
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Trend */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="hsl(var(--chart-1))"
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Fragrance Categories</CardTitle>
                  <CardDescription>Sales distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Percentage",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={fragranceCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {fragranceCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>Monthly sales and order trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                      orders: {
                        label: "Orders",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" name="Revenue ($)" />
                        <Line type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" name="Orders" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Brands</CardTitle>
                  <CardDescription>Brand performance by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topBrandsData.map((brand, index) => (
                      <div key={brand.brand} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{brand.brand}</p>
                            <p className="text-sm text-muted-foreground">{brand.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${brand.sales.toLocaleString()}</p>
                          <div className="flex items-center">
                            {brand.growth > 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-xs ml-1 ${brand.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                              {brand.growth > 0 ? "+" : ""}
                              {brand.growth}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Fragrances</CardTitle>
                <CardDescription>Best performing fragrances by revenue and units sold</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Fragrance</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Avg Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topFragrancesData.map((fragrance, index) => (
                      <TableRow key={fragrance.name}>
                        <TableCell>
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{fragrance.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{fragrance.category}</Badge>
                        </TableCell>
                        <TableCell>{fragrance.units}</TableCell>
                        <TableCell>${fragrance.sales.toLocaleString()}</TableCell>
                        <TableCell>${Math.round(fragrance.sales / fragrance.units)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Acquisition</CardTitle>
                  <CardDescription>New customers over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      customers: {
                        label: "New Customers",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="customers" fill="hsl(var(--chart-3))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>Customer segmentation analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerSegmentData.map((segment) => (
                      <div key={segment.segment} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{segment.segment}</h4>
                          <Badge variant="outline">{segment.count} customers</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total Revenue</p>
                            <p className="font-medium">${segment.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg Order Value</p>
                            <p className="font-medium">${segment.avgOrder}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-4">
            {/* Vendor Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+3</span> new this month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Purchase Orders</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">165</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+18%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2 days</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingDown className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">-0.3</span> days improved
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">91%</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+2.1%</span> improvement
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Purchase Order Trends and Vendor Categories */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Order Trends</CardTitle>
                  <CardDescription>Monthly purchase order volume and value</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      orders: {
                        label: "Orders",
                        color: "hsl(var(--chart-1))",
                      },
                      value: {
                        label: "Value ($)",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={purchaseOrderTrends}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="orders" stroke="hsl(var(--chart-1))" name="Orders" />
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" name="Value ($)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendor Categories</CardTitle>
                  <CardDescription>Distribution by vendor category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Percentage",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={vendorCategoryDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ category, value }) => `${category}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {vendorCategoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Vendor Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Performance Analysis</CardTitle>
                <CardDescription>Comprehensive vendor performance metrics and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Total Purchases</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Avg Delivery</TableHead>
                      <TableHead>Quality Rating</TableHead>
                      <TableHead>On-Time %</TableHead>
                      <TableHead>Payment Terms</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendorPerformanceData.map((vendor) => (
                      <TableRow key={vendor.vendor}>
                        <TableCell className="font-medium">{vendor.vendor}</TableCell>
                        <TableCell>${vendor.totalPurchases.toLocaleString()}</TableCell>
                        <TableCell>{vendor.orders}</TableCell>
                        <TableCell>{vendor.avgDeliveryTime} days</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{vendor.qualityRating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full mr-1 ${
                                    i < Math.floor(vendor.qualityRating) ? "bg-yellow-400" : "bg-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={vendor.onTimeDelivery} className="w-16" />
                            <span className="text-sm">{vendor.onTimeDelivery}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{vendor.paymentTerms}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Payment Analytics and Top Vendors */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Status Analytics</CardTitle>
                  <CardDescription>Current payment status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentAnalytics.map((payment) => (
                      <div key={payment.status} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              payment.status === "Paid"
                                ? "bg-green-500"
                                : payment.status === "Pending"
                                  ? "bg-yellow-500"
                                  : payment.status === "Overdue"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                            }`}
                          />
                          <div>
                            <p className="font-medium">{payment.status}</p>
                            <p className="text-sm text-muted-foreground">{payment.count} invoices</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{payment.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Vendors by Category</CardTitle>
                  <CardDescription>Leading vendors in each category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topVendorsByCategory.map((vendor, index) => (
                      <div key={vendor.vendor} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{vendor.vendor}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {vendor.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{vendor.products} products</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${vendor.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Summer Collection</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="text-2xl font-bold">8.01%</div>
                    <p className="text-xs text-muted-foreground">Click-through rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Newsletter</span>
                      <Badge variant="secondary">2,340 subscribers</Badge>
                    </div>
                    <div className="text-2xl font-bold">24.5%</div>
                    <p className="text-xs text-muted-foreground">Open rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Instagram</span>
                      <Badge variant="secondary">12.3K followers</Badge>
                    </div>
                    <div className="text-2xl font-bold">4.2%</div>
                    <p className="text-xs text-muted-foreground">Engagement rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
