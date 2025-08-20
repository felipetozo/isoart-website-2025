# 🌍 MIGRAÇÃO COMPLETA PARA PASTA [LOCALE] - URGENTE

**Data:** Hoje  
**Prazo:** Amanhã o site precisa estar traduzível  
**Objetivo:** Mover TODOS os arquivos traduzíveis para `src/app/[locale]/`

## 🚨 URGÊNCIA
- **Site precisa ser traduzido AMANHÃ**
- **Hoje é o dia para fazer a migração**
- **Não é opcional** - é necessário para tradução

## 📋 CHECKLIST COMPLETO DE MIGRAÇÃO

### 🔄 **ETAPA 1: REORGANIZAÇÃO DE ROTAS E MOVIMENTAÇÃO DE PASTAS**

#### **REORGANIZAÇÃO DE ROTAS (ANTES da movimentação):**
- [x] **Renomear pasta**: `src/app/categorias/` → `src/app/solucoes/`
- [x] **Atualizar estrutura de rotas**:
  - `meusite.com.br/solucoes` → Página principal de soluções (já existe)
  - `meusite.com.br/solucoes/[categoria]` → Páginas de categorias
  - `meusite.com.br/solucoes/[categoria]/[produto]` → Páginas de produtos
- [x] **Atualizar middleware.ts** para redirecionar `/categorias/*` para `/solucoes/*`
- [x] **Atualizar imports** em arquivos que referenciam a pasta `categorias`

#### **Pastas que DEVEM ser movidas para `[locale]/`:**
- [ ] `src/app/components/` → `src/app/[locale]/components/`
- [ ] `src/app/data/` → `src/app/[locale]/data/`
- [ ] `src/app/hooks/` → `src/app/[locale]/hooks/`
- [ ] `src/app/types/` → `src/app/[locale]/types/`
- [ ] `src/app/views/` → `src/app/[locale]/views/`
- [ ] `src/app/solucoes/` → `src/app/[locale]/solucoes/` (com nova estrutura)
- [ ] `src/app/contato/` → `src/app/[locale]/contato/`
- [ ] `src/app/sobre/` → `src/app/[locale]/sobre/`
- [ ] `src/app/sobre-eps-pir/` → `src/app/[locale]/sobre-eps-pir/`
- [ ] `src/app/privacidade/` → `src/app/[locale]/privacidade/`

#### **Arquivos que DEVEM ser movidos:**
- [ ] `src/app/globals.css` → `src/app/[locale]/globals.css`
- [ ] `src/app/favicon.ico` → `src/app/[locale]/favicon.ico`
- [ ] `src/app/i18n.ts` → `src/app/[locale]/i18n.ts`

### 🔧 **ETAPA 2: CORREÇÃO DE IMPORTS**

#### **Arquivos com imports que PRECISAM ser corrigidos:**

##### **Páginas de Soluções (antigas categorias):**
- [ ] `src/app/[locale]/solucoes/[category]/page.tsx`
  - Corrigir: `@/app/data/categories/${category}.json`
  - Para: `../../data/categories/${category}.json`

- [ ] `src/app/[locale]/solucoes/[category]/[product]/page.tsx`
  - Corrigir: `@/app/data/products/${category}/${product}.json`
  - Para: `../../../data/products/${category}/${product}.json`

##### **Páginas Principais:**
- [ ] `src/app/[locale]/sobre/page.tsx`
  - Corrigir imports de componentes
- [ ] `src/app/[locale]/sobre-eps-pir/page.tsx`
  - Corrigir imports de componentes
- [ ] `src/app/[locale]/solucoes/page.tsx`
  - Corrigir imports de componentes
- [ ] `src/app/[locale]/contato/page.tsx`
  - Corrigir imports de componentes
- [ ] `src/app/[locale]/privacidade/page.tsx`
  - Corrigir imports de componentes

##### **Componentes:**
- [ ] `src/app/[locale]/components/lenis-provider.tsx`
  - Corrigir: `./hooks/use-lenis`
  - Para: `../hooks/use-lenis`

- [ ] `src/app/[locale]/views/ui/cookie-banner/cookie-banner.tsx`
  - Corrigir: `../../components/cookie-consent/cookie-consent`
  - Para: `../../../components/cookie-consent/cookie-consent`

### 🌐 **ETAPA 3: SISTEMA DE ROTAS**

#### **Nova estrutura de rotas:**
- [ ] **Página principal**: `/pt-BR/solucoes` (página de soluções)
- [ ] **Categorias**: `/pt-BR/solucoes/[categoria]` (ex: `/pt-BR/solucoes/construcao-civil`)
- [ ] **Produtos**: `/pt-BR/solucoes/[categoria]/[produto]` (ex: `/pt-BR/solucoes/construcao-civil/blocos-em-eps`)
- [ ] **Redirecionamentos**: `/categorias/*` → `/solucoes/*` (via middleware)

#### **Verificações necessárias:**
- [ ] Todas as rotas `/pt-BR/*` funcionam
- [ ] Todas as rotas `/en/*` funcionam
- [ ] Todas as rotas `/es/*` funcionam
- [ ] Redirecionamentos funcionam corretamente
- [ ] Middleware funciona para todas as rotas
- [ ] **NOVO**: Rotas `/solucoes/*` funcionam corretamente
- [ ] **NOVO**: Redirecionamento `/categorias/*` → `/solucoes/*` funciona

