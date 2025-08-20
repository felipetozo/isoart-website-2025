"use client";
import styles from "./page.module.css";
import Button from "../views/ui/button/button";
import Sustentabilidade from "../components/Sustentabilidade/sustentabilidade";
import IncendioComponent from "../components/pir-incendio/pir-incendio";
import { CheckCircle } from "lucide-react";
import { TbAlertTriangle } from "react-icons/tb";
import Image from "next/image";

const incendioBlocos = [
  { number: '01', destaque: 'Impede a propagação', legenda:'A camada carbonizada retarda significativamente a queima do material, contendo o foco do incêndio e evitando que as chamas se espalhem pela estrutura' },
  { number: '02', destaque: 'Protege o núcleo', legenda:'Isola o restante do painel do calor intenso, mantendo a integridade estrutural por mais tempo' },
  { number: '03', destaque: 'Baixa emissão de fumaça', legenda:'Contribui para manter as rotas de fuga mais visíveis e seguras' },
];

function SobreEpsPirPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-mask']}>
          <div className={styles['hero-wrapper']}>
            <h2 className={styles['hero-title']}>Sobre o EPS e o PIR</h2>
          </div>
        </div>
      </section>

      {/* Hero Headline + Botões */}
      <section className={styles['hero-headline-section']}>
        <div className={styles['hero-headline-wrapper']}>
          <div className={styles['hero-headline-container']}>
            <h1 className={styles['hero-headline']}>
              <span className="blueText">Poliestireno Expandido (EPS) e Espuma Rígida de Poliisocianurato (PIR):</span> eficiência térmica, sustentabilidade e tecnologia para construções modernas.
            </h1>
            <div className={styles['hero-buttons']}>
              <a href="#eps">
                <Button variant="primary" size="medium">Conheça o EPS</Button>
              </a>
              <a href="#pir">
                <Button variant="primary" size="medium">Conheça o PIR</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção EPS */}
      <section id="eps" className={styles['eps-section']}>
        <div className={styles['eps-wrapper']}>
          <div className={styles['eps-container']}>
            <h2 className={styles['eps-title']}>EPS: Eficiência e Sustentabilidade</h2>
            <p className={styles['eps-description']}>
              O Poliestireno Expandido (EPS), conhecido popularmente como Isopor, é um material leve e versátil, amplamente utilizado por suas propriedades de isolamento térmico e acústico. Além disso, é 100% reciclável e não emite substâncias prejudiciais ao meio ambiente, sendo uma escolha sustentável para diversas aplicações.
            </p>
            <div className={styles['eps-image-container']}>
              <img src="/img/geral/eps-perolas.avif" alt="Pérola de EPS - Isoart" className={styles['eps-image']} />
            </div>
            <h2 className={styles['eps-subtitle']}>Principais benefícios do EPS:</h2>
            <div className={styles['benefits-container']}>
              <div className={styles['benefits-grid']}>
                {[
                  "Atóxico e sustentável",
                  "Sem emissão de CFC",
                  "100% reciclável e reaproveitável",
                  "Material leve e resistente a impactos",
                ].map((benefit) => (
                  <div className={styles['benefit-item']} key={benefit}>
                    <span className={styles['benefit-icon']}><CheckCircle size={28} strokeWidth={2.5} /></span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className={styles['eps-subtitle']}>Aplicações</h3>
            <p className={styles['eps-description']}>
              Utilizado em isolamento térmico e acústico, embalagens, construção civil, decoração e outras aplicações. Ideal para edificações comerciais, industriais e residenciais, garantindo eficiência energética, conforto e proteção.
            </p>
            <div className={styles['applications-container']}>
              <div className={styles['applications-grid']}>
                <img src="/img/EPS/EPS-Aplicacao-01.avif" alt="Aplicação 1" className={styles['application-image']} />
                <img src="/img/EPS/EPS-Aplicacao-02.avif" alt="Aplicação 2" className={styles['application-image']} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reciclagem de EPS / Sustentabilidade */}
      <Sustentabilidade />
      
      {/* Sobre o PIR */}
      <section id="pir" className={styles['pir-section']}>
        <div className={styles['pir-wrapper']}>
          <div className={styles['pir-container']}>
            <h2 className={styles['pir-title']}>PIR: Alta Tecnologia e Segurança</h2>
            <p className={styles['pir-description']}>
              O Poliisocianurato (PIR) é um material isolante de alto desempenho, utilizado principalmente na fabricação de telhas
              e painéis térmicos. Produzido em linha contínua automatizada, o PIR garante um isolamento térmico superior e alta resistência
              ao fogo, sendo essencial para projetos industriais, comerciais e residenciais.
            </p>
            <div className={styles['pir-image-container']}>
              <img src="/img/geral/pir-block.avif" alt="PIR exemplo" className={styles['pir-image']} />
            </div>
            <h2 className={styles['pir-subtitle']}>Principais benefícios do PIR:</h2>
            <div className={styles['benefits-container']}>
              <div className={styles['benefits-grid']}>
                {[
                  "Isolamento térmico de alto desempenho",
                  "Resistência ao fogo, com retardante autoextinguível",
                  "Maior durabilidade e resistência mecânica",
                  "Montagem rápida e limpa",
                  "Ótimo isolamento acústico ( -30dB )",
                  "Sustentável, em conformidade com o Protocolo de Montreal",
                ].map((benefit) => (
                  <div className={styles['benefit-item']} key={benefit}>
                    <span className={styles['benefit-icon']}><CheckCircle size={28} strokeWidth={2.5} /></span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicações do PIR */}
      <section className={styles['pir-applications-section']}>
        <div className={styles['pir-applications-wrapper']}>
          <div className={styles['pir-applications-container']}>
            <h2 className={styles['pir-applications-title']}>Aplicações do PIR:</h2>
            <p className={styles['pir-applications-description']}>
              Para cobertura e/ou fechamento de prédios e galpões industriais e comerciais, como supermercados, shopping centers,
              centros de distribuição e armazenagem, hospitais, agronegócios, ginásios e indústrias em geral, inclusive para residências.
            </p>
            <div className={styles['applications-container']}>
              <div className={styles['applications-grid']}>
              <img src="/img/PIR/PIR-Aplicacao-01.avif" alt="Aplicação 1" className={styles['application-image']} />
              <img src="/img/PIR/PIR-Aplicacao-02.avif" alt="Aplicação 2" className={styles['application-image']} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de revestimentos e Cores */}
      <section className={styles['revestimentos-section']}>
        <div className={styles['revestimentos-wrapper']}>
          <div className={styles['revestimentos-container']}>
            <h2 className={styles['revestimentos-title']}>Tipos de revestimentos e Cores</h2>
            <p className={styles['revestimentos-description']}>
              As telhas e painéis Isoart PIR são disponibilizados em diferentes tipos de revestimentos e cores, garantindo flexibilidade na escolha para atender às necessidades específicas de cada projeto.
            </p>
            <div className={styles['revestimentos-grid']}>
              <div className={styles['revestimento-item']}>
                <img src="/img/PIR/PIR-Revestimentos-01.avif" alt="Aço microfrisado" className={styles['revestimento-image']} />
                <p className={styles['revestimento-title']}>Aço microfrisado</p>
              </div>
              <div className={styles['revestimento-item']}>
                <img src="/img/PIR/PIR-Revestimentos-02.avif" alt="Aço frisado" className={styles['revestimento-image']} />
                <p className={styles['revestimento-title']}>Aço frisado</p>
              </div>
              <div className={styles['revestimento-item']}>
                <img src="/img/PIR/PIR-Revestimentos-03.avif" alt="Revestimento 3" className={styles['revestimento-image']} />
                <p className={styles['revestimento-title']}>Filme alumínio de face branca ou preta</p>
              </div>
            </div>
            <div className={styles['revestimentos-cores']}>
              <div className={styles['cores-grid']}>
                {[
                  { id: 'ral9003', code: 'RAL 9003', name: 'Branco Sinal', type: 'image', image: '/img/PIR/RAL9003---BRANCO.avif' },
                  { id: 'ral7035', code: 'RAL 7035', name: 'Cinza Claro', type: 'image', image: '/img/PIR/RAL7035---CINZA-CLARO.avif' },
                  { id: 'ral7040', code: 'RAL 7040', name: 'Cinza Médio', type: 'image', image: '/img/PIR/RAL7040---CINZA-MÉDIO.avif' },
                  { id: 'ral7024', code: 'RAL 7024', name: 'Cinza Grafite', type: 'image', image: '/img/PIR/RAL7024---CINZA-GRAFITE.avif' },
                  { id: 'ral9006', code: 'RAL 9006', name: 'Prata', type: 'color' },
                  { id: 'ral1015', code: 'RAL 1015', name: 'Marfim', type: 'image', image: '/img/PIR/RAL1015---MARFIM.avif' },
                  { id: 'ral1023', code: 'RAL 1023', name: 'Amarelo', type: 'image', image: '/img/PIR/RAL1023---AMARELO.avif' },
                  { id: 'ral8023', code: 'RAL 8023', name: 'Terracota', type: 'image', image: '/img/PIR/RAL8023---TERRACOTA.avif' },
                  { id: 'ral3000', code: 'RAL 3000', name: 'Vermelho Fogo', type: 'image', image: '/img/PIR/RAL3000---VERMELHO.avif' },
                  { id: 'ral5010', code: 'RAL 5010', name: 'Azul Genciana', type: 'image', image: '/img/PIR/RAL5010---AZUL.avif' },
                  { id: 'ral6002', code: 'RAL 6002', name: 'Verde Tráfego', type: 'image', image: '/img/PIR/RAL6002---VERDE.avif' },
                  { id: 'ral9005', code: 'RAL 9005', name: 'Preto', type: 'image', image: '/img/PIR/RAL9005---PRETO.avif' },
                  { 
                    id: 'galvanizado',
                    code: '', 
                    name: 'Natural Galvanizado', 
                    type: 'image',
                    image: '/img/PIR/NATURAL-GALVANIZADO.avif'
                  },
                  { 
                    id: 'amadeirado-claro',
                    code: '', 
                    name: 'Amadeirado Claro', 
                    type: 'image',
                    image: '/img/PIR/AMADEIRADO-CLARO.avif'
                  },
                  { 
                    id: 'amadeirado-escuro',
                    code: '', 
                    name: 'Amadeirado Escuro', 
                    type: 'image',
                    image: '/img/PIR/AMADEIRADO-ESCURO.avif'
                  },
                ].map((item) => (
                  <div className={styles['cor-item']} key={item.id}>
                    {item.type === 'color' ? (
                      <span 
                        className={styles['cor-thumb']} 
                        style={{ 
                          backgroundColor: item.code === 'RAL 9006' ? 'rgb(var(--ral-9006))' : '#ccc'
                        }}
                      ></span>
                    ) : (
                      <div className={styles['textura-thumb']}>
                        <Image
                          src={item.image || ''}
                          alt={item.name}
                          width={80}
                          height={80}
                          className={styles['textura-image']}
                        />
                      </div>
                    )}
                    <p className={styles['cor-code']}>{item.code}</p>
                    <p className={styles['cor-name']}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles['revestimentos-aviso']}>
            <span className="aviso-azul">
              Padrão Branco RAL 9003. As outras cores são sugestões, disponibilidade sob consulta.
            </span>
          </div>
        </div>
      </section>

      {/* Proteção contra incêndio */}
      <IncendioComponent />

      {/* Linha de produção */}
      <section className={styles['linha-producao-section']}>
        <div className={styles['linha-producao-wrapper']}>
          <h3>
            Produção automatizada para máximo eficiência
          </h3>
          <span>
            As telhas e painéis Isoart PIR são fabricadas em linha contínua e totalmente automatizada, garantindo alta precisão, qualidade e sustentabilidade.
            Com núcleo isolante de Poliisocianurato (PIR) e revestimento em chapas de aço galvalume, o processo inclui injeção de alta pressão, prensagem contínua
            e corte automatizado, assegurando excelente adesão, acabamento e padronização. Todos os produtos são resfriados, empilhados e embalados automaticamente,
            prontos para expedição.
          </span>
          <div className={styles['linha-producao-images']}>
            <span>
              <Image
                src="/img/fabrica/fabrica-01.avif"
                alt="Proteção contra incêndio com PIR"
                width={600}
                height={818}
                priority
              />
            </span>
            <span>
              <Image
                src="/img/fabrica/fabrica-02.avif"
                alt="Proteção contra incêndio com PIR"
                width={600}
                height={818}
                priority
              />
            </span>
            <span>
              <Image
                src="/img/fabrica/fabrica-03.avif"
                alt="Proteção contra incêndio com PIR"
                width={600}
                height={818}
                priority
              />
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default SobreEpsPirPage;