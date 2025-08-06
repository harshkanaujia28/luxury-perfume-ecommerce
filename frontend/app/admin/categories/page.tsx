"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useApi } from "@/contexts/api-context"

export default function CategoriesPage() {
  const { getCategories, addCategory, updateCategory, deleteCategory } = useApi()
  const [categories, setCategories] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", description: "", image: "" })
  const [editingCategory, setEditingCategory] = useState<any>(null)

  // Fetch categories on load
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (err) {
      console.error("Failed to fetch categories", err)
    }
  }

  const handleAddCategory = async () => {
    try {
      await addCategory(newCategory)
      setIsAddDialogOpen(false)
      setNewCategory({ name: "", description: "", image: "" })
      fetchCategories()
    } catch (err) {
      console.error("Failed to add category", err)
    }
  }

  const handleEditClick = (category: any) => {
    setEditingCategory({
      ...category,
      name: category.name || "",
      description: category.description || "",
      image: category.image || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return

    try {
      await updateCategory(editingCategory._id, {
        name: editingCategory.name,
        description: editingCategory.description,
        image: editingCategory.image,
      })
      setIsEditDialogOpen(false)
      setEditingCategory(null)
      fetchCategories()
    } catch (err) {
      console.error("Failed to update category", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id)
      fetchCategories()
    } catch (err) {
      console.error("Failed to delete category", err)
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
            <p className="text-muted-foreground">Manage product categories</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    placeholder="Enter category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-description">Description</Label>
                  <Textarea
                    id="category-description"
                    placeholder="Enter category description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-image">Image URL</Label>
                  <Input
                    id="category-image"
                    placeholder="Enter image URL"
                    value={newCategory.image}
                    onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>Add Category</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            {editingCategory && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category-name">Category Name</Label>
                  <Input
                    id="edit-category-name"
                    placeholder="Enter category name"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category-description">Description</Label>
                  <Textarea
                    id="edit-category-description"
                    placeholder="Enter category description"
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category-image">Image URL</Label>
                  <Input
                    id="edit-category-image"
                    placeholder="Enter image URL"
                    value={editingCategory.image}
                    onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditDialogOpen(false)
                      setEditingCategory(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateCategory}>Update Category</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>Category List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {category._id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.status || "Active"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(category._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredCategories.length === 0 && <div className="text-center py-8">No categories found</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
