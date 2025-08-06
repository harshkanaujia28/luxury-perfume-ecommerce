"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Edit,
  Save,
  Eye,
  Shield,
  Scale,
  Calendar,
  User,
  AlertCircle,
  PlusCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useApi } from "@/contexts/api-context"

export interface LegalDocument {
  id: string
  title: string
  content: string
  lastModified: string
  modifiedBy: string
  version: string
  isPublished: boolean
  wordCount: number
}

export default function LegalPage() {
  const {
    getLegalDocuments,
    updateLegalDocument,
    publishLegalDocument,
    createLegalDocument,
  } = useApi()

  const { toast } = useToast()

  const [documents, setDocuments] = useState<{
    privacyPolicy?: LegalDocument
    termsConditions?: LegalDocument
  }>({})
  const [isEditing, setIsEditing] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState<string>("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [modifiedBy, setModifiedBy] = useState("Admin") // Change as needed

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const allDocs = await getLegalDocuments()
        const privacy = allDocs.find((d: any) => d.title.toLowerCase().includes("privacy"))
        const terms = allDocs.find((d: any) => d.title.toLowerCase().includes("terms"))
        setDocuments({
          privacyPolicy: privacy,
          termsConditions: terms,
        })
        console.log(allDocs)
      } catch {
        toast({
          title: "Failed to load documents",
          variant: "destructive",
        })
      }
    }
    fetchDocs()
  }, [getLegalDocuments])

  const handleEdit = (key: string) => {
    setEditingKey(key)
    setIsEditing(true)
    setEditingContent(documents[key as keyof typeof documents]?.content || "")
  }

const handleSave = async () => {
  console.log("Saving...")
  if (!editingKey) return

const doc = documents[editingKey as keyof typeof documents]

  if (!doc) return

  try {
    const updated = await updateLegalDocument(doc.id, { content: editingContent });


    // Safely update the specific document in state
    setDocuments((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [editingKey]: {
          ...prev[editingKey as keyof typeof prev],
          ...updated,
        },
      }
    })
    console.log("Updating document ID:", doc.id); // should be a string

    console.log("Saving", doc.id, editingContent)


    toast({ title: "Document updated" })
  } catch (err) {
    console.error("Update failed:", err)
    toast({
      title: "Failed to update",
      description: "Something went wrong while saving the document.",
      variant: "destructive",
    })
  }

  setIsEditing(false)
  setEditingKey(null)
}

  const handlePublish = async (key: string) => {
    const doc = documents[key as keyof typeof documents]
    if (!doc) return
    try {
      const published = await publishLegalDocument(doc.id)
      setDocuments((prev) => ({ ...prev, [key]: published }))
      toast({ title: `${published.title} published` })
    } catch {
      toast({ title: "Publish failed", variant: "destructive" })
    }
  }

  const handleSubmit = async () => {
    if (!title || !content || !modifiedBy) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const doc = await createLegalDocument({ title, content, modifiedBy })
      toast({
        title: "Created!",
        description: `Legal document "${doc.title}" was successfully created.`,
      })

      // Clear fields
      setTitle("")
      setContent("")
    } catch (error) {
      toast({
        title: "Failed to create document",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderTabContent = (key: "privacyPolicy" | "termsConditions") => {
    const doc = documents[key]
    const docId = key === "privacyPolicy" ? "privacy-policy" : "terms-conditions"
    const label = key === "privacyPolicy" ? "Privacy Policy" : "Terms & Conditions"

    if (!doc) {
      return (
        <TabsContent value={docId}>
          <Card>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border p-4 rounded space-y-4 bg-muted/50">
                <h3 className="text-lg font-semibold">Create New Legal Document</h3>

                <Input
                  placeholder="Document Title (e.g., Privacy Policy)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Modified By"
                  value={modifiedBy}
                  onChange={(e) => setModifiedBy(e.target.value)}
                />
                <Textarea
                  placeholder="Document Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Creating..." : "Create Document"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      )
    }

    return (
      <TabsContent value={docId} className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{label}</CardTitle>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {doc.lastModified}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {doc.modifiedBy}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />v{doc.version}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${key}-published`}
                    checked={doc.isPublished}
                    onCheckedChange={() => handlePublish(key)}
                  />
                  <Label htmlFor={`${key}-published`}>Published</Label>
                </div>
                <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                  <Eye className="mr-2 h-4 w-4" />
                  {previewMode ? "Edit" : "Preview"}
                </Button>
                {!isEditing ? (
                  <Button onClick={() => handleEdit(key)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" /> Save
                    </Button>

                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing && editingKey === key ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    You are editing the {label}. Changes will create a new version.
                  </span>
                </div>
                <Textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="min-h-[500px] font-mono text-sm"
                  placeholder={`Enter ${label} content...`}
                />
                <div className="text-sm text-muted-foreground">
                  Word count: {editingContent.split(" ").length}
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{doc.content}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    )
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

        <Tabs defaultValue="privacy-policy" className="space-y-4">
          <TabsList>
            <TabsTrigger value="privacy-policy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms-conditions">Terms & Conditions</TabsTrigger>
          </TabsList>

          {renderTabContent("privacyPolicy")}
          {renderTabContent("termsConditions")}
        </Tabs>
      </div>
    </div>
  )
}
