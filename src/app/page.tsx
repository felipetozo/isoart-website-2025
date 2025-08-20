'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/pt-BR');
  }, [router]);

  // Retorna null para não renderizar nada visível
  return null;
}