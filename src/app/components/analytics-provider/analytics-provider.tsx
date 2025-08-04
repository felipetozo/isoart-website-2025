import { Analytics } from "@vercel/analytics/next";

export default function AnalyticsProvider() {
  // Só carrega em produção
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Vercel Analytics */}
      <Analytics />
      
      {/* 
      Adicionar futuras integrações:
      - Google Analytics
      - Facebook Pixel
      - Outras ferramentas de tracking
      */}
    </>
  );
}