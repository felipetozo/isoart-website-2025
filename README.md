# 🌟 ISOART Website 2025

Website institucional moderno da ISOART - Indústria de Produtos Térmicos e Construtivos LTDA, desenvolvido com Next.js 14, TypeScript e design responsivo.

## 🚀 Status do Projeto

### ✅ **Implementado e Funcionando**
- **Estrutura base** Next.js 14 com App Router
- **Design responsivo** com CSS Modules
- **Sistema de navegação** principal e institucional
- **Páginas principais**: Home, Empresa, Soluções, Contato
- **Página de Política de Privacidade** com conteúdo completo
- **Sistema de cookies personalizado** com banner LGPD compliant
- **Transições globais** CSS (0.4s ease) com exceções para animações
- **Layout responsivo** com componentes organizados
- **Integração com Lenis** para scroll suave
- **Estrutura de pastas** organizada e profissional
- **Sistema de internacionalização (i18n)** com suporte a 3 idiomas (pt-BR, en, es)

### 🔄 **Em Desenvolvimento**
- **Refatoração de CSS** para kebab-case (em andamento)
- **Otimizações de performance** e SEO
- **Testes e validações** de funcionalidades

### 📋 **Pendente**
- **Implementação de analytics** (Google Analytics, Meta Pixel)
- **Sistema de formulários** avançado
- **Blog/Notícias** (se necessário)
- **Deploy em produção**
- **Implementação completa das rotas multilíngue** (estrutura base já criada)

## 🏗️ Arquitetura do Projeto

### **Estrutura de Pastas**
```
src/
├── app/                          # App Router Next.js
│   ├── components/               # Componentes reutilizáveis
│   │   ├── main-nav/            # Navegação principal
│   │   ├── footer/              # Rodapé
│   │   ├── analytics-provider/  # Provedor de analytics
│   │   ├── lenis-provider/      # Provedor de scroll suave
│   │   └── cookie-consent/      # Lógica de gerenciamento de cookies
│   ├── views/                   # Componentes de UI
│   │   └── ui/
│   │       └── cookie-banner/   # Banner de cookies (UI)
│   ├── globals.css              # Estilos globais
│   └── layout.tsx               # Layout principal
├── data/                         # Dados e conteúdo
│   ├── locales/                  # Traduções multilíngue
│   │   ├── pt-BR.json           # Português (padrão)
│   │   ├── en.json              # Inglês
│   │   └── es.json              # Espanhol
│   ├── categories/               # Categorias de produtos
│   ├── products/                 # Produtos individuais
│   └── menu-data.json           # Estrutura do menu
└── lib/                          # Utilitários e configurações
    └── i18n.ts                   # Configuração de internacionalização
```

### **Organização de Responsabilidades**
- **`components/`** - Lógica e funcionalidade
- **`views/ui/`** - Componentes visuais e estilos
- **Separação clara** entre lógica de negócio e apresentação

## 🌍 Sistema de Internacionalização (i18n)

### **Implementação Multilíngue**
- **3 idiomas suportados**: Português (pt-BR), Inglês (en), Espanhol (es)
- **Estrutura organizada** em `/src/app/data/locales/`
- **Fallback automático** para português em caso de erro
- **Traduções centralizadas** em arquivos JSON organizados
- **Sistema escalável** para adicionar novos idiomas facilmente

### **Arquivos de Tradução**
```
src/app/data/locales/
├── pt-BR.json          # Português (padrão)
├── en.json             # Inglês
└── es.json             # Espanhol
```

### **Configuração i18n**
- **Utilitários** em `/src/app/lib/i18n.ts`
- **Validação** de idiomas suportados
- **Detecção automática** do idioma do navegador
- **Importação dinâmica** das traduções

## 🍪 Sistema de Cookies

### **Implementação Personalizada**
- **Banner customizado** com tema ISOART
- **Gerenciador de consentimento** robusto e escalável
- **LGPD compliant** desde o primeiro dia
- **Preferências granulares** por categoria:
  - Cookies Essenciais (sempre ativos)
  - Cookies de Analytics
  - Cookies de Marketing
  - Cookies de Preferências

### **Arquitetura de Cookies**
```typescript
// Gerenciador singleton para cookies
export class CookieConsentManager {
  - hasConsent(): boolean
  - getPreferences(): CookiePreferences
  - saveConsent(preferences: CookiePreferences): void
  - applyPreferences(preferences: CookiePreferences): void
  - clearConsent(): void
  - getConsentStats(): ConsentStats
}
```

### **Vantagens da Implementação**
- ✅ **100% personalizado** com tema ISOART
- ✅ **Performance otimizada** (sem scripts externos)
- ✅ **Fácil manutenção** e escalabilidade
- ✅ **Controle total** sobre funcionalidades
- ✅ **Sem problemas de hidratação** Next.js

## 🎨 Sistema de Estilos

