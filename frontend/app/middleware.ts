import { NextRequest, NextResponse } from "next/server"

// Define protected routes
const protectedRoutes = ["/account", "/checkout", "/orders"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  // Simulated auth check — you can use cookies/session here
  const token = request.cookies.get("token")?.value

  if (isProtected && !token) {
    // Redirect unauthenticated users to /login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Apply middleware only to selected routes
export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/orders/:path*"]
}
