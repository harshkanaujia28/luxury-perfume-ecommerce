import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { Toaster } from "@/components/ui/toaster";
import { ApiProvider } from "@/contexts/api-context";
import { CheckoutProvider } from "@/contexts/checkoutContext";// ✅ add
import ClientRedirect from "../components/ClientRedirect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zafrine - Premium Perfume Collection",
  description: "Discover timeless luxury fragrances from premium brands",
  generator: "v0.dev",
  icons: {
    icon: "/Zafrine_Logo.png",
  },
    verification: {
    google: "x6aU0LBxPsCJ5mrNhkJFyOm6rfFb1s3tsriXwMvP_Dc",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApiProvider>
          <CartProvider>
            <WishlistProvider>
              <CheckoutProvider>
                 <ClientRedirect />
                {children}
                <Toaster />
              </CheckoutProvider>
            </WishlistProvider>
          </CartProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
