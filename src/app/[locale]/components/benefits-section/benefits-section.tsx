import styles from './benefits-section.module.css';
import { TbWindOff, TbShieldShare, TbSparkles, TbFeather, TbTopologyStarRing3, TbVolumeOff, TbTopologyStar3, TbTools } from "react-icons/tb";
import { useTranslations } from 'next-intl';

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
        // Telhas e Painéis - Português
        case 'Isolamento Térmico Superior':
            return <TbVolumeOff size={40} />;
        case 'Leveza e Eficiência Estrutural':
            return <TbFeather size={40} />;
        case 'Durabilidade e Resistência':
            return <TbShieldShare size={40} />;
        
        // Telhas e Painéis - Inglês
        case 'Superior Energy Efficiency':
            return <TbVolumeOff size={40} />;
        case 'Fast and Economical Installation':
            return <TbFeather size={40} />;
        case 'Durability and Resistance':
            return <TbShieldShare size={40} />;
        
        // Telhas e Painéis - Espanhol
        case 'Eficiencia Energética Superior':
            return <TbVolumeOff size={40} />;
        case 'Instalación Rápida y Económica':
            return <TbFeather size={40} />;
        case 'Durabilidad y Resistencia':
            return <TbShieldShare size={40} />;
        
        // Construção Civil - Português
        case 'Leveza Estrutural':
            return <TbFeather size={40} />;
        case 'Eficiência Térmica e Acústica':
            return <TbVolumeOff size={40} />;
        case 'Durabilidade prolongada':
            return <TbShieldShare size={40} />;
        
        // Construção Civil - Inglês
        case 'Structural Lightness':
            return <TbFeather size={40} />;
        case 'Thermal and Acoustic Efficiency':
            return <TbVolumeOff size={40} />;
        case 'Extended Durability':
            return <TbShieldShare size={40} />;
        
        // Construção Civil - Espanhol
        case 'Ligereza Estructural':
            return <TbFeather size={40} />;
        case 'Eficiencia Térmica y Acústica':
            return <TbVolumeOff size={40} />;
        case 'Durabilidad Prolongada':
            return <TbShieldShare size={40} />;
        
        // Embalagens - Português
        case 'Proteção Eficiente':
            return <TbShieldShare size={40} />;
        case 'Leveza e Economia':
            return <TbFeather size={40} />;
        case 'Alta Versatilidade':
            return <TbTopologyStar3 size={40} />;
        
        // Embalagens - Inglês
        case 'Efficient Protection':
            return <TbShieldShare size={40} />;
        case 'Lightness and Economy':
            return <TbFeather size={40} />;
        case 'High Versatility':
            return <TbTopologyStar3 size={40} />;
        
        // Embalagens - Espanhol
        case 'Protección Eficiente':
            return <TbShieldShare size={40} />;
        case 'Ligereza y Economía':
            return <TbFeather size={40} />;
        case 'Alta Versatilidad':
            return <TbTopologyStar3 size={40} />;
        
        // Molduras - Português
        case 'Acabado Sofisticado':
            return <TbSparkles size={40} />;
        case 'Instalação Rápida e Fácil':
            return <TbFeather size={40} />;
        case 'Durabilidade Prolongada':
            return <TbShieldShare size={40} />;
        
        // Molduras - Inglês
        case 'Sophisticated Finish':
            return <TbSparkles size={40} />;
        case 'Quick and Easy Installation':
            return <TbFeather size={40} />;
        case 'Extended Durability':
            return <TbShieldShare size={40} />;
        
        // Molduras - Espanhol
        case 'Acabado Sofisticado':
            return <TbSparkles size={40} />;
        case 'Instalación Rápida y Fácil':
            return <TbFeather size={40} />;
        case 'Durabilidad Prolongada':
            return <TbShieldShare size={40} />;
        
        // Fallbacks para variações
        case 'Durabilidade Prolongada':
            return <TbShieldShare size={40} />;
        case 'Instalação Rápida e Fácil':
            return <TbFeather size={40} />;
        case 'Acabamento Sofisticado':
            return <TbSparkles size={40} />;
        case 'Proteção eficiente':
            return <TbShieldShare size={40} />;
        case 'Leveza estrutural':
            return <TbFeather size={40} />;
        case 'Isolamento térmico superior':
            return <TbVolumeOff size={40} />;
        case 'Durabilidade prolongada':
            return <TbShieldShare size={40} />;
        
        // Produtos - Telhas Térmicas - Português
        case 'Isolamento térmico':
            return <TbVolumeOff size={40} />;
        case 'Alta resistência':
            return <TbShieldShare size={40} />;
        case 'Durabilidade prolongada':
            return <TbShieldShare size={40} />;
        
        // Produtos - Telhas Térmicas - Inglês
        case 'Thermal insulation':
            return <TbVolumeOff size={40} />;
        case 'High resistance':
            return <TbShieldShare size={40} />;
        case 'Extended durability':
            return <TbShieldShare size={40} />;
        
        // Produtos - Telhas Térmicas - Espanhol
        case 'Aislamiento térmico':
            return <TbVolumeOff size={40} />;
        case 'Alta resistencia':
            return <TbShieldShare size={40} />;
        case 'Durabilidad prolongada':
            return <TbShieldShare size={40} />;
        
        // Produtos - Blocos em EPS - Português
        case 'Leveza estrutural':
            return <TbFeather size={40} />;
        case 'Isolamento térmico':
            return <TbVolumeOff size={40} />;
        case 'Facilidade de instalação':
            return <TbTools size={40} />;
        
        // Produtos - Blocos em EPS - Inglês
        case 'Structural lightness':
            return <TbFeather size={40} />;
        case 'Thermal insulation':
            return <TbVolumeOff size={40} />;
        case 'Easy installation':
            return <TbTools size={40} />;
        
        default:
            return <TbWindOff size={40} />;
    }
};

function BenefitsSection({ benefits }: BenefitsSectionProps) {
    const t = useTranslations('common.sections');

    return (
        <section className={styles['benefits-section']}>
            <div className={styles['benefits-wrapper']}>
                {benefits && benefits.length > 0 ? (
                    benefits.map((benefit) => (
                        <div key={benefit.id} className={styles['benefits-card']}>
                            <div className={styles['benefit-icon']}>
                                {getBenefitIcon(benefit.title)}
                            </div>
                            <h5>{benefit.title}</h5>
                            <p>{benefit.description}</p>
                        </div>
                    ))
                ) : (
                    <div className={styles['no-benefits']}>
                        <p>Nenhum benefício disponível</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BenefitsSection;