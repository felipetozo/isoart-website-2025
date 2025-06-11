# Guia Completo de Roteamento - ISOART-WEBSITE-2025

Este guia fornece um processo detalhado e passo a passo para configurar o sistema de roteamento no seu projeto Next.js. O sistema utiliza o roteamento baseado em sistema de arquivos do Next.js, rotas dinâmicas e layouts para gerenciar páginas de categorias e produtos de forma eficiente.

## 📋 Pré-requisitos

- Next.js 13+ instalado
- Conhecimento básico de React e TypeScript
- Estrutura básica do projeto configurada

## 🗂️ Estrutura Final do Projeto

```
ISOART-WEBSITE-2025/
├── app/
│   ├── layout.tsx              # Layout raiz com MainNav e Footer [ok]
│   ├── page.tsx                # Página inicial [ok]
│   ├── globals.css             # Estilos globais [ok]
│   ├── categorias/
│   │   ├── layout.tsx          # Layout compartilhado para categorias
│   │   ├── [category]/         # Rota dinâmica para categorias
│   │   │   ├── page.tsx        # Página de categoria dinâmica
│   │   │   └── [product]/      # Rota dinâmica para produtos
│   │   │       └── page.tsx    # Página de produto dinâmica
│   └── data/
│       └── menuData.json       # Dados das categorias e produtos
├── components/                 # Todos os componentes aqui
│   ├── MainNav/
│   │   ├── MainNav.tsx
│   │   └── MainNav.module.css
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   └── Hero.module.css
│   └── ... (outros componentes)
├── public/
│   ├── icons/
│   └── img/
└── package.json
```

---

## 🚀 Passo 1: Configurando o Layout Raiz

O layout raiz garante que o MainNav e Footer apareçam em todas as páginas do site.

### 1.1 Criando o arquivo `app/layout.tsx`

```typescript
import MainNav from '@/components/MainNav/MainNav';
import Footer from '@/components/Footer/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>ISOART - Soluções em Isolamento Térmico</title>
        <meta name="description" content="Líder em soluções de isolamento térmico" />
      </head>
      <body>
        <MainNav />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### 1.2 Verificações importantes:
- ✅ Confirme se os caminhos de importação estão corretos
- ✅ Verifique se os componentes MainNav e Footer existem
- ✅ Teste se o arquivo globals.css está no local correto

---

## 🗂️ Passo 2: Organizando os Componentes

Antes de continuar com as rotas, vamos organizar todos os componentes na pasta `components/`.

### 2.1 Movendo componentes existentes

Se você já tem componentes na pasta `app/`, mova-os para `components/`:

```bash
# Exemplo de estrutura de componentes
mkdir -p components/MainNav
mkdir -p components/Footer  
mkdir -p components/Hero
mkdir -p components/CarrosselClientes
mkdir -p components/MainForm
```

### 2.2 Atualizando importações

Após mover os componentes, atualize todas as importações:

```typescript
// Antes (se estavam em app/)
import Hero from './Hero/Hero'

// Depois (agora em components/)
import Hero from '@/components/Hero/Hero'
```

---

## 📄 Passo 3: Criando a Página Inicial

### 3.1 Criando `app/page.tsx`

```typescript
import Hero from '@/components/Hero/Hero';
import CarrosselClientes from '@/components/CarrosselClientes/CarrosselClientes';
import MainForm from '@/components/MainForm/MainForm';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <CarrosselClientes />
      <MainForm />
      {/* Adicione outros componentes da página inicial aqui */}
    </div>
  );
}
```

---

## 🗃️ Passo 4: Preparando os Dados

### 4.1 Criando `app/data/menuData.json`

```json
[
  {
    "id": 1,
    "title": "Telhas e Painéis",
    "slug": "telhas-paineis",
    "description": "Soluções completas em telhas térmicas e painéis isolantes",
    "image": "/img/categories/telhas-paineis.jpg",
    "products": [
      {
        "id": 1,
        "name": "Telhas Térmicas",
        "slug": "telhas-termicas",
        "description": "Telhas com isolamento térmico superior",
        "image": "/img/products/telhas-termicas.jpg",
        "specifications": {
          "material": "Aço galvanizado + EPS",
          "espessura": "30mm, 50mm, 100mm",
          "cor": "Diversas opções"
        }
      },
      {
        "id": 2,
        "name": "Painéis Sanduíche",
        "slug": "paineis-sanduiche",
        "description": "Painéis isolantes de alta performance",
        "image": "/img/products/paineis-sanduiche.jpg"
      }
    ]
  },
  {
    "id": 2,
    "title": "Mantas Térmicas",
    "slug": "mantas-termicas",
    "description": "Mantas para isolamento térmico residencial e industrial",
    "products": [
      {
        "id": 3,
        "name": "Manta Aluminizada",
        "slug": "manta-aluminizada",
        "description": "Manta com face aluminizada para máxima eficiência"
      }
    ]
  }
]
```

### 4.2 Explicação da estrutura de dados:
- **title**: Nome da categoria
- **slug**: URL amigável da categoria  
- **products**: Array de produtos da categoria
- **products.slug**: URL amigável do produto

---

## 📂 Passo 5: Configurando o Layout de Categorias

### 5.1 Criando `app/categorias/layout.tsx`

```typescript
export default function CategoriasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="categorias-container">
      {/* Breadcrumb ou navegação adicional pode ser adicionada aqui */}
      <div className="categorias-content">
        {children}
      </div>
    </div>
  );
}
```

### 5.2 Adicionando estilos (opcional)

Crie `app/categorias/layout.module.css`:

```css
.categoriasContainer {
  min-height: 100vh;
  padding: 2rem 0;
}