### **CSS Modules com Kebab-Case**
- **Convenção de nomenclatura**: `.component-elemento`
- **Exemplo**: `.cookies-banner`, `.cookies-banner-content`
- **Transições globais**: `transition: all 0.4s ease`
- **Exceções para animações**: GSAP, CSS animations, etc.

### **Paleta de Cores ISOART**
- **Azul principal**: `rgba(0, 32, 96, 1)` (ISOART Blue)
- **Dourado**: `rgba(255, 215, 0, 1)` (ISOART Gold)
- **Sem variáveis CSS** - valores RGBA diretos para compatibilidade

## 🔧 Tecnologias Utilizadas

### **Frontend**
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilos modulares e scoped
- **React 18** - Hooks e funcionalidades modernas

### **Internacionalização (i18n)**
- **Sistema nativo Next.js 15** - Suporte a rotas multilíngue
- **Arquivos JSON** - Traduções organizadas por idioma
- **Fallback automático** - Português como idioma padrão
- **3 idiomas suportados**: pt-BR, en, es

### **Ferramentas de Desenvolvimento**
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **Git** - Controle de versão

### **Bibliotecas**
- **Lenis** - Scroll suave e performático
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter, Red Hat Display)

## 📱 Responsividade

### **Breakpoints**
- **Mobile First** - Design mobile-first
- **Tablet** - Adaptações para tablets
- **Desktop** - Layout completo para desktop
- **Flexbox** - Layout flexível e adaptativo

### **Componentes Responsivos**
- **Navegação** - Menu hambúrguer mobile
- **Grids** - Adaptação automática por breakpoint
- **Imagens** - Otimização para diferentes dispositivos

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clonar repositório
git clone [URL_DO_REPO]

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

### **Build e Deploy**
```bash
# Build de produção (sem linting)
npm run build

# Build com validação de tipos
npm run build:check

# Deploy (quando configurado)
npm run deploy
```

### **Scripts Disponíveis**
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm start` - Executar build de produção
- `npm run lint` - Verificar código com ESLint

## 📊 Analytics e Tracking

### **Status Atual**
- **Não implementado** - Google Analytics, Meta Pixel ou outros serviços
- **Preparado para implementação** - Sistema de cookies já configurado
- **Estrutura pronta** para integração de analytics

### **Próximos Passos para Analytics**
1. **Implementar Google Analytics 4** (GA4)
2. **Configurar Meta Pixel** para Facebook/Instagram
3. **Integrar com sistema de cookies** existente
4. **Configurar eventos personalizados** para conversões

## 🔒 LGPD e Privacidade

### **Conformidade Implementada**
- **Banner de cookies** obrigatório
- **Consentimento granular** por categoria
- **Armazenamento seguro** no localStorage
- **Versionamento** das preferências
- **Auditoria completa** das escolhas do usuário

### **Política de Privacidade**
- **Página dedicada** com conteúdo completo
- **Informações sobre cookies** detalhadas
- **Direitos do usuário** claramente definidos
- **Contato para dúvidas** disponível

## 🎯 Próximas Implementações

### **Prioridade Alta**
- [ ] **Google Analytics 4** - Implementar tracking básico
- [ ] **Meta Pixel** - Tracking para redes sociais
- [ ] **Finalizar refatoração CSS** - Converter para kebab-case
- [ ] **Otimizações de SEO** - Meta tags, sitemap, etc.

### **Prioridade Média**
- [ ] **Sistema de formulários** - Validação e envio
- [ ] **Blog/Notícias** - Sistema de conteúdo dinâmico
- [ ] **PWA** - Progressive Web App
- [ ] **Testes automatizados** - Jest, Testing Library

### **Prioridade Baixa**
- [ ] **Internacionalização** - Múltiplos idiomas
- [ ] **Dashboard admin** - Gerenciamento de conteúdo
- [ ] **API REST** - Backend para funcionalidades avançadas

## 🤝 Contribuição

### **Padrões de Código**
- **TypeScript** para tipagem
- **CSS Modules** com kebab-case
- **Componentes funcionais** React
- **Hooks personalizados** quando necessário
- **ESLint + Prettier** para formatação

### **Estrutura de Commits**
```
feat: adicionar nova funcionalidade
fix: corrigir bug
refactor: refatorar código
style: alterações de estilo
docs: documentação
test: testes
```

## 📞 Suporte

### **Equipe de Desenvolvimento**
- **Desenvolvedor Principal**: [Nome]
- **Designer**: [Nome]
- **Cliente**: ISOART - Indústria de Produtos Térmicos e Construtivos LTDA

### **Contato**
- **Email**: [email@isoart.com.br]
- **Website**: [www.isoart.com.br]
- **Telefone**: [Telefone]

## 📄 Licença

Este projeto é propriedade da **ISOART - Indústria de Produtos Térmicos e Construtivos LTDA**.

---

**Última atualização**: Janeiro 2025  
**Versão**: 1.0.0  
**Status**: Em desenvolvimento ativo
