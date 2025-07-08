"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const slides = [
    {
      id: 1,
      title: "Indulge in",
      subtitle: "Timeless",
      accent: "Luxury",
      description: "Discover our signature collection of premium fragrances",
      desktopImage: "/assets/861aa280d3d0eb1f9f88480ec9c476f5.jpeg",
      mobileImage: "/assets/mobile1.jpeg",
    },
    {
      id: 2,
      title: "Experience",
      subtitle: "Pure",
      accent: "Elegance",
      description: "Crafted with the finest ingredients from around the world",
      desktopImage: "/assets/a-bottle-of-cologne-is-on-a-table-next-to-a-vase-of-flowers-photo.jpg",
      mobileImage: "/assets/mobile2.jpeg",
    },
    {
      id: 3,
      title: "Embrace",
      subtitle: "Modern",
      accent: "Sophistication",
      description: "Where tradition meets contemporary luxury",
      desktopImage: "/assets/stylish-bottle-with-perfume-against-corral-background-soft-emerald-color_937888-3637.avif",
      mobileImage: "/assets/mobile3.jpeg",
    },
    {
      id: 4,
      title: "Discover",
      subtitle: "Every",
      accent: "Occasion",
      description: "A scent for every moment and mood",
      desktopImage: "/assets/discover-luxurious-perfumes-every-mood-style-occasion_1197721-145134.avif",
      mobileImage: "/assets/mobile6.jpeg",
    },
    {
      id: 5,
      title: "Crafted in",
      subtitle: "Dramatic",
      accent: "Detail",
      description: "Bold aromas in beautiful bottles",
      desktopImage: "/assets/pngtree-a-sophisticated-bottle-of-perfume-captured-in-dramatic-dark-setting-with-picture-image_16577777.jpg",
      mobileImage: "/assets/mobile4.jpeg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const setSlide = (index: number) => setCurrentSlide(index)

  return (
    <section className="relative min-h-min w-full overflow-hidden flex items-center justify-center py-20">
      <div className=" relative w-full h-[500px] overflow-hidden bg-green-50  max-w-7xl mx-auto mt-8 ">
        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0 h-screen relative">
              {/* Background Image */}
              <div className="absolute top-0 left-0 w-full h-[500px] -z-10  overflow-hidden">
                <Image
                  src={isMobile ? slide.mobileImage : slide.desktopImage}
                  alt={slide.accent}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>


              {/* Content */}
              <div className="relative z-10 max-w-7xl h-full mx-auto px-6 lg:px-12 flex items-center ">
                <div className="space-y-4 text-center lg:text-left">
                  <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-serif leading-snug drop-shadow-2xl">
                    {slide.title} <span>{slide.subtitle}</span>
                    <br />
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                      {slide.accent}
                    </span>
                  </h1>
                  <p className="text-white/90 max-w-md mx-auto lg:mx-0 text-base drop-shadow-md text-center lg:text-left">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                    <Button size="lg" className="bg-green-600 text-white hover:bg-white hover:text-green-800 rounded-full" asChild>
                      <Link href="/products">Shop Now</Link>
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
          ))}
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
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
