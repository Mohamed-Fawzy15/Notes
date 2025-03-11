import { NextRequest, NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/","/register"]; // Add more routes as needed, e.g., ["/notes", "/profile"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Check if the requested path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If the route is protected and no token exists, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if authenticated or if it's not a protected route
  return NextResponse.next();
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: ["/((?!login|register|_next|api).*)"], // Apply to all routes except /login, /register, _next, and api
};