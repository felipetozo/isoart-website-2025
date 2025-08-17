import styles from './carrossel-clientes.module.css';
import ImageCarousel from '../image-carousel/image-carousel';

function CarrosselClientes() {
    const parceirosImages = [
        '/img/parceiros/parceiro-8.avif',
        '/img/parceiros/parceiro-9.avif',
        '/img/parceiros/parceiro-10.avif',
        '/img/parceiros/parceiro-11.avif',
        '/img/parceiros/parceiro-12.avif',
        '/img/parceiros/parceiro-13.avif',
        '/img/parceiros/parceiro-14.avif',
        '/img/parceiros/parceiro-15.avif',
        '/img/parceiros/parceiro-16.avif'
    ];

    return (
        <>
            <section className={styles['carrossel-clientes-section']} id="CarrosselClientes">
                <div className={styles['carrossel-clientes-wrapper']}>
                    <p>Confiança dos Clientes em Nossos Parceiros</p>
                    
                    <div className={styles['parceiros-carousel-container']}>
                        <ImageCarousel 
                            images={parceirosImages}
                            alt="Parceiros e Clientes Isoart"
                            width={120}
                            height={62}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default CarrosselClientes;