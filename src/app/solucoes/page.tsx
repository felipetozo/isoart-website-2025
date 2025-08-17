import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/views/ui/button/button';

// Dados das soluções
const solucoes = [
    {
        id: 1,
        title: 'Telhas e Painéis Térmicos',
        description: 'Soluções completas para coberturas e fachadas com isolamento térmico superior. Nossas telhas e painéis oferecem eficiência energética, resistência e durabilidade para diversos projetos de construção.',
        image: '/img/solucoes-page/solucoes-telhas-paineis.avif',
        link: '/categorias/telhas-e-paineis'
    },
    {
        id: 2,
        title: 'Construção Civil com EPS',
        description: 'Materiais inovadores em EPS para construção civil, incluindo lajes, blocos, flocos e chapas. Proporcionam redução de custos, leveza estrutural e excelente isolamento térmico.',
        image: '/img/solucoes-page/solucoes-construcao-civil.avif',
        link: '/categorias/construcao-civil'
    },
    {
        id: 3,
        title: 'Molduras Decorativas',
        description: 'Molduras em EPS para portas, janelas, beirais e mais. Leves, duráveis e de fácil instalação, são ideais para acabamentos decorativos em ambientes internos e externos.',
        image: '/img/solucoes-page/solucoes-molduras.avif',
        link: '/categorias/molduras-decorativas'
    },
    {
        id: 4,
        title: 'Embalagens em EPS',
        description: 'Embalagens personalizadas em EPS para proteção de produtos durante transporte. Leves, resistentes e versáteis, atendem às necessidades de diversos setores industriais.',
        image: '/img/solucoes-page/solucoes-embalagens.avif',
        link: '/categorias/embalagens-em-eps'
    }
];

function SolucoesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className={styles['hero-section']}>
                <div className={styles['hero-mask']}>
                    <div className={styles['hero-wrapper']}>
                        <h1 className={styles['hero-title']}>
                            Nossas Soluções
                        </h1>
                    </div>
                </div>
            </section>

            {/* Soluções Section */}
            <section className={styles['solucoes-section']}>
                <div className={styles['solucoes-wrapper']}>
                    {solucoes.map((solucao) => (
                        <div key={solucao.id} className={styles['solucao-item']}>
                            <Image
                                src={solucao.image}
                                alt={solucao.title}
                                width={600}
                                height={400}
                                className={styles['solucao-image']}
                            />
                            <div className={styles['solucao-content']}>
                                <h2 className={styles['solucao-title']}>
                                    {solucao.title}
                                </h2>
                                <p className={styles['solucao-description']}>
                                    {solucao.description}
                                </p>
                                <div className={styles['solucao-button']}>
                                    <Link href={solucao.link}>
                                        <Button variant="primary" size="medium">
                                            Saiba mais
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default SolucoesPage; 