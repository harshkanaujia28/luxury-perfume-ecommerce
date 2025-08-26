"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/utils/axios"; // your Axios instance

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (trimmedPassword !== trimmedConfirm) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (trimmedPassword.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(`/auth/reset-password/${token}`, {
        password: trimmedPassword,
      });

      toast({
        title: data.status === "success" ? "Success" : "Error",
        description: data.message,
        variant: data.status === "success" ? "default" : "destructive",
      });

      if (data.status === "success") {
        setIsSuccess(true); // disables form
        setTimeout(() => router.push("/auth/login"), 2000); // redirect after 2s
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description:
          err.response?.data?.message || err.message || "Something went wrong.",
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
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="password" className="text-gray-300">
                  New Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSuccess}
                  className="mt-1 bg-black text-gray-200 border-gray-700 focus:border-lime-400"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isSuccess}
                  className="mt-1 bg-black text-gray-200 border-gray-700 focus:border-lime-400"
                  placeholder="Confirm new password"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-lime-500 text-black hover:bg-lime-400 transition"
                disabled={isLoading || isSuccess}
              >
                {isLoading
                  ? "Resetting..."
                  : isSuccess
                  ? "Password Reset!"
                  : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
