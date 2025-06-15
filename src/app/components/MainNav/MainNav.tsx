'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './MainNav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/views/UI/Button';
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from 'react-icons/bs';
import menuData from '@/app/data/menuData.json';

// Define the types for your menu data for better type safety
interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    specifications?: { [key: string]: string; };
}

interface Category {
    id: number;
    title: string;
    slug: string;
    description: string;
    image?: string;
    products: Product[];
}

function MainNav() {
    const submenuRef = useRef<HTMLDivElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const showSubmenu = (index: number) => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setActiveSubmenu(index);
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
        tl.eventCallback('onComplete', () => setActiveSubmenu(null));
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

    const toggleMobileMenu = () => {
        const willOpen = !isMobileMenuOpen;
        setIsMobileMenuOpen(willOpen);
        const tl = gsap.timeline();
        const topBar = iconRef.current?.querySelector(`.${styles.menuBarTop}`);
        const bottomBar = iconRef.current?.querySelector(`.${styles.menuBarBottom}`);
        const mobileMenuItems = mobileMenuRef.current?.querySelectorAll(`.${styles.mobileMenu} ul li, .${styles.mobileContact} p, .${styles.mobileSocial} a`);

        if (topBar && bottomBar) {
            if (willOpen) {
                tl.to(topBar, {
                    rotate: 45,
                    translateY: '0.35rem',
                    duration: 0.2,
                    ease: "power2.out",
                    transformOrigin: "center",
                }, 0);
                tl.to(bottomBar, {
                    rotate: -45,
                    translateY: '-0.35rem',
                    duration: 0.2,
                    ease: "power2.out",
                    transformOrigin: "center",
                }, 0);
                tl.set(mobileMenuRef.current, { display: 'flex' });
                tl.fromTo(mobileMenuRef.current, { height: 0 }, { height: 'auto', duration: 0.1 });
                if (mobileMenuItems) {
                    tl.fromTo(mobileMenuItems, { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.1 });
                }
            } else {
                tl.to([topBar, bottomBar], {
                    rotate: 0,
                    translateY: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    transformOrigin: "center",
                });
                if (mobileMenuItems) {
                    tl.to(mobileMenuItems, { opacity: 0, duration: 0.1 });
                }
                tl.to(mobileMenuRef.current, { height: 0, duration: 0.1 });
                tl.set(mobileMenuRef.current, { display: 'none' });
            }
        }
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
                            <li><Link href="/sobre-a-empresa">SOBRE A EMPRESA</Link></li>
                            <li><Link href="/sobre-eps-pir">SOBRE O PIR E EPS</Link></li>
                            <li><Link href="/vagas">VAGAS</Link></li>
                            <li><Link href="/noticias">NOTÍCIAS</Link></li>
                            <li><Link href="/contato">CONTATO</Link></li>
                        </ul>
                        <div className={styles.institutionalNavSocial}>
                            <Link href="https://www.instagram.com/isoartsolucoestermicas/" target="_blank"><BsInstagram /></Link>
                            <Link href="https://www.facebook.com/isoartsolucoestermicas" target="_blank"><BsFacebook /></Link>
                            <Link href="https://www.youtube.com/channel/UC2dlCQSV1Rp5WF91P6ZNDvg" target="_blank"><BsYoutube /></Link>
                            <Link href="https://www.linkedin.com/company/isoart-industria-produtos-termicos-e-construtivos/" target="_blank"><BsLinkedin /></Link>
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
                                {(menuData as Category[]).map((item, index) => (
                                    <li
                                        key={item.id}
                                        onMouseEnter={() => handleMouseEnterLi(index)}
                                        onMouseLeave={handleMouseLeaveLi}
                                    >
                                        <Link href={`/categorias/${item.slug}`}>{item.title}</Link>
                                        <span className={styles.navLinkUnderline}></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.MainNavButton}>
                            <Link href="/cadastro">
                                <Button variant="primary" size="medium">
                                    Entrar em contato
                                </Button>
                            </Link>
                        </div>
                        <div className={styles.MainNavMenuIcon} onClick={toggleMobileMenu} ref={iconRef}>
                            <span className={styles.menuBarTop}></span>
                            <span className={styles.menuBarBottom}></span>
                        </div>
                    </div>
                    <div
                        className={styles.SubMenuCategorias}
                        ref={submenuRef}
                        onMouseEnter={handleMouseEnterSubmenu}
                        onMouseLeave={handleMouseLeaveSubmenu}
                        data-category={activeSubmenu !== null ? (menuData[activeSubmenu] as Category).slug.replace(/-/g, '') : ''}
                    >
                        {activeSubmenu !== null &&
                            (menuData[activeSubmenu] as Category).products.map((product, index) => (
                                <div key={product.id} className={styles.SubMenuItem}>
                                    <Link href={`/categorias/${(menuData[activeSubmenu] as Category).slug}/${product.slug}`}>
                                        <Image
                                            src={product.image || '/img/placeholder.jpg'}
                                            alt={product.name}
                                            width={120}
                                            height={85}
                                        />
                                        <p>{product.name}</p>
                                    </Link>
                                </div>
                            ))}
                    </div>
                    <div className={styles.mobileMenu} ref={mobileMenuRef}>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/solucoes">Soluções</Link></li>
                            <li><Link href="/sobre">Sobre</Link></li>
                            <li><Link href="/contato">Contato</Link></li>
                        </ul>
                        <div className={styles.mobileContact}>
                            <p>Rua Dorivaldo Soncela, 1490</p>
                            <p>Santa Tereza do Oeste - Paraná - Brasil</p>
                            <p>☎ +55 45 3231 1699</p>
                            <p>📱 +55 45 99133 9642</p>
                            <p>📧 contato@isoart.com.br</p>
                            <div className={styles.mobileSocial}>
                                <Link href="https://www.instagram.com/isoartsolucoestermicas/" target="_blank"><BsInstagram /></Link>
                                <Link href="https://www.facebook.com/isoartsolucoestermicas" target="_blank"><BsFacebook /></Link>
                                <Link href="https://www.youtube.com/channel/UC2dlCQSV1Rp5WF91P6ZNDvg" target="_blank"><BsYoutube /></Link>
                                <Link href="https://www.linkedin.com/company/isoart-industria-produtos-termicos-e-construtivos/" target="_blank"><BsLinkedin /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainNav;