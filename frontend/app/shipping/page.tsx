import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, Shield, Globe, Package } from "lucide-react"

export default function ShippingPage() {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      price: "Free",
      time: "5-7 business days",
      description: "Free shipping on orders over ₹75",
      icon: Truck,
    },
    {
      name: "Express Shipping",
      price: "₹9.99",
      time: "2-3 business days",
      description: "Faster delivery for urgent orders",
      icon: Clock,
    },
    {
      name: "Overnight Shipping",
      price: "₹24.99",
      time: "1 business day",
      description: "Next day delivery available",
      icon: Package,
    },
  ]

  const internationalRates = [
    { region: "Canada", price: "₹15.99", time: "7-10 business days" },
    { region: "Europe", price: "₹25.99", time: "10-14 business days" },
    { region: "Asia Pacific", price: "₹29.99", time: "12-16 business days" },
    { region: "Rest of World", price: "₹35.99", time: "14-21 business days" },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-lime-300 py-32">

        <main>
          {/* Hero Section */}
          <section className="luxury-gradient py-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">Shipping Information</h1>
              <p className="text-xl text-white">Fast, secure, and reliable delivery worldwide</p>
            </div>
          </section>

          {/* Domestic Shipping */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-lime-400 mb-4">Domestic Shipping (US)</h2>
                <p className="text-lg text-white">Choose the shipping method that works best for you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {shippingMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Card key={method.name} className="text-center bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                      <CardHeader>
                        <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-black" />
                        </div>
                        <CardTitle className="text-lime-400 text-xl">{method.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="text-2xl font-bold text-lime-400">{method.price}</div>
                            <div className="text-sm text-white">{method.time}</div>
                          </div>
                          <p className="text-white">{method.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* International Shipping */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-lime-400 mb-4">International Shipping</h2>
                  <p className="text-lg text-white">We ship to over 100 countries worldwide</p>
                </div>

                <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-white border-collapse">
                        <thead>
                          <tr className="border-b border-lime-500/30">
                            <th className="text-left py-3 px-4">Region</th>
                            <th className="text-left py-3 px-4">Shipping Cost</th>
                            <th className="text-left py-3 px-4">Delivery Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {internationalRates.map((rate) => (
                            <tr key={rate.region} className="border-b border-lime-500/20">
                              <td className="py-3 px-4 font-medium">{rate.region}</td>
                              <td className="py-3 px-4">{rate.price}</td>
                              <td className="py-3 px-4">{rate.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shipping Policies & Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lime-400">
                      <Shield className="w-5 h-5 mr-2" />
                      Shipping Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <div>
                      <h4 className="font-semibold mb-2 text-lime-400">Processing Time</h4>
                      <p className="text-sm">Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-lime-400">Shipping Restrictions</h4>
                      <p className="text-sm">Some fragrances may have restrictions for international shipping. Check product details.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-lime-400">Tracking</h4>
                      <p className="text-sm">All orders include tracking information. You'll receive an email with tracking details once your order ships.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lime-400">
                      <Globe className="w-5 h-5 mr-2" />
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <div>
                      <h4 className="font-semibold mb-2 text-lime-400">Customs & Duties</h4>
                      <p className="text-sm">International customers are responsible for any customs duties, taxes, or fees imposed by their country.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-lime-400">Delivery Issues</h4>
                      <p className="text-sm">If your package is lost or damaged during shipping, contact us within 48 hours for assistance.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-lime-400">Address Changes</h4>
                      <p className="text-sm">Address changes can only be made before the order ships. Contact customer service immediately to update your address.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

      </div>
      <Footer />
    </>

  )
}
