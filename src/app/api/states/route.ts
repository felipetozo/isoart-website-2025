import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Buscar estados únicos da tabela municipios
      const [rows] = await connection.execute(`
        SELECT DISTINCT 
          uf as value, 
          uf as label 
        FROM municipios 
        WHERE uf IS NOT NULL AND uf != '' 
        ORDER BY uf
      `);

      // Adicionar opção padrão
      const states = [
        { value: '', label: 'Selecione um estado' },
        ...(rows as any[])
      ];

      return NextResponse.json(states);
    } finally {
      connection.release();
    }

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