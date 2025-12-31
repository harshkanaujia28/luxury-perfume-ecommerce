import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { Toaster } from "@/components/ui/toaster";
import { ApiProvider } from "@/contexts/api-context";
import { CheckoutProvider } from "@/contexts/checkoutContext";
import ClientRedirect from "../components/ClientRedirect";

import Script from "next/script";

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

const META_PIXEL_ID = "1445495063846739";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ---------------- Google Analytics ---------------- */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KZ4GTEPZLQ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KZ4GTEPZLQ');
          `}
        </Script>

        {/* ---------------- Meta (Facebook) Pixel ---------------- */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      <body className={inter.className}>
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

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
