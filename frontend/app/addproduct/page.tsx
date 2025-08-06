"use client"

import AddProductForm from "@/components/add-product-form"

export default function AddProductPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <AddProductForm />
    </div>
  )
}
