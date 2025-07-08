"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Settings,
  Store,
  CreditCard,
  Truck,
  Mail,
  Shield,
  Palette,
  Bell,
  Save,
  Upload,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "TechStore Pro",
    storeDescription: "Your one-stop shop for premium electronics and gadgets",
    storeEmail: "admin@techstore.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Commerce Street, Tech City, TC 12345",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
  })

  // Payment Settings State
  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    stripePublishableKey: "pk_test_...",
    stripeSecretKey: "sk_test_...",
    paypalEnabled: true,
    paypalClientId: "AYz...",
    paypalClientSecret: "EHx...",
    applePay: false,
    googlePay: true,
    testMode: true,
    minimumOrderAmount: 10.0,
    taxRate: 8.5,
    taxIncluded: false,
  })

  // Shipping Settings State
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 50.0,
    standardShippingRate: 5.99,
    expressShippingRate: 12.99,
    internationalShipping: true,
    internationalRate: 19.99,
    processingTime: "1-2",
    standardDelivery: "3-5",
    expressDelivery: "1-2",
    weightBasedShipping: false,
    shippingZones: ["US", "CA", "MX"],
  })

  // Email Settings State
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "noreply@techstore.com",
    smtpPassword: "app_password_here",
    fromName: "TechStore Pro",
    fromEmail: "noreply@techstore.com",
    orderConfirmation: true,
    shippingNotification: true,
    deliveryConfirmation: true,
    newsletterEnabled: true,
    marketingEmails: true,
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    ipWhitelist: "",
    sslForced: true,
    dataRetention: 365,
    gdprCompliance: true,
  })

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    accentColor: "#10b981",
    darkMode: false,
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    customCSS: "",
    headerLayout: "default",
    footerLayout: "default",
    productGridColumns: 4,
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    newOrderAlert: true,
    lowStockAlert: true,
    newUserRegistration: false,
    systemUpdates: true,
    securityAlerts: true,
    backupNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    slackWebhook: "",
  })

  const handleSave = async (section: string) => {
    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would make actual API calls to save settings
      console.log(`Saving ${section} settings...`)

      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const SaveButton = ({ section }: { section: string }) => (
    <Button onClick={() => handleSave(section)} disabled={isSaving} className="w-full sm:w-auto">
      <Save className="h-4 w-4 mr-2" />
      {isSaving ? "Saving..." : "Save Changes"}
    </Button>
  )

  const StatusAlert = () => {
    if (saveStatus === "idle") return null

    return (
      <Alert className={saveStatus === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        {saveStatus === "success" ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-red-600" />
        )}
        <AlertDescription className={saveStatus === "success" ? "text-green-800" : "text-red-800"}>
          {saveStatus === "success" ? "Settings saved successfully!" : "Failed to save settings. Please try again."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Settings</h1>
            <p className="text-muted-foreground">Manage your store configuration and preferences</p>
          </div>
        </div>

        <StatusAlert />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Shipping</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>Basic information about your store</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      value={generalSettings.storeName}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, storeName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      value={generalSettings.storeDescription}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, storeDescription: e.target.value }))}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Store Email</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={generalSettings.storeEmail}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, storeEmail: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Store Phone</Label>
                    <Input
                      id="storePhone"
                      value={generalSettings.storePhone}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, storePhone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Textarea
                      id="storeAddress"
                      value={generalSettings.storeAddress}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, storeAddress: e.target.value }))}
                      className="min-h-[60px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>Configure timezone, currency, and language</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Temporarily disable the store</p>
                      </div>
                      <Switch
                        checked={generalSettings.maintenanceMode}
                        onCheckedChange={(checked) =>
                          setGeneralSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Registration</Label>
                        <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                      </div>
                      <Switch
                        checked={generalSettings.allowRegistration}
                        onCheckedChange={(checked) =>
                          setGeneralSettings((prev) => ({ ...prev, allowRegistration: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Verification</Label>
                        <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                      </div>
                      <Switch
                        checked={generalSettings.requireEmailVerification}
                        onCheckedChange={(checked) =>
                          setGeneralSettings((prev) => ({ ...prev, requireEmailVerification: checked }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end mt-6">
              <SaveButton section="general" />
            </div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Providers</CardTitle>
                  <CardDescription>Configure payment gateways and methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Stripe</Label>
                        <p className="text-sm text-muted-foreground">Accept credit cards via Stripe</p>
                      </div>
                      <Switch
                        checked={paymentSettings.stripeEnabled}
                        onCheckedChange={(checked) =>
                          setPaymentSettings((prev) => ({ ...prev, stripeEnabled: checked }))
                        }
                      />
                    </div>
                    {paymentSettings.stripeEnabled && (
                      <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                        <div className="space-y-2">
                          <Label>Publishable Key</Label>
                          <div className="relative">
                            <Input
                              type={showApiKeys ? "text" : "password"}
                              value={paymentSettings.stripePublishableKey}
                              onChange={(e) =>
                                setPaymentSettings((prev) => ({ ...prev, stripePublishableKey: e.target.value }))
                              }
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowApiKeys(!showApiKeys)}
                            >
                              {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Secret Key</Label>
                          <Input
                            type={showApiKeys ? "text" : "password"}
                            value={paymentSettings.stripeSecretKey}
                            onChange={(e) =>
                              setPaymentSettings((prev) => ({ ...prev, stripeSecretKey: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>PayPal</Label>
                        <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                      </div>
                      <Switch
                        checked={paymentSettings.paypalEnabled}
                        onCheckedChange={(checked) =>
                          setPaymentSettings((prev) => ({ ...prev, paypalEnabled: checked }))
                        }
                      />
                    </div>
                    {paymentSettings.paypalEnabled && (
                      <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                        <div className="space-y-2">
                          <Label>Client ID</Label>
                          <Input
                            type={showApiKeys ? "text" : "password"}
                            value={paymentSettings.paypalClientId}
                            onChange={(e) =>
                              setPaymentSettings((prev) => ({ ...prev, paypalClientId: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Client Secret</Label>
                          <Input
                            type={showApiKeys ? "text" : "password"}
                            value={paymentSettings.paypalClientSecret}
                            onChange={(e) =>
                              setPaymentSettings((prev) => ({ ...prev, paypalClientSecret: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Digital Wallets</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Apple Pay</Label>
                        <Switch
                          checked={paymentSettings.applePay}
                          onCheckedChange={(checked) => setPaymentSettings((prev) => ({ ...prev, applePay: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Google Pay</Label>
                        <Switch
                          checked={paymentSettings.googlePay}
                          onCheckedChange={(checked) => setPaymentSettings((prev) => ({ ...prev, googlePay: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Configuration</CardTitle>
                  <CardDescription>Set payment rules and tax settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Test Mode</Label>
                      <p className="text-sm text-muted-foreground">Use sandbox/test environment</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={paymentSettings.testMode}
                        onCheckedChange={(checked) => setPaymentSettings((prev) => ({ ...prev, testMode: checked }))}
                      />
                      {paymentSettings.testMode && <Badge variant="outline">Test</Badge>}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="minimumOrder">Minimum Order Amount ($)</Label>
                    <Input
                      id="minimumOrder"
                      type="number"
                      step="0.01"
                      value={paymentSettings.minimumOrderAmount}
                      onChange={(e) =>
                        setPaymentSettings((prev) => ({
                          ...prev,
                          minimumOrderAmount: Number.parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.01"
                      value={paymentSettings.taxRate}
                      onChange={(e) =>
                        setPaymentSettings((prev) => ({ ...prev, taxRate: Number.parseFloat(e.target.value) }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tax Included in Prices</Label>
                      <p className="text-sm text-muted-foreground">Display prices with tax included</p>
                    </div>
                    <Switch
                      checked={paymentSettings.taxIncluded}
                      onCheckedChange={(checked) => setPaymentSettings((prev) => ({ ...prev, taxIncluded: checked }))}
                    />
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Changes to payment settings may take a few minutes to take effect. Test thoroughly before going
                      live.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end mt-6">
              <SaveButton section="payment" />
            </div>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Rates</CardTitle>
                  <CardDescription>Configure shipping costs and thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="freeShipping">Free Shipping Threshold ($)</Label>
                    <Input
                      id="freeShipping"
                      type="number"
                      step="0.01"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) =>
                        setShippingSettings((prev) => ({
                          ...prev,
                          freeShippingThreshold: Number.parseFloat(e.target.value),
                        }))
                      }
                    />
                    <p className="text-sm text-muted-foreground">Orders above this amount get free shipping</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="standardRate">Standard Shipping Rate ($)</Label>
                    <Input
                      id="standardRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.standardShippingRate}
                      onChange={(e) =>
                        setShippingSettings((prev) => ({
                          ...prev,
                          standardShippingRate: Number.parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expressRate">Express Shipping Rate ($)</Label>
                    <Input
                      id="expressRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.expressShippingRate}
                      onChange={(e) =>
                        setShippingSettings((prev) => ({
                          ...prev,
                          expressShippingRate: Number.parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>International Shipping</Label>
                      <p className="text-sm text-muted-foreground">Allow shipping to international addresses</p>
                    </div>
                    <Switch
                      checked={shippingSettings.internationalShipping}
                      onCheckedChange={(checked) =>
                        setShippingSettings((prev) => ({ ...prev, internationalShipping: checked }))
                      }
                    />
                  </div>

                  {shippingSettings.internationalShipping && (
                    <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                      <Label htmlFor="internationalRate">International Rate ($)</Label>
                      <Input
                        id="internationalRate"
                        type="number"
                        step="0.01"
                        value={shippingSettings.internationalRate}
                        onChange={(e) =>
                          setShippingSettings((prev) => ({
                            ...prev,
                            internationalRate: Number.parseFloat(e.target.value),
                          }))
                        }
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Times</CardTitle>
                  <CardDescription>Set processing and delivery timeframes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="processingTime">Processing Time (business days)</Label>
                    <Input
                      id="processingTime"
                      value={shippingSettings.processingTime}
                      onChange={(e) => setShippingSettings((prev) => ({ ...prev, processingTime: e.target.value }))}
                      placeholder="e.g., 1-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="standardDelivery">Standard Delivery (business days)</Label>
                    <Input
                      id="standardDelivery"
                      value={shippingSettings.standardDelivery}
                      onChange={(e) => setShippingSettings((prev) => ({ ...prev, standardDelivery: e.target.value }))}
                      placeholder="e.g., 3-5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expressDelivery">Express Delivery (business days)</Label>
                    <Input
                      id="expressDelivery"
                      value={shippingSettings.expressDelivery}
                      onChange={(e) => setShippingSettings((prev) => ({ ...prev, expressDelivery: e.target.value }))}
                      placeholder="e.g., 1-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weight-Based Shipping</Label>
                      <p className="text-sm text-muted-foreground">Calculate shipping based on package weight</p>
                    </div>
                    <Switch
                      checked={shippingSettings.weightBasedShipping}
                      onCheckedChange={(checked) =>
                        setShippingSettings((prev) => ({ ...prev, weightBasedShipping: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Shipping Zones</Label>
                    <div className="flex flex-wrap gap-2">
                      {shippingSettings.shippingZones.map((zone, index) => (
                        <Badge key={index} variant="secondary">
                          {zone}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Countries/regions where you ship</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end mt-6">
              <SaveButton section="shipping" />
            </div>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>SMTP Configuration</CardTitle>
                  <CardDescription>Configure email server settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpHost: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={emailSettings.smtpPort}
                      onChange={(e) =>
                        setEmailSettings((prev) => ({ ...prev, smtpPort: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpUsername: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpPassword: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, fromName: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, fromEmail: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Configure automated email notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Order Confirmation</Label>
                      <p className="text-sm text-muted-foreground">Send confirmation when order is placed</p>
                    </div>
                    <Switch
                      checked={emailSettings.orderConfirmation}
                      onCheckedChange={(checked) =>
                        setEmailSettings((prev) => ({ ...prev, orderConfirmation: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Shipping Notification</Label>
                      <p className="text-sm text-muted-foreground">Send notification when order ships</p>
                    </div>
                    <Switch
                      checked={emailSettings.shippingNotification}
                      onCheckedChange={(checked) =>
                        setEmailSettings((prev) => ({ ...prev, shippingNotification: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Delivery Confirmation</Label>
                      <p className="text-sm text-muted-foreground">Send notification when order is delivered</p>
                    </div>
                    <Switch
                      checked={emailSettings.deliveryConfirmation}
                      onCheckedChange={(checked) =>
                        setEmailSettings((prev) => ({ ...prev, deliveryConfirmation: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Newsletter</Label>
                      <p className="text-sm text-muted-foreground">Enable newsletter functionality</p>
                    </div>
                    <Switch
                      checked={emailSettings.newsletterEnabled}
                      onCheckedChange={(checked) =>
                        setEmailSettings((prev) => ({ ...prev, newsletterEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Send promotional and marketing emails</p>
                    </div>
                    <Switch
                      checked={emailSettings.marketingEmails}
                      onCheckedChange={(checked) => setEmailSettings((prev) => ({ ...prev, marketingEmails: checked }))}
                    />
                  </div>

                  <Alert>
                    <Mail className="h-4 w-4" />
                    <AlertDescription>
                      Test your email configuration by sending a test email to verify settings are correct.
                    </AlertDescription>
                  </Alert>

                  <Button variant="outline" className="w-full bg-transparent">
                    Send Test Email
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end mt-6">
              <SaveButton section="email" />
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication & Access</CardTitle>
                  <CardDescription>Configure security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings((prev) => ({ ...prev, twoFactorAuth: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings((prev) => ({ ...prev, sessionTimeout: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordLength">Minimum Password Length</Label>
                    <Input
                      id="passwordLength"
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) =>
                        setSecuritySettings((prev) => ({ ...prev, passwordMinLength: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Special Characters</Label>
                      <p className="text-sm text-muted-foreground">Passwords must contain special characters</p>
                    </div>
                    <Switch
                      checked={securitySettings.requireSpecialChars}
                      onCheckedChange={(checked) =>
                        setSecuritySettings((prev) => ({ ...prev, requireSpecialChars: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxAttempts"
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) =>
                        setSecuritySettings((prev) => ({ ...prev, maxLoginAttempts: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      value={securitySettings.lockoutDuration}
                      onChange={(e) =>
                        setSecuritySettings((prev) => ({ ...prev, lockoutDuration: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                  <CardDescription>Configure data protection and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                    <Textarea
                      id="ipWhitelist"
                      value={securitySettings.ipWhitelist}
                      onChange={(e) => setSecuritySettings((prev) => ({ ...prev, ipWhitelist: e.target.value }))}
                      placeholder="Enter IP addresses, one per line"
                      className="min-h-[80px]"
                    />
                    <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Force SSL</Label>
                      <p className="text-sm text-muted-foreground">Redirect all traffic to HTTPS</p>
                    </div>
                    <Switch
                      checked={securitySettings.sslForced}
                      onCheckedChange={(checked) => setSecuritySettings((prev) => ({ ...prev, sslForced: checked }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention (days)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={securitySettings.dataRetention}
                      onChange={(e) =>
                        setSecuritySettings((prev) => ({ ...prev, dataRetention: Number.parseInt(e.target.value) }))
                      }
                    />
                    <p className="text-sm text-muted-foreground">How long to keep user data</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>GDPR Compliance</Label>
                      <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                    </div>
                    <Switch
                      checked={securitySettings.gdprCompliance}
                      onCheckedChange={(checked) =>
                        setSecuritySettings((prev) => ({ ...prev, gdprCompliance: checked }))
                      }
                    />
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Security settings changes take effect immediately. Ensure you have backup access before making
                      changes.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end mt-6">
              <SaveButton section="security" />
            </div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme & Colors</CardTitle>
                  <CardDescription>Customize your store's appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-16 h-10"
                      />
                      <Input
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                        className="w-16 h-10"
                      />
                      <Input
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={appearanceSettings.accentColor}
                        onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, accentColor: e.target.value }))}
                        className="w-16 h-10"
                      />
                      <Input
                        value={appearanceSettings.accentColor}
                        onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, accentColor: e.target.value }))}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable dark theme by default</p>
                    </div>
                    <Switch
                      checked={appearanceSettings.darkMode}
                      onCheckedChange={(checked) => setAppearanceSettings((prev) => ({ ...prev, darkMode: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Branding & Layout</CardTitle>
                  <CardDescription>Configure logos and layout options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="logoUrl"
                        value={appearanceSettings.logoUrl}
                        onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, logoUrl: e.target.value }))}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faviconUrl">Favicon URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="faviconUrl"
                        value={appearanceSettings.faviconUrl}
                        onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, faviconUrl: e.target.value }))}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headerLayout">Header Layout</Label>
                    <Select
                      value={appearanceSettings.headerLayout}
                      onValueChange={(value) => setAppearanceSettings((prev) => ({ ...prev, headerLayout: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="centered">Centered</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="footerLayout">Footer Layout</Label>
                    <Select
                      value={appearanceSettings.footerLayout}
                      onValueChange={(value) => setAppearanceSettings((prev) => ({ ...prev, footerLayout: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="extended">Extended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gridColumns">Product Grid Columns</Label>
                    <Select
                      value={appearanceSettings.productGridColumns.toString()}
                      onValueChange={(value) =>
                        setAppearanceSettings((prev) => ({ ...prev, productGridColumns: Number.parseInt(value) }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Columns</SelectItem>
                        <SelectItem value="3">3 Columns</SelectItem>
                        <SelectItem value="4">4 Columns</SelectItem>
                        <SelectItem value="5">5 Columns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customCSS">Custom CSS</Label>
                    <Textarea
                      id="customCSS"
                      value={appearanceSettings.customCSS}
                      onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, customCSS: e.target.value }))}
                      placeholder="/* Add your custom CSS here */"
                      className="min-h-[100px] font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end mt-6">
              <SaveButton section="appearance" />
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Notifications</CardTitle>
                  <CardDescription>Configure alerts and notifications for administrators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Order Alert</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newOrderAlert}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, newOrderAlert: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Low Stock Alert</Label>
                      <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
                    </div>
                    <Switch
                      checked={notificationSettings.lowStockAlert}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, lowStockAlert: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New User Registration</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newUserRegistration}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, newUserRegistration: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about system updates</p>
                    </div>
                    <Switch
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, systemUpdates: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about security events</p>
                    </div>
                    <Switch
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, securityAlerts: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Backup Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified about backup status</p>
                    </div>
                    <Switch
                      checked={notificationSettings.backupNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, backupNotifications: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, smsNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                    <Input
                      id="slackWebhook"
                      value={notificationSettings.slackWebhook}
                      onChange={(e) => setNotificationSettings((prev) => ({ ...prev, slackWebhook: e.target.value }))}
                      placeholder="https://hooks.slack.com/services/..."
                    />
                    <p className="text-sm text-muted-foreground">Send notifications to Slack channel</p>
                  </div>

                  <Alert>
                    <Bell className="h-4 w-4" />
                    <AlertDescription>
                      Test your notification settings to ensure they're working correctly before relying on them.
                    </AlertDescription>
                  </Alert>

                  <Button variant="outline" className="w-full bg-transparent">
                    Send Test Notification
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end mt-6">
              <SaveButton section="notifications" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
