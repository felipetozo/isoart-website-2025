'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TbChevronLeft, TbChevronRight, TbX, TbMaximize } from 'react-icons/tb';
import styles from './fullscreen-image.module.css';

interface FullscreenImageProps {
    images: string[];
    alt: string;
    width?: number;
    height?: number;
    initialIndex?: number;
    onClose: () => void;
    isOpen: boolean;
}

function FullscreenImage({ 
    images, 
    alt, 
    width = 1600, 
    height = 800, 
    initialIndex = 0,
    onClose,
    isOpen 
}: FullscreenImageProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;
        
        switch (e.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles['fullscreen-overlay']} onClick={onClose}>
            <div className={styles['fullscreen-content']} onClick={(e) => e.stopPropagation()}>
                <button className={styles['close-button']} onClick={onClose}>
                    <TbX size={32} />
                </button>

                <div className={styles['image-container']}>
                    <Image
                        src={images[currentIndex]}
                        alt={`${alt} - Imagem ${currentIndex + 1}`}
                        width={width}
                        height={height}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            className={`${styles['nav-button']} ${styles['prev-button']}`}
                            onClick={prevImage}
                            aria-label="Imagem anterior"
                        >
                            <TbChevronLeft size={32} />
                        </button>

                        <button
                            className={`${styles['nav-button']} ${styles['next-button']}`}
                            onClick={nextImage}
                            aria-label="Próxima imagem"
                        >
                            <TbChevronRight size={32} />
                        </button>

                        <div className={styles['indicators']}>
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles['indicator']} ${index === currentIndex ? styles['active'] : ''}`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Ir para imagem ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FullscreenImage;