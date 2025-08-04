'use client';
import { useState, useEffect } from 'react';
import styles from './main-form.module.css';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread, MdLocationOn } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';
import FormField from '@/app/views/ui/form/form-field';
import FormSelection from '@/app/views/ui/form/form-selection';
import Button from '@/app/views/ui/button';
import Image from 'next/image';
import Toast from '@/app/views/ui/toast/toast';

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

function MainForm() {
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
    const [states, setStates] = useState<Array<{value: string, label: string}>>([]);
    const [loadingStates, setLoadingStates] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido';
        if (!formData.solution) newErrors.solution = 'Selecione uma solução';
        if (!formData.state) newErrors.state = 'Selecione um estado';
        if (!formData.city.trim()) newErrors.city = 'Digite sua cidade';
        if (!formData.terms) newErrors.terms = 'Você deve aceitar os termos';
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitStatus('submitting');

        try {
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
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setSubmitStatus('error');
        }
    };

    // Estados e cidades agora são carregados dinamicamente do banco

    return (
        <section className={styles['main-form-section']}>
            <div className={styles['main-form-wrapper']}>
                <div className={styles['main-form-header']}>
                    <h4>
                        Possui alguma dúvida? Entre ou solicite o contato de um de nossos consultores.
                    </h4>
                    <div className={styles['main-form-header-container']}>
                        <div className={styles['main-form-contact-item']}>
                            <a href="tel:+554532311699">
                                <MdOutlinePhoneInTalk />
                                <p>+55 45 3231 1699</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="https://wa.me/5545991339642" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <p>+55 45 99133 9642</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>contato@isoart.com.br</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles['main-form-header-container']}>
                    <form className={styles['cadastro-form']} onSubmit={handleSubmit}>
                        <div className={styles['cadastro-form-fields']}>
                            <FormField
                                id="name"
                                label="Nome completo"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Digite seu nome"
                                error={errors.name}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <FormField
                                id="email"
                                label="E-mail"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Digite seu email"
                                error={errors.email}
                            />
                            <FormField
                                id="phone"
                                label="Telefone / WhatsApp"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                                error={errors.phone}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <FormSelection
                                id="solution"
                                label="Solução desejada"
                                value={formData.solution}
                                onChange={handleChange}
                                options={[
                                    { value: '', label: 'Selecione uma solução' },
                                    { value: 'telhas-e-revestimentos', label: 'Telhas e Revestimentos' },
                                    { value: 'construcao-civil', label: 'Construção Civil' },
                                    { value: 'forros', label: 'Forros' },
                                    { value: 'molduras', label: 'Molduras' },
                                    { value: 'embalagens', label: 'Embalagens' },
                                ]}
                                error={errors.solution}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <FormSelection
                                id="state"
                                label="Estado"
                                value={formData.state}
                                onChange={handleChange}
                                options={states}
                                error={errors.state}
                                disabled={loadingStates}
                            />
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <FormField
                                id="city"
                                label="Cidade"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Digite sua cidade"
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
                                    Eu aceito a <a href="/privacidade" className={styles['terms-link']}>política de privacidade</a>
                                </label>
                            </div>
                            {errors.terms && <div className={styles['error-message']}>{errors.terms}</div>}
                        </div>
                        <div className={styles['cadastro-form-fields']}>
                            <Button
                                variant="primary"
                                size="medium"
                                type="submit"
                                disabled={submitStatus === 'submitting'}
                            >
                                <span>
                                    {submitStatus === 'submitting' ? 'Enviando...' : 'Enviar solicitação'}
                                </span>
                            </Button>
                        </div>
                        {submitStatus === 'error' && (
                            <p className={styles['error-message']}>Erro ao enviar. Tente novamente.</p>
                        )}
                    </form>

                    <div className={styles['main-form-locations-list-item']}>
                        <Image
                            src={'/img/geral/endereco-01-01.avif'}
                            alt="Fábrica 1 Isoart"
                            width={1000}
                            height={700}
                        />
                        <h5>Fábrica 1 (Matriz)</h5>
                        <div className={styles['main-form-contact-item']}>
                            <a href="tel:+554532311699">
                                <MdOutlinePhoneInTalk />
                                <p>+55 45 3231 1699</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="https://wa.me/5545991339642" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <p>+55 45 99133 9642</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>contato@isoart.com.br</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="https://maps.google.com/?q=Rua+Dorivaldo+Soncela,+1490,+Santa+Tereza+do+Oeste,+Paraná" target="_blank" rel="noopener noreferrer">
                                <MdLocationOn />
                                <p>Rua Dorivaldo Soncela, 1490<br />
                                    Santa Tereza do Oeste - Paraná</p>
                            </a>
                        </div>
                    </div>

                    <div className={styles['main-form-locations-list-item']}>
                        <Image
                            src={'/img/geral/endereco-02-01.avif'}
                            alt="Fábrica 2 Isoart"
                            width={1000}
                            height={700}
                        />
                        <h5>Fábrica 2</h5>
                        <div className={styles['main-form-contact-item']}>
                            <a href="tel:+554934332025">
                                <MdOutlinePhoneInTalk />
                                <p>+55 49 3433 2025</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="https://wa.me/5549999638373" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <p>+55 49 99963 8373</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>contato@isoart.com.br</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="https://maps.google.com/?q=Rodovia+BR+282+KM+496,+Xanxerê,+Santa+Catarina" target="_blank" rel="noopener noreferrer">
                                <MdLocationOn />
                                <p>Rodovia BR 282 - KM 496<br />
                                    Xanxerê - Santa Catarina</p>
                            </a>
                        </div>
                    </div>

                    <div className={styles['main-form-locations-list-item']}>
                        <Image
                            src={'/img/geral/endereco-03-01.avif'}
                            alt="Fábrica 3 Isoart"
                            width={1000}
                            height={700}
                        />
                        <h5>Fábrica 3</h5>
                        <div className={styles['main-form-contact-item']}>
                            <a href="tel:+554530111000">
                                <MdOutlinePhoneInTalk />
                                <p>+55 45 3011 1000</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="https://wa.me/5549998260240" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <p>+55 49 99826 0240</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>contato@isoart.com.br</p>
                            </a>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <a href="https://maps.google.com/?q=Rodovia+BR+277+KM+608,+Santa+Tereza+do+Oeste,+Paraná" target="_blank" rel="noopener noreferrer">
                                <MdLocationOn />
                                <p>Rodovia BR 277 - KM 608<br />
                                    Santa Tereza do Oeste - Paraná</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <Toast
                message="Sua mensagem foi enviada com sucesso!"
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                duration={4000}
            />
        </section>
    );
}

export default MainForm;