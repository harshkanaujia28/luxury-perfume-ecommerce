"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminDashboard } from "@/components/admin-dashboard";
import { ProductManagement } from "@/components/product-management";
import { OrderManagement } from "@/components/order-management";
import { UserManagement } from "@/components/user-management";
import AdminProfilePage from "./profile/page";
import VendorsPage from "../vendors/page";
import AdminSettingsPage from "./settings/page";
import AdminBannersPage from "./banners/page";
import CouponsPage from "../coupons/page";
import ReportsPage from "./reports/page";
import SupportPage from "./support/page";
import BrandDetailPage from "./brands/page";
import CategoriesPage from "./categories/page";
import DeliveryZonesPage from "./delivery-zones/page";
import LegalPage from "./legal/page";
import { useApi } from "@/contexts/api-context"; // <-- useApi instead of useAuth

export default function AdminPage() {
  const { user, loading } = useApi();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>; // Show while checking
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <ProductManagement />;
      case "brands":
        return <BrandDetailPage />;
      case "categories":
        return <CategoriesPage />;
      case "orders":
        return <OrderManagement />;
      case "users":
        return <UserManagement />;
      case "vendors":
        return <VendorsPage />;
      case "banners":
        return <AdminBannersPage />;
      case "coupons":
        return <CouponsPage />;
      case "delivery-zones":
        return <DeliveryZonesPage />;
      case "support":
        return <SupportPage />;
      case "reports":
        return <ReportsPage />;
      case "profile":
        return <AdminProfilePage />;
      // case "settings":
      //   return <AdminSettingsPage />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
