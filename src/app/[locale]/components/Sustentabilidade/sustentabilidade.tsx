'use client';

import styles from './sustentabilidade.module.css';
import { Recycle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SustentabilidadeProps {
  locale: string;
}

function Sustentabilidade({ locale }: SustentabilidadeProps) {
  const t = useTranslations('sustentabilidade');
  
  return (
    <section className={styles['sustentabilidade-section']}>
      <div className={styles['sustentabilidade-wrapper']}>
        <h2 className={styles['sustentabilidade-title']}>
          {t('title')}
        </h2>
        
        <img 
          src="/img/geral/reciclagem-eps.avif" 
          alt="Reciclagem de EPS" 
          className={styles['sustentabilidade-image']} 
        />
        
        <p className={styles['sustentabilidade-description']}>
          {t('description')}
        </p>
        
        <div className={styles['sustentabilidade-aviso']}>
          <Recycle className={styles['sustentabilidade-aviso-icon']} />
          <p className={styles['sustentabilidade-aviso-text']}>
            {t('aviso')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sustentabilidade; 