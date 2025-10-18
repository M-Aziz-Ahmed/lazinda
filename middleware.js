import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie?.value;

  // Public paths that don't require authentication
  const publicPaths = ['/login'];

  // If the path is public, let the request through
  if (publicPaths.includes(pathname)) {
    // If user is logged in and tries to access login page, redirect to home
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/', request.url));
      } catch (error) {
        // If token is invalid, let them go to the login page
      }
    }
    return NextResponse.next();
  }

  // If there's no token and the path is not public, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify the token for protected routes
  try {
    await jwtVerify(token, JWT_SECRET);
    // If token is valid, let the request proceed
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login and clear the cookie
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('token', '', { maxAge: 0 });
    return response;
  }
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
