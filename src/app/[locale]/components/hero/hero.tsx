// hero.tsx - Componente de slider hero com autoplay, drag e acessibilidade

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './hero.module.css';
import Link from 'next/link';
import Button from '@/app/[locale]/views/ui/button/button';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

function Hero() {
    const { locale } = useParams();
    const t = useTranslations('home.slider');
    const tCommon = useTranslations('common.buttons');

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [slideProgress, setSlideProgress] = useState(0);

    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

    // ✅ Correção de tipos (funciona em Node e Browser)
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setTimeout> | number | null>(null);

    const SLIDE_DURATION = 5000; // 5 segundos por slide

    // Dados do slider usando traduções
    const sliderData = [
        {
            id: 1,
            title: t('slide1.title'),
            description: t('slide1.description'),
            buttonText: t('slide1.buttonText'),
            buttonLink: "/solucoes/molduras-decorativas",
            backgroundImage: "/img/heroes/home/home-hero-01.avif"
        },
        {
            id: 2,
            title: t('slide2.title'),
            description: t('slide2.description'),
            buttonText: t('slide2.buttonText'),
            buttonLink: "/solucoes/construcao-civil",
            backgroundImage: "/img/heroes/home/home-hero-03.avif"
        },
        {
            id: 3,
            title: t('slide3.title'),
            description: t('slide3.description'),
            buttonText: t('slide3.buttonText'),
            buttonLink: "/solucoes/telhas-e-paineis",
            backgroundImage: "/img/heroes/home/home-hero-02.avif"
        }
    ];

    const handleDotClick = useCallback((index: number) => {
        setCurrentSlide(index);
        setSlideProgress(0);
        setIsAutoPlaying(false);
        if (progressRef.current) {
            cancelAnimationFrame(progressRef.current as number);
        }
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : sliderData.length - 1));
        setSlideProgress(0);
        setIsAutoPlaying(false);
        if (progressRef.current) {
            cancelAnimationFrame(progressRef.current as number);
        }
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, []);

    const handleNext = useCallback(() => {
        setCurrentSlide((prev) => (prev < sliderData.length - 1 ? prev + 1 : 0));
        setSlideProgress(0);
        setIsAutoPlaying(false);
        if (progressRef.current) {
            cancelAnimationFrame(progressRef.current as number);
        }
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, []);

    // Progress animation based on slide viewing time
    useEffect(() => {
        if (isAutoPlaying) {
            setSlideProgress(0);
            
            if (typeof requestAnimationFrame === 'undefined') {
                let startTime = Date.now();
                let timeoutId: ReturnType<typeof setTimeout>;

                const animateProgress = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
                    setSlideProgress(progress);
                    if (progress < 100) {
                        timeoutId = setTimeout(animateProgress, 16);
                    }
                };
                
                timeoutId = setTimeout(animateProgress, 16);
                progressRef.current = timeoutId;
            } else {
                let startTime = Date.now();
                let animationId: number;
                
                const animateProgress = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
                    setSlideProgress(progress);
                    if (progress < 100) {
                        animationId = requestAnimationFrame(animateProgress);
                    }
                };
                
                animationId = requestAnimationFrame(animateProgress);
                progressRef.current = animationId;
            }
        } else {
            if (progressRef.current) {
                if (typeof requestAnimationFrame !== 'undefined' && typeof progressRef.current === 'number') {
                    cancelAnimationFrame(progressRef.current);
                } else if (typeof progressRef.current === 'number') {
                    clearTimeout(progressRef.current);
                }
            }
        }

        return () => {
            if (progressRef.current) {
                if (typeof requestAnimationFrame !== 'undefined' && typeof progressRef.current === 'number') {
                    cancelAnimationFrame(progressRef.current);
                } else if (typeof progressRef.current === 'number') {
                    clearTimeout(progressRef.current);
                }
            }
        };
    }, [currentSlide, isAutoPlaying]);

    useEffect(() => {
        if (!isAutoPlaying) {
            setSlideProgress(0);
        }
    }, [isAutoPlaying]);

    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                handleNext();
            }, SLIDE_DURATION);
        } else {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, handleNext]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            } else if (e.key >= '1' && e.key <= '9') {
                const index = parseInt(e.key) - 1;
                if (index < sliderData.length) {
                    handleDotClick(index);
                }
            }
        };

        if (typeof window !== 'undefined' && window.addEventListener) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handlePrev, handleNext, handleDotClick]);

    // Drag
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX);
        setIsAutoPlaying(false);
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
        }
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return;
        const currentX = e.pageX;
        const diff = currentX - startX;
        setDragOffset(diff);
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 20}% + ${diff}px))`;
        }
    }, [isDragging, startX, currentSlide]);

    const handleMouseUp = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
        const threshold = (typeof window !== 'undefined' ? window.innerWidth : 375) * 0.1;
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
            if (dragOffset > threshold) {
                handlePrev();
            } else if (dragOffset < -threshold) {
                handleNext();
            } else {
                sliderRef.current.style.transform = `translateX(-${currentSlide * 20}%)`;
            }
            setDragOffset(0);
        }
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, [isDragging, dragOffset, handlePrev, handleNext, currentSlide]);

    // Touch
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX);
        setIsAutoPlaying(false);
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
        }
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.touches[0].pageX;
        const diff = currentX - startX;
        setDragOffset(diff);
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 20}% + ${diff}px))`;
        }
    }, [isDragging, startX, currentSlide]);

    const handleTouchEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
        const threshold = (typeof window !== 'undefined' ? window.innerWidth : 375) * 0.1;
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
            if (dragOffset > threshold) {
                handlePrev();
            } else if (dragOffset < -threshold) {
                handleNext();
            } else {
                sliderRef.current.style.transform = `translateX(-${currentSlide * 20}%)`;
            }
            setDragOffset(0);
        }
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, [isDragging, dragOffset, handlePrev, handleNext, currentSlide]);

    // CSS animation
    useEffect(() => {
        containerRefs.current.forEach((container) => {
            if (container) {
                container.classList.remove(styles['slide-active']);
            }
        });

        const currentContainer = containerRefs.current[currentSlide];
        if (currentContainer) {
            currentContainer.offsetHeight;
            currentContainer.classList.add(styles['slide-active']);
        }
    }, [currentSlide]);

    return (
        <>
            <section 
                className={styles['hero-section']} 
                id="Hero"
                role="region"
                aria-label="Hero slider"
                aria-live="polite"
            >
                <div
                    ref={sliderRef}
                    className={styles['slider-wrapper']}
                    style={{ transform: `translateX(-${currentSlide * 20}%)` }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    role="presentation"
                >
                    {sliderData.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={styles['slide']}
                            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                            role="group"
                            aria-label={`Slide ${index + 1} of ${sliderData.length}`}
                            aria-hidden={index !== currentSlide}
                        >
                            {index === 0 && (
                                <link 
                                    rel="preload" 
                                    as="image" 
                                    href={slide.backgroundImage}
                                    fetchPriority="high"
                                />
                            )}
                            <div className={styles['hero-wrapper']}>
                                <div
                                    ref={(el) => {
                                        containerRefs.current[index] = el;
                                    }}
                                    className={styles['hero-container']}>
                                        <h1 className={styles['split']}>{slide.title}</h1>
                                        {slide.description && (
                                            <p className={styles['split']}>{slide.description}</p>
                                        )}
                                        {index === currentSlide && (
                                            <Link href={`/${locale}${slide.buttonLink}`}>
                                                <Button variant="white" size="medium">
                                                    {slide.buttonText}
                                                </Button>
                                            </Link>
                                        )}
                                </div>
                                <div className={styles['hero-container']}></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div 
                    className={styles['navigation']}
                    role="navigation"
                    aria-label="Slider navigation"
                >
                    <button
                        className={styles['nav-button']}
                        onClick={handlePrev}
                        aria-label="Previous slide"
                        type="button"
                    >
                        <TbChevronLeft className={styles['nav-chevron']} />
                    </button>
                    {sliderData.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles['nav-dot']} ${index === currentSlide ? styles['active'] : ''}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentSlide ? 'true' : 'false'}
                            type="button"
                            style={{
                                '--slide-progress': index === currentSlide ? `${slideProgress}%` : '0%'
                            } as React.CSSProperties}
                        />
                    ))}
                    <button
                        className={styles['nav-button']}
                        onClick={handleNext}
                        aria-label="Next slide"
                        type="button"
                    >
                        <TbChevronRight className={styles['nav-chevron']} />
                    </button>
                </div>
            </section>

            <div className={styles['hero-spacer']}></div>
        </>
    );
}

export default Hero;
