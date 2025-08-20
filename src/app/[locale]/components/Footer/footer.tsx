'use client';

import React from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from 'react-icons/bs';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread } from 'react-icons/md';

function Footer() {
    return (
        <>
            <section className={styles['footer-section']}>
                <div className={styles['footer-wrapper']}>
                    <div className={styles['footer-column']}>
                        <div className={styles['main-form-contact-item']}>
                            <MdOutlinePhoneInTalk />
                            <p>+55 45 3231 1699</p>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <BsInstagram />
                            <p>+55 45 99133 9642</p>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <MdOutlineMarkEmailUnread />
                            <p>contato@isoart.com.br</p>
                        </div>
                        <p>
                            Rua Dorivaldo Soncela, 1490<br />
                            Santa Tereza do Oeste - Paraná - Brasil
                        </p>
                        <div className={styles['main-form-nav-social']}>
                            <Link href="https://www.instagram.com/isoartsolucoestermicas/" target="_blank" aria-label="Siga-nos no Instagram">
                                <BsInstagram />
                                <span className={styles['sr-only']}>Instagram</span>
                            </Link>
                            <Link href="https://www.facebook.com/isoartsolucoestermicas" target="_blank" aria-label="Siga-nos no Facebook">
                                <BsFacebook />
                                <span className={styles['sr-only']}>Facebook</span>
                            </Link>
                            <Link href="https://www.youtube.com/channel/UC2dlCQSV1Rp5WF91P6ZNDvg" target="_blank" aria-label="Visite nosso canal no YouTube">
                                <BsYoutube />
                                <span className={styles['sr-only']}>YouTube</span>
                            </Link>
                            <Link href="https://www.linkedin.com/company/isoart-industria-produtos-termicos-e-construtivos/" target="_blank" aria-label="Conecte-se conosco no LinkedIn">
                                <BsLinkedin />
                                <span className={styles['sr-only']}>LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles['footer-column']}>
                        <div className={styles['footer-nav-wrapper']}>
                            <div>
                                <h5>Institucional</h5>
                                <ul>
                                    <li><Link href="/sobre">Sobre a ISOART</Link></li>
                                    <li><Link href="/sobre-eps-pir">Sobre EPS PIR</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5>Produtos</h5>
                                <ul>
                                    <li><Link href="/categorias/telhas-e-paineis">Telhas e Painéis</Link></li>
                                    <li><Link href="/categorias/construcao-civil">Construção Civil</Link></li>
                                    <li><Link href="/categorias/forros">Forros</Link></li>
                                    <li><Link href="/categorias/molduras-decorativas">Molduras Decorativas</Link></li>
                                    <li><Link href="/categorias/embalagens-em-eps">Embalagens em EPS</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5>Suporte</h5>
                                <ul>
                                    <li><Link href="/contato">Contato</Link></li>
                                    <li><Link href="/privacidade">Políticas de privacidade</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles['footer-column']}>
                        <div className={styles['footer-logos']}>
                            <Link href="/">
                                <Image
                                    src={'/img/isoart-logotipo.svg'}
                                    alt="Logotipo Isoart"
                                    width={120}
                                    height={62}
                                />
                            </Link>
                            <Link href="/">
                                <Image
                                    src={'/img/geral/selo-iso.svg'}
                                    alt="Logotipo Isoart"
                                    width={120}
                                    height={62}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles['footer-wrapper']}>
                    <div className={styles['footer-cnpj']}>
                        <p>
                            Isoart Indústria de produtos térmicos e construtivos ltda. CNPJ: 09.094.564/0001-05
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;