import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('🔍 MIDDLEWARE EXECUTADO para:', pathname);
  
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  
  console.log('🔍 HEADER x-pathname SETADO:', pathname);
  
  if (pathname === '/') {
    console.log('🔍 Redirecionando raiz para locale');
    const acceptLanguage = request.headers.get('accept-language') || '';
    const localeCookie = request.cookies.get('locale')?.value;
    
    let preferredLocale = 'pt-BR';
    
    if (localeCookie && ['pt-BR', 'en', 'es'].includes(localeCookie)) {
      preferredLocale = localeCookie;
    }
    else if (acceptLanguage) {
      if (acceptLanguage.includes('en')) {
        preferredLocale = 'en';
      } else if (acceptLanguage.includes('es')) {
        preferredLocale = 'es';
      }
    }
    
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }
  
  if (pathname.startsWith('/categorias/')) {
    console.log('🔍 Redirecionando /categorias/ para /solucoes/');
    const newPath = pathname.replace('/categorias/', '/solucoes/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  if (pathname.startsWith('/solucoes/') || pathname.startsWith('/produtos/') || 
      pathname.startsWith('/sobre') || pathname.startsWith('/contato') || 
      pathname.startsWith('/privacidade')) {
    console.log('🔍 Redirecionando sem locale para pt-BR:', pathname);
    return NextResponse.redirect(new URL(`/pt-BR${pathname}`, request.url));
  }
  
  console.log('🔍 RETORNANDO RESPONSE normal para:', pathname);
  return response;
}

export const config = {
  matcher: [
    '/', 
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};