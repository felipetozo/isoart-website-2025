import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menuData.json';
import SobreEmpresa from '@/app/components/SobreEmpresa/SobreEmpresa';
import MainForm from '@/app/components/MainForm/MainForm';
import Button from '@/app/views/UI/Button';
import TabbedSection from './TabbedSection';
import { TbChecks, TbTopologyStarRing2, TbShieldShare, TbWindOff, TbCloudDownload, TbRecycle } from "react-icons/tb";

interface TechnicalSpecs {
    image?: string;
    alt?: string;
    table?: {
        headers: string[];
        rows: string[][];
    };
    features?: {
        icon: string;
        title: string;
        description: string;
    }[];
    downloads?: {
        title: string;
        icon: string;
        link: string;
    }[];
}

interface ProductData {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
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
    projectImages?: string[];
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
    technicalSpecs?: TechnicalSpecs;
}

interface Benefit {
    id: number;
    title: string;
    description: string;
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
    params: Promise<{ category: string; product: string }>;
}

// Color mapping based on category slugs
const categoryColorMap: { [key: string]: string } = {
    'telhas-e-paineis': 'var(--color-solucoes-telhas)',
    'construcao-civil': 'var(--color-solucoes-construcao)',
    'forros': 'var(--color-solucoes-forros)',
    'molduras-decorativas': 'var(--color-solucoes-decoracao)',
    'embalagens-em-eps': 'var(--color-solucoes-embalagens)',
};

// Map benefit titles to specific icons
const getBenefitIcon = (title: string): React.ReactElement => {
    switch (title) {
        case 'Isolamento térmico':
            return <TbWindOff size={40} />;
        case 'Alta resistência':
            return <TbTopologyStarRing2 size={40} />;
        case 'Durabilidade prolongada':
            return <TbShieldShare size={40} />;
        default:
            return <TbWindOff size={40} />;
    }
};

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, product } = await params;

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

    const categoryColor = categoryColorMap[category] || 'var(--color-almostBlack)';
    const heroSection = productData.hero || {
        title: productData.name,
        description: 'Descubra a solução ideal para coberturas eficientes com isolamento térmico superior.',
        buttonText: 'Solicite um orçamento',
        buttonLink: '/contato',
        backgroundImage: productData.image || '/img/default-product-hero.jpg'
    };
    const categoryDescription = productData.categoryDescription || {
        title: 'As Telhas Térmicas Isoart oferecem leveza, economia e excelente desempenho térmico, otimizando a obra e garantindo conforto com menor custo.',
        description: 'A Telha Térmica Isoart é uma solução leve e eficiente para a construção civil, substituindo com vantagens os sistemas tradicionais. Produzida com núcleos de poliestireno expandido (EPS) ou poliisocianurato (PIR) e revestimento em aço galvalume, proporciona estruturas mais leves, redução de carga nas fundações e maior agilidade na obra. Além de excelente desempenho térmico, permite economia significativa de concreto, aço e mão de obra, sendo ideal para projetos que exigem produtividade, conforto e custo-benefício.'
    };
    const projectImages = productData.projectImages || ['/img/projetos/projeto1.jpg', '/img/projetos/projeto2.jpg', '/img/projetos/projeto3.jpg', '/img/projetos/projeto4.jpg'];
    const benefits = productData.benefits || [];
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
            { icon: '🏠', text: 'Casas e sobrados' },
            { icon: '🏢', text: 'Prédios residenciais' },
            { icon: '🏭', text: 'Galpões industriais' },
            { icon: '🏬', text: 'Estabelecimentos comerciais' }
        ]
    };
    const tabDescriptions = productData.tabDescriptions || {
        'Alívio de carga na estrutura': 'As Telhas Térmicas Isoart reduzem significativamente a carga sobre a estrutura, permitindo projetos mais leves e econômicos sem comprometer a segurança ou durabilidade.',
        'Economia na obra': 'Com menor consumo de materiais como concreto e aço, as Telhas Térmicas otimizam custos e aceleram o cronograma, oferecendo alta eficiência na construção.',
        'Flexibilidade no projeto': 'Personalizáveis em dimensões e acabamentos, essas telhas se adaptam a diversos projetos, desde residências até galpões industriais, garantindo versatilidade.',
        'Isolamento térmico inteligente': 'Projetadas com materiais como PIR e EPS, as Telhas Térmicas oferecem excelente isolamento, reduzindo a necessidade de climatização e aumentando o conforto interno.'
    };
    const technicalSpecs = productData.technicalSpecs || {
        image: '/img/geral/exemplo3.png',
        alt: 'Especificações Técnicas',
        table: {
            headers: ['Modelo', 'Altura (mm)', 'Largura padrão (mm)', 'Peso aproximado (kg/m²)', 'Densidade EPS (kg/m³)', 'Isolamento térmico', 'Absorção de água'],
            rows: [
                ['Laje EPS 12', '120', '300', '4.5', '12 a 20', 'Excelente', '< 2%'],
                ['Laje EPS 15', '150', '300', '5.2', '12 a 20', 'Excelente', '< 2%'],
                ['Laje EPS 20', '200', '300', '6.3', '12 a 20', 'Excelente', '< 2%']
            ]
        },
        features: [
            { icon: '♻️', title: '95% Reciclável', description: 'Material sustentável' },
            { icon: '🌿', title: 'Sem emissão de CFC', description: 'Ecologicamente correto' },
            { icon: '📏', title: 'Fabricado sob medida', description: 'Personalização total' }
        ],
        downloads: [
            { title: 'Ficha técnica Lajes EPS Isoart', icon: '📄', link: '/downloads/ficha-tecnica-lajes-eps.pdf' },
            { title: 'Catálogo de produtos Isoart', icon: '📋', link: '/downloads/catalogo-produtos-isoart.pdf' }
        ]
    };

    return (
        <div className={styles.ProductPage}>
            {/* Hero Section */}
            <section
                className={styles.ProductPageHeroSection}
                style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}
            >
                <div className={styles.ProductPageHeroMask}></div>
                <div className={styles.ProductPageHeroContent}>
                    <h1>{heroSection.title}</h1>
                    <p>{heroSection.description}</p>
                    <Link href={heroSection.buttonLink}>
                        <Button variant="primary" size="medium">
                            {heroSection.buttonText}
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Category Description */}
            <section className={styles.ProductPageDescriptionSection}>
                <div className={styles.ProductPageDescriptionWrapper}>
                    <h3 style={{ color: `rgba(${categoryColor}, 1)` }}>
                        {categoryDescription.title}
                    </h3>
                    <p>{categoryDescription.description}</p>
                </div>
            </section>

            {/* Carousel of Delivered Projects */}
            <section className={styles.ProductPageCarouselSection}>
                <div className={styles.ProductPageCarouselCarouselWrapper}>
                    <button className={styles.CarouselPrev}>anterior</button>
                    <div className={styles.CarouselImages}>
                        {projectImages.map((img, index) => (
                            <Image key={index} src={img} alt={`Projeto ${index + 1}`} width={300} height={200} />
                        ))}
                    </div>
                    <button className={styles.CarouselNext}>próximo</button>
                </div>
            </section>

            {/* Benefits */}
            <section className={styles.BenefitsSection}>
                <div className={styles.BenefitsWrapper}>
                    {benefits.map((benefit) => (
                        <div key={benefit.id} className={styles.BenefitsCard}
                            style={{
                                backgroundColor: `rgba(${categoryColor}, 0.05)`,
                                border: `1px solid rgba(${categoryColor}, 0.15)`,
                            }}>
                            <div className={styles.BenefitIcon}>
                                {getBenefitIcon(benefit.title)}
                            </div>
                            <h5 style={{ color: `rgba(${categoryColor}, 1)` }}>{benefit.title}</h5>
                            <p style={{ color: `rgba(17, 17, 17, 0.5)` }}>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* General Characteristics */}
            <section className={styles.GeneralCharacteristicsSection}>
                <div className={styles.GeneralCharacteristicsWrapper}>
                    <div className={styles.VideoPlaceholder}>
                        <Image src={productData.image || '/img/geral/exemplo2.png'} alt={productData.name} width={1600} height={500} />
                    </div>
                    <h3 style={{ color: `rgba(${categoryColor}, 1)` }}>Características Gerais</h3>
                    <div className={styles.CharacteristicsGrid}>
                        {generalCharacteristics.map((char, index) => (
                            <div key={index} className={styles.CharacteristicItem}><span style={{ backgroundColor: `rgba(${categoryColor}, 1)` }}><TbChecks /></span> {char}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Applications */}
            <section className={styles.ApplicationsSection}>
                <div className={styles.ApplicationsWrapper}>
                    <h3 style={{ color: `rgba(${categoryColor}, 1)` }}>{applications.title}</h3>
                    <p>{applications.description}</p>
                    <p style={{ fontWeight: 'bold', color: `rgba(${categoryColor}, 1)` }}>Indicada para obras residenciais, comerciais e industriais como:</p>
                    <div className={styles.ApplicationCarousel}>
                        <div className={styles.ApplicationCards}>
                            {applications.indications.map((indication, index) => (
                                <div key={index} className={styles.ApplicationCard} style={{ border: `1px solid rgba(${categoryColor}, 0.15)`, backgroundColor: `rgba(${categoryColor}, 0.05)` }}>
                                    <span>{indication.icon}</span> {indication.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.VideoPlaceholder}>
                    <Image src={productData.image || '/img/geral/exemplo2.png'} alt={productData.name} width={1280} height={720} />
                </div>
            </section>

            {/* Tabbed Section */}
            <TabbedSection categoryColor={categoryColor} tabDescriptions={tabDescriptions} />

            {/* Technical Specifications */}
            <section className={styles.TechnicalSpecsSection} style={{ backgroundColor: `rgba(${categoryColor}, 1)` }}>
                <div className={styles.TechnicalSpecsWrapper}>
                    <div className={styles.TechnicalSpecsContent}>
                        <div className={styles.Blueprint}>
                            <Image
                                src={technicalSpecs.image || '/img/geral/exemplo3.png'}
                                alt={technicalSpecs.alt || 'Especificações Técnicas'}
                                width={800}
                                height={500}
                            />
                        </div>
                        <div className={styles.SpecDetails}>
                            <h4>Características técnicas</h4>

                            {/* Tabela de especificações */}
                            {technicalSpecs.table && (
                                <table className={styles.TechnicalTable}>
                                    <thead>
                                        <tr>
                                            {technicalSpecs.table.headers.map((header, index) => (
                                                <th key={index}>{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {technicalSpecs.table.rows.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {/* Características especiais */}
                            {technicalSpecs.features && (
                                <div className={styles.TechnicalFeatures}>
                                    {technicalSpecs.features.map((feature, index) => (
                                        <div key={index} className={styles.TechnicalFeature}>
                                            <span className={styles.icon}>{feature.icon}</span>
                                            <span className={styles.text}>{feature.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Downloads */}
                            {technicalSpecs.downloads && (
                                <div className={styles.DownloadSection}>
                                    <h5>Downloads:</h5>
                                    <div className={styles.DownloadButtons}>
                                        {technicalSpecs.downloads.map((download, index) => (
                                            <a
                                                key={index}
                                                href={download.link}
                                                className={styles.DownloadButton}
                                                download
                                            >
                                                <span className={styles.icon}><TbCloudDownload /></span>
                                                {download.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <SobreEmpresa />
            <MainForm />
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
    const { category, product } = await params;
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