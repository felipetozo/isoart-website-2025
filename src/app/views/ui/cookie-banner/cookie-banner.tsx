'use client';
import { useState, useEffect } from 'react';
import { cookieConsentManager, type CookiePreferences } from '../../../components/cookie-consent/cookie-consent';
import styles from './cookie-banner.module.css';

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false
    });

    useEffect(() => {
        if (!cookieConsentManager.hasConsent()) {
            const timer = setTimeout(() => setShowBanner(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
        };
        
        cookieConsentManager.saveConsent(allAccepted);
        setShowBanner(false);
    };

    const handleRejectAll = () => {
        const onlyNecessary: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false
        };
        
        cookieConsentManager.saveConsent(onlyNecessary);
        setShowBanner(false);
    };

    const handleSavePreferences = () => {
        cookieConsentManager.saveConsent(preferences);
        setShowBanner(false);
        setShowPreferences(false);
    };

    const togglePreference = (key: keyof CookiePreferences) => {
        if (key === 'necessary') return;
        
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    if (!showBanner) return null;

    return (
        <>
            {!showPreferences && (
                <div className={styles['cookies-banner']}>
                    <div className={styles['cookies-banner-content']}>
                        <div className={styles['cookies-banner-text']}>
                            <h3>Política de Cookies</h3>
                            <p>
                                Utilizamos cookies para melhorar sua experiência no site. 
                                Alguns são essenciais para o funcionamento, outros nos ajudam 
                                a melhorar o conteúdo e personalizar sua experiência.
                            </p>
                        </div>
                        
                        <div className={styles['cookies-banner-actions']}>
                            <button 
                                onClick={handleRejectAll}
                                className={`${styles['cookies-banner-button']} ${styles['reject-button']}`}
                            >
                                Rejeitar Todos
                            </button>
                            
                            <button 
                                onClick={() => setShowPreferences(true)}
                                className={`${styles['cookies-banner-button']} ${styles['preferences-button']}`}
                            >
                                Personalizar
                            </button>
                            
                            <button 
                                onClick={handleAcceptAll}
                                className={`${styles['cookies-banner-button']} ${styles['accept-button']}`}
                            >
                                Aceitar Todos
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => setShowBanner(false)}
                            className={styles['close-button']}
                            aria-label="Fechar banner"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {showPreferences && (
                <div className={styles['modal-overlay']}>
                    <div className={styles['modal']}>
                        <div className={styles['modal-header']}>
                            <h3>Configurações de Cookies</h3>
                            <button 
                                onClick={() => setShowPreferences(false)}
                                className={styles['modal-close-button']}
                                aria-label="Fechar modal"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className={styles['modal-content']}>
                            <div className={styles['preference-item']}>
                                <div className={styles['preference-info']}>
                                    <h4>Cookies Essenciais</h4>
                                    <p>Sempre ativos. Necessários para o funcionamento básico do site.</p>
                                </div>
                                <div className={`${styles['toggle']} ${styles['toggle-active']}`}>
                                    <div className={styles['toggle-handle']} />
                                </div>
                            </div>
                            
                            <div className={styles['preference-item']}>
                                <div className={styles['preference-info']}>
                                    <h4>Cookies de Analytics</h4>
                                    <p>Nos ajudam a entender como você usa o site para melhorá-lo.</p>
                                </div>
                                <div 
                                    className={`${styles['toggle']} ${preferences.analytics ? styles['toggle-active'] : ''}`}
                                    onClick={() => togglePreference('analytics')}
                                >
                                    <div className={styles['toggle-handle']} />
                                </div>
                            </div>
                            
                            <div className={styles['preference-item']}>
                                <div className={styles['preference-info']}>
                                    <h4>Cookies de Marketing</h4>
                                    <p>Usados para mostrar anúncios relevantes e medir campanhas.</p>
                                </div>
                                <div 
                                    className={`${styles['toggle']} ${preferences.marketing ? styles['toggle-active'] : ''}`}
                                    onClick={() => togglePreference('marketing')}
                                >
                                    <div className={styles['toggle-handle']} />
                                </div>
                            </div>
                            
                            <div className={styles['preference-item']}>
                                <div className={styles['preference-info']}>
                                    <h4>Cookies de Preferências</h4>
                                    <p>Lembram suas escolhas para personalizar sua experiência.</p>
                                </div>
                                <div 
                                    className={`${styles['toggle']} ${preferences.preferences ? styles['toggle-active'] : ''}`}
                                    onClick={() => togglePreference('preferences')}
                                >
                                    <div className={styles['toggle-handle']} />
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles['modal-footer']}>
                            <button 
                                onClick={handleSavePreferences}
                                className={`${styles['cookies-banner-button']} ${styles['accept-button']}`}
                            >
                                Salvar Preferências
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CookieBanner;
