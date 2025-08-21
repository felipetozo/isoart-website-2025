'use client';

import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '../../data/menu-data.json';
import SobreEmpresa from '@/app/[locale]/components/sobre-empresa/sobre-empresa';
import ContactComponent from '@/app/[locale]/components/contact/contact-component';
import Button from '@/app/[locale]/views/ui/button/button';
import BenefitsSection from '@/app/[locale]/components/benefits-section/benefits-section';
import IncendioComponent from '@/app/[locale]/components/pir-incendio/pir-incendio';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Updated interfaces to match the actual data structure
interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    specifications?: {
        [key: string]: string | undefined;
    };
}

interface HeroSection {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
}

interface Benefit {
    id: number;
    title: string;
    description: string;
    icon?: string;
}

interface CategoryData {
    id: number;
    title: string;
    slug: string;
    description?: string;
    metaDescription?: string;
    image?: string;
    hero?: HeroSection;
    categoryDescription?: string;
    products: Product[];
    benefits?: Benefit[];
}

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;
    const locale = params.locale as string;
    
    const t = useTranslations('categoryPage');
    const tCommon = useTranslations('common.buttons');

    // Helper function to get translated data for the category
    const getTranslatedCategoryData = (categorySlug: string, originalData: CategoryData): CategoryData => {
        const categoryKey = categorySlug.replace('-', '');
        
        // Check if we have translations for this category
        try {
            const translatedData = { ...originalData };
            
            if (t.has(`categories.${categoryKey}.title`)) {
                translatedData.title = t(`categories.${categoryKey}.title`);
            }
            
            if (t.has(`categories.${categoryKey}.hero.title`)) {
                translatedData.hero = {
                    ...originalData.hero,
                    title: t(`categories.${categoryKey}.hero.title`),
                    description: t(`categories.${categoryKey}.hero.description`),
                    buttonText: t(`categories.${categoryKey}.hero.buttonText`),
                    buttonLink: originalData.hero?.buttonLink || `/${locale}/contato`,
                    backgroundImage: originalData.hero?.backgroundImage || '/img/default-category-hero.avif'
                };
            }
            
            if (t.has(`categories.${categoryKey}.categoryDescription`)) {
                translatedData.categoryDescription = t(`categories.${categoryKey}.categoryDescription`);
            }
            
            // Translate products if available
            if (originalData.products) {
                translatedData.products = originalData.products.map(product => {
                    const productKey = product.slug.replace(/-/g, '');
                    if (t.has(`categories.${categoryKey}.products.${productKey}.name`)) {
                        return {
                            ...product,
                            name: t(`categories.${categoryKey}.products.${productKey}.name`),
                            description: t(`categories.${categoryKey}.products.${productKey}.description`)
                        };
                    }
                    return product;
                });
            }
            
            // Translate benefits if available
            if (originalData.benefits) {
                translatedData.benefits = originalData.benefits.map((benefit, index) => {
                    const benefitKey = `benefit${index + 1}`;
                    if (t.has(`categories.${categoryKey}.benefits.${benefitKey}.title`)) {
                        return {
                            ...benefit,
                            title: t(`categories.${categoryKey}.benefits.${benefitKey}.title`),
                            description: t(`categories.${categoryKey}.benefits.${benefitKey}.description`)
                        };
                    }
                    return benefit;
                });
            }
            
            return translatedData;
        } catch (error) {
            console.log('Translation not found for category:', categorySlug);
            return originalData;
        }
    };

    const [categoryData, setCategoryData] = useState<CategoryData | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    // Load category data on component mount
    useEffect(() => {
        const loadCategoryData = async () => {
            try {
                const normalizedCategory = category.toLowerCase().replace(/ /g, '-');
                console.log('Importando arquivo:', `../../data/categories/${normalizedCategory}.json`);

                const specificCategoryData = await import(`../../data/categories/${normalizedCategory}.json`);
                const originalData = specificCategoryData.default as CategoryData;
                const translatedData = getTranslatedCategoryData(category, originalData);
                setCategoryData(translatedData);
                console.log('Dados carregados do arquivo específico:', translatedData);
            } catch (error) {
                console.error('Erro ao importar arquivo específico:', error);
                const originalData = (menuData as CategoryData[]).find(
                    (item: CategoryData) => item.slug === category
                );
                if (originalData) {
                    const translatedData = getTranslatedCategoryData(category, originalData);
                    setCategoryData(translatedData);
                }
                console.log('Usando dados do menuData.json:', categoryData);
            } finally {
                setLoading(false);
            }
        };

        loadCategoryData();
    }, [category, locale, t]);

    // Show loading state
    if (loading) {
        return (
            <div className={styles['category-page']}>
                <div>Carregando...</div>
            </div>
        );
    }

    // Show not found if no data
    if (!categoryData) {
        console.log('Categoria não encontrada:', category);
        notFound();
    }

    const heroSection = categoryData.hero || {
        title: categoryData.title,
        description: categoryData.description || categoryData.categoryDescription || t('hero.defaultDescription'),
        buttonText: t('hero.defaultButtonText'),
        buttonLink: `/${locale}/contato`,
        backgroundImage: '/img/default-category-hero.avif'
    };

    const benefitsSection = categoryData.benefits || [
        { id: 1, title: t('benefits.defaultTitle1'), description: t('benefits.defaultDescription1') },
        { id: 2, title: t('benefits.defaultTitle2'), description: t('benefits.defaultDescription2') }
    ];

    return (
        <div className={styles['category-page']}>
            {/* Hero Section */}
            <section
                className={styles['category-page-hero-section']}
                style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}
            >
                <div className={styles['category-page-hero-mask']}></div>
                <div className={styles['category-page-hero-content']}>
                    <h1>{heroSection.title}</h1>
                    <p>{heroSection.description}</p>
                    <Link href={heroSection.buttonLink || `/${locale}/contato`}>
                        <Button variant="primary" size="medium">
                            {heroSection.buttonText || t('hero.defaultButtonText')}
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Main Category Description */}
            {categoryData.categoryDescription && (
                <section className={styles['category-description-section']}>
                    <div className={styles['category-description-wrapper']}>
                        <h2>{categoryData.categoryDescription}</h2>
                    </div>
                </section>
            )}

            {/* Products Grid */}
            <section className={styles['category-products-section']}>
                <div className={styles['category-products-wrapper']}>
                    <div className={styles['category-products-grid']}>
                        {categoryData.products.map((product) => (
                            <article key={product.id} className={styles['category-products-grid-card']}>
                                <Link href={`/${locale}/solucoes/${categoryData.slug}/${product.slug}`}>
                                    <div className={styles['category-products-grid-content']}>
                                        {product.image && (
                                            <div className={styles['category-products-grid-img']}>
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={300}
                                                    height={200}
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h4>{product.name}</h4>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <BenefitsSection benefits={benefitsSection} />
            {categoryData.slug === 'telhas-e-paineis' && <IncendioComponent />}
            <SobreEmpresa locale={locale} />
            <ContactComponent locale={locale} />
        </div>
    );
}