import styles from './SolucoesGrid.module.css';
import Image from 'next/image';

function SolucoesGrid() {
    return (
        <>
            <section className={styles.SolucoesGridSection} id="#SolucoesGrid">
                <div className={styles.SolucoesGridWrapper}>
                    <div className={styles.SolucoesGridHeader}>
                        <p>Nossos produtos</p>
                        <h3>
                            Soluções em Poliestireno
                            Expandido (EPS) e Poliuretano
                            Isolante Rígido (PIR)
                        </h3>
                    </div>
                    <div className={styles.SolucoesGridGrid}>
                        <div className={styles.SolucoesGridCard}>
                            <div className={styles.SolucoesGridCardImage}>
                                <Image
                                    src={'/img/SolucoesGrid/telhas.jpg'}
                                    alt="Logotipo Isoart"
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
                                    alt="Logotipo Isoart"
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
                                    alt="Logotipo Isoart"
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
                                    alt="Logotipo Isoart"
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
                                    alt="Logotipo Isoart"
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