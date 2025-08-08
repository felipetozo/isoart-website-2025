'use client';

import { useState } from 'react';
import styles from './tabbed-section.module.css';

interface TabbedSectionProps {
    tabDescriptions: { [key: string]: string };
}

export default function TabbedSection({ tabDescriptions }: TabbedSectionProps) {
    const [activeTab, setActiveTab] = useState(Object.keys(tabDescriptions)[0]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <section className={styles['tabbed-section']}>
            <div className={styles['tabbed-wrapper']}>
                {/* Desktop: Tabs funcionais */}
                <div className={styles['desktop-tabs']}>
                    <div className={styles['tab-buttons']}>
                        {Object.keys(tabDescriptions).map((tab) => (
                            <button
                                key={tab}
                                className={`${styles['tab-button']} ${activeTab === tab ? styles['active-tab'] : ''}`}
                                onClick={() => handleTabClick(tab)}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <p className={styles['tab-content']}>{tabDescriptions[activeTab]}</p>
                </div>

                {/* Mobile: Todas as seções visíveis */}
                <div className={styles['mobile-sections']}>
                    {Object.entries(tabDescriptions).map(([title, description]) => (
                        <div key={title} className={styles['mobile-section']}>
                            <h4 className={styles['mobile-section-title']}>{title}</h4>
                            <p className={styles['mobile-section-content']}>{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}