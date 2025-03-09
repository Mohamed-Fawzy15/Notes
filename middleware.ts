import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Define protected and public routes
const protectedRoutes = ["/"]; // Protect home page
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 2. Check if the route is protected or public
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get token from cookies
  const token = cookies().get("token")?.value;

  // 4. Redirect unauthenticated users to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect authenticated users away from login/signup
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// 6. Apply middleware to all routes except static assets and API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
