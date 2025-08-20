/* eslint-disable */
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/[locale]/data/menu-data.json';
import SobreEmpresa from '@/app/[locale]/components/sobre-empresa/sobre-empresa';
import ContactComponent from '@/app/[locale]/components/contact/contact-component';
import Button from '@/app/[locale]/views/ui/button/button';
import BenefitsSection from '@/app/[locale]/components/benefits-section/benefits-section';
import IncendioComponent from '@/app/[locale]/components/pir-incendio/pir-incendio';
import { TbChecks, TbHome, TbMicroscope, TbBuildingFactory2, TbSnowflake, TbMedicineSyrup, TbBuilding, TbBuildingHospital, TbBuildingFactory, TbTools, TbPackage, TbDeviceTv, TbWindow, TbTruck, TbBuildingStore, TbArmchair, TbMicrophone, } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import ImageCarousel from '@/app/[locale]/components/image-carousel/image-carousel';
import { useTranslations } from 'next-intl';

interface ProductData {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    projectImages?: string[];
    specifications?: {
        [key: string]: string | undefined;
    };
    hero?: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        backgroundImage: string;
    };
    categoryDescription?: {
        title: string;
        description: string;
    };

    benefits?: {
        id: number;
        title: string;
        description: string;
    }[];
    generalCharacteristics?: string[];
    applications?: {
        title: string;
        description: string;
        indications: { icon: string; text: string }[];
    };
    modelsTable?: {
        title: string;
        headers: string[];
        rows: {
            material: string;
            espessuras: string[];
            revestimento: string;
            trapezios: string;
        }[];
        note: string;
    };
    tabDescriptions?: {
        [key: string]: string;
    };
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
    hero?: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        backgroundImage: string;
    };
    categoryDescription?: string;
    products: ProductData[];
    benefits?: Benefit[];
}

interface ProductPageProps {
    params: Promise<{ category: string; product: string; locale: string }>;
}

// Função para renderizar ícones do Tabler
function renderIcon(iconName: string) {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
        'TbHome': TbHome,
        'TbBuilding': TbBuilding,
        'TbFactory': TbBuildingFactory,
        'TbTools': TbTools,
        'TbPackage': TbPackage,
        'TbDeviceTv': TbDeviceTv,
        'TbWindow': TbWindow,
        'TbTruck': TbTruck,
        'TbBuildingStore': TbBuildingStore,
        'TbArmchair': TbArmchair,
        'TbMicrophone': TbMicrophone,
        'IoFastFoodOutline': IoFastFoodOutline,
        'TbBuildingHospital': TbBuildingHospital,
        'TbSnowflake': TbSnowflake,
        'TbMedicineSyrup': TbMedicineSyrup,
        'TbMicroscope': TbMicroscope,
        'TbBuildingFactory2': TbBuildingFactory2,
    };

    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={24} /> : <span>{iconName}</span>;
}

// Função para buscar dados da categoria
async function getCategoryData(categorySlug: string): Promise<CategoryData | undefined> {
    let categoryData: CategoryData | undefined;

    try {
        const normalizedCategory = categorySlug.toLowerCase().replace(/ /g, '-');
        const categoryFile = await import(`../../../data/categories/${normalizedCategory}.json`);
        categoryData = categoryFile.default as CategoryData;
    } catch (error) {
        categoryData = (menuData as CategoryData[]).find((item: CategoryData) => item.slug === categorySlug);
    }

    return categoryData;
}

