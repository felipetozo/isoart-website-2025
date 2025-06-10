'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './MainNav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/views/UI/Button';
import { CgMenuRight } from 'react-icons/cg';
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from 'react-icons/bs';
import menuData from '@/app/data/menuData.json';

function MainNav() {
    const submenuRef = useRef<HTMLDivElement | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null); // Estado para rastrear o submenu ativo

    const showSubmenu = (index: number) => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setActiveSubmenu(index); // Define o submenu ativo
        const tl = gsap.timeline();
        tl.set(submenuRef.current, { display: 'flex' });
        tl.fromTo(submenuRef.current, { height: 0 }, { height: 'auto', duration: 0.1 });
        tl.fromTo(`.${styles.SubMenuItem}`, { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.1 });
    };

    const hideSubmenu = () => {
        const tl = gsap.timeline();
        tl.to(`.${styles.SubMenuItem}`, { opacity: 0, duration: 0.1 });
        tl.to(submenuRef.current, { height: 0, duration: 0.1 });
        tl.set(submenuRef.current, { display: 'none' });
        tl.eventCallback('onComplete', () => setActiveSubmenu(null)); // Limpa o submenu ativo após a animação
    };

    const handleMouseEnterLi = (index: number) => {
        showSubmenu(index);
    };

    const handleMouseLeaveLi = () => {
        hideTimeoutRef.current = setTimeout(() => {
            hideSubmenu();
        }, 200);
    };

    const handleMouseEnterSubmenu = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    };

    const handleMouseLeaveSubmenu = () => {
        hideSubmenu();
    };

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
                            <li>
                                <Link href="/">SOBRE A EMPRESA</Link>
                                <span className={styles.navLinkUnderlineWhite}></span>
                            </li>
                            <li>
                                <Link href="/">SOBRE O PIR E EPS</Link>
                                <span className={styles.navLinkUnderlineWhite}></span>
                            </li>
                            <li>
                                <Link href="/">VAGAS</Link>
                                <span className={styles.navLinkUnderlineWhite}></span>
                            </li>
                            <li>
                                <Link href="/">NOTÍCIAS</Link>
                                <span className={styles.navLinkUnderlineWhite}></span>
                            </li>
                            <li>
                                <Link href="/">CONTATO</Link>
                                <span className={styles.navLinkUnderlineWhite}></span>
                            </li>
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
                    <div className={styles.MainNavContent}>
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
                                {menuData.map((item, index) => (
                                    <li
                                        key={index}
                                        onMouseEnter={() => handleMouseEnterLi(index)}
                                        onMouseLeave={handleMouseLeaveLi}
                                    >
                                        <Link href={item.link}>{item.title}</Link>
                                        <span className={styles.navLinkUnderline}></span>
                                    </li>
                                ))}
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
                    <div
                        className={styles.SubMenuCategorias}
                        ref={submenuRef}
                        onMouseEnter={handleMouseEnterSubmenu}
                        onMouseLeave={handleMouseLeaveSubmenu}
                    >
                        {activeSubmenu !== null &&
                            menuData[activeSubmenu].subproducts.map((subproduct, index) => (
                                <div key={index} className={styles.SubMenuItem}>
                                    <Link href="/">
                                        <Image
                                            src={subproduct.image}
                                            alt={subproduct.name}
                                            width={120}
                                            height={85}
                                        />
                                        <p>{subproduct.name}</p>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainNav;