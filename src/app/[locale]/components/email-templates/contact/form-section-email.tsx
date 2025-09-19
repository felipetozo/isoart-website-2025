import * as React from 'react';
import BaseEmailTemplate from '../base/base-template';
import { FormSectionData } from '../base/email-types';
import styles from './contact.module.css';

interface FormSectionEmailProps {
  data: FormSectionData;
}

function FormSectionEmail({ data }: FormSectionEmailProps) {
  return (
    <BaseEmailTemplate title="Novo Contato - Seção Principal">
      <div className={styles['email-body']}>
        <h2>Recebemos um novo contato do site!</h2>
        
        <div className={styles['contact-info']}>
          <p><strong>Nome:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Telefone/WhatsApp:</strong> {data.phone || 'Não informado'}</p>
          <p><strong>Solução desejada:</strong> {data.solution}</p>
          <p><strong>Estado:</strong> {data.state}</p>
          <p><strong>Cidade:</strong> {data.city}</p>
          <p><strong>Data/Hora:</strong> {data.dataHora}</p>
        </div>
        
        <div className={styles['action-required']}>
          <p><strong>Ação necessária:</strong> Entrar em contato com o cliente para mais informações sobre a solução desejada.</p>
        </div>
      </div>
    </BaseEmailTemplate>
  );
}

export default FormSectionEmail;
