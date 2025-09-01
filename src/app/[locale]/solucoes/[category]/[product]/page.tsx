'use client';

import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
// Fallback para Android antigo que não suporta importação estática de JSON
let menuData: any[] = [];

// Tentar importar JSON de forma dinâmica
try {
    if (typeof require !== 'undefined') {
        menuData = require('@/app/[locale]/data/menu-data.json');
    }
} catch (error) {
    console.warn('Erro ao importar menu-data.json, usando dados hardcoded');
    // Dados hardcoded como fallback
    menuData = [
        {
            id: 1,
            title: "Telhas e Painéis",
            slug: "telhas-e-paineis",
            description: "Telhas e painéis da Isoart para coberturas e fachadas.",
            products: [
                { id: 1, name: "Telhas Térmicas", slug: "telhas-termicas", description: "Telhas com núcleo em PIR ou EPS" },
                { id: 2, name: "Fachada e Fechamento Lateral", slug: "fachada-fechamento-lateral", description: "Painéis versáteis para fachadas" }
            ]
        },
        {
            id: 2,
            title: "Construção Civil",
            slug: "construcao-civil",
            description: "Soluções em EPS para construção civil",
            products: [
                { id: 6, name: "Lajes em EPS", slug: "lajes-em-eps", description: "Lajes com preenchimento em EPS" },
                { id: 7, name: "Isolamento para Telhas", slug: "isolamento-telhas", description: "Sistema de isolamento térmico" }
            ]
        }
    ];
}
import SobreEmpresa from '@/app/[locale]/components/sobre-empresa/sobre-empresa';
import ContactComponent from '@/app/[locale]/components/contact/contact-component';
import Button from '@/app/[locale]/views/ui/button/button';
import BenefitsSection from '@/app/[locale]/components/benefits-section/benefits-section';
import IncendioComponent from '@/app/[locale]/components/pir-incendio/pir-incendio';
import { TbChecks, TbHome, TbMicroscope, TbBuildingFactory2, TbSnowflake, TbMedicineSyrup, TbBuilding, TbBuildingHospital, TbBuildingFactory, TbTools, TbPackage, TbDeviceTv, TbWindow, TbTruck, TbBuildingStore, TbArmchair, TbMicrophone, } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import ImageCarousel from '@/app/[locale]/components/image-carousel/image-carousel';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingScreen from '../../../components/loading-screen/loading-screen';

interface ProductData {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    projectImages?: string[];
    specifications?: {
        [key: string]: string | undefined;
    };
    hero?: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        backgroundImage: string;
    };
    categoryDescription?: {
        title: string;
        description: string;
    };

    benefits?: {
        id: number;
        title: string;
        description: string;
    }[];
    generalCharacteristics?: string[];
    applications?: {
        title: string;
        description: string;
        indications: { icon: string; text: string }[];
    };
    modelsTable?: {
        title: string;
        headers: string[];
        rows: {
            material: string;
            espessuras: string[];
            revestimento: string;
            trapezios: string;
        }[];
        note: string;
    };
    tabDescriptions?: {
        [key: string]: string;
    };
}

interface Benefit {
    id: number;
    title: string;
    description: string;
    icon?: string;
}

interface CategoryData {
    id: number;
    title: string;
    slug: string;
    description?: string;
    metaDescription?: string;
    image?: string;
    hero?: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        backgroundImage: string;
    };
    categoryDescription?: string;
    products: ProductData[];
    benefits?: Benefit[];
}

interface ProductPageProps {
}

function renderIcon(iconName: string) {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
        'TbHome': TbHome,
        'TbBuilding': TbBuilding,
        'TbFactory': TbBuildingFactory,
        'TbTools': TbTools,
        'TbPackage': TbPackage,
        'TbDeviceTv': TbDeviceTv,
        'TbWindow': TbWindow,
        'TbTruck': TbTruck,
        'TbBuildingStore': TbBuildingStore,
        'TbArmchair': TbArmchair,
        'TbMicrophone': TbMicrophone,
        'IoFastFoodOutline': IoFastFoodOutline,
        'TbBuildingHospital': TbBuildingHospital,
        'TbSnowflake': TbSnowflake,
        'TbMedicineSyrup': TbMedicineSyrup,
        'TbMicroscope': TbMicroscope,
        'TbBuildingFactory2': TbBuildingFactory2,
    };

    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={24} /> : <span>{iconName}</span>;
}

