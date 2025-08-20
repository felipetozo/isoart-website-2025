import styles from "./page.module.css";
import Button from "../views/ui/button/button";
import Sustentabilidade from "../components/Sustentabilidade/sustentabilidade";
import IncendioComponent from "../components/pir-incendio/pir-incendio";
import ContactComponent from "../components/contact/contact-component";
import { CheckCircle } from "lucide-react";
import { TbAlertTriangle } from "react-icons/tb";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';

interface SobreEpsPirPageProps {
  params: Promise<{ locale: string }>;
}

async function SobreEpsPirPage({ params }: SobreEpsPirPageProps) {
  const { locale } = await params;
  
  // Hook de traduções
  const t = await getTranslations('sobreEpsPirPage');
  
  return (
    <div>
      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-mask']}>
          <div className={styles['hero-wrapper']}>
            <h2 className={styles['hero-title']}>{t('hero.title')}</h2>
          </div>
        </div>
      </section>

      {/* Hero Headline + Botões */}
      <section className={styles['hero-headline-section']}>
        <div className={styles['hero-headline-wrapper']}>
          <div className={styles['hero-headline-container']}>
            <h1 className={styles['hero-headline']}>
              <span className="blueText">{t('headline.title')}</span>
            </h1>
            <div className={styles['hero-buttons']}>
              <a href="#eps">
                <Button variant="primary" size="medium">{t('headline.epsButton')}</Button>
              </a>
              <a href="#pir">
                <Button variant="primary" size="medium">{t('headline.pirButton')}</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção EPS */}
      <section id="eps" className={styles['eps-section']}>
        <div className={styles['eps-wrapper']}>
          <div className={styles['eps-container']}>
            <h2 className={styles['eps-title']}>{t('eps.title')}</h2>
            <p className={styles['eps-description']}>
              {t('eps.description')}
            </p>
            <div className={styles['eps-image-container']}>
              <img src="/img/geral/eps-perolas.avif" alt="Pérola de EPS - Isoart" className={styles['eps-image']} />
            </div>
            <h2 className={styles['eps-subtitle']}>{t('eps.subtitle')}</h2>
            <div className={styles['benefits-container']}>
              <div className={styles['benefits-grid']}>
                {(t.raw('eps.benefits') as string[]).map((benefit: string) => (
                  <div className={styles['benefit-item']} key={benefit}>
                    <span className={styles['benefit-icon']}><CheckCircle size={28} strokeWidth={2.5} /></span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className={styles['eps-subtitle']}>{t('eps.applicationsTitle')}</h3>
            <p className={styles['eps-description']}>
              {t('eps.applicationsDescription')}
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
            <h2 className={styles['pir-title']}>{t('pir.title')}</h2>
            <p className={styles['pir-description']}>
              {t('pir.description')}
            </p>
            <div className={styles['pir-image-container']}>
              <img src="/img/geral/pir-block.avif" alt="PIR exemplo" className={styles['pir-image']} />
            </div>
            <h2 className={styles['pir-subtitle']}>{t('pir.subtitle')}</h2>
            <div className={styles['benefits-container']}>
              <div className={styles['benefits-grid']}>
                {(t.raw('pir.benefits') as string[]).map((benefit: string) => (
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
            <h2 className={styles['pir-applications-title']}>{t('pirApplications.title')}</h2>
            <p className={styles['pir-applications-description']}>
              {t('pirApplications.description')}
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
            <h2 className={styles['revestimentos-title']}>{t('revestimentos.title')}</h2>
            <p className={styles['revestimentos-description']}>
              {t('revestimentos.description')}
            </p>
            <div className={styles['revestimentos-grid']}>
              <div className={styles['revestimento-item']}>
                <img src="/img/PIR/PIR-Revestimentos-01.avif" alt="Aço microfrisado" className={styles['revestimento-image']} />
                <p className={styles['revestimento-title']}>{t('revestimentos.tipos.microfrisado')}</p>
              </div>
              <div className={styles['revestimento-item']}>
                <img src="/img/PIR/PIR-Revestimentos-02.avif" alt="Aço frisado" className={styles['revestimento-image']} />
                <p className={styles['revestimento-title']}>{t('revestimentos.tipos.frisado')}</p>
              </div>
              <div className={styles['revestimento-item']}>
                <img src="/img/PIR/PIR-Revestimentos-03.avif" alt="Revestimento 3" className={styles['revestimento-image']} />
                <p className={styles['revestimento-title']}>{t('revestimentos.tipos.filmeAluminio')}</p>
              </div>
            </div>
            <div className={styles['revestimentos-cores']}>
              <div className={styles['cores-grid']}>
                {[
                  { id: 'ral9003', code: t('revestimentos.cores.ral9003'), name: t('revestimentos.nomes.brancoSinal'), type: 'image', image: '/img/PIR/RAL9003---BRANCO.avif' },
                  { id: 'ral7035', code: t('revestimentos.cores.ral7035'), name: t('revestimentos.nomes.cinzaClaro'), type: 'image', image: '/img/PIR/RAL7035---CINZA-CLARO.avif' },
                  { id: 'ral7040', code: t('revestimentos.cores.ral7040'), name: t('revestimentos.nomes.cinzaMedio'), type: 'image', image: '/img/PIR/RAL7040---CINZA-MÉDIO.avif' },
                  { id: 'ral7024', code: t('revestimentos.cores.ral7024'), name: t('revestimentos.nomes.cinzaGrafite'), type: 'image', image: '/img/PIR/RAL7024---CINZA-GRAFITE.avif' },
                  { id: 'ral9006', code: t('revestimentos.cores.ral9006'), name: t('revestimentos.nomes.prata'), type: 'color' },
                  { id: 'ral1015', code: t('revestimentos.cores.ral1015'), name: t('revestimentos.nomes.marfim'), type: 'image', image: '/img/PIR/RAL1015---MARFIM.avif' },
                  { id: 'ral1023', code: t('revestimentos.cores.ral1023'), name: t('revestimentos.nomes.amarelo'), type: 'image', image: '/img/PIR/RAL1023---AMARELO.avif' },
                  { id: 'ral8023', code: t('revestimentos.cores.ral8023'), name: t('revestimentos.nomes.terracota'), type: 'image', image: '/img/PIR/RAL8023---TERRACOTA.avif' },
                  { id: 'ral3000', code: t('revestimentos.cores.ral3000'), name: t('revestimentos.nomes.vermelhoFogo'), type: 'image', image: '/img/PIR/RAL3000---VERMELHO.avif' },
                  { id: 'ral5010', code: t('revestimentos.cores.ral5010'), name: t('revestimentos.nomes.azulGenciana'), type: 'image', image: '/img/PIR/RAL5010---AZUL.avif' },
                  { id: 'ral6002', code: t('revestimentos.cores.ral6002'), name: t('revestimentos.nomes.verdeTrafego'), type: 'image', image: '/img/PIR/RAL6002---VERDE.avif' },
                  { id: 'ral9005', code: t('revestimentos.cores.ral9005'), name: t('revestimentos.nomes.preto'), type: 'image', image: '/img/PIR/RAL9005---PRETO.avif' },
                  { 
                    id: 'galvanizado',
                    code: '', 
                    name: t('revestimentos.nomes.naturalGalvanizado'), 
                    type: 'image',
                    image: '/img/PIR/NATURAL-GALVANIZADO.avif'
                  },
                  { 
                    id: 'amadeirado-claro',
                    code: '', 
                    name: t('revestimentos.nomes.amadeiradoClaro'), 
                    type: 'image',
                    image: '/img/PIR/AMADEIRADO-CLARO.avif'
                  },
                  { 
                    id: 'amadeirado-escuro',
                    code: '', 
                    name: t('revestimentos.nomes.amadeiradoEscuro'), 
                    type: 'image',
                    image: '/img/PIR/AMADEIRADO-ESCURO.avif'
                  },
                ].map((item) => (
                  <div className={styles['cor-item']} key={item.id}>
                    {item.type === 'color' ? (
                      <span 
                        className={styles['cor-thumb']} 
                        style={{ 
                          backgroundColor: item.code === t('revestimentos.cores.ral9006') ? 'rgb(var(--ral-9006))' : '#ccc'
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
              {t('revestimentos.aviso')}
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
            {t('linhaProducao.title')}
          </h3>
          <span>
            {t('linhaProducao.description')}
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

      {/* Contact Component */}
      <ContactComponent locale={locale} />

    </div>
  );
}

export default SobreEpsPirPage;