import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');

    if (!state) {
      return NextResponse.json(
        { error: 'Estado é obrigatório' },
        { status: 400 }
      );
    }

    // Caminho para o arquivo JSON
    const filePath = path.join(process.cwd(), 'src', 'app', '[locale]', 'data', 'cities.json');

    // Ler o arquivo JSON
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const citiesData = JSON.parse(fileContent);

    const cities = citiesData.cities[state] || [
      { value: '', label: 'Selecione uma cidade' },
      { value: 'Outras cidades', label: 'Outras cidades' },
    ];

    return NextResponse.json(cities);

  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    
    return NextResponse.json(
      [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ]
    );
  }
} 