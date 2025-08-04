"use client";
import styles from "./page.module.css";
import Button from "@/app/views/ui/button/button";
import Sustentabilidade from "@/app/components/sustentabilidade/sustentabilidade";
import { CheckCircle } from "lucide-react";
import { FlameOff } from "tabler-icons-react";
import Image from "next/image";

const incendioBlocos = [
  { number: '01', destaque: 'Impede a propagação', legenda:'A camada carbonizada retarda significativamente a queima do material, contendo o foco do incêndio e evitando que as chamas se espalhem pela estrutura' },
  { number: '02', destaque: 'Protege o núcleo', legenda:'Isola o restante do painel do calor intenso, mantendo a integridade estrutural por mais tempo' },
  { number: '03', destaque: 'Baixa emissão de fumaça', legenda:'Contribui para manter as rotas de fuga mais visíveis e seguras' },
];

export default function SobreEpsPirPage() {
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
                  "Isolamento térmico eficiente",
                  "Excelente isolamento acústico",
                  "Atóxico e sustentável",
                  "Sem emissão de CFC",
                  "Reciclável e reaproveitável",
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
                <p className={styles['revestimento-title']}>Filme alumínio de face branca ou PVC</p>
              </div>
            </div>
            <div className={styles['revestimentos-cores']}>
              <div className={styles['cores-grid']}>
                {[
                  { id: 'ral9003', code: 'RAL 9003', name: 'Branco Sinal', type: 'color' },
                  { id: 'ral7035', code: 'RAL 7035', name: 'Cinza Claro', type: 'color' },
                  { id: 'ral7040', code: 'RAL 7040', name: 'Cinza Médio', type: 'color' },
                  { id: 'ral7024', code: 'RAL 7024', name: 'Cinza Grafite', type: 'color' },
                  { id: 'ral9006', code: 'RAL 9006', name: 'Prata', type: 'color' },
                  { id: 'ral1015', code: 'RAL 1015', name: 'Marfim', type: 'color' },
                  { id: 'ral1023', code: 'RAL 1023', name: 'Amarelo', type: 'color' },
                  { id: 'ral8023', code: 'RAL 8023', name: 'Terracota', type: 'color' },
                  { id: 'ral3000', code: 'RAL 3000', name: 'Vermelho Fogo', type: 'color' },
                  { id: 'ral5010', code: 'RAL 5010', name: 'Azul Genciana', type: 'color' },
                  { id: 'ral6002', code: 'RAL 6002', name: 'Verde Tráfego', type: 'color' },
                  { id: 'ral9005', code: 'RAL 9005', name: 'Preto', type: 'color' },
                  { 
                    id: 'galvanizado',
                    code: '', 
                    name: 'Natural Galvanizado', 
                    type: 'texture',
                    image: '/img/PIR/PIR-Textura-01.avif'
                  },
                  { 
                    id: 'amadeirado-claro',
                    code: '', 
                    name: 'Amadeirado Claro', 
                    type: 'texture',
                    image: '/img/PIR/PIR-Textura-02.avif'
                  },
                  { 
                    id: 'amadeirado-escuro',
                    code: '', 
                    name: 'Amadeirado Escuro', 
                    type: 'texture',
                    image: '/img/PIR/PIR-Textura-03.avif'
                  },
                ].map((item) => (
                  <div className={styles['cor-item']} key={item.id}>
                    {item.type === 'color' ? (
                      <span 
                        className={styles['cor-thumb']} 
                        style={{ 
                          backgroundColor: item.code === 'RAL 9003' ? 'rgb(var(--ral-9003))' :
                          item.code === 'RAL 7035' ? 'rgb(var(--ral-7035))' :
                          item.code === 'RAL 7040' ? 'rgb(var(--ral-7040))' :
                          item.code === 'RAL 7024' ? 'rgb(var(--ral-7024))' :
                          item.code === 'RAL 9006' ? 'rgb(var(--ral-9006))' :
                          item.code === 'RAL 1015' ? 'rgb(var(--ral-1015))' :
                          item.code === 'RAL 1023' ? 'rgb(var(--ral-1023))' :
                          item.code === 'RAL 8023' ? 'rgb(var(--ral-8023))' :
                          item.code === 'RAL 3000' ? 'rgb(var(--ral-3000))' :
                          item.code === 'RAL 5010' ? 'rgb(var(--ral-5010))' :
                          item.code === 'RAL 6002' ? 'rgb(var(--ral-6002))' :
                          item.code === 'RAL 9005' ? 'rgb(var(--ral-9005))' : '#ccc'
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
      <section className={styles['incendio-section']}>
        <div className={styles['incendio-wrapper']}>
          <div className={styles['incendio-header']}>
            <span className={styles['incendio-title']}>
              <span className={styles['incendio-title-icon']}>
                <FlameOff />
              </span>
              <h3>
                PIR: O escudo protetor contra a propagação de incêndios
              </h3>
            </span>
            <span className={styles['incendio-header-description']}>
                A performance do Poliisocianurato (PIR) em situações de incêndio é um de seus maiores
                diferenciais, oferecendo uma camada de proteção passiva essencial para qualquer edificação.
                Diferente de outros materiais, o PIR não contribui para a propagação de chamas.
                <br /><br />
                Quando exposto ao fogo, o núcleo do painel de PIR reage de forma única: ele forma uma
                camada carbonizada estável e isolante em sua superfície. Essa barreira de carbono age como
                um escudo protetor, realizando três funções cruciais:
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