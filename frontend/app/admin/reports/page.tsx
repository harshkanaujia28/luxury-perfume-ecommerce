"use client"

import { useEffect, useState } from "react"
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
  Tooltip,
} from "recharts"
import {
  Download,
  TrendingUp,
  TrendingDown,
  IndianRupeeIcon,
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
import { useApi } from "@/contexts/api-context"
import { ReportResponse } from "@/types/report"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ReportsPage() {
  const { getReportData } = useApi();
  const [dateRange, setDateRange] = useState<"day" | "month" | "year">("month");
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const reportData = await getReportData(dateRange);
        setReport(reportData);
        console.log("Fetched report:", reportData);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  if (loading) return <p>Loading...</p>;
  if (!report) return <p>No report data available</p>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Average":
        return "bg-yellow-100 text-yellow-800";
      case "Needs Improvement":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const overview = report.overview || {};
  const payments = report.payments || [];
  const products = report.products || [];
  const brands = report.brands || [];
  const vendors = report.vendors || [];
  const totalOrders = vendors.reduce((acc, v) => acc + (v.orders || 0), 0);

  const fragranceCategoryData = Object.values(
    report.products.reduce((acc: Record<string, { name: string; value: number }>, product) => {
      const brand = product.brand || "Unknown";
      if (!acc[brand]) {
        acc[brand] = { name: brand, value: 0 };
      }
      acc[brand].value += 1;
      return acc;
    }, {})
  );
  const totalRevenue = payments
    .filter((p) => p.status !== "cancelled")
    .reduce((acc, p) => acc + (p.amount || 0), 0);
  const topFragrancesData = products;
  const topBrandsData = brands;
  const vendorPerformanceData = vendors;
  const purchaseOrderTrends = []; // optional
  const vendorCategoryDistribution = []; // optional

  // 💡 Generate sales chart data from payments
  const salesData = (report?.payments || []).map((payment, index) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const monthIndex = (now.getMonth() - index + 12) % 12;
    const label = monthNames[monthIndex];

    return {
      month: label,
      revenue: payment.amount || 0,
      orders: payment.count || 0,
    };
  }).reverse();

  const avgDeliveryTime = "—";
  const onTimeDeliveryRate = vendors.length
    ? (
      vendors.reduce((acc, v) => acc + (v.onTimeDelivery || 0), 0) / vendors.length
    ).toFixed(0)
    : "0";
  const formattedRevenue = totalRevenue.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  // 🔢 Vendor summary
  const totalVendors = vendors.length;

  // 🎨 Colors for charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
  ];
const handleExport = () => {
  if (!report) return;

  // 1️⃣ Overview
  const overviewSheet = [
    {
      "Total Revenue": formattedRevenue,
      "Total Orders": overview.totalOrders || 0,
      "Total Users": overview.totalUsers || 0,
      "Total Products": overview.totalProducts || 0,
    },
  ];

  // 2️⃣ Sales Trend
  const salesSheet = salesData.map((item: any) => ({
    Month: item.month,
    Revenue: item.revenue,
    Orders: item.orders,
    Customers: item.customers,
  }));

  // 3️⃣ Products
  const productSheet = (report.products || []).map((p: any) => ({
    Name: p.name,
    Brand: p.brand,
    Price: p.price,
    Description: p.description,
  }));

  // 4️⃣ Brands
  const brandSheet = (report.brands || []).map((b: any) => ({
    Name: b.name,
    Description: b.description,
    Fragrances: b.fragrances || 0,
  }));

  // 5️⃣ Vendors
  const vendorSheet = (report.vendors || []).map((v: any) => ({
    Name: v.name,
    Email: v.email,
    Phone: v.phone,
    Address: v.address,
    Orders: v.orders || 0,
    OnTimeDelivery: v.onTimeDelivery || 0,
    AvgDeliveryTime: v.avgDeliveryTime || 0,
  }));

  // 6️⃣ Payments
  const paymentsSheet = (report.payments || []).map((p: any) => ({
    Status: p.status,
    Count: p.count,
    Amount: p.amount,
  }));

  // Create and export Excel
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(overviewSheet), "Overview");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(salesSheet), "Sales");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(productSheet), "Products");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(brandSheet), "Brands");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(vendorSheet), "Vendors");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(paymentsSheet), "Payments");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), `report-${dateRange}.xlsx`);
  console.log("🧾 salesSheet", salesSheet);
