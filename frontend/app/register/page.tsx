"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import axios from "@/utils/axios"; // your axios instance

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(""); // store backend user id
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  // Step 1: Send OTP via backend
  const sendOtp = async () => {
    if (!email) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      setUserId(res.data.userId);
      toast({
        title: "OTP Sent",
        description: `A 6-digit OTP was sent to ${email}.`,
        variant: "info",
      });
      setStep("otp");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/auth/verify-otp", {
        userId,
        otp,
      });

      toast({
        title: "Registration Successful",
        description: `Welcome, ${name}!`,
        variant:"success"
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "OTP Verification Failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <main className="w-full max-w-md py-12">
        <Card className="shadow-lg bg-zinc-900 border border-lime-400/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-lime-400">
              {step === "form" ? "Create Account" : "Verify OTP"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {step === "form" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendOtp();
                }}
                className="space-y-5"
              >
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-black border-gray-700 text-gray-200 focus:border-lime-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-black border-gray-700 text-gray-200 focus:border-lime-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-lime-500 text-black hover:bg-lime-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={verifyOtp} className="space-y-5">
                <div>
                  <Label htmlFor="otp" className="text-gray-300">
                    Enter OTP
                  </Label>
                  <Input
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-lime-500 text-black hover:bg-lime-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Register"}
                </Button>

                <p className="text-sm text-gray-400 text-center mt-4">
                  Didn’t receive?{" "}
                  <button
                    type="button"
                    className="text-lime-400 underline"
                    onClick={sendOtp}
                  >
                    Resend OTP
                  </button>
                </p>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-lime-400 hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
