'use client';

import styles from './solucoes-grid.module.css';
import Image from 'next/image';
import Link from 'next/link';

function SolucoesGrid() {
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
                        <Link href="/categorias/telhas-e-paineis">
                            <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/telhas.avif'}
                                    alt="Soluções Construtivas Isotérmicas"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h5>Soluções Construtivas Isotérmicas</h5>
                                <p>Telhas e painéis isotérmicos em PIR e EPS</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href="/categorias/construcao-civil">
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/construcaocivil.avif'}
                                    alt="Construção Civil"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h5>Construção Civil</h5>
                                <p>Lajes unidirecionais, bidirecionais e EPS para lajes pré-fabricadas</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href="/categorias/molduras-decorativas">
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/molduras.avif'}
                                    alt="Decoração"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h5>Molduras Decorativas</h5>
                                <p>Aplicação em diversos acabamentos</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href="/categorias/embalagens-em-eps">
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/embalagens.avif'}
                                    alt="Embalagens"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h5>Embalagens</h5>
                                <p>Proteção ideal para embalar o seu produto</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SolucoesGrid;