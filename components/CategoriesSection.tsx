"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const categories = [
    "All",
    "Luxury",
    "Floral",
    "Oriental",
    "Amber",
    "Fresh",
    "Oud",
    "Citrus",
    "Gourmand",
    "Spicy",
    "Green",
    "Woody",
    "Clean",
    "Fruity",
    "Herbal",
]

const categoryImages: Record<string, string> = {
    All: "/assets/all.jpeg",
    Luxury: "/assets/luxury.jpeg",
    Floral: "/assets/floral.jpeg",
    Oriental: "/assets/oud.jpeg",
    Amber: "/assets/amber.jpeg",
    Fresh: "/assets/fresh.jpeg",
    Oud: "/assets/oriental.jpeg",
    Citrus: "/images/categories/citrus.jpg",
    Gourmand: "/images/categories/gourmand.jpg",
    Spicy: "/images/categories/spicy.jpg",
    Green: "/images/categories/green.jpg",
    Woody: "/images/categories/woody.jpg",
    Clean: "/images/categories/clean.jpg",
    Fruity: "/images/categories/fruity.jpg",
    Herbal: "/images/categories/herbal.jpg",
}

export function CategoriesSection() {
    const visibleCategories = categories.slice(0, 7)

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-start mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Category</h2>
                    {/* <p className="text-gray-600">Explore perfumes by fragrance families</p> */}
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-8">
                    {visibleCategories.map((category) => (
                        <Link
                            key={category}
                            href={category === "All" ? `/products` : `/products?category=${encodeURIComponent(category)}`}
                        >
                            <Card className="group hover:shadow-md transition cursor-pointer rounded-xl border border-gray-200 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="relative w-full h-48 rounded-t-xl overflow-hidden bg-gray-100">
                                        <Image
                                            src={categoryImages[category] || "/images/categories/default.jpg"}
                                            alt={category}
                                            fill
                                            sizes="(min-width: 1024px) 16.66vw, (min-width: 768px) 33.33vw, 50vw"
                                            className="object-center object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                        />
                                    </div>

                                    <div className="text-center py-3 bg-transparent">
                                        <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors text-sm capitalize">
                                            {category}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link href="/categories">
                        <Button variant="outline" className="text-green-700 border-green-600 hover:bg-green-100">
                            View All Categories
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
