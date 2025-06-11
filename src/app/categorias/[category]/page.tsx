import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menuData.json'; // Import the consolidated menuData.json

// Definindo os tipos (atualizados para refletir a nova estrutura de dados de categoria)
interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    specifications?: {
        [key: string]: string;
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
    metaDescription?: string; // Made optional as it might not be in every category
    hero?: HeroSection; // Made optional
    categoryDescription?: string; // Made optional
    products: Product[];
    benefits?: Benefit[]; // Made optional
}

interface CategoryPageProps {
    params: {
        category: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = params;

    // Busca a categoria pelos dados no menuData.json
    const categoryData: CategoryData | undefined = (menuData as CategoryData[]).find(
        (item: CategoryData) => item.slug === category
    );

    // Se a categoria não existir, mostra página 404
    if (!categoryData) {
        notFound();
    }

    // You might want to define default values for hero/benefits if they are optional
    const heroSection = categoryData.hero || {
        title: categoryData.title,
        description: categoryData.description || 'Nossas soluções de alta qualidade.',
        buttonText: 'Saiba Mais',
        buttonLink: '/contato',
        backgroundImage: '/img/default-category-hero.jpg' // Provide a default image
    };

    const benefitsSection = categoryData.benefits || [
        // Default benefits if not provided in JSON
        { id: 1, title: "Qualidade Superior", description: "Produtos com rigoroso controle de qualidade." },
        { id: 2, title: "Eficiência Garantida", description: "Soluções que entregam o melhor desempenho." }
    ];

    return (
        <div className="category-page">
            {/* Hero Section */}
            <section className="category-hero" style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>{heroSection.title}</h1>
                    <p>{heroSection.description}</p>
                    <Link href={heroSection.buttonLink}>
                        <button className="hero-button">{heroSection.buttonText}</button>
                    </Link>
                </div>
            </section>

            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link href="/" className="breadcrumb-link">Início</Link>
                <span className="breadcrumb-separator"> / </span>
                <Link href="/categorias" className="breadcrumb-link">Categorias</Link>
                <span className="breadcrumb-separator"> / </span>
                <span className="breadcrumb-current">{categoryData.title}</span>
            </nav>

            {/* Main Category Description */}
            {categoryData.categoryDescription && (
                <section className="category-description-section">
                    <h2>{categoryData.title}</h2>
                    <p>{categoryData.categoryDescription}</p>
                </section>
            )}


            {/* Products Grid */}
            <section className="products-section">
                <h2 className="products-title">Produtos em {categoryData.title}</h2>
                <div className="products-grid">
                    {categoryData.products.map((product) => (
                        <article key={product.id} className="product-card">
                            {product.image && (
                                <div className="product-image-container">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={300}
                                        height={200}
                                        className="product-image"
                                    />
                                </div>
                            )}
                            <div className="product-content">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <Link
                                    href={`/categorias/${categoryData.slug}/${product.slug}`}
                                    className="product-link"
                                >
                                    Ver Detalhes →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <h2>Benefícios das Nossas Soluções</h2>
                <div className="benefits-grid">
                    {benefitsSection.map((benefit) => (
                        <div key={benefit.id} className="benefit-card">
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="category-contact">
                <div className="contact-card">
                    <h3>Precisa de mais informações?</h3>
                    <p>Entre em contato conosco para receber um orçamento personalizado</p>
                    <Link href="/contato" className="contact-button">
                        Solicitar Orçamento
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Function to generate static paths for category pages
export async function generateStaticParams() {
    // Directly use the imported menuData for generating category paths
    return (menuData as CategoryData[]).map((category: CategoryData) => ({
        category: category.slug,
    }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
    const { category } = params;

    const categoryData: CategoryData | undefined = (menuData as CategoryData[]).find(
        (item: CategoryData) => item.slug === category
    );

    if (!categoryData) {
        return {
            title: 'Categoria não encontrada - ISOART',
        };
    }

    return {
        title: `${categoryData.title} - ISOART`,
        description: categoryData.metaDescription || categoryData.description,
        openGraph: {
            title: `${categoryData.title} - ISOART`,
            description: categoryData.metaDescription || categoryData.description,
            images: categoryData.image ? [categoryData.image] : [],
        },
    };
}