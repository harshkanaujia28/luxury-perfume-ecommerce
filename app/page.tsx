import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { BrandShowcase } from "@/components/brand-showcase"
import { NewsletterSection } from "@/components/newsletter-section"
import PromoSection from "@/components/PromoSection"
import { CategoriesSection } from "@/components/CategoriesSection"
import WhyUsSection from "@/components/why-us-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection/>
        <FeaturedProducts />
        <CategoryShowcase />
       <WhyUsSection/>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