async function ProductPage({ params }: ProductPageProps) {
    const { category, product, locale } = await params;
    
    // Hook de traduções (será usado dentro da função)
    const t = useTranslations('productPage');
    const tCommon = useTranslations('common.buttons');

    let productData: ProductData | undefined;

    try {
        const normalizedCategory = category.toLowerCase().replace(/ /g, '-');
        const normalizedProduct = product.toLowerCase().replace(/ /g, '-');
        const productFile = await import(`../../../data/products/${normalizedCategory}/${normalizedProduct}.json`);
        productData = productFile.default as ProductData;
    } catch (error) {
        const categoryData = (menuData as CategoryData[]).find((item: CategoryData) => item.slug === category);
        if (categoryData) {
            productData = categoryData.products.find((p: ProductData) => p.slug === product);
        }
    }

    if (!productData) {
        notFound();
    }

    // Buscar dados da categoria para pegar os benefícios
    const categoryData = await getCategoryData(category);

    const heroSection = productData.hero || {
        title: productData.name,
        description: t('defaults.heroDescription'),
        buttonText: t('defaults.buttonText'),
        buttonLink: `/${locale}/contato`,
        backgroundImage: productData.image || '/img/default-product-hero.avif'
    };

    const categoryDescription = productData.categoryDescription || {
        title: t('defaults.categoryDescriptionTitle'),
        description: t('defaults.categoryDescriptionText')
    };

    // Usar os benefícios da categoria se existirem, senão usar os benefícios do produto ou padrão
    const benefits = categoryData?.benefits || productData.benefits || t('defaults.defaultBenefits');

    const generalCharacteristics = productData.generalCharacteristics || t('defaults.generalCharacteristics');

    const applications = productData.applications || {
        title: t('defaults.applicationsTitle'),
        description: t('defaults.applicationsDescription'),
        indications: [
            { icon: 'TbHome', text: 'Casas e sobrados' },
            { icon: 'TbBuilding', text: 'Prédios residenciais' },
            { icon: 'TbFactory', text: 'Galpões industriais' },
            { icon: 'TbBuildingStore', text: 'Estabelecimentos comerciais' }
        ]
    };

    const tabDescriptions = productData.tabDescriptions || t('defaults.tabDescriptions');

    return (
        <div className={styles['product-page']}>
            {/* Hero Section */}
            <section
                className={styles['product-page-hero-section']}
                style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}
            >
                <div className={styles['product-page-hero-mask']}></div>
                <div className={styles['product-page-hero-content']}>
                    <h1>{heroSection.title}</h1>
                    <p>{heroSection.description}</p>
                    <Link href={heroSection.buttonLink || `/${locale}/contato`}>
                        <Button variant="primary" size="medium">
                            {heroSection.buttonText || 'Solicite um orçamento'}
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Category Description */}
            <section className={styles['product-page-description-section']}>
                <div className={styles['product-page-description-wrapper']}>
                    <h3>{categoryDescription.title}</h3>
                    <p>{categoryDescription.description}</p>
                </div>
            </section>

            {/* Benefits - Agora usando os benefícios da categoria */}
            <BenefitsSection benefits={benefits} />

            {/* Carrossel galeria */}
            <section className={styles['general-characteristics-section']}>
                <div className={styles['general-characteristics-wrapper']}>
                    <div className={styles['img-placeholder']}>
                        <ImageCarousel 
                            images={productData.projectImages && productData.projectImages.length > 0 ? productData.projectImages : [productData.image || '/img/geral/exemplo2.avif']}
                            alt={productData.name}
                            width={1440}
                            height={800}
                        />
                    </div>

                {/* Características gerais */}
                    <h3>{t('sections.characteristics')}</h3>
                    <div className={styles['features-grid']}>
                        {generalCharacteristics.map((char, index) => (
                            <div key={index} className={styles['feature']}>
                                <span><TbChecks size={24} /></span> <p>{char}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Applications */}
            <section className={styles['applications-section']}>
                <div className={styles['applications-wrapper']}>
                    <h3>{applications.title}</h3>
                    <p>{applications.description}</p>
                    <p>{t('defaults.applicationsLabel')}</p>
                    <div className={styles['application-carousel']}>
                        <div className={styles['application-cards']}>
                            {applications.indications.map((indication, index) => (
                                <div key={index} className={styles['application-card']}>
                                    {renderIcon(indication.icon)} {indication.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Models Table - Apenas para telhas térmicas */}
            {productData.modelsTable && (
                <section className={styles['models-table-section']}>
                    <div className={styles['models-table-wrapper']}>
                        <h5 className={styles['models-table-title']}>{productData.modelsTable.title || t('sections.modelsTableTitle')}</h5>
                        <div className={styles['models-table-container']}>
                            <table className={styles['models-table']}>
                                <thead>
                                    <tr>
                                        {productData.modelsTable.headers.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.modelsTable!.rows.map((row, rowIndex) => {
                                        const totalRows = productData.modelsTable!.rows.reduce((acc, r) => acc + r.espessuras.length, 0);
                                        return row.espessuras.map((espessura, espIndex) => (
                                            <tr key={`${rowIndex}-${espIndex}`}>
                                                {rowIndex === 0 && espIndex === 0 ? (
                                                    <td rowSpan={totalRows}>{row.material}</td>
                                                ) : null}
                                                <td>{espessura}</td>
                                                {espIndex === 0 ? (
                                                    <td rowSpan={row.espessuras.length}>{row.revestimento}</td>
                                                ) : null}
                                                {rowIndex === 0 && espIndex === 0 ? (
                                                    <td rowSpan={totalRows}>{row.trapezios}</td>
                                                ) : null}
                                            </tr>
                                        ));
                                    })}
                                </tbody>
                            </table>
                            {productData.modelsTable.note && (
                                <p className={styles['models-table-note']}>{productData.modelsTable.note}</p>
                            )}
                            {!productData.modelsTable.note && (
                                <p className={styles['models-table-note']}>{t('sections.modelsTableNote')}</p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Product Descriptions - Apenas se não houver tabela de modelos */}
            {!productData.modelsTable && (
                <section className={styles['product-descriptions-section']}>
                    <div className={styles['product-descriptions-wrapper']}>
                        {Object.entries(tabDescriptions).map(([title, description]) => (
                            <div key={title} className={styles['product-description-item']}>
                                <h4 className={styles['product-description-title']}>{title}</h4>
                                <p className={styles['product-description-content']}>{description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* PIR Incêndio Component - Apenas para categoria telhas-e-paineis */}
            {category === 'telhas-e-paineis' && <IncendioComponent />}

            <SobreEmpresa locale={locale} />
            <ContactComponent locale={locale} />
        </div>
    );
}

export default ProductPage;

export async function generateStaticParams() {
    const allProducts = (menuData as CategoryData[]).flatMap((category: CategoryData) =>
        category.products.map((product: ProductData) => ({
            category: category.slug,
            product: product.slug,
        }))
    );
    return allProducts;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { category, product } = await params;
    let productData: ProductData | undefined;

    try {
        const normalizedCategory = category.toLowerCase().replace(/ /g, '-');
        const normalizedProduct = product.toLowerCase().replace(/ /g, '-');
        const productFile = await import(`../../../data/products/${normalizedCategory}/${normalizedProduct}.json`);
        productData = productFile.default as ProductData;
    } catch (error) {
        const categoryData = (menuData as CategoryData[]).find((item: CategoryData) => item.slug === category);
        if (categoryData) {
            productData = categoryData.products.find((p: ProductData) => p.slug === product);
        }
    }

    if (!productData) {
        return {
            title: 'Produto não encontrado - ISOART',
        };
    }

    return {
        title: `${productData.name} - ISOART`,
        description: productData.description || `Detalhes do produto ${productData.name} da ISOART`,
        openGraph: {
            title: `${productData.name} - ISOART`,
            description: productData.description || `Detalhes do produto ${productData.name} da ISOART`,
            images: productData.image ? [productData.image] : [],
        },
    };
}