console.log("🧴 productSheet", productSheet);
console.log("🏷️ brandSheet", brandSheet);
console.log("📦 vendorSheet", vendorSheet);
console.log("💳 paymentsSheet", paymentsSheet);

};



  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
            <p className="text-muted-foreground">Comprehensive insights into your fragrance business performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={(val) => setDateRange(val as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>

        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            {/* <TabsTrigger value="vendors">Vendor Analytics</TabsTrigger> */}
            {/* <TabsTrigger value="marketing">Marketing Performance</TabsTrigger> */}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <p className="text-xl font-bold">{formattedRevenue || 0}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+15.2%</span> from last period
                  </p>
                </CardContent>
              </Card>
              {/* Total Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <p className="text-xl font-bold">{overview.totalOrders || 0}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" />
                    <span className="text-green-600 ml-1">+12.5%</span> from last period
                  </p>
                </CardContent>
              </Card>
              {/* New Customers */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <p className="text-xl font-bold">{overview.totalUsers || 0}</p>
                  </div>
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
                  <div className="text-2xl font-bold">
                    <p className="text-xl font-bold">{overview.totalProducts || 0}</p>
                  </div>
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
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
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
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {fragranceCategoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
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
              {/* Sales Performance Line Chart */}
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
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#8884d8"
                          name="Revenue (₹)"
                        />
                        <Line
                          type="monotone"
                          dataKey="orders"
                          stroke="#82ca9d"
                          name="Orders"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Top Performing Brands */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Brands</CardTitle>
                  <CardDescription>Brands by number of fragrances listed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(report?.brands || []).map((brand, index) => (
                      <div
                        key={brand._id}
                        className="flex items-center justify-between py-2 border-b last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-semibold text-purple-800">
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium">{brand.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {brand.fragrances ?? 0} fragrances
                        </span>
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
                      <TableHead>Gender</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Avg Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.products?.map((fragrance, index) => (
                      <TableRow key={fragrance._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{fragrance.name}</TableCell>
                        <TableCell>{fragrance.category?.gender}</TableCell>
                        <TableCell>{fragrance.category?.type}</TableCell>
                        <TableCell>{fragrance.category?.subCategory}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{fragrance.brand}</Badge>
                        </TableCell>
                        <TableCell>{fragrance.unitsSold}</TableCell> {/* Replace with fragrance.unitsSold if available */}
                        <TableCell>₹{fragrance.price?.toLocaleString("en-IN")}</TableCell>
                        <TableCell>₹{(fragrance.revenue / fragrance.unitsSold).toFixed(2)}</TableCell>{/* Replace with average if calculated */}
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
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip /> {/* ✅ Just use this */}
                        <Bar dataKey="customers" fill="#AF19FF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>Customer segmentation analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Remove or replace this block since customerSegments is deprecated */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">
                          <TrendingUp className="inline h-3 w-3 text-green-500" />
                          <span className="text-green-600 ml-1">+0%</span> from last period
                        </p>
                      </CardContent>
                    </Card>

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
                  <div className="text-2xl font-bold">{totalVendors}</div>
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
                  <div className="text-2xl font-bold">{totalOrders}</div>
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
                  <div className="text-2xl font-bold">{avgDeliveryTime} days</div>
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
                  <div className="text-2xl font-bold">{onTimeDeliveryRate}%</div>
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
                      <LineChart data={purchaseOrderTrends || []}>

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
                    {vendorCategoryDistribution.length > 0 ? (
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
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-muted">
                        No Vendor Category Distribution Data Available.
                      </div>
                    )}

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
                        <TableCell>
                          ${vendor.totalPurchases?.toLocaleString?.() ?? "0"}
                        </TableCell>
                        <TableCell>{vendor.orders}</TableCell>
                        <TableCell>{vendor.avgDeliveryTime} days</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{vendor.qualityRating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full mr-1 ${i < Math.floor(vendor.qualityRating) ? "bg-yellow-400" : "bg-gray-200"
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
                    {/* {paymentAnalytics.map((payment) => (
                      <div key={payment.status} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`
          w-3 h-3 rounded-full
          ${payment.status === "Paid" ? "bg-green-500" :
                                payment.status === "Pending" ? "bg-yellow-500" :
                                  payment.status === "Overdue" ? "bg-red-500" :
                                    "bg-gray-500"}
        `}
                          />
                          <div>
                            <p className="font-medium">{payment.status}</p>
                            <p className="text-sm text-muted-foreground">{payment.count} invoice{payment.count !== 1 ? "s" : ""}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-medium">${payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{payment.percentage}%</p>
                        </div>
                      </div>
                    ))} */}
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
                    {/* {topVendorsByCategory.map((vendor, index) => (
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
                    ))} */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* <TabsContent value="marketing" className="space-y-4">
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
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  )
}
