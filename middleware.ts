import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth/constants";

function withSecurityHeaders(response: NextResponse) {
  if (process.env.APP_ORIGIN?.startsWith("https://")) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdmin =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");

  if (isAdmin && !request.cookies.get(SESSION_COOKIE)) {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login";
    login.searchParams.set("returnTo", pathname);
    return withSecurityHeaders(NextResponse.redirect(login));
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
