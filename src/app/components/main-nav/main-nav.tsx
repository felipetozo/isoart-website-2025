'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './main-nav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/views/ui/button/button';
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin, BsWhatsapp } from 'react-icons/bs';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread } from 'react-icons/md';

import menuData from '@/app/data/menu-data.json';

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

// Type assertion para o menuData
const typedMenuData = menuData as Category[];

// Componente de imagem personalizado para o submenu
const SubmenuImage = ({ src, alt }: { src: string; alt: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={styles['submenu-image-container']}>
            {(isLoading || hasError) && (
                <div className={styles['submenu-image-placeholder']} />
            )}
            {!hasError && (
                <Image
                    src={src || '/img/placeholder.jpg'}
                    alt={alt}
                    width={120}
                    height={85}
                    className={styles['submenu-image']}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                    style={{ opacity: isLoading ? 0 : 1 }}
                    priority={false}
                    loading="lazy"
                />
            )}
        </div>
    );
};

function MainNav() {
    const submenuRef = useRef<HTMLDivElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const iconRef = useRef<HTMLDivElement | null>(null);
    const [currentLocale, setCurrentLocale] = useState('pt-BR');
    const [mounted, setMounted] = useState(false);

    // Função para obter informações do idioma
    const getLocaleInfo = (locale: string) => {
        const localeInfo = {
            'pt-BR': { flag: '/icons/brazil.svg', name: 'Português' },
            'en': { flag: '/icons/uk.svg', name: 'English' },
            'es': { flag: '/icons/spain.svg', name: 'Español' }
        };
        return localeInfo[locale as keyof typeof localeInfo] || localeInfo['pt-BR'];
    };

    // Função para mudar idioma (apenas visual)
    const handleLocaleChange = (newLocale: string) => {
        setCurrentLocale(newLocale);
        // Salvar no localStorage para manter a seleção
        if (typeof window !== 'undefined') {
            localStorage.setItem('locale', newLocale);
        }
    };

    // Carregar locale salvo no localStorage na inicialização
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLocale = localStorage.getItem('locale');
            if (savedLocale && ['pt-BR', 'en', 'es'].includes(savedLocale)) {
                setCurrentLocale(savedLocale);
            }
        }
        setMounted(true);
    }, []);

    const showSubmenu = (index: number) => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setActiveSubmenu(index);
        const tl = gsap.timeline();
        tl.set(submenuRef.current, { display: 'flex' });
        tl.fromTo(submenuRef.current, { height: 0 }, { height: 'auto', duration: 0.1 });
        tl.fromTo(`.${styles['sub-menu-item']}`, { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.1 });
    };

    const hideSubmenu = () => {
        const tl = gsap.timeline();
        tl.to(`.${styles['sub-menu-item']}`, { opacity: 0, duration: 0.1 });
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
        }, 1000);
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
        const topBar = iconRef.current?.querySelector(`.${styles['menu-bar-top']}`);
        const bottomBar = iconRef.current?.querySelector(`.${styles['menu-bar-bottom']}`);
        const mobileMenuItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-menu']} ul li, .${styles['mobile-contact']} p, .${styles['mobile-social']} a`);

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

    const closeMobileMenu = () => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
            const tl = gsap.timeline();
            const topBar = iconRef.current?.querySelector(`.${styles['menu-bar-top']}`);
            const bottomBar = iconRef.current?.querySelector(`.${styles['menu-bar-bottom']}`);
            const mobileMenuItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-menu']} ul li, .${styles['mobile-contact']} p, .${styles['mobile-social']} a`);

            if (topBar && bottomBar) {
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
        <div className={styles['nav-container']}>
            {/* Navegador Institucional */}
            <nav className={styles['institutional-nav-section']}>
                <div className={styles['institutional-nav-wrapper']}>
                    <div className={styles['institutional-nav-social']}>
                        <Link href="https://www.instagram.com/isoartsolucoestermicas/" target="_blank" aria-label="Siga-nos no Instagram">
                            <BsInstagram />
                            <span className={styles['sr-only']}>Instagram</span>
                        </Link>
                        <Link href="https://www.facebook.com/isoartsolucoestermicas" target="_blank" aria-label="Siga-nos no Facebook">
                            <BsFacebook />
                            <span className={styles['sr-only']}>Facebook</span>
                        </Link>
                        <Link href="https://www.youtube.com/channel/UC2dlCQSV1Rp5WF91P6ZNDvg" target="_blank" aria-label="Visite nosso canal no YouTube">
                            <BsYoutube />
                            <span className={styles['sr-only']}>YouTube</span>
                        </Link>
                        <Link href="https://www.linkedin.com/company/isoart-industria-produtos-termicos-e-construtivos/" target="_blank" aria-label="Conecte-se conosco no LinkedIn">
                            <BsLinkedin />
                            <span className={styles['sr-only']}>LinkedIn</span>
                        </Link>
                    </div>
                    <div className={styles['institucional-nav-right']}>
                        <div className={styles['institutional-nav-items']}>
                            <ul>
                                                        <li><Link href="/sobre">Sobre</Link></li>
                        <li><Link href="/solucoes">Soluções</Link></li>
                        <li><Link href="/sobre-eps-pir">Sobre EPS PIR</Link></li>
                        <li><Link href="/contato">Contato</Link></li>
                            </ul>
                        </div>
                        {mounted && (
                            <div className={`${styles['language-selector-wrapper']} ${styles['expanded']}`}>
                                <div className={styles['language-flag']}>
                                    <img
                                        src={getLocaleInfo(currentLocale).flag}
                                        alt={`Bandeira ${getLocaleInfo(currentLocale).name}`}
                                        className={styles['flag-image']}
                                    />
                                </div>
                                
                                <div className={styles['language-options']}>
                                    {(['pt-BR', 'en', 'es'] as const).map((locale) => {
                                        // Não mostrar o idioma atual
                                        if (locale === currentLocale) return null;
                                        
                                        const localeInfo = getLocaleInfo(locale);
                                        return (
                                            <button
                                                key={locale}
                                                className={styles['language-option']}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleLocaleChange(locale);
                                                }}
                                                title={localeInfo.name}
                                            >
                                                <img
                                                    src={localeInfo.flag}
                                                    alt={`Bandeira ${localeInfo.name}`}
                                                    className={styles['flag-image']}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Navegador Principal */}
            <section className={styles['main-nav-section']}>
                <div className={styles['main-nav-wrapper']}>
                    <div className={styles['main-nav-content']}>
                        <div className={styles['main-nav-logo']}>
                            <Link href="/">
                                <Image
                                    src={'/img/isoart-logotipo.svg'}
                                    alt="Logotipo Isoart"
                                    width={120}
                                    height={62}
                                />
                            </Link>
                        </div>
                        <div className={styles['main-nav-links']}>
                            <ul>
                                {typedMenuData.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        href={`/categorias/${item.slug}`}
                                        onMouseEnter={() => handleMouseEnterLi(index)}
                                        onMouseLeave={handleMouseLeaveLi}
                                    >
                                        <li>
                                            {item.title}
                                            <span className={styles['nav-link-underline']}></span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                        <div className={styles['main-nav-button']}>
                            <Link href="/contato">
                                                            <Button variant="primary" size="medium">
                                Entre em Contato
                            </Button>
                            </Link>
                        </div>
                        <div className={styles['main-nav-menu-icon']} onClick={toggleMobileMenu} ref={iconRef}>
                            <span className={styles['menu-bar-top']}></span>
                            <span className={styles['menu-bar-bottom']}></span>
                        </div>
                    </div>
                    <div
                        className={styles['sub-menu-categorias']}
                        ref={submenuRef}
                        onMouseEnter={handleMouseEnterSubmenu}
                        onMouseLeave={handleMouseLeaveSubmenu}
                        data-category={activeSubmenu !== null ? typedMenuData[activeSubmenu].slug.replace(/-/g, '') : ''}
                    >
                        {activeSubmenu !== null &&
                            typedMenuData[activeSubmenu].products.map((product, index) => (
                                <div key={product.id} className={styles['sub-menu-item']}>
                                    <Link href={`/categorias/${typedMenuData[activeSubmenu].slug}/${product.slug}`}>
                                        <SubmenuImage src={product.image || '/img/placeholder.jpg'} alt={product.name} />
                                        <p>{product.name}</p>
                                    </Link>
                                </div>
                            ))}
                    </div>
                    <div className={styles['mobile-menu']} ref={mobileMenuRef}>
                        <ul>
                                                    <li><Link href="/" onClick={closeMobileMenu}>Início</Link></li>
                        <li><Link href="/solucoes" onClick={closeMobileMenu}>Soluções</Link></li>
                        <li><Link href="/sobre" onClick={closeMobileMenu}>Sobre</Link></li>
                        <li><Link href="/contato" onClick={closeMobileMenu}>Contato</Link></li>
                        </ul>
                        <div className={styles['mobile-contact']}>
                            <p>Rua Dorivaldo Soncela, 1490<br />
                            Santa Tereza do Oeste - Paraná - Brasil</p>
                            <p><a href="tel:+554532311699"><MdOutlinePhoneInTalk /> +55 45 3231 1699</a></p>
                            <p><a href="https://wa.me/5545991339642" target="_blank" rel="noopener noreferrer"><BsWhatsapp /> +55 45 99133 9642</a></p>
                            <p><a href="mailto:contato@isoart.com.br"><MdOutlineMarkEmailUnread /> contato@isoart.com.br</a></p>
                            <div className={styles['mobile-social']}>
                                <Link href="https://www.instagram.com/isoartsolucoestermicas/" target="_blank" aria-label="Siga-nos no Instagram">
                                    <BsInstagram />
                                    <span className={styles['sr-only']}>Instagram</span>
                                </Link>
                                <Link href="https://www.facebook.com/isoartsolucoestermicas" target="_blank" aria-label="Siga-nos no Facebook">
                                    <BsFacebook />
                                    <span className={styles['sr-only']}>Facebook</span>
                                </Link>
                                <Link href="https://www.youtube.com/channel/UC2dlCQSV1Rp5WF91P6ZNDvg" target="_blank" aria-label="Visite nosso canal no YouTube">
                                    <BsYoutube />
                                    <span className={styles['sr-only']}>YouTube</span>
                                </Link>
                                <Link href="https://www.linkedin.com/company/isoart-industria-produtos-termicos-e-construtivos/" target="_blank" aria-label="Conecte-se conosco no LinkedIn">
                                    <BsLinkedin />
                                    <span className={styles['sr-only']}>LinkedIn</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainNav;