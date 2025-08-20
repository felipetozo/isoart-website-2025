import styles from './sobre-empresa.module.css';
import Link from 'next/link';
import Button from '@/app/[locale]/views/ui/button/button';
import { useTranslations } from 'next-intl';

interface SobreEmpresaProps {
    locale: string;
}

function SobreEmpresa({ locale }: SobreEmpresaProps) {
    const t = useTranslations('aboutPage');
    const tCommon = useTranslations('common.buttons');

    return (
        <>
            <section className={styles['sobre-empresa-section']} id="#sobre-empresa">
                <div className={styles['sobre-empresa-wrapper']}>
                    <div className={styles['sobre-empresa-container']}>
                        <p>Expanda sua criatividade</p>
                    </div>
                    <div className={styles['sobre-empresa-container']}>
                        <h2>
                            {t('description')}
                        </h2>
                        <div>
                            <Link href={`/${locale}/sobre`}>
                                <Button variant="white" size="medium">
                                    {tCommon('learnMore')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SobreEmpresa;