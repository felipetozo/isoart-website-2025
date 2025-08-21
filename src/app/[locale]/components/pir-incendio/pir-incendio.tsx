'use client';

import styles from './pir-incendio.module.css';
import Image from 'next/image';
import { TbAlertTriangle } from "react-icons/tb";
import { useTranslations } from 'next-intl';

interface IncendioComponentProps {
  locale: string;
}

function IncendioComponent({ locale }: IncendioComponentProps) {
  const t = useTranslations('incendio');
  
  const incendioBlocos = [
    { number: t('blocos.bloco1.number'), destaque: t('blocos.bloco1.destaque'), legenda: t('blocos.bloco1.legenda') },
    { number: t('blocos.bloco2.number'), destaque: t('blocos.bloco2.destaque'), legenda: t('blocos.bloco2.legenda') },
    { number: t('blocos.bloco3.number'), destaque: t('blocos.bloco3.destaque'), legenda: t('blocos.bloco3.legenda') },
  ];
    return (
        <section className={styles['incendio-section']}>
            <div className={styles['incendio-wrapper']}>
                <div className={styles['incendio-header']}>
                    <span className={styles['incendio-title']}>
                        <h3>
                            {t('title')}
                        </h3>
                        <span className={styles['incendio-header-description']}>
                            {t('description')}
                            <br /><br />
                            {t('description2')}
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
                {t('teste')}
            </span>
        </div>
        </section>
    );
};

export default IncendioComponent;