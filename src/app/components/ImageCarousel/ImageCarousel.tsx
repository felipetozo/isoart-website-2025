'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TbChevronLeft, TbChevronRight, TbMaximize } from 'react-icons/tb';
import styles from './ImageCarousel.module.css';
import FullscreenImage from '../FullscreenImage/FullscreenImage';

interface ImageCarouselProps {
    images: string[];
    alt: string;
    width?: number;
    height?: number;
}

export default function ImageCarousel({ images, alt, width = 1600, height = 800 }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <>
            <div className={styles.carouselContainer}>
                <div className={styles.imageContainer}>
                    <Image 
                        src={images[currentIndex]} 
                        alt={`${alt} - Imagem ${currentIndex + 1}`}
                        width={width}
                        height={height}
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            objectFit: 'cover'
                        }}
                    />
                    
                    <button 
                        className={styles.fullscreenButton}
                        onClick={() => setIsFullscreenOpen(true)}
                        aria-label="Ver em tela cheia"
                    >
                        <TbMaximize size={24} />
                    </button>
                    
                    {images.length > 1 && (
                        <>
                            <button 
                                className={`${styles.carouselButton} ${styles.prevButton}`}
                                onClick={prevImage}
                                aria-label="Imagem anterior"
                            >
                                <TbChevronLeft size={32} />
                            </button>
                            
                            <button 
                                className={`${styles.carouselButton} ${styles.nextButton}`}
                                onClick={nextImage}
                                aria-label="Próxima imagem"
                            >
                                <TbChevronRight size={32} />
                            </button>
                            
                            <div className={styles.indicators}>
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                                        onClick={() => setCurrentIndex(index)}
                                        aria-label={`Ir para imagem ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
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