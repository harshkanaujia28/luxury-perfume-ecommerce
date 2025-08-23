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
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const setSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-16 md:py-20 lg:py-24">
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden max-w-7xl mx-auto">
        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const imageUrl = slide.imageUrl.startsWith("http")
              ? slide.imageUrl
              : `NEXT_PUBLIC_API_URL${slide.imageUrl}`;

            return (
              <div key={slide._id} className="w-full flex-shrink-0 relative h-[400px] sm:h-[450px] md:h-[500px]">
                {/* Background */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={imageUrl}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 " />
                </div>

                {/* Content */}
                {/* <div className="relative z-10 max-w-7xl h-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-center sm:justify-start sm:mt-20 ">
                  <div className="space-y-3 text-center sm:text-left">
                    <h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif leading-snug drop-shadow-2xl">
                      {slide.title} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
                        {slide.subtitle}
                      </span>
                    </h1>
                    <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-md mx-auto sm:mx-0 drop-shadow-md">
                      {slide.buttonText}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start justify-center sm:justify-start">
                      <Button
                        size="sm"
                        className="bg-green-600 text-white hover:bg-white hover:text-green-800 rounded-full w-full sm:w-auto"
                        asChild
                      >
                        <Link href={slide.buttonLink || "/products"}>Shop Now</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full border-white text-green-600 hover:bg-white hover:text-black w-full sm:w-auto"
                        asChild
                      >
                        <Link href="/about">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </div> */}
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
                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
