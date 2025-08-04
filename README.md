<<<<<<< HEAD
# ISOART-WEBSITE-2025

Site institucional e catálogo de produtos Isoart, desenvolvido com Next.js, React, TypeScript e CSS Modules.
Este projeto utiliza rotas dinâmicas, animações modernas e arquitetura escalável para facilitar manutenção e evolução.

---

## 🚀 Stack e Tecnologias

- **Next.js 15+** (App Router)
- **React 19** (componentes funcionais)
- **TypeScript** (tipagem estrita)
- **CSS Modules** + **Tokens customizados** (em `globals.css`)
- **TailwindCSS** (utilitários e reset)
- **GSAP** e **Lenis** (animações e scroll suave)
- **MySQL** (integração planejada para formulários)

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
└── README.md
```

---

## 🎨 Estilização e Compatibilidade

### Padrões CSS Obrigatórios
Para máxima compatibilidade com sistemas corporativos/Linux:

- **CSS Custom Properties**: SEMPRE kebab-case (`--color-primary`, nunca `--colorPrimary`)
- **Classes CSS**: SEMPRE kebab-case (`.blue-text`, nunca `.blueText`)
- **Fallbacks obrigatórios** para cores:
  ```css
  .blue-text {
    color: rgba(0, 123, 255, 0.65); /* fallback */
    color: rgba(var(--color-primary), 0.65);
  }
  ```
- **JSX**: usar notação de colchetes: `className={styles['blue-text']}`

### Design System
- **Tokens de cor e tipografia** definidos em `globals.css`
- **CSS Modules** para escopo local e evitar conflitos
- **TailwindCSS** para utilitários e reset
- **Componentes de UI** (Button, FormField, etc) com variantes
- **Animações** com GSAP e Lenis

---

## 🧩 Padrões de Componentes

- **Componentes funcionais** com hooks (`useState`, `useEffect`, `useRef`)
- **Tipagem explícita** de props, estados e dados (interfaces)
- **Imports absolutos** via `@/` (configurado no `tsconfig.json`)
- **Separação clara** entre dados (JSON), lógica e apresentação
- **Responsividade** e **acessibilidade** consideradas

---

## 🔗 Integrações e Roteamento

- **Dados** de navegação, categorias e produtos em arquivos JSON (`/data`)
- **Rotas dinâmicas**: `/categorias/[category]` e `/categorias/[category]/[product]`
- **Formulário de contato** planejado para integração com MySQL

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

## 🤝 Contribuição e Manutenção

- **CRÍTICO**: Sempre use kebab-case em CSS (nunca camelCase)
- Siga os padrões de componentes e tipagem do projeto
- Use sempre CSS Modules e inclua fallbacks para cores
- Documente componentes complexos em arquivos `.md`
- Teste responsividade e compatibilidade

---

## 📈 Próximos passos

- Usar fotos de melhor qualidade
- Adicionar SEO dinâmico (meta tags)
- Otimizar imagens e carregamento
- Implementar filtros e busca
- Integrar com CMS
- Adicionar Analytics e ferramentas de trackeamento

---

Este projeto segue padrões modernos de frontend com foco especial em compatibilidade com sistemas corporativos e Linux.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> a3db27b194ba92dff54e12379a610ac6bef5492b
