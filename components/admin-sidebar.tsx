"use client"

import { LayoutDashboard, Package, ShoppingCart, Users,UserCircle,Store, Settings, Percent,Megaphone,FileText,LifeBuoy,Tags,Palette,MapPin,BarChart3  } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "brands", label: "Brands", icon: Palette },
    { id: "categories", label: "Categories", icon:Tags },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
    { id: "vendors", label: "Vendors", icon: Store  },
    { id: "banners", label: "Banners", icon:Megaphone  },
    { id: "coupons", label: "Coupons", icon: Percent },
    { id: "delivery-zones", label: "Delivery Zones", icon: MapPin },
    { id: "support", label: "Support & Returns", icon: LifeBuoy },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "legal", label: "Legal", icon:FileText  },
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
