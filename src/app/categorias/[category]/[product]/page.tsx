import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menuData.json'; // Import the consolidated menuData.json

// Define types (re-using from category page for consistency)
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
    metaDescription?: string;
    hero?: HeroSection;
    categoryDescription?: string;
    products: Product[];
    benefits?: Benefit[];
}

interface ProductPageProps {
    params: {
        category: string;
        product: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, product } = params;

    // Fetch the specific category data from menuData.json
    const categoryData: CategoryData | undefined = (menuData as CategoryData[]).find(
        (item: CategoryData) => item.slug === category
    );

    if (!categoryData) {
        notFound();
    }

    // Find the product within that category's data
    const productData: Product | undefined = categoryData.products.find(
        (item: Product) => item.slug === product
    );

    if (!productData) {
        notFound();
    }

    return (
        <div className="product-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link href="/">Início</Link>
                <span> / </span>
                <Link href="/categorias">Categorias</Link>
                <span> / </span>
                <Link href={`/categorias/${category}`}>{categoryData.title}</Link>
                <span> / </span>
                <span>{productData.name}</span>
            </nav>

            {/* Product Content */}
            <div className="product-content">
                <div className="product-images">
                    {productData.image && (
                        <Image
                            src={productData.image}
                            alt={productData.name}
                            width={600}
                            height={400}
                            className="main-product-image"
                        />
                    )}
                </div>

                <div className="product-info">
                    <h1>{productData.name}</h1>
                    <p className="product-description">{productData.description}</p>

                    {/* Specifications */}
                    {productData.specifications && Object.keys(productData.specifications).length > 0 && (
                        <div className="specifications">
                            <h3>Especificações Técnicas</h3>
                            <dl className="specs-list">
                                {Object.entries(productData.specifications).map(([key, value]) => (
                                    <div key={key} className="spec-item">
                                        <dt>{key}:</dt>
                                        <dd>{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}

                    {/* Contact Button */}
                    <div className="product-actions">
                        <Link href="/contato" className="contact-button">
                            Solicitar Orçamento
                        </Link>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <section className="related-products">
                <h2>Outros produtos em {categoryData.title}</h2>
                <div className="products-grid">
                    {categoryData.products
                        .filter((p) => p.slug !== product)
                        .slice(0, 3) // Show up to 3 related products
                        .map((relatedProduct) => (
                            <div key={relatedProduct.id} className="product-card">
                                {relatedProduct.image && (
                                    <Image
                                        src={relatedProduct.image}
                                        alt={relatedProduct.name}
                                        width={200}
                                        height={150}
                                    />
                                )}
                                <h4>{relatedProduct.name}</h4>
                                <Link href={`/categorias/${category}/${relatedProduct.slug}`}>
                                    Ver Produto →
                                </Link>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}

// Generate static params for all products (requires reading all category JSONs)
export async function generateStaticParams() {
    const params: Array<{ category: string; product: string }> = [];

    // Directly use the imported menuData for generating all product paths
    (menuData as CategoryData[]).forEach((category: CategoryData) => {
        if (category.products) {
            category.products.forEach((product: Product) => {
                params.push({
                    category: category.slug,
                    product: product.slug,
                });
            });
        }
    });
    return params;
}

// Dynamic metadata for product page
export async function generateMetadata({ params }: ProductPageProps) {
    const { category, product } = params;
    const categoryData: CategoryData | undefined = (menuData as CategoryData[]).find(
        (item: CategoryData) => item.slug === category
    );

    if (!categoryData) {
        return {
            title: 'Produto não encontrado - ISOART', // Fallback for missing category
        };
    }

    const productData: Product | undefined = categoryData.products.find(
        (item: Product) => item.slug === product
    );

    if (!productData) {
        return {
            title: 'Produto não encontrado - ISOART',
        };
    }

    return {
        title: `${productData.name} - ${categoryData.title} - ISOART`,
        description: productData.description,
        openGraph: {
            title: `${productData.name} - ${categoryData.title} - ISOART`,
            description: productData.description,
            images: productData.image ? [productData.image] : [],
        },
    };
}