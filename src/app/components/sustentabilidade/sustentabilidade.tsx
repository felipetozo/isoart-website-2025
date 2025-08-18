import styles from './sustentabilidade.module.css';
import { Recycle } from 'lucide-react';

function Sustentabilidade() {
  return (
    <section className={styles['sustentabilidade-section']}>
      <div className={styles['sustentabilidade-wrapper']}>
        <h2 className={styles['sustentabilidade-title']}>
          Reciclagem de EPS: sustentabilidade e reaproveitamento inteligente.
        </h2>
        
        <img 
          src="/img/geral/reciclagem-eps.avif" 
          alt="Reciclagem de EPS" 
          className={styles['sustentabilidade-image']} 
        />
        
        <p className={styles['sustentabilidade-description']}>
          O Poliestireno Expandido (EPS), popularmente conhecido como Isopor®,
          é um material amplamente utilizado e 100% reciclável. Apesar de não ser
          biodegradável, sua reciclagem evita impactos ambientais, reduzindo o
          volume de resíduos em aterros sanitários.
        </p>
        
        <div className={styles['sustentabilidade-aviso']}>
          <Recycle className={styles['sustentabilidade-aviso-icon']} />
          <p className={styles['sustentabilidade-aviso-text']}>
          A Isoart conta com dois centros de reciclagem internos,
          onde reutiliza integralmente os resíduos gerados,
          reforçando seu compromisso com a sustentabilidade.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sustentabilidade; 