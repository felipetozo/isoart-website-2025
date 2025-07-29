# ISOART-WEBSITE-2025

Site institucional e catálogo de produtos Isoart, desenvolvido com Next.js, React, TypeScript e CSS Modules. O projeto utiliza rotas dinâmicas, animações modernas e arquitetura escalável para facilitar manutenção e evolução.

---

## 🚀 Stack e Tecnologias

- **Next.js 15+** (App Router)
- **React 19** (componentes funcionais)
- **TypeScript** (tipagem estrita)
- **CSS Modules** + **Tokens customizados** (em `globals.css`)
- **TailwindCSS** (utilitários e reset)
- **GSAP** e **Lenis** (animações e scroll suave)
- **MySQL** (integração planejada para formulários)
- **Supabase** (migração futura)

---

## 🗂️ Estrutura do Projeto

```
isoart-website-2025/
├── src/
│   ├── app/
│   │   ├── categorias/           # Rotas dinâmicas de categorias/produtos
│   │   ├── components/           # Componentes reutilizáveis (UI/UX)
│   │   ├── data/                 # Dados em JSON (menu, produtos, categorias)
│   │   ├── views/UI/             # Componentes de UI genéricos (Button, FormField)
│   │   ├── globals.css           # Tokens de cor, tipografia, reset
│   │   ├── layout.tsx            # Layout raiz (MainNav, Footer)
│   │   └── page.tsx              # Página inicial
│   └── lib/                      # Utilitários e integrações futuras
├── public/                       # Imagens, ícones, assets
├── package.json                  # Dependências e scripts
├── tsconfig.json                 # Configuração TypeScript (imports absolutos)
└── README.md
```

---

## 🧩 Padrões de Componentes e Código

- **Componentes funcionais** com hooks (`useState`, `useEffect`, `useRef`)
- **Tipagem explícita** de props, estados e dados (interfaces)
- **Sem contextos globais** ou reducers (state local por componente)
- **Imports absolutos** via `@/` (configurado no `tsconfig.json`)
- **Separação clara** entre dados (JSON), lógica e apresentação
- **Documentação** de componentes complexos (ex: `MainForm.md`)
- **Estilização local** via CSS Modules, tokens globais em `globals.css`
- **Responsividade** e **acessibilidade** consideradas nos estilos

---

## 🎨 Estilização e Design System

- **Tokens de cor e tipografia** definidos em `globals.css` (ex: `--color-isoartBlue`)
- **CSS Modules** para escopo local e evitar conflitos
- **TailwindCSS** para utilitários e reset
- **Componentes de UI** (Button, FormField, etc) com variantes e tamanhos
- **Animações** com GSAP e Lenis para experiência moderna

---

## 🔗 Integrações e Dados

- **Dados de navegação, categorias e produtos** em arquivos JSON (`/data`)
- **Formulário de contato** planejado para integração com MySQL (ver `MainForm.md`)
- **Migração futura** para Supabase
- **Imagens e ícones** organizados em `/public`

---

## 🏗️ Guia de Roteamento e Estrutura de Páginas

O projeto utiliza o roteamento baseado em arquivos do Next.js (App Router), com rotas dinâmicas para categorias e produtos. Veja exemplos:

- `/` — Página inicial
- `/categorias/[category]` — Página de categoria dinâmica
- `/categorias/[category]/[product]` — Página de produto dinâmica

Layouts e componentes globais (MainNav, Footer) são definidos em `layout.tsx`.

---

## 🛠️ Como rodar localmente

```bash
# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

---

## 📦 Scripts úteis

- `npm run dev` — Inicia o servidor Next.js
- `npm run build` — Gera o build de produção
- `npm run start` — Inicia o servidor em produção
- `npm run lint` — Checa padrões de código

---

## 🤝 Contribuição e Manutenção

- Siga os padrões de componentes e tipagem do projeto
- Use sempre CSS Modules e tokens globais para novas estilizações
- Documente componentes complexos em arquivos `.md` na pasta do componente
- Mantenha dados de produtos/categorias em JSON para fácil atualização
- Teste responsividade e acessibilidade ao criar novos componentes
- Para integração com banco, siga o guia em `MainForm.md`

---

## 📈 Próximos passos sugeridos

- Adicionar SEO dinâmico (meta tags)
- Otimizar imagens e carregamento
- Implementar filtros e busca por categoria/produto
- Integrar com CMS para gestão de conteúdo
- Adicionar Google Analytics ou similar

---

## 📞 Suporte

- Verifique se seguiu todos os passos do guia
- Confirme a estrutura de arquivos
- Use ferramentas de debug do navegador
- Consulte a documentação dos componentes

---

## 📚 Referências e agradecimentos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [GSAP](https://greensock.com/gsap/)
- [Lenis](https://github.com/studio-freight/lenis)
- [TailwindCSS](https://tailwindcss.com/)

---

Este projeto segue padrões modernos de frontend para garantir escalabilidade, performance e facilidade de manutenção. Qualquer dúvida, abra uma issue ou entre em contato!