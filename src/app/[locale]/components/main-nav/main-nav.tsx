// src/app/[locale]/views/layout/main-nav.tsx - Navegação principal com menus, submenu e versão mobile

'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './main-nav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/[locale]/views/ui/button/button';
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin, BsWhatsapp } from 'react-icons/bs';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { useLanguage } from '@/app/[locale]/hooks/use-language';
import { useTranslations } from 'next-intl';

// Fallback para Android antigo que não suporta importação estática de JSON
let menuData: any[] = [];

// Tentar importar JSON de forma dinâmica
try {
    if (typeof require !== 'undefined') {
        menuData = require('../../data/menu-data.json');
    }
} catch (error) {
    console.warn('Erro ao importar menu-data.json, usando dados hardcoded');
    menuData = [
        {
            id: 1,
            title: "Telhas e Painéis",
            slug: "telhas-e-paineis",
            description: "Telhas e painéis da Isoart para coberturas e fachadas.",
            image: "/img/geral/endereco-03-01.avif",
            products: [
                { id: 1, name: "Telhas Térmicas", slug: "telhas-termicas", description: "Telhas com núcleo em PIR ou EPS" },
                { id: 2, name: "Fachada e Fechamento Lateral", slug: "fachada-fechamento-lateral", description: "Painéis versáteis para fachadas" }
            ]
        },
        {
            id: 2,
            title: "Construção Civil",
            slug: "construcao-civil",
            description: "Soluções em EPS para construção civil",
            image: "/img/produtos/construcao-civil/lajes/lajes-01.avif",
            products: [
                { id: 6, name: "Lajes em EPS", slug: "lajes-em-eps", description: "Lajes com preenchimento em EPS" },
                { id: 7, name: "Isolamento para Telhas", slug: "isolamento-telhas", description: "Sistema de isolamento térmico" }
            ]
        }
    ];
}

// Tipagem
interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    specifications?: { [key: string]: string };
}

interface Category {
    id: number;
    title: string;
    slug: string;
    description: string;
    image?: string;
    products: Product[];
}

const typedMenuData = menuData as Category[];

