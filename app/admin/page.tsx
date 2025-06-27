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
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
