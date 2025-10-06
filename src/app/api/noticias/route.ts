import {NextRequest, NextResponse} from 'next/server';
import {locales, defaultLocale} from '@/app/i18n';

type NoticiasResponse = {
  noticias: unknown[];
};

const loaders = {
  'pt-BR': () => import('@/app/[locale]/data/noticias/pt-BR.json'),
  'en': () => import('@/app/[locale]/data/noticias/en.json'),
  'es': () => import('@/app/[locale]/data/noticias/es.json')
} as const;

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const requested = searchParams.get('locale') || defaultLocale;
  const allowed = locales as readonly string[];
  const normalized = (allowed.includes(requested) ? requested : defaultLocale) as keyof typeof loaders;

  try {
    const data = await loaders[normalized]();
    return NextResponse.json<NoticiasResponse>(data.default as NoticiasResponse, {status: 200});
  } catch {
    const fallback = await loaders[defaultLocale]();
    return NextResponse.json<NoticiasResponse>(fallback.default as NoticiasResponse, {status: 200});
  }
}


