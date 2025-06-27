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
    <section className="h-[60vh] py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Premium Brands</h2>
          <p className="text-lg text-gray-600">
            We partner with the world's most prestigious fragrance houses
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center flex-grow">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-6  rounded-lg shadow-sm hover:shadow-md transition-shadow h-[120px]"
            >
              <div className="relative w-[160px] h-[100px] md:w-[180px] md:h-[120px]">
                <Image
                  src={brand.logo || "/placeholder.svg"}
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
