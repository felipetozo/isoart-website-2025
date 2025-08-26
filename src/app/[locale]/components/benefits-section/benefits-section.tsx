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
    // Se contém palavras-chave, retorna ícone específico
    if (title.toLowerCase().includes('isolamento') || title.toLowerCase().includes('thermal') || title.toLowerCase().includes('aislamiento')) {
        return <TbVolumeOff size={40} />;
    }
    
    if (title.toLowerCase().includes('resistência') || title.toLowerCase().includes('resistance') || title.toLowerCase().includes('resistencia') || title.toLowerCase().includes('durabilidade') || title.toLowerCase().includes('durability') || title.toLowerCase().includes('durabilidad')) {
        return <TbShieldShare size={40} />;
    }
    
    if (title.toLowerCase().includes('leveza') || title.toLowerCase().includes('lightness') || title.toLowerCase().includes('ligereza')) {
        return <TbFeather size={40} />;
    }
    
    if (title.toLowerCase().includes('instalação') || title.toLowerCase().includes('installation') || title.toLowerCase().includes('instalacion')) {
        return <TbTools size={40} />;
    }
    
    // Fallback para outros benefícios
    return <TbWindOff size={40} />;
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