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
            { value: 'duque-de-caxias', label: 'Duque de Caxias' },
            { value: 'nova-iguacu', label: 'Nova Iguaçu' },
        ],
    };

    useEffect(() => {
        const fetchStates = async () => {
            setLoadingStates(true);
            try {
                const response = await fetch('/api/states');
                const data = await response.json();
                setStates(data);
            } catch (error) {
                console.error('Erro ao carregar estados:', error);
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

    const t = useTranslations('contactPage');

    return (
        <>
            <section className={styles['contato-hero-section']}>
                <div className={styles['contato-hero-wrapper']}>
                    <h1>Entre em Contato</h1>
                    <p>Preencha o formulário abaixo e entraremos em contato em breve</p>
                </div>
            </section>

            <section className={styles['contato-form-section']}>
                <div className={styles['contato-form-wrapper']}>
                    <h4>Formulário de Contato</h4>
                    <form onSubmit={handleSubmit} className={styles['contato-form']}>
                        <div className={styles['contato-form-fields']}>
                            <FormField
                                id="name"
                                label="Nome completo"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                error={errors.name}
                                theme="light"
                            />
                            <FormField
                                id="email"
                                label="E-mail"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                error={errors.email}
                                theme="light"
                            />
                            <FormField
                                id="phone"
                                label="Telefone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                error={errors.phone}
                                theme="light"
                            />
                            <FormSelection
                                id="theme"
                                label="Assunto"
                                value={formData.theme}
                                onChange={(e) => handleInputChange('theme', e.target.value)}
                                options={themes}
                                error={errors.theme}
                                theme="light"
                            />
                            <FormSelection
                                id="state"
                                label="Estado"
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                options={states}
                                error={errors.state}
                                theme="light"
                            />
                            <FormField
                                id="city"
                                label="Cidade"
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="Digite sua cidade"
                                error={errors.city}
                                theme="light"
                            />
                            <div className={styles['terms-container']}>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={(e) => handleInputChange('terms', e.target.checked)}
                                    className={styles['terms-checkbox']}
                                />
                                <label htmlFor="terms" className={styles['terms-text']}>
                                    Li e aceito os <a href={`/${locale}/privacidade`} className={styles['terms-link']} target="_blank" rel="noopener noreferrer">termos de privacidade</a>
                                </label>
                                {errors.terms && <span className={styles['theme-error']}>{errors.terms}</span>}
                            </div>

                            {errors.submit && (
                                <span className={styles['theme-error']}>{errors.submit}</span>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                size="large"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                            </Button>
                        </div>
                    </form>
                </div>

                <div className={styles['contact-info']}>
                    <h3>Informações de Contato</h3>
                    <div className={styles['contact-items']}>
                        <div className={styles['contact-item']}>
                            <MdOutlinePhoneInTalk />
                            <div>
                                <p>+55 45 3231 1699</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <BsWhatsapp />
                            <div>
                                <p>+55 45 99133 9642</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <MdOutlineMarkEmailUnread />
                            <div>
                                <p>contato@isoart.com.br</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <MdLocationOn />
                            <div>
                                <p>Rua Dorivaldo Soncela, 1490<br />Santa Tereza do Oeste - Paraná - Brasil</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Toast
                message="Sua mensagem foi enviada com sucesso!"
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
}
