'use client';

import { useState } from 'react';
import styles from './TabbedSection.module.css';

interface TabbedSectionProps {
    categoryColor: string;
    tabDescriptions: { [key: string]: string };
}

export default function TabbedSection({ categoryColor, tabDescriptions }: TabbedSectionProps) {
    const [activeTab, setActiveTab] = useState(Object.keys(tabDescriptions)[0]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <section className={styles.TabbedSection}>
            <div className={styles.TabbedWrapper}>
                <div className={styles.TabButtons}>
                    {Object.keys(tabDescriptions).map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.TabButton} ${activeTab === tab ? styles.ActiveTab : ''}`}
                            onClick={() => handleTabClick(tab)}
                            style={{
                                '--border-color': activeTab === tab ? `rgba(${categoryColor}, 1)` : 'transparent'
                            } as React.CSSProperties & { '--border-color': string }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <p className={styles.TabContent}>{tabDescriptions[activeTab]}</p>
            </div>
        </section>
    );
}