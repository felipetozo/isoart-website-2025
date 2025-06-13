import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menuData.json';
import SobreEmpresa from '@/app/components/SobreEmpresa/SobreEmpresa';
import MainForm from '@/app/components/MainForm/MainForm';
import Button from '@/app/views/UI/Button';

interface ProductData {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    specifications?: {
        [key: string]: string | undefined;
    };
}

interface ProductPageProps {
    params: Promise<{ category: string; product: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, product } = await params;

    let productData: ProductData | undefined;

    try {
        const normalizedCategory = category.toLowerCase().replace(/ /g, '-');
        const normalizedProduct = product.toLowerCase().replace(/ /g, '-');
        const productFile = await import(`@/app/data/products/${normalizedCategory}/${normalizedProduct}.json`);
        productData = productFile.default as ProductData;
    } catch (error) {
        const categoryData = (menuData as any[]).find((item: any) => item.slug === category);
        if (categoryData) {
            productData = categoryData.products.find((p: ProductData) => p.slug === product);
        }
    }

    if (!productData) {
        notFound();
    }

    const heroSection = {
        title: productData.name,
        description: productData.description || 'Detalhes do produto da ISOART.',
        buttonText: 'Solicite um orçamento',
        buttonLink: '/contato',
        backgroundImage: productData.image || '/img/default-product-hero.jpg'
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

            {/* Product Details */}
            <section className={styles.ProductDetailsSection}>
                <div className={styles.ProductDetailsWrapper}>
                    <h2>Especificações</h2>
                    {productData.specifications && (
                        <ul className={styles.ProductSpecs}>
                            {Object.entries(productData.specifications).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    )}
                    {productData.image && (
                        <div className={styles.ProductImage}>
                            <Image
                                src={productData.image}
                                alt={productData.name}
                                width={600}
                                height={400}
                            />
                        </div>
                    )}
                </div>
            </section>

            <SobreEmpresa />
            <MainForm />
        </div>
    );
}

export async function generateStaticParams() {
    const allProducts = (menuData as any[]).flatMap((category: any) =>
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
        const categoryData = (menuData as any[]).find((item: any) => item.slug === category);
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