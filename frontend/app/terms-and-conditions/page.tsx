import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {AlertTriangle} from "lucide-react"
export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black text-lime-300">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 via-black to-gray-900 py-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">Terms & Conditions</h1>
            <p className="text-xl text-white">
              Please read these terms carefully before using our website and services.
            </p>
            <p className="text-sm text-lime-500 mt-4">Last updated: August 31, 2025</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-white">

            {/* Section Mapping */}
            {[
              {
                title: "Intro - Terms & Conditions",
                content: (
                  <>
                    <p className="text-lime-400 mb-2">
                      <strong className="text-white">Brand Name:</strong> ZAFRINE
                    </p>
                    <p className="text-lime-400 mb-2">
                      <strong className="text-white">Legal Entity:</strong> D.M Enterprises
                    </p>
                    <p className="text-white">
                      Welcome to{" "}
                      <a
                        href="https://zafrine.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime-400 underline hover:text-lime-300"
                      >
                        ZAFRINE.IN
                      </a>
                      . By accessing or purchasing from our website, you agree to be bound by
                      the following Terms & Conditions. Please read them carefully before
                      placing an order.
                    </p>
                  </>
                ),
              },

              {
                title: "1. General",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>These Terms & Conditions govern your use of the website and purchases made through ZAFRINE (operated by D.M Enterprises).</li>
                    <li>By placing an order, you accept these Terms & Conditions, along with our Privacy Policy and Cancellation & Refund Policy.</li>
                    <li>ZAFRINE reserves the right to update, modify, or change these terms at any time without prior notice.</li>
                  </ul>
                ),
              },

              {
                title: "2. Products & Pricing",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>All products listed on our website are described and priced as accurately as possible.</li>
                    <li>Prices are subject to change without prior notice.</li>
                    <li>We reserve the right to correct any errors in pricing or product descriptions.</li>
                    <li>All perfumes sold under ZAFRINE are non-refundable and non-returnable, except in cases of damage/defect as per our Refund Policy.</li>
                  </ul>
                ),
              },

              {
                title: "3. Orders & Payments",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>Orders can be placed online through our official website or authorized platforms.</li>
                    <li>Full payment must be made at the time of purchase using approved payment methods.</li>
                    <li>ZAFRINE/D.M Enterprises reserves the right to refuse or cancel any order in case of suspicious activity, incorrect information, or stock unavailability.</li>
                  </ul>
                ),
              },

              {
                title: "4. Shipping & Delivery",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>Orders are processed and shipped within the timelines mentioned on our website.</li>
                    <li>Delivery times may vary based on location and courier partner.</li>
                    <li>ZAFRINE is not responsible for delays caused by third-party courier services, natural events, or unforeseen circumstances.</li>
                    <li>Shipping charges (if any) are non-refundable.</li>
                  </ul>
                ),
              },

              {
                title: "5. Cancellation & Refunds",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>Cancellations are accepted only within 12 hours of placing the order, provided the order has not been dispatched.</li>
                    <li>Refunds are only applicable if the product is damaged, defective, or incorrect, and proof (unboxing video + images) is provided within 48 hours of delivery.</li>
                    <li>No refunds/replacements will be provided for used, opened, or tampered products.</li>
                  </ul>
                ),
              },

              {
                title: "6. Intellectual Property Rights",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>All logos, designs, product images, brand names, and website content are the intellectual property of D.M Enterprises (ZAFRINE).</li>
                    <li>Unauthorized use, reproduction, or distribution of our intellectual property is strictly prohibited.</li>
                  </ul>
                ),
              },

              {
                title: "7. Limitation of Liability",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>ZAFRINE shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</li>
                    <li>Fragrance preference is subjective, and no liability will be accepted for dislike of scent.</li>
                    <li>Customers are advised to read ingredient details to avoid allergic reactions. ZAFRINE is not responsible for such issues.</li>
                  </ul>
                ),
              },

              {
                title: "8. User Responsibilities",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>Customers must provide accurate and complete delivery details. ZAFRINE will not be responsible for undelivered orders due to incorrect information.</li>
                    <li>Misuse of our website, fraudulent activities, or violation of policies will result in legal action.</li>
                  </ul>
                ),
              },

              {
                title: "9. Governing Law",
                content: (
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>These Terms & Conditions shall be governed by and construed in accordance with the laws of India.</li>
                    <li>Any disputes shall be subject to the exclusive jurisdiction of the courts in Kanpur, India.</li>
                  </ul>
                ),
              },
              {
                title: "14. Contact Information",
                content: (
                  <div className="space-y-2 text-white">
                    <p>For any queries regarding these Terms & Conditions, please contact:</p>
                    <p className="text-lime-400"><strong className="text-white">Email:</strong> info@zafrine.in</p>
                    <p className="text-lime-400"><strong className="text-white">Phone:</strong> +91 79051 68856</p>
                    <p className="text-lime-400"><strong className="text-white">Registered Office</strong> D.M Enterprises<br />88/475, Dalelpurva Rajvi Road, Qasim	Ganj Kanpur,208001<br />UttarPradesh, India</p>
                  </div>
                )
              },
             
            ].map((section, idx) => (
              <Card key={idx} className="bg-zinc-900 border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>{section.content}</CardContent>
              </Card>
            ))}
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
