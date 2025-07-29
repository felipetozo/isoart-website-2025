"use client";
import MainForm from '@/app/components/MainForm/MainForm';
import Sustentabilidade from '@/app/components/Sustentabilidade/Sustentabilidade';
import styles from './page.module.css';
import { useState, useRef, useEffect } from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { gsap } from 'gsap';

const TIMELINE = [
  {
    year: '2008',
    label: 'os primeiros passos',
    description:
      'Fundada em Santa Tereza do Oeste, Paraná, a Isoart iniciou sua trajetória com o propósito de oferecer soluções inovadoras e sustentáveis em Poliestireno Expandido (EPS). Desde o primeiro momento, a empresa estabeleceu um compromisso com a qualidade e a transparência, atendendo diferentes setores com excelência e construindo uma base sólida de confiança no mercado.',
    image: '/img/geral/endereco-01-01.avif',
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

export default function SobrePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [imgPos, setImgPos] = useState<{ x: number; y: number } | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  // Função para animar entrada da imagem
  const animateImageIn = (index: number) => {
    const imageRef = imageRefs.current[index];
    if (imageRef && !isMobile) {
      // Reset da imagem para estado inicial
      gsap.set(imageRef, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        rotation: -5,
        transformOrigin: "center center"
      });
      
      // Animação de entrada com efeito de blur e rotação
      gsap.to(imageRef, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
      
      // Esconder o cursor
      document.body.style.cursor = 'none';
    }
  };

  // Função para animar saída da imagem
  const animateImageOut = (index: number) => {
    const imageRef = imageRefs.current[index];
    if (imageRef && !isMobile) {
      gsap.to(imageRef, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(5px)",
        rotation: 5,
        duration: 0.4,
        ease: "back.in(1.7)"
      });
      
      // Mostrar o cursor novamente
      document.body.style.cursor = 'auto';
    }
  };

  // Configuração inicial das imagens
  useEffect(() => {
    if (!isMobile) {
      const imageItems = imageRefs.current.filter(Boolean) as HTMLImageElement[];
      
      // Configuração inicial das imagens
      gsap.set(imageItems, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        rotation: -5
      });
    }
  }, [isMobile]);

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroMask}>
          <div className={styles.heroWrapper}>
            <h2 className={styles.heroTitle}>sobre nós</h2>
          </div>
        </div>
      </section>

      {/* Hero Headline */}
      <section className={styles.heroHeadlineSection}>
        <div className={styles.heroHeadlineWrapper}>
          <h1 className={styles.heroHeadline}>
            Soluções inovadoras, sustentáveis e de alta qualidade em <span className="blueText">Poliestireno Expandido (EPS)</span> e <span className="blueText">Espuma Rígida de Poliisocianurato (PIR)</span> que atendem às diversas demandas do mercado.
          </h1>
        </div>
      </section>

      {/* Vídeo institucional */}
      <section className={styles.videoSection}>
        <div className={styles.videoWrapper}>
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
       <section className={styles.timelineSection}>
        <div className={styles.timelineWrapper}>
        <h5 className={styles.timelineTitle}>
          Uma história marcada por grandes sucessos:
        </h5>
        <div className={styles.timelineList}>
          {TIMELINE.map((item, idx) => (
            <div
              key={item.year}
              className={
                styles.timelineItem +
                (activeIndex === idx ? ' ' + styles.timelineItemActive : '')
              }
              onMouseEnter={() => {
                setActiveIndex(idx);
                animateImageIn(idx);
              }}
              onMouseLeave={() => {
                animateImageOut(idx);
                setActiveIndex(null);
              }}
              onMouseMove={e => {
                if (!isMobile && activeIndex === idx) {
                  const section = e.currentTarget as HTMLDivElement;
                  const rect = section.getBoundingClientRect();
                  const newPos = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  };
                  setImgPos(newPos);
                  
                  // Animação suave do movimento da imagem
                  const imageRef = imageRefs.current[idx];
                  if (imageRef) {
                    gsap.to(imageRef, {
                      left: newPos.x + 40,
                      top: newPos.y,
                      duration: 0.1,
                      ease: "power2.out"
                    });
                  }
                }
              }}
            >
              <div style={{ flex: 1, minWidth: 120 }}>
                <div className={styles.timelineDate}>{item.year}</div>
                <div className={styles.timelineLabel}>{item.label}</div>
                {/* Mobile: imagem entre label e descrição */}
                {isMobile && (
                  <img
                    src={item.image}
                    alt={item.label}
                    className={styles.timelineImage}
                    style={{ position: 'static', opacity: 1, pointerEvents: 'auto', width: '100%', height: 180, margin: '1.5rem 0 1rem 0', transform: 'none' }}
                  />
                )}
              </div>
              <div style={{ flex: 5 }}>
                <div className={styles.timelineDescription}>{item.description}</div>
              </div>
              {/* Desktop: imagem flutuante ao lado, segue o mouse */}
              {!isMobile && (
                <img
                  ref={(el: HTMLImageElement | null) => {
                    imageRefs.current[idx] = el;
                  }}
                  src={item.image}
                  alt={item.label}
                  className={styles.timelineImage}
                />
              )}
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Galeria de imagens */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryGrid}>
          <img src="/img/geral/endereco-01-01.avif" alt="Exemplo 1" className={styles.galleryImage} />
          <img src="/img/geral/endereco-02-01.avif" alt="Exemplo 2" className={styles.galleryImage} />
          <img src="/img/geral/endereco-03-01.avif" alt="Exemplo 3" className={styles.galleryImage} />
        </div>
      </section>

              <section className={styles.mapSection}>
          <img src="/img/geral/isoart-mapa.avif" alt="Mapa da Isoart" className={styles.mapImage} />
          <div className={styles.mapOverlay}>
            <div className={styles.mapOverlayWrapper}>
              <div className={styles.mapOverlayContent}>
                <h2 className={styles.mapOverlayTitle}>
                  Atendimento em todo Brasil, Paraguai e Uruguai.
                </h2>
                <p className={styles.mapOverlayText}>
                  A Isoart possui 3 fábricas estrategicamente localizadas nas regiões oeste do Paraná e Santa Catarina, 
                  garantindo cobertura completa em todo território brasileiro, paraguaio e uruguaio com excelência e qualidade.
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* Missão, Visão e Valores */}
      <section className={styles.mvvSection}>
        <div className={styles.mvvWrapper}>
          <div className={styles.mvvItem}>
            <Target className={styles.mvvIcon} />
            <h3 className={styles.mvvTitle}>Missão</h3>
            <p className={styles.mvvDescription}>
            Satisfazer as necessidades dos clientes, superando suas expectativas,
            através da excelência na fabricação e distribuição dos produtos de EPS,
            gerando soluções inovadoras, com rentabilidade e respeito ao meio ambiente.
            </p>
          </div>
          
          <div className={styles.mvvItem}>
            <Eye className={styles.mvvIcon} />
            <h3 className={styles.mvvTitle}>Visão</h3>
            <p className={styles.mvvDescription}>
              Ser reconhecida como a empresa referência no setor em que atua, agregando valor
              social e econômico, dentro de princípios éticos e sustentáveis.
            </p>
          </div>
          
          <div className={styles.mvvItem}>
            <Heart className={styles.mvvIcon} />
            <h3 className={styles.mvvTitle}>Valores</h3>
            <p className={styles.mvvDescription}>
              Compromisso com a qualidade, excelência no atendimento, respeito ao meio ambiente,
              transparência nas ações, valorização da vida, inovação e ousadia.
            </p>
          </div>
        </div>
      </section>

      {/* Política de Qualidade */}
      <section className={styles.qualitySection}>
        <div className={styles.qualityWrapper}>
          <div className={styles.qualityLeftColumn}>
            <h4 className={styles.qualityTitle}>Política de qualidade</h4>
            <p className={styles.qualityDescription}>
            O Grupo Isoart, através da Política de Qualidade estabelece as diretrizes pelas quais declara seu compromisso com a satisfação dos clientes, colaboradores e comunidade.
            </p>
            <p className={styles.qualityDescription}>
              Nesse sentido, buscamos a melhoria contínua do Sistema da Gestão da Qualidade, fundamentando nossas ações nas seguintes premissas:
            </p>
            <img src="/img/geral/selo-iso.svg" alt="Selo de Qualidade ISO" className={styles.qualityImage} />
          </div>
          
          <div className={styles.qualityRightColumn}>
            <div className={styles.qualityItem}>
              <h3 className={styles.qualityItemNumber}>01</h3>
              <p className={styles.qualityItemText}>
                Garantir a satisfação dos clientes, oferecendo produtos e serviços com qualidade.
              </p>
            </div>
            
            <div className={styles.qualityItem}>
              <h3 className={styles.qualityItemNumber}>02</h3>
              <p className={styles.qualityItemText}>
                Compartilhar nossos valores, construindo parcerias duradouras que resultem em ganhos para ambas as partes.
              </p>
            </div>
            
            <div className={styles.qualityItem}>
              <h3 className={styles.qualityItemNumber}>03</h3>
              <p className={styles.qualityItemText}>
                Manter um bom ambiente de trabalho, valorizando a segurança e o respeito à vida.
              </p>
            </div>
            
            <div className={styles.qualityItem}>
              <h3 className={styles.qualityItemNumber}>04</h3>
              <p className={styles.qualityItemText}>
                Buscar a melhoria contínua e o controle dos processos via indicadores de desempenho, favorecendo a obtenção e manutenção de vantagens competitivas.
              </p>
            </div>
            
            <div className={styles.qualityItem}>
              <h3 className={styles.qualityItemNumber}>05</h3>
              <p className={styles.qualityItemText}>
                Promover ações sustentáveis almejando o mínimo impacto ambiental.
              </p>
            </div>
            
            <div className={styles.qualityItem}>
              <h3 className={styles.qualityItemNumber}>06</h3>
              <p className={styles.qualityItemText}>
                Treinar e capacitar todos os colaboradores visando o cumprimento da Política de Qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Sustentabilidade />

      <MainForm />
    </div>
  );
}