import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to the dashboard without authentication
  if (path === '/dashboard') {
    return NextResponse.next(); // Allow access to the dashboard
  }

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/register' || path === '/';

  const token = request.cookies.get('authToken')?.value || '';
  console.log('Token:', token); // Debugging line

  // Redirect to login if not authenticated and trying to access a protected route
  if (!token && !isPublicPath) {
    console.log('Redirecting to login...'); // Debugging line
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if authenticated and trying to access public paths
  if (token && isPublicPath) {
    console.log('Redirecting to dashboard...'); // Debugging line
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/dashboard/:path*'
  ]
}; 