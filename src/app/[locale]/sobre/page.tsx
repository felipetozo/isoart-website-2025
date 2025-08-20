"use client";
import ContactComponent from '../components/contact/contact-component';
import Sustentabilidade from '../components/Sustentabilidade/sustentabilidade';
import styles from './page.module.css';
import { Target, Eye, Heart } from 'lucide-react';

const TIMELINE = [
  {
    year: '2008',
    label: 'os primeiros passos',
    description:
      'Fundada em Santa Tereza do Oeste, Paraná, a Isoart iniciou sua trajetória com o propósito de oferecer soluções inovadoras e sustentáveis em Poliestireno Expandido (EPS). Desde o primeiro momento, a empresa estabeleceu um compromisso com a qualidade e a transparência, atendendo diferentes setores com excelência e construindo uma base sólida de confiança no mercado.',
    image: '/img/geral/endereco-01-01-optimized.webp',
  },
  {
    year: '2015',
    label: 'Um novo capítulo',
    description:
      'A expansão para Xanxerê, Santa Catarina, marcou um ponto decisivo na história da Isoart. A inauguração da Fábrica 2 trouxe novas oportunidades, consolidando a empresa como uma das principais indústrias transformadoras de EPS do Brasil. Essa unidade não apenas aumentou a capacidade produtiva, mas também reforçou o compromisso com a sustentabilidade ao focar na industrialização e reciclagem de produtos em EPS.',
    image: '/img/geral/endereco-02-01.avif',
  },
  {
    year: '2021',
    label: 'Projeto expandir',
    description:
      'Com o lançamento do projeto expandir, a Isoart inaugurou a moderna Fábrica 3 em Santa Tereza do Oeste, Paraná. Essa instalação representa um marco na evolução da empresa, projetada para atender às demandas de construções modernas e sustentáveis. Equipada com tecnologia de ponta, a Fábrica 3 produz telhas térmicas e isopainéis em linha contínua, com núcleos isolantes em Espuma Rígida de Poliisocianurato, PIR, ou EPS.',
    image: '/img/geral/endereco-03-01.avif',
  },
];

