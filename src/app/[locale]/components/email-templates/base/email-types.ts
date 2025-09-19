// Tipos para formulário da seção
export interface FormSectionData {
  name: string;
  email: string;
  phone: string;
  solution: string;
  state: string;
  city: string;
  terms: boolean;
  dataHora: string;
}

// Tipos para formulário da página de contato
export interface ContactPageData {
  name: string;
  email: string;
  phone: string;
  theme: string;
  state: string;
  city: string;
  terms: boolean;
  dataHora: string;
}

// Tipo genérico para dados de email
export interface EmailData {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  dataHora: string;
}

// Tipo para resposta do envio de email
export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: any;
}
