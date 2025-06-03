import styles from './Hero.module.css';
import Link from 'next/link';
import Button from '@/app/views/UI/Button';

function Hero() {
    return (
        <>
            <section className={styles.HeroSection} id="Hero">
                <div className={styles.HeroWrapper}>
                    <div className={styles.HeroContainer}>
                        <h1>
                            Lorem ipsum dolor
                            sit amet constectur
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet constectur amit lit. Lorem ipsum dolor sit amet constectur
                            amit lib. Lorem ipsum dolor sit amit lorem ipsum constectur amit.
                        </p>
                        <Link href="/cadastro">
                            <Button variant="white" size="medium">
                                Saiba mais
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.HeroContainer}>
                    </div>
                </div>
            </section>

            {/* Espaçador para permitir que o conteúdo seguinte apareça após o Hero */}
            <div className={styles.heroSpacer}></div>
        </>
    );
};

export default Hero;