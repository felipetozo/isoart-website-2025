import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { sendMail } from '@/lib/smtp';
import { createContactPageEmail } from '@/app/[locale]/components/email-templates/utils/email-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, theme, state, city, terms } = body;

    // Validação dos dados
    if (!name || !email || !theme || !state || !city || !terms) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      );
    }

    // Validação de email mais robusta
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido. Use um formato válido como: exemplo@empresa.com' },
        { status: 400 }
      );
    }

    // Validação de domínio de email (verificar se termina com extensão válida)
    const domainRegex = /\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email deve terminar com uma extensão válida (ex: .com, .br, .org)' },
        { status: 400 }
      );
    }

    // Sanitização dos dados
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? phone.trim() : '';
    const sanitizedTheme = theme.trim();
    const sanitizedState = state.trim();
    const sanitizedCity = city.trim();

    // Caminho para o arquivo JSON (diretório público)
    const filePath = path.join(process.cwd(), 'public', 'data', 'forms', 'contact-page-submissions.json');

    // Ler o arquivo existente ou criar novo
    let submissionsData;
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      submissionsData = JSON.parse(fileContent);
    } catch (error) {
      // Se o arquivo não existir, criar estrutura inicial
      submissionsData = { submissions: [] };
    }

    // Gerar ID sequencial
    const nextId = submissionsData.submissions.length + 1;
    const id = nextId.toString().padStart(2, '0'); // 01, 02, 03, etc.

    // Criar timestamp em português
    const now = new Date();
    const dataHora = now.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Criar nova submissão
    const newSubmission = {
      id: id,
      nome: sanitizedName,
      email: sanitizedEmail,
      telefone: sanitizedPhone,
      tema: sanitizedTheme,
      estado: sanitizedState,
      cidade: sanitizedCity,
      aceitou_termos: terms,
      origem: 'pagina-contato',
      data_hora: dataHora
    };

    // Enviar email de notificação PRIMEIRO (independente do JSON)
    try {
      const emailData = createContactPageEmail({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        theme: sanitizedTheme,
        state: sanitizedState,
        city: sanitizedCity,
        terms: terms,
        dataHora: dataHora
      });
      
      await sendMail(emailData.to, emailData.subject, emailData.html);
      console.log('Email de notificação enviado com sucesso');
    } catch (emailError) {
      console.error('Erro ao enviar email de notificação:', emailError);
      // Não falha o processo se o email não for enviado
    }

    // Salvar no arquivo JSON (opcional - pode falhar sem afetar o email)
    try {
      submissionsData.submissions.push(newSubmission);
      await fs.writeFile(filePath, JSON.stringify(submissionsData, null, 2), 'utf-8');
      console.log('Dados salvos no JSON com sucesso');
    } catch (jsonError) {
      console.error('Erro ao salvar no JSON (não crítico):', jsonError);
      // JSON é opcional - email já foi enviado
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Formulário enviado com sucesso!' 
      },
      { status: 200 }
    );

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