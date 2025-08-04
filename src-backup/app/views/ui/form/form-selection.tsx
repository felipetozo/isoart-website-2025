'use client';

import React from 'react';
import styles from './form-selection.module.css';
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
        <div className={`${styles['form-input']} ${styles[theme]}`}>
            <label htmlFor={id} className={`${styles['label']} ${styles[`label-${theme}`]}`}>
                {label}
            </label>
            <div className={`${styles['select-container']} ${styles[`select-container-${theme}`]}`}>
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`${styles['select']} ${styles[`select-${theme}`]}`}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <MdKeyboardArrowDown 
                    className={`${styles['chevron-icon']} ${styles[`chevron-icon-${theme}`]}`} 
                    size={20} 
                />
            </div>
            {error && (
                <div className={`${styles['error']} ${styles[`error-${theme}`]}`}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default FormSelection;