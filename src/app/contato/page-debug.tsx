'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

const ContatoPageDebug: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        terms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div>
            <section className={styles['contato-hero-section']}>
                <div className={styles['contato-hero-wrapper']}>
                    <h1>Entre em Contato - Debug</h1>
                    <p>Versão de debug para identificar o erro.</p>
                </div>
            </section>

            <section className={styles['contato-form-section']}>
                <div className={styles['contato-form-wrapper']}>
                    <h4>Formulário Simples</h4>
                    
                    <form className={styles['contato-form']}>
                        <div className={styles['contato-form-fields']}>
                            <div>
                                <label htmlFor="name">Nome:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                />
                                <label htmlFor="terms">
                                    Eu aceito a política de privacidade
                                </label>
                            </div>

                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ContatoPageDebug;
