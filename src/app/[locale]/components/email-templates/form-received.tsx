import * as React from 'react';
import styles from './page.module.css';

interface EmailProps {
  firstName: string;
  email: string;
  phone: string;
  solution: string;
  state: string;
  city: string;
}

function FormReceivedEmail({ firstName, email, phone, solution, state, city }: EmailProps) {
  return (
    <section className={styles['email-header']}>
    <div>
      <h1>Recebemos um novo contato do site!</h1>
      <ul>
        <li><strong>Nome:</strong>{firstName}</li>
        <li><strong>E-Mail:</strong>{email}</li>
        <li><strong>Telefone/Whatsapp:</strong>{phone}</li>
        <li><strong>Solução desejada:</strong>{solution}</li>
        <li><strong>Estado:</strong>{state}</li>
        <li><strong>Cidade:</strong>{city}</li>
      </ul>
    </div>
    </section>
  );
};

export default FormReceivedEmail;