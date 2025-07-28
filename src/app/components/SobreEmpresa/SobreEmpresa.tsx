import styles from './SobreEmpresa.module.css';
import Link from 'next/link';
import Button from '@/app/views/UI/Button';

function SobreEmpresa() {
    return (
        <>
            <section className={styles.SobreEmpresaSection} id="#SobreEmpresa">
                <div className={styles.SobreEmpresaWrapper}>
                    <div className={styles.SobreEmpresaContainer}>
                        <p>Expanda sua criatividade.</p>
                    </div>
                    <div className={styles.SobreEmpresaContainer}>
                        <h3>
                            Soluções inovadoras, sustentáveis e de alta
                            qualidade em Poliestireno Expandido (EPS) e
                            Espuma Rígida de Poliisocianurato (PIR) que
                            atendem às diversas demandas do mercado.
                        </h3>
                        <div className={styles.doubleButton}>
                            <Link href="/sobre">
                                <Button variant="primary" size="medium">
                                    Saiba mais
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