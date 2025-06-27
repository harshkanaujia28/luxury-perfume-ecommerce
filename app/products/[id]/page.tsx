"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, Heart, Share2, Minus, Plus } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/lib/products"
import { FeaturedProducts } from "@/components/featured-products"
import Link from "next/link"
export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [selectedSize, setSelectedSize] = useState("60 ml");
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedBrand, setSelectedBrand] = useState("Azzaro");


  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
      })
    }
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header />
       <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors pt-5 pl-5"
        >
          ← Back to Products
        </Link>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">

          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${selectedImage === index ? "border-black" : "border-gray-200"
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">Save ${product.originalPrice - product.price}</Badge>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Add:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 pt-4 pb-3">
                <span className="block text-sm font-semibold text-gray-600">BRAND</span>
                <div className="flex gap-2">
                  {["Azzaro", "Dior", "Chanel"].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3 py-1 rounded-full border text-sm ${selectedBrand === brand
                        ? "border-black font-semibold text-black"
                        : "border-gray-300 text-gray-600"
                        }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Quantity Pills */}
                <div className="space-y-2 pt-4 pb-3">
                  <span className="block text-sm font-semibold text-gray-600">QUANTITY</span>
                  <div className="flex gap-2">
                    {['20 ml', '60 ml', '100 ml'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedSize(option)}
                        className={`px-3 py-1 rounded-full border text-sm ${selectedSize === option ? 'border-black font-semibold' : 'border-gray-300 text-gray-600'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button size="lg" className="flex-1 bg-black text-white hover:bg-gray-800" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Skin Type</h4>
                      <p className="text-gray-600">{product.specifications.skinType}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Longevity</h4>
                      <p className="text-gray-600">{product.specifications.longevity}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Sillage</h4>
                      <p className="text-gray-600">{product.specifications.sillage}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Best Season</h4>
                      <p className="text-gray-600">{product.specifications.season}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-600">Reviews coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="py-8">
          <FeaturedProducts />
        </div>

      </main>
      <Footer />
    </div>

  )
}
