'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import Link from 'next/link';
import Button from '@/app/views/UI/Button';
import sliderData from '@/app/data/mainSliderData.json';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : sliderData.length - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev < sliderData.length - 1 ? prev + 1 : 0));
    };

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Drag functionality
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX);
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const currentX = e.pageX;
        const diff = currentX - startX;
        setDragOffset(diff);
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 20}% + ${diff}px))`;
        }
    };

    const handleMouseUp = () => {
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
    };

    // Touch events for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX);
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentX = e.touches[0].pageX;
        const diff = currentX - startX;
        setDragOffset(diff);
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 20}% + ${diff}px))`;
        }
    };

    const handleTouchEnd = () => {
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
    };

    // CSS Animation control effect
    useEffect(() => {
        // Remove a classe 'slideActive' de todos os containers
        containerRefs.current.forEach((container) => {
            if (container) {
                container.classList.remove(styles.slideActive);
            }
        });

        // Adiciona a classe 'slideActive' apenas ao container atual
        const currentContainer = containerRefs.current[currentSlide];
        if (currentContainer) {
            // Force reflow para resetar animações
            currentContainer.offsetHeight;
            currentContainer.classList.add(styles.slideActive);
        }
    }, [currentSlide]);

    return (
        <>
            <section className={styles.HeroSection} id="Hero">
                <div
                    ref={sliderRef}
                    className={styles.SliderWrapper}
                    style={{ transform: `translateX(-${currentSlide * 20}%)` }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {sliderData.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={styles.Slide}
                            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                        >
                            <div className={styles.HeroWrapper}>
                                <div
                                    ref={(el) => {
                                        containerRefs.current[index] = el;
                                    }}
                                    className={styles.HeroContainer}>
                                    <h1 className={styles.split}>{slide.title}</h1>
                                    <p className={styles.split}>{slide.description}</p>
                                    <Link href={slide.buttonLink}>
                                        <Button variant="white" size="medium">
                                            {slide.buttonText}
                                        </Button>
                                    </Link>
                                </div>
                                <div className={styles.HeroContainer}></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.Navigation}>
                    <TbChevronLeft className={styles.NavChevron} onClick={handlePrev} />
                    {sliderData.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.NavDot} ${index === currentSlide ? styles.active : ''}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                    <TbChevronRight className={styles.NavChevron} onClick={handleNext} />
                </div>
            </section>

            <div className={styles.heroSpacer}></div>
        </>
    );
}

export default Hero;