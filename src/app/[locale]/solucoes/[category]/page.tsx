'use client';

import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import SobreEmpresa from '@/app/[locale]/components/sobre-empresa/sobre-empresa';
import ContactComponent from '@/app/[locale]/components/contact/contact-component';
import Button from '@/app/[locale]/views/ui/button/button';
import BenefitsSection from '@/app/[locale]/components/benefits-section/benefits-section';
import IncendioComponent from '@/app/[locale]/components/pir-incendio/pir-incendio';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCategoryData } from '../../hooks/use-category-data';
import menuData from '@/app/[locale]/data/menu-data.json';

// Interfaces importadas do hook useCategoryData

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;
    const locale = params.locale as string;
    
    const t = useTranslations('categoryPage');
    const tCommon = useTranslations('common.buttons');

    // Usar o hook personalizado para carregar dados da categoria
    const categoryData = useCategoryData(category);

    // Show loading state
    if (!categoryData) {
        return (
            <div className={styles['category-page']}>
                <div>Carregando...</div>
            </div>
        );
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
                        {categoryData.products.map((product) => {
                            // Usar dados estáticos para imagem E link correto
                            const staticData = (menuData as any[]).find((item: any) => item.slug === category);
                            const staticProduct = staticData?.products?.find((p: any) => p.slug === product.slug);
                            const imageSrc = staticProduct?.image || product.image;
                            
                            // Construir link correto usando dados estáticos
                            const correctSlug = staticProduct?.slug || product.slug;
                            const correctCategorySlug = staticData?.slug || categoryData.slug;
                            
                            return (
                                <article key={product.id} className={styles['category-products-grid-card']}>
                                    <Link href={`/${locale}/solucoes/${correctCategorySlug}/${correctSlug}`}>
                                        <div className={styles['category-products-grid-content']}>
                                            {imageSrc && (
                                                <div className={styles['category-products-grid-img']}>
                                                    <Image
                                                        src={imageSrc}
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
                            );
                        })}
                    </div>
                </div>
            </section>

            {categoryData.benefits && categoryData.benefits.length > 0 && (
                <BenefitsSection benefits={categoryData.benefits} />
            )}
            {categoryData.slug === 'telhas-e-paineis' && <IncendioComponent />}
            <SobreEmpresa locale={locale} />
            <ContactComponent locale={locale} />
        </div>
    );
}