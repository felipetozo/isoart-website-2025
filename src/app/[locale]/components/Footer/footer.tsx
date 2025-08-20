'use client';

import React from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from 'react-icons/bs';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { useTranslations } from 'next-intl';

interface FooterProps {
    locale: string;
}

function Footer({ locale }: FooterProps) {
    const t = useTranslations('footer');
    const tContact = useTranslations('contact');
    const tSocial = useTranslations('social');

    return (
        <>
            <section className={styles['footer-section']}>
                <div className={styles['footer-wrapper']}>
                    <div className={styles['footer-column']}>
                        <div className={styles['main-form-contact-item']}>
                            <MdOutlinePhoneInTalk />
                            <p>{tContact('phone')}</p>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <BsInstagram />
                            <p>{tContact('whatsapp')}</p>
                        </div>
                        <div className={styles['main-form-contact-item']}>
                            <MdOutlineMarkEmailUnread />
                            <p>{tContact('email')}</p>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: tContact('address') }} />
                        <div className={styles['main-form-nav-social']}>
                            <Link href="https://www.instagram.com/isoartsolucoestermicas/" target="_blank" aria-label={tSocial('instagram')}>
                                <BsInstagram />
                                <span className={styles['sr-only']}>Instagram</span>
                            </Link>
                            <Link href="https://www.facebook.com/isoartsolucoestermicas" target="_blank" aria-label={tSocial('facebook')}>
                                <BsFacebook />
                                <span className={styles['sr-only']}>Facebook</span>
                            </Link>
                            <Link href="https://www.youtube.com/channel/UC2dlCQSV1Rp5WF91P6ZNDvg" target="_blank" aria-label={tSocial('youtube')}>
                                <BsYoutube />
                                <span className={styles['sr-only']}>YouTube</span>
                            </Link>
                            <Link href="https://www.linkedin.com/company/isoart-industria-produtos-termicos-e-construtivos/" target="_blank" aria-label={tSocial('linkedin')}>
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
                                    <li><Link href={`/${locale}/sobre`}>Sobre a ISOART</Link></li>
                                    <li><Link href={`/${locale}/sobre-eps-pir`}>Sobre EPS PIR</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5>Produtos</h5>
                                <ul>
                                    <li><Link href={`/${locale}/solucoes/telhas-e-paineis`}>Telhas e Painéis</Link></li>
                                    <li><Link href={`/${locale}/solucoes/construcao-civil`}>Construção Civil</Link></li>
                                    <li><Link href={`/${locale}/solucoes/forros`}>Forros</Link></li>
                                    <li><Link href={`/${locale}/solucoes/molduras-decorativas`}>Molduras Decorativas</Link></li>
                                    <li><Link href={`/${locale}/solucoes/embalagens-em-eps`}>Embalagens em EPS</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5>Suporte</h5>
                                <ul>
                                    <li><Link href={`/${locale}/contato`}>Contato</Link></li>
                                    <li><Link href={`/${locale}/privacidade`}>Políticas de privacidade</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles['footer-column']}>
                        <div className={styles['footer-logos']}>
                            <Link href={`/${locale}`}>
                                <Image
                                    src={'/img/isoart-logotipo.svg'}
                                    alt="Logotipo Isoart"
                                    width={120}
                                    height={62}
                                />
                            </Link>
                            <Link href={`/${locale}`}>
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