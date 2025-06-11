import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menuData.json'; // Import the consolidated menuData.json
import SobreEmpresa from '@/app/components/SobreEmpresa/SobreEmpresa';
import MainForm from '@/app/components/MainForm/MainForm';
import Button from '@/app/views/UI/Button';

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

interface CategoryPageProps {
    params: {
        category: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = params;

    let categoryData: CategoryData | undefined;

    console.log('Tentando carregar categoria:', category);

    try {
        // Normalizar o slug para evitar problemas com maiúsculas/minúsculas
        const normalizedCategory = category.toLowerCase().replace(/ /g, '-');
        console.log('Importando arquivo:', `@/app/data/${normalizedCategory}.json`);

        const specificCategoryData = await import(`@/app/data/categories/${normalizedCategory}.json`);
        categoryData = specificCategoryData.default as CategoryData;
        console.log('Dados carregados do arquivo específico:', categoryData);
    } catch (error) {
        console.error('Erro ao importar arquivo específico:', error);
        // Fallback para menuData.json
        categoryData = (menuData as CategoryData[]).find(
            (item: CategoryData) => item.slug === category
        );
        console.log('Usando dados do menuData.json:', categoryData);
    }

    // Se a categoria não existir, mostrar 404
    if (!categoryData) {
        console.log('Categoria não encontrada:', category);
        notFound();
    }

    // Define default values for hero section if not provided
    const heroSection = categoryData.hero || {
        title: categoryData.title,
        description: categoryData.description || categoryData.categoryDescription || 'Nossas soluções de alta qualidade.',
        buttonText: 'Saiba Mais',
        buttonLink: '/contato',
        backgroundImage: '/img/default-category-hero.jpg'
    };

    // Define default benefits if not provided
    const benefitsSection = categoryData.benefits || [
        { id: 1, title: "Qualidade Superior", description: "Produtos com rigoroso controle de qualidade." },
        { id: 2, title: "Eficiência Garantida", description: "Soluções que entregam o melhor desempenho." }
    ];

    return (
        <div className={styles.CategoryPage}>
            {/* Hero Section */}
            <section
                className={styles.CategoryPageHeroSection}
                style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}
            >
                <div className={styles.CategoryPageHeroMask}></div>
                <div className={styles.CategoryPageHeroContent}>
                    <h1>{heroSection.title}</h1>
                    <p>{heroSection.description}</p>
                    <Link href="/cadastro">
                        <Button variant="primary" size="medium">
                            Entrar em contato
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Main Category Description */}
            {categoryData.categoryDescription && (
                <section className={styles.CategoryDescriptionSection}>
                    <div className={styles.CategoryDescriptionWrapper}>
                        <h2>{categoryData.categoryDescription}</h2>
                    </div>
                </section>
            )}

            {/* Products Grid */}
            <section className={styles['products-section']}>
                <h2 className={styles['products-title']}>Produtos em {categoryData.title}</h2>
                <div className={styles['products-grid']}>
                    {categoryData.products.map((product) => (
                        <article key={product.id} className={styles['product-card']}>
                            {product.image && (
                                <div className={styles['product-image-container']}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={300}
                                        height={200}
                                        className={styles['product-image']}
                                    />
                                </div>
                            )}
                            <div className={styles['product-content']}>
                                <h3 className={styles['product-name']}>{product.name}</h3>
                                <p className={styles['product-description']}>{product.description}</p>
                                <Link
                                    href={`/categorias/${categoryData.slug}/${product.slug}`}
                                    className={styles['product-link']}
                                >
                                    Ver Detalhes →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className={styles['benefits-section']}>
                <h2>Benefícios das Nossas Soluções</h2>
                <div className={styles['benefits-grid']}>
                    {benefitsSection.map((benefit) => (
                        <div key={benefit.id} className={styles['benefit-card']}>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
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

// Dynamic metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
    const { category } = params;

    let categoryData: CategoryData | undefined;

    try {
        const specificCategoryData = await import(`@/app/data/${category}.json`);
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

    // Use the available description fields with fallbacks
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