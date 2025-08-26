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
    <div className="min-h-screen bg-black text-lime-300">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-40 border-b border-lime-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-lime-300">
              Learn about how we use cookies and manage your preferences.
            </p>
            <p className="text-sm text-lime-500 mt-4">
              Last updated: January 1, 2024
            </p>
          </div>
        </section>

        {/* Cookie Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">
                    Cookies are small text files that are placed on your computer or mobile device
                    when you visit a website. They are widely used to make websites work more
                    efficiently and to provide information to website owners. Cookies allow websites
                    to remember your preferences and improve your browsing experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">How We Use Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-lime-400">We use cookies for several purposes:</p>
                  <ul className="list-disc list-inside space-y-1 text-white">
                    <li>To ensure our website functions properly</li>
                    <li>To remember your preferences and settings</li>
                    <li>To analyze how our website is used</li>
                    <li>To provide personalized content and advertisements</li>
                    <li>To improve our services and user experience</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Cookie Settings */}
              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Manage Your Cookie Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-white">You can control which cookies we use by adjusting the settings below:</p>

                  <div className="space-y-6">
                    {/* Essential */}
                    <div className="flex items-center justify-between p-4 border border-lime-500/30 rounded-lg bg-black">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lime-400">Essential Cookies</h4>
                        <p className="text-sm text-white">
                          Required for the website to function properly. These cannot be disabled.
                        </p>
                      </div>
                      <Switch checked={cookieSettings.essential} disabled={true} id="essential" />
                    </div>

                    {/* Analytics */}
                    <div className="flex items-center justify-between p-4 border border-lime-500/30 rounded-lg bg-black">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lime-400">Analytics Cookies</h4>
                        <p className="text-sm text-white">
                          Help us understand how visitors interact with our website by collecting anonymous information.
                        </p>
                      </div>
                      <Switch
                        checked={cookieSettings.analytics}
                        onCheckedChange={(checked) => handleSettingChange("analytics", checked)}
                        id="analytics"
                      />
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between p-4 border border-lime-500/30 rounded-lg bg-black">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lime-400">Marketing Cookies</h4>
                        <p className="text-sm text-white">
                          Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
                        </p>
                      </div>
                      <Switch
                        checked={cookieSettings.marketing}
                        onCheckedChange={(checked) => handleSettingChange("marketing", checked)}
                        id="marketing"
                      />
                    </div>

                    {/* Preferences */}
                    <div className="flex items-center justify-between p-4 border border-lime-500/30 rounded-lg bg-black">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lime-400">Preference Cookies</h4>
                        <p className="text-sm text-white">
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
                    <Button onClick={saveSettings} className="flex-1 bg-lime-500 text-black hover:bg-lime-400">
                      Save Preferences
                    </Button>
                    <Button
                      onClick={acceptAll}
                      variant="outline"
                      className="flex-1 border-lime-500 text-lime-400 hover:bg-lime-500 hover:text-black"
                    >
                      Accept All
                    </Button>
                    <Button
                      onClick={rejectAll}
                      variant="outline"
                      className="flex-1 border-lime-500 text-lime-400 hover:bg-lime-500 hover:text-black"
                    >
                      Reject Non-Essential
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Types of Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lime-400 mb-2">Session Cookies</h4>
                    <p className="text-white">
                      These are temporary cookies that are deleted when you close your browser.
                      They help us maintain your session while you browse our website.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lime-400 mb-2">Persistent Cookies</h4>
                    <p className="text-white">
                      These cookies remain on your device for a set period or until you delete them.
                      They help us remember your preferences for future visits.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lime-400 mb-2">First-Party Cookies</h4>
                    <p className="text-white">
                      Set directly by our website. We use these to provide core functionality and improve your experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lime-400 mb-2">Third-Party Cookies</h4>
                    <p className="text-white">
                      Set by external services we use, such as analytics providers and advertising networks.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Specific Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-lime-500/30 text-lime-400">
                          <th className="text-left py-2">Cookie Name</th>
                          <th className="text-left py-2">Purpose</th>
                          <th className="text-left py-2">Duration</th>
                          <th className="text-left py-2">Type</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-zinc-800">
                          <td className="py-2">session_id</td>
                          <td className="py-2">Maintains your session</td>
                          <td className="py-2">Session</td>
                          <td className="py-2">Essential</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-2">cart_items</td>
                          <td className="py-2">Remembers items in your cart</td>
                          <td className="py-2">30 days</td>
                          <td className="py-2">Essential</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-2">user_preferences</td>
                          <td className="py-2">Stores your site preferences</td>
                          <td className="py-2">1 year</td>
                          <td className="py-2">Preferences</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-2">_ga</td>
                          <td className="py-2">Google Analytics tracking</td>
                          <td className="py-2">2 years</td>
                          <td className="py-2">Analytics</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
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

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Managing Cookies in Your Browser</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white">
                    You can also control cookies through your browser settings. Here's how to manage cookies in popular browsers:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lime-400">Chrome</h4>
                      <p className="text-sm text-white">Settings → Privacy and security → Cookies and other site data</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lime-400">Firefox</h4>
                      <p className="text-sm text-white">Settings → Privacy & Security → Cookies and Site Data</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lime-400">Safari</h4>
                      <p className="text-sm text-white">Preferences → Privacy → Manage Website Data</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lime-400">Edge</h4>
                      <p className="text-sm text-white">Settings → Cookies and site permissions → Cookies and site data</p>
                    </div>
                  </div>
                  <p className="text-white text-sm">
                    Note: Disabling certain cookies may affect the functionality of our website.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white ">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated
                    policy on our website.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lime-300 mb-4">
                    If you have any questions about our use of cookies, please contact us:
                  </p>
                  <div className="space-y-2 text-white">
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
