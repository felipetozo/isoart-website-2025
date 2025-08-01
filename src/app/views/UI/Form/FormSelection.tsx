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
    theme?: 'default' | 'light';
    disabled?: boolean;
}

const FormSelection: React.FC<FormSelectionProps> = ({
    id,
    label,
    value,
    onChange,
    options = [],
    error,
    theme = 'default',
    disabled = false,
}) => {
    return (
        <div className={`${styles.formInput} ${styles[theme]}`}>
            <label htmlFor={id} className={`${styles.label} ${styles[`label_${theme}`]}`}>{label}</label>
            <div className={`${styles.selectContainer} ${styles[`selectContainer_${theme}`]}`}>
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`${styles.select} ${styles[`select_${theme}`]}`}
            >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
                <MdKeyboardArrowDown className={`${styles.chevronIcon} ${styles[`chevronIcon_${theme}`]}`} size={20} />
            </div>
            {error && <div className={`${styles.error} ${styles[`error_${theme}`]}`}>{error}</div>}
        </div>
    );
};

export default FormSelection;
