import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

  // define pathname for /ideas/:id check router
  const { pathname } = request.nextUrl

  // 1. call user session with headers
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // if need to access /ideas and not to be /ideas/:id route
  if (pathname === "/ideas") {
    return NextResponse.next();
  }

  // 2. if session do not exist return to login page
  if (!session) {
    // get the URL who redirect to login page 
    const currentUrl = request.nextUrl.pathname; 

    // send http://localhost:3000/login?callbackUrl=/add-idea to frontend
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', currentUrl);

    return NextResponse.redirect(loginUrl);
  }

  // 3. if exist session return access destrinatoin route
  return NextResponse.next();
}

export const config = {
  // 4. convert array and write route name inside of this array
  matcher: [
    "/add-idea/:path*",
    "/my-ideas/:path*",
    "/my-interactions/:path*",
    "/ideas/:path*",
  ],
};
