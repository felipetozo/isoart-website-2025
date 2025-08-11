// Lógica de gerenciamento de cookies e consentimento
export interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
}

export interface CookieConsentData {
    preferences: CookiePreferences;
    timestamp: number;
    version: string;
}

const COOKIE_CONSENT_KEY = 'isoart-cookie-consent';
const COOKIE_CONSENT_VERSION = '1.0.0';

export class CookieConsentManager {
    private static instance: CookieConsentManager;
    
    private constructor() {}
    
    public static getInstance(): CookieConsentManager {
        if (!CookieConsentManager.instance) {
            CookieConsentManager.instance = new CookieConsentManager();
        }
        return CookieConsentManager.instance;
    }
    
    /**
     * Verifica se já existe consentimento salvo
     */
    public hasConsent(): boolean {
        if (typeof window === 'undefined') return false;
        
        const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!saved) return false;
        
        try {
            const data: CookieConsentData = JSON.parse(saved);
            return data.version === COOKIE_CONSENT_VERSION;
        } catch {
            return false;
        }
    }
    
    /**
     * Obtém as preferências salvas
     */
    public getPreferences(): CookiePreferences | null {
        if (typeof window === 'undefined') return null;
        
        const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!saved) return null;
        
        try {
            const data: CookieConsentData = JSON.parse(saved);
            return data.preferences;
        } catch {
            return null;
        }
    }
    
    /**
     * Salva as preferências de consentimento
     */
    public saveConsent(preferences: CookiePreferences): void {
        if (typeof window === 'undefined') return;
        
        const data: CookieConsentData = {
            preferences,
            timestamp: Date.now(),
            version: COOKIE_CONSENT_VERSION
        };
        
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));
        
        // Aqui você pode adicionar lógica para ativar/desativar serviços
        this.applyPreferences(preferences);
    }
    
    /**
     * Aplica as preferências (ativa/desativa serviços)
     */
    private applyPreferences(preferences: CookiePreferences): void {
        // Cookies essenciais sempre ativos
        if (preferences.necessary) {
            // Ativar funcionalidades essenciais
            console.log('Cookies essenciais ativados');
        }
        
        // Analytics
        if (preferences.analytics) {
            // Ativar Google Analytics, etc.
            console.log('Cookies de analytics ativados');
        } else {
            // Desativar analytics
            console.log('Cookies de analytics desativados');
        }
        
        // Marketing
        if (preferences.marketing) {
            // Ativar pixels de marketing, etc.
            console.log('Cookies de marketing ativados');
        } else {
            // Desativar marketing
            console.log('Cookies de marketing desativados');
        }
        
        // Preferências
        if (preferences.preferences) {
            // Ativar personalização
            console.log('Cookies de preferências ativados');
        } else {
            // Desativar personalização
            console.log('Cookies de preferências desativados');
        }
    }
    
    /**
     * Limpa todas as preferências
     */
    public clearConsent(): void {
        if (typeof window === 'undefined') return;
        
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        console.log('Consentimento de cookies removido');
    }
    
    /**
     * Obtém estatísticas de consentimento
     */
    public getConsentStats(): { total: number; analytics: number; marketing: number; preferences: number } {
        const prefs = this.getPreferences();
        if (!prefs) return { total: 0, analytics: 0, marketing: 0, preferences: 0 };
        
        return {
            total: 1, // Sempre 1 se existe consentimento
            analytics: prefs.analytics ? 1 : 0,
            marketing: prefs.marketing ? 1 : 0,
            preferences: prefs.preferences ? 1 : 0
        };
    }
}

// Exporta instância singleton
export const cookieConsentManager = CookieConsentManager.getInstance();
