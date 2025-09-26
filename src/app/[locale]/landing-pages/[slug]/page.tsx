import styles from './page.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Button from '@/app/[locale]/views/ui/button/button';

export default function LandingPage() {
  
  const t = useTranslations('LandingPages.Molduras');

  return (
    <>
    <section className={styles['LandingNav-Section']}>
      <img src={'/img/isoart-logotipo.svg'} alt={t('logo')} width={120} height={62} />
    </section>
    </>
  )
}