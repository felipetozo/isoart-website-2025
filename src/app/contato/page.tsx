'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import FormField from '@/app/views/ui/form/form-field';
import FormSelection from '@/app/views/ui/form/form-selection';
import Button from '@/app/views/ui/button';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread, MdLocationOn } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';
import Toast from '@/app/views/ui/toast/toast';

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
}

const ContatoPage: React.FC = () => {
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
        { value: 'telhas-e-revestimentos', label: 'Telhas e Revestimentos' },
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
            { value: 'duque-de-caxias', label: 'Duque de Caxias' },
            { value: 'nova-iguacu', label: 'Nova Iguaçu' },
        ],
        BA: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'salvador', label: 'Salvador' },
            { value: 'feira-de-santana', label: 'Feira de Santana' },
            { value: 'vitoria-da-conquista', label: 'Vitória da Conquista' },
            { value: 'camacari', label: 'Camaçari' },
        ],
        GO: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'goiania', label: 'Goiânia' },
            { value: 'aparecida-de-goiania', label: 'Aparecida de Goiânia' },
            { value: 'anapolis', label: 'Anápolis' },
            { value: 'rio-verde', label: 'Rio Verde' },
        ],
        MT: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'cuiaba', label: 'Cuiabá' },
            { value: 'varzea-grande', label: 'Várzea Grande' },
            { value: 'rondonopolis', label: 'Rondonópolis' },
            { value: 'sinop', label: 'Sinop' },
        ],
        MS: [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'campo-grande', label: 'Campo Grande' },
            { value: 'dourados', label: 'Dourados' },
            { value: 'tres-lagoas', label: 'Três Lagoas' },
            { value: 'corumba', label: 'Corumbá' },
        ],
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

    const fetchStates = async () => {
        setLoadingStates(true);
        try {
            const response = await fetch('/api/states');
            if (response.ok) {
                const data = await response.json();
                setStates(data);
            }
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
        } finally {
            setLoadingStates(false);
        }
    };

    // Carregar estados ao montar o componente
    useEffect(() => {
        fetchStates();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        
        // Aplicar máscara apenas para o campo telefone
        if (name === 'phone') {
            const maskedValue = applyPhoneMask(value);
            setFormData(prev => ({
                ...prev,
                [name]: maskedValue,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }



        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleThemeSelect = (theme: string) => {
        setFormData(prev => ({
            ...prev,
            theme,
        }));

        if (errors.theme) {
            setErrors(prev => ({
                ...prev,
                theme: undefined,
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'E-mail inválido. Use um formato válido como: exemplo@empresa.com';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Telefone é obrigatório';
        }

        if (!formData.theme) {
            newErrors.theme = 'Selecione um tema de interesse';
        }

        if (!formData.state) {
            newErrors.state = 'Selecione um estado';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'Digite sua cidade';
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
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                // Reset form on success
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
                setShowToast(true);
            } else {
                console.error('Erro na API:', result.error);
                // Aqui você pode adicionar um Toast de erro se quiser
                alert(result.error || 'Erro ao enviar formulário. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Erro ao enviar formulário. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <section className={styles['contato-hero-section']}>
                <div className={styles['contato-hero-wrapper']}>
                    <h1>Entre em Contato</h1>
                    <p>Estamos aqui para ajudar você a encontrar as melhores soluções em EPS e PIR.</p>
                </div>
            </section>

            <section className={styles['contato-form-section']}>
                <div className={styles['contato-form-wrapper']}>
                    <h4>Preencha o formulário abaixo</h4>
                    
                    <form onSubmit={handleSubmit} className={styles['contato-form']}>
                        <div className={styles['contato-form-fields']}>
                            <div className={styles['contato-form-fields-row']}>
                                <div>
                                    <FormField
                                        id="name"
                                        label="Nome completo"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Digite seu nome"
                                        error={errors.name}
                                        theme="light"
                                    />
                                </div>
                                <div>
                                    <FormField
                                        id="email"
                                        label="E-mail"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Digite seu email"
                                        error={errors.email}
                                        theme="light"
                                    />
                                    <FormField
                                        id="phone"
                                        label="Telefone / WhatsApp"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(00) 00000-0000"
                                        error={errors.phone}
                                        theme="light"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className={styles['theme-label']}>Tema de interesse</label>
                                <div className={styles['theme-buttons-container']}>
                                    {themes.map((theme) => (
                                        <Button
                                            key={theme.value}
                                            variant={formData.theme === theme.value ? 'primary' : 'gold-border'}
                                            size="medium"
                                            onClick={() => handleThemeSelect(theme.value)}
                                            type="button"
                                        >
                                            {theme.label}
                                        </Button>
                                    ))}
                                </div>
                                {errors.theme && <span className={styles['theme-error']}>{errors.theme}</span>}
                            </div>
                            
                            <div className={styles['contato-form-fields-row']}>
                                <div>
                                    <FormSelection
                                        id="state"
                                        label="Estado"
                                        value={formData.state}
                                        onChange={handleChange}
                                        options={states}
                                        error={errors.state}
                                        theme="light"
                                        disabled={loadingStates}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        id="city"
                                        label="Cidade"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Digite sua cidade"
                                        error={errors.city}
                                        theme="light"
                                    />
                                </div>
                            </div>

                            <div className={styles['terms-container']}>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className={styles['terms-checkbox']}
                                />
                                <label htmlFor="terms" className={styles['terms-text']}>
                                    Eu aceito a <a href="/privacidade" className={styles['terms-link']}>política de privacidade</a>
                                </label>
                            </div>
                            {errors.terms && <span className={styles['theme-error']}>{errors.terms}</span>}

                            <Button
                                type="submit"
                                variant="primary"
                                size="large"
                                disabled={isSubmitting}
                                className={styles['submit-button']}
                                fullWidth
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar'}
                            </Button>
                        </div>
                    </form>

                    <div className={styles['contact-info']}>
                        <div className={styles['contact-item']}>
                            <a href="tel:+554532311699" target="_blank" rel="noopener noreferrer">
                                <MdOutlinePhoneInTalk />
                                <span>(45) 3231-1699</span>
                            </a>
                        </div>
                        <div className={styles['contact-item']}>
                            <a href="https://wa.me/554532311699" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <span>(45) 3231-1699</span>
                            </a>
                        </div>
                        <div className={styles['contact-item']}>
                            <a href="mailto:contato@isoart.com.br" target="_blank" rel="noopener noreferrer">
                                <MdOutlineMarkEmailUnread />
                                <span>contato@isoart.com.br</span>
                            </a>
                        </div>
                        <div className={styles['contact-item']}>
                            <a href="https://maps.google.com/?q=Isoart+Indústria+de+EPS" target="_blank" rel="noopener noreferrer">
                                <MdLocationOn />
                                <span>Rua das Indústrias, 123 - Foz do Iguaçu, PR</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            
            <Toast
                message="Sua mensagem foi enviada com sucesso!"
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                duration={4000}
            />
        </div>
    );
};

export default ContatoPage;