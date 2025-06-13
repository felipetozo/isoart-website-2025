'use client';

import React from 'react';
import styles from './FormField.module.css';

interface FormSelectionProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
}

const FormSelection: React.FC<FormSelectionProps> = ({
    id,
    label,
    value,
    onChange,
    error
}) => {
    return (
        <div className={styles.formInput}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className={styles.input}
            >
                <option value="" disabled>Solução desejada</option>
                <option value="telhas">Telhas ou Painéis Isotérmicos</option>
                <option value="construcao">Construção Civil</option>
                <option value="forros">Forros</option>
                <option value="molduras">Molduras Decorativas</option>
                <option value="embalagens">Embalagens</option>
                <option value="outro">Outro</option>
            </select>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default FormSelection;
