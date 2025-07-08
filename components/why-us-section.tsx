"use client"

import Image from "next/image"
import { Truck, Leaf, Tag, Heart } from "lucide-react"

export default function WhyUsSection() {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto bg-green-100 rounded-3xl px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left side - Image and visual elements */}
                    <div className="relative flex justify-center items-center">
                        <div className="relative w-full max-w-sm h-[360px] lg:h-[420px]">
                            {/* Green circular background */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[300px] h-[300px] lg:w-[360px] lg:h-[360px] bg-emerald-400 rounded-full -translate-x-8 lg:-translate-x-16 z-10"></div>
                            </div>

                            {/* Main image */}
                            <div className="relative z-10 h-full flex items-center justify-center ">
                                <Image
                                    src="/assets/pngtree-glass-bottle-of-perfume-on-a-green-background-place-for-text-png-image_15306188.png"
                                    alt="Woman with fresh groceries and vegetables"
                                    width={400}
                                    height={420}
                                    className="object-contain"
                                />
                            </div>

                            {/* Fast delivery badge */}
                            <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 w-20 h-20 bg-white text-green-600 rounded-full shadow-lg flex items-center justify-center text-[10px] font-bold text-center z-20 p-2 leading-tight">
                                Trusted by<br />10,000+
                            </div>
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="space-y-8">
                        <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-6">Why We Are the Best?</h2>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Truck,
                                    title: "Fast & Safe Delivery",
                                    desc: "Perfumes delivered swiftly with secure packaging.",
                                },
                                {
                                    icon: Leaf,
                                    title: "Authentic Fragrances",
                                    desc: "100% genuine perfumes sourced from trusted brands.",
                                },
                                {
                                    icon: Tag,
                                    title: "Exclusive Discounts",
                                    desc: "Premium scents at irresistible prices and offers.",
                                },
                                {
                                    icon: Heart,
                                    title: "Loved by Thousands",
                                    desc: "Trusted by fragrance lovers across the country.",
                                }

                            ].map(({ icon: Icon, title, desc }) => (
                                <div className="flex items-start gap-4" key={title}>
                                    <div className="bg-green-600 p-3 rounded-lg flex-shrink-0">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
                                        <p className="text-gray-600">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
