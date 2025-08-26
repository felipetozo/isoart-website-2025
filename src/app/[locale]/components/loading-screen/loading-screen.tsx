'use client';

import React from 'react';
import styles from './loading-screen.module.css';

interface LoadingScreenProps {
    text?: string;
}

function LoadingScreen({ text = "Carregando..." }: LoadingScreenProps) {
    return (
        <div className={styles['loading-screen']}>
            {text}
        </div>
    );
}

export default LoadingScreen;
