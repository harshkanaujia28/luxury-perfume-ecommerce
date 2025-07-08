import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp,Store } from "lucide-react"

export function AdminDashboard() {
 const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+15.3%",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Total Products",
    value: "30",
    change: "+2.5%",
    icon: Package,
    color: "text-purple-600",
  },
  {
    title: "Total Users",
    value: "2,456",
    change: "+12.8%",
    icon: Users,
    color: "text-orange-600",
  },
  {
    title: "Total Vendors", // ✅ new card
    value: "78",            // ← You can fetch real count from backend later
    change: "+4.2%",
    icon: Store,            // ← Make sure to import this
    color: "text-rose-600",
  },
]


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-gray-600">Customer {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Artisan Luxe", "Velvet Bloom", "Noir Mystique", "Amber Luxe", "Ocean Breeze"].map((product, i) => (
                <div key={product} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product}</p>
                    <p className="text-sm text-gray-600">{Math.floor(Math.random() * 50 + 10)} sold</p>
                  </div>
                  <div className="text-right">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
