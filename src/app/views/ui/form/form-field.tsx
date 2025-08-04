import React from 'react';
import styles from './form-field.module.css';

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    theme?: 'default' | 'light';
}

const FormInput: React.FC<FormInputProps> = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    theme = 'default',
}) => {
    return (
        <div className={`${styles['form-input']} ${styles[theme]}`}>
            <label htmlFor={id} className={`${styles['label']} ${styles[`label-${theme}`]}`}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${styles['input']} ${styles[`input-${theme}`]}`}
            />
            {error && (
                <div className={`${styles['error']} ${styles[`error-${theme}`]}`}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default FormInput;