import React from 'react';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';

interface PrivacidadePageProps {
    params: Promise<{ locale: string }>;
}

export default async function PrivacidadePage({ params }: PrivacidadePageProps) {
    const { locale } = await params;
    const t = await getTranslations('privacyPage');
    
    return (
        <>
            {/* Hero Section */}
            <section className={styles['privacidade-hero-section']}>
                <div className={styles['privacidade-hero-wrapper']}>
                    <h3>{t('hero.title')}</h3>
                    <p>{t('hero.description')}</p>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles['privacidade-content-section']}>
                <div className={styles['privacidade-content-wrapper']}>
                    <div className={styles['privacidade-content']}>
                        <p>{t('content.intro1')}</p>
                        <p>{t('content.intro2')}</p>
                        <p>{t('content.intro3')}</p>
                        <p>{t('content.intro4')}</p>

                        <h4>{t('content.definitionsTitle')}</h4>
                        <p>{t('content.definitionsDesc')}</p>

                        <p><strong>{t('content.personalData')}</strong></p>
                        <p><strong>{t('content.treatment')}</strong></p>
                        <p><strong>{t('content.user')}</strong></p>
                        <p><strong>{t('content.logs')}</strong></p>

                        <h4>{t('content.cookiesTitle')}</h4>
                        <p>{t('content.cookiesDesc')}</p>

                        <h4>{t('content.purposeTitle')}</h4>
                        <p>{t('content.purposeDesc1')}</p>
                        <p>{t('content.purposeDesc2')}</p>

                        <h4>{t('content.managementTitle')}</h4>
                        <p>{t('content.managementDesc1')}</p>
                        <p>{t('content.managementDesc2')}</p>
                        <p>{t('content.managementDesc3')}</p>
                        <p>{t('content.managementDesc4')}</p>

                        <ul>
                            <li>{t('content.browsers.ie')} <a href="https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies?ocid=IE10_about_cookies" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies?ocid=IE10_about_cookies</a></li>
                            <li>{t('content.browsers.safari')} <a href="http://support.apple.com/kb/HT1677?viewlocale=en_US" target="_blank" rel="noopener noreferrer">http://support.apple.com/kb/HT1677?viewlocale=en_US</a></li>
                            <li>{t('content.browsers.chrome')} <a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener noreferrer">https://support.google.com/chrome/answer/95647?hl=en</a></li>
                            <li>{t('content.browsers.firefox')} <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences</a></li>
                            <li>{t('content.browsers.opera')} <a href="http://help.opera.com/Windows/10.20/en/cookies.html" target="_blank" rel="noopener noreferrer">http://help.opera.com/Windows/10.20/en/cookies.html</a></li>
                        </ul>

                        <p>
                            {t('content.moreInfo')} <a href="http://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer">http://www.aboutcookies.org/</a>
                        </p>

                        <p>{t('content.note')}</p>
                        <p>{t('content.revocation')}</p>

                        <h4>{t('content.cookiesUsedTitle')}</h4>
                        <p>{t('content.cookiesUsedDesc')}</p>

                        <h4>{t('content.functionalTitle')}</h4>
                        <p>{t('content.functionalDesc')}</p>

                        <h4>{t('content.analyticsTitle')}</h4>
                        <p>{t('content.analyticsDesc')}</p>

                        <h4>{t('content.structuralTitle')}</h4>
                        <p>{t('content.structuralDesc')}</p>

                        <h4>{t('content.marketingTitle')}</h4>
                        <p>{t('content.marketingDesc')}</p>

                        <p><strong>{t('content.dartCookie')}</strong></p>
                        <p><strong>{t('content.webBeacons')}</strong></p>

                        <h4>{t('content.thirdPartyTitle')}</h4>
                        <p>{t('content.thirdPartyDesc')}</p>

                        <h4>{t('content.rightsTitle')}</h4>
                        <p>{t('content.rightsDesc')}</p>

                        <h4>{t('content.validityTitle')}</h4>
                        <p>{t('content.validityDesc')}</p>

                        <h4>{t('content.contactTitle')}</h4>
                        <p>
                            {t('content.contactDesc')} <a href="https://www.isoart.com.br" target="_blank" rel="noopener noreferrer">www.isoart.com.br</a>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};
