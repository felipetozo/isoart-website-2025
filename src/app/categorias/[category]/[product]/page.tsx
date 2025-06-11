import { notFound } from 'next/navigation';

interface ProductPageProps {
    params: {
        category: string;
        product: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const { category, product } = params;

    // Simples validação para evitar 404
    if (!category || !product) {
        notFound();
    }

    return (
        <div>
            <h1>Produto: {product} - Categoria: {category}</h1>
            <p>Esta é uma página de exemplo para o produto {product} na categoria {category}.</p>
        </div>
    );
}

// Geração estática de parâmetros (simplificada)
export async function generateStaticParams() {
    return [
        { category: 'telhas-e-paineis', product: 'telhas-termicas' },
        { category: 'construcao-civil', product: 'lajes-em-eps' },
    ];
}