"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useApi } from "@/contexts/api-context"

export default function WhyUs() {
  const { getPromotionalBanners } = useApi()
  const [banners, setBanners] = useState<any[]>([])
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getPromotionalBanners()
        setBanners(res || [])
      } catch (err) {
        console.error("Failed to fetch promotional banners:", err)
      }
    }

    fetchBanners()
  }, [getPromotionalBanners])

  if (banners.length === 0) return null

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto space-y-8">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="w-full overflow-hidden rounded-2xl border border-lime-400/40 bg-zinc-900 shadow-lg hover:shadow-[0_0_35px_rgba(182,255,40,0.4)] transition"
          >
            <div className="relative w-full aspect-[1920/500]">
              <Image
                src={
                  banner.imageUrl.startsWith("http")
                    ? banner.imageUrl
                    : `${baseURL}${banner.imageUrl}`
                }
                alt={banner.title || `Banner ${index + 1}`}
                fill
                className="object-cover w-full h-full rounded-2xl"
                priority
              />
              {/* Overlay Title (if any) */}
              {banner.title && (
                <div className="absolute inset-0  flex items-center justify-center">
                  {/* <h3 className="text-3xl md:text-4xl font-bold text-lime-400 drop-shadow-lg">
                    {banner.title}
                  </h3> */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
