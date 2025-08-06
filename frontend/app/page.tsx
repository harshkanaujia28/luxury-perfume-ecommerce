"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { NewsletterSection } from "@/components/newsletter-section";
import PromoSection from "@/components/PromoSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import NewProductsPage from "@/components/NewArrivalsPage";
import WhyUs from "@/components/whyus";
import axios from "@/utils/axios";
import { Featured } from "@/components/featured";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products"); // calls http://localhost:5000/api/products
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // if (loading) {
  //   return <div className="p-8 text-center">Loading home page...</div>;
  // }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection /> {/* static categories */}
        <NewProductsPage /> {/* pass backend products */}
        <Featured/>
        <WhyUs />
        <FeaturedProducts /> {/* pass backend products */}
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
