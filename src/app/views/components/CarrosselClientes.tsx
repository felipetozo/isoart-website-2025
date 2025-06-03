import styles from './CarrosselClientes.module.css';
import Image from 'next/image';

function CarrosselClientes() {
    return (
        <>
            <section className={styles.CarrosselClientesSection} id="CarrosselClientes">
                <div className={styles.CarrosselClientesWrapper}>
                    <p>Join 25k+ companies that trust us</p>
                    <ul>
                        <li>
                            <Image
                                src={'/img/isoart-logotipo.svg'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/isoart-logotipo.svg'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/isoart-logotipo.svg'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/isoart-logotipo.svg'}
                                alt="Logotipo Isoart"
                                width={120}
                                height={62}
                            />
                        </li>
                        <li>
                            <Image
                                src={'/img/isoart-logotipo.svg'}
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