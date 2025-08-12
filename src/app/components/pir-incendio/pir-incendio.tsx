import styles from './pir-incendio.module.css';

function IncendioComponent() {
    return (
        <section className={styles['incendio-component-section']}>
            <div className={styles['incendio-component-wrapper']}>
                <div className={styles['incendio-component-container']}>
                    <h3>
                        PIR: O escudo protetor contra a propagação de incêndios
                    </h3>
                    <p>
                        O Poliisocianurato (PIR) se destaca pela performance em
                        incêndios, atuando como proteção passiva essencial. Ao
                        contrário de outros materiais, não propaga chamas. Quando
                        exposto ao fogo, seu núcleo forma uma camada carbonizada
                        estável que isola e protege, funcionando como escudo contra
                        o calor e preservando a integridade da edificação.
                    </p>
                </div>
                <div className={styles['incendio-component-blocos']}>
                    <div className={styles['incendio-component-bloco']}>
                        <h5>01</h5>
                        <p>
                            <strong>Impede a propagação: </strong>
                            a camada carbonizada retarda
                            significativamente a queima do material,
                            contendo o foco do incêndio e evitando
                            que as chamas se espalhem pela estrutura.
                        </p>
                    </div>
                    <div className={styles['incendio-component-bloco']}>
                        <h5>02</h5>
                        <p>
                            <strong>Protege o núcleo: </strong>
                            isola o restante do painel do calor
                            intenso, mantendo a integridade por
                            mais tempo.
                        </p>
                    </div>
                    <div className={styles['incendio-component-bloco']}>
                        <h5>03</h5>
                        <p>
                            <strong>Baixa emissão de fumaça: </strong>
                            contribui para manter as rotas de fuga mais
                            visíveis e seguras.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IncendioComponent;