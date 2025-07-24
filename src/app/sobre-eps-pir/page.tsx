"use client";
import styles from "./page.module.css";
import Button from "@/app/views/UI/Button";
import Sustentabilidade from "@/app/components/Sustentabilidade/Sustentabilidade";
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
      <section className={styles.heroSection}>
        <div className={styles.heroMask}>
          <div className={styles.heroWrapper}>
            <h2 className={styles.heroTitle}>Sobre o EPS e o PIR</h2>
          </div>
        </div>
      </section>

      {/* Hero Headline + Botões */}
      <section className={styles.heroHeadlineSection}>
        <div className={styles.heroHeadlineWrapper}>
          <div className={styles.heroHeadlineContainer}>
            <h1 className={styles.heroHeadline}>
              <span className="blueText">Poliestireno Expandido (EPS) e Espuma Rígida de Poliisocianurato (PIR):</span> eficiência térmica, sustentabilidade e tecnologia para construções modernas.
            </h1>
            <div className={styles.heroButtons}>
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
      <section id="eps" className={styles.epsSection}>
        <div className={styles.epsWrapper}>
          <div className={styles.epsContainer}>
            <h2 className={styles.epsTitle}>EPS: Eficiência e Sustentabilidade</h2>
            <p className={styles.epsDescription}>
              O Poliestireno Expandido (EPS), conhecido popularmente como Isopor, é um material leve e versátil, amplamente utilizado por suas propriedades de isolamento térmico e acústico. Além disso, é 100% reciclável e não emite substâncias prejudiciais ao meio ambiente, sendo uma escolha sustentável para diversas aplicações.
            </p>
            <div className={styles.epsImageContainer}>
              <img src="/img/geral/eps-perolas.webp" alt="Pérola de EPS - Isoart" className={styles.epsImage} />
            </div>
            <h2 className={styles.epsSubtitle}>Principais benefícios do EPS:</h2>
            <div className={styles.benefitsContainer}>
              <div className={styles.benefitsGrid}>
                {[
                  "Isolamento térmico eficiente",
                  "Excelente isolamento acústico",
                  "Atóxico e sustentável",
                  "Sem emissão de CFC",
                  "Reciclável e reaproveitável",
                  "Material leve e resistente a impactos",
                ].map((benefit) => (
                  <div className={styles.benefitItem} key={benefit}>
                    <span className={styles.benefitIcon}><CheckCircle size={28} strokeWidth={2.5} /></span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className={styles.epsSubtitle}>Aplicações</h3>
            <p className={styles.epsDescription}>
              Utilizado em isolamento térmico e acústico, embalagens, construção civil, decoração e outras aplicações. Ideal para edificações comerciais, industriais e residenciais, garantindo eficiência energética, conforto e proteção.
            </p>
            <div className={styles.applicationsContainer}>
              <div className={styles.applicationsGrid}>
                <img src="/img/geral/exemplo.png" alt="Aplicação 1" className={styles.applicationImage} />
                <img src="/img/geral/exemplo2.png" alt="Aplicação 2" className={styles.applicationImage} />
                <img src="/img/geral/exemplo3.png" alt="Aplicação 3" className={styles.applicationImage} />
                <img src="/img/geral/exemplo.png" alt="Aplicação 4" className={styles.applicationImage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reciclagem de EPS / Sustentabilidade */}
      <Sustentabilidade />
      
      {/* Sobre o PIR */}
      <section id="pir" className={styles.pirSection}>
        <div className={styles.pirWrapper}>
          <div className={styles.pirContainer}>
            <h2 className={styles.pirTitle}>PIR: Alta Tecnologia e Segurança</h2>
            <p className={styles.pirDescription}>
              O Poliisocianurato (PIR) é um material isolante de alto desempenho, utilizado principalmente na fabricação de telhas
              e painéis térmicos. Produzido em linha contínua automatizada, o PIR garante um isolamento térmico superior e alta resistência
              ao fogo, sendo essencial para projetos industriais, comerciais e residenciais.
            </p>
            <div className={styles.pirImageContainer}>
              <img src="/img/geral/pir-block.png" alt="PIR exemplo" className={styles.pirImage} />
            </div>
            <h2 className={styles.pirSubtitle}>Principais benefícios do PIR:</h2>
            <div className={styles.benefitsContainer}>
              <div className={styles.benefitsGrid}>
                {[
                  "Isolamento térmico de alto desempenho",
                  "Resistência ao fogo, com retardante autoextinguível",
                  "Maior durabilidade e resistência mecânica",
                  "Montagem rápida e limpa",
                  "Ótimo isolamento acústico ( -30dB )",
                  "Sustentável, em conformidade com o Protocolo de Montreal",
                ].map((benefit) => (
                  <div className={styles.benefitItem} key={benefit}>
                    <span className={styles.benefitIcon}><CheckCircle size={28} strokeWidth={2.5} /></span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicações do PIR */}
      <section className={styles.pirApplicationsSection}>
        <div className={styles.pirApplicationsWrapper}>
          <div className={styles.pirApplicationsContainer}>
            <h2 className={styles.pirApplicationsTitle}>Aplicações do PIR:</h2>
            <p className={styles.pirApplicationsDescription}>
              Para cobertura e/ou fechamento de prédios e galpões industriais e comerciais, como supermercados, shopping centers,
              centros de distribuição e armazenagem, hospitais, agronegócios, ginásios e indústrias em geral, inclusive para residências.
            </p>
            <div className={styles.applicationsContainer}>
              <div className={styles.applicationsGrid}>
                <img src="/img/geral/exemplo.png" alt="Aplicação 1" className={styles.applicationImage} />
                <img src="/img/geral/exemplo2.png" alt="Aplicação 2" className={styles.applicationImage} />
                <img src="/img/geral/exemplo3.png" alt="Aplicação 3" className={styles.applicationImage} />
                <img src="/img/geral/exemplo.png" alt="Aplicação 4" className={styles.applicationImage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de revestimentos e Cores */}
      <section className={styles.revestimentosSection}>
        <div className={styles.revestimentosWrapper}>
          <div className={styles.revestimentosContainer}>
            <h2 className={styles.revestimentosTitle}>Tipos de revestimentos e Cores</h2>
            <p className={styles.revestimentosDescription}>
              As telhas e painéis Isoart PIR são disponibilizados em diferentes tipos de revestimentos e cores, garantindo flexibilidade na escolha para atender às necessidades específicas de cada projeto.
            </p>
            <div className={styles.revestimentosGrid}>
              <div className={styles.revestimentoItem}>
                <img src="/img/geral/exemplo.png" alt="Aço microfrisado" className={styles.revestimentoImage} />
                <p className={styles.revestimentoTitle}>Aço microfrisado</p>
              </div>
              <div className={styles.revestimentoItem}>
                <img src="/img/geral/exemplo.png" alt="Aço frisado" className={styles.revestimentoImage} />
                <p className={styles.revestimentoTitle}>Aço frisado</p>
              </div>
              <div className={styles.revestimentoItem}>
                <img src="/img/geral/exemplo.png" alt="Revestimento 3" className={styles.revestimentoImage} />
                <p className={styles.revestimentoTitle}>Filme alumínio de face branca ou PVC</p>
              </div>
            </div>
            <div className={styles.revestimentosCores}>
              <div className={styles.coresGrid}>
                {[
                  { code: 'RAL 9003', name: 'Branco Sinal' },
                  { code: 'RAL 7035', name: 'Cinza Claro' },
                  { code: 'RAL 9006', name: 'Cinza Alumínio' },
                  { code: 'RAL 1015', name: 'Bege Claro' },
                  { code: 'RAL 6032', name: 'Verde Tráfego' },
                  { code: 'RAL 5010', name: 'Azul Genciana' },
                  { code: 'RAL 3000', name: 'Vermelho Fogo' },
                ].map((cor) => (
                  <div className={styles.corItem} key={cor.code}>
                                         <span 
                       className={styles.corThumb} 
                       style={{ 
                         backgroundColor: cor.code === 'RAL 9003' ? 'rgb(241, 244, 247)' :
                         cor.code === 'RAL 7035' ? 'rgb(209, 214, 210)' :
                         cor.code === 'RAL 9006' ? 'rgb(178, 178, 178)' :
                         cor.code === 'RAL 1015' ? 'rgb(235, 223, 182)' :
                         cor.code === 'RAL 6032' ? 'rgb(0, 148, 92)' :
                         cor.code === 'RAL 5010' ? 'rgb(0, 82, 130)' :
                         cor.code === 'RAL 3000' ? 'rgb(192, 12, 14)' : '#ccc'
                       }}
                     ></span>
                    <p className={styles.corCode}>{cor.code}</p>
                    <p className={styles.corName}>{cor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.revestimentosAviso}>
            <span className="aviso-azul">
              Padrão Branco RAL 9003. As outras cores são sugestões, disponibilidade sob consulta.
            </span>
          </div>
        </div>
      </section>

      {/* Proteção contra incêndio */}
      <section className={styles.IncendioSection}>
        <div className={styles.IncendioWrapper}>
          <div className={styles.IncendioHeader}>
            <span className={styles.IncendioTitle}>
              <span className={styles.IncendioTitleIcon}>
                <FlameOff />
              </span>
              <h3>
                PIR: O escudo protetor contra a propagação de incêndios
              </h3>
            </span>
            <span className={styles.IncendioHeaderDescription}>
                A performance do Poliisocianurato (PIR) em situações de incêndio é um de seus maiores
                diferenciais, oferecendo uma camada de proteção passiva essencial para qualquer edificação.
                Diferente de outros materiais, o PIR não contribui para a propagação de chamas.
                <br /><br />
                Quando exposto ao fogo, o núcleo do painel de PIR reage de forma única: ele forma uma
                camada carbonizada estável e isolante em sua superfície. Essa barreira de carbono age como
                um escudo protetor, realizando três funções cruciais:
            </span>
          </div>
          <div className={styles.IncendioBlocos}>
            {incendioBlocos.map((b, i) =>
              <div className={styles.IncendioBloco} key={i}>
                <span className={styles.IncendioBlocoNumber}>
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
          <div className={styles.IncendioImages}>
            <span>
              <Image
                src="/img/incendio/pir-incendio-01.jpg"
                alt="Proteção contra incêndio com PIR"
                width={600}
                height={818}
                priority
              />
            </span>
            <span>
              <Image
                src="/img/incendio/pir-incendio-02.jpg"
                alt="Proteção contra incêndio com PIR"
                width={600}
                height={818}
                priority
              />
            </span>
            <span>
              <Image
                src="/img/incendio/pir-incendio-03.jpg"
                alt="Proteção contra incêndio com PIR"
                width={600}
                height={818}
                priority
              />
            </span>
          </div>
          <span className={styles.IncendioTeste}>
            O teste demonstrado nas imagens comprova essa eficiência. Mesmo sob a ação direta de um queimador de 30kW por 30 minutos, o fogo ficou restrito
            à área de contato. Ao final, o resultado foi apenas uma carbonização superficial, com o restante do painel intacto e sem qualquer propagação de fogo,
            demonstrando por que o PIR é a escolha mais segura e inteligente para o seu projeto.
          </span>
        </div>
      </section>

      {/* Linha de produção */}
      <section className={styles.linhaProducaoSection}>
        <div className={styles.linhaProducaoWrapper}>
          <h3>
            Produção automatizada para máximo eficiência
          </h3>
          <span>
            As telhas e painéis Isoart PIR são fabricadas em linha contínua e totalmente automatizada, garantindo alta precisão, qualidade e sustentabilidade.
            Com núcleo isolante de Poliisocianurato (PIR) e revestimento em chapas de aço galvalume, o processo inclui injeção de alta pressão, prensagem contínua
            e corte automatizado, assegurando excelente adesão, acabamento e padronização. Todos os produtos são resfriados, empilhados e embalados automaticamente,
            prontos para expedição.
          </span>
          <div className={styles.linhaProducaoImages}>
            <span>
              <Image
                src="/img/fabrica/fabrica-01.jpg"
                alt="Proteção contra incêndio com PIR"
                width={600}
                height={818}
                priority
              />
            </span>
            <span>
              <Image
                src="/img/fabrica/fabrica-02.jpg"
                alt="Proteção contra incêndio com PIR"
                width={600}
                height={818}
                priority
              />
            </span>
            <span>
              <Image
                src="/img/fabrica/fabrica-03.jpg"
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