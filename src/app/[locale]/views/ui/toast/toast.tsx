'use client';
import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import styles from './toast.module.css';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

function Toast({ message, type = 'success', isVisible, onClose, duration = 4000 }: ToastProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    console.log('Toast renderizado com:', { message, type, isVisible, duration });

    useEffect(() => {
        console.log('Toast useEffect - isVisible:', isVisible);
        if (isVisible) {
            console.log('Toast: Iniciando animação');
            setIsAnimating(true);
            
            const timer = setTimeout(() => {
                console.log('Toast: Timer expirado, fechando...');
                setIsAnimating(false);
                setTimeout(onClose, 300); // Aguarda a animação de saída
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    console.log('Toast: Renderizando com isVisible:', isVisible, 'isAnimating:', isAnimating);
    
    if (!isVisible && !isAnimating) {
        console.log('Toast: Não renderizando (não visível e não animando)');
        return null;
    }

    console.log('Toast: Renderizando componente');
    return (
        <div className={`${styles['toast']} ${styles[type]} ${isVisible ? styles.show : styles.hide}`}>
            <div className={styles['toast-content']}>
                <div className={styles['toast-icon']}>
                    {type === 'success' && <MdCheckCircle />}
                </div>
                <span className={styles['toast-message']}>{message}</span>
            </div>
        </div>
    );
}

export default Toast; 