"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminDashboard } from "@/components/admin-dashboard"
import { ProductManagement } from "@/components/product-management"
import { OrderManagement } from "@/components/order-management"
import { UserManagement } from "@/components/user-management"
import { useAuth } from "@/contexts/auth-context"
import AdminProfilePage from "./profile/page"
import VendorsPage from "../vendors/page"
import AdminSettingsPage from "./settings/page"
import AdminBannersPage from "./banners/page"
import CouponsPage from "../coupons/page"
import ReportsPage from "../reports/page"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return null
  }

const renderContent = () => {
switch (activeTab) {
  case "dashboard":
    return <AdminDashboard />
  case "products":
    return <ProductManagement />
  case "orders":
    return <OrderManagement />
  case "users":
    return <UserManagement />
  case "vendors":
    return <VendorsPage />
  case "banners":
    return <AdminBannersPage />
  case "coupons": // ✅ New coupons tab
    return <CouponsPage /> // <-- Make sure to import this component
  case "reports": // ✅ New coupons tab
    return <ReportsPage /> // <-- Make sure to import this component
  case "profile":
    return <AdminProfilePage />
  case "settings":
    return <AdminSettingsPage />
  default:
    return <AdminDashboard />
}


}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
