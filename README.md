# Isoart Website 2025

Website da Isoart, empresa especializada em soluções térmicas com EPS e PIR para construção civil, embalagens e isolamento. Construído com Next.js 15, React 19, TypeScript e otimizações avançadas de performance.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias e Bibliotecas](#tecnologias-e-bibliotecas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar (Desenvolvimento)](#como-executar-desenvolvimento)
- [Build de Produção](#build-de-produção)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Padronização e Qualidade de Código](#padronização-e-qualidade-de-código)
- [Estilo e UI](#estilo-e-ui)
- [Rotas e Navegação](#rotas-e-navegação)
- [Estado, Formulários e Validação](#estado-formulários-e-validação)
- [Animações e Performance](#animações-e-performance)
- [Boas Práticas de Deploy](#boas-práticas-de-deploy)
- [Roadmap / Próximos Passos](#roadmap--próximos-passos)

---

## Visão Geral

Este é um site corporativo moderno e responsivo que apresenta as soluções da empresa em EPS (Poliestireno Expandido) e PIR (Poliisocianurato) para construção civil, embalagens e isolamento térmico. O projeto prioriza performance, SEO, acessibilidade e uma experiência de usuário excepcional com animações suaves e navegação intuitiva.

---

## Tecnologias e Bibliotecas

### Core
- **Next.js 15** (Framework React com App Router)
- **React 19** + **TypeScript** (UI e tipagem estática)
- **CSS Modules** (Sistema de design e estilização)

### Animações e Performance
- **GSAP** + **@gsap/react** (Animações avançadas)
- **Lenis** (Scroll suave e otimizado)
- **ScrollMagic** (Animações baseadas em scroll)

### UI e Componentes
- **Lucide React** (Ícones modernos)
- **React Icons** (Biblioteca de ícones)
- **Tabler Icons React** (Ícones adicionais)

### Analytics
- **Vercel Analytics** (Ativo e funcionando)

### Ferramentas de Desenvolvimento
- **ESLint** (Linting de código)
- **PostCSS** (Processamento de CSS)
- **Sharp** (Otimização de imagens)

---

## Estrutura do Projeto

```
isoart-website-2025/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── categorias/         # Páginas de categorias e produtos
│   │   │   ├── [category]/     # Páginas dinâmicas de categorias
│   │   │   └── [category]/[product]/ # Páginas dinâmicas de produtos
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── contato/            # Página de contato
│   │   ├── sobre/              # Páginas institucionais
│   │   ├── solucoes/           # Página de soluções
│   │   ├── views/              # Componentes de UI
│   │   ├── globals.css         # Estilos globais
│   │   └── layout.tsx          # Layout raiz
│   ├── data/                   # Dados estáticos e JSON
│   │   ├── categories/         # Dados específicos de categorias
│   │   ├── menu-data.json      # Estrutura do menu principal
│   │   └── products/           # Dados de produtos
│   ├── hooks/                  # Hooks customizados
│   ├── lib/                    # Utilitários e helpers
│   └── types/                  # Definições de tipos
├── public/                     # Arquivos estáticos
│   ├── img/                    # Imagens do site
│   ├── icons/                  # Ícones e bandeiras
│   └── downloads/              # Arquivos para download
├── next.config.ts             # Configuração do Next.js
├── postcss.config.mjs         # Configuração do PostCSS
└── tsconfig.json              # Configuração do TypeScript
```

---

## Pré-requisitos

- **Node.js 18+** (recomendado) e **npm 9+** ou **pnpm/yarn**
- **Git** para clonar o repositório

---

## Como Executar (Desenvolvimento)

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/isoart-website-2025.git
cd isoart-website-2025

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

---

## Build de Produção

```bash
# Gerar build de produção
npm run build

# Iniciar servidor de produção localmente (opcional)
npm run start
```

O build final ficará disponível em `.next/`.

---

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento Next.js
- `npm run build` - Gera o build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o ESLint para verificação de código

---

## Padronização e Qualidade de Código

- **ESLint** configurado em `eslint.config.mjs`
- **TypeScript** com configuração estrita em `tsconfig.json`
- **Prettier** (recomendado) para formatação consistente de código
- Padrões de nomenclatura em kebab-case para CSS classes
- Estrutura de componentes: Section → Wrapper → Container → Content → Elementos

---

## Estilo e UI

- **CSS Modules** para estilização modular
- Sistema de cores personalizado com valores RGBA diretos
- Tipografia com fontes Google (Inter, Red Hat Display)
- Design responsivo e mobile-first
- Componentes modulares e reutilizáveis

### Sistema de Cores
- Paleta Azul Isoart (tons profissionais)
- Paleta Gold Isoart (destaques e acentos)
- Cores específicas para categorias de soluções
- Cores RAL para revestimentos PIR

---

## Rotas e Navegação

- **App Router** do Next.js 15
- Estrutura de rotas baseada em pastas
- Navegação dinâmica entre categorias e produtos
- Breadcrumbs e navegação hierárquica

### Status da Internacionalização (Tradução)
**✅ SISTEMA DE TRADUÇÃO REMOVIDO - SITE FUNCIONANDO EM PORTUGUÊS BRASILEIRO**

**Situação Atual:**
- ✅ **Site funcionando perfeitamente** em português brasileiro
- ✅ **Menu e submenu funcionando** com navegação completa
- ✅ **Rotas das categorias funcionando** (`/categorias/[category]`)
- ✅ **Rotas dos produtos funcionando** (`/categorias/[category]/[product]`)
- ✅ **Sem conflitos de roteamento** dinâmico
- ✅ **Performance otimizada** sem overhead de internacionalização

**O que foi removido:**
- ❌ **Sistema de rotas `[lang]`** - Causava conflitos
- ❌ **Arquivos de tradução** - `pt-BR.json`, `en.json`, `es.json`
- ❌ **Middleware de internacionalização** - `middleware.ts`
- ❌ **Seletor de idiomas** - Interface de troca de idioma
- ❌ **Dependências de i18n** - `next-intl`, `react-i18next`

**Estrutura atual funcionando:**
- **Menu principal**: Navegação entre categorias principais
- **Submenu**: Produtos de cada categoria com imagens
- **Páginas de categoria**: Layout específico para cada categoria
- **Páginas de produto**: Detalhes completos de cada produto
- **Navegação institucional**: Sobre, Soluções, Contato

**Decisão técnica:**
O sistema de tradução foi removido para resolver conflitos de roteamento e manter o site 100% funcional. O site está otimizado para o mercado brasileiro, que é o público-alvo principal da Isoart.

---

## Estado, Formulários e Validação

- **React Hooks** para gerenciamento de estado local
- **Context API** para estado global quando necessário
- Formulários de contato com validação
- Gerenciamento de cookies e consentimento
- Estado de navegação e filtros

---

## Animações e Performance

- **GSAP** para animações complexas e sequenciais
- **Lenis** para scroll suave e otimizado
- **ScrollMagic** para animações baseadas em scroll
- Lazy loading de imagens e componentes
- Otimizações de Core Web Vitals
- Headers de cache e compressão configurados

### Otimizações de Performance
- Preload de recursos críticos
- Otimização de imagens com Sharp
- Compressão e cache configurados
- Bundle splitting otimizado
- Fontes com display swap

---

## Boas Práticas de Deploy

- **Build otimizado** com `npm run build`
- **Configurações de cache e headers** no `next.config.ts`
- **Analytics integrado** com @vercel/analytics
- **Monitoramento de performance e métricas**
- **Hospedagem** a ser definida pela equipe responsável

### Configurações de Produção
- **Headers de segurança** configurados
- **Cache otimizado** para CSS e assets
- **Compressão habilitada**
- **Otimizações de webpack** para produção

### Google Analytics e Tracking
- **Google Analytics**: Configurado mas **NÃO ATIVADO** (pronto para implementação)
- **ID do GTM**: `GTM-W6JCS4X` (disponível do site antigo)
- **Vercel Analytics**: Ativo e funcionando
- **Estrutura preparada**: Componente `AnalyticsProvider` configurado para futuras integrações
- **Status**: Migração do tracking do site antigo para o novo site pendente

#### Detalhes da Configuração
- **Site Antigo (CodeIgniter)**: Google Analytics ativo com GTM `GTM-W6JCS4X`
- **Site Atual (Next.js)**: Estrutura preparada, aguardando ativação
- **Próximo Passo**: Implementar Google Analytics usando o ID existente
- **Compatibilidade**: Mantida com o tracking atual do site antigo

---

## Roadmap / Próximos Passos

### Funcionalidades Planejadas
- [ ] Galeria de projetos realizados
- [ ] Sistema de busca avançado
- [ ] Filtros dinâmicos para produtos
- [ ] Blog/notícias da empresa
- [ ] Sistema de orçamento online
- [ ] Área do cliente

### Melhorias Técnicas
- [ ] **Google Analytics**: Ativar tracking com GTM `GTM-W6JCS4X` existente
- [ ] **Facebook Pixel**: Implementar para remarketing e conversões
- [ ] **Monitoramento de Performance**: Integrar ferramentas de monitoramento
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] Storybook para documentação de componentes
- [ ] Monitoramento de erros
- [ ] Otimizações de SEO avançadas

### Considerações sobre Internacionalização
**⚠️ IMPORTANTE**: Se no futuro for necessário implementar suporte a múltiplos idiomas:

1. **Implementar sistema de roteamento limpo** sem conflitos
2. **Usar biblioteca de tradução robusta** (react-i18next ou next-intl)
3. **Traduzir todo o conteúdo** estático e dinâmico
4. **Implementar SEO multilíngue** com hreflang tags
5. **Testar navegação** entre idiomas extensivamente

**Recomendação atual**: Manter o site em português brasileiro para foco no mercado principal.

---

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## Licença

Este projeto é privado e propriedade da Isoart. Todos os direitos reservados.

---

## Contato

- **Website**: [www.isoart.br](https://www.isoart.com.br)
- **Email**: contato@isoart.com.br
- **Telefone**: +55 (45) 3231-1699

---

## Status do Projeto (Atualizado: Janeiro 2025)

**✅ PROJETO FUNCIONANDO PERFEITAMENTE**

- **Commit atual**: `193d5be` ("updated")
- **Status**: Site 100% funcional sem conflitos
- **Idioma**: Português brasileiro (otimizado para mercado local)
- **Performance**: Otimizada e sem overhead de internacionalização
- **Menu e navegação**: Funcionando perfeitamente
- **Rotas dinâmicas**: Categorias e produtos funcionando

**Última atualização**: Janeiro 2025 - Sistema de tradução removido para resolver conflitos e manter funcionalidade completa.

---

*Desenvolvido por Stubborn - www.stubborn.com.br*
