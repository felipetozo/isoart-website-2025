'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/[locale]/views/ui/button/button';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function SolucoesPage() {
    const params = useParams();
    const locale = params.locale as string;
    
    const t = useTranslations('solutionsPage');
    const tCommon = useTranslations('common.buttons');

    // Dados das soluções usando traduções
    const solucoes = [
        {
            id: 1,
            title: t('categories.telhasPaineis.title'),
            description: t('categories.telhasPaineis.description'),
            image: '/img/solucoes-page/solucoes-telhas-paineis.avif',
            link: `/${locale}/solucoes/telhas-e-paineis`
        },
        {
            id: 2,
            title: t('categories.construcaoCivil.title'),
            description: t('categories.construcaoCivil.description'),
            image: '/img/solucoes-page/solucoes-construcao-civil.avif',
            link: `/${locale}/solucoes/construcao-civil`
        },
        {
            id: 3,
            title: t('categories.molduras.title'),
            description: t('categories.molduras.description'),
            image: '/img/solucoes-page/solucoes-molduras.avif',
            link: `/${locale}/solucoes/molduras-decorativas`
        },
        {
            id: 4,
            title: t('categories.embalagens.title'),
            description: t('categories.embalagens.description'),
            image: '/img/solucoes-page/solucoes-embalagens.avif',
            link: `/${locale}/solucoes/embalagens-em-eps`
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className={styles['hero-section']}>
                <div className={styles['hero-mask']}>
                    <div className={styles['hero-wrapper']}>
                        <h1 className={styles['hero-title']}>
                            {t('title')}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Soluções Section */}
            <section className={styles['solucoes-section']}>
                <div className={styles['solucoes-wrapper']}>
                    {solucoes.map((solucao) => (
                        <div key={solucao.id} className={styles['solucao-item']}>
                            <Image
                                src={solucao.image}
                                alt={solucao.title}
                                width={600}
                                height={400}
                                className={styles['solucao-image']}
                            />
                            <div className={styles['solucao-content']}>
                                <h2 className={styles['solucao-title']}>
                                    {solucao.title}
                                </h2>
                                <p className={styles['solucao-description']}>
                                    {solucao.description}
                                </p>
                                <div className={styles['solucao-button']}>
                                    <Link href={solucao.link}>
                                        <Button variant="primary" size="medium">
                                            {tCommon('learnMore')}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
} 