/* eslint-disable */
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menu-data.json';
import SobreEmpresa from '@/app/components/sobre-empresa/sobre-empresa';
import ContactComponent from '@/app/components/contact/contact-component';
import Button from '@/app/views/ui/button/button';
import TabbedSection from './tabbed-section';
import BenefitsSection from '@/app/components/benefits-section/benefits-section';
import IncendioComponent from '@/app/components/pir-incendio/pir-incendio';
import { TbChecks, TbHome, TbMicroscope, TbBuildingFactory2, TbSnowflake, TbMedicineSyrup, TbBuilding, TbBuildingHospital, TbBuildingFactory, TbTools, TbPackage, TbDeviceTv, TbWindow, TbTruck, TbBuildingStore, TbArmchair, TbMicrophone, } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import ImageCarousel from '@/app/components/image-carousel/image-carousel';
import SingleImage from '@/app/components/single-image/single-image';

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
    params: { category: string; product: string };
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
        const categoryFile = await import(`@/app/data/categories/${normalizedCategory}.json`);
        categoryData = categoryFile.default as CategoryData;
    } catch (error) {
        categoryData = (menuData as CategoryData[]).find((item: CategoryData) => item.slug === categorySlug);
    }

    return categoryData;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, product } = params;

    let productData: ProductData | undefined;

    try {
        const normalizedCategory = category.toLowerCase().replace(/ /g, '-');
        const normalizedProduct = product.toLowerCase().replace(/ /g, '-');
        const productFile = await import(`@/app/data/products/${normalizedCategory}/${normalizedProduct}.json`);
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
        description: 'Descubra a solução ideal para coberturas eficientes com isolamento térmico superior.',
        buttonText: 'Solicite um orçamento',
        buttonLink: '/contato',
        backgroundImage: productData.image || '/img/default-product-hero.avif'
    };

    const categoryDescription = productData.categoryDescription || {
        title: 'As Telhas Térmicas Isoart oferecem leveza, economia e excelente desempenho térmico, otimizando a obra e garantindo conforto com menor custo.',
        description: 'A Telha Térmica Isoart é uma solução leve e eficiente para a construção civil, substituindo com vantagens os sistemas tradicionais. Produzida com núcleos de poliestireno expandido (EPS) ou poliisocianurato (PIR) e revestimento em aço galvalume, proporciona estruturas mais leves, redução de carga nas fundações e maior agilidade na obra. Além de excelente desempenho térmico, permite economia significativa de concreto, aço e mão de obra, sendo ideal para projetos que exigem produtividade, conforto e custo-benefício.'
    };

    // Usar os benefícios da categoria se existirem, senão usar os benefícios do produto ou padrão
    const benefits = categoryData?.benefits || productData.benefits || [
        { id: 1, title: "Qualidade Superior", description: "Produtos com rigoroso controle de qualidade." },
        { id: 2, title: "Eficiência Garantida", description: "Soluções que entregam o melhor desempenho." }
    ];

    const generalCharacteristics = productData.generalCharacteristics || [
        'Adaptações personalizadas de altura, largura e comprimento',
        'Menor carga sobre a estrutura com excelente desempenho mecânico',
        'Mais fácil de transportar e montar, otimizando o tempo da obra',
        'Menor consumo de recursos como concreto, aço e madeira',
        'Conforto térmico e redução de ruídos em ambientes internos',
        'Recebe chapisco e reboco com ótima aderência'
    ];

    const applications = productData.applications || {
        title: 'Maior economia, agilidade na execução e conforto térmico com menor esforço estrutural',
        description: 'A Telha Térmica Isoart é fabricada com blocos de poliestireno expandido ou poliisocianurato, proporcionando telhas mais leves, com menor consumo de concreto e aço, fácil manuseio e excelente isolamento térmico. Ideal para obras que exigem rapidez, desempenho e redução de custos.',
        indications: [
            { icon: 'TbHome', text: 'Casas e sobrados' },
            { icon: 'TbBuilding', text: 'Prédios residenciais' },
            { icon: 'TbFactory', text: 'Galpões industriais' },
            { icon: 'TbBuildingStore', text: 'Estabelecimentos comerciais' }
        ]
    };

    const tabDescriptions = productData.tabDescriptions || {
        'Alívio de carga na estrutura': 'As Telhas Térmicas Isoart reduzem significativamente a carga sobre a estrutura, permitindo projetos mais leves e econômicos sem comprometer a segurança ou durabilidade.',
        'Economia na obra': 'Com menor consumo de materiais como concreto e aço, as Telhas Térmicas otimizam custos e aceleram o cronograma, oferecendo alta eficiência na construção.',
        'Flexibilidade no projeto': 'Personalizáveis em dimensões e acabamentos, essas telhas se adaptam a diversos projetos, desde residências até galpões industriais, garantindo versatilidade.',
        'Isolamento térmico inteligente': 'Projetadas com materiais como PIR e EPS, as Telhas Térmicas oferecem excelente isolamento, reduzindo a necessidade de climatização e aumentando o conforto interno.'
    };

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
                    <Link href={heroSection.buttonLink || '/contato'}>
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

            {/* General Characteristics */}
            <section className={styles['general-characteristics-section']}>
                <div className={styles['general-characteristics-wrapper']}>
                                    <div className={styles['img-placeholder']}>
                    {productData.projectImages && productData.projectImages.length > 0 ? (
                        <ImageCarousel 
                            images={productData.projectImages}
                            alt={productData.name}
                            width={1440}
                            height={800}
                        />
                    ) : (
                        <SingleImage 
                            src={productData.image || '/img/geral/exemplo2.avif'} 
                            alt={productData.name} 
                            width={1440} 
                            height={800}
                        />
                    )}
                </div>
                    <h3>Características:</h3>
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
                    <p>Aplicações:</p>
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

            {/* Tabbed Section */}
            <TabbedSection tabDescriptions={tabDescriptions} />

            {/* PIR Incêndio Component - Apenas para categoria telhas-e-paineis */}
            {category === 'telhas-e-paineis' && <IncendioComponent />}

            <SobreEmpresa />
            <ContactComponent />
        </div>
    );
}

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
    const { category, product } = params;
    let productData: ProductData | undefined;

    try {
        const normalizedCategory = category.toLowerCase().replace(/ /g, '-');
        const normalizedProduct = product.toLowerCase().replace(/ /g, '-');
        const productFile = await import(`@/app/data/products/${normalizedCategory}/${normalizedProduct}.json`);
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