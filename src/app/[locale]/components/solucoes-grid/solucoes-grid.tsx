'use client';

import styles from './solucoes-grid.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface SolucoesGridProps {
    locale: string;
}

function SolucoesGrid({ locale }: SolucoesGridProps) {
    return (
        <section className={styles['solucoes-grid-section']} id="solucoes-grid">
            <div className={styles['solucoes-grid-wrapper']}>
                <div className={styles['solucoes-grid-header']}>
                    <p>Nossos produtos</p>
                    <h3>
                        Soluções em Poliestireno Expandido (EPS) e Poliisocianurato Isolante Rígido (PIR)
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
                                <h4>Telhas e Painéis</h4>
                                <p>Soluções térmicas para coberturas e fachadas com isolamento superior.</p>
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
                                <h4>Construção Civil</h4>
                                <p>Materiais leves e eficientes para construções mais inteligentes.</p>
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
                                <h4>Molduras Decorativas</h4>
                                <p>Acabamentos elegantes para portas, janelas e paredes.</p>
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
                                <h4>Embalagens em EPS</h4>
                                <p>Proteção personalizada para produtos durante transporte.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SolucoesGrid;