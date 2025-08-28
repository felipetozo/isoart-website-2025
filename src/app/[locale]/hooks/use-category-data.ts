import { useTranslations } from 'next-intl';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    specifications?: {
        [key: string]: string | undefined;
    };
}

interface HeroSection {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
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
    hero?: HeroSection;
    categoryDescription?: string;
    products: Product[];
    benefits?: Benefit[];
}

export const useCategoryData = (categorySlug: string): CategoryData | null => {
    const t = useTranslations('categoryPage.categories');
    
    try {
        // Mapear slugs da URL para nomes das categorias nas traduções
        const categoryMapping: { [key: string]: string } = {
            'construcao-civil': 'construcaoCivil',
            'embalagens-em-eps': 'embalagens',
            'molduras-decorativas': 'molduras',
            'telhas-e-paineis': 'telhasPaineis'
        };
        
        const categoryKey = categoryMapping[categorySlug] || categorySlug.replace(/-/g, '');
        
        // Verificar se a categoria existe nas traduções
        const hasCategory = t.has(`${categoryKey}.title`);
        
        if (!hasCategory) {
            console.warn(`Category not found in translations: ${categoryKey}`);
            return null;
        }
        
        // Mapear imagens corretas para cada categoria
        const heroImages: { [key: string]: string } = {
            'construcaoCivil': '/img/heroes/categories/construcao-civil-hero.avif',
            'embalagens': '/img/heroes/categories/embalagens-eps-hero.avif',
            'molduras': '/img/heroes/categories/molduras-decorativas-hero.avif',
            'telhasPaineis': '/img/heroes/categories/telhas-paineis-hero.avif'
        };
        
        // Garantir que sempre tenha uma imagem válida
        const getHeroImage = (categoryKey: string) => {
            const image = heroImages[categoryKey];
            if (image) return image;
            
            // Fallback para categorias não mapeadas
            return '/img/heroes/categories/construcao-civil-hero.avif';
        };
        
        // Construir dados da categoria usando apenas traduções
        const categoryData: CategoryData = {
            id: 0, // ID padrão
            title: t(`${categoryKey}.title`),
            slug: categorySlug,
            categoryDescription: t.has(`${categoryKey}.categoryDescription`) ? t(`${categoryKey}.categoryDescription`) : undefined,
            hero: {
                title: t(`${categoryKey}.hero.title`),
                description: t(`${categoryKey}.hero.description`),
                buttonText: t(`${categoryKey}.hero.buttonText`),
                buttonLink: `/${categorySlug}/contato`,
                backgroundImage: getHeroImage(categoryKey)
            },
            products: [],
            benefits: []
        };
        
        // Carregar produtos se existirem
        try {
            // Para cada categoria, definir quais produtos existem
            const productKeys: { [key: string]: string[] } = {
                'construcaoCivil': ['lajesEps', 'isolamentoTelhas', 'blocosEps', 'chapasPaineisEps', 'forros'],
                'embalagens': ['embalagensEps', 'perolasEps'],
                'molduras': ['moldurasPortasJanelas', 'moldurasBeiral', 'moldurasColunasCapiteis', 'moldurasMuros', 'moldurasParedes'],
                'telhasPaineis': ['telhasTermicas', 'fachadaFechamento', 'divisoriaForro', 'salaLimpa', 'camaraFrigorifica']
            };
            
            // Mapeamento entre productKeys e slugs reais dos arquivos
            const productSlugMapping: { [key: string]: { [key: string]: string } } = {
                'construcaoCivil': {
                    'lajesEps': 'lajes-em-eps',
                    'isolamentoTelhas': 'isolamento-telhas',
                    'blocosEps': 'blocos-em-eps',
                    'chapasPaineisEps': 'chapas-paineis-em-eps',
                    'forros': 'forros'
                },
                'embalagens': {
                    'embalagensEps': 'embalagens-em-eps',
                    'perolasEps': 'perolas-em-eps'
                },
                'molduras': {
                    'moldurasPortasJanelas': 'molduras-portas-janelas',
                    'moldurasBeiral': 'molduras-beiral',
                    'moldurasColunasCapiteis': 'molduras-colunas-capiteis',
                    'moldurasMuros': 'molduras-muros',
                    'moldurasParedes': 'molduras-paredes'
                },
                'telhasPaineis': {
                    'telhasTermicas': 'telhas-termicas',
                    'fachadaFechamento': 'fachada-fechamento-lateral',
                    'divisoriaForro': 'divisoria-e-forro',
                    'salaLimpa': 'sala-limpa',
                    'camaraFrigorifica': 'camara-frigorifica'
                }
            };
            
            // Mapear imagens corretas para produtos
            const productImages: { [key: string]: { [key: string]: string } } = {
                'embalagens': {
                    'embalagensEps': '/img/produtos/embalagens/embalagens/embalagens-1440x-800_001.avif',
                    'perolasEps': '/img/produtos/embalagens/perolas/perolas-1440x-800_001.avif'
                },
                'construcaoCivil': {
                    'lajesEps': '/img/produtos/construcao-civil/lajes/lajes-1440x-800_001.avif',
                    'isolamentoTelhas': '/img/produtos/construcao-civil/isolamento-telhas/isolamento-telhas-1440x-800_001.avif',
                    'blocosEps': '/img/produtos/construcao-civil/blocos/blocos-1440x-800_001.avif',
                    'chapasPaineisEps': '/img/produtos/construcao-civil/chapas/chapas-1440x-800_001.avif',
                    'forros': '/img/produtos/construcao-civil/forros/dunas-1440x-800_001.avif'
                },
                'molduras': {
                    'moldurasPortasJanelas': '/img/produtos/molduras/portas/portas-1440x-800_0010.avif',
                    'moldurasBeiral': '/img/produtos/molduras/beiral/beiral-1440x-800_001.avif',
                    'moldurasColunasCapiteis': '/img/produtos/molduras/colunasecapiteis/colunas-1440x-800_0010.avif',
                    'moldurasMuros': '/img/produtos/molduras/muros/muros-1440x-800_001.avif',
                    'moldurasParedes': '/img/produtos/molduras/parede/parede-1440x-800_001.avif'
                },
                'telhasPaineis': {
                    'telhasTermicas': '/img/produtos/telhas-revestimentos/telhas-termicas/telhas-termicas-1440-800_0010.avif',
                    'fachadaFechamento': '/img/produtos/telhas-revestimentos/fachada-fechamento/fachada-fechamento-1440x-800_0010.avif',
                    'divisoriaForro': '/img/produtos/telhas-revestimentos/divisoria-forro/divisoria-forro-1440x-800_0010.avif',
                    'salaLimpa': '/img/produtos/telhas-revestimentos/sala-limpa/sala-limpa-1440x-800_0010.avif',
                    'camaraFrigorifica': '/img/produtos/telhas-revestimentos/camara-frigorifica/camara-frigorifica-1440x-800_0010.avif'
                }
            };
            
            const availableProducts = productKeys[categoryKey] || [];
            categoryData.products = availableProducts.map((productKey, index) => {
                try {
                    const name = t(`${categoryKey}.products.${productKey}.name`);
                    const description = t(`${categoryKey}.products.${productKey}.description`);
                    
                    // Usar o slug correto do mapeamento
                    const correctSlug = productSlugMapping[categoryKey]?.[productKey] || productKey;
                    
                    return {
                        id: index + 1,
                        name: name || productKey,
                        slug: correctSlug,
                        description: description || '',
                        image: productImages[categoryKey]?.[productKey] || `/img/produtos/${categorySlug}/${correctSlug}.avif`
                    };
                } catch (error) {
                    console.warn(`Product ${productKey} not found for category: ${categoryKey}`);
                    
                    // Usar o slug correto mesmo no fallback
                    const correctSlug = productSlugMapping[categoryKey]?.[productKey] || productKey;
                    
                    return {
                        id: index + 1,
                        name: productKey,
                        slug: correctSlug,
                        description: '',
                        image: productImages[categoryKey]?.[productKey] || `/img/produtos/${categorySlug}/${correctSlug}.avif`
                    };
                }
            });
        } catch (error) {
            console.warn(`Products not found for category: ${categoryKey}`);
        }
        
                // Carregar benefícios se existirem
        try {
            // Verificar se a categoria tem benefícios definidos
            if (t.has(`${categoryKey}.benefits`)) {
                // Para cada categoria, definir quantos benefícios existem
                const benefitCounts: { [key: string]: number } = {
                    'construcaoCivil': 3,
                    'embalagens': 3,
                    'molduras': 3,
                    'telhasPaineis': 3 // Agora telhas e painéis têm benefícios
                };
                
                const benefitCount = benefitCounts[categoryKey] || 0;
                categoryData.benefits = [];
                
                for (let i = 1; i <= benefitCount; i++) {
                    try {
                        const title = t(`${categoryKey}.benefits.benefit${i}.title`);
                        const description = t(`${categoryKey}.benefits.benefit${i}.description`);
                        
                        categoryData.benefits.push({
                            id: i,
                            title: title || `Benefício ${i}`,
                            description: description || ''
                        });
                    } catch (error) {
                        console.warn(`Benefit ${i} not found for category: ${categoryKey}`);
                    }
                }
            }
        } catch (error) {
            console.warn(`Benefits not found for category: ${categoryKey}`);
        }
        
        return categoryData;
        
    } catch (error) {
        console.error(`Error loading category data for ${categorySlug}:`, error);
        return null;
    }
};
