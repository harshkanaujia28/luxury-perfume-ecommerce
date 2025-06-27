"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Indulge in",
      subtitle: "Timeless",
      accent: "Luxury",
      description: "Discover our signature collection of premium fragrances",
      image: "/assets/861aa280d3d0eb1f9f88480ec9c476f5.jpeg",
    },
    {
      id: 2,
      title: "Experience",
      subtitle: "Pure",
      accent: "Elegance",
      description: "Crafted with the finest ingredients from around the world",
      image: "/assets/a-bottle-of-cologne-is-on-a-table-next-to-a-vase-of-flowers-photo.jpg",
    },
    {
      id: 3,
      title: "Embrace",
      subtitle: "Modern",
      accent: "Sophistication",
      description: "Where tradition meets contemporary luxury",
      image: "/assets/stylish-bottle-with-perfume-against-corral-background-soft-emerald-color_937888-3637.avif",
    },
    {
      id: 4,
      title: "Discover",
      subtitle: "Every",
      accent: "Occasion",
      description: "A scent for every moment and mood",
      image: "/assets/discover-luxurious-perfumes-every-mood-style-occasion_1197721-145134.avif",
    },
    {
      id: 5,
      title: "Crafted in",
      subtitle: "Dramatic",
      accent: "Detail",
      description: "Bold aromas in beautiful bottles",
      image: "/assets/pngtree-a-sophisticated-bottle-of-perfume-captured-in-dramatic-dark-setting-with-picture-image_16577777.jpg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="relative">
        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0 h-screen relative">
              {/* Background Image */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src={slide.image}
                  alt={slide.accent}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-7xl h-full mx-auto px-6 lg:px-12 flex items-center justify-center">
                <div className="space-y-6 text-center  lg:text-left">
                  <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-serif leading-tight drop-shadow-2xl">
                    {slide.title}

                    <span>{slide.subtitle}</span>
                    <br />
                    <span className="sarif block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">{slide.accent}</span>
                  </h1>
                  <p className="text-white/90 max-w-lg mx-auto lg:mx-0 text-lg drop-shadow-md text-center">
                    {slide.description}
                  </p>
                 <div className="flex flex-col items-center justify-center sm:flex-row gap-4 ">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {/* <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-20"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button> */}

        {/* Right Arrow */}
        {/* <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-20"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button> */}

        {/* Slide Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
