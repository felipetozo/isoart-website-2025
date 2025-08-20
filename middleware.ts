import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Se é a página raiz, detectar idioma preferido e redirecionar
  if (pathname === '/') {
    // Verificar se há um cookie de idioma ou header Accept-Language
    const acceptLanguage = request.headers.get('accept-language') || '';
    const localeCookie = request.cookies.get('locale')?.value;
    
    let preferredLocale = 'pt-BR'; // padrão
    
    // Se há cookie de idioma, usar ele
    if (localeCookie && ['pt-BR', 'en', 'es'].includes(localeCookie)) {
      preferredLocale = localeCookie;
    }
    // Senão, tentar detectar pelo Accept-Language
    else if (acceptLanguage) {
      if (acceptLanguage.includes('en')) {
        preferredLocale = 'en';
      } else if (acceptLanguage.includes('es')) {
        preferredLocale = 'es';
      }
      // pt-BR é o padrão, então não precisa verificar
    }
    
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
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
