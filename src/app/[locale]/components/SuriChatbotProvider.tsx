'use client';

import Script from 'next/script';
import React from 'react';

declare global {
    interface Window {
        CBM: {
            ChatbotId: string;
            StartWebChat: () => Promise<any>;
        };
        cbAsyncInit: () => void;
    }
}

const SuriChatbotProvider: React.FC = () => {
    const chatbotId = process.env.NEXT_PUBLIC_SURI_CHATBOT_ID;

    if (!chatbotId) {
        console.warn("NEXT_PUBLIC_SURI_CHATBOT_ID is not defined. Suri Chatbot will not load.");
        return null;
    }

    return (
        <>
            <Script
                src="https://webchat.chatbotmaker.io/cbm-jssdk.js"
                strategy="afterInteractive"
                onLoad={() => {
                    // Initialize the chatbot when the script loads
                    if (window.CBM) {
                        window.CBM.ChatbotId = chatbotId;
                        window.CBM.StartWebChat().then((webChat: any) => {
                            console.log('Suri Chatbot loaded successfully');
                        }).catch((reason: any) => {
                            console.error('Failed to start Suri Chatbot:', reason);
                        });
                    }
                }}
            />
            <Script
                id="suri-chatbot-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.cbAsyncInit = function () {
                            CBM.ChatbotId = "${chatbotId}";
                            CBM.StartWebChat().then(webChat => {
                                console.log('Suri Chatbot loaded successfully');
                                
                                // Aplicar estilos personalizados após o carregamento
                                setTimeout(() => {
                                    const chatbotElements = document.querySelectorAll('[class*="cbm"], [class*="widget"], iframe[src*="chatbotmaker"]');
                                    chatbotElements.forEach(element => {
                                        element.style.width = '5rem';
                                        element.style.height = '5rem';
                                        element.style.transform = 'scale(1.2)';
                                    });
                                    
                                    // Tentar encontrar o container do chatbot
                                    const chatbotContainer = document.querySelector('body > div:last-child');
                                    if (chatbotContainer) {
                                        chatbotContainer.style.width = '5rem';
                                        chatbotContainer.style.height = '5rem';
                                        chatbotContainer.style.transform = 'scale(1.2)';
                                    }
                                }, 1000);
                            }).catch(reason => {
                                console.error('Failed to start Suri Chatbot:', reason);
                            });
                        };
                    `,
                }}
            />
        </>
    );
};

export default SuriChatbotProvider;
