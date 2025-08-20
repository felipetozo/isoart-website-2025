import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Se é a página raiz, redireciona para pt-BR
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pt-BR', request.url));
  }
  
  // Se é uma rota de categorias antiga, redireciona para soluções
  if (pathname.startsWith('/categorias/')) {
    const newPath = pathname.replace('/categorias/', '/solucoes/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  // Se é uma rota de categoria sem locale, redireciona para pt-BR
  if (pathname.startsWith('/solucoes/')) {
    return NextResponse.redirect(new URL(`/pt-BR${pathname}`, request.url));
  }
  
  // Se é uma rota de produto sem locale, redireciona para pt-BR
  if (pathname.startsWith('/produtos/')) {
    return NextResponse.redirect(new URL(`/pt-BR${pathname}`, request.url));
  }
  
  // Se é uma rota de sobre sem locale, redireciona para pt-BR
  if (pathname.startsWith('/sobre')) {
    return NextResponse.redirect(new URL(`/pt-BR${pathname}`, request.url));
  }
  
  // Se é uma rota de soluções sem locale, redireciona para pt-BR
  if (pathname.startsWith('/solucoes')) {
    return NextResponse.redirect(new URL(`/pt-BR${pathname}`, request.url));
  }
  
  // Se é uma rota de contato sem locale, redireciona para pt-BR
  if (pathname.startsWith('/contato')) {
    return NextResponse.redirect(new URL(`/pt-BR${pathname}`, request.url));
  }
  
  // Se é uma rota de privacidade sem locale, redireciona para pt-BR
  if (pathname.startsWith('/privacidade')) {
    return NextResponse.redirect(new URL(`/pt-BR${pathname}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', 
    '/categorias/:path*', 
    '/solucoes/:path*',
    '/produtos/:path*',
    '/sobre/:path*',
    '/contato/:path*',
    '/privacidade/:path*'
  ],
};
