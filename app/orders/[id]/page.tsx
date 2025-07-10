"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Edit,
  Printer,
  Download,
  MessageSquare,
  Star,
  Gift,
  Sparkles,
  DollarSign,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

// Sample order data - in real app this would come from API based on order ID
const orderData = {
  id: "#FR-3210",
  status: "Processing",
  paymentStatus: "Paid",
  orderDate: "2024-01-15",
  estimatedDelivery: "2024-01-20",
  lastUpdated: "2024-01-16 10:30 AM",

  customer: {
    id: "CUST-001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg",
    customerType: "VIP",
    totalOrders: 12,
    totalSpent: 2450.0,
    joinDate: "2023-03-15",
    loyaltyPoints: 1250,
  },

  items: [
    {
      id: 1,
      name: "Chanel No. 5",
      brand: "Chanel",
      size: "100ml",
      concentration: "EDP",
      image: "/placeholder.svg",
      price: 145.0,
      quantity: 1,
      sku: "CHANEL-NO5-100-EDP",
      fragranceFamily: "Floral Aldehyde",
      topNotes: ["Aldehydes", "Bergamot", "Lemon"],
      middleNotes: ["Rose", "Jasmine", "Lily of the Valley"],
      baseNotes: ["Sandalwood", "Vanilla", "Musk"],
      giftWrap: true,
      giftMessage: "Happy Birthday! Hope you love this classic fragrance. - Love, Mom",
    },
    {
      id: 2,
      name: "Sample Set - Luxury Collection",
      brand: "Various",
      size: "5x2ml",
      concentration: "Mixed",
      image: "/placeholder.svg",
      price: 25.0,
      quantity: 1,
      sku: "SAMPLE-LUX-SET-001",
      fragranceFamily: "Mixed",
      description:
        "Includes samples of Chanel No. 5, Dior J'adore, Tom Ford Black Orchid, Creed Aventus, and Marc Jacobs Daisy",
      giftWrap: false,
    },
  ],

  pricing: {
    subtotal: 170.0,
    shipping: 0.0,
    tax: 13.6,
    discount: 0.0,
    giftWrapFee: 5.0,
    total: 188.6,
    couponCode: null,
  },

  shipping: {
    method: "Standard Shipping",
    carrier: "FedEx",
    trackingNumber: "1Z999AA1234567890",
    address: {
      name: "Sarah Johnson",
      street: "123 Luxury Lane",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    instructions: "Please leave package with doorman. Fragile items - handle with care.",
  },

  billing: {
    address: {
      name: "Sarah Johnson",
      street: "123 Luxury Lane",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "2025",
    },
    transactionId: "txn_1234567890",
  },

  timeline: [
    {
      status: "Order Placed",
      date: "2024-01-15 2:30 PM",
      description: "Order successfully placed and payment confirmed",
      icon: CheckCircle,
      completed: true,
    },
    {
      status: "Payment Confirmed",
      date: "2024-01-15 2:31 PM",
      description: "Payment of $188.60 processed successfully",
      icon: CreditCard,
      completed: true,
    },
    {
      status: "Processing",
      date: "2024-01-16 9:00 AM",
      description: "Order is being prepared for shipment",
      icon: Package,
      completed: true,
      current: true,
    },
    {
      status: "Shipped",
      date: "Expected: 2024-01-17",
      description: "Package will be handed over to carrier",
      icon: Truck,
      completed: false,
    },
    {
      status: "Delivered",
      date: "Expected: 2024-01-20",
      description: "Package will be delivered to customer",
      icon: CheckCircle,
      completed: false,
    },
  ],

  notes: [
    {
      id: 1,
      author: "Admin",
      date: "2024-01-16 10:30 AM",
      message: "Customer requested gift wrapping for main item. Added gift wrap fee.",
      type: "internal",
    },
    {
      id: 2,
      author: "Sarah Johnson",
      date: "2024-01-15 3:45 PM",
      message: "Please ensure careful handling - this is a gift for my mother's birthday.",
      type: "customer",
    },
  ],

  relatedOrders: [
    { id: "#FR-3156", date: "2023-12-20", total: 95.0, status: "Delivered" },
    { id: "#FR-3089", date: "2023-11-15", total: 189.0, status: "Delivered" },
    { id: "#FR-2987", date: "2023-10-08", total: 145.0, status: "Delivered" },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Shipped":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Delivered":
      return "bg-green-100 text-green-800 border-green-200"
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    case "Pending":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800 border-green-200"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Failed":
      return "bg-red-100 text-red-800 border-red-200"
    case "Refunded":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [orderStatus, setOrderStatus] = useState(orderData.status)
  const [newNote, setNewNote] = useState("")
  const [trackingNumber, setTrackingNumber] = useState(orderData.shipping.trackingNumber)

  const handleStatusUpdate = (newStatus: string) => {
    setOrderStatus(newStatus)
    // Here you would make an API call to update the order status
    console.log(`Updating order ${orderData.id} to status: ${newStatus}`)
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Here you would make an API call to add the note
      console.log(`Adding note to order ${orderData.id}: ${newNote}`)
      setNewNote("")
    }
  }

  const handlePrintOrder = () => {
    window.print()
  }

  const handleDownloadInvoice = () => {
    // Here you would generate and download the invoice
    console.log(`Downloading invoice for order ${orderData.id}`)
  }

  return (
    <div className="flex flex-col">
    
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Order Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Order Details</h2>
            <p className="text-muted-foreground">
              Placed on {orderData.orderDate} • Last updated {orderData.lastUpdated}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handlePrintOrder}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownloadInvoice}>
              <Download className="mr-2 h-4 w-4" />
              Invoice
            </Button>
            <Button asChild>
              <Link href="/OrderManagement">Back to Orders</Link>
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Order Status</p>
                  <Badge className={getStatusColor(orderStatus)} variant="secondary">
                    {orderStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <Badge className={getPaymentStatusColor(orderData.paymentStatus)} variant="secondary">
                    {orderData.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-medium">{orderData.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-lg">${orderData.pricing.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="customer">Customer Info</TabsTrigger>
            <TabsTrigger value="timeline">Order Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes & Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Order Items */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Fragrance Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-lg">
                                  {item.brand} {item.name}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span>{item.size}</span>
                                  <span>•</span>
                                  <span>{item.concentration}</span>
                                  <span>•</span>
                                  <span>SKU: {item.sku}</span>
                                </div>
                                <Badge variant="outline" className="mt-2">
                                  {item.fragranceFamily}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${item.price.toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                            </div>

                            {/* Fragrance Notes */}
                            {item.topNotes && (
                              <div className="mt-4 space-y-2">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">Top Notes:</span>
                                    <p className="text-muted-foreground">{item.topNotes.join(", ")}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Middle Notes:</span>
                                    <p className="text-muted-foreground">{item.middleNotes?.join(", ")}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Base Notes:</span>
                                    <p className="text-muted-foreground">{item.baseNotes?.join(", ")}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Gift Wrapping */}
                            {item.giftWrap && (
                              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Gift className="h-4 w-4 text-purple-600" />
                                  <span className="font-medium text-purple-800">Gift Wrapped</span>
                                </div>
                                {item.giftMessage && (
                                  <p className="text-sm text-purple-700 italic">"{item.giftMessage}"</p>
                                )}
                              </div>
                            )}

                            {/* Sample Set Description */}
                            {item.description && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm">{item.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${orderData.pricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {orderData.pricing.shipping === 0 ? "FREE" : `$${orderData.pricing.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gift Wrap Fee</span>
                      <span>${orderData.pricing.giftWrapFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${orderData.pricing.tax.toFixed(2)}</span>
                    </div>
                    {orderData.pricing.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${orderData.pricing.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${orderData.pricing.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-medium">Shipping Method</Label>
                    <p className="text-sm text-muted-foreground">{orderData.shipping.method}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Carrier</Label>
                    <p className="text-sm text-muted-foreground">{orderData.shipping.carrier}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Tracking Number</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="font-mono text-sm"
                      />
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Delivery Address</Label>
                    <div className="text-sm text-muted-foreground mt-1">
                      <p className="font-medium">{orderData.shipping.address.name}</p>
                      <p>{orderData.shipping.address.street}</p>
                      {orderData.shipping.address.apartment && <p>{orderData.shipping.address.apartment}</p>}
                      <p>
                        {orderData.shipping.address.city}, {orderData.shipping.address.state}{" "}
                        {orderData.shipping.address.zipCode}
                      </p>
                      <p>{orderData.shipping.address.country}</p>
                    </div>
                  </div>
                  {orderData.shipping.instructions && (
                    <div>
                      <Label className="font-medium">Special Instructions</Label>
                      <p className="text-sm text-muted-foreground mt-1">{orderData.shipping.instructions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Management Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="status-update">Update Order Status</Label>
                    <Select value={orderStatus} onValueChange={handleStatusUpdate}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Update Status</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customer" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Customer Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={orderData.customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {orderData.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{orderData.customer.name}</h3>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        {orderData.customer.customerType}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Customer ID:</span>
                      <p className="text-muted-foreground">{orderData.customer.id}</p>
                    </div>
                    <div>
                      <span className="font-medium">Member Since:</span>
                      <p className="text-muted-foreground">{orderData.customer.joinDate}</p>
                    </div>
                    <div>
                      <span className="font-medium">Total Orders:</span>
                      <p className="text-muted-foreground">{orderData.customer.totalOrders}</p>
                    </div>
                    <div>
                      <span className="font-medium">Total Spent:</span>
                      <p className="text-muted-foreground">${orderData.customer.totalSpent.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Loyalty Points: {orderData.customer.loyaltyPoints}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{orderData.customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{orderData.customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Billing Address</p>
                      <div className="text-sm text-muted-foreground">
                        <p>{orderData.billing.address.street}</p>
                        {orderData.billing.address.apartment && <p>{orderData.billing.address.apartment}</p>}
                        <p>
                          {orderData.billing.address.city}, {orderData.billing.address.state}{" "}
                          {orderData.billing.address.zipCode}
                        </p>
                        <p>{orderData.billing.address.country}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Payment Method</p>
                    <p className="text-sm text-muted-foreground">
                      {orderData.billing.paymentMethod.brand} ending in {orderData.billing.paymentMethod.last4}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Transaction ID</p>
                    <p className="text-sm text-muted-foreground font-mono">{orderData.billing.transactionId}</p>
                  </div>
                  <div>
                    <p className="font-medium">Payment Status</p>
                    <Badge className={getPaymentStatusColor(orderData.paymentStatus)} variant="secondary">
                      {orderData.paymentStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Related Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orderData.relatedOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <Badge variant="outline" className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          event.completed
                            ? event.current
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <event.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${event.current ? "text-blue-600" : ""}`}>{event.status}</h4>
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Order Notes & Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Note */}
                <div className="border rounded-lg p-4">
                  <Label htmlFor="new-note">Add Note</Label>
                  <Textarea
                    id="new-note"
                    placeholder="Add a note about this order..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="mt-2"
                  />
                  <Button onClick={handleAddNote} className="mt-2" disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>

                {/* Existing Notes */}
                <div className="space-y-4">
                  {orderData.notes.map((note) => (
                    <div
                      key={note.id}
                      className={`border rounded-lg p-4 ${
                        note.type === "customer" ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{note.author}</span>
                          <Badge variant={note.type === "customer" ? "default" : "secondary"} className="text-xs">
                            {note.type === "customer" ? "Customer" : "Internal"}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-sm">{note.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
