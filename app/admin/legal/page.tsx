"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { FileText, Edit, Save, Eye, History, Shield, Scale, Calendar, User, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockLegalDocuments = {
  privacyPolicy: {
    id: "privacy-policy",
    title: "Privacy Policy",
    content: `# Privacy Policy for FragranceStore

**Last Updated:** January 15, 2024

## 1. Information We Collect

### Personal Information
We collect information you provide directly to us, such as when you:
- Create an account or make a purchase
- Subscribe to our newsletter
- Contact our customer service
- Participate in surveys or promotions

This may include:
- Name, email address, phone number
- Billing and shipping addresses
- Payment information (processed securely)
- Fragrance preferences and purchase history

### Fragrance-Specific Data
- Scent preferences and allergies
- Skin type and sensitivity information
- Fragrance reviews and ratings
- Sample requests and discovery set preferences

### Automatically Collected Information
- Device information and IP address
- Browser type and operating system
- Pages visited and time spent on our site
- Search queries and product interactions

## 2. How We Use Your Information

We use your information to:
- Process and fulfill your fragrance orders
- Provide personalized fragrance recommendations
- Send order confirmations and shipping updates
- Respond to customer service inquiries
- Improve our products and services
- Send marketing communications (with your consent)

## 3. Information Sharing

We do not sell your personal information. We may share information with:
- **Vendors and Partners:** To fulfill orders and provide services
- **Payment Processors:** To process transactions securely
- **Shipping Companies:** To deliver your fragrance orders
- **Service Providers:** For analytics, marketing, and customer support

## 4. Data Security

We implement appropriate security measures to protect your information:
- SSL encryption for all data transmission
- Secure payment processing
- Regular security audits and updates
- Limited access to personal information

## 5. Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate information
- Delete your account and data
- Opt-out of marketing communications
- Request data portability

## 6. Cookies and Tracking

We use cookies and similar technologies to:
- Remember your preferences and login status
- Analyze site usage and performance
- Provide personalized content and ads
- Enable social media features

## 7. Third-Party Links

Our website may contain links to third-party sites. We are not responsible for their privacy practices.

## 8. Children's Privacy

Our services are not intended for children under 13. We do not knowingly collect information from children.

## 9. International Transfers

Your information may be transferred to and processed in countries other than your own.

## 10. Changes to This Policy

We may update this policy periodically. We will notify you of significant changes.

## Contact Us

For privacy-related questions, contact us at:
- Email: privacy@fragrancestore.com
- Phone: +91 1800-FRAGRANCE
- Address: 123 Business District, Mumbai, Maharashtra 400001`,
    lastModified: "2024-01-15",
    modifiedBy: "Admin User",
    version: "2.1",
    isPublished: true,
    wordCount: 425,
  },
  termsConditions: {
    id: "terms-conditions",
    title: "Terms and Conditions",
    content: `# Terms and Conditions for FragranceStore

**Last Updated:** January 15, 2024

## 1. Acceptance of Terms

By accessing and using FragranceStore, you accept and agree to be bound by these Terms and Conditions.

## 2. Use of the Website

### Permitted Use
- Browse and purchase authentic fragrances
- Create an account for personalized experience
- Leave reviews and ratings for products
- Subscribe to newsletters and updates

### Prohibited Use
- Violate any applicable laws or regulations
- Infringe on intellectual property rights
- Transmit harmful or malicious content
- Attempt to gain unauthorized access

## 3. Product Information

### Fragrance Authenticity
- All fragrances are 100% authentic
- Products are sourced directly from authorized distributors
- We guarantee the quality and authenticity of all items

### Product Descriptions
- We strive for accurate product descriptions
- Colors and scents may vary slightly from images
- Fragrance longevity may vary based on individual factors

## 4. Orders and Payment

### Order Processing
- Orders are processed within 1-2 business days
- Confirmation emails are sent upon order placement
- We reserve the right to cancel orders for any reason

### Payment Terms
- Payment is required at the time of purchase
- We accept major credit cards and digital payments
- All prices are in Indian Rupees (INR) unless stated otherwise

### Pricing
- Prices are subject to change without notice
- Promotional offers have specific terms and conditions
- Taxes and shipping charges are additional

## 5. Shipping and Delivery

### Delivery Areas
- We deliver to pincodes covered by our delivery zones
- Delivery times vary based on location
- Special handling for fragile fragrance bottles

### Shipping Charges
- Calculated based on delivery zone and order value
- Free shipping available for orders above specified amounts
- Express delivery options available

## 6. Returns and Exchanges

### Return Policy
- Returns accepted within 30 days of delivery
- Products must be unopened and in original condition
- Fragrance samples and personalized items are non-returnable

### Exchange Process
- Contact customer service to initiate returns
- Return shipping labels provided for eligible returns
- Refunds processed within 5-7 business days

## 7. Fragrance-Specific Terms

### Allergies and Sensitivities
- Customers are responsible for checking ingredients
- We provide detailed fragrance notes and allergen information
- Patch testing recommended for sensitive individuals

### Sample Policy
- Sample sizes available for select fragrances
- Samples are for personal use only
- One sample per customer per fragrance

## 8. Intellectual Property

All content on this website is protected by copyright and trademark laws.

## 9. Limitation of Liability

FragranceStore shall not be liable for any indirect, incidental, or consequential damages.

## 10. Governing Law

These terms are governed by the laws of India.

## 11. Contact Information

For questions about these terms:
- Email: legal@fragrancestore.com
- Phone: +91 1800-FRAGRANCE
- Address: 123 Business District, Mumbai, Maharashtra 400001`,
    lastModified: "2024-01-15",
    modifiedBy: "Admin User",
    version: "2.0",
    isPublished: true,
    wordCount: 485,
  },
}

