"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Overnight shipping takes 1 business day. International shipping varies by location.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders over $75 within the United States. International shipping rates vary by location.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "You can modify or cancel your order within 2 hours of placing it. After that, orders enter our fulfillment process and cannot be changed.",
      },
    ],
  },
  {
    category: "Products & Fragrances",
    questions: [
      {
        question: "How do I choose the right fragrance?",
        answer:
          "Consider the occasion, season, and your personal preferences. We offer detailed descriptions and notes for each fragrance. You can also contact our fragrance experts for personalized recommendations.",
      },
      {
        question: "What's the difference between Eau de Parfum and Eau de Toilette?",
        answer:
          "Eau de Parfum (EDP) has a higher concentration of fragrance oils (15-20%) and lasts longer. Eau de Toilette (EDT) has a lower concentration (5-15%) and is lighter, perfect for daytime wear.",
      },
      {
        question: "How long do fragrances last?",
        answer:
          "Fragrance longevity depends on the concentration, your skin type, and environmental factors. Generally, EDPs last 6-8 hours, while EDTs last 3-5 hours.",
      },
      {
        question: "Do you offer samples?",
        answer:
          "Yes! We offer sample sets and individual samples for most of our fragrances. This is a great way to try before you buy a full-size bottle.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unopened items in their original packaging. Items must be returned in sellable condition.",
      },
      {
        question: "Can I return opened fragrances?",
        answer:
          "Unfortunately, we cannot accept returns on opened fragrances due to health and safety regulations. However, we do accept returns if the item was damaged or if we sent the wrong product.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Contact our customer service team or use our online return form. We'll provide you with a prepaid return label and instructions.",
      },
      {
        question: "How long does it take to get my refund?",
        answer:
          "Once we receive your returned item, we'll process your refund within 3-5 business days. The refund will appear in your account within 5-7 business days.",
      },
    ],
  },
  {
    category: "Account & Payment",
    questions: [
      {
        question: "Do I need an account to place an order?",
        answer:
          "No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and enjoy faster checkout.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and various buy-now-pay-later options.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers.",
      },
      {
        question: "Can I save multiple addresses?",
        answer: "Yes! You can save multiple shipping and billing addresses in your account for faster checkout.",
      },
    ],
  },
  {
    category: "Care & Storage",
    questions: [
      {
        question: "How should I store my fragrances?",
        answer:
          "Store fragrances in a cool, dry place away from direct sunlight and heat. Keep them in their original boxes to protect from light exposure.",
      },
      {
        question: "Do fragrances expire?",
        answer:
          "Fragrances can last 3-5 years when stored properly. Signs of expiration include changes in color, scent, or consistency.",
      },
      {
        question: "How should I apply fragrance?",
        answer:
          "Apply to pulse points like wrists, neck, and behind ears. Don't rub the fragrance in, as this can break down the scent molecules.",
      },
      {
        question: "Can I layer different fragrances?",
        answer:
          "Yes! Fragrance layering can create unique scent combinations. Start with lighter scents as a base and add stronger ones sparingly.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="luxury-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about our products, shipping, and policies
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 w-full text-lg"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFAQ.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No FAQs found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFAQ.map((category) => (
                  <div key={category.category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                    <div className="space-y-4">
                      {category.questions.map((faq, index) => {
                        const itemId = `${category.category}-${index}`
                        const isOpen = openItems.includes(itemId)

                        return (
                          <Card key={itemId} className="border border-gray-200">
                            <CardContent className="p-0">
                              <button
                                onClick={() => toggleItem(itemId)}
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                              >
                                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                                {isOpen ? (
                                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                )}
                              </button>
                              {isOpen && (
                                <div className="px-6 pb-6">
                                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Can't find what you're looking for? Our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@luxefragrances.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
