"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/contexts/api-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp, IndianRupeeIcon, LogOut } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

export function AdminDashboard() {
  const router = useRouter();
  const { getAdminStats, getRevenue } = useApi();
 const [totalRevenue, setTotalRevenue] = useState(0)
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAdminStats(); // { stats, recentOrders, topProducts }
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setTopProducts(data.topProducts);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [getAdminStats]);
   useEffect(() => {
      
      fetchRevenue()
    }, [])
  
    const fetchRevenue = async () => {
      try {
        const revenue = await getRevenue()
        setTotalRevenue(revenue)
      } catch (err) {
        console.error("Failed to fetch revenue", err)
      }
    }

  const handleLogout = () => {
    localStorage.clear(); // remove token
    document.cookie = "token=; Max-Age=0; path=/"; // clear cookie if used
    router.push("/login"); // redirect to login
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

 const statCards = [
  {
    title: "Total Revenue",
    value: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(totalRevenue || 0),
    icon: IndianRupeeIcon,
    color: "text-green-600",
  },
  {
    title: "Total Orders",
    value: stats.totalOrders,
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Total Products",
    value: stats.totalProducts,
    icon: Package,
    color: "text-purple-600",
  },
  {
    title: "Total Users",
    value: stats.totalUsers,
    icon: Users,
    color: "text-orange-600",
  },
];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      case "refunded":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>

        <Button onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-700">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="products">Top Products</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-gray-500">No orders found</td>
                      </tr>
                    ) : (
                      recentOrders.map((order) => (
                        <tr key={order._id} className="border-b">
                          <td className="py-3 px-4">{order._id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.email}</td>
                          <td className="py-3 px-4">₹{order.total}</td>
                          <td className="py-3 px-4 capitalize">
                             <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </td>
                          <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          {/* Top Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Brand</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Gender</th>
                      <th className="text-left py-3 px-4">Subcategory</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-gray-500">No products found</td>
                      </tr>
                    ) : (
                      topProducts.map((product) => (
                        <tr key={product._id} className="border-b">
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">{product.brand}</td>
                          <td className="py-3 px-4">{product.category?.type}</td>
                          <td className="py-3 px-4">{product.category?.gender}</td>
                          <td className="py-3 px-4">{product.category?.subCategory}</td>
                          <td className="py-3 px-4">₹{product.price}</td>
                          <td className="py-3 px-4">{product.stock}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
