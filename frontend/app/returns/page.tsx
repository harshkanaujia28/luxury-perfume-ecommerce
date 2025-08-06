import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Package, CreditCard, Clock, CheckCircle, XCircle } from "lucide-react"

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Contact our customer service or use our online return form",
      icon: RotateCcw,
    },
    {
      step: 2,
      title: "Package Item",
      description: "Securely package the item in its original packaging",
      icon: Package,
    },
    {
      step: 3,
      title: "Ship Back",
      description: "Use the prepaid return label we provide",
      icon: Package,
    },
    {
      step: 4,
      title: "Receive Refund",
      description: "Get your refund within 5-7 business days",
      icon: CreditCard,
    },
  ]

  const returnableItems = [
    { item: "Unopened fragrances", status: "returnable", icon: CheckCircle },
    { item: "Damaged items", status: "returnable", icon: CheckCircle },
    { item: "Wrong item received", status: "returnable", icon: CheckCircle },
    { item: "Opened fragrances", status: "not-returnable", icon: XCircle },
    { item: "Items after 30 days", status: "not-returnable", icon: XCircle },
    { item: "Gift sets (partial)", status: "not-returnable", icon: XCircle },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="luxury-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Returns & Exchanges</h1>
            <p className="text-xl text-gray-600">
              We want you to love your fragrance. If you're not satisfied, we're here to help.
            </p>
          </div>
        </section>

        {/* Return Policy Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">30-Day Return Policy</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer a 30-day return policy for unopened items. Your satisfaction is our priority.
              </p>
            </div>

            {/* Return Process */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Return</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {returnSteps.map((step) => {
                  const Icon = step.icon
                  return (
                    <Card key={step.step} className="text-center">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm font-medium text-gray-500 mb-2">Step {step.step}</div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* What Can Be Returned */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What Can Be Returned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {returnableItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.item} className="flex items-center space-x-3">
                          <Icon
                            className={`w-5 h-5 ${item.status === "returnable" ? "text-green-600" : "text-red-600"}`}
                          />
                          <span className={`${item.status === "returnable" ? "text-gray-900" : "text-gray-500"}`}>
                            {item.item}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Return Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Time Limit
                    </h4>
                    <p className="text-gray-600 text-sm">Returns must be initiated within 30 days of delivery.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Condition
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Items must be unopened and in original packaging with all tags attached.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Refund Method
                    </h4>
                    <p className="text-gray-600 text-sm">Refunds will be processed to the original payment method.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How long does it take to process a return?</h4>
                    <p className="text-gray-600">
                      Once we receive your returned item, we'll process your refund within 3-5 business days. The refund
                      will appear in your account within 5-7 business days depending on your payment method.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Do I have to pay for return shipping?</h4>
                    <p className="text-gray-600">
                      We provide free return shipping for defective items or if we sent the wrong product. For other
                      returns, a $5.99 return shipping fee will be deducted from your refund.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Can I exchange an item instead of returning it?
                    </h4>
                    <p className="text-gray-600">
                      Yes! We offer exchanges for the same item in a different size or for a different fragrance of
                      equal or lesser value. Contact our customer service team to arrange an exchange.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What if my item arrives damaged?</h4>
                    <p className="text-gray-600">
                      If your item arrives damaged, please contact us within 48 hours with photos of the damage. We'll
                      arrange for a replacement or full refund at no cost to you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with a Return?</h3>
              <p className="text-gray-600 mb-6">Our customer service team is here to help you with your return.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/contact">Contact Support</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:returns@luxefragrances.com">Email Returns Team</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
