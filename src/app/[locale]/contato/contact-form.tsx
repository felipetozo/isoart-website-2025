'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import FormField from '@/app/[locale]/views/ui/form/form-field';
import FormSelection from '@/app/[locale]/views/ui/form/form-selection';
import Button from '@/app/[locale]/views/ui/button/button';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread, MdLocationOn } from 'react-icons/md';
import Toast from '@/app/[locale]/views/ui/toast/toast';
import { useTranslations } from 'next-intl';

interface FormData {
    name: string;
    email: string;
    phone: string;
    theme: string;
    state: string;
    city: string;
    message: string;
    terms: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    theme?: string;
    state?: string;
    city?: string;
    message?: string;
    terms?: string;
    submit?: string;
}

interface ContactFormProps {
    locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
    const t = useTranslations('contactForm');

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        theme: '',
        state: '',
        city: '',
        message: '',
        terms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('form.errors.nameRequired');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('form.errors.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('form.errors.emailInvalid');
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('form.errors.phoneRequired');
        }

        if (!formData.theme) {
            newErrors.theme = t('form.errors.subjectRequired');
        }

        if (!formData.state) {
            newErrors.state = t('form.errors.stateRequired');
        }

        if (!formData.city) {
            newErrors.city = t('form.errors.cityRequired');
        }

        if (!formData.message.trim()) {
            newErrors.message = t('form.errors.messageRequired');
        }

        if (!formData.terms) {
            newErrors.terms = t('form.errors.termsRequired');
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
            if (typeof fetch === 'undefined') {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/api/contact-page', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            setShowToast(true);
                            setFormData({
                                name: '',
                                email: '',
                                phone: '',
                                theme: '',
                                state: '',
                                city: '',
                                message: '',
                                terms: false,
                            });
                            setErrors({});
                        } else {
                            setErrors({ submit: t('form.errors.submitError') });
                        }
                        setIsSubmitting(false);
                    }
                };
                xhr.onerror = function() {
                    console.error('Erro XHR ao enviar formulário');
                    setErrors({ submit: t('form.errors.submitError') });
                    setIsSubmitting(false);
                };
                xhr.send(JSON.stringify({
                    ...formData,
                    locale,
                }));
            } else {
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
                        message: '',
                        terms: false,
                    });
                    setErrors({});
                } else {
                    throw new Error('Erro ao enviar formulário');
                }
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setErrors({ submit: t('form.errors.submitError') });
            setIsSubmitting(false);
        }
    };

    const statesCountries = [
        { value: '', label: t('form.statePlaceholder') },
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'AM', label: 'Amazonas' },
        { value: 'BA', label: 'Bahia' },
        { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'PA', label: 'Pará' },
        { value: 'PB', label: 'Paraíba' },
        { value: 'PR', label: 'Paraná' },
        { value: 'PE', label: 'Pernambuco' },
        { value: 'PI', label: 'Piauí' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'RN', label: 'Rio Grande do Norte' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'RO', label: 'Rondônia' },
        { value: 'RR', label: 'Roraima' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'SE', label: 'Sergipe' },
        { value: 'TO', label: 'Tocantins' },
        { value: 'PY', label: 'Paraguay' },
        { value: 'UY', label: 'Uruguay' },
    ];

    const themes = [
        { value: '', label: t('themes.themesPlaceholder') },
        { value: 'telhas-e-paineis', label: t('themes.telhasPaineis') },
        { value: 'construcao-civil', label: t('themes.construcaoCivil') },
        { value: 'forros', label: t('themes.forros') },
        { value: 'molduras', label: t('themes.molduras') },
        { value: 'embalagens', label: t('themes.embalagens') },
    ];

    return (
        <>
            <section className={styles['contato-hero-section']}>
                <div className={styles['contato-hero-wrapper']}>
                    <h1>{t('hero.title')}</h1>
                    <p>{t('hero.description')}</p>
                </div>
            </section>

            <section className={styles['contato-form-section']}>
                <div className={styles['contato-form-wrapper']}>
                    <h4>{t('form.title')}</h4>
                    <form onSubmit={handleSubmit} className={styles['contato-form']}>
                        <div className={styles['contato-form-fields']}>
                            <FormField
                                id="name"
                                label={t('form.name')}
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                error={errors.name}
                                theme="light"
                            />
                            <FormField
                                id="email"
                                label={t('form.email')}
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                error={errors.email}
                                theme="light"
                            />
                            <FormField
                                id="phone"
                                label={t('form.phone')}
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                error={errors.phone}
                                theme="light"
                            />
                            <FormSelection
                                id="theme"
                                label={t('form.subject')}
                                value={formData.theme}
                                onChange={(e) => handleInputChange('theme', e.target.value)}
                                options={themes}
                                error={errors.theme}
                                theme="light"
                            />
                            <FormSelection
                                id="state"
                                label={t('form.state')}
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                options={statesCountries}
                                error={errors.state}
                                theme="light"
                            />
                            <FormField
                                id="city"
                                label={t('form.city')}
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder={t('form.cityPlaceholder')}
                                error={errors.city}
                                theme="light"
                            />
                            <FormField
                                id="message"
                                label={t('form.message')}
                                variant="textarea"
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                placeholder={t('form.messagePlaceholder')}
                                error={errors.message}
                                theme="light"
                                rows={4}
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
                                    {t('form.terms')} <a href={`/${locale}/privacidade`} className={styles['terms-link']} target="_blank" rel="noopener noreferrer">{t('form.privacyPolicy')}</a>
                                </label>
                                {errors.terms && <span className={styles['theme-error']}>{errors.terms}</span>}
                            </div>

                            {errors.submit && (
                                <span className={styles['theme-error']}>{errors.submit}</span>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                size="medium"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t('form.sending') : t('form.submit')}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>

            <Toast
                message={t('form.success')}
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
}