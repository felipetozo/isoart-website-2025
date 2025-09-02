'use client';
import { useState } from 'react';
import styles from './contact-component.module.css';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread, MdLocationOn } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';
import Image from 'next/image';
import FormField from '@/app/[locale]/views/ui/form/form-field';
import FormSelection from '@/app/[locale]/views/ui/form/form-selection';
import Button from '@/app/[locale]/views/ui/button/button';
import Toast from '@/app/[locale]/views/ui/toast/toast';
import { useTranslations } from 'next-intl';

interface FormData {
    name: string;
    email: string;
    phone: string;
    solution: string;
    state: string;
    city: string;
    terms: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    solution?: string;
    state?: string;
    city?: string;
    terms?: string;
}

interface ContactComponentProps {
    locale: string;
}

function ContactComponent({ locale }: ContactComponentProps) {
    const t = useTranslations('contactComponent');
    const tPage = useTranslations('contactComponent');
    const tContact = useTranslations('contact');
    const tCommon = useTranslations('common.buttons');

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        solution: '',
        state: '',
        city: '',
        terms: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [showToast, setShowToast] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = t('name') + ' ' + t('isRequired');
        if (!formData.email.trim()) newErrors.email = t('email') + ' ' + t('isRequired');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('invalidEmail');
        if (!formData.solution) newErrors.solution = t('selectSolution');
        if (!formData.state) newErrors.state = t('selectState');
        if (!formData.city.trim()) newErrors.city = t('enterCity');
        if (!formData.terms) newErrors.terms = t('termsRequired');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Função para aplicar máscara no telefone
    const applyPhoneMask = (value: string): string => {
        // Remove tudo que não é dígito
        const numbers = value.replace(/\D/g, '');
        
        // Aplica a máscara (00) 00000-0000
        if (numbers.length <= 2) {
            return `(${numbers}`;
        } else if (numbers.length <= 7) {
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        } else if (numbers.length <= 11) {
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
        } else {
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        
        // Aplicar máscara apenas para o campo telefone
        if (name === 'phone') {
            const maskedValue = applyPhoneMask(value);
            setFormData((prev) => ({ ...prev, [name]: maskedValue }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
        
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitStatus('submitting');

        try {
            // Fallback para Android antigo que não suporta Fetch API
            if (typeof fetch === 'undefined') {
                // Usar XMLHttpRequest como fallback
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/api/contact', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            try {
                                const result = JSON.parse(xhr.responseText);
                                setSubmitStatus('success');
                                setFormData({ name: '', email: '', phone: '', solution: '', state: '', city: '', terms: false });
                                setShowToast(true);
                            } catch (parseError) {
                                console.error('Erro ao fazer parse da resposta:', parseError);
                                setSubmitStatus('error');
                            }
                        } else {
                            console.error('Erro na API:', xhr.statusText);
                            setSubmitStatus('error');
                        }
                    }
                };
                xhr.onerror = function() {
                    console.error('Erro XHR ao enviar formulário');
                    setSubmitStatus('error');
                };
                xhr.send(JSON.stringify(formData));
            } else {
                // Fetch API para Android 7.0+
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (response.ok) {
                    setSubmitStatus('success');
                    setFormData({ name: '', email: '', phone: '', solution: '', state: '', city: '', terms: false });
                    setShowToast(true);
                } else {
                    console.error('Erro na API:', result.error);
                    setSubmitStatus('error');
                }
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setSubmitStatus('error');
        }
    };

    // Lista estática de estados brasileiros
    const statesCountries = [
        { value: '', label: t('form.selectState') },
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

    return (
        <section className={styles['contact-component-section']}>
            <div className={styles['contact-component-wrapper']}>

                {/* Cabeçalho do formulário */}
                <div className={styles['contact-component-header']}>
                    <h4>
                        {t('title')}
                    </h4>
                    <div className={styles['contact-component-header-container']}>
                        <div className={styles['contact-component-contact-item']}>
                            <a href="tel:+554532311699">
                                <MdOutlinePhoneInTalk />
                                <p>{tContact('phone')}</p>
                            </a>
                        </div>
                        <div className={styles['contact-component-contact-item']}>
                            <a href="https://wa.me/5545991339642" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <p>{tContact('whatsapp')}</p>
                            </a>
                        </div>
                        <div className={styles['contact-component-contact-item']}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>{tContact('email')}</p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Formulário e Endereços */}
                <div className={styles['contact-component-row']}>
                    <form className={styles['cadastro-form']} onSubmit={handleSubmit}>
                        <div className={styles['cadastro-form-fields']}>
                            <FormField
                                id="name"
                                label={t('form.name')}
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('form.enterName')}
                                error={errors.name}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <FormField
                                id="email"
                                label={t('form.email')}
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('form.enterEmail')}
                                error={errors.email}
                            />
                            <FormField
                                id="phone"
                                label={t('form.phoneWhatsapp')}
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder={t('form.phonePlaceholder')}
                                error={errors.phone}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <FormSelection
                                id="solution"
                                label={t('form.solutionDesired')}
                                value={formData.solution}
                                onChange={handleChange}
                                options={[
                                    { value: '', label: t('form.selectSolution') },
                                    { value: 'telhas-e-paineis', label: t('form.solutions.telhasPaineis') },
                                    { value: 'construcao-civil', label: t('form.solutions.construcaoCivil') },
                                    { value: 'forros', label: t('form.solutions.forros') },
                                    { value: 'molduras', label: t('form.solutions.molduras') },
                                    { value: 'embalagens', label: t('form.solutions.embalagens') },
                                ]}
                                error={errors.solution}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <FormSelection
                                id="state"
                                label={t('form.state')}
                                value={formData.state}
                                onChange={handleChange}
                                options={statesCountries}
                                error={errors.state}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <FormField
                                id="city"
                                label={t('form.city')}
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder={t('form.enterCity')}
                                error={errors.city}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <div className={styles['terms-container']}>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className={styles.termsCheckbox}
                                />
                                <label htmlFor="terms" className={styles['terms-text']}>
                                    {t('form.terms')} <a href={`/${locale}/privacidade`} className={styles['terms-link']}>{t('form.privacyPolicy')}</a>
                                </label>
                            </div>
                            {errors.terms && <div className={styles['error-message']}>{errors.terms}</div>}
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <Button
                                type="submit"
                                variant="primary"
                                size="medium"
                                disabled={submitStatus === 'submitting'}
                            >
                                {submitStatus === 'submitting' ? t('form.sending') : t('form.submit')}
                            </Button>
                        </div>
                        {submitStatus === 'error' && (
                            <p className={styles['error-message']}>{t('errorSending')}</p>
                        )}
                    </form>

                    {/* Endereços */}
                    <div className={styles['contact-component-enderecos']}>
                        <div className={styles['contact-component-endereco']}>
                            <Image
                                src={'/img/geral/endereco-01-01-optimized.webp'}
                                alt="Fábrica 1 Isoart"
                                width={1000}
                                height={700}
                                loading='lazy'
                            />
                            <div className={styles['contact-component-endereco-info']}>
                                <h5>{tPage('factories.factory1')}</h5>
                                <a href="tel:554532311699">
                                    <MdOutlinePhoneInTalk />
                                    +55 45 3231 1699
                                </a>
                                <a href="https://wa.me/5545991339642">
                                    <BsWhatsapp />
                                    +55 45 99133 9642
                                </a>
                                <a href="mailto:contato@isoart.com.br">
                                    <MdOutlineMarkEmailUnread />
                                    contato@isoart.com.br
                                </a>
                                <a href="https://maps.google.com/?q=Rua+Dorivaldo+Soncela,+1490,+Santa+Tereza+do+Oeste,+Paraná" target="_blank" rel="noopener noreferrer">
                                  <MdLocationOn />
                                    <p>
                                        {tPage('factories.address1')}<br />
                                        {tPage('factories.city1')}
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div className={styles['contact-component-endereco']}>
                            <Image
                                src={'/img/geral/endereco-02-01.avif'}
                                alt="Fábrica 2 Isoart"
                                width={1000}
                                height={700}
                                loading='lazy'
                            />
                            <div className={styles['contact-component-endereco-info']}>
                                <h5>{tPage('factories.factory2')}</h5>
                                <a href="tel:+554934332025">
                                    <MdOutlinePhoneInTalk />
                                    +55 49 3433 2025
                                </a>
                                <a href="https://wa.me/5549999638373" target="_blank" rel="noopener noreferrer">
                                    <BsWhatsapp />
                                    +55 49 99963 8373
                                </a>
                                <a href="mailto:contato@isoart.com.br">
                                    <MdOutlineMarkEmailUnread />
                                    contato@isoart.com.br
                                </a>
                                <a href="https://maps.google.com/?q=Rodovia+BR+282+KM+496,+Xanxerê,+Santa+Catarina" target="_blank" rel="noopener noreferrer">
                                  <MdLocationOn />
                                    <p>
                                        {tPage('factories.address2')}<br />
                                        {tPage('factories.city2')}
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div className={styles['contact-component-endereco']}>
                            <Image
                                src={'/img/geral/endereco-03-01.avif'}
                                alt="Fábrica 3 Isoart"
                                width={1000}
                                height={700}
                                loading='lazy'
                            />
                            <div className={styles['contact-component-endereco-info']}>
                                <h5>{tPage('factories.factory3')}</h5>
                                <a href="tel:+554530111000">
                                    <MdOutlinePhoneInTalk />
                                    +55 45 3011 1000
                                </a>
                                <a href="https://wa.me/5549998260240" target="_blank" rel="noopener noreferrer">
                                    <BsWhatsapp />
                                    +55 45 99826 0240
                                </a>
                                <a href="mailto:contato@isoart.com.br">
                                    <MdOutlineMarkEmailUnread />
                                    contato@isoart.com.br
                                </a>
                                <a href="https://maps.google.com/?q=Rodovia+BR+277+KM+608,+Santa+Tereza+do+Oeste,+Paraná" target="_blank" rel="noopener noreferrer">
                                  <MdLocationOn />
                                    <p>
                                        {tPage('factories.address3')}<br />
                                        {tPage('factories.city3')}
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Toast
                message={t('form.success')}
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                duration={4000}
            />
        </section>
    );
};

export default ContactComponent;