function SobrePage() {

  return (
    <div>
      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-mask']}>
          <div className={styles['hero-wrapper']}>
            <h2 className={styles['hero-title']}>sobre nós</h2>
          </div>
        </div>
      </section>

      {/* Hero Headline */}
      <section className={styles['hero-headline-section']}>
        <div className={styles['hero-headline-wrapper']}>
          <h1 className={styles['hero-headline']}>
            Soluções inovadoras, sustentáveis e de alta qualidade em <span className="blue-text">Poliestireno Expandido (EPS)</span> e <span className="blue-text">Espuma Rígida de Poliisocianurato (PIR)</span> que atendem às diversas demandas do mercado.
          </h1>
        </div>
      </section>

      {/* Vídeo institucional */}
      <section className={styles['video-section']}>
        <div className={styles['video-wrapper']}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/EzN1y68T3OI"
            title="Vídeo Institucional Isoart"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          ></iframe>
        </div>
        <p className={styles.legenda}>
          Desde 2008, a Isoart tem liderado o mercado de soluções inovadoras e sustentáveis em Poliestireno Expandido (EPS) e Espuma Rígida de Poliisocianurato (PIR), atendendo às mais diversas demandas de indústrias, construções e outras aplicações. Com um compromisso inabalável com qualidade, inovação e sustentabilidade, a empresa tem consolidado sua posição como referência nacional no setor.
        </p>
      </section>

       {/* Linha do tempo */}
       <section className={styles['timeline-section']}>
        <div className={styles['timeline-wrapper']}>
        <h5 className={styles['timeline-title']}>
          Uma história marcada por grandes sucessos:
        </h5>
        <div className={styles['timeline-list']}>
          {TIMELINE.map((item, idx) => (
            <div
              key={item.year}
              className={styles['timeline-item']}
            >
              <div style={{ flex: 1, minWidth: 120 }}>
                <div className={styles['timeline-date']}>{item.year}</div>
                <div className={styles['timeline-label']}>{item.label}</div>
                <img
                  src={item.image}
                  alt={item.label}
                  className={`${styles['timeline-image']} ${styles['timeline-image-mobile']}`}
                  style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '0.2rem', marginTop: '1rem' }}
                />
              </div>
              <div style={{ flex: 5 }}>
                <div className={styles['timeline-description']}>{item.description}</div>
              </div>

            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Galeria de imagens */}
      <section className={styles['gallery-section']}>
        <div className={styles['gallery-grid']}>
                          <img src="/img/geral/endereco-01-01-optimized.webp" alt="Exemplo 1" className={styles['gallery-image']} loading="lazy" />
          <img src="/img/geral/endereco-02-01.avif" alt="Exemplo 2" className={styles['gallery-image']} />
          <img src="/img/geral/endereco-03-01.avif" alt="Exemplo 3" className={styles['gallery-image']} />
        </div>
      </section>

      <section className={styles['map-section']}>
        <img src="/img/geral/isoart-mapa-01.avif" alt="Mapa da Isoart" className={`${styles['map-image']} ${styles['map-image-mobile']}`} />
        <img src="/img/geral/isoart-mapa-02.avif" alt="Mapa da Isoart" className={`${styles['map-image']} ${styles['map-image-desktop']}`} />
        <div className={styles['map-overlay']}>
          <div className={styles['map-overlay-wrapper']}>
            <div className={styles['map-overlay-content']}>
              <h2 className={styles['map-overlay-title']}>
                Atendimento em todo Brasil, Paraguai e Uruguai.
              </h2>
              <p className={styles['map-overlay-text']}>
                A Isoart possui 3 fábricas estrategicamente localizadas nas regiões oeste do Paraná e Santa Catarina, 
                garantindo cobertura completa em todo território brasileiro, paraguaio e uruguaio com excelência e qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className={styles['mvv-section']}>
        <div className={styles['mvv-wrapper']}>
          <div className={styles['mvv-item']}>
            <Target className={styles['mvv-icon']} />
            <h3 className={styles['mvv-title']}>Missão</h3>
            <p className={styles['mvv-description']}>
            Satisfazer as necessidades dos clientes, superando suas expectativas,
            através da excelência na fabricação e distribuição dos produtos de EPS,
            gerando soluções inovadoras, com rentabilidade e respeito ao meio ambiente.
            </p>
          </div>
          
          <div className={styles['mvv-item']}>
            <Eye className={styles['mvv-icon']} />
            <h3 className={styles['mvv-title']}>Visão</h3>
            <p className={styles['mvv-description']}>
              Ser reconhecida como a empresa referência no setor em que atua, agregando valor
              social e econômico, dentro de princípios éticos e sustentáveis.
            </p>
          </div>
          
          <div className={styles['mvv-item']}>
            <Heart className={styles['mvv-icon']} />
            <h3 className={styles['mvv-title']}>Valores</h3>
            <p className={styles['mvv-description']}>
              Compromisso com a qualidade, excelência no atendimento, respeito ao meio ambiente,
              transparência nas ações, valorização da vida, inovação e ousadia.
            </p>
          </div>
        </div>
      </section>

      {/* Política de Qualidade */}
      <section className={styles['quality-section']}>
        <div className={styles['quality-wrapper']}>
          <div className={styles['quality-left-column']}>
            <h4 className={styles['quality-title']}>Política de qualidade</h4>
            <p className={styles['quality-description']}>
            O Grupo Isoart, através da Política de Qualidade estabelece as diretrizes pelas quais declara seu compromisso com a satisfação dos clientes, colaboradores e comunidade.
            </p>
            <p className={styles['quality-description']}>
              Nesse sentido, buscamos a melhoria contínua do Sistema da Gestão da Qualidade, fundamentando nossas ações nas seguintes premissas:
            </p>
            <img src="/img/geral/selo-iso.svg" alt="Selo de Qualidade ISO" className={styles['quality-image']} />
          </div>
          
          <div className={styles['quality-right-column']}>
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>01</h3>
              <p className={styles['quality-item-text']}>
                Garantir a satisfação dos clientes, oferecendo produtos e serviços com qualidade.
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>02</h3>
              <p className={styles['quality-item-text']}>
                Compartilhar nossos valores, construindo parcerias duradouras que resultem em ganhos para ambas as partes.
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>03</h3>
              <p className={styles['quality-item-text']}>
                Manter um bom ambiente de trabalho, valorizando a segurança e o respeito à vida.
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>04</h3>
              <p className={styles['quality-item-text']}>
                Buscar a melhoria contínua e o controle dos processos via indicadores de desempenho, favorecendo a obtenção e manutenção de vantagens competitivas.
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>05</h3>
              <p className={styles['quality-item-text']}>
                Promover ações sustentáveis almejando o mínimo impacto ambiental.
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>06</h3>
              <p className={styles['quality-item-text']}>
                Treinar e capacitar todos os colaboradores visando o cumprimento da Política de Qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Sustentabilidade />

              <ContactComponent />
    </div>
  );
}

export default SobrePage;