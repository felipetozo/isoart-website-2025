'use client';

import styles from './pir-incendio.module.css';
import Image from 'next/image';
import { TbAlertTriangle } from "react-icons/tb";

const incendioBlocos = [
    { number: '01', destaque: 'Impede a propagação', legenda:'A camada carbonizada retarda significativamente a queima do material, contendo o foco do incêndio e evitando que as chamas se espalhem pela estrutura' },
    { number: '02', destaque: 'Protege o núcleo', legenda:'Isola o restante do painel do calor intenso, mantendo a integridade estrutural por mais tempo' },
    { number: '03', destaque: 'Baixa emissão de fumaça', legenda:'Contribui para manter as rotas de fuga mais visíveis e seguras' },
  ];

function IncendioComponent() {
    return (
        <section className={styles['incendio-section']}>
            <div className={styles['incendio-wrapper']}>
                <div className={styles['incendio-header']}>
                    <span className={styles['incendio-title']}>
                        <h3>
                            PIR: O escudo protetor contra a propagação de incêndios
                        </h3>
                        <span className={styles['incendio-header-description']}>
                            A performance do Poliisocianurato (PIR) em situações de incêndio é um de seus maiores
                            diferenciais, oferecendo uma camada de proteção passiva essencial para qualquer edificação.
                            Diferente de outros materiais, o PIR não contribui para a propagação de chamas.
                            <br /><br />
                            Quando exposto ao fogo, o núcleo do painel de PIR reage de forma única: ele forma uma
                            camada carbonizada estável e isolante em sua superfície. Essa barreira de carbono age como
                            um escudo protetor, realizando três funções cruciais:
                        </span>
                    </span>
                    <span className={styles['incendio-icon']}>
                        <span className={styles['incendio-title-icon']}>
                            <TbAlertTriangle />
                        </span>
                    </span>
                </div>
            <div className={styles['incendio-blocos']}>
                {incendioBlocos.map((b, i) =>
                    <div className={styles['incendio-bloco']} key={i}>
                        <span className={styles['incendio-bloco-number']}>
                            <h4>
                                {b.number}
                            </h4>
                        </span>
                        <span>
                            <strong>{b.destaque}:</strong> {b.legenda}
                        </span>
                    </div>
                )}
            </div>
            <div className={styles['incendio-images']}>
                <span>
                    <Image
                    src="/img/incendio/pir-incendio-01.avif"
                    alt="Proteção contra incêndio com PIR"
                    width={600}
                    height={818}
                    priority
                    />
                </span>
                <span>
                    <Image
                    src="/img/incendio/pir-incendio-02.avif"
                    alt="Proteção contra incêndio com PIR"
                    width={600}
                    height={818}
                    priority
                    />
                </span>
                <span>
                    <Image
                    src="/img/incendio/pir-incendio-03.avif"
                    alt="Proteção contra incêndio com PIR"
                    width={600}
                    height={818}
                    priority
                    />
                </span>
            </div>
            <span className={styles['incendio-teste']}>
                O teste demonstrado nas imagens comprova essa eficiência. Mesmo sob a ação direta de um queimador de 30kW por 30 minutos, o fogo ficou restrito
                à área de contato. Ao final, o resultado foi apenas uma carbonização superficial, com o restante do painel intacto e sem qualquer propagação de fogo,
                demonstrando por que o PIR é a escolha mais segura e inteligente para o seu projeto.
            </span>
        </div>
        </section>
    );
};

export default IncendioComponent;