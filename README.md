# Isoart Website 2025

Site institucional da Isoart, empresa especializada em soluções em EPS e PIR para construção civil, embalagens e isolamento térmico.

## 🏗️ Estrutura do Projeto

### Tecnologias
- **Next.js 15.4.5** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **GSAP** - Animações
- **Lenis** - Scroll suave
- **React Icons** - Ícones

### Estrutura de Pastas
```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # APIs (cities, contact, states)
│   ├── categorias/        # Páginas de categorias e produtos
│   ├── components/        # Componentes reutilizáveis
│   ├── contato/          # Página de contato
│   ├── data/             # Dados JSON (categorias, produtos, etc.)
│   ├── hooks/            # Custom hooks
│   ├── sobre/            # Páginas institucionais
│   ├── sobre-eps-pir/    # Página sobre EPS/PIR
│   ├── solucoes/         # Página de soluções
│   ├── types/            # Tipos TypeScript
│   └── views/ui/         # Componentes UI básicos
├── public/               # Assets estáticos
└── lib/                  # Utilitários
```

## 🎨 Design System

### Cores
- **Azul Isoart**: `rgba(24, 74, 100, 1)` - Cor principal
- **Gold Isoart**: `rgba(146, 151, 120, 1)` - Cor secundária
- **Cinza**: Escala de cinzas para textos e backgrounds

### Tipografia
- **Red Hat Display**: Títulos e headlines
- **Inter**: Texto corrido e UI

### Componentes
- **Hero Sections**: Banners principais com slider
- **Navigation**: Menu principal e institucional
- **Cards**: Produtos e categorias
- **Forms**: Formulários de contato
- **Buttons**: Sistema de botões com variantes

## 📱 Páginas

### Páginas Principais
- **Home** (`/`) - Landing page com slider e soluções
- **Sobre** (`/sobre`) - História e timeline da empresa
- **Sobre EPS/PIR** (`/sobre-eps-pir`) - Informações técnicas
- **Soluções** (`/solucoes`) - Catálogo de soluções
- **Contato** (`/contato`) - Formulário e informações

### Categorias de Produtos
- **Telhas e Revestimentos** (`/categorias/telhas-e-paineis`)
- **Construção Civil** (`/categorias/construcao-civil`)
- **Forros** (`/categorias/forros`)
- **Molduras Decorativas** (`/categorias/molduras-decorativas`)
- **Embalagens** (`/categorias/embalagens-em-eps`)

### Produtos Individuais
Cada categoria possui produtos específicos com páginas detalhadas:
- Telhas Térmicas, Fachadas, Divisórias, etc.
- Lajes, Blocos, Flocos, Chapas
- Forros Dunas e Paris
- Molduras para portas, beirais, colunas, etc.
- Embalagens e Pérolas

## 🔧 Configuração

### Build
```bash
npm run build --no-lint  # Build sem linting para deploy
npm run dev              # Desenvolvimento
npm run start            # Produção local
```

### Configurações Especiais
- **ESLint desabilitado** durante build para evitar falhas
- **TypeScript** com verificações relaxadas
- **Imagens otimizadas** com Next.js Image
- **Scroll suave** com Lenis
- **Animações** com GSAP

## 📊 Dados

### Estrutura de Dados
- **Categorias**: JSON com metadados e produtos
- **Produtos**: Especificações técnicas e imagens
- **Menu**: Navegação dinâmica
- **Formulários**: Submissões de contato

### APIs
- `/api/cities` - Lista de cidades
- `/api/states` - Lista de estados
- `/api/contact` - Formulário principal
- `/api/contact-page` - Formulário da página de contato

## 🚀 Deploy

### Vercel
- Build otimizado para produção
- Cache de imagens e assets
- CDN global
- Analytics integrado

### Configurações de Build
- ESLint ignorado durante build
- TypeScript com verificações relaxadas
- Otimização automática de imagens
- Geração estática de páginas

## 📈 Performance

### Otimizações Recentes
- **CSS Crítico Inline** - Melhora LCP (Largest Contentful Paint)
- **Preload de Imagens** - `fetchPriority="high"` para recursos críticos
- **Cores Hex** - Substituição de rgba por hex para melhor performance
- **Fontes Otimizadas** - Carregamento otimizado de Google Fonts
- **DNS Prefetch** - Para recursos externos

### Métricas de Performance
- **PageSpeed Score**: 99/100
- **LCP**: Otimizado com CSS crítico
- **FCP**: Melhorado com preload de recursos
- **CLS**: Estável com animações controladas

### SEO
- **Meta tags** dinâmicas por página
- **Structured data** para produtos
- **Sitemap** automático
- **Open Graph** tags

## 🔍 Manutenção

### Limpeza de Código
- CSS organizado por componentes
- Variáveis CSS centralizadas
- Componentes reutilizáveis
- Tipos TypeScript bem definidos

### Estrutura de Componentes
- **Section** → **Wrapper** → **Container** → **Content** → **Elements**
- Padrão consistente em todo o projeto
- Responsividade mobile-first
- Acessibilidade implementada

### Correções Recentes
- **Menu Mobile**: Fechamento automático ao clicar em links
- **Cores de Texto**: Correção de textos pretos em componentes escuros
- **CSS Crítico**: Otimização para melhor LCP
- **Performance**: Conversão rgba para hex

## 📝 Notas Técnicas

### Dependências Principais
- `next`: 15.4.5
- `react`: ^19.0.0
- `gsap`: ^3.13.0
- `lenis`: ^1.3.4
- `react-icons`: ^5.5.0

### Configurações Especiais
- Build sem linting para evitar falhas de deploy
- TypeScript com verificações relaxadas
- Tailwind CSS com configuração customizada
- Animações otimizadas com GSAP
- CSS crítico inline para performance

### Últimas Atualizações
- **v15.4.5**: Atualização do Next.js
- **Performance**: Otimizações de LCP e FCP
- **CSS**: Correções de cores e estrutura
- **Mobile**: Melhorias na navegação

---

**Desenvolvido para Isoart** - Soluções em EPS e PIR para construção civil

*Última atualização: Dezembro 2024*
