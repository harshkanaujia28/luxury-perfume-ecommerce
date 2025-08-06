"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Download,
  Mail,
  Package,
  Truck,
  Star,
  ArrowRight,
  Share2,
  MessageCircle,
  Calendar,
  MapPin,
} from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock order data - in real app, fetch from API using order ID from search params
  useEffect(() => {
    const orderId = searchParams.get("order_id") || "ORD-2024-001"

    // Simulate API call
    setTimeout(() => {
      setOrderData({
        id: orderId,
        status: "confirmed",
        total: 299.97,
        subtotal: 259.97,
        tax: 20.8,
        shipping: 19.2,
        discount: 0,
        paymentMethod: "Visa ending in 4242",
        transactionId: "txn_1234567890",
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        shippingAddress: {
          name: "John Doe",
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "United States",
        },
        items: [
          {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            image: "/placeholder.svg?height=80&width=80",
            price: 99.99,
            quantity: 1,
            vendor: "TechGear Pro",
          },
          {
            id: 2,
            name: "Smart Fitness Watch",
            image: "/placeholder.svg?height=80&width=80",
            price: 199.99,
            quantity: 1,
            vendor: "FitTech Store",
          },
          {
            id: 3,
            name: "USB-C Fast Charger",
            image: "/placeholder.svg?height=80&width=80",
            price: 29.99,
            quantity: 2,
            vendor: "PowerUp Electronics",
          },
        ],
      })
      setIsLoading(false)
    }, 1000)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your order. We've received your payment and are processing your order.
          </p>
          <Badge variant="secondary" className="text-sm">
            Order #{orderData.id}
          </Badge>
        </div>

       
          

          

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-2">Continue Shopping</h3>
              <p className="text-gray-600 mb-4">Discover more amazing products from our store</p>
              <Link href="/">
                <Button>
                  Browse Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Review Prompt */}
       
      </div>
    </div>
  )
}
