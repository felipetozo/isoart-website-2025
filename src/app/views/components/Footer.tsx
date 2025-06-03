import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

function Footer() {
    return (
        <>
            <section className={styles.FooterSection}>
                <div className={styles.FooterWrapper}>
                    <div className={styles.FooterColumn}>
                        <p>
                            Rua Dorivaldo Soncela, 1490<br />
                            Santa Tereza do Oeste - Paraná - Brasil
                        </p>
                        <div className={styles.MainFormContactItem}>
                            <MdOutlinePhoneInTalk />
                            <p>+55 45 3231 1699</p>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <BsWhatsapp />
                            <p>+55 45 99133 9642</p>
                        </div>
                        <div className={styles.MainFormContactItem}>
                            <MdOutlineMarkEmailUnread />
                            <p>contato@isoart.com.br</p>
                        </div>
                        <div className={styles.MainFormNavSocial}>
                            <Link href="/"><span><BsInstagram /></span></Link>
                            <Link href="/"><span><BsFacebook /></span></Link>
                            <Link href="/"><span><BsYoutube /></span></Link>
                            <Link href="/"><span><BsLinkedin /></span></Link>
                        </div>
                    </div>
                    <div className={styles.FooterColumn}>
                        <div className={styles.FooterNavWrapper}>
                            <div>
                                <h4>Institucional</h4>
                                <ul>
                                    <li>Sobre a empresa</li>
                                    <li>Sobre o PIR e o EPS</li>
                                    <li>Carreiras</li>
                                    <li>Notícias</li>
                                </ul>
                            </div>
                            <div>
                                <h4>Produtos</h4>
                                <ul>
                                    <li>Isolamento Térmicos</li>
                                    <li>Construção Civil</li>
                                    <li>Decoração</li>
                                    <li>Embalagens</li>
                                </ul>
                            </div>
                            <div>
                                <h4>Suporte</h4>
                                <ul>
                                    <li>Contato</li>
                                    <li>Políticas de privacidade</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.FooterColumn}>
                        <div className={styles.FooterLogos}>
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
                                    src={'/img/geral/selo-iso.png'}
                                    alt="Logotipo Isoart"
                                    width={120}
                                    height={62}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.FooterWrapper}>
                    <div className={styles.FooterCNPJ}>
                        <p>
                            {new Date().getFullYear()} - Isoart Indústria de produtos térmicos e construtivos ltda.<br />
                            CNPJ: 09.094.564/0001-05
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Footer;