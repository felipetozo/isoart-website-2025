'use client';
import { useState, useEffect } from 'react';
import styles from './MainForm.module.css';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread, MdLocationOn } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';
import FormField from '@/app/views/UI/Form/FormField';
import FormSelection from '@/app/views/UI/Form/FormSelection';
import Button from '@/app/views/UI/Button';
import Image from 'next/image';
import Toast from '@/app/components/Toast/Toast';

interface FormData {
    name: string;
    email: string;
    phone: string;
    solution: string;
    state: string;
    city: string;
}

function MainForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        solution: '',
        state: '',
        city: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [showToast, setShowToast] = useState(false);
    const [states, setStates] = useState<Array<{value: string, label: string}>>([]);
    const [cities, setCities] = useState<Array<{value: string, label: string}>>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido';
        if (!formData.solution) newErrors.solution = 'Selecione uma solução';
        if (!formData.state) newErrors.state = 'Selecione um estado';
        if (!formData.city) newErrors.city = 'Selecione uma cidade';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        
        // Se mudou o estado, buscar cidades
        if (name === 'state') {
            setFormData(prev => ({ ...prev, city: '' }));
            if (value) {
                fetchCities(value);
            } else {
                setCities([]);
            }
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

    const fetchCities = async (state: string) => {
        setLoadingCities(true);
        try {
            const response = await fetch(`/api/cities?state=${encodeURIComponent(state)}`);
            if (response.ok) {
                const data = await response.json();
                setCities(data);
            }
        } catch (error) {
            console.error('Erro ao buscar cidades:', error);
        } finally {
            setLoadingCities(false);
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
                setFormData({ name: '', email: '', phone: '', solution: '', state: '', city: '' });
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
                                id="state"
                                label="Estado"
                                value={formData.state}
                                onChange={handleChange}
                                options={states}
                                error={errors.state}
                                disabled={loadingStates}
                            />
                        </div>
                        <div className={styles.cadastroFormFields}>
                            <FormSelection
                                id="city"
                                label="Cidade"
                                value={formData.city}
                                onChange={handleChange}
                                options={cities}
                                error={errors.city}
                                disabled={loadingCities || !formData.state}
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
                        {submitStatus === 'error' && (
                            <p className={styles.errorMessage}>Erro ao enviar. Tente novamente.</p>
                        )}
                    </form>

                    <div className={styles.MainFormLocationsListItem}>
                        <Image
                            src={'/img/geral/endereco-01-01.avif'}
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
                            src={'/img/geral/endereco-02-01.avif'}
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
                            src={'/img/geral/endereco-03-01.avif'}
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