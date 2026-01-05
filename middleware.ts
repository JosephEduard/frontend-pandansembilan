import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { JWTExtended } from "./types/Auth";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/auth/admin/login" || pathname === "/auth/admin/register") {
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/admin/login", request.url);

      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/auth/admin/:path*", "/admin/:path*"],
};
