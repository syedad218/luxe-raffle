import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === '/account' || path.startsWith('/account/')) {
    const userToken = request.cookies.get('sid');

    if (!userToken)
      return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account', '/account/:path*'],
};
