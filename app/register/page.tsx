"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "otp">("form")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [serverOtp, setServerOtp] = useState("") // For demo/mock only
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const sendOtp = async () => {
    if (!mobile.match(/^\d{10}$/)) {
      toast({ title: "Invalid Mobile", description: "Enter a valid 10-digit mobile number", variant: "destructive" })
      return
    }

    setIsLoading(true)

    // ✅ Replace this with actual API call
    const mockOtp = "123456"
    setServerOtp(mockOtp)

    toast({
      title: "OTP Sent",
      description: `A 6-digit OTP was sent to ${mobile}. (For demo: ${mockOtp})`,
    })

    setStep("otp")
    setIsLoading(false)
  }

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otp !== serverOtp) {
      toast({ title: "Invalid OTP", description: "Please enter the correct OTP.", variant: "destructive" })
      return
    }

    if (password !== confirmPassword) {
      toast({ title: "Password Mismatch", description: "Passwords do not match.", variant: "destructive" })
      return
    }

    setIsLoading(true)
    const success = await register(name, email, password)

    if (success) {
      toast({ title: "Registration Successful", description: "Welcome to Luxe Fragrances!" })
      router.push("/")
    } else {
      toast({ title: "Registration Failed", description: "Please try again.", variant: "destructive" })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <main className="w-full max-w-md py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-green-700">
              {step === "form" ? "Create Account" : "Verify OTP"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {step === "form" && (
              <form onSubmit={(e) => { e.preventDefault(); sendOtp() }} className="space-y-5">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={verifyOtp} className="space-y-5">
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>

                <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify & Register"}
                </Button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Didn't receive?{" "}
                  <button type="button" className="text-green-600 underline" onClick={sendOtp}>
                    Resend OTP
                  </button>
                </p>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
