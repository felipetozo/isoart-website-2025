'use client';

import styles from './solucoes-grid.module.css';
import Image from 'next/image';
import Link from 'next/link';

function SolucoesGrid() {
    return (
        <section className={styles['solucoes-grid-section']} id="solucoes-grid">
            <div className={styles['solucoes-grid-wrapper']}>
                <div className={styles['solucoes-grid-header']}>
                    <p>Conheça nossas soluções em EPS e PIR</p>
                    <h3>
                        Soluções Térmicas para Construção Civil
                    </h3>
                </div>
                <div className={styles['solucoes-grid-grid']}>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href="/categorias/telhas-e-paineis">
                            <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/telhas.avif'}
                                    alt="Telhas e Painéis Térmicos"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h5>Telhas e Painéis</h5>
                                <p>Soluções térmicas para coberturas e fachadas com isolamento superior.</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href="/categorias/construcao-civil">
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/construcaocivil.avif'}
                                    alt="Construção Civil com EPS"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h5>Construção Civil</h5>
                                <p>Materiais leves e eficientes para construções mais inteligentes.</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href="/categorias/molduras-decorativas">
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/molduras.avif'}
                                    alt="Molduras Decorativas"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h5>Molduras Decorativas</h5>
                                <p>Acabamentos elegantes para portas, janelas e paredes.</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles['solucoes-grid-card']}>
                        <Link href="/categorias/embalagens-em-eps">
                        <div className={styles['solucoes-grid-card-image']}>
                                <Image
                                    src={'/img/SolucoesGrid/embalagens.avif'}
                                    alt="Embalagens em EPS"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles['solucoes-grid-card-container']}>
                                <h5>Embalagens em EPS</h5>
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