"use client"
import Image from "next/image"

const brands = [
  { name: "Bagsy", logo: "/assets/download (5).png" },
  { name: "CARRÉ", logo: "/assets/download (4).png" },
  { name: "AURA", logo: "/assets/download.png" },
  { name: "ZARA", logo: "/assets/download (6).png" },
  { name: "DIVA", logo: "/assets/images (1).png" },
  { name: "bay", logo: "/assets/Perfume shop logo template, beauty business branding design, black and white vector _ Free Vector.jpeg" },
]

export function BrandShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Discover Premium Brands</h2>
          <p className="text-lg text-gray-600">
            We partner with the world's most prestigious fragrance houses
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center bg-white p-4 rounded-md shadow hover:shadow-md transition-shadow"
            >
              <div className="relative w-32 h-20 sm:w-36 sm:h-24">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
