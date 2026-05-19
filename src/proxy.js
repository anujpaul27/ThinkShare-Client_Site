import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

 
// This function can be marked `async` if using `await` inside
export  async function proxy(request) {

    // 1. call user session with headers 
    const session = await auth.api.getSession({
      headers: request.headers
    })

    // 2. if session do not exist return to login page
    if (!session)
    {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 3. if exist session return access destrinatoin route
    return NextResponse.next()
}
 
 
export const config = {
    // 4. convert array and write route name inside of this array 
  matcher:['/add-idea/:path*', '/my-ideas/:path*', '/my-interactions/:path*']
}