export default function LegalPage() {
  const [documents, setDocuments] = useState(mockLegalDocuments)
  const [editingDocument, setEditingDocument] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const { toast } = useToast()

  const handleEdit = (docType) => {
    setEditingDocument({ ...documents[docType] })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!editingDocument) return

    const updatedDocument = {
      ...editingDocument,
      lastModified: new Date().toISOString().split("T")[0],
      modifiedBy: "Admin User",
      version: (Number.parseFloat(editingDocument.version) + 0.1).toFixed(1),
      wordCount: editingDocument.content.split(" ").length,
    }

    setDocuments((prev) => ({
      ...prev,
      [editingDocument.id.replace("-", "").replace("conditions", "Conditions")]: updatedDocument,
    }))

    setIsEditing(false)
    setEditingDocument(null)

    toast({
      title: "Success",
      description: "Document updated successfully.",
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingDocument(null)
  }

  const handlePublish = (docType) => {
    setDocuments((prev) => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        isPublished: !prev[docType].isPublished,
        lastModified: new Date().toISOString().split("T")[0],
      },
    }))

    toast({
      title: "Success",
      description: `Document ${documents[docType].isPublished ? "unpublished" : "published"} successfully.`,
    })
  }

  return (
    <div className="flex flex-col">
    

      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Legal Document Management</h2>
            <p className="text-muted-foreground">
              Manage privacy policy, terms & conditions, and other legal documents
            </p>
          </div>
        </div>

        {/* Document Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Privacy Policy</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">v{documents.privacyPolicy.version}</div>
                <Badge variant={documents.privacyPolicy.isPublished ? "default" : "secondary"}>
                  {documents.privacyPolicy.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Last updated: {documents.privacyPolicy.lastModified}</p>
              <p className="text-xs text-muted-foreground">{documents.privacyPolicy.wordCount} words</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terms & Conditions</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">v{documents.termsConditions.version}</div>
                <Badge variant={documents.termsConditions.isPublished ? "default" : "secondary"}>
                  {documents.termsConditions.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Last updated: {documents.termsConditions.lastModified}
              </p>
              <p className="text-xs text-muted-foreground">{documents.termsConditions.wordCount} words</p>
            </CardContent>
          </Card>
        </div>

        {/* Document Editor */}
        <Tabs defaultValue="privacy-policy" className="space-y-4">
          <TabsList>
            <TabsTrigger value="privacy-policy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms-conditions">Terms & Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="privacy-policy" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Privacy Policy</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {documents.privacyPolicy.lastModified}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {documents.privacyPolicy.modifiedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />v{documents.privacyPolicy.version}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="privacy-published"
                        checked={documents.privacyPolicy.isPublished}
                        onCheckedChange={() => handlePublish("privacyPolicy")}
                      />
                      <Label htmlFor="privacy-published">Published</Label>
                    </div>
                    <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                      <Eye className="mr-2 h-4 w-4" />
                      {previewMode ? "Edit" : "Preview"}
                    </Button>
                    {!isEditing ? (
                      <Button onClick={() => handleEdit("privacyPolicy")}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing && editingDocument?.id === "privacy-policy" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        You are editing the Privacy Policy. Changes will create a new version.
                      </span>
                    </div>
                    <Textarea
                      value={editingDocument.content}
                      onChange={(e) => setEditingDocument({ ...editingDocument, content: e.target.value })}
                      className="min-h-[500px] font-mono text-sm"
                      placeholder="Enter privacy policy content..."
                    />
                    <div className="text-sm text-muted-foreground">
                      Word count: {editingDocument.content.split(" ").length}
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{documents.privacyPolicy.content}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms-conditions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Terms & Conditions</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {documents.termsConditions.lastModified}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {documents.termsConditions.modifiedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />v{documents.termsConditions.version}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="terms-published"
                        checked={documents.termsConditions.isPublished}
                        onCheckedChange={() => handlePublish("termsConditions")}
                      />
                      <Label htmlFor="terms-published">Published</Label>
                    </div>
                    <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                      <Eye className="mr-2 h-4 w-4" />
                      {previewMode ? "Edit" : "Preview"}
                    </Button>
                    {!isEditing ? (
                      <Button onClick={() => handleEdit("termsConditions")}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing && editingDocument?.id === "terms-conditions" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        You are editing the Terms & Conditions. Changes will create a new version.
                      </span>
                    </div>
                    <Textarea
                      value={editingDocument.content}
                      onChange={(e) => setEditingDocument({ ...editingDocument, content: e.target.value })}
                      className="min-h-[500px] font-mono text-sm"
                      placeholder="Enter terms and conditions content..."
                    />
                    <div className="text-sm text-muted-foreground">
                      Word count: {editingDocument.content.split(" ").length}
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {documents.termsConditions.content}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Document History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Document History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Privacy Policy v2.1</div>
                  <div className="text-sm text-muted-foreground">Updated fragrance-specific privacy terms</div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Jan 15, 2024</div>
                  <div>Admin User</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Terms & Conditions v2.0</div>
                  <div className="text-sm text-muted-foreground">
                    Added fragrance return policy and allergy disclaimers
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Jan 15, 2024</div>
                  <div>Admin User</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Privacy Policy v2.0</div>
                  <div className="text-sm text-muted-foreground">Initial version with GDPR compliance</div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Dec 20, 2023</div>
                  <div>Admin User</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
