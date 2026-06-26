/**
 * Next.js middleware — protects (account) and (admin) route groups.
 *
 * Better Auth reads the session cookie via `getSessionCookie()`.
 * We don't validate the session in middleware (that's a DB call, too slow).
 * Route handlers + Server Components do full validation via `requireUser/requireAdmin`.
 *
 * Behavior:
 *   - /admin/*  → must have session cookie (else redirect to /sign-in?redirect=/admin)
 *   - /account/* → must have session cookie (else redirect to /sign-in?redirect=/account)
 *   - everything else → public
 */

import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect (account) and (admin) route groups
  const isProtectedRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/account");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for session cookie (fast — no DB call)
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except static assets and API auth endpoints
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)"],
};
