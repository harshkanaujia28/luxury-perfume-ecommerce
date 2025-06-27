import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Ear, Hand, Brain, Heart, Phone } from "lucide-react"

export default function AccessibilityPage() {
  const accessibilityFeatures = [
    {
      icon: Eye,
      title: "Visual Accessibility",
      features: [
        "High contrast color schemes",
        "Scalable text and images",
        "Alt text for all images",
        "Screen reader compatibility",
        "Keyboard navigation support",
      ],
    },
    {
      icon: Ear,
      title: "Audio Accessibility",
      features: [
        "Captions for video content",
        "Audio descriptions available",
        "Visual indicators for audio cues",
        "Adjustable audio controls",
      ],
    },
    {
      icon: Hand,
      title: "Motor Accessibility",
      features: [
        "Keyboard-only navigation",
        "Large clickable areas",
        "Adjustable time limits",
        "Voice control compatibility",
        "Switch device support",
      ],
    },
    {
      icon: Brain,
      title: "Cognitive Accessibility",
      features: [
        "Clear and simple language",
        "Consistent navigation",
        "Error prevention and correction",
        "Progress indicators",
        "Distraction-free reading mode",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-18">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="luxury-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Accessibility Statement</h1>
            <p className="text-xl text-gray-600">
              We're committed to making our website accessible to everyone, regardless of ability or technology.
            </p>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-red-500" />
                  Our Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  At Luxe Fragrances, we believe that everyone should have equal access to our products and services. We
                  are committed to providing an inclusive digital experience that enables all users to successfully
                  navigate, understand, and interact with our website.
                </p>
                <p className="text-gray-600">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards and
                  continuously work to improve the accessibility of our website for all users.
                </p>
              </CardContent>
            </Card>

            {/* Accessibility Features */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
                <p className="text-lg text-gray-600">
                  We've implemented various features to ensure our website is accessible to all users
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {accessibilityFeatures.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <Card key={feature.title}>
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Icon className="w-6 h-6 mr-2 text-blue-600" />
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {feature.features.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Standards Compliance */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">Standards and Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">WCAG 2.1 Level AA Compliance</h4>
                  <p className="text-gray-600">
                    Our website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
                    standards, which include:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Perceivable: Information must be presentable in ways users can perceive</li>
                    <li>Operable: Interface components must be operable by all users</li>
                    <li>Understandable: Information and UI operation must be understandable</li>
                    <li>Robust: Content must be robust enough for various assistive technologies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Section 508 Compliance</h4>
                  <p className="text-gray-600">
                    We also strive to meet Section 508 standards, which require federal agencies to make their
                    electronic and information technology accessible to people with disabilities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Assistive Technologies */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">Supported Assistive Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our website is designed to work with the following assistive technologies:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Screen Readers</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• JAWS (Windows)</li>
                      <li>• NVDA (Windows)</li>
                      <li>• VoiceOver (macOS/iOS)</li>
                      <li>• TalkBack (Android)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Other Technologies</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Voice recognition software</li>
                      <li>• Switch navigation devices</li>
                      <li>• Eye-tracking systems</li>
                      <li>• Magnification software</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keyboard Navigation */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">Keyboard Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our website can be fully navigated using only a keyboard. Here are the main keyboard shortcuts:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Navigation</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>
                        • <kbd className="bg-gray-100 px-2 py-1 rounded">Tab</kbd> - Move to next element
                      </li>
                      <li>
                        • <kbd className="bg-gray-100 px-2 py-1 rounded">Shift + Tab</kbd> - Move to previous element
                      </li>
                      <li>
                        • <kbd className="bg-gray-100 px-2 py-1 rounded">Enter</kbd> - Activate links and buttons
                      </li>
                      <li>
                        • <kbd className="bg-gray-100 px-2 py-1 rounded">Space</kbd> - Activate buttons and checkboxes
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Page Navigation</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>
                        • <kbd className="bg-gray-100 px-2 py-1 rounded">Home</kbd> - Go to top of page
                      </li>
                      <li>
                        • <kbd className="bg-gray-100 px-2 py-1 rounded">End</kbd> - Go to bottom of page
                      </li>
                      <li>
                        • <kbd className="bg-gray-100 px-2 py-1 rounded">Page Up</kbd> - Scroll up
                      </li>
                      <li>
                        • <kbd className="bg-gray-100 px-2 py-1 rounded">Page Down</kbd> - Scroll down
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Known Issues */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">Known Issues and Limitations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We are continuously working to improve accessibility. Currently known issues include:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Some third-party embedded content may not be fully accessible</li>
                  <li>Certain complex interactive elements are being enhanced for better screen reader support</li>
                  <li>Some PDF documents may not be fully accessible (we're working on alternatives)</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We are actively working to address these issues and expect to have solutions implemented in upcoming
                  updates.
                </p>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Phone className="w-6 h-6 mr-2" />
                  Accessibility Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  We welcome your feedback on the accessibility of our website. If you encounter any accessibility
                  barriers or have suggestions for improvement, please let us know.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Methods</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <strong>Email:</strong> accessibility@luxefragrances.com
                      </p>
                      <p>
                        <strong>Phone:</strong> (555) 123-4567
                      </p>
                      <p>
                        <strong>Mail:</strong> Accessibility Team
                        <br />
                        Luxe Fragrances
                        <br />
                        123 Fragrance Avenue
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-gray-600">
                      We aim to respond to accessibility feedback within 2 business days and will work to address any
                      issues as quickly as possible.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button asChild>
                    <a href="/contact">Contact Our Accessibility Team</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Formats */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">Alternative Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you need information from our website in an alternative format, we can provide:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Large print versions of product information</li>
                  <li>Audio descriptions of product details</li>
                  <li>Simplified text versions of complex content</li>
                  <li>Braille versions of important documents (upon request)</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Please contact our accessibility team to request alternative formats. We will provide these at no
                  additional cost within a reasonable timeframe.
                </p>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl">Ongoing Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Accessibility is an ongoing effort. We regularly:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Conduct accessibility audits and testing</li>
                  <li>Train our development team on accessibility best practices</li>
                  <li>Update our website based on user feedback and new standards</li>
                  <li>Test with real users who rely on assistive technologies</li>
                  <li>Monitor and implement new accessibility technologies</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  This accessibility statement was last reviewed and updated on January 1, 2024.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