const SubmenuImage = ({ src, alt }: { src: string; alt: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={styles['submenu-image-container']}>
            {(isLoading || hasError) && <div className={styles['submenu-image-placeholder']} />}
            {!hasError && (
                <Image
                    src={src || '/img/placeholder.jpg'}
                    alt={alt}
                    width={120}
                    height={85}
                    className={styles['submenu-image']}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        console.error('Erro ao carregar imagem:', src);
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

interface MainNavProps {
    locale: string;
}

function MainNav({ locale }: MainNavProps) {
    const submenuRef = useRef<HTMLDivElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    // ✅ Correção de tipo do timeout
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const iconRef = useRef<HTMLDivElement | null>(null);
    const { currentLocale, changeLanguage, getLocaleInfo, supportedLocales } = useLanguage();
    const t = useTranslations('nav');
    const tMenu = useTranslations('menu');
    const tContact = useTranslations('contact');
    const tSocial = useTranslations('social');

    const getCategoryTranslation = (slug: string) => {
        const translations: { [key: string]: string } = {
            'telhas-e-paineis': tMenu('categories.telhasPaineis'),
            'construcao-civil': tMenu('categories.construcaoCivil'),
            'embalagens-em-eps': tMenu('categories.embalagens'),
            'moldes-em-eps': tMenu('categories.moldes'),
            'molduras-decorativas': tMenu('categories.molduras'),
            'acessorios': tMenu('categories.acessorios')
        };
        return translations[slug] || slug;
    };

    const getProductTranslation = (name: string) => {
        const translations: { [key: string]: string } = {
            'Telhas Térmicas': tMenu('products.telhasTermicas'),
            'Fachada e Fechamento Lateral': tMenu('products.fachadaFechamento'),
            'Divisória e Forro': tMenu('products.divisoriaForro'),
            'Sala Limpa': tMenu('products.salaLimpa'),
            'Câmara Frigorífica': tMenu('products.camaraFrigorifica'),
            'Lajes em EPS': tMenu('products.lajesEps'),
            'Isolamento para Telhas': tMenu('products.isolamentoTelhas'),
            'Forros': tMenu('products.forros'),
            'Blocos em EPS': tMenu('products.blocosEps'),
            'Chapa e Painéis em EPS': tMenu('products.chapasPaineisEps'),
            'Molduras para Portas e Janelas': tMenu('products.moldurasPortasJanelas'),
            'Molduras para Beiral': tMenu('products.moldurasBeiral'),
            'Molduras para Colunas e Capitéis': tMenu('products.moldurasColunasCapiteis'),
            'Molduras para Muros': tMenu('products.moldurasMuros'),
            'Molduras para Paredes': tMenu('products.moldurasParedes'),
            'Embalagens em EPS': tMenu('products.embalagensEps'),
            'Pérolas em EPS': tMenu('products.perolasEps'),
            'Isolamento para Paredes': tMenu('products.isolamentoParedes'),
            'Isolamento para Pisos': tMenu('products.isolamentoPisos'),
            'Embalagens para Eletrônicos': tMenu('products.embalagensEletronicos'),
            'Embalagens para Alimentos': tMenu('products.embalagensAlimentos'),
            'Embalagens para Farmacêuticos': tMenu('products.embalagensFarmaceuticos'),
            'Moldes para Injeção': tMenu('products.moldesInjecao'),
            'Moldes para Soprado': tMenu('products.moldesSoprado'),
            'Moldes para Termoformagem': tMenu('products.moldesTermoformagem'),
            'Acessórios para Telhas': tMenu('products.acessoriosTelhas'),
            'Acessórios para Painéis': tMenu('products.acessoriosPaineis'),
            'Acessórios para Construção': tMenu('products.acessoriosConstrucao')
        };
        return translations[name] || name;
    };

    useEffect(() => {
    }, [currentLocale]);

    const handleLocaleChange = (newLocale: string) => {
        changeLanguage(newLocale);
    };

    const showSubmenu = (index: number) => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setActiveSubmenu(index);

        if (submenuRef.current) {
            const tl = gsap.timeline();
            tl.set(submenuRef.current, { display: 'flex' });
            tl.fromTo(submenuRef.current, { height: 0 }, { height: 'auto', duration: 0.1 });

            const submenuItems = submenuRef.current.querySelectorAll(`.${styles['sub-menu-item']}`);
            if (submenuItems.length > 0) {
                tl.fromTo(submenuItems, { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.1 });
            }
        }
    };

    const hideSubmenu = () => {
        if (submenuRef.current) {
            const tl = gsap.timeline();
            const submenuItems = submenuRef.current.querySelectorAll(`.${styles['sub-menu-item']}`);
            if (submenuItems.length > 0) {
                tl.to(submenuItems, { opacity: 0, duration: 0.1 });
            }
            tl.to(submenuRef.current, { height: 0, duration: 0.1 });
            tl.set(submenuRef.current, { display: 'none' });
            tl.eventCallback('onComplete', () => setActiveSubmenu(null));
        }
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
        const mobileMenuItems = mobileMenuRef.current?.querySelectorAll(
            `.${styles['mobile-menu']} ul li, .${styles['mobile-contact']} p, .${styles['mobile-social']} a, .${styles['mobile-language-option']}`
        );

        if (topBar && bottomBar) {
            if (willOpen) {
                tl.to(topBar, { rotate: 45, translateY: '0.35rem', duration: 0.2, ease: 'power2.out', transformOrigin: 'center' }, 0);
                tl.to(bottomBar, { rotate: -45, translateY: '-0.35rem', duration: 0.2, ease: 'power2.out', transformOrigin: 'center' }, 0);
                tl.set(mobileMenuRef.current, { display: 'flex' });
                tl.fromTo(mobileMenuRef.current, { height: 0 }, { height: 'auto', duration: 0.1 });
                if (mobileMenuItems) {
                    tl.fromTo(mobileMenuItems, { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.1 });
                }
            } else {
                tl.to([topBar, bottomBar], { rotate: 0, translateY: 0, duration: 0.3, ease: 'power2.in', transformOrigin: 'center' });
                if (mobileMenuItems) {
                    const menuItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-menu']} ul li`);
                    if (menuItems) {
                        tl.fromTo(menuItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 });
                    }
                    const contactItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-contact']} p`);
                    if (contactItems) {
                        tl.fromTo(contactItems, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, '-=0.2');
                    }
                    const socialItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-social']} a, .${styles['mobile-language-option']}`);
                    if (socialItems) {
                        tl.fromTo(socialItems, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }, '-=0.1');
                    }
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
            const mobileMenuItems = mobileMenuRef.current?.querySelectorAll(
                `.${styles['mobile-menu']} ul li, .${styles['mobile-contact']} p, .${styles['mobile-social']} a, .${styles['mobile-language-option']}`
            );

            if (topBar && bottomBar) {
                tl.to([topBar, bottomBar], { rotate: 0, translateY: 0, duration: 0.3, ease: 'power2.in', transformOrigin: 'center' });
                if (mobileMenuItems) {
                    const socialItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-social']} a, .${styles['mobile-language-option']}`);
                    if (socialItems) {
                        tl.to(socialItems, { opacity: 0, y: -10, duration: 0.2, stagger: 0.03 });
                    }
                    const contactItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-contact']} p`);
                    if (contactItems) {
                        tl.to(contactItems, { opacity: 0, y: -15, duration: 0.2, stagger: 0.05 }, '-=0.1');
                    }
                    const menuItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-menu']} ul li`);
                    if (menuItems) {
                        tl.to(menuItems, { opacity: 0, y: -20, duration: 0.2, stagger: 0.08 }, '-=0.1');
                    }
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
                        <Link href="https://www.instagram.com/isoartsolucoestermicas/" target="_blank" aria-label={tSocial('instagram')}>
                            <BsInstagram />
                            <span className={styles['sr-only']}>Instagram</span>
                        </Link>
                        <Link href="https://www.facebook.com/profile.php?id=61551356827381" target="_blank" aria-label={tSocial('facebook')}>
                            <BsFacebook />
                            <span className={styles['sr-only']}>Facebook</span>
                        </Link>
                        <Link href="https://www.youtube.com/channel/UC2dlCQSV1Rp5WF91P6ZNDvg" target="_blank" aria-label={tSocial('youtube')}>
                            <BsYoutube />
                            <span className={styles['sr-only']}>YouTube</span>
                        </Link>
                        <Link href="https://www.linkedin.com/company/isoart-industria-produtos-termicos-e-construtivos/" target="_blank" aria-label={tSocial('linkedin')}>
                            <BsLinkedin />
                            <span className={styles['sr-only']}>LinkedIn</span>
                        </Link>
                    </div>
                    <div className={styles['institucional-nav-right']}>
                        <div className={styles['institutional-nav-items']}>
                            <ul>
                                <li><Link href={`/${locale}/sobre`}>{t('about')}</Link></li>
                                <li><Link href={`/${locale}/solucoes`}>{t('solutions')}</Link></li>
                                <li><Link href={`/${locale}/sobre-eps-pir`}>{t('aboutEpsPir')}</Link></li>
                                <li><Link href={`/${locale}/contato`}>{t('contact')}</Link></li>
                            </ul>
                        </div>
                        <div className={styles['language-selector-wrapper']}>
                            <div className={styles['language-options']}>
                                {supportedLocales.map((locale) => {
                                    const localeInfo = getLocaleInfo(locale);
                                    const isActive = locale === currentLocale;
                                    return (
                                        <button
                                            key={locale}
                                            className={`${styles['language-option']} ${isActive ? styles['language-option-active'] : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleLocaleChange(locale);
                                            }}
                                            title={localeInfo.name}
                                        >
                                            <img src={localeInfo.flag} alt={`${t('flag')} ${localeInfo.name}`} className={styles['flag-image']} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Navegador Principal */}
            <section className={styles['main-nav-section']}>
                <div className={styles['main-nav-wrapper']}>
                    <div className={styles['main-nav-content']}>
                        <div className={styles['main-nav-logo']}>
                            <Link href={`/${locale}`}>
                                <img src={'/img/isoart-logotipo.svg'} alt={t('logo')} width={120} height={62} />
                            </Link>
                        </div>
                        <div className={styles['main-nav-links']}>
                            <ul>
                                {typedMenuData.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        href={`/${locale}/solucoes/${item.slug}`}
                                        onMouseEnter={() => handleMouseEnterLi(index)}
                                        onMouseLeave={handleMouseLeaveLi}
                                    >
                                        <li>
                                            {getCategoryTranslation(item.slug)}
                                            <span className={styles['nav-link-underline']}></span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                        <div className={styles['main-nav-button']}>
                            <Link href={`/${locale}/contato`}>
                                <Button variant="primary" size="medium">
                                    {t('main.contactButton')}
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
                            typedMenuData[activeSubmenu].products.map((product) => (
                                <div key={`${typedMenuData[activeSubmenu].slug}-${product.slug}`} className={styles['sub-menu-item']}>
                                    <Link href={`/${locale}/solucoes/${typedMenuData[activeSubmenu].slug}/${product.slug}`}>
                                        <SubmenuImage src={product.image || '/img/placeholder.jpg'} alt={product.name} />
                                        <p>{getProductTranslation(product.name)}</p>
                                    </Link>
                                </div>
                            ))}
                    </div>
                    <div className={styles['mobile-menu']} ref={mobileMenuRef}>
                        <ul>
                            <li><Link href={`/${locale}/`} onClick={closeMobileMenu}>{t('home')}</Link></li>
                            <li><Link href={`/${locale}/solucoes`} onClick={closeMobileMenu}>{t('solutions')}</Link></li>
                            <li><Link href={`/${locale}/sobre`} onClick={closeMobileMenu}>{t('about')}</Link></li>
                            <li><Link href={`/${locale}/contato`} onClick={closeMobileMenu}>{t('contact')}</Link></li>
                        </ul>
                        <div className={styles['mobile-contact']}>
                            <p dangerouslySetInnerHTML={{ __html: tContact('address') }} />
                            <p><a href="tel:+554532311699" target="_blank"><MdOutlinePhoneInTalk /> {tContact('phone')}</a></p>
                            <p><a href="https://wa.me/554530111000" target="_blank"><BsWhatsapp /> {tContact('whatsappDefault')}</a></p>
                            <p><a href="mailto:contato@isoart.com.br" target="_blank"><MdOutlineMarkEmailUnread /> {tContact('email')}</a></p>
                            <div className={styles['mobile-social']}>
                                <div className={styles['mobile-social-icons']}>
                                    <Link href="https://www.instagram.com/isoartsolucoestermicas/" target="_blank" aria-label={tSocial('instagram')}>
                                        <BsInstagram /><span className={styles['sr-only']}>Instagram</span>
                                    </Link>
                                    <Link href="https://www.facebook.com/profile.php?id=61551356827381" target="_blank" aria-label={tSocial('facebook')}>
                                        <BsFacebook /><span className={styles['sr-only']}>Facebook</span>
                                    </Link>
                                    <Link href="https://www.youtube.com/channel/UC2dlCQSV1Rp5WF91P6ZNDvg" target="_blank" aria-label={tSocial('youtube')}>
                                        <BsYoutube /><span className={styles['sr-only']}>YouTube</span>
                                    </Link>
                                    <Link href="https://www.linkedin.com/company/isoart-industria-produtos-termicos-e-construtivos/" target="_blank" aria-label={tSocial('linkedin')}>
                                        <BsLinkedin /><span className={styles['sr-only']}>LinkedIn</span>
                                    </Link>
                                </div>
                                <div className={styles['mobile-language-selector']}>
                                    {supportedLocales.map((locale) => {
                                        const localeInfo = getLocaleInfo(locale);
                                        const isActive = locale === currentLocale;
                                        return (
                                            <button
                                                key={locale}
                                                className={`${styles['mobile-language-option']} ${isActive ? styles['mobile-language-option-active'] : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleLocaleChange(locale);
                                                    closeMobileMenu();
                                                }}
                                                title={localeInfo.name}
                                            >
                                                <img src={localeInfo.flag} alt={`${t('flag')} ${localeInfo.name}`} className={styles['mobile-flag-image']} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainNav;
