// src/app/landing-pages/molduras/page.tsx - Página com iframe do site de molduras
import styles from './page.module.css';

function LandingMolduras() {
    return (
        <div className={styles.container}>
            <iframe
                src="https://somosfaiskers.wixstudio.com/molduras"
                width="100%"
                height="1000"
                style={{ border: "none" }}
                allowFullScreen
            />
        </div>
    );
}

export default LandingMolduras;
