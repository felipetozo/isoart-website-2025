export interface Noticia {
  id: string;
  cover: string;
  subtitulo: string;
  titulo: string;
  conteudo: string; // HTML content
  data: string;
  autor: string;
  categoria: string;
  tags: string[];
  destaque: boolean;
}

export interface NoticiasData {
  noticias: Noticia[];
}

// Tipos para filtros e busca
export interface NoticiaFilters {
  categoria?: string;
  tags?: string[];
  destaque?: boolean;
  dataInicio?: string;
  dataFim?: string;
}

// Tipos para paginação
export interface NoticiaPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Tipos para resultados paginados
export interface NoticiasPaginated {
  noticias: Noticia[];
  pagination: NoticiaPagination;
}

// Enum para categorias (opcional)
export enum CategoriaNoticia {
  INSTITUCIONAL = 'Institucional',
  PRODUTOS = 'Produtos',
  TECNOLOGIA = 'Tecnologia',
  SUSTENTABILIDADE = 'Sustentabilidade',
  MERCADO = 'Mercado',
  EVENTOS = 'Eventos'
}

// Enum para tags comuns (opcional)
export enum TagNoticia {
  EPS = 'EPS',
  PIR = 'PIR',
  CONSTRUCAO_CIVIL = 'Construção Civil',
  NOVA_FABRICA = 'Nova Fábrica',
  SUSTENTABILIDADE = 'Sustentabilidade',
  TECNOLOGIA = 'Tecnologia',
  MERCADO = 'Mercado',
  EVENTOS = 'Eventos'
}
