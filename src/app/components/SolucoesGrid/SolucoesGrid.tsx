'use client';

import styles from './SolucoesGrid.module.css';
import Image from 'next/image';
import Link from 'next/link';

function SolucoesGrid() {
    return (
        <section className={styles.SolucoesGridSection} id="SolucoesGrid">
            <div className={styles.SolucoesGridWrapper}>
                <div className={styles.SolucoesGridHeader}>
                    <p>Nossos produtos</p>
                    <h3>
                        Soluções em Poliestireno Expandido (EPS) e Poliisocianurato Isolante Rígido (PIR)
                    </h3>
                </div>
                <div className={styles.SolucoesGridGrid}>
                    <div className={styles.SolucoesGridCard}>
                        <Link href="/categorias/telhas-e-paineis">
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/telhas.avif'}
                                    alt="Soluções Construtivas Isotérmicas"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Soluções Construtivas Isotérmicas</h5>
                                <p>Telhas e painéis isotérmicos em PIR e EPS</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.SolucoesGridCard}>
                        <Link href="/categorias/construcao-civil">
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/construcaocivil.avif'}
                                    alt="Construção Civil"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Construção Civil</h5>
                                <p>Lajes unidirecionais, bidirecionais e EPS para lajes pré-fabricadas</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.SolucoesGridCard}>
                        <Link href="/categorias/molduras-decorativas">
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/molduras.avif'}
                                    alt="Decoração"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Decoração</h5>
                                <p>Aplicação em diversos acabamentos</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.SolucoesGridCard}>
                        <Link href="/categorias/forros">
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/forros.avif'}
                                    alt="Forros em EPS"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Forros em EPS</h5>
                                <p>Aplicação em diversos forros</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.SolucoesGridCard}>
                        <Link href="/categorias/embalagens-em-eps">
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/embalagens.avif'}
                                    alt="Embalagens"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
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