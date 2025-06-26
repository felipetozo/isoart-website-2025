'use client';
import styles from './MainForm.module.css';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import FormField from '@/app/views/UI/Form/FormField';
import FormSelection from '@/app/views/UI/Form/FormSelection';
import Button from '@/app/views/UI/Button';
import Image from 'next/image';

function MainForm() {
    return (
        <>
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
                        <form className={styles.cadastroForm}>
                            <div className={styles.cadastroFormFields}>
                                <FormField
                                    id="nomeCompleto"
                                    label="Nome completo"
                                    type="text"
                                    value=""
                                    onChange={() => { }}
                                    placeholder="Digite seu nome"
                                />
                            </div>
                            <div className={styles.cadastroFormFields}>
                                <FormField
                                    id="email"
                                    label="E-mail"
                                    type="email"
                                    value=""
                                    onChange={() => { }}
                                    placeholder="Digite seu email"
                                />
                                <FormField
                                    id="telefone"
                                    label="Telefone / WhatsApp"
                                    type="tel"
                                    value=""
                                    onChange={() => { }}
                                    placeholder="Digite seu telefone / whatsapp"
                                />
                            </div>
                            <div className={styles.cadastroFormFields}>
                                <FormSelection
                                    id="solucaoDesejada"
                                    label="Solução desejada"
                                    value=""
                                    onChange={() => { }}
                                />
                            </div>
                            <div className={styles.cadastroFormFields}>
                                <FormSelection
                                    id="cidade"
                                    label="Cidade"
                                    value=""
                                    onChange={() => { }}
                                />
                            </div>

                            <div className={styles.cadastroFormFields}>
                                <Button variant="primary" size="medium">
                                    <span>
                                        Enviar solicitação
                                    </span>
                                </Button>
                            </div>
                        </form>
                        <div className={styles.MainFormLocationsListItem}>
                            <Image
                                src={'/img/geral/endereco-1.jpg'}
                                alt="Logotipo Isoart"
                                width={1000}
                                height={700}
                            />
                            <h3>Fábrica 1 (Matriz)</h3>
                            <span>+55 45 3231 1699</span>
                            <span>+55 45 99133 9642</span>
                            <span>contato@isoart.com.br</span>
                            <span>Rua Dorivaldo Soncela, 1490</span>
                            <span>Santa Tereza do Oeste - Paraná</span>
                        </div>
                        <div className={styles.MainFormLocationsListItem}>
                            <Image
                                src={'/img/geral/endereco-1.jpg'}
                                alt="Logotipo Isoart"
                                width={1000}
                                height={700}
                            />
                            <h3>Fábrica 2</h3>
                            <span>+55 49 3433 2025</span>
                            <span>+55 49 99963 8373</span>
                            <span>contato@isoart.com.br</span>
                            <span>Rodovia BR 282 - KM 496</span>
                            <span>Xanxerê - Santa Catarina</span>
                        </div>
                        <div className={styles.MainFormLocationsListItem}>
                            <Image
                                src={'/img/geral/endereco-1.jpg'}
                                alt="Logotipo Isoart"
                                width={1000}
                                height={700}
                            />
                            <h3>Fábrica 3</h3>
                            <span>+55 45 3011 1000</span>
                            <span>+55 49 99826 0240</span>
                            <span>contato@isoart.com.br</span>
                            <span>Rodovia BR 277 - KM 608</span>
                            <span>Santa Tereza do Oeste - Paraná</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainForm;