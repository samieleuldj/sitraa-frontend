import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const HOOD_PRODUCT_ID = 'hood-insulation-mat';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const productMatch = pathname.match(/^\/product\/([^/]+)\/?$/);
  if (productMatch && productMatch[1] !== HOOD_PRODUCT_ID) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next();
  response.headers.set('Alt-Svc', 'clear');
  return response;
}

export const config = {
  matcher: '/:path*',
};
