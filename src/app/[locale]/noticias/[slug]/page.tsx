'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Noticia } from '../../types/noticia';
import { getNoticiaById, loadNoticias, formatDate } from '../../utils/noticias';
import styles from './page.module.css';
import Image from 'next/image';

export default function NoticiaPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNoticia() {
      try {
        setLoading(true);
        const data = await loadNoticias('pt');
        const noticiaEncontrada = getNoticiaById(data.noticias, slug);
        
        if (noticiaEncontrada) {
          setNoticia(noticiaEncontrada);
        } else {
          setError('Notícia não encontrada');
        }
      } catch (err) {
        setError('Erro ao carregar notícia');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchNoticia();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className={styles['noticia-loading']}>
        <div className={styles['loading-spinner']}></div>
        <p>Carregando notícia</p>
      </div>
    );
  }

  if (error || !noticia) {
    return (
      <div className={styles['noticia-error']}>
        <h1>Notícia não encontrada</h1>
        <p>A notícia que você está procurando não existe ou foi removida.</p>
        <a href="/noticias" className={styles['back-link']}>
          ← Voltar para notícias
        </a>
      </div>
    );
  }

  return (
    <article className={styles['noticia-page']}>
        {/* Imagem de capa */}
        {noticia.cover && (
        <div className={styles['noticia-cover']}>
          <Image 
            src={noticia.cover} 
            alt={noticia.titulo}
            className={styles['cover-image']}
          />
        </div>
        )}

      {/* Header da notícia */}
      <header className={styles['noticia-header']}>
        <div className={styles['noticia-meta']}>
          <span className={styles['noticia-categoria']}>{noticia.categoria}</span>
          <time className={styles['noticia-data']} dateTime={noticia.data}>
            {formatDate(noticia.data)}
          </time>
        </div>
        <p className={styles['noticia-subtitulo']}>{noticia.subtitulo}</p>
        <h1 className={styles['noticia-titulo']}>{noticia.titulo}</h1>
      </header>

      {/* Conteúdo da notícia */}
      <div className={styles['noticia-content']}>
        <div 
          className={styles['noticia-body']}
          dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
        />
      </div>

      {/* Tags */}
      {noticia.tags && noticia.tags.length > 0 && (
        <div className={styles['noticia-tags']}>
          <h3>Tags:</h3>
          <div className={styles['tags-list']}>
            {noticia.tags.map((tag, index) => (
              <span key={index} className={styles['tag']}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
