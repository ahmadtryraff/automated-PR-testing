import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Create the middleware with next-intl configuration
const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

// Export a function that combines next-intl middleware with our custom matcher
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore public/static files and API routes
  const isStaticFile =
    pathname.match(/\.[^/]+$/) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/static');

  if (isStaticFile) {
    return NextResponse.next();
  }

  // Redirect /login and /register to /en/login and /en/register
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/en/login', request.url));
  }
  if (pathname === '/register') {
    return NextResponse.redirect(new URL('/en/register', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|api|icons|images|static|.*\\.[^/]+$).*)'
  ]
};
