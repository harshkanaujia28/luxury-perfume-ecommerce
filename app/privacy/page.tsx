import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="luxury-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-600">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2024</p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Personal Information</h4>
                    <p className="text-gray-600">
                      We collect information you provide directly to us, such as when you create an account, make a
                      purchase, or contact us. This may include:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                      <li>Name, email address, and phone number</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information (processed securely by our payment providers)</li>
                      <li>Order history and preferences</li>
                      <li>Communications with our customer service team</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                    <p className="text-gray-600">
                      We automatically collect certain information when you visit our website:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referring website information</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your orders and account</li>
                    <li>Provide customer support</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Prevent fraud and ensure security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Information Sharing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information in the following circumstances:
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Service Providers</h4>
                    <p className="text-gray-600">
                      We work with trusted third-party service providers who help us operate our business, such as
                      payment processors, shipping companies, and email service providers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Legal Requirements</h4>
                    <p className="text-gray-600">
                      We may disclose your information if required by law or in response to valid legal requests from
                      government authorities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Business Transfers</h4>
                    <p className="text-gray-600">
                      In the event of a merger, acquisition, or sale of assets, your information may be transferred as
                      part of the transaction.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal information on a need-to-know basis</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Cookies and Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    We use cookies and similar technologies to enhance your browsing experience and analyze website
                    traffic. Types of cookies we use include:
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Essential Cookies</h4>
                    <p className="text-gray-600">
                      Required for the website to function properly, such as maintaining your shopping cart and login
                      status.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                    <p className="text-gray-600">
                      Help us understand how visitors use our website so we can improve it.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                    <p className="text-gray-600">
                      Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
                    </p>
                  </div>
                  <p className="text-gray-600">
                    You can control cookies through your browser settings, but disabling certain cookies may affect
                    website functionality.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Your Rights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Access: Request a copy of the personal information we hold about you</li>
                    <li>Correction: Request correction of inaccurate or incomplete information</li>
                    <li>Deletion: Request deletion of your personal information</li>
                    <li>Portability: Request transfer of your data to another service</li>
                    <li>Objection: Object to certain processing of your information</li>
                    <li>Restriction: Request restriction of processing in certain circumstances</li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    To exercise these rights, please contact us at privacy@luxefragrances.com.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Marketing Communications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    We may send you marketing emails about our products, special offers, and company news. You can:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Opt out at any time by clicking the unsubscribe link in our emails</li>
                    <li>Update your communication preferences in your account settings</li>
                    <li>Contact us directly to modify your preferences</li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    Please note that even if you opt out of marketing communications, we may still send you
                    transactional emails related to your orders and account.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our website is not intended for children under 13 years of age. We do not knowingly collect personal
                    information from children under 13. If we become aware that we have collected personal information
                    from a child under 13, we will take steps to delete such information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. International Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your information may be transferred to and processed in countries other than your own. We ensure
                    that such transfers are conducted in accordance with applicable data protection laws and that
                    appropriate safeguards are in place to protect your information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Changes to This Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by
                    posting the new policy on our website and updating the "Last updated" date. We encourage you to
                    review this policy periodically.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <strong>Email:</strong> privacy@luxefragrances.com
                    </p>
                    <p>
                      <strong>Phone:</strong> (555) 123-4567
                    </p>
                    <p>
                      <strong>Mail:</strong> Luxe Fragrances Privacy Team
                      <br />
                      123 Fragrance Avenue
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
