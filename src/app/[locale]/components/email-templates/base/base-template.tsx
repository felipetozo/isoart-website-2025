import * as React from 'react';
import styles from './base-template.module.css';

interface BaseEmailProps {
  children: React.ReactNode;
  title: string;
}

function BaseEmailTemplate({ children, title }: BaseEmailProps) {
  return (
    <div className={styles['email-container']}>
      <div className={styles['email-header']}>
        <h1 className={styles['email-title']}>{title}</h1>
      </div>
      
      <div className={styles['email-content']}>
        {children}
      </div>
      
      <div className={styles['email-footer']}>
        <p className={styles['footer-text']}>
          <strong>Isoart</strong><br />
          Soluções Térmicas com EPS e PIR
        </p>
      </div>
    </div>
  );
}

export default BaseEmailTemplate;
