import styles from './sobre-empresa.module.css';
import Link from 'next/link';
import Button from '@/app/[locale]/views/ui/button/button';

function SobreEmpresa() {
    return (
        <>
            <section className={styles['sobre-empresa-section']} id="#sobre-empresa">
                <div className={styles['sobre-empresa-wrapper']}>
                    <div className={styles['sobre-empresa-container']}>
                        <p>Expanda sua criatividade</p>
                    </div>
                    <div className={styles['sobre-empresa-container']}>
                        <h2>
                            Soluções inovadoras, sustentáveis e de alta
                            qualidade em Poliestireno Expandido (EPS) e
                            Espuma Rígida de Poliisocianurato (PIR) que
                            atendem às diversas demandas do mercado.
                        </h2>
                        <div>
                            <Link href="/sobre">
                                <Button variant="white" size="medium">
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