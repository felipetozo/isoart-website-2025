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
                                src={'/img/parceiros/parceiro-8.png'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-9.png'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-10.png'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-11.png'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-12.png'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-13.png'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-14.png'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-15.png'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/parceiros/parceiro-16.png'}
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