import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Luxury Collection",
    description: "Premium fragrances for the discerning individual",
    image: "/assets/As a perfume expresses personality, its visual….jpeg",
    href: "/products?category=Luxury",
  },
  {
    name: "Floral Essence",
    description: "Delicate and romantic floral compositions",
    image: "/assets/offer2.jpeg",
    href: "/products?category=Floral",
  },
  {
    name: "Oriental Mystique",
    description: "Rich and exotic oriental fragrances",
    image: "/assets/@donatoworld The elegance and passion of the….jpeg",
    href: "/products?category=Oriental",
  },
  {
    name: "Fresh & Clean",
    description: "Light and refreshing everyday scents",
    image: "/assets/Advertising Product Photography by Packshot….jpeg",
    href: "/products?category=Fresh",
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Collections</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections, each designed to capture different moods and occasions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="group cursor-pointer border-0 shadow-lg overflow-hidden">
              <Link href={category.href}>
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
