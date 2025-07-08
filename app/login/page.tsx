"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      toast({ title: "Login successful", description: "Welcome back!" })
      router.push("/")
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try admin@luxe.com / admin123 or user@luxe.com / user123",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <main className="w-full max-w-md py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-green-700">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700 transition"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/register" className="text-green-600 font-medium hover:underline">
                Sign up
              </Link>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm text-gray-700 space-y-1">
              <p className="font-medium">Demo Logins:</p>
              <p className="text-xs text-gray-600">Admin → <span className="font-mono">admin@luxe.com / admin123</span></p>
              <p className="text-xs text-gray-600">User → <span className="font-mono">user@luxe.com / user123</span></p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
