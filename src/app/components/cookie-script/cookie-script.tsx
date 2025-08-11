'use client';
import { useEffect } from 'react';
import styles from './cookie-script.module.css';

const CookieScript = () => {
    useEffect(() => {
        // Verificar se já existe consentimento
        if (typeof window === 'undefined') return;
        
        const existingConsent = localStorage.getItem('cookie-consent');
        if (existingConsent) return;

        // Função para carregar o script
        const loadCookieScript = () => {
            // Verificar se o script já foi carregado
            if (document.querySelector('script[src*="freeprivacypolicy.com"]')) {
                return;
            }

            const script = document.createElement('script');
            script.src = '//www.freeprivacypolicy.com/public/cookie-consent/4.0.0/cookie-consent.js';
            script.async = true;
            
            script.onload = () => {
                // Aguardar o script carregar completamente
                const checkCookieConsent = () => {
                    if (typeof (window as any).cookieconsent !== 'undefined') {
                        try {
                            (window as any).cookieconsent.run({
                                "notice_banner_type": "simple",
                                "consent_type": "express",
                                "palette": "light",
                                "language": "pt",
                                "page_load_consent_levels": ["strictly-necessary"],
                                "notice_banner_reject_button_hide": false,
                                "preferences_center_close_button_hide": false,
                                "page_refresh_confirmation_buttons": false,
                                "website_name": "Isoart",
                                "website_privacy_policy_url": "/privacidade"
                            });
                        } catch (error) {
                            console.warn('Erro ao inicializar cookie consent:', error);
                        }
                    } else {
                        // Tentar novamente em 100ms
                        setTimeout(checkCookieConsent, 100);
                    }
                };
                
                checkCookieConsent();
            };
            
            script.onerror = () => {
                console.warn('Falha ao carregar o banner de cookies');
            };
            
            document.head.appendChild(script);
        };

        // Carregar o script após um pequeno delay
        const timer = setTimeout(loadCookieScript, 1000);
        
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return null;
};

export default CookieScript;
