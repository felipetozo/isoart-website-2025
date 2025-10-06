import { Noticia, NoticiasData, NoticiaFilters, NoticiasPaginated } from '../types/noticia';

// Carregar dados das notícias
export async function loadNoticias(locale: string = 'pt'): Promise<NoticiasData> {
  try {
    const response = await fetch(`/data/noticias-${locale}.json`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar notícias: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar notícias:', error);
    return { noticias: [] };
  }
}

// Buscar notícia por ID/slug
export function getNoticiaById(noticias: Noticia[], id: string): Noticia | undefined {
  return noticias.find(noticia => noticia.id === id);
}

// Filtrar notícias
export function filterNoticias(noticias: Noticia[], filters: NoticiaFilters): Noticia[] {
  return noticias.filter(noticia => {
    if (filters.categoria && noticia.categoria !== filters.categoria) {
      return false;
    }
    
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => noticia.tags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }
    
    if (filters.destaque !== undefined && noticia.destaque !== filters.destaque) {
      return false;
    }
    
    if (filters.dataInicio && noticia.data < filters.dataInicio) {
      return false;
    }
    
    if (filters.dataFim && noticia.data > filters.dataFim) {
      return false;
    }
    
    return true;
  });
}

// Ordenar notícias
export function sortNoticias(noticias: Noticia[], sortBy: 'data' | 'titulo' = 'data', order: 'asc' | 'desc' = 'desc'): Noticia[] {
  return [...noticias].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'data') {
      comparison = new Date(a.data).getTime() - new Date(b.data).getTime();
    } else if (sortBy === 'titulo') {
      comparison = a.titulo.localeCompare(b.titulo);
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
}

// Paginar notícias
export function paginateNoticias(
  noticias: Noticia[], 
  page: number = 1, 
  limit: number = 10
): NoticiasPaginated {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedNoticias = noticias.slice(startIndex, endIndex);
  const total = noticias.length;
  const totalPages = Math.ceil(total / limit);
  
  return {
    noticias: paginatedNoticias,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };
}

// Buscar notícias por termo
export function searchNoticias(noticias: Noticia[], searchTerm: string): Noticia[] {
  if (!searchTerm.trim()) return noticias;
  
  const term = searchTerm.toLowerCase();
  
  return noticias.filter(noticia => 
    noticia.titulo.toLowerCase().includes(term) ||
    noticia.subtitulo.toLowerCase().includes(term) ||
    noticia.conteudo.toLowerCase().includes(term) ||
    noticia.tags.some(tag => tag.toLowerCase().includes(term)) ||
    noticia.categoria.toLowerCase().includes(term)
  );
}

// Obter notícias em destaque
export function getNoticiasDestaque(noticias: Noticia[]): Noticia[] {
  return noticias.filter(noticia => noticia.destaque);
}

// Obter categorias únicas
export function getCategorias(noticias: Noticia[]): string[] {
  const categorias = noticias.map(noticia => noticia.categoria);
  return [...new Set(categorias)].sort();
}

// Obter tags únicas
export function getTags(noticias: Noticia[]): string[] {
  const allTags = noticias.flatMap(noticia => noticia.tags);
  return [...new Set(allTags)].sort();
}

// Gerar slug a partir do título
export function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

// Formatar data para exibição
export function formatDate(dateString: string, locale: string = 'pt-BR'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
