'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './hero.module.css';
import Link from 'next/link';
import Button from '@/app/views/ui/button/button';
import sliderData from '@/app/data/main-slider-data.json';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [slideProgress, setSlideProgress] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const progressRef = useRef<number | null>(null);

    const SLIDE_DURATION = 5000; // 5 segundos por slide

    const handleDotClick = useCallback((index: number) => {
        setCurrentSlide(index);
        setSlideProgress(0);
        // Pause auto-play temporarily when user interacts
        setIsAutoPlaying(false);
        // Pause progress animation
        if (progressRef.current) {
            cancelAnimationFrame(progressRef.current);
        }
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : sliderData.length - 1));
        setSlideProgress(0);
        setIsAutoPlaying(false);
        // Pause progress animation
        if (progressRef.current) {
            cancelAnimationFrame(progressRef.current);
        }
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, []);

    const handleNext = useCallback(() => {
        setCurrentSlide((prev) => (prev < sliderData.length - 1 ? prev + 1 : 0));
        setSlideProgress(0);
        setIsAutoPlaying(false);
        // Pause progress animation
        if (progressRef.current) {
            cancelAnimationFrame(progressRef.current);
        }
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, []);

    // Progress animation based on slide viewing time
    useEffect(() => {
        if (isAutoPlaying) {
            // Reset progress when slide changes
            setSlideProgress(0);
            
            // Start progress immediately with requestAnimationFrame
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
            
            // Start animation immediately
            animationId = requestAnimationFrame(animateProgress);
            
            // Store the animation ID for cleanup
            progressRef.current = animationId as any;
        } else {
            if (progressRef.current) {
                // Cancel animation frame if it's an animation ID
                if (typeof progressRef.current === 'number') {
                    cancelAnimationFrame(progressRef.current);
                }
            }
        }

        return () => {
            if (progressRef.current) {
                // Cancel animation frame if it's an animation ID
                if (typeof progressRef.current === 'number') {
                    cancelAnimationFrame(progressRef.current);
                }
            }
        };
    }, [currentSlide, isAutoPlaying]);

    // Reset progress when auto-play is paused
    useEffect(() => {
        if (!isAutoPlaying) {
            setSlideProgress(0);
        }
    }, [isAutoPlaying]);

    // Auto-slide functionality with better control
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

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrev, handleNext, handleDotClick]);

    // Drag functionality with improved performance
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
        const threshold = window.innerWidth * 0.1;
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
        // Resume auto-play after a delay
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, [isDragging, dragOffset, handlePrev, handleNext, currentSlide]);

    // Touch events for mobile with improved handling
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
        e.preventDefault(); // Prevent scrolling while dragging
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
        const threshold = window.innerWidth * 0.1;
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
        // Resume auto-play after a delay
        setTimeout(() => setIsAutoPlaying(true), 3000);
    }, [isDragging, dragOffset, handlePrev, handleNext, currentSlide]);

    // CSS Animation control effect
    useEffect(() => {
        // Remove a classe 'slide-active' de todos os containers
        containerRefs.current.forEach((container) => {
            if (container) {
                container.classList.remove(styles['slide-active']);
            }
        });

        // Adiciona a classe 'slide-active' apenas ao container atual
        const currentContainer = containerRefs.current[currentSlide];
        if (currentContainer) {
            // Force reflow para resetar animações
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
                            {/* Preload da primeira imagem para LCP */}
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
                                        <Link href={slide.buttonLink}>
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