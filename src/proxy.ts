import { NextRequest, NextResponse } from "next/server";

export async function proxy(request:any) {
  const { pathname } = request.nextUrl;

  // allow public route
  if (pathname === "/ideas") {
    return NextResponse.next();
  }

  // check cookie/session existence only (safe in Edge)
  const sessionToken =
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  // if no session → redirect login
  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-idea/:path*",
    "/my-ideas/:path*",
    "/my-interactions/:path*",
    "/ideas/:path*",
  ],
};
