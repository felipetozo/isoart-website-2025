import * as React from 'react';
import BaseEmailTemplate from '../base/base-template';
import { ContactPageData } from '../base/email-types';
import styles from './contact.module.css';

interface ContactPageEmailProps {
  data: ContactPageData;
}

function ContactPageEmail({ data }: ContactPageEmailProps) {
  return (
    <BaseEmailTemplate title="Novo Contato - Página de Contato">
      <div className={styles['email-body']}>
        <h2>Recebemos um novo contato da página de contato!</h2>
        
        <div className={styles['contact-info']}>
          <p><strong>Nome:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Telefone/WhatsApp:</strong> {data.phone || 'Não informado'}</p>
          <p><strong>Tema:</strong> {data.theme}</p>
          <p><strong>Estado:</strong> {data.state}</p>
          <p><strong>Cidade:</strong> {data.city}</p>
          <p><strong>Data/Hora:</strong> {data.dataHora}</p>
        </div>
        
        <div className={styles['action-required']}>
          <p><strong>Ação necessária:</strong> Responder ao cliente conforme o tema solicitado.</p>
        </div>
      </div>
    </BaseEmailTemplate>
  );
}

export default ContactPageEmail;
