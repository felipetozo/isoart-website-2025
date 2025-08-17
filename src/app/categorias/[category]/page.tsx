import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menu-data.json';
import SobreEmpresa from '@/app/components/sobre-empresa/sobre-empresa';
import ContactComponent from '@/app/components/contact/contact-component';
import Button from '@/app/views/ui/button/button';
import BenefitsSection from '@/app/components/benefits-section/benefits-section';
import IncendioComponent from '@/app/components/pir-incendio/pir-incendio';

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

// Fix: Change params to be a Promise in Next.js 15
interface CategoryPageProps {
    params: { category: string };
}

async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = params;

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
        backgroundImage: '/img/default-category-hero.avif'
    };

    const benefitsSection = categoryData.benefits || [
        { id: 1, title: "Qualidade Superior", description: "Produtos com rigoroso controle de qualidade." },
        { id: 2, title: "Eficiência Garantida", description: "Soluções que entregam o melhor desempenho." }
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
                    <Link href={heroSection.buttonLink || '/contato'}>
                        <Button variant="primary" size="medium">
                            {heroSection.buttonText || 'Solicite um orçamento'}
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
                                <Link href={`/categorias/${categoryData.slug}/${product.slug}`}>
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
            <SobreEmpresa />
            <ContactComponent />
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
    const { category } = params;

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

export default CategoryPage;