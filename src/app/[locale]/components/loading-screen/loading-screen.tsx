'use client';

import React from 'react';
import styles from './loading-screen.module.css';

interface LoadingScreenProps {
    text?: string;
}

function LoadingScreen({ text = "Carregando..." }: LoadingScreenProps) {
    return (
        <div className={styles['loading-overlay']}>
            <div className={styles['loading-content']}>
                <div className={styles['loading-spinner']}></div>
                <p className={styles['loading-text']}>{text}</p>
            </div>
        </div>
    );
}

export default LoadingScreen;
