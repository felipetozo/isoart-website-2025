import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Caminho para o arquivo JSON
    const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'states.json');

    // Ler o arquivo JSON
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const statesData = JSON.parse(fileContent);

    return NextResponse.json(statesData.states);

  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    
    // Fallback com dados estáticos
    const fallbackStates = [
      { value: '', label: 'Selecione um estado' },
      { value: 'PR', label: 'Paraná' },
      { value: 'SC', label: 'Santa Catarina' },
      { value: 'RS', label: 'Rio Grande do Sul' },
      { value: 'SP', label: 'São Paulo' },
      { value: 'RJ', label: 'Rio de Janeiro' },
      { value: 'MG', label: 'Minas Gerais' },
      { value: 'GO', label: 'Goiás' },
      { value: 'MT', label: 'Mato Grosso' },
      { value: 'MS', label: 'Mato Grosso do Sul' },
      { value: 'DF', label: 'Distrito Federal' },
      { value: 'outros', label: 'Outros' },
    ];

    return NextResponse.json(fallbackStates);
  }
} 