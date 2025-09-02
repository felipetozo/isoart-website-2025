// main-nav.tsx - Navegação principal com menus, submenu e versão mobile

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
    // Dados hardcoded como fallback
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

// Componente de imagem para submenu
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
                    onLoad={() => {
                        setIsLoading(false);
                    }}
                    onError={(e) => {
                        console.error('Erro ao carregar imagem:', src, e);
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

    // ✅ Correção do tipo do timeout
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const iconRef = useRef<HTMLDivElement | null>(null);
    const { currentLocale, changeLanguage, getLocaleInfo, supportedLocales } = useLanguage();
    const t = useTranslations('nav');
    const tMenu = useTranslations('menu');
    const tContact = useTranslations('contact');
    const tSocial = useTranslations('social');

    // Traduções
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
        console.log('🔍 MainNav - currentLocale:', currentLocale);
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
        const mobileMenuItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-menu']} ul li, .${styles['mobile-contact']} p, .${styles['mobile-social']} a, .${styles['mobile-language-option']}`);

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
            const mobileMenuItems = mobileMenuRef.current?.querySelectorAll(`.${styles['mobile-menu']} ul li, .${styles['mobile-contact']} p, .${styles['mobile-social']} a, .${styles['mobile-language-option']}`);

            if (topBar && bottomBar) {
                tl.to([topBar, bottomBar], {
                    rotate: 0,
                    translateY: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    transformOrigin: "center",
                });
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
            {/* ... resto igual ao original ... */}
        </div>
    );
}

export default MainNav;
