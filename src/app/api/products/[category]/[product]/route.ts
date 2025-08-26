import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ category: string; product: string }> }
) {
    try {
        const { category, product } = await params;
        
        // Construir o caminho para o arquivo JSON do produto
        const productFilePath = path.join(process.cwd(), 'src', 'app', '[locale]', 'data', 'products', category, `${product}.json`);
        
        // Verificar se o arquivo existe
        if (!fs.existsSync(productFilePath)) {
            return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
        }
        
        // Ler o arquivo JSON
        const productData = fs.readFileSync(productFilePath, 'utf-8');
        const parsedData = JSON.parse(productData);
        
        return NextResponse.json(parsedData);
    } catch (error) {
        console.error('Erro ao carregar dados do produto:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
