import styles from './BenefitsSection.module.css';
import { TbWindOff, TbShieldShare, TbSparkles, TbFeather, TbTopologyStarRing3, TbVolumeOff, TbTopologyStar3 } from "react-icons/tb";

interface Benefit {
    id: number;
    title: string;
    description: string;
    icon?: string;
}

interface BenefitsSectionProps {
    benefits: Benefit[];
}

// Map benefit titles to specific icons
const getBenefitIcon = (title: string): React.ReactElement => {
    switch (title) {
        case 'Durabilidade prolongada':
            return <TbShieldShare size={40} />;
        case 'Leveza Estrutural':
            return <TbFeather size={40} />;
        case 'Eficiência Térmica e Acústica':
            return <TbVolumeOff size={40} />;
        case 'Durabilidade Prolongada':
            return <TbShieldShare size={40} />;
        case 'Instalação Rápida e Fácil':
            return <TbFeather size={40} />;
        case 'Acabamento Sofisticado':
            return <TbSparkles size={40} />;
        case 'Proteção Eficiente':
            return <TbTopologyStarRing3 size={40} />;
        case 'Leveza e Economia':
            return <TbFeather size={40} />;
        case 'Alta Versatilidade':
            return <TbTopologyStar3 size={40} />;
        default:
            return <TbWindOff size={40} />;
    }
};

function BenefitsSection({ benefits }: BenefitsSectionProps) {
    return (
        <section className={styles.BenefitsSection}>
            <div className={styles.BenefitsWrapper}>
                {benefits.map((benefit) => (
                    <div key={benefit.id} className={styles.BenefitsCard}>
                        <div className={styles.BenefitIcon}>
                            {getBenefitIcon(benefit.title)}
                        </div>
                        <h5>{benefit.title}</h5>
                        <p>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BenefitsSection;