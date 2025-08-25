import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-lime-300">

        <main>
          {/* Hero Section */}
          <section className="luxury-gradient py-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">Privacy Policy</h1>
              <p className="text-xl text-lime-300">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <p className="text-sm text-lime-500 mt-4">Last updated: January 1, 2024</p>
            </div>
          </section>

          {/* Privacy Content */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-8">
                {/* Map all sections into Cards */}
                {[
                  {
                    title: "1. Information We Collect",
                    content: (
                      <>
                        <h4 className="font-semibold mb-2 text-lime-400">Personal Information</h4>
                        <p>
                          We collect information you provide directly to us, such as when you create an account, make a
                          purchase, or contact us. This may include:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Name, email address, and phone number</li>
                          <li>Billing and shipping addresses</li>
                          <li>Payment information (processed securely by our payment providers)</li>
                          <li>Order history and preferences</li>
                          <li>Communications with our customer service team</li>
                        </ul>

                        <h4 className="font-semibold mb-2 mt-4 text-lime-400">Automatically Collected Information</h4>
                        <p>
                          We automatically collect certain information when you visit our website:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>IP address and device information</li>
                          <li>Browser type and version</li>
                          <li>Pages visited and time spent on our site</li>
                          <li>Referring website information</li>
                          <li>Cookies and similar tracking technologies</li>
                        </ul>
                      </>
                    ),
                  },
                  {
                    title: "2. How We Use Your Information",
                    content: (
                      <>
                        <p className="mb-4">We use the information we collect to:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Process and fulfill your orders</li>
                          <li>Communicate with you about your orders and account</li>
                          <li>Provide customer support</li>
                          <li>Send you marketing communications (with your consent)</li>
                          <li>Improve our website and services</li>
                          <li>Prevent fraud and ensure security</li>
                          <li>Comply with legal obligations</li>
                        </ul>
                      </>
                    ),
                  },
                  {
                    title: "3. Information Sharing",
                    content: (
                      <>
                        <p>We do not sell, trade, or rent your personal information to third parties. We may share your
                        information in the following circumstances:</p>
                        <h4 className="font-semibold mb-2 mt-2 text-lime-400">Service Providers</h4>
                        <p>We work with trusted third-party service providers who help us operate our business, such as
                        payment processors, shipping companies, and email service providers.</p>
                        <h4 className="font-semibold mb-2 mt-2 text-lime-400">Legal Requirements</h4>
                        <p>We may disclose your information if required by law or in response to valid legal requests from
                        government authorities.</p>
                        <h4 className="font-semibold mb-2 mt-2 text-lime-400">Business Transfers</h4>
                        <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as
                        part of the transaction.</p>
                      </>
                    ),
                  },
                  // ... Continue adding remaining sections in similar format
                ].map((section, idx) => (
                  <Card key={idx} className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl hover:shadow-lime-500/50 transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lime-400">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-lime-300 space-y-4">{section.content}</CardContent>
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
