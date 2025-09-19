import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('🔥 Middleware executando para:', pathname);

  // Clona os headers da request e injeta x-pathname
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // --- Regras de redirecionamento ---
  // Página raiz: detecta idioma e redireciona
  if (pathname === '/') {
    console.log('📍 Redirecionando página raiz...');
    const acceptLanguage = request.headers.get('accept-language') || '';
    const localeCookie = request.cookies.get('locale')?.value;
    let preferredLocale = 'pt-BR';

    if (localeCookie && ['pt-BR', 'en', 'es'].includes(localeCookie)) {
      preferredLocale = localeCookie;
    } else if (acceptLanguage) {
      if (acceptLanguage.includes('en')) preferredLocale = 'en';
      else if (acceptLanguage.includes('es')) preferredLocale = 'es';
    }

    const response = NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
    response.headers.set('x-pathname', pathname); // Mantém o header mesmo no redirect
    return response;
  }

  // Redirecionamento de categoria específica
  if (pathname.startsWith('/categorias/')) {
    const newPath = pathname.replace('/categorias/', '/solucoes/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Rotas que precisam de locale prefix
  const localePaths = ['/solucoes', '/produtos', '/sobre', '/contato', '/privacidade'];
  const hasNoLocale = localePaths.some(path => pathname.startsWith(path));

  if (hasNoLocale) {
    console.log('🌍 Adicionando locale para:', pathname);
    return NextResponse.redirect(new URL(`/pt-BR${pathname}`, request.url));
  }

  // --- Retorna NextResponse.next com HEADERS da REQUEST modificados ---
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Opcional: também adiciona no response para debug
  response.headers.set('x-pathname', pathname);

  console.log('✅ Header x-pathname injetado na REQUEST:', pathname);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|_next/static|_next/image|favicon.ico|api).*)',
  ],
};