import styles from './Sustentabilidade.module.css';
import { Recycle } from 'lucide-react';

export default function Sustentabilidade() {
  return (
    <section className={styles.sustentabilidadeSection}>
      <div className={styles.sustentabilidadeWrapper}>
        <h2 className={styles.sustentabilidadeTitle}>
          Reciclagem de EPS: sustentabilidade e reaproveitamento inteligente.
        </h2>
        
        <img 
          src="/img/geral/reciclagem-eps.png" 
          alt="Reciclagem de EPS" 
          className={styles.sustentabilidadeImage} 
        />
        
        <p className={styles.sustentabilidadeDescription}>
          O Poliestireno Expandido (EPS), popularmente conhecido como Isopor®, é um material amplamente utilizado e 100% reciclável. Apesar de não ser biodegradável, sua reciclagem evita impactos ambientais, reduzindo o volume de resíduos em aterros sanitários.
        </p>
        
        <div className={styles.sustentabilidadeAviso}>
          <Recycle className={styles.sustentabilidadeAvisoIcon} />
          <p className={styles.sustentabilidadeAvisoText}>
            A Isoart reutiliza integralmente os resíduos gerados internamente e conta com dois centros de reciclagem próprios, garantindo o correto reaproveitamento do material. Além disso, promove logística reversa, coletando e comprando EPS de cooperativas, prefeituras e redes varejistas, reforçando seu compromisso com a sustentabilidade e a economia circular.
          </p>
        </div>
      </div>
    </section>
  );
} 