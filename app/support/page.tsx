"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Phone, Mail, Clock, HelpCircle, FileText, Package, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    category: "",
    priority: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Support ticket created!",
      description: "We've received your request and will respond within 24 hours.",
    })

    setFormData({
      name: "",
      email: "",
      orderNumber: "",
      category: "",
      priority: "",
      subject: "",
      message: "",
    })
    setIsLoading(false)
  }

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Start Chat",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a customer service representative",
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call (555) 123-4567",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "24/7 - Response within 24 hours",
      action: "Send Email",
    },
  ]

  const commonIssues = [
    {
      icon: Package,
      title: "Order Issues",
      description: "Problems with your order, shipping, or delivery",
      link: "/orders",
    },
    {
      icon: CreditCard,
      title: "Payment & Billing",
      description: "Questions about charges, refunds, or payment methods",
      link: "/returns",
    },
    {
      icon: FileText,
      title: "Returns & Exchanges",
      description: "Need to return or exchange a product",
      link: "/returns",
    },
    {
      icon: HelpCircle,
      title: "Product Questions",
      description: "Information about fragrances, ingredients, or usage",
      link: "/faq",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="luxury-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Customer Support</h1>
            <p className="text-xl text-gray-600">
              We're here to help! Get in touch with our support team for any questions or concerns.
            </p>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
              <p className="text-lg text-gray-600">Choose the support method that works best for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {supportOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Card key={option.title} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{option.description}</p>
                      <div className="flex items-center justify-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {option.availability}
                      </div>
                      <Button className="w-full">{option.action}</Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Common Issues */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Issues</h2>
                <p className="text-lg text-gray-600">Quick links to help with common questions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {commonIssues.map((issue) => {
                  const Icon = issue.icon
                  return (
                    <Card key={issue.title} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{issue.description}</p>
                        <Button variant="outline" size="sm" asChild>
                          <a href={issue.link}>Learn More</a>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Support Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Submit a Support Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="orderNumber">Order Number (Optional)</Label>
                      <Input
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        placeholder="ORD-12345"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => handleSelectChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order">Order Issues</SelectItem>
                            <SelectItem value="payment">Payment & Billing</SelectItem>
                            <SelectItem value="product">Product Questions</SelectItem>
                            <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                            <SelectItem value="returns">Returns & Exchanges</SelectItem>
                            <SelectItem value="technical">Technical Issues</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select onValueChange={(value) => handleSelectChange("priority", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your issue in detail..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-gray-600">support@luxefragrances.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                        <p className="text-sm text-gray-600">Sat: 10AM-4PM EST</p>
                        <p className="text-sm text-gray-600">Sun: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Response Times</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Live Chat</span>
                      <span className="text-sm font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Phone Support</span>
                      <span className="text-sm font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email (High Priority)</span>
                      <span className="text-sm font-medium">2-4 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email (Standard)</span>
                      <span className="text-sm font-medium">24 hours</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Before You Contact Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Check your order confirmation email for tracking information</li>
                      <li>• Review our FAQ section for quick answers</li>
                      <li>• Have your order number ready if contacting about an order</li>
                      <li>• Check your spam folder for our responses</li>
                      <li>• Try clearing your browser cache for website issues</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
