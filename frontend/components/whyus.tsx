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
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="w-full overflow-hidden rounded-lg shadow"
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
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
