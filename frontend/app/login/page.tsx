"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/contexts/api-context";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/contexts/api-context";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApi();
  const { toast } = useToast();
  const router = useRouter();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const user: User = await login(email, password); // ← Backend se user object aata hai

    toast({
      title: "Login successful",
      description: `Welcome back, ${user.name || user.role}!`,
      variant: "success",
    });

    await refreshCart();
    await refreshWishlist();

    // ✅ Role-based redirect yahin dale
    if (user.role === "admin") {
      router.push("/admin"); // Admin dashboard
    } else if (user.role === "vendor") {
      router.push("/vendor"); // Vendor dashboard
    } else {
      router.push("/"); // Normal store
    }

  } catch (err: any) {
    toast({
      title: "Login failed",
      description: err.response?.data?.message || "Invalid email or password.",
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
              Sign In
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
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 bg-black text-gray-200 border-gray-700 focus:border-lime-400"
                />
                <div className="mt-2 text-right text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-lime-400 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-lime-500 text-black hover:bg-lime-400 transition"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-lime-400 font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>

            {/* <div className="mt-6 bg-black/50 border border-lime-400/30 p-4 rounded-lg text-sm text-gray-300 space-y-1">
              <p className="font-medium text-lime-400">Demo Logins:</p>
              <p className="text-xs">
                Admin → <span className="font-mono">admin@luxe.com / admin123</span>
              </p>
              <p className="text-xs">
                Vendor → <span className="font-mono">vendor@luxe.com / vendor123</span>
              </p>
              <p className="text-xs">
                User → <span className="font-mono">user@luxe.com / user123</span>
              </p>
            </div> */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