export default function ProductPage() {
    const params = useParams();
    const category = params.category as string;
    const product = params.product as string;
    const locale = params.locale as string;
    
    // Estados para dados do produto e categoria
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Hook de traduções
    const t = useTranslations('productPage');
    const tCategory = useTranslations('categoryPage');
    const tCommon = useTranslations('common.buttons');
    const tSections = useTranslations('common.sections');
    
    useEffect(() => {
        const loadProductData = () => {
            try {
                // Buscar dados básicos da categoria do menuData
                const categoryDataTemp = (menuData as CategoryData[]).find((item: CategoryData) => item.slug === category);
                
                if (!categoryDataTemp) {
                    notFound();
                    return;
                }

                setCategoryData(categoryDataTemp);

                // Buscar dados básicos do produto no menuData
                const basicProductData = categoryDataTemp.products.find((p: ProductData) => p.slug === product);
                if (basicProductData) {
                    setProductData(basicProductData);
                } else {
                    notFound();
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                notFound();
            } finally {
                setLoading(false);
            }
        };

        loadProductData();
    }, [category, product]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!productData) {
        notFound();
    }

    // Buscar dados da categoria para pegar os benefícios
    // const categoryData = await getCategoryData(category); // This line is removed as categoryData is now state

    // Mapeamento simples das imagens hero para cada produto
    const PRODUCT_HERO_IMAGES = {
        'construcao-civil': {
            'blocos-em-eps': '/img/heroes/products/construcao-civil-blocos-eps-hero.avif',
            'chapas-paineis-em-eps': '/img/heroes/products/construcao-civil-chapas-paineis-hero.avif',
            'flocos-em-eps': '/img/heroes/products/construcao-civil-flocos-eps-hero.avif',
            'forros': '/img/heroes/products/construcao-civil-forros-hero.avif',
            'isolamento-telhas': '/img/heroes/products/construcao-civil-isolamento-telhas-hero.avif',
            'lajes-em-eps': '/img/heroes/products/construcao-civil-lajes-eps-hero.avif'
        },
        'molduras-decorativas': {
            'molduras-beiral': '/img/heroes/products/molduras-decorativas-beiral-hero.avif',
            'molduras-portas-janelas': '/img/heroes/products/molduras-decorativas-portas-hero.avif',
            'molduras-colunas-capiteis': '/img/heroes/products/molduras-decorativas-colunas-hero.avif',
            'molduras-muros': '/img/heroes/products/molduras-decorativas-muros-hero.avif',
            'molduras-paredes': '/img/heroes/products/molduras-decorativas-paredes-hero.avif'
        },
        'embalagens-em-eps': {
            'embalagens-em-eps': '/img/heroes/products/embalagens-eps-embalagens-hero.avif',
            'perolas-em-eps': '/img/heroes/products/embalagens-eps-perolas-hero.avif'
        },
        'telhas-e-paineis': {
            'telhas-termicas': '/img/heroes/products/telhas-paineis-telhas-termicas-hero.avif',
            'fachada-fechamento-lateral': '/img/heroes/products/telhas-paineis-fachada-fechamento-hero.avif',
            'divisoria-e-forro': '/img/heroes/products/telhas-paineis-divisoria-forro-hero.avif',
            'sala-limpa': '/img/heroes/products/telhas-paineis-sala-limpa-hero.avif',
            'camara-frigorifica': '/img/heroes/products/telhas-paineis-camara-frigorifica-hero.avif'
        }
    };

    // Mapeamento das imagens de galeria para o carrossel
    const PRODUCT_GALLERY_IMAGES = {
        'construcao-civil': {
            'blocos-em-eps': [
                '/img/produtos/construcao-civil/blocos/blocos-1440x-800_001.avif'
            ],
            'chapas-paineis-em-eps': [
                '/img/produtos/construcao-civil/chapas/chapas-1440x-800_001.avif',
                '/img/produtos/construcao-civil/chapas/chapas-1440x-800_002.avif'
            ],
            'flocos-em-eps': [
                '/img/produtos/construcao-civil/flocos/flocos-1440x800_001.avif',
                '/img/produtos/construcao-civil/flocos/flocos-1440x800_002.avif'
            ],
            'forros': [
                '/img/produtos/construcao-civil/forros/paris-1440x-800_01.avif',
                '/img/produtos/construcao-civil/forros/dunas-1440x-800_01.avif'
            ],
            'isolamento-telhas': [
                '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_001.avif',
                '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_002.avif',
                '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_003.avif',
                '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_004.avif',
                '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_005.avif',
                '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_006.avif',
                '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_007.avif',
                '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_008.avif'
            ],
            'lajes-em-eps': [
                '/img/produtos/construcao-civil/lajes/lajes-1440x-800_001.avif',
                '/img/produtos/construcao-civil/lajes/lajes-1440x-800_002.avif',
                '/img/produtos/construcao-civil/lajes/lajes-1440x-800_003.avif'
            ]
        },
        'molduras-decorativas': {
            'molduras-beiral': [
                '/img/produtos/molduras/beiral/beiral-1440x-800_001.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_002.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_003.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_004.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_005.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_006.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_007.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_008.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_009.avif',
                '/img/produtos/molduras/beiral/beiral-1440x-800_010.avif'
            ],
            'molduras-portas-janelas': [
                '/img/produtos/molduras/portas/portas-1440x-800_0010.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0020.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0030.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0040.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0050.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0060.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0070.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0080.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0090.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0100.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0110.avif',
                '/img/produtos/molduras/portas/portas-1440x-800_0120.avif'
            ],
            'molduras-colunas-capiteis': [
                '/img/produtos/molduras/colunasecapiteis/colunas-1440x-800_0010.avif',
                '/img/produtos/molduras/colunasecapiteis/colunas-1440x-800_0020.avif',
                '/img/produtos/molduras/colunasecapiteis/colunas-1440x-800_0030.avif',
                '/img/produtos/molduras/colunasecapiteis/colunas-1440x-800_0040.avif'
            ],
            'molduras-muros': [
                '/img/produtos/molduras/muros/muros-1440x-800_001.avif',
                '/img/produtos/molduras/muros/muros-1440x-800_002.avif',
                '/img/produtos/molduras/muros/muros-1440x-800_003.avif',
                '/img/produtos/molduras/muros/muros-1440x-800_004.avif'
            ],
            'molduras-paredes': [
                '/img/produtos/molduras/parede/parede-1440x-800_001.avif',
                '/img/produtos/molduras/parede/parede-1440x-800_002.avif',
                '/img/produtos/molduras/parede/parede-1440x-800_003.avif',
                '/img/produtos/molduras/parede/parede-1440x-800_004.avif',
                '/img/produtos/molduras/parede/parede-1440x-800_005.avif'
            ]
        },
        'embalagens-em-eps': {
            'embalagens-em-eps': [
                '/img/produtos/embalagens/embalagens/embalagens-1440x-800_001.avif',
                '/img/produtos/embalagens/embalagens/embalagens-1440x-800_002.avif',
                '/img/produtos/embalagens/embalagens/embalagens-1440x-800_003.avif',
                '/img/produtos/embalagens/embalagens/embalagens-1440x-800_004.avif',
                '/img/produtos/embalagens/embalagens/embalagens-1440x-800_005.avif'
            ],
            'perolas-em-eps': [
                '/img/produtos/embalagens/perolas/perolas-1440x-800_001.avif',
                '/img/produtos/embalagens/perolas/perolas-1440x-800_002.avif',
                '/img/produtos/embalagens/perolas/perolas-1440x-800_003.avif'
            ]
        },
        'telhas-e-paineis': {
            'telhas-termicas': [
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0010.avif',
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0020.avif',
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0030.avif',
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0040.avif',
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0050.avif',
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0060.avif',
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0070.avif',
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0080.avif',
                '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0090.avif'
            ],
            'fachada-fechamento-lateral': [
                '/img/produtos/telhas-revestimentos/fachada-fechamento/fachada-fechamento-1440x-800_0010.avif',
                '/img/produtos/telhas-revestimentos/fachada-fechamento/fachada-fechamento-1440x-800_0020.avif',
                '/img/produtos/telhas-revestimentos/fachada-fechamento/fachada-fechamento-1440x-800_0030.avif',
                '/img/produtos/telhas-revestimentos/fachada-fechamento/fachada-fechamento-1440x-800_0040.avif'
            ],
            'divisoria-e-forro': [
                '/img/produtos/telhas-revestimentos/divisoria-forro/divisoria-forro-1440x-800_0010.avif',
                '/img/produtos/telhas-revestimentos/divisoria-forro/divisoria-forro-1440x-800_0020.avif',
                '/img/produtos/telhas-revestimentos/divisoria-forro/divisoria-forro-1440x-800_0030.avif',
                '/img/produtos/telhas-revestimentos/divisoria-forro/divisoria-forro-1440x-800_0040.avif',
                '/img/produtos/telhas-revestimentos/divisoria-forro/divisoria-forro-1440x-800_0050.avif',
                '/img/produtos/telhas-revestimentos/divisoria-forro/divisoria-forro-1440x-800_0060.avif'
            ],
            'sala-limpa': [
                '/img/produtos/telhas-revestimentos/sala-limpa/sala-limpa-1440x-800_0010.avif',
                '/img/produtos/telhas-revestimentos/sala-limpa/sala-limpa-1440x-800_0020.avif',
                '/img/produtos/telhas-revestimentos/sala-limpa/sala-limpa-1440x-800_0030.avif',
                '/img/produtos/telhas-revestimentos/sala-limpa/sala-limpa-1440x-800_0040.avif',
                '/img/produtos/telhas-revestimentos/sala-limpa/sala-limpa-1440x-800_0050.avif',
                '/img/produtos/telhas-revestimentos/sala-limpa/sala-limpa-1440x-800_0060.avif'
            ],
            'camara-frigorifica': [
                '/img/produtos/telhas-revestimentos/camara-frigorifica/camara-frigorifica-1440x-800_0010.avif',
                '/img/produtos/telhas-revestimentos/camara-frigorifica/camara-frigorifica-1440x-800_0020.avif',
                '/img/produtos/telhas-revestimentos/camara-frigorifica/camara-frigorifica-1440x-800_0030.avif',
                '/img/produtos/telhas-revestimentos/camara-frigorifica/camara-frigorifica-1440x-800_0040.avif',
                '/img/produtos/telhas-revestimentos/camara-frigorifica/camara-frigorifica-1440x-800_0050.avif',
                '/img/produtos/telhas-revestimentos/camara-frigorifica/camara-frigorifica-1440x-800_0060.avif'
            ]
        }
    };

    // Mapeamento hardcoded dos benefits para cada produto
    const PRODUCT_BENEFITS = {
        'construcao-civil': {
            'blocos-em-eps': [
                {
                    id: 1,
                    title: "Leveza estrutural",
                    description: "Reduz a carga em fundações e facilita o transporte."
                },
                {
                    id: 2,
                    title: "Isolamento térmico",
                    description: "Proporciona conforto térmico com baixa condutividade."
                },
                {
                    id: 3,
                    title: "Facilidade de instalação",
                    description: "Permite cortes precisos e adaptação em obra."
                }
            ],
            'chapas-paineis-em-eps': [
                {
                    id: 1,
                    title: "Alta resistência",
                    description: "Painéis estruturais com excelente resistência mecânica."
                },
                {
                    id: 2,
                    title: "Isolamento eficiente",
                    description: "Isolamento térmico e acústico de alta performance."
                },
                {
                    id: 3,
                    title: "Facilidade de instalação",
                    description: "Sistema de encaixe simples e rápido."
                }
            ],
            'flocos-em-eps': [
                {
                    id: 1,
                    title: "Isolamento térmico",
                    description: "Excelente isolamento térmico para lajes e forros."
                },
                {
                    id: 2,
                    title: "Leveza",
                    description: "Reduz significativamente o peso das estruturas."
                },
                {
                    id: 3,
                    title: "Facilidade de aplicação",
                    description: "Aplicação simples com equipamentos convencionais."
                }
            ],
            'forros': [
                {
                    id: 1,
                    title: "Isolamento acústico",
                    description: "Reduz ruídos e melhora a acústica dos ambientes."
                },
                {
                    id: 2,
                    title: "Leveza estrutural",
                    description: "Não sobrecarrega a estrutura existente."
                },
                {
                    id: 3,
                    title: "Instalação rápida",
                    description: "Sistema de encaixe que agiliza a obra."
                }
            ],
            'isolamento-telhas': [
                {
                    id: 1,
                    title: "Isolamento térmico superior",
                    description: "Reduz drasticamente a transferência de calor."
                },
                {
                    id: 2,
                    title: "Economia na obra",
                    description: "Reduz custos com climatização e energia."
                },
                {
                    id: 3,
                    title: "Proteção eficiente",
                    description: "Protege contra variações extremas de temperatura."
                }
            ],
            'lajes-em-eps': [
                {
                    id: 1,
                    title: "Leveza estrutural",
                    description: "Reduz a carga nas fundações e pilares."
                },
                {
                    id: 2,
                    title: "Isolamento térmico",
                    description: "Mantém a temperatura ideal nos ambientes."
                },
                {
                    id: 3,
                    title: "Facilidade de instalação",
                    description: "Sistema simples que agiliza a construção."
                }
            ]
        },
        'molduras-decorativas': {
            'molduras-beiral': [
                {
                    id: 1,
                    title: "Estética superior",
                    description: "Design elegante que valoriza a arquitetura."
                },
                {
                    id: 2,
                    title: "Durabilidade",
                    description: "Resistente às intempéries e ao tempo."
                },
                {
                    id: 3,
                    title: "Facilidade de instalação",
                    description: "Sistema simples que não requer mão de obra especializada."
                }
            ],
            'molduras-portas-janelas': [
                {
                    id: 1,
                    title: "Personalização",
                    description: "Design personalizável para cada projeto."
                },
                {
                    id: 2,
                    title: "Resistência",
                    description: "Material durável e resistente ao impacto."
                },
                {
                    id: 3,
                    title: "Instalação simples",
                    description: "Sistema de encaixe que facilita a aplicação."
                }
            ],
            'molduras-colunas-capiteis': [
                {
                    id: 1,
                    title: "Design clássico",
                    description: "Estética que remete à arquitetura clássica."
                },
                {
                    id: 2,
                    title: "Durabilidade",
                    description: "Resistente e de longa duração."
                },
                {
                    id: 3,
                    title: "Facilidade de manutenção",
                    description: "Material que não requer cuidados especiais."
                }
            ],
            'molduras-muros': [
                {
                    id: 1,
                    title: "Estética superior",
                    description: "Design que valoriza qualquer projeto."
                },
                {
                    id: 2,
                    title: "Resistência",
                    description: "Material durável e resistente."
                },
                {
                    id: 3,
                    title: "Instalação simples",
                    description: "Sistema que facilita a aplicação."
                }
            ],
            'molduras-paredes': [
                {
                    id: 1,
                    title: "Design personalizado",
                    description: "Estética que se adapta a qualquer estilo."
                },
                {
                    id: 2,
                    title: "Durabilidade",
                    description: "Material de longa duração."
                },
                {
                    id: 3,
                    title: "Facilidade de aplicação",
                    description: "Sistema simples de instalação."
                }
            ]
        },
        'embalagens-em-eps': {
            'embalagens-em-eps': [
                {
                    id: 1,
                    title: "Proteção eficiente",
                    description: "Protege produtos contra impactos e vibrações."
                },
                {
                    id: 2,
                    title: "Leveza",
                    description: "Não aumenta significativamente o peso da carga."
                },
                {
                    id: 3,
                    title: "Personalização",
                    description: "Adapta-se perfeitamente ao formato do produto."
                }
            ],
            'perolas-em-eps': [
                {
                    id: 1,
                    title: "Proteção superior",
                    description: "Proteção eficiente contra impactos e vibrações."
                },
                {
                    id: 2,
                    title: "Leveza",
                    description: "Material leve que não sobrecarrega o produto."
                },
                {
                    id: 3,
                    title: "Personalização",
                    description: "Adapta-se perfeitamente ao formato do produto."
                }
            ]
        },
        'telhas-e-paineis': {
            'telhas-termicas': [
                {
                    id: 1,
                    title: "Isolamento térmico superior",
                    description: "Reduz drasticamente a transferência de calor."
                },
                {
                    id: 2,
                    title: "Economia de energia",
                    description: "Reduz custos com climatização."
                },
                {
                    id: 3,
                    title: "Durabilidade",
                    description: "Material resistente e de longa duração."
                }
            ],
            'fachada-fechamento-lateral': [
                {
                    id: 1,
                    title: "Isolamento térmico",
                    description: "Protege contra variações de temperatura."
                },
                {
                    id: 2,
                    title: "Estética",
                    description: "Design que valoriza a arquitetura."
                },
                {
                    id: 3,
                    title: "Facilidade de instalação",
                    description: "Sistema simples de aplicação."
                }
            ],
            'divisoria-e-forro': [
                {
                    id: 1,
                    title: "Isolamento acústico",
                    description: "Reduz ruídos entre ambientes."
                },
                {
                    id: 2,
                    title: "Leveza",
                    description: "Não sobrecarrega a estrutura existente."
                },
                {
                    id: 3,
                    title: "Instalação rápida",
                    description: "Sistema que agiliza a obra."
                }
            ],
            'sala-limpa': [
                {
                    id: 1,
                    title: "Controle de contaminação",
                    description: "Previne contaminação em ambientes críticos."
                },
                {
                    id: 2,
                    title: "Facilidade de limpeza",
                    description: "Superfície lisa e fácil de higienizar."
                },
                {
                    id: 3,
                    title: "Durabilidade",
                    description: "Material resistente e de longa duração."
                }
            ],
            'camara-frigorifica': [
                {
                    id: 1,
                    title: "Isolamento térmico superior",
                    description: "Mantém temperatura constante em câmaras frias."
                },
                {
                    id: 2,
                    title: "Economia de energia",
                    description: "Reduz custos com refrigeração."
                },
                {
                    id: 3,
                    title: "Durabilidade",
                    description: "Resistente a baixas temperaturas e umidade."
                }
            ]
        }
    };

    const heroSection = {
        title: productData.hero?.title || productData.name,
        description: productData.hero?.description || t('defaults.heroDescription'),
        buttonText: productData.hero?.buttonText || t('defaults.buttonText'),
        buttonLink: productData.hero?.buttonLink || `/${locale}/contato`,
        backgroundImage: (PRODUCT_HERO_IMAGES as any)[category]?.[product] || '/img/heroes/categories/construcao-civil-hero.avif'
    };
    


    // Mapear slug da URL para chave das traduções
    const categoryKeyMap: { [key: string]: string } = {
        'construcao-civil': 'construcaoCivil',
        'telhas-e-paineis': 'telhasPaineis',
        'molduras-decorativas': 'molduras',
        'embalagens-em-eps': 'embalagens'
    };
    
    const categoryKey = categoryKeyMap[category] || category;
    
    // Mapear slug do produto para chave das traduções
    const productKeyMap: { [key: string]: string } = {
        'lajes-em-eps': 'lajes',
        'blocos-em-eps': 'blocos',
        'chapas-paineis-em-eps': 'chapas',
        'forros': 'forros',
        'isolamento-telhas': 'isolamentoTelhas',
        'flocos-em-eps': 'flocos',
        'embalagens-em-eps': 'embalagens',
        'perolas-em-eps': 'perolas',
        'molduras-beiral': 'beiral',
        'molduras-portas-janelas': 'portas',
        'molduras-colunas-capiteis': 'colunas',
        'molduras-muros': 'muros',
        'molduras-paredes': 'parede',
        'telhas-termicas': 'telhasTermicas',
        'fachada-fechamento-lateral': 'fachadaFechamento',
        'divisoria-e-forro': 'divisoriaForro',
        'sala-limpa': 'salaLimpa',
        'camara-frigorifica': 'camaraFrigorifica'
    };
    
    const productKey = productKeyMap[product] || product;
    
    const categoryDescription = productData.categoryDescription || {
        title: tCategory(`categories.${categoryKey}.products.${productKey}.name`),
        description: tCategory(`categories.${categoryKey}.products.${productKey}.description`)
    };

    // Usar os benefícios hardcoded se existirem, senão fallback para API/JSON
    const hardcodedBenefits = (PRODUCT_BENEFITS as any)[category]?.[product];
    const benefits = hardcodedBenefits || productData.benefits || categoryData?.benefits || [];

    const generalCharacteristics = productData.generalCharacteristics || [];

    const applications = productData.applications || null;

    const tabDescriptions = productData.tabDescriptions || {};



    return (
        <div className={styles['product-page']}>
            {/* Hero Section */}
            <section
                className={styles['product-page-hero-section']}
                style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}
            >
                <div className={styles['product-page-hero-mask']}></div>
                <div className={styles['product-page-hero-content']}>
                    <h1>{heroSection.title}</h1>
                    <p>{heroSection.description}</p>
                    <Link href={heroSection.buttonLink || `/${locale}/contato`}>
                        <Button variant="primary" size="medium">
                            {heroSection.buttonText || 'Solicite um orçamento'}
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Category Description */}
            <section className={styles['product-page-description-section']}>
                <div className={styles['product-page-description-wrapper']}>
                    <h3>{categoryDescription.title}</h3>
                    <p>{categoryDescription.description}</p>
                </div>
            </section>

            {/* Benefits - Agora usando os benefícios da categoria */}
            {benefits && benefits.length > 0 && <BenefitsSection benefits={benefits} />}

            {/* Carrossel galeria */}
            <section className={styles['general-characteristics-section']}>
                <div className={styles['general-characteristics-wrapper']}>
                    <div className={styles['img-placeholder']}>
                        {(() => {
                            // Sistema hardcoded 100% garantido
                            const hardcodedImages = (PRODUCT_GALLERY_IMAGES as any)[category]?.[product];
                            
                            // Se não tiver imagens hardcoded, usar fallback padrão
                            if (!hardcodedImages || hardcodedImages.length === 0) {
                                return (
                                    <ImageCarousel 
                                        images={['/img/geral/exemplo2.avif']}
                                        alt={productData.name}
                                        width={1440}
                                        height={800}
                                    />
                                );
                            }
                            
                            return (
                                <ImageCarousel 
                                    images={hardcodedImages}
                                    alt={productData.name}
                                    width={1440}
                                    height={800}
                                />
                            );
                        })()}
                    </div>

                {/* Características gerais */}
                    {generalCharacteristics.length > 0 && (
                        <>
                            <h3>{tSections('characteristics')}</h3>
                            <div className={styles['features-grid']}>
                                {generalCharacteristics.map((char, index) => (
                                    <div key={index} className={styles['feature']}>
                                        <span><TbChecks size={24} /></span> <p>{char}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Applications */}
            {applications && (
                <section className={styles['applications-section']}>
                    <div className={styles['applications-wrapper']}>
                        <h3>{applications.title}</h3>
                        <p>{applications.description}</p>
                        <p>{t('defaults.applicationsLabel')}</p>
                        <div className={styles['application-carousel']}>
                            <div className={styles['application-cards']}>
                                {applications.indications.map((indication, index) => (
                                    <div key={index} className={styles['application-card']}>
                                        {renderIcon(indication.icon)} {indication.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Models Table - Apenas para telhas térmicas */}
            {productData.modelsTable && (
                <section className={styles['models-table-section']}>
                    <div className={styles['models-table-wrapper']}>
                        <h5 className={styles['models-table-title']}>{productData.modelsTable.title || tSections('modelsTableTitle')}</h5>
                        <div className={styles['models-table-container']}>
                            <table className={styles['models-table']}>
                                <thead>
                                    <tr>
                                        {productData.modelsTable.headers.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.modelsTable!.rows.map((row, rowIndex) => {
                                        const totalRows = productData.modelsTable!.rows.reduce((acc, r) => acc + r.espessuras.length, 0);
                                        return row.espessuras.map((espessura, espIndex) => (
                                            <tr key={`${rowIndex}-${espIndex}`}>
                                                {rowIndex === 0 && espIndex === 0 ? (
                                                    <td rowSpan={totalRows}>{row.material}</td>
                                                ) : null}
                                                <td>{espessura}</td>
                                                {espIndex === 0 ? (
                                                    <td rowSpan={row.espessuras.length}>{row.revestimento}</td>
                                                ) : null}
                                                {rowIndex === 0 && espIndex === 0 ? (
                                                    <td rowSpan={totalRows}>{row.trapezios}</td>
                                                ) : null}
                                            </tr>
                                        ));
                                    })}
                                </tbody>
                            </table>
                            {productData.modelsTable.note && (
                                <p className={styles['models-table-note']}>{productData.modelsTable.note}</p>
                            )}
                            {!productData.modelsTable.note && (
                                <p className={styles['models-table-note']}>{tSections('modelsTableNote')}</p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Product Descriptions - Apenas se não houver tabela de modelos */}
            {!productData.modelsTable && Object.keys(tabDescriptions).length > 0 && (
                <section className={styles['product-descriptions-section']}>
                    <div className={styles['product-descriptions-wrapper']}>
                        {Object.entries(tabDescriptions).map(([title, description]) => (
                            <div key={title} className={styles['product-description-item']}>
                                <h4 className={styles['product-description-title']}>{title}</h4>
                                <p className={styles['product-description-content']}>{description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* PIR Incêndio Component - Apenas para categoria telhas-e-paineis */}
            {category === 'telhas-e-paineis' && <IncendioComponent locale={locale} />}

            <SobreEmpresa locale={locale} />
            <ContactComponent locale={locale} />
        </div>
    );
}