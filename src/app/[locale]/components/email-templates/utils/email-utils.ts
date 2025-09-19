import { FormSectionData, ContactPageData } from '../base/email-types';

// Função para gerar HTML do email do formulário da seção
export function generateFormSectionEmailHTML(data: FormSectionData): string {
  return `
    <div style="background-color: white; color: black; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: black; font-size: 24px; margin: 0; text-align: center;">Novo Contato - Seção Principal</h1>
      </div>
      
      <div style="background-color: white; color: black; padding: 20px 0; line-height: 1.6;">
        <h2 style="color: black; font-size: 20px; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">Recebemos um novo contato do site!</h2>
        
        <div style="background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin: 15px 0;">
          <p style="margin: 8px 0; color: black;"><strong>Nome:</strong> ${data.name}</p>
          <p style="margin: 8px 0; color: black;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 8px 0; color: black;"><strong>Telefone/WhatsApp:</strong> ${data.phone || 'Não informado'}</p>
          <p style="margin: 8px 0; color: black;"><strong>Solução desejada:</strong> ${data.solution}</p>
          <p style="margin: 8px 0; color: black;"><strong>Estado:</strong> ${data.state}</p>
          <p style="margin: 8px 0; color: black;"><strong>Cidade:</strong> ${data.city}</p>
          <p style="margin: 8px 0; color: black;"><strong>Data/Hora:</strong> ${data.dataHora}</p>
        </div>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 15px 0;">
          <p style="margin: 0; color: #856404;"><strong>Ação necessária:</strong> Entrar em contato com o cliente para mais informações sobre a solução desejada.</p>
        </div>
      </div>
      
      <div style="border-top: 1px solid #ccc; padding-top: 15px; margin-top: 20px; text-align: center;">
        <p style="color: #666; font-size: 14px; margin: 0;">
          <strong>Isoart</strong><br />
          Soluções Térmicas com EPS e PIR
        </p>
      </div>
    </div>
  `;
}

// Função para gerar HTML do email da página de contato
export function generateContactPageEmailHTML(data: ContactPageData): string {
  return `
    <div style="background-color: white; color: black; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: black; font-size: 24px; margin: 0; text-align: center;">Novo Contato - Página de Contato</h1>
      </div>
      
      <div style="background-color: white; color: black; padding: 20px 0; line-height: 1.6;">
        <h2 style="color: black; font-size: 20px; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">Recebemos um novo contato da página de contato!</h2>
        
        <div style="background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin: 15px 0;">
          <p style="margin: 8px 0; color: black;"><strong>Nome:</strong> ${data.name}</p>
          <p style="margin: 8px 0; color: black;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 8px 0; color: black;"><strong>Telefone/WhatsApp:</strong> ${data.phone || 'Não informado'}</p>
          <p style="margin: 8px 0; color: black;"><strong>Tema:</strong> ${data.theme}</p>
          <p style="margin: 8px 0; color: black;"><strong>Estado:</strong> ${data.state}</p>
          <p style="margin: 8px 0; color: black;"><strong>Cidade:</strong> ${data.city}</p>
          <p style="margin: 8px 0; color: black;"><strong>Data/Hora:</strong> ${data.dataHora}</p>
        </div>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 15px 0;">
          <p style="margin: 0; color: #856404;"><strong>Ação necessária:</strong> Responder ao cliente conforme o tema solicitado.</p>
        </div>
      </div>
      
      <div style="border-top: 1px solid #ccc; padding-top: 15px; margin-top: 20px; text-align: center;">
        <p style="color: #666; font-size: 14px; margin: 0;">
          <strong>Isoart</strong><br />
          Soluções Térmicas com EPS e PIR
        </p>
      </div>
    </div>
  `;
}

// Função para mapear solução para texto legível
export function mapSolutionToText(solution: string): string {
  const solutionMap: { [key: string]: string } = {
    'telhas-e-paineis': 'Telhas e Painéis',
    'construcao-civil': 'Construção Civil',
    'molduras': 'Molduras Decorativas',
    'embalagens': 'Embalagens em EPS'
  };
  
  return solutionMap[solution] || solution;
}

// Função para mapear tema para texto legível
export function mapThemeToText(theme: string): string {
  const themeMap: { [key: string]: string } = {
    'duvidas': 'Dúvidas Gerais',
    'orcamento': 'Solicitação de Orçamento',
    'suporte': 'Suporte Técnico',
    'parceria': 'Proposta de Parceria',
    'outros': 'Outros Assuntos'
  };
  
  return themeMap[theme] || theme;
}
