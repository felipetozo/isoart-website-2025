'use client';

import { useState } from 'react';
import styles from './TabbedSection.module.css';

interface TabbedSectionProps {
    tabDescriptions: { [key: string]: string };
}

export default function TabbedSection({ tabDescriptions }: TabbedSectionProps) {
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
                            onClick={() => handleTabClick(tab)}>
                            {tab}
                        </button>
                    ))}
                </div>
                <p className={styles.TabContent}>{tabDescriptions[activeTab]}</p>
            </div>
        </section>
    );
}