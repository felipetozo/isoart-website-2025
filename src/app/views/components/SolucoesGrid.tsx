'use client';

import styles from './SolucoesGrid.module.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SolucoesGrid() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const grid = gridRef.current;

        if (!section || !grid) return;

        const animation = gsap.to(grid, {
            x: () => -(grid.scrollWidth - window.innerWidth),
            ease: 'none',
            force3D: true,
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${grid.scrollWidth - window.innerWidth}`,
                scrub: 1,
                pin: true,
                pinSpacing: 'margin',
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Forçar atualização inicial
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);



    return (
        <>

            <section className={styles.SolucoesGridSection} ref={sectionRef} id="SolucoesGrid">
                <div className={styles.SolucoesGridWrapper}>
                    <div className={styles.SolucoesGridHeader}>
                        <p>Nossos produtos</p>
                        <h3>
                            Soluções em Poliestireno
                            Expandido (EPS) e Poliuretano
                            Isolante Rígido (PIR)
                        </h3>
                    </div>
                    <div className={styles.SolucoesGridGrid} ref={gridRef}>
                        <div className={styles.SolucoesGridCard}>
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/telhas.jpg'}
                                    alt="Soluções Construtivas Isotérmicas"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Soluções Construtivas Isotérmicas</h5>
                                <p>Telhas e painéis isotérmicos em PIR e EPS</p>
                            </div>
                        </div>
                        <div className={styles.SolucoesGridCard}>
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/construcaocivil.jpg'}
                                    alt="Construção Civil"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Construção Civil</h5>
                                <p>Lajes unidirecionais, bidirecionais e EPS para lajes pré-fabricadas</p>
                            </div>
                        </div>
                        <div className={styles.SolucoesGridCard}>
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/molduras.jpg'}
                                    alt="Decoração"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Decoração</h5>
                                <p>Aplicação em diversos acabamentos</p>
                            </div>
                        </div>
                        <div className={styles.SolucoesGridCard}>
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/molduras.jpg'}
                                    alt="Forros em EPS"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Forros em EPS</h5>
                                <p>Aplicação em diversos forros</p>
                            </div>
                        </div>
                        <div className={styles.SolucoesGridCard}>
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/embalagens.jpg'}
                                    alt="Embalagens"
                                    width={1000}
                                    height={700}
                                />
                            </div>
                            <div className={styles.SolucoesGridCardContainer}>
                                <h5>Embalagens</h5>
                                <p>Proteção ideal para embalar o seu produto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SolucoesGrid;