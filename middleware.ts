import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Paths that must never be reachable via the browser (env files, lockfiles,
 * config, build metadata). These are blocked with 404 to avoid leaking
 * implementation details or secrets.
 */
const SENSITIVE_PATHS = [
  "/.env",
  "/.env.local",
  "/.env.production",
  "/.env.development",
  "/.git/",
  "/package.json",
  "/package-lock.json",
  "/bun.lock",
  "/bun.lockb",
  "/tsconfig.json",
  "/next.config.ts",
  "/middleware.ts",
  "/.next/",
  "/vercel.json",
];

const isSensitivePath = (pathname: string) =>
  SENSITIVE_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Block sensitive files/config from being fetched directly.
  if (isSensitivePath(path)) {
    return new NextResponse(null, { status: 404 });
  }

  // Setup basic route protection logic for when auth is implemented.
  const isProtectedRoute = path.startsWith("/portal") || path.startsWith("/admin");

  if (isProtectedRoute) {
    // TODO: Replace with actual auth check (e.g. Supabase auth or NextAuth session check)
    const isAuthenticated = false; // Placeholder

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
