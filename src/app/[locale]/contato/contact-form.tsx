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

    useEffect(() => {
        const fetchStates = async () => {
            setLoadingStates(true);
            try {
                // Fallback para Android antigo que não suporta Fetch API
                if (typeof fetch === 'undefined') {
                    // Usar XMLHttpRequest como fallback
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', '/api/states', true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                try {
                                    const data = JSON.parse(xhr.responseText);
                                    setStates(data);
                                } catch (parseError) {
                                    console.error('Erro ao fazer parse dos estados:', parseError);
                                    // Fallback para estados hardcoded
                                    setStates([
                                        { value: 'PR', label: t('states.parana') },
                                        { value: 'SP', label: t('states.saoPaulo') },
                                        { value: 'SC', label: t('states.santaCatarina') },
                                        { value: 'RS', label: t('states.rioGrandeDoSul') },
                                        { value: 'MG', label: t('states.minasGerais') },
                                        { value: 'RJ', label: t('states.rioDeJaneiro') },
                                    ]);
                                }
                            } else {
                                // Fallback para estados hardcoded em caso de erro
                                setStates([
                                    { value: 'PR', label: t('states.parana') },
                                    { value: 'SP', label: t('states.saoPaulo') },
                                    { value: 'SC', label: t('states.santaCatarina') },
                                    { value: 'RS', label: t('states.rioGrandeDoSul') },
                                    { value: 'MG', label: t('states.minasGerais') },
                                    { value: 'RS', label: t('states.rioDeJaneiro') },
                                ]);
                            }
                            setLoadingStates(false);
                        }
                    };
                    xhr.onerror = function() {
                        console.error('Erro XHR ao buscar estados');
                        // Fallback para estados hardcoded
                        setStates([
                            { value: 'PR', label: t('states.parana') },
                            { value: 'SP', label: t('states.saoPaulo') },
                            { value: 'SC', label: t('states.santaCatarina') },
                            { value: 'RS', label: t('states.rioGrandeDoSul') },
                            { value: 'MG', label: t('states.minasGerais') },
                            { value: 'RS', label: t('states.rioDeJaneiro') },
                        ]);
                        setLoadingStates(false);
                    };
                    xhr.send();
                } else {
                    // Fetch API para Android 7.0+
                    const response = await fetch('/api/states');
                    const data = await response.json();
                    setStates(data);
                }
            } catch (error) {
                console.error('Erro ao carregar estados:', error);
                setStates([
                    { value: 'PR', label: t('states.parana') },
                    { value: 'SP', label: t('states.saoPaulo') },
                    { value: 'SC', label: t('states.santaCatarina') },
                    { value: 'RS', label: t('states.rioGrandeDoSul') },
                    { value: 'MG', label: t('states.minasGerais') },
                    { value: 'RS', label: t('states.rioDeJaneiro') },
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
            // Fallback para Android antigo que não suporta Fetch API
            if (typeof fetch === 'undefined') {
                // Usar XMLHttpRequest como fallback
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
                // Fetch API para Android 7.0+
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
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setErrors({ submit: t('form.errors.submitError') });
            setIsSubmitting(false);
        }
    };

    const t = useTranslations('contactForm');

    // Definir arrays após a inicialização do hook de traduções
    const themes = [
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
                                options={states}
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
                                size="large"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t('form.sending') : t('form.submit')}
                            </Button>
                        </div>
                    </form>
                </div>

                <div className={styles['contact-info']}>
                    <h3>{t('contactInfo.title')}</h3>
                    <div className={styles['contact-items']}>
                        <div className={styles['contact-item']}>
                            <MdOutlinePhoneInTalk />
                            <div>
                                <p>{t('contactInfo.phone')}</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <BsWhatsapp />
                            <div>
                                <p>{t('contactInfo.whatsapp')}</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <MdOutlineMarkEmailUnread />
                            <div>
                                <p>{t('contactInfo.email')}</p>
                            </div>
                        </div>
                        <div className={styles['contact-item']}>
                            <MdLocationOn />
                            <div>
                                <p>{t('contactInfo.address')}<br />{t('contactInfo.city')}</p>
                            </div>
                        </div>
                    </div>
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
