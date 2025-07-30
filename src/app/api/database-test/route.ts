import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Listar todas as tabelas do banco
      const [tables] = await connection.execute(`
        SHOW TABLES
      `);

      // Verificar se existe a tabela municipios
      const [municipiosCheck] = await connection.execute(`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = 'isoart_site' AND table_name = 'municipios'
      `);

      // Se existir, buscar alguns dados de exemplo
      let municipiosData = null;
      if ((municipiosCheck as any[])[0]?.count > 0) {
        const [municipiosRows] = await connection.execute(`
          SELECT uf, municipio FROM municipios LIMIT 10
        `);
        municipiosData = municipiosRows;
      }

      return NextResponse.json({
        success: true,
        tables: tables,
        municipiosExists: (municipiosCheck as any[])[0]?.count > 0,
        municipiosSample: municipiosData
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Erro ao testar banco:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao conectar com o banco',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 