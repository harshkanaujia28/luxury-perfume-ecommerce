"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"

interface HeroBanner {
  _id: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  imageUrl: string
  isActive: boolean
  type: string
}

export function HeroSection() {
  const [slides, setSlides] = useState<HeroBanner[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/banners?type=hero")
        const activeSlides = res.data.filter((s: HeroBanner) => s.isActive)
        setSlides(activeSlides)
      } catch (err) {
        console.error("❌ Failed to fetch hero images:", err)
      }
    }

    fetchHeroImages()
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides])

  const setSlide = (index: number) => setCurrentSlide(index)

  return (
    <section className="relative min-h-min w-full overflow-hidden flex items-center justify-center py-20">
      <div className="relative w-full h-[500px] overflow-hidden max-w-7xl mx-auto mt-8">
        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const imageUrl = slide.imageUrl.startsWith("http")
              ? slide.imageUrl
              : `http://localhost:5000${slide.imageUrl}`

            return (
              <div key={slide._id} className="w-full flex-shrink-0 h-screen relative">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] -z-10 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl h-full mx-auto px-6 lg:px-12 flex items-center">
                  <div className="space-y-4 text-center lg:text-left">
                    <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-serif leading-snug drop-shadow-2xl">
                      {slide.title} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                        {slide.subtitle}
                      </span>
                    </h1>
                    <p className="text-white/90 max-w-md mx-auto lg:mx-0 text-base drop-shadow-md text-center lg:text-left">
                      {slide.buttonText}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                      <Button size="lg" className="bg-green-600 text-white hover:bg-white hover:text-green-800 rounded-full" asChild>
                        <Link href={slide.buttonLink || "/products"}>Shop Now</Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full border-white text-green-600 hover:bg-white hover:text-black"
                        asChild
                      >
                        <Link href="/about">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-green-600 to-emerald-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
