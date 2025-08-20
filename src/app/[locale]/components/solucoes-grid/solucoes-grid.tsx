'use client';

import styles from './solucoes-grid.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface SolucoesGridProps {
    locale: string;
}

function SolucoesGrid({ locale }: SolucoesGridProps) {
    const t = useTranslations('home.homeSolutions');
    const tCommon = useTranslations('common.buttons');

    return (
        <section className={styles['solucoes-grid-section']} id="solucoes-grid">
            <div className={styles['solucoes-grid-wrapper']}>
                <div className={styles['solucoes-grid-header']}>
                    <p>{t('title')}</p>
                    <h3>
                        {t('subtitle')}
                    </h3>
                </div>
                <div className={styles['solucoes-grid-grid']}>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href={`/${locale}/solucoes/telhas-e-paineis`}>
                            <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/telhas.avif'}
                                    alt="Telhas e Painéis Térmicos"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h4>{t('telhasPaineis.title')}</h4>
                                <p>{t('telhasPaineis.description')}</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href={`/${locale}/solucoes/construcao-civil`}>
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/construcaocivil.avif'}
                                    alt="Construção Civil com EPS"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h4>{t('construcaoCivil.title')}</h4>
                                <p>{t('construcaoCivil.description')}</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href={`/${locale}/solucoes/molduras-decorativas`}>
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/molduras.avif'}
                                    alt="Molduras Decorativas"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h4>{t('molduras.title')}</h4>
                                <p>{t('molduras.description')}</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href={`/${locale}/solucoes/embalagens-em-eps`}>
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/embalagens.avif'}
                                    alt="Embalagens em EPS"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h4>{t('embalagens.title')}</h4>
                                <p>{t('embalagens.description')}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SolucoesGrid;