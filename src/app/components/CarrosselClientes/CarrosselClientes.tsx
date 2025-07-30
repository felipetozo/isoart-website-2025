import styles from './CarrosselClientes.module.css';
import Image from 'next/image';

function CarrosselClientes() {
    return (
        <>
            <section className={styles.CarrosselClientesSection} id="CarrosselClientes">
                <div className={styles.CarrosselClientesWrapper}>
                    <p>Confiança dos Clientes em Nossos Parceiros</p>
                    <ul>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-8.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-9.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-10.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-11.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-12.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-13.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-14.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-15.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-16.avif'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default CarrosselClientes;