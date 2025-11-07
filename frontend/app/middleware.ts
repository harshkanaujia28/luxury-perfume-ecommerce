import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value || ""; // fallback

  // 🔹 Agar admin hai aur store page open kar raha hai
  const isStorePage =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/static");

  if (token && role === "admin" && isStorePage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin"; // redirect to admin dashboard
    return NextResponse.redirect(url);
  }

  // 🔹 Agar koi protected route (admin panel) access kar raha hai bina token ke
  if (pathname.startsWith("/admin") && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // apply globally
};
