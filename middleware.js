import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request, secret });

  const publicPaths = ['/login'];
  const adminPaths = ['/update-user']; // Routes that require admin role

  const isPublicPath = publicPaths.includes(pathname);
  // Check if the current path starts with any of the admin paths
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path));

  if (token) {
    // If user is logged in and tries to access a public path, redirect to home
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If the path requires admin access, check the user's role
    if (isAdminPath) {
      if (token.role !== 'admin') {
        // Redirect non-admins away from admin pages
        return NextResponse.redirect(new URL('/', request.url)); // Or to a "not authorized" page
      }
    }
  } else {
    // If user is not logged in and tries to access a protected path (non-public)
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
