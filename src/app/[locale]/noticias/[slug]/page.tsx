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
      </div>
    );
  }

  return (
    <article className={styles['noticia-page']}>
        
        {/* Imagem de capa */}
        {noticia.cover && (
        <div className={styles['noticia-cover']}>
          <Image
            width={1740}
            height={638}
            src={noticia.cover} 
            alt={noticia.titulo}
            className={styles['cover-image']}
          />
        </div>
        )}
      <div className={styles['noticia-wrapper']}>
        {/* Header da notícia */}
        <header className={styles['noticia-header']}>
          <p className={styles['noticia-destaque']}>{noticia.subtitulo}</p>
          <h1 className={styles['noticia-titulo']}>{noticia.titulo}</h1>
        </header>

        {/* Conteúdo da notícia */}
        <div className={styles['noticia-content']}>
          <div 
            className={styles['noticia-body']}
            dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
          />
        </div>
      </div>
    </article>
  );
}
