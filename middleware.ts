import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Se é a página raiz, redireciona para pt-BR
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/pt-BR', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
