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
- [Internacionalização (i18n)](#internacionalização-i18n)
- [Estado, Formulários e Validação](#estado-formulários-e-validação)
- [Animações e Performance](#animações-e-performance)
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

### Internacionalização
- **next-intl** (Sistema de internacionalização nativo do Next.js)
- **Middleware de roteamento** para suporte multilíngue

### Animações e Performance
- **GSAP** + **@gsap/react** (Animações avançadas)
- **Lenis** (Scroll suave e otimizado)
- **ScrollMagic** (Animações baseadas em scroll)

### UI e Componentes
- **Lucide React** (Ícones modernos)
- **React Icons** (Biblioteca de ícones)
- **Tabler Icons React** (Ícones adicionais)
- **CSS Modules** (Sistema de design modular)

### Email e Notificações
- **Nodemailer** (Envio de emails para notificações de formulários de contato)

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
│   ├── app/                                  # App Router do Next.js
│   │   ├── [locale]/                         # Rotas com suporte a idiomas
│   │   │   ├── categorias/                   # Páginas de categorias e produtos
│   │   │   │   ├── [category]/               # Páginas dinâmicas de categorias
│   │   │   │   └── [category]/[product]/     # Páginas dinâmicas de produtos
│   │   │   ├── components/                   # Componentes reutilizáveis
│   │   │   ├── contato/                      # Página de contato
│   │   │   ├── sobre/                        # Páginas institucionais
│   │   │   ├── solucoes/                     # Página de soluções
│   │   │   ├── views/                        # Componentes de UI
│   │   │   ├── globals.css                   # Estilos globais
│   │   │   ├── i18n.ts                       # Configuração de internacionalização
│   │   │   └── layout.tsx                    # Layout com suporte a idiomas
│   │   ├── components/                       # Componentes globais
│   │   ├── globals.css                       # Estilos globais
│   │   └── layout.tsx                        # Layout raiz
│   ├── data/                                 # Dados estáticos e JSON
│   │   ├── categories/                       # Dados específicos de categorias
│   │   ├── locales/                          # Arquivos de tradução
│   │   │   ├── pt-BR.json                    # Traduções em português
│   │   │   ├── en.json                       # Traduções em inglês
│   │   │   └── es.json                       # Traduções em espanhol
│   │   ├── menu-data.json                    # Estrutura do menu principal
│   │   └── products/                         # Dados de produtos
│   ├── hooks/                                # Hooks customizados
│   │   └── use-language.ts                   # Hook para gerenciamento de idiomas
│   ├── lib/                                  # Utilitários e helpers
│   └── types/                                # Definições de tipos
├── public/                                   # Arquivos estáticos
│   ├── img/                                  # Imagens do site
│   ├── icons/                                # Ícones e bandeiras
│   └── downloads/                            # Arquivos para download
├── middleware.ts                             # Middleware de internacionalização
├── next.config.ts                            # Configuração do Next.js
├── postcss.config.mjs                        # Configuração do PostCSS
└── tsconfig.json                             # Configuração do TypeScript
```

---

## Pré-requisitos

- **Node.js 18+** (recomendado) e **npm 9+** ou **pnpm/yarn**
- **Git** para clonar o repositório

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
- **Sistema de internacionalização** com next-intl
- **SMTP Mailer** com Nodemailer
- Estrutura de rotas baseada em pastas com suporte a idiomas
- Navegação dinâmica entre categorias e produtos
- Breadcrumbs e navegação hierárquica

### Estrutura de Rotas
- `/` → Redireciona automaticamente para `/pt-BR`
- `/pt-BR` → Site em português brasileiro
- `/en` → Site em inglês
- `/es` → Site em espanhol
- `/[locale]/solucoes/[category]` → Páginas de categoria por idioma
- `/[locale]/solucoes/[category]/[product]` → Páginas de produto por idioma
- `/api/contact` → Endpoint para formulários de contato (salva em JSON e envia email via SMTP)
- `/api/contact-page` → Endpoint para página de contato (salva em JSON e envia email via SMTP)

---

Para garantir funcionamento perfeito em produção (Vercel) independente de problemas de API, foram implementados mapeamentos hardcoded para:

1. **Heroes (Imagens de Fundo)** - `PRODUCT_HERO_IMAGES`
   - Mapeamento de todas as imagens hero por produto
   - Fallback para API/JSON em caso de erro
   - Funcionamento garantido em localhost e produção

2. **Carrossel (Galeria de Imagens)** - `PRODUCT_GALLERY_IMAGES`
   - Mapeamento de todas as imagens de galeria por produto
   - Suporte a múltiplas imagens por produto
   - Fallback para API/JSON em caso de erro

3. **Benefits (Benefícios dos Produtos)** - `PRODUCT_BENEFITS`
   - Mapeamento de todos os benefícios por produto
   - Benefícios específicos e relevantes para cada solução
   - Fallback para API/JSON em caso de erro

**Vantagens da Implementação:**
- ✅ **100% funcional em produção** (Vercel)
- ✅ **100% funcional em desenvolvimento** (localhost)
- ✅ **Sem dependência de API** para elementos críticos
- ✅ **Fallback inteligente** para casos de erro
- ✅ **Performance otimizada** sem chamadas desnecessárias
- ✅ **Manutenibilidade** com estrutura clara e organizada

**Status**: Todos os três sistemas funcionando perfeitamente com mapeamento hardcoded e fallbacks seguros.

### **Melhorias de Compatibilidade Android Implementadas (Janeiro 2025)**
**✅ SISTEMA COMPLETO DE COMPATIBILIDADE IMPLEMENTADO**

Para resolver problemas de funcionamento em dispositivos Android, foram implementadas as seguintes otimizações:

1. **CSS Transitions Centralizadas**
   - ✅ **Transições globais** em `globals.css` com exceções específicas para elementos com animações
   - ✅ **Remoção de transições individuais** de todos os arquivos `.module.css`
   - ✅ **Performance otimizada** para dispositivos com recursos limitados
   - ✅ **Controle centralizado** de todas as animações CSS

2. **Fallbacks para Propriedades CSS Modernas**
   - ✅ **`backdrop-filter`**: Fallback com `background-color` para navegadores antigos
   - ✅ **`filter`**: Fallback com `transform: scale()` para efeitos de blur
   - ✅ **`-webkit-appearance`**: Fallback para estilização de formulários
   - ✅ **Suporte universal** para todos os navegadores e dispositivos

3. **Sistema de Imagens Hero Hardcoded**
   - ✅ **Mapeamento direto** de imagens hero por produto/categoria
   - ✅ **Carregamento imediato** sem delay de API
   - ✅ **Zero layout shifts** durante navegação
   - ✅ **Performance crítica** para tráfego pago

**Resultados das Otimizações:**
- ✅ **Compatibilidade Android**: 100% implementada
- ✅ **Performance**: Otimizada para dispositivos com recursos limitados
- ✅ **Transições**: Suaves e controladas centralmente
- ✅ **Fallbacks**: Garantem funcionamento em todos os navegadores
- ✅ **Imagens Hero**: Carregamento imediato e consistente

---

### **Arquivos Incluídos no Deploy:**
- ✅ **Código fonte completo** (`src/`)
- ✅ **Configurações** (package.json, next.config.ts, tsconfig.json, etc.)
- ✅ **Assets estáticos** (`public/` - imagens, ícones, etc.)
- ✅ **Dados e traduções** (JSON files para produtos e localização)
- ✅ **Middleware e APIs** (roteamento e endpoints, incluindo Resend)
- ✅ **Arquivos de configuração** (ESLint, PostCSS, etc.)

### **Arquivos Excluídos (Serão Gerados no Servidor):**
- ❌ `node_modules/` (instalado via `npm install`)
- ❌ `.next/` (gerado via `npm run build`)
- ❌ Logs e arquivos temporários
- ❌ `.env.local` (configure variáveis no servidor)

**Status**: ✅ **PRONTO PARA HOSPEDAGEM** - Arquivo .zip criado com sucesso e projeto limpo para deploy. Integração com Resend incluída.

---

*Desenvolvido por Stubborn - www.stubborn.com.br*