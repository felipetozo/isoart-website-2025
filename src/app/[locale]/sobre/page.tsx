'use client';

import ContactComponent from '../components/contact/contact-component';
import Sustentabilidade from '../components/Sustentabilidade/sustentabilidade';
import styles from './page.module.css';
import { Target, Eye, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function SobrePage() {
  const params = useParams();
  const locale = params.locale as string;
  
  // Hook de traduções
  const t = useTranslations('sobrePage');

  // Timeline data using translations
  const TIMELINE = [
    {
      year: '2008',
      label: t('timeline.items.2008.label'),
      description: t('timeline.items.2008.description'),
      image: '/img/geral/endereco-01-01-optimized.webp',
    },
    {
      year: '2015',
      label: t('timeline.items.2015.label'),
      description: t('timeline.items.2015.description'),
      image: '/img/geral/endereco-02-01.avif',
    },
    {
      year: '2021',
      label: t('timeline.items.2021.label'),
      description: t('timeline.items.2021.description'),
      image: '/img/geral/endereco-03-01.avif',
    },
  ];

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

      {/* Hero Headline */}
      <section className={styles['hero-headline-section']}>
        <div className={styles['hero-headline-wrapper']}>
          <h1 className={styles['hero-headline']}>
            Especialistas em <span className="blue-text">EPS</span> e <span className="blue-text">PIR</span> para construção civil, embalagens e isolamento térmico
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
            title={t('video.title')}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          ></iframe>
        </div>
        <p className={styles.legenda}>
          {t('video.caption')}
        </p>
      </section>

       {/* Linha do tempo */}
       <section className={styles['timeline-section']}>
        <div className={styles['timeline-wrapper']}>
        <h5 className={styles['timeline-title']}>
          {t('timeline.title')}
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
                {t('map.title')}
              </h2>
              <p className={styles['map-overlay-text']}>
                {t('map.description')}
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
            <h3 className={styles['mvv-title']}>{t('mvv.missao.title')}</h3>
            <p className={styles['mvv-description']}>
            {t('mvv.missao.description')}
            </p>
          </div>
          
          <div className={styles['mvv-item']}>
            <Eye className={styles['mvv-icon']} />
            <h3 className={styles['mvv-title']}>{t('mvv.visao.title')}</h3>
            <p className={styles['mvv-description']}>
              {t('mvv.visao.description')}
            </p>
          </div>
          
          <div className={styles['mvv-item']}>
            <Heart className={styles['mvv-icon']} />
            <h3 className={styles['mvv-title']}>{t('mvv.valores.title')}</h3>
            <p className={styles['mvv-description']}>
              {t('mvv.valores.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Política de Qualidade */}
      <section className={styles['quality-section']}>
        <div className={styles['quality-wrapper']}>
          <div className={styles['quality-left-column']}>
            <h4 className={styles['quality-title']}>{t('quality.title')}</h4>
            <p className={styles['quality-description']}>
            {t('quality.description1')}
            </p>
            <p className={styles['quality-description']}>
              {t('quality.description2')}
            </p>
            <img src="/img/geral/selo-iso.svg" alt="Selo de Qualidade ISO" className={styles['quality-image']} />
          </div>
          
          <div className={styles['quality-right-column']}>
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>01</h3>
              <p className={styles['quality-item-text']}>
                {t('quality.items.item1')}
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>02</h3>
              <p className={styles['quality-item-text']}>
                {t('quality.items.item2')}
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>03</h3>
              <p className={styles['quality-item-text']}>
                {t('quality.items.item3')}
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>04</h3>
              <p className={styles['quality-item-text']}>
                {t('quality.items.item4')}
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>05</h3>
              <p className={styles['quality-item-text']}>
                {t('quality.items.item5')}
              </p>
            </div>
            
            <div className={styles['quality-item']}>
              <h3 className={styles['quality-item-number']}>06</h3>
              <p className={styles['quality-item-text']}>
                {t('quality.items.item6')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Sustentabilidade />

              <ContactComponent locale={locale} />
    </div>
  );
}