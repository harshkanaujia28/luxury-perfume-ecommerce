"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/utils/axios"; // your Axios instance

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post("/auth/forgot-password", { email });

      toast({
        title: data.status === "success" ? "Success" : "Error",
        description: data.message,
        variant: data.status === "success" ? "default" : "destructive",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || err.message || "Network error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <main className="w-full max-w-md py-12">
        <Card className="shadow-lg border border-lime-400/40 bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-lime-400">
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="mt-1 bg-black text-gray-200 border-gray-700 focus:border-lime-400"
                  placeholder="Enter your email"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-lime-500 text-black hover:bg-lime-400 transition"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Remembered your password?{" "}
              <a
                href="/login"
                className="text-lime-400 font-medium hover:underline"
              >
                Sign In
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