.categoriasContent {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

---

## 🎯 Passo 6: Criando Páginas de Categoria Dinâmicas

### 6.1 Criando `app/categorias/[category]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menuData.json';

// Definindo o tipo de dados
type Category = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  products: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
  }>;
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  
  // Busca a categoria pelos dados
  const categoryData: Category | undefined = menuData.find(
    (item: Category) => item.slug === category
  );

  // Se a categoria não existir, mostra página 404
  if (!categoryData) {
    notFound();
  }

  return (
    <div className="category-page">
      {/* Cabeçalho da categoria */}
      <header className="category-header">
        <h1>{categoryData.title}</h1>
        <p>{categoryData.description}</p>
        {categoryData.image && (
          <Image
            src={categoryData.image}
            alt={categoryData.title}
            width={800}
            height={400}
            className="category-image"
          />
        )}
      </header>

      {/* Lista de produtos */}
      <section className="products-section">
        <h2>Produtos em {categoryData.title}</h2>
        <div className="products-grid">
          {categoryData.products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="product-image"
                />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Link 
                href={`/categorias/${category}/${product.slug}`}
                className="product-link"
              >
                Ver Detalhes →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Função para gerar páginas estáticas (opcional, para melhor performance)
export async function generateStaticParams() {
  return menuData.map((category: Category) => ({
    category: category.slug,
  }));
}
```

### 6.2 Explicação detalhada do código:

1. **Importações**: Importamos as funções necessárias do Next.js
2. **Tipos TypeScript**: Definimos os tipos para melhor desenvolvimento
3. **Busca de dados**: Encontramos a categoria pelos dados JSON
4. **Tratamento de erro**: Usamos `notFound()` para páginas inexistentes
5. **Renderização**: Mostramos o cabeçalho e lista de produtos
6. **Links dinâmicos**: Criamos links para as páginas de produtos
7. **generateStaticParams**: Pré-renderiza as páginas no build (opcional)

---

## 🛍️ Passo 7: Criando Páginas de Produto Dinâmicas

### 7.1 Criando `app/categorias/[category]/[product]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/app/data/menuData.json';

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: string;
  specifications?: {
    [key: string]: string;
  };
};

type Category = {
  id: number;
  title: string;
  slug: string;
  products: Product[];
};

interface ProductPageProps {
  params: {
    category: string;
    product: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { category, product } = params;
  
  // Busca a categoria
  const categoryData: Category | undefined = menuData.find(
    (item: Category) => item.slug === category
  );

  if (!categoryData) {
    notFound();
  }

  // Busca o produto dentro da categoria
  const productData: Product | undefined = categoryData.products.find(
    (item: Product) => item.slug === product
  );

  if (!productData) {
    notFound();
  }

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/">Início</Link>
        <span> / </span>
        <Link href="/categorias">Categorias</Link>
        <span> / </span>
        <Link href={`/categorias/${category}`}>{categoryData.title}</Link>
        <span> / </span>
        <span>{productData.name}</span>
      </nav>

      {/* Conteúdo do produto */}
      <div className="product-content">
        <div className="product-images">
          {productData.image && (
            <Image
              src={productData.image}
              alt={productData.name}
              width={600}
              height={400}
              className="main-product-image"
            />
          )}
        </div>

        <div className="product-info">
          <h1>{productData.name}</h1>
          <p className="product-description">{productData.description}</p>

          {/* Especificações técnicas */}
          {productData.specifications && (
            <div className="specifications">
              <h3>Especificações Técnicas</h3>
              <dl className="specs-list">
                {Object.entries(productData.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <dt>{key}:</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Botão de contato */}
          <div className="product-actions">
            <Link href="/contato" className="contact-button">
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>

      {/* Produtos relacionados */}
      <section className="related-products">
        <h2>Outros produtos em {categoryData.title}</h2>
        <div className="products-grid">
          {categoryData.products
            .filter((p) => p.slug !== product)
            .slice(0, 3)
            .map((relatedProduct) => (
              <div key={relatedProduct.id} className="product-card">
                {relatedProduct.image && (
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    width={200}
                    height={150}
                  />
                )}
                <h4>{relatedProduct.name}</h4>
                <Link href={`/categorias/${category}/${relatedProduct.slug}`}>
                  Ver Produto →
                </Link>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

// Gerar parâmetros estáticos para todos os produtos
export async function generateStaticParams() {
  const params: Array<{ category: string; product: string }> = [];
  
  menuData.forEach((category: Category) => {
    category.products.forEach((product: Product) => {
      params.push({
        category: category.slug,
        product: product.slug,
      });
    });
  });
  
  return params;
}
```

---

## 🎨 Passo 8: Adicionando Estilos (Opcional)

### 8.1 Criando estilos globais para as páginas

Adicione ao seu `app/globals.css`:

```css
/* Estilos para páginas de categoria */
.category-page {
  padding: 2rem 0;
}

.category-header {
  text-align: center;
  margin-bottom: 3rem;
}

.category-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.category-image {
  border-radius: 8px;
  margin-top: 2rem;
}

.products-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
}

/* Estilos para páginas de produto */
.product-page {
  padding: 2rem 0;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #0066cc;
  text-decoration: none;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.specifications {
  margin-top: 2rem;
}

.specs-list {
  display: grid;
  gap: 0.5rem;
}

.spec-item {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.contact-button {
  background: #0066cc;
  color: white;
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 🧪 Passo 9: Testando o Sistema de Roteamento

### 9.1 Iniciando o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

### 9.2 URLs para testar:

1. **Página inicial**: `http://localhost:3000/`
2. **Categoria**: `http://localhost:3000/categorias/telhas-paineis`
3. **Produto**: `http://localhost:3000/categorias/telhas-paineis/telhas-termicas`

### 9.3 Checklist de testes:

- ✅ A página inicial carrega corretamente
- ✅ MainNav e Footer aparecem em todas as páginas
- ✅ Links de categoria funcionam
- ✅ Links de produto funcionam
- ✅ Página 404 aparece para URLs inexistentes
- ✅ Breadcrumb funciona na página de produto
- ✅ Imagens carregam corretamente (se configuradas)

---

## 🔧 Passo 10: Troubleshooting (Resolução de Problemas)

### 10.1 Problemas comuns e soluções:

**Erro: "Module not found"**
- ✅ Verifique os caminhos de importação
- ✅ Confirme se o `tsconfig.json` tem o `baseUrl` configurado
- ✅ Certifique-se de que os arquivos existem

**Página 404 inesperada**
- ✅ Verifique se o slug no JSON corresponde à URL
- ✅ Confirme se não há espaços ou caracteres especiais nos slugs
- ✅ Teste com `console.log()` para debugar

**Componentes não aparecem**
- ✅ Verifique se foram movidos para a pasta `components/`
- ✅ Atualize todas as importações
- ✅ Confirme se a exportação é `export default`

### 10.2 Comandos úteis para debug:

```bash
# Verificar se o build funciona
npm run build

# Analisar o bundle
npm run analyze

# Verificar sintaxe TypeScript
npx tsc --noEmit
```

---

## 🚀 Próximos Passos

Após completar este guia, você pode:

1. **Adicionar SEO**: Implementar meta tags dinâmicas
2. **Melhorar Performance**: Otimizar imagens e carregamento
3. **Adicionar Filtros**: Sistema de busca e filtros por categoria
4. **Implementar CMS**: Conectar com um CMS para gerenciar conteúdo
5. **Analytics**: Adicionar Google Analytics ou similar

---

## 📞 Suporte

Se encontrar problemas durante a implementação:

1. Verifique se seguiu todos os passos na ordem
2. Confirme se a estrutura de arquivos está correta
3. Teste cada passo individualmente
4. Use as ferramentas de debug do navegador

Este guia garante um sistema de roteamento robusto, escalável e fácil de manter para o seu projeto ISOART-WEBSITE-2025!