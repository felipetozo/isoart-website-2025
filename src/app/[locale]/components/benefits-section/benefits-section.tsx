import styles from './benefits-section.module.css';
import { TbWindOff, TbShieldShare, TbSparkles, TbFeather, TbTopologyStarRing3, TbVolumeOff, TbTopologyStar3, TbTools, TbCoin, TbShieldCheck, TbPalette, TbLeaf, TbCertificate } from "react-icons/tb";
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

// Map benefit titles to specific icons - Mapeamento expandido e inteligente
const getBenefitIcon = (title: string): React.ReactElement => {
    const lowerTitle = title.toLowerCase();
    
    // ISOLAMENTO TÉRMICO E ACÚSTICO
    if (lowerTitle.includes('isolamento') || lowerTitle.includes('thermal') || lowerTitle.includes('aislamiento') || lowerTitle.includes('acústico') || lowerTitle.includes('acoustic')) {
        return <TbVolumeOff size={40} />;
    }
    
    // RESISTÊNCIA, DURABILIDADE E FORÇA
    if (lowerTitle.includes('resistência') || lowerTitle.includes('resistance') || lowerTitle.includes('resistencia') || 
        lowerTitle.includes('durabilidade') || lowerTitle.includes('durability') || lowerTitle.includes('durabilidad') ||
        lowerTitle.includes('alta resistência') || lowerTitle.includes('high resistance') || lowerTitle.includes('alta resistencia')) {
        return <TbShieldShare size={40} />;
    }
    
    // LEVEZA E PESO
    if (lowerTitle.includes('leveza') || lowerTitle.includes('lightness') || lowerTitle.includes('ligereza') ||
        lowerTitle.includes('redução de peso') || lowerTitle.includes('weight reduction') || lowerTitle.includes('reduccion de peso') ||
        lowerTitle.includes('leveza estrutural') || lowerTitle.includes('structural lightness') || lowerTitle.includes('ligereza estructural')) {
        return <TbFeather size={40} />;
    }
    
    // INSTALAÇÃO E MANUSEIO
    if (lowerTitle.includes('instalação') || lowerTitle.includes('installation') || lowerTitle.includes('instalacion') ||
        lowerTitle.includes('facilidade de instalação') || lowerTitle.includes('easy installation') || lowerTitle.includes('facilidad de instalacion') ||
        lowerTitle.includes('manuseio') || lowerTitle.includes('handling') || lowerTitle.includes('manejo')) {
        return <TbTools size={40} />;
    }
    
    // ECONOMIA E CUSTOS
    if (lowerTitle.includes('economia') || lowerTitle.includes('economy') || lowerTitle.includes('economia na obra') ||
        lowerTitle.includes('construction savings') || lowerTitle.includes('ahorro en obra') || lowerTitle.includes('custo') || lowerTitle.includes('cost')) {
        return <TbCoin size={40} />;
    }
    
    // PROTEÇÃO E SEGURANÇA
    if (lowerTitle.includes('proteção') || lowerTitle.includes('protection') || lowerTitle.includes('proteccion') ||
        lowerTitle.includes('proteção eficiente') || lowerTitle.includes('efficient protection') || lowerTitle.includes('proteccion eficiente') ||
        lowerTitle.includes('proteção contra impactos') || lowerTitle.includes('impact protection') || lowerTitle.includes('proteccion contra impactos')) {
        return <TbShieldCheck size={40} />;
    }
    
    // PERSONALIZAÇÃO E DESIGN
    if (lowerTitle.includes('personalização') || lowerTitle.includes('customization') || lowerTitle.includes('personalizacion') ||
        lowerTitle.includes('personalizável') || lowerTitle.includes('customizable') || lowerTitle.includes('personalizable') ||
        lowerTitle.includes('estética') || lowerTitle.includes('aesthetic') || lowerTitle.includes('estetica') ||
        lowerTitle.includes('design') || lowerTitle.includes('diseño')) {
        return <TbPalette size={40} />;
    }
    
    // SUSTENTABILIDADE E MEIO AMBIENTE
    if (lowerTitle.includes('sustentabilidade') || lowerTitle.includes('sustainability') || lowerTitle.includes('sostenibilidad') ||
        lowerTitle.includes('reciclável') || lowerTitle.includes('recyclable') || lowerTitle.includes('reciclable') ||
        lowerTitle.includes('ambiental') || lowerTitle.includes('environmental') || lowerTitle.includes('ambiental')) {
        return <TbLeaf size={40} />;
    }
    
    // CERTIFICAÇÃO E NORMAS
    if (lowerTitle.includes('conformidade') || lowerTitle.includes('compliance') || lowerTitle.includes('cumplimiento') ||
        lowerTitle.includes('normas') || lowerTitle.includes('standards') || lowerTitle.includes('estandares') ||
        lowerTitle.includes('certificação') || lowerTitle.includes('certification') || lowerTitle.includes('certificacion')) {
        return <TbCertificate size={40} />;
    }
    
    // Fallback para outros benefícios - agora mais específico
    return <TbSparkles size={40} />;
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