'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TbChevronLeft, TbChevronRight, TbMaximize } from 'react-icons/tb';
import styles from './image-carousel.module.css';
import FullscreenImage from '../fullscreen-image/fullscreen-image';

interface ImageCarouselProps {
    images: string[];
    alt: string;
    width?: number;
    height?: number;
}

function ImageCarousel({ images, alt, width = 1440, height = 800 }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? 0 : prevIndex - 1
        );
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <>
            <div className={styles['carousel-container']}>
                <div className={styles['main-image-container']}>
                    <Image 
                        src={images[currentIndex]} 
                        alt={`${alt} - Imagem ${currentIndex + 1}`}
                        width={width}
                        height={height}
                        className={styles['main-image']}
                    />
                    
                    {/* Container dos controles no topo direito */}
                    <div className={styles['controls-container']}>
                        {/* Contador */}
                        <div className={styles['image-counter']}>
                            {currentIndex + 1} / {images.length}
                        </div>
                        
                        {/* Setas */}
                        <button 
                            className={`${styles['carousel-button']} ${styles['prev-button']} ${images.length === 1 ? styles['carousel-button-disabled'] : ''}`}
                            onClick={prevImage}
                            aria-label="Imagem anterior"
                            disabled={images.length === 1}
                        >
                            <TbChevronLeft size={32} />
                        </button>
                        
                        <button 
                            className={`${styles['carousel-button']} ${styles['next-button']} ${images.length === 1 ? styles['carousel-button-disabled'] : ''}`}
                            onClick={nextImage}
                            aria-label="Próxima imagem"
                            disabled={images.length === 1}
                        >
                            <TbChevronRight size={32} />
                        </button>
                        
                        {/* Fullscreen */}
                        <button 
                            className={styles['fullscreen-button']}
                            onClick={() => setIsFullscreenOpen(true)}
                            aria-label="Ver em tela cheia"
                        >
                            <TbMaximize size={24} />
                        </button>
                    </div>
                </div>
                
                {/* Sempre mostrar miniaturas */}
                <div className={styles['thumbnails-container']}>
                    <div className={styles['thumbnails-grid']}>
                        {images.map((image, index) => {
                            return (
                                <button
                                    key={index}
                                    className={`${styles['thumbnail']} ${index === currentIndex ? styles['thumbnail-active'] : ''}`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Ir para imagem ${index + 1}`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${alt} - Miniatura ${index + 1}`}
                                        width={120}
                                        height={80}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <FullscreenImage
                images={images}
                alt={alt}
                width={width}
                height={height}
                initialIndex={currentIndex}
                isOpen={isFullscreenOpen}
                onClose={() => setIsFullscreenOpen(false)}
            />
        </>
    );
}

export default ImageCarousel; 