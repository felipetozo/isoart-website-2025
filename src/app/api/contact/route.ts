import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, solution, state, city } = body;

    // Validação dos dados
    if (!name || !email || !solution || !state || !city) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Sanitização dos dados
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? phone.trim() : '';
    const sanitizedSolution = solution.trim();
    const sanitizedState = state.trim();
    const sanitizedCity = city.trim();

    // Query para inserir os dados
    const query = `
      INSERT INTO contact_form_submissions 
      (name, email, phone, solution, state, city, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    const values = [
      sanitizedName,
      sanitizedEmail,
      sanitizedPhone,
      sanitizedSolution,
      sanitizedState,
      sanitizedCity
    ];

    // Executar a query
    const connection = await pool.getConnection();
    
    try {
      await connection.execute(query, values);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Formulário enviado com sucesso!' 
        },
        { status: 200 }
      );
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    
    // Retornar o erro específico para debug
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor. Tente novamente.',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 