# Isoart Website 2025

Website da Isoart, empresa especializada em soluções térmicas com EPS e PIR para construção civil, embalagens e isolamento. Construído com Next.js 15, React 19, TypeScript e otimizações avançadas de performance.

**ATUALIZAÇÃO IMPORTANTE**: Migração completa para sistema de internacionalização next-intl com roteamento i18n nativo.

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
│   ├── app/                              # App Router do Next.js
│   │   ├── [locale]/                     # Rotas com suporte a idiomas
│   │   │   ├── categorias/               # Páginas de categorias e produtos
│   │   │   │   ├── [category]/           # Páginas dinâmicas de categorias
│   │   │   │   └── [category]/[product]/ # Páginas dinâmicas de produtos
│   │   │   ├── components/               # Componentes reutilizáveis
│   │   │   ├── contato/                  # Página de contato
│   │   │   ├── sobre/                    # Páginas institucionais
│   │   │   ├── solucoes/                 # Página de soluções
│   │   │   ├── views/                    # Componentes de UI
│   │   │   ├── globals.css               # Estilos globais
│   │   │   ├── i18n.ts                   # Configuração de internacionalização
│   │   │   └── layout.tsx                # Layout com suporte a idiomas
│   │   ├── components/                   # Componentes globais
│   │   ├── globals.css                   # Estilos globais
│   │   └── layout.tsx                    # Layout raiz
│   ├── data/                             # Dados estáticos e JSON
│   │   ├── categories/                   # Dados específicos de categorias
│   │   ├── locales/                      # Arquivos de tradução
│   │   │   ├── pt-BR.json                # Traduções em português
│   │   │   ├── en.json                   # Traduções em inglês
│   │   │   └── es.json                   # Traduções em espanhol
│   │   ├── menu-data.json                # Estrutura do menu principal
│   │   └── products/                     # Dados de produtos
│   ├── hooks/                            # Hooks customizados
│   │   └── use-language.ts               # Hook para gerenciamento de idiomas
│   ├── lib/                              # Utilitários e helpers
│   └── types/                            # Definições de tipos
├── public/                               # Arquivos estáticos
│   ├── img/                              # Imagens do site
│   ├── icons/                            # Ícones e bandeiras
│   └── downloads/                        # Arquivos para download
├── middleware.ts                         # Middleware de internacionalização
├── next.config.ts                        # Configuração do Next.js
├── postcss.config.mjs                    # Configuração do PostCSS
└── tsconfig.json                         # Configuração do TypeScript
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
- **Sistema de internacionalização** com next-intl
- Estrutura de rotas baseada em pastas com suporte a idiomas
- Navegação dinâmica entre categorias e produtos
- Breadcrumbs e navegação hierárquica

### Estrutura de Rotas
- `/` → Redireciona automaticamente para `/pt-BR`
- `/pt-BR` → Site em português brasileiro
- `/en` → Site em inglês
- `/es` → Site em espanhol
- `/[locale]/categorias/[category]` → Páginas de categoria por idioma
- `/[locale]/categorias/[category]/[product]` → Páginas de produto por idioma

---

## Internacionalização (i18n)

**✅ SISTEMA DE INTERNACIONALIZAÇÃO IMPLEMENTADO COM SUCESSO**

### **Status Atual**
- ✅ **next-intl configurado** e funcionando perfeitamente
- ✅ **Middleware de roteamento** funcionando
- ✅ **Suporte a 3 idiomas**: pt-BR, en, es
- ✅ **Roteamento automático** para idioma padrão (pt-BR)
- ✅ **URLs limpas** com prefixo de idioma sempre visível
- ✅ **Build de produção** funcionando sem erros
- ✅ **Traduções consistentes** entre todos os idiomas
- ✅ **Componentes traduzidos** funcionando perfeitamente
- ✅ **Formulários multilíngue** com placeholders e validações traduzidas
- ✅ **Páginas dinâmicas** com traduções implementadas
- ✅ **Padrão estabelecido** para Client Components com traduções

