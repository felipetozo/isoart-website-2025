import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ category: string; product: string }> }
) {
    try {
        const { category, product } = await params;
        
        // Tentar diferentes caminhos possíveis para a Vercel
        const possiblePaths = [
            // Caminho padrão (localhost)
            path.join(process.cwd(), 'src', 'app', '[locale]', 'data', 'products', category, `${product}.json`),
            // Caminho alternativo 1 (Vercel pode ter estrutura diferente)
            path.join(process.cwd(), 'src', 'app', 'data', 'products', category, `${product}.json`),
            // Caminho alternativo 2 (Vercel pode ter diretório diferente)
            path.join(process.cwd(), 'data', 'products', category, `${product}.json`),
            // Caminho alternativo 3 (Vercel pode ter estrutura flat)
            path.join(process.cwd(), 'products', category, `${product}.json`)
        ];
        
        let productFilePath = '';
        let fileExists = false;
        
        // Tentar cada caminho
        for (const testPath of possiblePaths) {
            if (fs.existsSync(testPath)) {
                productFilePath = testPath;
                fileExists = true;
                break;
            }
        }
        
        if (!fileExists) {
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
