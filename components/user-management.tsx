"use client"

import { useState } from "react"
import { Search, Mail, User, Phone, Eye,MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    Phone: "1234567890",
    status: "active",
    address: "123 Main St",
    joinDate: "2024-01-10",
    orders: 5,
    history: [
      { id: "1", date: "2024-01-15", status: "delivered", total: 299.99 },
      { id: "2", date: "2024-01-20", status: "shipped", total: 159.99 },
    ],
    products: [
      { id: "1", name: "Product A", price: 19.99 },
      { id: "2", name: "Product B", price: 29.99 },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    Phone: "1234567890",
    address: "456 Elm St",
    status: "active",
    joinDate: "2024-01-08",
    orders: 3,
    history: [
      { id: "3", date: "2024-01-18", status: "delivered", total: 89.99 },
      { id: "4", date: "2024-01-22", status: "shipped", total: 49.99 },
    ],
    products: [
      { id: "3", name: "Product C", price: 9.99 },
      { id: "4", name: "Product D", price: 14.99 },
    ],
  },
    {
    id: "3",
    name: "Admin User",
    email: "admin@luxe.com",
    Phone: "1234567890",
    address: "789 Oak St",
    status: "active",
    joinDate: "2024-01-01",
    orders: 0,
    history: [],
    products: [],
  },
  {
    id: "4",
    name: "Bob Johnson",
    email: "bob@example.com",
    Phone: "1234567890",
    address: "321 Pine St",
    status: "inactive",
    joinDate: "2024-01-05",
    orders: 1,
    history: [
      { id: "5", date: "2024-01-25", status: "delivered", total: 199.99 },
    ],
    products: [
      { id: "6", name: "Product E", price: 39.99 },
    ],
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const { toast } = useToast()

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
    const handleStatusChange = (userId, historyId, newStatus) => {
    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex !== -1) {
      const historyIndex = mockUsers[userIndex].history.findIndex((h) => h.id === historyId)
      if (historyIndex !== -1) {
        mockUsers[userIndex].history[historyIndex].status = newStatus
        toast({
          title: "Status Updated",
          description: `Order #${historyId} status updated to '${newStatus}'`,
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage customer accounts and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Joined</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{user.Phone}</td>
                    <td className="py-3 px-4">
                      <Badge>{user.status}</Badge>
                    </td>
                    <td className="py-3 px-4">{user.joinDate}</td>
                    <td className="py-3 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(user)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Customer Profile</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h3 className="text-xl font-semibold">{user.name}</h3>
                                <Badge>{user.status}</Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-2">Contact Info</h4>
                                <p className="text-sm flex items-center">
                                  <Mail className="mr-2 h-4 w-4" /> {user.email}
                                </p>
                                <p className="text-sm flex items-center">
                                  <Phone className="mr-2 h-4 w-4" /> {user.Phone}
                                </p>
                                <p className="text-sm flex items-center">
                                  <MapPin className="mr-2 h-4 w-4" /> {user.address}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Purchase Stats</h4>
                                <p className="text-sm">Total Orders: <span className="font-medium">{user.orders}</span></p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3 text-lg">Purchase History</h4>
                                <div className="space-y-3 text-sm">
                                  {user.history.map((item) => (
                                    <div key={item.id} className="p-3 border rounded-md bg-gray-50">
                                      <p><strong>Date:</strong> {item.date}</p>
                                      <p><strong>Status:</strong> 
                                      {item.status}
                                        </p>
                                      <p><strong>Total:</strong> ${item.total}</p>
                                    </div>
                                  ))}
                                  {user.history.length === 0 && <p className="text-gray-500">No history found.</p>}
                                </div>
                              </div>

                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-semibold mb-2">Account Info</h4>
                                  <p className="text-sm">User ID: <span className="font-medium">{user.id}</span></p>
                                  <p className="text-sm">Join Date: <span className="font-medium">{user.joinDate}</span></p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Products</h4>
                                  {user.products.map((product) => (
                                    <div key={product.id} className="p-3 border rounded-md bg-white shadow-sm">
                                      <p><strong>Name:</strong> {product.name}</p>
                                      <p><strong>Price:</strong> ${product.price}</p>
                                    </div>
                                  ))}
                                  {user.products.length === 0 && <p className="text-gray-500">No products found.</p>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