### 📊 **ETAPA 4: DADOS E CONFIGURAÇÕES**

#### **Arquivos de dados movidos:**
- [ ] `categories/` - Todas as categorias
- [ ] `products/` - Todos os produtos
- [ ] `locales/` - Arquivos de tradução (pt-BR, en, es)
- [ ] `forms/` - Formulários
- [ ] `cities.json` - Cidades
- [ ] `states.json` - Estados
- [ ] `menu-data.json` - Menu principal
- [ ] `main-slider-data.json` - Slider principal

### 🧪 **ETAPA 5: TESTES CRÍTICOS**

#### **Testes obrigatórios após cada etapa:**
- [ ] `npm run build` - Compila sem erros
- [ ] `npm run dev` - Servidor inicia
- [ ] Página inicial carrega
- [ ] Navegação entre páginas funciona
- [ ] Páginas de categorias carregam
- [ ] Páginas de produtos carregam
- [ ] Formulários funcionam
- [ ] APIs respondem

## ⚠️ **RISCO ALTO - PROCEDIMENTOS DE SEGURANÇA**

### **Antes de começar:**
1. **Commit atual** - `git add . && git commit -m "Backup antes da migração"`
2. **Branch de backup** - `git checkout -b backup-migracao`
3. **Voltar para main** - `git checkout main`

### **Durante a migração:**
1. **Testar cada etapa** antes de prosseguir
2. **Fazer commits pequenos** após cada etapa bem-sucedida
3. **Não fazer múltiplas mudanças** sem testar

### **Se algo der errado:**
1. **Reverter para commit anterior** - `git reset --hard HEAD~1`
2. **Ou voltar para branch de backup** - `git checkout backup-migracao`

## 🎯 **ORDEM DE EXECUÇÃO RECOMENDADA**

### **Sequência segura:**
1. **REORGANIZAÇÃO DE ROTAS** (antes de tudo):
   - Renomear `categorias/` → `solucoes/`
   - Atualizar middleware.ts
   - Testar redirecionamentos
2. **Mover pastas pequenas** (hooks, types)
3. **Corrigir imports** dessas pastas
4. **Testar build**
5. **Mover pastas médias** (views, components)
6. **Corrigir imports** dessas pastas
7. **Testar build**
8. **Mover pastas grandes** (data, solucoes)
9. **Corrigir imports** finais
10. **Teste completo**

## 📝 **NOTAS IMPORTANTES**

### **O que NÃO mexer:**
- `src/app/api/` - APIs ficam na raiz
- `src/app/layout.tsx` - Layout raiz (só simplificar)
- `src/app/page.tsx` - Página raiz (já está correto)
- `middleware.ts` - Já está correto
- `next.config.ts` - Já está correto

### **O que SEMPRE testar:**
- **Build** - `npm run build`
- **Dev server** - `npm run dev`
- **Navegação** - Clicar em links
- **Páginas** - Carregar diferentes rotas

## 🚀 **OBJETIVO FINAL**

**Ao final da migração:**
- ✅ **TODOS** os arquivos traduzíveis estarão em `[locale]/`
- ✅ **Sistema de tradução** funcionando perfeitamente
- ✅ **Site traduzível** para pt-BR, en, es
- ✅ **Estrutura limpa** e organizada
- ✅ **Nova estrutura de rotas**: `/pt-BR/solucoes/[categoria]/[produto]`
- ✅ **Redirecionamentos funcionando**: `/categorias/*` → `/solucoes/*`
- ✅ **Pronto para tradução** AMANHÃ

---

## 📊 **PROGRESSO DA MIGRAÇÃO**

### ✅ **ETAPA 1: REORGANIZAÇÃO DE ROTAS - CONCLUÍDA**
- [x] Pasta `categorias/` renomeada para `solucoes/`
- [x] Estrutura de rotas reorganizada
- [x] Middleware.ts atualizado com redirecionamentos
- [x] Links na página de soluções corrigidos
- [x] Build testado e funcionando (35 páginas estáticas)
- [x] Commit realizado: "ETAPA 1 CONCLUÍDA: Reorganização de rotas"

### ✅ **ETAPA 2: MOVIMENTAÇÃO DE PASTAS PEQUENAS - CONCLUÍDA**
- [x] Mover `src/app/hooks/` → `src/app/[locale]/hooks/`
- [x] Mover `src/app/types/` → `src/app/[locale]/types/`
- [x] Mover `src/hooks/use-language.ts` → `src/app/[locale]/hooks/`
- [x] Corrigir imports dessas pastas
- [x] Testar build (35 páginas estáticas geradas com sucesso)

### 🔄 **ETAPA 3: MOVIMENTAÇÃO DE PASTAS MÉDIAS - EM ANDAMENTO**
- [ ] Mover `src/app/views/` → `src/app/[locale]/views/`
- [ ] Mover `src/app/components/` → `src/app/[locale]/components/`
- [ ] Corrigir imports dessas pastas
- [ ] Testar build

### ⏳ **PRÓXIMAS ETAPAS**
- [ ] ETAPA 4: Mover pastas grandes (data, solucoes)
- [ ] ETAPA 5: Correção final de imports
- [ ] ETAPA 6: Teste completo

---

**⚠️ LEMBRE-SE: HOJE É O DIA! AMANHÃ O SITE PRECISA ESTAR TRADUZÍVEL! ⚠️**
