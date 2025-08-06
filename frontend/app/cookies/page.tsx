"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function CookiesPage() {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  })
  const { toast } = useToast()

  const handleSettingChange = (setting: string, value: boolean) => {
    if (setting === "essential") return // Essential cookies cannot be disabled

    setCookieSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const saveSettings = () => {
    // Save cookie preferences to localStorage
    localStorage.setItem("cookiePreferences", JSON.stringify(cookieSettings))

    toast({
      title: "Cookie preferences saved",
      description: "Your cookie preferences have been updated successfully.",
    })
  }

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    setCookieSettings(allAccepted)
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted))

    toast({
      title: "All cookies accepted",
      description: "You have accepted all cookie types.",
    })
  }

  const rejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    setCookieSettings(essentialOnly)
    localStorage.setItem("cookiePreferences", JSON.stringify(essentialOnly))

    toast({
      title: "Non-essential cookies rejected",
      description: "Only essential cookies will be used.",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="luxury-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
            <p className="text-xl text-gray-600">Learn about how we use cookies and manage your preferences.</p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2024</p>
          </div>
        </section>

        {/* Cookie Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Cookies are small text files that are placed on your computer or mobile device when you visit a
                    website. They are widely used to make websites work more efficiently and to provide information to
                    website owners. Cookies allow websites to remember your preferences and improve your browsing
                    experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How We Use Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">We use cookies for several purposes:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>To ensure our website functions properly</li>
                    <li>To remember your preferences and settings</li>
                    <li>To analyze how our website is used</li>
                    <li>To provide personalized content and advertisements</li>
                    <li>To improve our services and user experience</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Cookie Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Manage Your Cookie Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">You can control which cookies we use by adjusting the settings below:</p>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                        <p className="text-sm text-gray-600">
                          Required for the website to function properly. These cannot be disabled.
                        </p>
                      </div>
                      <Switch checked={cookieSettings.essential} disabled={true} id="essential" />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                        <p className="text-sm text-gray-600">
                          Help us understand how visitors interact with our website by collecting anonymous information.
                        </p>
                      </div>
                      <Switch
                        checked={cookieSettings.analytics}
                        onCheckedChange={(checked) => handleSettingChange("analytics", checked)}
                        id="analytics"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
                        <p className="text-sm text-gray-600">
                          Used to deliver relevant advertisements and track the effectiveness of our marketing
                          campaigns.
                        </p>
                      </div>
                      <Switch
                        checked={cookieSettings.marketing}
                        onCheckedChange={(checked) => handleSettingChange("marketing", checked)}
                        id="marketing"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Preference Cookies</h4>
                        <p className="text-sm text-gray-600">
                          Remember your preferences and settings to provide a personalized experience.
                        </p>
                      </div>
                      <Switch
                        checked={cookieSettings.preferences}
                        onCheckedChange={(checked) => handleSettingChange("preferences", checked)}
                        id="preferences"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={saveSettings} className="flex-1">
                      Save Preferences
                    </Button>
                    <Button onClick={acceptAll} variant="outline" className="flex-1">
                      Accept All
                    </Button>
                    <Button onClick={rejectAll} variant="outline" className="flex-1">
                      Reject Non-Essential
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Types of Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Session Cookies</h4>
                    <p className="text-gray-600">
                      These are temporary cookies that are deleted when you close your browser. They help us maintain
                      your session while you browse our website.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Persistent Cookies</h4>
                    <p className="text-gray-600">
                      These cookies remain on your device for a set period or until you delete them. They help us
                      remember your preferences for future visits.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">First-Party Cookies</h4>
                    <p className="text-gray-600">
                      Set directly by our website. We use these to provide core functionality and improve your
                      experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Third-Party Cookies</h4>
                    <p className="text-gray-600">
                      Set by external services we use, such as analytics providers and advertising networks.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Specific Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Cookie Name</th>
                          <th className="text-left py-2">Purpose</th>
                          <th className="text-left py-2">Duration</th>
                          <th className="text-left py-2">Type</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        <tr className="border-b">
                          <td className="py-2">session_id</td>
                          <td className="py-2">Maintains your session</td>
                          <td className="py-2">Session</td>
                          <td className="py-2">Essential</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">cart_items</td>
                          <td className="py-2">Remembers items in your cart</td>
                          <td className="py-2">30 days</td>
                          <td className="py-2">Essential</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">user_preferences</td>
                          <td className="py-2">Stores your site preferences</td>
                          <td className="py-2">1 year</td>
                          <td className="py-2">Preferences</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">_ga</td>
                          <td className="py-2">Google Analytics tracking</td>
                          <td className="py-2">2 years</td>
                          <td className="py-2">Analytics</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">marketing_consent</td>
                          <td className="py-2">Tracks marketing consent</td>
                          <td className="py-2">1 year</td>
                          <td className="py-2">Marketing</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Managing Cookies in Your Browser</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    You can also control cookies through your browser settings. Here's how to manage cookies in popular
                    browsers:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Chrome</h4>
                      <p className="text-sm text-gray-600">
                        Settings → Privacy and security → Cookies and other site data
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Firefox</h4>
                      <p className="text-sm text-gray-600">Settings → Privacy & Security → Cookies and Site Data</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Safari</h4>
                      <p className="text-sm text-gray-600">Preferences → Privacy → Manage Website Data</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Edge</h4>
                      <p className="text-sm text-gray-600">
                        Settings → Cookies and site permissions → Cookies and site data
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Note: Disabling certain cookies may affect the functionality of our website.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                    updated policy on our website.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about our use of cookies, please contact us:
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
