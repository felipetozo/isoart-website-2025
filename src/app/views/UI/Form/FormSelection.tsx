'use client';

import React from 'react';
import styles from './FormSelection.module.css';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface FormSelectionProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    error?: string;
}

const FormSelection: React.FC<FormSelectionProps> = ({
    id,
    label,
    value,
    onChange,
    options = [],
    error
}) => {
    return (
        <div className={styles.formInput}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <div className={styles.selectContainer}>
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                    className={styles.select}
            >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
                <MdKeyboardArrowDown className={styles.chevronIcon} size={20} />
            </div>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default FormSelection;
