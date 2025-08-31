import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, Shield, Globe, Package, Phone } from "lucide-react"

export default function ShippingPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-lime-300 py-32">

        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-gray-900 via-black to-gray-900 py-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">
                Shipping Policy
              </h1>
              <p className="text-xl text-white">
                Safe, reliable, and timely delivery by ZAFRINE
              </p>
              <p className="text-sm text-lime-500 mt-4">
                Brand Name: <span className="text-white">ZAFRINE</span> | Legal Entity:{" "}
                <span className="text-white">D.M Enterprises</span>
              </p>
              <p className="text-sm text-white mt-4">
                At{" "}
                <span className="text-lime-400 font-semibold">ZAFRINE</span>, we are
                committed to delivering your perfumes safely and on time. Please read our
                Shipping Policy carefully to understand our delivery process and timelines.
              </p>
            </div>
          </section>


          {/* Shipping Details */}
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

              {/* Intro */}
              {/* <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardContent className="p-6 text-white">

                </CardContent>
              </Card> */}

              {/* Sections */}
              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lime-400"><Clock className="w-5 h-5 mr-2" /> 1. Order Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>All confirmed orders are processed within <strong>1–3 business days</strong> (excluding Sundays and public holidays).</li>
                    <li>Orders placed after <strong>5:00 PM IST</strong> will be processed on the next business day.</li>
                    <li>In case of high demand or unexpected delays, customers will be informed via email/phone.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lime-400"><Truck className="w-5 h-5 mr-2" /> 2. Shipping Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li><strong>Metro Cities:</strong> Estimated delivery within 3–5 business days.</li>
                    <li><strong>Non-Metro Cities / Tier-2 & Tier-3:</strong> Estimated delivery within 5–7 business days.</li>
                    <li><strong>Remote Areas:</strong> Delivery may take 7–10 business days depending on courier availability.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lime-400"><Package className="w-5 h-5 mr-2" /> 3. Shipping Charges</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>Free shipping on orders above ₹1000/-</li>
                    <li>A flat shipping charge of ₹100/- applies to orders below this amount</li>
                    <li>Shipping charges (if any) are non-refundable once the order has been dispatched</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lime-400"><Globe className="w-5 h-5 mr-2" /> 4. Tracking Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>Once your order is shipped, you will receive a tracking ID and courier details via email/SMS.</li>
                    <li>Customers can track their orders using the provided link until delivery.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lime-400"><Shield className="w-5 h-5 mr-2" /> 5. Delivery Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>Deliveries will be made to the shipping address provided at checkout.</li>
                    <li>Please ensure that your delivery details are accurate to avoid delays.</li>
                    <li>If delivery is attempted and the customer is unavailable, the courier may attempt re-delivery or request pickup from the nearest hub.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lime-400"><Truck className="w-5 h-5 mr-2" /> 6. Delays & Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>ZAFRINE is not responsible for delays caused by courier companies, natural calamities, strikes, or unforeseen circumstances.</li>
                    <li>Once dispatched, the order is under the responsibility of the courier partner. However, we will assist in resolving delivery issues.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lime-400"><Package className="w-5 h-5 mr-2" /> 7. Damaged / Missing Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>If your package arrives damaged or with missing items, report it within 48 hours of delivery along with an unboxing video + photos.</li>
                    <li>Claims without proof will not be eligible for replacement or refund.</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lime-400"><Phone className="w-5 h-5 mr-2" />Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <p>For shipping-related queries, please contact us:</p>
                    <p className="text-lime-400"><strong className="text-white">Email:</strong> info@zafrine.in</p>
                    <p className="text-lime-400"><strong className="text-white">Phone:</strong> +91 79051 68856</p>
                    <p className="text-lime-400"><strong className="text-white">Registered Office</strong> D.M Enterprises<br />88/475, Dalelpurva Rajvi Road, Qasim	Ganj Kanpur,208001<br />UttarPradesh, India</p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </section>
        </main>

      </div>
      <Footer />
    </>
  )
}
