"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import axios from "@/utils/axios"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    // Send form data to backend API
    await axios.post("/contact", formData)

    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
      variant: "success",
    })

    setFormData({ name: "", email: "", subject: "", message: "" })
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive",
    })
    console.error("Contact form error:", error)
  } finally {
    setIsLoading(false)
  }
}

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [" D.M Enterprises", "88/475, Dalelpurva Rajvi Road", "QasimGanj Kanpur,208001", "UttarPradesh, India"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 79051 68856"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@zafrine.in"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [" Monday – Sunday: 10:00 AM – 7:00 PM"],
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-lime-300">

        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-gray-900 via-black to-gray-900 py-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6 text-center">Contact Us</h1>
              <p className="text-xl text-white">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Contact Form */}
                <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-lime-400">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-white">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="bg-black border border-lime-500/40 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-black border border-lime-500/40 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-white">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="bg-black border border-lime-500/40 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-white">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="bg-black border border-lime-500/40 text-white"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                {/* Contact Information */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-lime-400 mb-6">Get in Touch</h2>
                    <p className="text-white mb-8">
                      We’re always here to assist you. For any queries related to your orders, products, or services, feel free to reach out to us:
                    </p>
                  </div>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon
                      return (
                        <Card key={index} className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5 text-lime-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lime-400 mb-2">{info.title}</h3>
                                {info.details.map((detail, detailIndex) => (
                                  <p key={detailIndex} className="text-white text-sm">{detail}</p>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-zinc-950">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-lime-400 mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-white">Quick answers to common questions</p>
              </div>

              <div className="space-y-6">
                {[
                  { question: "How long do your fragrances last?", answer: "Our fragrances are designed to last 6-12 hours..." },
                  { question: "Do you offer samples?", answer: "Yes! We offer sample sets..." },
                  { question: "What is your return policy?", answer: "We offer a 30-day return policy..." },
                  { question: "Do you ship internationally?", answer: "Yes, we ship to most countries..." },
                ].map((faq, index) => (
                  <Card key={index} className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lime-400 mb-2">{faq.question}</h3>
                      <p className="text-white">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

      </div>
      <Footer />
    </>

  )
}
