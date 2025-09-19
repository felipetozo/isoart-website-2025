import { generateFormSectionEmailHTML, generateContactPageEmailHTML } from './email-utils';
import { FormSectionData, ContactPageData } from '../base/email-types';

// Função principal para gerar email do formulário da seção
export function createFormSectionEmail(data: FormSectionData) {
  return {
    to: 'felipetozo@icloud.com',
    subject: 'Novo Contato - Formulário de contato',
    html: generateFormSectionEmailHTML(data)
  };
}

// Função principal para gerar email da página de contato
export function createContactPageEmail(data: ContactPageData) {
  return {
    to: 'felipetozo@icloud.com',
    subject: 'Novo Contato - Página de Contato',
    html: generateContactPageEmailHTML(data)
  };
}
