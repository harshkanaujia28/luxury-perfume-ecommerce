import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, XCircle, RefreshCcw, Package, CreditCard, AlertTriangle, Phone } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-black text-lime-300">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-40 border-b border-lime-400">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xl text-white">
              Safe, transparent, and fair policies by ZAFRINE
            </p>
            <p className="text-sm text-lime-500 mt-4">
              Brand Name: <span className="text-white">ZAFRINE</span> | Legal Entity:{" "}
              <span className="text-white">D.M Enterprises</span>
            </p>
            <p className="text-sm text-white mt-4">
              At{" "}
              <span className="text-lime-400 font-semibold">ZAFRINE</span>, we are
              committed to delivering your perfumes safely and on time. Please read our
              Cancellation & Refund Policy carefully to understand our process and conditions.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* 1. Cancellation Policy */}
            <Card className="bg-zinc-900 border-lime-500/30 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lime-400">
                  <XCircle className="w-5 h-5 mr-2" /> 1. Cancellation Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-2">
                <p>● Orders once placed cannot be cancelled after they have been processed or dispatched.</p>
                <p>● If you wish to cancel your order, please contact us within 12 hours of placing the order.</p>
                <p>● Once your order has been shipped, no cancellations will be accepted.</p>
              </CardContent>
            </Card>

            {/* 2. Refund & Replacement Policy */}
            <Card className="bg-zinc-900 border-lime-500/30 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lime-400">
                  <RefreshCcw className="w-5 h-5 mr-2" /> 2. Refund & Replacement Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-2">
                <p>
                  Since perfumes fall under non-returnable and non-refundable products, refunds are not
                  applicable except in the case of damage or defective products.
                </p>
                <p>We will provide a refund or replacement only under the following conditions:</p>
                <p>● The product delivered is damaged during transit.</p>
                <p>● The product received is defective, leaking, broken, or incorrect.</p>
              </CardContent>
            </Card>

            {/* 3. Conditions for Claim */}
            <Card className="bg-zinc-900 border-lime-500/30 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lime-400">
                  <Shield className="w-5 h-5 mr-2" /> 3. Conditions for Claim
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-2">
                <p>
                  ● You must inform us within 48 hours of receiving the product by emailing us at{" "}
                  <a
                    href="mailto:customer@zafrine.in"
                    className="text-lime-400 underline hover:text-lime-300"
                  >
                    customer@zafrine.in
                  </a>{" "}
                  or contacting our customer support.
                </p>
                <p>● You must provide unboxing video proof and images of the damaged/defective product.</p>
                <p>
                  ● The product must be unused, sealed, and in its original packaging (except in cases of
                  damage during delivery).
                </p>
              </CardContent>
            </Card>

            {/* 4. Refund Process */}
            <Card className="bg-zinc-900 border-lime-500/30 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lime-400">
                  <CreditCard className="w-5 h-5 mr-2" /> 4. Refund Process
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-2">
                <p>
                  ● Once your claim is approved, the refund will be processed within 7–10 business days to
                  your original payment method.
                </p>
                <p>
                  ● In the case of a replacement, the new product will be shipped within 5–7 business days
                  after claim approval.
                </p>
              </CardContent>
            </Card>

            {/* 5. Non-Refundable Cases */}
            <Card className="bg-zinc-900 border-lime-500/30 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lime-400">
                  <Package className="w-5 h-5 mr-2" /> 5. Non-Refundable Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-2">
                <p>● Change of mind or dislike of fragrance.</p>
                <p>● Opened, used, or tampered products.</p>
                <p>● Delays caused by courier/shipping companies beyond our control.</p>
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

            {/* Disclaimer Section */}
            <Card className="max-w-3xl mx-auto mt-6 border border-red-600/40 shadow-md rounded-2xl bg-zinc-950">
              <CardHeader className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="text-lg font-semibold">Disclaimer</h2>
              </CardHeader>
              <CardContent className="text-gray-300 text-sm leading-relaxed">
                <p>
                  🔒 Disclaimer: This policy is subject to change at any time without prior notice.
                  By purchasing from <span className="font-semibold text-white">ZAFRINE (D.M Enterprises)</span>,
                  you agree to the terms stated above.
                </p>
                <div className="border-t border-gray-600 mt-4 pt-2 text-center text-xs text-gray-500">
                  ________________________________________
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
