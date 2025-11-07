"use client"

import {
  LayoutDashboard, Package, ShoppingCart, Users, UserCircle,
  Store, Settings, Percent, Megaphone, FileText, LifeBuoy,
  Tags, Palette, MapPin, BarChart3, Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import clsx from "clsx"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "brands", label: "Brands", icon: Palette },
    { id: "categories", label: "Categories", icon: Tags },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
    { id: "vendors", label: "Vendors", icon: Store },
    { id: "banners", label: "Banners", icon: Megaphone },
    { id: "coupons", label: "Coupons", icon: Percent },
    { id: "delivery-zones", label: "Delivery Zones", icon: MapPin },
    { id: "support", label: "Support & Returns", icon: LifeBuoy },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: UserCircle },
  ]

  const SidebarContent = (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                onTabChange(item.id)
                setMobileOpen(false) // close on mobile
              }}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-sm h-screen sticky top-0 overflow-y-auto z-30">
        {SidebarContent}
      </aside>

      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform z-40",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {SidebarContent}
      </div>

      {/* Backdrop when sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}
