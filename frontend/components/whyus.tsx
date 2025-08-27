"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"   // 👈 add this
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
        {banners
          .filter((banner) => banner.isActive) // ✅ only active banners
          .map((banner, index) => {
            const image = (
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
              </div>
            )

            // ✅ if linkUrl exists → wrap with <Link>
            return (
              <div
                key={banner._id || index}
                className="w-full overflow-hidden rounded-2xl border border-lime-400/40 bg-zinc-900 shadow-lg hover:shadow-[0_0_35px_rgba(182,255,40,0.4)] transition"
              >
                {banner.linkUrl ? (
                  <Link href={banner.linkUrl}>
                    {image}
                  </Link>
                ) : (
                  image
                )}
              </div>
            )
          })}
      </div>
    </section>
  )
}
