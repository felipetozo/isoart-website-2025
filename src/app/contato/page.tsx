'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import FormField from '../views/UI/Form/FormField';
import FormSelection from '../views/UI/Form/FormSelection';
import Button from '../views/UI/Button';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread, MdLocationOn } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';

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

    const themes = [
        { value: 'telhas', label: 'Telhas e Revestimentos' },
        { value: 'construcao', label: 'Construção Civil' },
        { value: 'forros', label: 'Forros' },
        { value: 'molduras', label: 'Molduras' },
        { value: 'embalagens', label: 'Embalagens' },
    ];

    const states = [
        { value: '', label: 'Selecione um estado' },
        { value: 'PR', label: 'Paraná' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'BA', label: 'Bahia' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear city when state changes
        if (name === 'state') {
            setFormData(prev => ({
                ...prev,
                state: value,
                city: '',
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
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
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

        if (!formData.city) {
            newErrors.city = 'Selecione uma cidade';
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
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        
        // Reset form
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
    };

    return (
        <div>
            <section className={styles.contatoHeroSection}>
                <div className={styles.contatoHeroWrapper}>
                    <h1>Entre em Contato</h1>
                    <p>Estamos aqui para ajudar você a encontrar as melhores soluções em EPS e PIR.</p>
                </div>
            </section>

            <section className={styles.contatoFormSection}>
                <div className={styles.contatoFormWrapper}>
                    <h4>Preencha o formulário abaixo</h4>
                    
                    <form onSubmit={handleSubmit} className={styles.contatoForm}>
                        <div className={styles.contatoFormFields}>
                            <div className={styles.contatoFormFieldsRow}>
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
                                        placeholder="Digite seu telefone / whatsapp"
                                        error={errors.phone}
                                        theme="light"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className={styles.themeLabel}>Tema de interesse</label>
                                <div className={styles.themeButtonsContainer}>
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
                                {errors.theme && <span className={styles.themeError}>{errors.theme}</span>}
                            </div>
                            
                            <div className={styles.contatoFormFieldsRow}>
                                <div>
                                    <FormSelection
                                        id="state"
                                        label="Estado"
                                        value={formData.state}
                                        onChange={handleChange}
                                        options={states}
                                        error={errors.state}
                                        theme="light"
                                    />
                                </div>
                                <div>
                                    <FormSelection
                                        id="city"
                                        label="Cidade"
                                        value={formData.city}
                                        onChange={handleChange}
                                        options={formData.state ? cities[formData.state as keyof typeof cities] || [] : [{ value: '', label: 'Selecione um estado primeiro' }]}
                                        error={errors.city}
                                        theme="light"
                                    />
                                </div>
                            </div>

                            <div className={styles.termsContainer}>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className={styles.termsCheckbox}
                                />
                                <label htmlFor="terms" className={styles.termsText}>
                                    Eu aceito a <a href="/privacidade" className={styles.termsLink}>política de privacidade</a>
                                </label>
                            </div>
                            {errors.terms && <span className={styles.themeError}>{errors.terms}</span>}

                            <Button
                                type="submit"
                                variant="primary"
                                size="large"
                                disabled={isSubmitting}
                                className={styles.submitButton}
                                fullWidth
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar'}
                            </Button>
                        </div>
                    </form>

                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <a href="tel:+554532311699" target="_blank" rel="noopener noreferrer">
                                <MdOutlinePhoneInTalk />
                                <span>(45) 3231-1699</span>
                            </a>
                        </div>
                        <div className={styles.contactItem}>
                            <a href="https://wa.me/554532311699" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <span>(45) 3231-1699</span>
                            </a>
                        </div>
                        <div className={styles.contactItem}>
                            <a href="mailto:contato@isoart.com.br" target="_blank" rel="noopener noreferrer">
                                <MdOutlineMarkEmailUnread />
                                <span>contato@isoart.com.br</span>
                            </a>
                        </div>
                        <div className={styles.contactItem}>
                            <a href="https://maps.google.com/?q=Isoart+Indústria+de+EPS" target="_blank" rel="noopener noreferrer">
                                <MdLocationOn />
                                <span>Rua das Indústrias, 123 - Foz do Iguaçu, PR</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContatoPage;