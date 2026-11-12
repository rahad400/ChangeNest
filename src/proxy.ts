import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Protected routes requiring authentication
const protectedRoutes = [
  "/dashboard",
  "/my-events",
  "/my-joined-events",
  "/profile",
  "/create-event",
  "/event-edit",
];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Check if current route is in the protected routes list
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtected) {
    // 1. Optimistic pre-filter using Better Auth's official getSessionCookie utility
    const sessionCookie = getSessionCookie(request);

    // If no session cookie exists, redirect to sign-in immediately
    if (!sessionCookie) {
      const destination = `${pathname}${search}`;
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("next", destination);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Pass current pathname to downstream Server Components via request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-search", search);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/my-events/:path*",
    "/my-joined-events/:path*",
    "/profile/:path*",
    "/create-event/:path*",
    "/event-edit/:path*",
  ],
};
