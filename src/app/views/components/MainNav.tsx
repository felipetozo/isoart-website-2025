import styles from './MainNav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/views/UI/Button';
import { CgMenuRight } from "react-icons/cg";
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";

function MainNav() {
    return (
        <div className={styles.navContainer}>
            {/* Navegador Institucional */}
            <nav className={styles.institutionalNavSection}>
                <div className={styles.institutionalNavWrapper}>
                    <div className={styles.institutionalNavMessage}>
                        Podemos usar este espaço com uma mensagem, notícia ou saudação
                    </div>
                    <div className={styles.institutionalNavItems}>
                        <ul>
                            <li><Link href="/">Sobre a empresa</Link></li>
                            <li><Link href="/">Sobre o PIR e o EPS</Link></li>
                            <li><Link href="/">Vagas</Link></li>
                            <li><Link href="/">Notícias</Link></li>
                            <li><Link href="/">Contato</Link></li>
                        </ul>
                        <div className={styles.institutionalNavSocial}>
                            <Link href="/"><BsInstagram /></Link>
                            <Link href="/"><BsFacebook /></Link>
                            <Link href="/"><BsYoutube /></Link>
                            <Link href="/"><BsLinkedin /></Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Navegador Principal */}
            <section className={styles.MainNavSection}>
                <div className={styles.MainNavWrapper}>
                    <div className={styles.MainNavLogo}>
                        <Link href="/">
                            <Image
                                src={'/img/isoart-logotipo.svg'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </Link>
                    </div>
                    <div className={styles.MainNavLinks}>
                        <ul>
                            <li><Link href="/">Telhas e revestimentos</Link></li>
                            <li><Link href="/">Construção civil</Link></li>
                            <li><Link href="/">Forros</Link></li>
                            <li><Link href="/">Molduras decorativas</Link></li>
                            <li><Link href="/">Embalagens</Link></li>
                        </ul>
                    </div>
                    <div className={styles.MainNavButton}>
                        <Link href="/cadastro">
                            <Button variant="primary" size="medium">
                                Cadastrar-se
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.MainNavMenuIcon}>
                        <CgMenuRight />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainNav;