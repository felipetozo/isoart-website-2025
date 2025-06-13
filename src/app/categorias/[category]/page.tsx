import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menuData.json';
import SobreEmpresa from '@/app/components/SobreEmpresa/SobreEmpresa';
import MainForm from '@/app/components/MainForm/MainForm';
import Button from '@/app/views/UI/Button';
import { TbWindOff } from "react-icons/tb";
import { TbShieldShare } from "react-icons/tb";
import { TbTopologyStarRing2 } from "react-icons/tb";

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
    icon?: string; // Optional icon field for future JSON updates
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

// Fix: Change params to be a Promise in Next.js 15
interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

// Color mapping based on category slugs - FIXED: Using RGB values instead of CSS variables
const categoryColorMap: { [key: string]: string } = {
    'telhas-e-paineis': '159, 139, 84',
    'construcao-civil': '134, 188, 37',
    'forros': '03, 174, 251',
    'molduras-decorativas': '37, 61, 107',
    'embalagens-em-eps': '196, 213, 86',
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

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;

    let categoryData: CategoryData | undefined;

    console.log('Tentando carregar categoria:', category);

    try {
        const normalizedCategory = category.toLowerCase().replace(/ /g, '-');
        console.log('Importando arquivo:', `@/app/data/categories/${normalizedCategory}.json`);

        const specificCategoryData = await import(`@/app/data/categories/${normalizedCategory}.json`);
        categoryData = specificCategoryData.default as CategoryData;
        console.log('Dados carregados do arquivo específico:', categoryData);
    } catch (error) {
        console.error('Erro ao importar arquivo específico:', error);
        categoryData = (menuData as CategoryData[]).find(
            (item: CategoryData) => item.slug === category
        );
        console.log('Usando dados do menuData.json:', categoryData);
    }

    if (!categoryData) {
        console.log('Categoria não encontrada:', category);
        notFound();
    }

    const heroSection = categoryData.hero || {
        title: categoryData.title,
        description: categoryData.description || categoryData.categoryDescription || 'Nossas soluções de alta qualidade.',
        buttonText: 'Solicite um orçamento',
        buttonLink: '/contato',
        backgroundImage: '/img/default-category-hero.jpg'
    };

    const benefitsSection = categoryData.benefits || [
        { id: 1, title: "Qualidade Superior", description: "Produtos com rigoroso controle de qualidade." },
        { id: 2, title: "Eficiência Garantida", description: "Soluções que entregam o melhor desempenho." }
    ];

    // Get the category color (default to a neutral color if not found)
    const categoryColor = categoryColorMap[categoryData.slug] || '17, 17, 17';
    console.log('Category Color for', categoryData.slug, ':', categoryColor); // Debug log

    return (
        <div className={styles.CategoryPage} style={{ '--button-background': `rgb(${categoryColor})` } as React.CSSProperties}>
            {/* Hero Section */}
            <section
                className={styles.CategoryPageHeroSection}
                style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}
            >
                <div className={styles.CategoryPageHeroMask}></div>
                <div className={styles.CategoryPageHeroContent}>
                    <h1>{heroSection.title}</h1>
                    <p>{heroSection.description}</p>
                    <Link href={heroSection.buttonLink || '/contato'}>
                        <Button
                            variant="primary"
                            size="medium"
                        >
                            {heroSection.buttonText || 'Entrar em contato'}
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Main Category Description */}
            {categoryData.categoryDescription && (
                <section className={styles.CategoryDescriptionSection}>
                    <div className={styles.CategoryDescriptionWrapper}>
                        <h2 style={{ color: `rgba(${categoryColor}, 1)` }}>{categoryData.categoryDescription}</h2>
                    </div>
                </section>
            )}

            {/* Products Grid */}
            <section className={styles.CategoryProductsSection}>
                <div className={styles.CategoryProductsWrapper}>
                    <div className={styles.CategoryProductsGrid}>
                        {categoryData.products.map((product) => (
                            <article key={product.id} className={styles.CategoryProductsGridCard}>
                                <Link href={`/categorias/${categoryData.slug}/${product.slug}`}>
                                    <div className={styles.CategoryProductsGridContent}>
                                        <h4 style={{ color: `rgba(${categoryColor}, 1)` }}>{product.name}</h4>
                                        <p>{product.description}</p>
                                    </div>
                                    {product.image && (
                                        <div className={styles.CategoryProductsGridImg}>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={300}
                                                height={200}
                                            />
                                        </div>
                                    )}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={styles.BenefitsSection}>
                <div className={styles.BenefitsWrapper}>
                    {benefitsSection.map((benefit) => (
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

            <SobreEmpresa />
            <MainForm />
        </div>
    );
}

// Function to generate static paths for category pages
export async function generateStaticParams() {
    return (menuData as CategoryData[]).map((category: CategoryData) => ({
        category: category.slug,
    }));
}

// Dynamic metadata for SEO - Also fix params here
export async function generateMetadata({ params }: CategoryPageProps) {
    const { category } = await params;

    let categoryData: CategoryData | undefined;

    try {
        const specificCategoryData = await import(`@/app/data/categories/${category}.json`);
        categoryData = specificCategoryData.default as CategoryData;
    } catch (error) {
        categoryData = (menuData as CategoryData[]).find(
            (item: CategoryData) => item.slug === category
        );
    }

    if (!categoryData) {
        return {
            title: 'Categoria não encontrada - ISOART',
        };
    }

    const description = categoryData.metaDescription ||
        categoryData.description ||
        categoryData.categoryDescription ||
        `Produtos e soluções em ${categoryData.title}`;

    return {
        title: `${categoryData.title} - ISOART`,
        description: description,
        openGraph: {
            title: `${categoryData.title} - ISOART`,
            description: description,
            images: categoryData.image ? [categoryData.image] : [],
        },
    };
}