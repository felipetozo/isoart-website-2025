'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import FormField from '@/app/[locale]/views/ui/form/form-field';
import FormSelection from '@/app/[locale]/views/ui/form/form-selection';
import Button from '@/app/[locale]/views/ui/button/button';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread, MdLocationOn } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';
import Toast from '@/app/[locale]/views/ui/toast/toast';
import { useTranslations } from 'next-intl';

interface FormData {
    name: string;
    email: string;
    phone: string;
    theme: string;
    state: string;
    city: string;
    terms: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    theme?: string;
    state?: string;
    city?: string;
    terms?: string;
    submit?: string;
}

interface ContactFormProps {
    locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        theme: '',
        state: '',
        city: '',
        terms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [states, setStates] = useState<Array<{value: string, label: string}>>([]);
    const [loadingStates, setLoadingStates] = useState(false);

    const themes = [
        { value: 'telhas-e-paineis', label: 'Telhas e Painéis' },
        { value: 'construcao-civil', label: 'Construção Civil' },
        { value: 'forros', label: 'Forros' },
        { value: 'molduras', label: 'Molduras' },
        { value: 'embalagens', label: 'Embalagens' },
    ];

    // Estados serão carregados dinamicamente da API

    const cities = {
        PR: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'curitiba', label: 'Curitiba' },
            { value: 'londrina', label: 'Londrina' },
            { value: 'maringa', label: 'Maringá' },
            { value: 'ponta-grossa', label: 'Ponta Grossa' },
        ],
        SP: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'sao-paulo', label: 'São Paulo' },
            { value: 'campinas', label: 'Campinas' },
            { value: 'santos', label: 'Santos' },
            { value: 'ribeirao-preto', label: 'Ribeirão Preto' },
        ],
        SC: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'florianopolis', label: 'Florianópolis' },
            { value: 'joinville', label: 'Joinville' },
            { value: 'blumenau', label: 'Blumenau' },
            { value: 'criciuma', label: 'Criciúma' },
        ],
        RS: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'porto-alegre', label: 'Porto Alegre' },
            { value: 'caxias-do-sul', label: 'Caxias do Sul' },
            { value: 'pelotas', label: 'Pelotas' },
            { value: 'santa-maria', label: 'Santa Maria' },
        ],
        MG: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'belo-horizonte', label: 'Belo Horizonte' },
            { value: 'uberlandia', label: 'Uberlândia' },
            { value: 'contagem', label: 'Contagem' },
            { value: 'juiz-de-fora', label: 'Juiz de Fora' },
        ],
        RJ: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'rio-de-janeiro', label: 'Rio de Janeiro' },
            { value: 'niteroi', label: 'Niterói' },
            { value: 'nova-iguacu', label: 'Nova Iguaçu' },
            { value: 'duque-de-caxias', label: 'Duque de Caxias' },
        ],
    };

    // Estados serão carregados dinamicamente da API
    useEffect(() => {
        const fetchStates = async () => {
            setLoadingStates(true);
            try {
                const response = await fetch('/api/states');
                const data = await response.json();
                setStates(data);
            } catch (error) {
                console.error('Erro ao carregar estados:', error);
                // Fallback para estados estáticos
                setStates([
                    { value: 'PR', label: 'Paraná' },
                    { value: 'SP', label: 'São Paulo' },
                    { value: 'SC', label: 'Santa Catarina' },
                    { value: 'RS', label: 'Rio Grande do Sul' },
                    { value: 'MG', label: 'Minas Gerais' },
                    { value: 'RJ', label: 'Rio de Janeiro' },
                ]);
            } finally {
                setLoadingStates(false);
            }
        };

        fetchStates();
    }, []);

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpar erro do campo quando o usuário começar a digitar
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Telefone é obrigatório';
        }

        if (!formData.theme) {
            newErrors.theme = 'Tema é obrigatório';
        }

        if (!formData.state) {
            newErrors.state = 'Estado é obrigatório';
        }

        if (!formData.city) {
            newErrors.city = 'Cidade é obrigatória';
        }

        if (!formData.terms) {
            newErrors.terms = 'Você deve aceitar os termos';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact-page', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    locale,
                }),
            });

            if (response.ok) {
                setShowToast(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    theme: '',
                    state: '',
                    city: '',
                    terms: false,
                });
                setErrors({});
            } else {
                throw new Error('Erro ao enviar formulário');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setErrors({ submit: 'Erro ao enviar formulário. Tente novamente.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const t = useTranslations('contactPage.form');

    return (
        <>
            {/* Hero Section */}
            <section className={styles['hero-section']}>
                <div className={styles['hero-mask']}>
                    <div className={styles['hero-wrapper']}>
                        <h2 className={styles['hero-title']}>{t('hero.title')}</h2>
                        <p className={styles['hero-description']}>
                            {t('hero.description')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className={styles['form-section']}>
                <div className={styles['form-wrapper']}>
                    <div className={styles['form-container']}>
                        <form onSubmit={handleSubmit} className={styles['contact-form']}>
                            <div className={styles['form-row']}>
                                <FormField
                                    id="name"
                                    label={t('name')}
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    error={errors.name}
                                />
                                <FormField
                                    id="email"
                                    label={t('email')}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    error={errors.email}
                                />
                            </div>

                            <div className={styles['form-row']}>
                                <FormField
                                    id="phone"
                                    label={t('phone')}
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    error={errors.phone}
                                />
                                <FormSelection
                                    id="theme"
                                    label={t('subject')}
                                    value={formData.theme}
                                    onChange={(e) => handleInputChange('theme', e.target.value)}
                                    options={themes}
                                    error={errors.theme}
                                />
                            </div>

                            <div className={styles['form-row']}>
                                <FormSelection
                                    id="state"
                                    label="Estado"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    options={states}
                                    error={errors.state}
                                />
                                <FormSelection
                                    id="city"
                                    label="Cidade"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    options={formData.state ? cities[formData.state as keyof typeof cities] || [] : []}
                                    error={errors.city}
                                    disabled={!formData.state}
                                />
                            </div>

                            <div className={styles['form-row']}>
                                <div className={styles['terms-container']}>
                                    <label className={styles['terms-label']}>
                                        <input
                                            type="checkbox"
                                            checked={formData.terms}
                                            onChange={(e) => handleInputChange('terms', e.target.checked)}
                                            className={styles['terms-checkbox']}
                                        />
                                        <span className={styles['terms-text']}>
                                            Li e aceito os <a href={`/${locale}/privacidade`} target="_blank" rel="noopener noreferrer">termos de privacidade</a>
                                        </span>
                                    </label>
                                    {errors.terms && <span className={styles['error-message']}>{errors.terms}</span>}
                                </div>
                            </div>

                            {errors.submit && (
                                <div className={styles['error-message']}>{errors.submit}</div>
                            )}

                            <div className={styles['submit-container']}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="large"
                                    disabled={isSubmitting}
                                    className={styles['submit-button']}
                                >
                                    {isSubmitting ? 'Enviando...' : t('submit')}
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className={styles['contact-info']}>
                        <h3>Informações de Contato</h3>
                        <div className={styles['contact-item']}>
                            <MdOutlinePhoneInTalk />
                            <div>
                                <strong>Telefone</strong>
                                <p>+55 45 3231 1699</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <BsWhatsapp />
                            <div>
                                <strong>WhatsApp</strong>
                                <p>+55 45 99133 9642</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <MdOutlineMarkEmailUnread />
                            <div>
                                <strong>E-mail</strong>
                                <p>contato@isoart.com.br</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <MdLocationOn />
                            <div>
                                <strong>Endereço</strong>
                                <p>Rua Dorivaldo Soncela, 1490<br />Santa Tereza do Oeste - Paraná - Brasil</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showToast && (
                <Toast
                    message={t('success')}
                    type="success"
                    isVisible={showToast}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}
