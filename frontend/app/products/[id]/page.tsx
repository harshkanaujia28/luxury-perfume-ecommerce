"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Share2, Minus, Plus, ShoppingCart } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
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
import { useApi } from "@/contexts/api-context";
const baseURL = "https://luxury-perfume-ecommerce.onrender.com";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { addToCart } = useCart()
  const { toast } = useToast()


  const { getProductById } = useApi();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedBrand, setSelectedBrand] = useState("Azzaro")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetched = await getProductById(id as string);
        setProduct(fetched);
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, getProductById]);
  // const product = products.find((p) => p.id === params.id)
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
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
  const originalPrice = product.price;
  let finalPrice = originalPrice;

  if (product.offer?.isActive) {
    if (product.offer.type === "percentage") {
      finalPrice = originalPrice - (originalPrice * product.offer.value) / 100;
    } else if (product.offer.type === "fixed") {
      finalPrice = originalPrice - product.offer.value;
    }
  }
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product._id)

  const handleToggleWishlist = async () => {
    try {
      if (wishlisted) {
        await removeItem(product._id);
      } else {
        await addItem(product._id);
      }
    } catch (err) {
      console.error("Wishlist action failed:", err);
    }
  };

  const handleAddToCart = async () => {
    const originalPrice = product.price;
    let finalPrice = originalPrice;

    if (product.offer?.isActive) {
      if (product.offer.type === "percentage") {
        finalPrice = originalPrice - (originalPrice * product.offer.value) / 100;
      } else if (product.offer.type === "fixed") {
        finalPrice = originalPrice - product.offer.value;
      }
    }

    try {
      await addToCart(product._id, quantity, selectedSize, finalPrice);
      toast({
        title: "Added to cart",
        description: `${quantity} ${product.name} added at ₹${finalPrice.toFixed(2)}`,
      });
      console.log("Adding to cart with:", {
        id: product._id,
        quantity,
        selectedSize,
        price: finalPrice,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add to cart.",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-400 border-t-transparent" />
        <span className="ml-4 text-gray-600">Loading product...</span>
      </div>
    );
  }


  return (
    <>

      <div className="flex flex-col min-h-screen bg-white pt-16">
        <Header />
        <div className="pt-4 px-4 sm:px-6 flex flex-wrap items-center text-xs sm:text-sm text-gray-600 gap-1 sm:gap-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-gray-600 hover:text-black transition-colors"
          >
            ← Back
          </Link>
          <span>/</span>
          <Link href="/" className="hover:underline text-gray-500">Home</Link>
          <span>/</span>
          <Link
            href={`/products?type=${product.category?.type}`}
            className="hover:underline capitalize"
          >
            {product.category?.type}
          </Link>
          <span>/</span>
          <Link
            href={`/products?gender=${product.category?.gender}`}
            className="hover:underline capitalize"
          >
            {product.category?.gender}
          </Link>
          <span>/</span>
          <Link
            href={`/products?subCategory=${encodeURIComponent(product.category?.subCategory || "")}`}
            className="hover:underline capitalize"
          >
            {product.category?.subCategory}
          </Link>
        </div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={
                    product.images[selectedImage] && product.images[selectedImage].startsWith("http")
                      ? product.images[selectedImage]
                      : product.images[selectedImage]
                        ? `${baseURL}${product.images[selectedImage]}`
                        : "/placeholder.svg"
                  }
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-[100px] h-[100px] rounded-md border-2 overflow-hidden ${selectedImage === index ? "border-green-600" : "border-gray-200"
                      }`}
                  >
                    <Image
                      src={
                        img?.startsWith("http")
                          ? img
                          : img
                            ? `${baseURL}${img}`
                            : "/placeholder.svg"
                      }
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>


            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-gray-900">₹{finalPrice.toFixed(2)}</span>
                    {product.offer?.isActive && (
                      <span className="text-xl text-gray-500 line-through">₹{originalPrice.toFixed(2)}</span>
                    )}
                  </div>


                  {product.offer?.isActive && product.offer.type === "percentage" && (
                    <div className="p-3 bg-white rounded-lg w-fit">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                          {product.offer.value}% OFF
                        </Badge>

                      </div>

                    </div>
                  )}

                </div>


              </div>

              <div className="space-y-4">
                {/* Quantity Counter */}

                {/* Brand Pills */}
                <div className="space-y-2 pt-4 pb-3">
                  <span className="block text-sm font-semibold text-gray-600">BRAND</span>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded-full border text-sm border-green-600 text-green-700 font-semibold`}
                    >
                      {product.brand}
                    </button>
                  </div>
                </div>
                {/* Quantity Options */}
                <div className="space-y-2 pt-4 pb-3">
                  <span className="block text-sm font-semibold text-gray-600">QUANTITY</span>
                  <div className="flex gap-2 flex-wrap">
                    {product.quantity?.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedSize(option)}
                        className={`px-3 py-1 rounded-full border text-sm transition-colors ${selectedSize === option
                          ? "border-green-600 text-green-700 font-semibold"
                          : "border-gray-300 text-gray-600"
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

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
                {/* Action Buttons */}
                <div className="flex space-x-4">

                  <Button
                    size="lg"
                    className="flex-1 w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!selectedSize}
                    onClick={async () => {
                      if (!selectedSize) {
                        toast({
                          title: "Please select quantity",
                          variant: "destructive",
                        });
                        return;
                      }

                      const originalPrice = product.price;
                      let finalPrice = originalPrice;

                      if (product.offer?.isActive) {
                        if (product.offer.type === "percentage") {
                          finalPrice = originalPrice - (originalPrice * product.offer.value) / 100;
                        } else if (product.offer.type === "fixed") {
                          finalPrice = originalPrice - product.offer.value;
                        }
                      }

                      try {
                        await addToCart(product._id, quantity, selectedSize, finalPrice);
                        toast({
                          title: "Added to cart",
                          description: `${quantity} ${product.name} added at ₹${finalPrice.toFixed(2)}`,
                        });
                        window.location.href = "/checkout";
                      } catch (err) {
                        console.error(err);
                        toast({
                          title: "Error",
                          description: "Failed to add product to cart",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Buy Now
                  </Button>


                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleAddToCart}
                    className="rounded-full p-2 text-black  hover:bg-green-50"
                    disabled={!selectedSize || !product}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Button>

                  <Button
                    variant={wishlisted ? "default" : "outline"}
                    size="icon"
                    onClick={handleToggleWishlist}
                    className={`rounded-full p-2 ${wishlisted ? "bg-pink-100 text-green-600" : ""}`}
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                  </Button>

                  <Button variant="outline" size="icon" className="rounded-full p-2">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>


              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.reviews?.length > 0
                      ? `${product.rating} (${product.reviews.length} reviews)`
                      : "No reviews yet"}
                  </span>

                </div>
              </div>


              {/* Product Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-gray-800">Product Features</h3>

                  {product?.features?.length > 0 ? (
                    <ul className="space-y-2">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No features listed.</p>
                  )}
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="description"
                  className="data-[state=active]:text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="data-[state=active]:text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
                >
                  Reviews
                </TabsTrigger>
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
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {product.reviews.map((review: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="font-semibold">{review.name}</div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.stars
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                      }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No reviews yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>

          {/* Related Products */}
          <div className="py-8">
            <FeaturedProducts />
          </div>
        </main>
        <Footer />
      </div>

    </>
  )
}