### **Funcionalidades Implementadas**
1. **Roteamento Automático**
   - URLs com locale: `/pt-BR`, `/en`, `/es`
   - Redirecionamento automático para locale padrão
   - Suporte para páginas estáticas e dinâmicas

2. **Configuração Técnica**
   - Plugin `createNextIntlPlugin` no `next.config.ts`
   - Middleware configurado em `middleware.ts`
   - Arquivo de configuração `src/app/i18n.ts`
   - Hook `useLanguage` atualizado para next-intl

3. **Estrutura de Arquivos**
   - Arquivos de tradução em `src/data/locales/`
   - Layout específico para idiomas em `src/app/[locale]/`
   - Componentes atualizados para suporte multilíngue

### **Arquivos de Tradução**
- `pt-BR.json` - Português brasileiro (idioma padrão) ✅ **Completo**
- `en.json` - Inglês ✅ **Completo**
- `es.json` - Espanhol ✅ **Completo**

### **Componentes e Páginas Traduzidos**
- ✅ **SobreEmpresa**: Tagline e descrição completa traduzidas
- ✅ **Contact**: Formulário 100% traduzido (labels, placeholders, opções, endereços)
- ✅ **MainNav**: Menu e navegação multilíngue
- ✅ **Footer**: Informações de contato e links traduzidos
- ✅ **Soluções**: Página principal com categorias traduzidas
- ✅ **Categorias Dinâmicas**: Páginas de produtos com traduções implementadas
- ✅ **Sobre**: Página institucional 100% traduzida
- ✅ **Sobre EPS/PIR**: Página técnica com traduções completas
- ✅ **Sustentabilidade**: Componente de reciclagem traduzido

### **Como Usar**

#### **Para Páginas com Traduções (Client Components):**
```typescript
'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function MinhaPagina() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('nomeDaSecao');
  
  return <h1>{t('title')}</h1>;
}
```

#### **Padrão Estabelecido:**
- ✅ **`'use client'`** sempre no topo para páginas com traduções
- ✅ **`useTranslations`** para acessar traduções (NUNCA `getTranslations`)
- ✅ **`useParams`** para obter locale e parâmetros dinâmicos
- ✅ **Função normal** (NUNCA `async function`)
- ✅ **Interface de props** para componentes que recebem parâmetros

### **Vantagens da Implementação**
- **Performance otimizada** sem overhead de internacionalização
- **SEO multilíngue** com URLs específicas por idioma
- **Escalabilidade** para futuras expansões
- **Manutenibilidade** com estrutura clara e organizada

### **Correções e Melhorias Implementadas**
- ✅ **Estrutura de benefícios padronizada** em todos os idiomas
- ✅ **Componentes convertidos** de Server para Client Components
- ✅ **Erros de tradução corrigidos** (MISSING_MESSAGE)
- ✅ **Build funcionando** sem erros de runtime
- ✅ **Traduções consistentes** entre pt-BR, en, es
- ✅ **Padrão estabelecido** para evitar conflitos Server/Client Components

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

### Próximos Passos para Internacionalização
**✅ SISTEMA COMPLETO E FUNCIONANDO - MELHORIAS FUTURAS:**

1. ✅ ~~**Implementar traduções reais** nos arquivos JSON~~ **CONCLUÍDO**
2. ✅ ~~**Corrigir inconsistências** entre arquivos de tradução~~ **CONCLUÍDO**
3. ✅ ~~**Traduzir componentes principais** (sobre-empresa, contact)~~ **CONCLUÍDO**
4. ✅ ~~**Traduzir páginas dinâmicas** (soluções, categorias)~~ **CONCLUÍDO**
5. ✅ ~~**Traduzir páginas institucionais** (sobre, sobre-eps-pir)~~ **CONCLUÍDO**
6. ✅ ~~**Traduzir componentes técnicos** (sustentabilidade)~~ **CONCLUÍDO**
7. **Adicionar seletor de idioma** no header/navigation
8. **Configurar meta tags específicas** por idioma
9. **Testar navegação** entre idiomas extensivamente
10. **Implementar fallbacks** para idiomas não suportados
11. **Otimizar SEO multilíngue** com hreflang tags

