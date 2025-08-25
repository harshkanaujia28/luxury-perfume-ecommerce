import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-lime-300">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="luxury-gradient py-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">Terms of Service</h1>
            <p className="text-xl text-lime-300">
              Please read these terms carefully before using our website and services.
            </p>
            <p className="text-sm text-lime-500 mt-4">Last updated: January 1, 2024</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            {/* Section Mapping */}
            {[
              {
                title: "1. Acceptance of Terms",
                content: "By accessing and using the Luxe Fragrances website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
              },
              {
                title: "2. Use License",
                content: (
                  <>
                    <p>Permission is granted to temporarily download one copy of the materials on Luxe Fragrances' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>modify or copy the materials</li>
                      <li>use the materials for any commercial purpose or for any public display</li>
                      <li>attempt to reverse engineer any software contained on the website</li>
                      <li>remove any copyright or other proprietary notations from the materials</li>
                    </ul>
                    <p className="mt-2">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Luxe Fragrances at any time.</p>
                  </>
                )
              },
              {
                title: "3. Product Information and Pricing",
                content: (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Product Descriptions</h4>
                      <p>We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Pricing</h4>
                      <p>All prices are subject to change without notice. We reserve the right to modify prices at any time. In case of a pricing error, we reserve the right to cancel orders placed at the incorrect price.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Availability</h4>
                      <p>All products are subject to availability. We reserve the right to discontinue any product at any time.</p>
                    </div>
                  </>
                )
              },
              {
                title: "4. Orders and Payment",
                content: (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Order Acceptance</h4>
                      <p>Your receipt of an order confirmation does not signify our acceptance of your order. We reserve the right to accept or decline your order for any reason.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Payment</h4>
                      <p>Payment must be received by us before we ship your order. We accept major credit cards, PayPal, and other payment methods as displayed during checkout.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Taxes</h4>
                      <p>You are responsible for any applicable taxes, duties, or customs fees associated with your order.</p>
                    </div>
                  </>
                )
              },
              {
                title: "5. Shipping and Delivery",
                content: (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Shipping Times</h4>
                      <p>Shipping times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Risk of Loss</h4>
                      <p>Risk of loss and title for items purchased pass to you upon delivery to the shipping carrier.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">International Shipping</h4>
                      <p>International customers are responsible for any customs duties, taxes, or fees imposed by their country.</p>
                    </div>
                  </>
                )
              },
              {
                title: "6. Returns and Refunds",
                content: (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Returns must be initiated within 30 days of delivery</li>
                    <li>Items must be unopened and in original packaging</li>
                    <li>Refunds will be processed to the original payment method</li>
                    <li>Return shipping costs may apply</li>
                  </ul>
                )
              },
              {
                title: "7. User Accounts",
                content: (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Account Security</h4>
                      <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Accurate Information</h4>
                      <p>You agree to provide accurate, current, and complete information when creating your account and to update such information as necessary.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Account Termination</h4>
                      <p>We reserve the right to terminate or suspend your account at any time for violation of these terms.</p>
                    </div>
                  </>
                )
              },
              {
                title: "8. Prohibited Uses",
                content: (
                  <>
                    <p className="mb-2">You may not use our website for any unlawful purpose or to solicit others to perform unlawful acts. You may not:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Transmit any harmful or malicious code</li>
                      <li>Interfere with or disrupt our services</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Use our website for fraudulent purposes</li>
                      <li>Infringe upon intellectual property rights</li>
                    </ul>
                  </>
                )
              },
              {
                title: "9. Intellectual Property",
                content: <p>All content on this website, including text, graphics, logos, images, and software, is the property of Luxe Fragrances or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
              },
              {
                title: "10. Disclaimers",
                content: (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Website Content</h4>
                      <p>The information on this website is provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lime-400">Product Performance</h4>
                      <p>Fragrance performance may vary based on individual skin chemistry, environmental factors, and personal perception. We cannot guarantee specific performance outcomes.</p>
                    </div>
                  </>
                )
              },
              {
                title: "11. Limitation of Liability",
                content: <p>In no event shall Luxe Fragrances or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage. Our total liability shall not exceed the amount paid by you for the product(s) in question.</p>
              },
              {
                title: "12. Governing Law",
                content: <p>These terms and conditions are governed by and construed in accordance with the laws of the State of New York, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
              },
              {
                title: "13. Changes to Terms",
                content: <p>We reserve the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
              },
              {
                title: "14. Contact Information",
                content: (
                  <div className="space-y-2">
                    <p>If you have any questions about these Terms of Service, please contact us:</p>
                    <p><strong>Email:</strong> legal@luxefragrances.com</p>
                    <p><strong>Phone:</strong> (555) 123-4567</p>
                    <p><strong>Mail:</strong> Luxe Fragrances Legal Department<br />123 Fragrance Avenue<br />New York, NY 10001</p>
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

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
