import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

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

    // Fallback com dados estáticos baseado no estado
    const fallbackCities = {
      'PR': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Santa Tereza do Oeste', label: 'Santa Tereza do Oeste' },
        { value: 'Cascavel', label: 'Cascavel' },
        { value: 'Toledo', label: 'Toledo' },
        { value: 'Foz do Iguaçu', label: 'Foz do Iguaçu' },
        { value: 'Curitiba', label: 'Curitiba' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'SC': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Xanxerê', label: 'Xanxerê' },
        { value: 'Chapecó', label: 'Chapecó' },
        { value: 'Florianópolis', label: 'Florianópolis' },
        { value: 'Blumenau', label: 'Blumenau' },
        { value: 'Joinville', label: 'Joinville' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'RS': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Porto Alegre', label: 'Porto Alegre' },
        { value: 'Caxias do Sul', label: 'Caxias do Sul' },
        { value: 'Pelotas', label: 'Pelotas' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'SP': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'São Paulo', label: 'São Paulo' },
        { value: 'Campinas', label: 'Campinas' },
        { value: 'Santos', label: 'Santos' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'RJ': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
        { value: 'Niterói', label: 'Niterói' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'MG': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Belo Horizonte', label: 'Belo Horizonte' },
        { value: 'Uberlândia', label: 'Uberlândia' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'GO': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Goiânia', label: 'Goiânia' },
        { value: 'Anápolis', label: 'Anápolis' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'MT': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Cuiabá', label: 'Cuiabá' },
        { value: 'Várzea Grande', label: 'Várzea Grande' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'MS': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Campo Grande', label: 'Campo Grande' },
        { value: 'Dourados', label: 'Dourados' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'DF': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Brasília', label: 'Brasília' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
      'outros': [
        { value: '', label: 'Selecione uma cidade' },
        { value: 'Outras cidades', label: 'Outras cidades' },
      ],
    };

    const cities = fallbackCities[state as keyof typeof fallbackCities] || [
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