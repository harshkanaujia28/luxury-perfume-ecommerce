"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface HeroBanner {
  _id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  isActive: boolean;
  type: string;
}

export function HeroSection() {
  const [slides, setSlides] = useState<HeroBanner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/banners?type=hero`);
        const activeSlides = res.data.filter((s: HeroBanner) => s.isActive);
        setSlides(activeSlides);
      } catch (err) {
        console.error("❌ Failed to fetch hero images:", err);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (slides.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const setSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-16 md:py-20 lg:py-24 bg-black">
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden max-w-7xl mx-auto rounded-2xl shadow-lg border border-lime-400">
        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const imageUrl = slide.imageUrl.startsWith("http")
              ? slide.imageUrl
              : `${process.env.NEXT_PUBLIC_API_URL}${slide.imageUrl}`;

            return (
              <div
                key={slide._id}
                className="w-full flex-shrink-0 relative h-[400px] sm:h-[450px] md:h-[500px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={imageUrl}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover object-center opacity-70"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl h-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-center sm:justify-start">
                  <div className="space-y-4 text-center sm:text-left">
                    <h1 className="text-lime-400 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium drop-shadow-md">
                      {slide.subtitle}
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start justify-center sm:justify-start">
                      <Button
                        size="sm"
                        className="bg-lime-500 text-black hover:bg-lime-400 font-semibold rounded-full w-full sm:w-auto shadow-md"
                        asChild
                      >
                        <Link href={slide.buttonLink || "/products"}>
                          {slide.buttonText || "Shop Now"}
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full border-lime-400 text-lime-300 hover:bg-lime-400 hover:text-black w-full sm:w-auto"
                        asChild
                      >
                        <Link href="/about">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-lime-400 scale-110 shadow-md"
                    : "bg-gray-600 hover:bg-lime-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
