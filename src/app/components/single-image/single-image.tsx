'use client';
import { useState } from 'react';
import Image from 'next/image';
import { TbMaximize } from 'react-icons/tb';
import styles from './single-image.module.css';
import FullscreenImage from '../fullscreen-image/fullscreen-image';

interface SingleImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export default function SingleImage({ src, alt, width = 1600, height = 800 }: SingleImageProps) {
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    return (
        <>
            <div className={styles['image-container']}>
                <Image 
                    src={src} 
                    alt={alt} 
                    width={width} 
                    height={height}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        objectFit: 'cover'
                    }}
                />
                
                <button 
                    className={styles['fullscreen-button']}
                    onClick={() => setIsFullscreenOpen(true)}
                    aria-label="Ver em tela cheia"
                >
                    <TbMaximize size={24} />
                </button>
            </div>

            <FullscreenImage
                images={[src]}
                alt={alt}
                width={width}
                height={height}
                initialIndex={0}
                isOpen={isFullscreenOpen}
                onClose={() => setIsFullscreenOpen(false)}
            />
        </>
    );
} 