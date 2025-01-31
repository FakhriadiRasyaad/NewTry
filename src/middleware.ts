// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Mengambil token dari cookies


  const publicPaths = ['/login', '/'];

  if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: [], // Route yang ingin dilindungi
};
