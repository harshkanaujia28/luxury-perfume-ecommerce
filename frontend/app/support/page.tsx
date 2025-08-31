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
import { useApi } from "@/contexts/api-context"

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
  const { submitSupportTicket } = useApi()

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
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        customer: formData.name,
        email: formData.email,
        subject: formData.subject,
        priority: formData.priority,       // must be one of: "low", "medium", "high"
        category: formData.category,       // must be: "product_issue", "shipping_issue", "billing", "general"
        orderId: formData.orderNumber || undefined,
        description: formData.message,
      };


      await submitSupportTicket(payload);

      toast({
        title: "Support ticket created!",
        description: "We've received your request and will respond within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        orderNumber: "",
        category: "",
        priority: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      console.error("❌ Submit failed:", err);
      toast({
        title: "Failed to submit ticket",
        description: err.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
 <>
  <Header />
  <div className="min-h-screen bg-black text-lime-300">
    <main>
      {/* Hero Section */}
      <section className="relative py-40 border-b border-lime-500">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">
            Customer Support
          </h1>
          <p className="text-xl text-white">
            We're here to help! Get in touch with our support team for any questions or concerns.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lime-400 mb-4">How Can We Help?</h2>
            <p className="text-lg text-white">Choose the support method that works best for you</p>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.title}
                  className="bg-zinc-900 border-lime-500/30 shadow-lg rounded-2xl text-center hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-lime-400" />
                    </div>
                    <CardTitle className="text-xl text-lime-400">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-white">{option.description}</p>
                    <div className="flex items-center justify-center text-sm text-lime-300">
                      <Clock className="w-4 h-4 mr-1" />
                      {option.availability}
                    </div>
                    <Button className="w-full bg-lime-500 hover:bg-lime-400 text-black">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div> */}

          {/* Common Issues */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-lime-400 mb-4">Common Issues</h2>
              <p className="text-lg text-lime-300">Quick links to help with common questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commonIssues.map((issue) => {
                const Icon = issue.icon;
                return (
                  <Card
                    key={issue.title}
                    className="bg-zinc-900 border-lime-500/30 shadow-lg rounded-2xl hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-5 h-5 text-lime-400" />
                      </div>
                      <h3 className="font-semibold text-lime-400 mb-2">{issue.title}</h3>
                      <p className="text-sm text-white mb-4">{issue.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-lime-500 text-lime-400 hover:bg-lime-500 hover:text-black"
                      >
                        <a href={issue.link}>Learn More</a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Support Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-zinc-900 border-lime-500/30 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-lime-400">Submit a Support Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-lime-300">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-zinc-900 border border-lime-500 text-lime-300 placeholder-lime-500 focus:ring-lime-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-lime-300">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-zinc-900 border border-lime-500 text-lime-300 placeholder-lime-500 focus:ring-lime-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="orderNumber" className="text-lime-300">Order Number (Optional)</Label>
                    <Input
                      id="orderNumber"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleInputChange}
                      placeholder="ORD-12345"
                      className="bg-zinc-900 border border-lime-500 text-lime-300 placeholder-lime-500 focus:ring-lime-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-lime-300">Category</Label>
                      <Select onValueChange={(value) => handleSelectChange("category", value)}>
                        <SelectTrigger className="bg-zinc-900 border border-lime-500 text-lime-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 text-lime-300">
                          <SelectItem value="product_issue">Product Issue</SelectItem>
                          <SelectItem value="shipping_issue">Shipping Issue</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority" className="text-lime-300">Priority</Label>
                      <Select onValueChange={(value) => handleSelectChange("priority", value)}>
                        <SelectTrigger className="bg-zinc-900 border border-lime-500 text-lime-300">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 text-lime-300">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-lime-300">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-zinc-900 border border-lime-500 text-lime-300 placeholder-lime-500 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-lime-300">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your issue in detail..."
                      required
                      className="bg-zinc-900 border border-lime-500 text-lime-300 placeholder-lime-500 focus:ring-lime-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-lime-500 hover:bg-lime-400 text-black"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-zinc-900 border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-lime-400">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-lime-300">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-white" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-white">+ 91 79051 68856</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-white" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-white">info@zafrine.in</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-white" />
                    <div>
                      <p className="font-medium ">Business Hours</p>
                      <p className="text-sm text-white">Monday – Sunday: 10:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-lime-400">Response Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-lime-300">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Live Chat</span>
                    <span className="text-sm font-medium text-white">Immediate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phone Support</span>
                    <span className="text-sm font-medium text-white">Immediate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email (High Priority)</span>
                    <span className="text-sm font-medium text-white">2-4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email (Standard)</span>
                    <span className="text-sm font-medium text-white">24 hours</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-lime-400">Before You Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white">
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
  </div>
  <Footer />
</>

  )
}
