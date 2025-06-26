'use client';
import { useState } from 'react';
import styles from './MainForm.module.css';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread, MdLocationOn } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';
import FormField from '@/app/views/UI/Form/FormField';
import Button from '@/app/views/UI/Button';
import Image from 'next/image';

interface FormData {
    name: string;
    email: string;
    phone: string;
    solution: string;
    city: string;
}

// Componente FormSelection inline para evitar problemas de dependência
interface FormSelectionProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    error?: string;
}

const FormSelection: React.FC<FormSelectionProps> = ({
    id,
    label,
    value,
    onChange,
    options = [], // Valor padrão para evitar undefined
    error
}) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select id={id} name={id} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="error">{error}</span>}
        </div>
    );
};

function MainForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        solution: '',
        city: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitStatus('submitting');

        try {
            // Aqui você pode adicionar a lógica para enviar para seu backend PHP/MySQL
            console.log('Dados do formulário:', formData);

            // Simular envio por enquanto
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', solution: '', city: '' });
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setSubmitStatus('error');
        }
    };

    return (
        <section className={styles.MainFormSection}>
            <div className={styles.MainFormWrapper}>
                <div className={styles.MainFormHeader}>
                    <h4>
                        Possui alguma dúvida? Entre ou solicite o contato de um de nossos consultores.
                    </h4>
                    <div className={styles.MainFormHeaderContainer}>
                        <div className={styles.MainFormContactItem}>
                            <a href="tel:+554532311699">
                                <MdOutlinePhoneInTalk />
                                <p>+55 45 3231 1699</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="tel:+5545991339642">
                                <BsWhatsapp />
                                <p>+55 45 99133 9642</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>contato@isoart.com.br</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.MainFormContainer}>
                    <form className={styles.cadastroForm} onSubmit={handleSubmit}>
                        <div className={styles.cadastroFormFields}>
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
                        <div className={styles.cadastroFormFields}>
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
                                placeholder="Digite seu telefone / whatsapp"
                                error={errors.phone}
                            />
                        </div>
                        <div className={styles.cadastroFormFields}>
                            <FormSelection
                                id="solution"
                                label="Solução desejada"
                                value={formData.solution}
                                onChange={handleChange}
                                options={[
                                    { value: '', label: 'Selecione uma solução' },
                                    { value: 'telhas', label: 'Telhas Térmicas' },
                                    { value: 'paineis', label: 'Painéis Sanduíche' },
                                    { value: 'mantas', label: 'Mantas Térmicas' },
                                ]}
                                error={errors.solution}
                            />
                        </div>
                        <div className={styles.cadastroFormFields}>
                            <FormSelection
                                id="city"
                                label="Cidade"
                                value={formData.city}
                                onChange={handleChange}
                                options={[
                                    { value: '', label: 'Selecione uma cidade' },
                                    { value: 'santa_tereza', label: 'Santa Tereza do Oeste - PR' },
                                    { value: 'xanxere', label: 'Xanxerê - SC' },
                                ]}
                                error={errors.city}
                            />
                        </div>
                        <div className={styles.cadastroFormFields}>
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
                        {submitStatus === 'success' && (
                            <p className={styles.successMessage}>Solicitação enviada com sucesso!</p>
                        )}
                        {submitStatus === 'error' && (
                            <p className={styles.errorMessage}>Erro ao enviar. Tente novamente.</p>
                        )}
                    </form>

                    <div className={styles.MainFormLocationsListItem}>
                        <Image
                            src={'/img/geral/endereco-1.jpg'}
                            alt="Fábrica 1 Isoart"
                            width={1000}
                            height={700}
                        />
                        <h3>Fábrica 1 (Matriz)</h3>
                        <div className={styles.MainFormContactItem}>
                            <a href="tel:+554532311699">
                                <MdOutlinePhoneInTalk />
                                <p>+55 45 3231 1699</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="https://wa.me/5545991339642" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <p>+55 45 99133 9642</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>contato@isoart.com.br</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="https://maps.google.com/?q=Rua+Dorivaldo+Soncela,+1490,+Santa+Tereza+do+Oeste,+Paraná" target="_blank" rel="noopener noreferrer">
                                <MdLocationOn />
                                <p>Rua Dorivaldo Soncela, 1490<br />
                                    Santa Tereza do Oeste - Paraná</p>
                            </a>
                        </div>
                    </div>

                    <div className={styles.MainFormLocationsListItem}>
                        <Image
                            src={'/img/geral/endereco-1.jpg'}
                            alt="Fábrica 2 Isoart"
                            width={1000}
                            height={700}
                        />
                        <h3>Fábrica 2</h3>
                        <div className={styles.MainFormContactItem}>
                            <a href="tel:+554934332025">
                                <MdOutlinePhoneInTalk />
                                <p>+55 49 3433 2025</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="https://wa.me/5549999638373" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <p>+55 49 99963 8373</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>contato@isoart.com.br</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="https://maps.google.com/?q=Rodovia+BR+282+KM+496,+Xanxerê,+Santa+Catarina" target="_blank" rel="noopener noreferrer">
                                <MdLocationOn />
                                <p>Rodovia BR 282 - KM 496<br />
                                    Xanxerê - Santa Catarina</p>
                            </a>
                        </div>
                    </div>

                    <div className={styles.MainFormLocationsListItem}>
                        <Image
                            src={'/img/geral/endereco-1.jpg'}
                            alt="Fábrica 3 Isoart"
                            width={1000}
                            height={700}
                        />
                        <h3>Fábrica 3</h3>
                        <div className={styles.MainFormContactItem}>
                            <a href="tel:+554530111000">
                                <MdOutlinePhoneInTalk />
                                <p>+55 45 3011 1000</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="https://wa.me/5549998260240" target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp />
                                <p>+55 49 99826 0240</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="mailto:contato@isoart.com.br">
                                <MdOutlineMarkEmailUnread />
                                <p>contato@isoart.com.br</p>
                            </a>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <a href="https://maps.google.com/?q=Rodovia+BR+277+KM+608,+Santa+Tereza+do+Oeste,+Paraná" target="_blank" rel="noopener noreferrer">
                                <MdLocationOn />
                                <p>Rodovia BR 277 - KM 608<br />
                                    Santa Tereza do Oeste - Paraná</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainForm;