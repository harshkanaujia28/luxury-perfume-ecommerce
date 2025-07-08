import Image from "next/image"
import { Truck } from "lucide-react"
import Link from "next/link"
export default function PromoSection() {
  return (
    <section className="min-h-[70vh] bg-green-200 p-6 rounded-xl shadow-sm max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
      
      {/* Left Side - Image + Price Tag */}
      <div className="relative">
         <Link  href="/products?category=Luxury">
        <Image
          src="/assets/promo.jpg" // Replace with your image
          alt="Amber Luxe Perfume"
          width={600}
          height={500}
          className="rounded-xl object-contain"
        />
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm shadow-md rounded-lg px-3 py-1 text-sm">
       
          <div className="font-semibold cursor-pointer">Amber Luxe</div>
          <div className="flex gap-2 items-center text-xs">
            <span className="line-through text-gray-500">$79.00</span>
            <span className="text-black font-bold">$69.99</span>
          </div>
         
        </div>
         </Link>
      </div>

      {/* Right Side - Text */}
      <div className="flex-1 space-y-6 max-w-xl text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Discover a world of timeless fragrances —
          <br />
          <span className="text-gray-700">
            scents that reflect your unique essence and personal style
          </span>
        </h2>
        <p className="text-sm text-gray-600">
          Discover our wide ranging and timeless set of lifestyle products. Pick your favourite stuff that matches your personal taste, style and suits your style.
        </p>

        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <Truck className="w-5 h-5 text-gray-700" />
          <div>
            <p className="text-sm font-medium text-gray-800">Free Shipping</p>
            <p className="text-xs text-gray-500">Minimum purchase of $49</p>
          </div>
        </div>
      </div>
    </section>
  )
}