**Status atual**: Sistema técnico 100% funcional com traduções completas e consistentes. TODOS os componentes e páginas principais traduzidos e funcionando perfeitamente.

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

**✅ PROJETO FUNCIONANDO PERFEITAMENTE COM INTERNACIONALIZAÇÃO COMPLETA**

### **Status Técnico**
- **Commit atual**: `082f691` - feat: implement hardcoded benefits mapping for product pages
- **Status**: Site 100% funcional com suporte multilíngue completo
- **Idiomas suportados**: pt-BR (padrão), en, es
- **Performance**: Otimizada e sem overhead
- **Menu e navegação**: Funcionando perfeitamente
- **Rotas dinâmicas**: Categorias e produtos funcionando por idioma

### **Status das Traduções**
- ✅ **Arquivos de tradução**: Consistentes entre todos os idiomas
- ✅ **Componente SobreEmpresa**: 100% traduzido e funcionando
- ✅ **Componente Contact**: 100% traduzido (formulário, endereços, validações)
- ✅ **Componente Footer**: 100% traduzido e funcionando
- ✅ **Página Soluções**: 100% traduzida com categorias
- ✅ **Páginas de Categorias**: Dinâmicas e traduzidas
- ✅ **Página Sobre**: Institucional 100% traduzida
- ✅ **Página Sobre EPS/PIR**: Técnica 100% traduzida
- ✅ **Componente Sustentabilidade**: 100% traduzido
- ✅ **Chaves de tradução**: Padronizadas e sem conflitos
- ✅ **Placeholders e labels**: Todos traduzidos
- ✅ **Mensagens de erro**: Multilíngues

### **Status das Categorias e Benefícios**
- ✅ **Categoria Telhas e Painéis**: Benefícios completos em todos os idiomas
- ✅ **Categoria Construção Civil**: Benefícios funcionando perfeitamente
- ✅ **Categoria Embalagens**: Benefícios funcionando perfeitamente
- ✅ **Categoria Molduras**: Benefícios funcionando perfeitamente
- ✅ **Ícones dos benefícios**: Corrigidos e funcionando em todos os idiomas
- ✅ **categoryDescription**: Implementado para todas as categorias

### **Correções Implementadas (Janeiro 2025)**
1. **Eliminação de chaves duplicadas** nos arquivos de tradução
2. **Padronização de estruturas** entre idiomas (pt-BR, en, es)
3. **Correção do componente sobre-empresa** com 'use client' e chaves corretas
4. **Tradução completa do formulário de contato** incluindo:
   - Labels de campos
   - Placeholders de inputs
   - Opções de selects
   - Endereços das fábricas
   - Mensagens de validação
   - Toast de sucesso/erro
5. **Tradução completa do Footer** com links e informações institucionais
6. **Implementação de páginas dinâmicas** com sistema de traduções
7. **Tradução de páginas institucionais** (sobre, sobre-eps-pir)
8. **Padrão estabelecido** para Client Components com traduções
9. **Correção de estrutura de benefícios** EPS e PIR em todos os idiomas
10. **Componente Sustentabilidade** traduzido e integrado ao sistema i18n
11. **Correção dos benefícios da categoria Telhas e Painéis**:
    - Adicionada seção de benefícios completa em português
    - Implementado categoryDescription para título da categoria
    - Estrutura alinhada com outras categorias
12. **Correção dos ícones dos benefícios**:
    - Mapeamento correto para todos os idiomas (pt-BR, en, es)
    - Ícones apropriados para cada tipo de benefício
    - Eliminação do ícone "wind" padrão incorreto
13. **Implementação de benefícios hardcoded** para páginas de produtos com mapeamento direto

**Última atualização**: Janeiro 2025 - Sistema de internacionalização 100% completo e funcional com TODAS as traduções implementadas, benefícios corrigidos, ícones funcionando e site funcionando perfeitamente. Padrão estabelecido para Client Components com traduções. **Estado estável e funcional registrado no commit `082f691` como versão de referência.**

---

*Desenvolvido por Stubborn - www.stubborn.com.br*
