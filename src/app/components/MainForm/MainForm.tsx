'use client';
import { useState } from 'react';
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
    };

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

    const states = [
        { value: '', label: 'Selecione um estado' },
        { value: 'PR', label: 'Paraná' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'outros', label: 'Outros' },
    ];

    const cities = {
        'PR': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'santa_tereza', label: 'Santa Tereza do Oeste' },
            { value: 'cascavel', label: 'Cascavel' },
            { value: 'toledo', label: 'Toledo' },
            { value: 'foz_iguacu', label: 'Foz do Iguaçu' },
            { value: 'curitiba', label: 'Curitiba' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'SC': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'xanxere', label: 'Xanxerê' },
            { value: 'chapeco', label: 'Chapecó' },
            { value: 'florianopolis', label: 'Florianópolis' },
            { value: 'blumenau', label: 'Blumenau' },
            { value: 'joinville', label: 'Joinville' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'RS': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'porto_alegre', label: 'Porto Alegre' },
            { value: 'caxias_sul', label: 'Caxias do Sul' },
            { value: 'pelotas', label: 'Pelotas' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'SP': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'sao_paulo', label: 'São Paulo' },
            { value: 'campinas', label: 'Campinas' },
            { value: 'santos', label: 'Santos' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'RJ': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'rio_janeiro', label: 'Rio de Janeiro' },
            { value: 'niteroi', label: 'Niterói' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'MG': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'belo_horizonte', label: 'Belo Horizonte' },
            { value: 'uberlandia', label: 'Uberlândia' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'GO': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'goiania', label: 'Goiânia' },
            { value: 'anapolis', label: 'Anápolis' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'MT': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'cuiaba', label: 'Cuiabá' },
            { value: 'varzea_grande', label: 'Várzea Grande' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'MS': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'campo_grande', label: 'Campo Grande' },
            { value: 'dourados', label: 'Dourados' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'DF': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'brasilia', label: 'Brasília' },
            { value: 'outros', label: 'Outras cidades' },
        ],
        'outros': [
            { value: '', label: 'Selecione uma cidade' },
            { value: 'outros', label: 'Outras cidades' },
        ],
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
                            />
                        </div>
                        <div className={styles.cadastroFormFields}>
                            <FormSelection
                                id="city"
                                label="Cidade"
                                value={formData.city}
                                onChange={handleChange}
                                options={formData.state ? cities[formData.state as keyof typeof cities] || [] : [{ value: '', label: 'Selecione um estado primeiro' }]}
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