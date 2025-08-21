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
                                <h5>{t('institutional')}</h5>
                                <ul>
                                    <li><Link href={`/${locale}/sobre`}>{t('aboutIsoart')}</Link></li>
                                    <li><Link href={`/${locale}/sobre-eps-pir`}>{t('aboutEpsPir')}</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5>{t('products')}</h5>
                                <ul>
                                    <li><Link href={`/${locale}/solucoes/telhas-e-paineis`}>{t('telhasPaineis')}</Link></li>
                                    <li><Link href={`/${locale}/solucoes/construcao-civil`}>{t('construcaoCivil')}</Link></li>
                                    <li><Link href={`/${locale}/solucoes/forros`}>{t('forros')}</Link></li>
                                    <li><Link href={`/${locale}/solucoes/molduras-decorativas`}>{t('moldurasDecorativas')}</Link></li>
                                    <li><Link href={`/${locale}/solucoes/embalagens-em-eps`}>{t('embalagensEps')}</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5>{t('support')}</h5>
                                <ul>
                                    <li><Link href={`/${locale}/contato`}>{t('contact')}</Link></li>
                                    <li><Link href={`/${locale}/privacidade`}>{t('privacyPolicy')}</Link></li>
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
                            {t('companyInfo')}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;