'use client';

import Script from 'next/script';
import React from 'react';

const SuriChatbotProvider: React.FC = () => {
    const chatbotId = process.env.NEXT_PUBLIC_SURI_CHATBOT_ID;

    if (!chatbotId) {
        console.warn("NEXT_PUBLIC_SURI_CHATBOT_ID is not defined. Suri Chatbot will not load.");
        return null;
    }

    return (
        <Script
            id="cbm-jssdk"
            src="https://webchat.chatbotmaker.io/cbm-jssdk.js"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    window.cbAsyncInit = function () {
                        CBM.ChatbotId = "${chatbotId}";
                        CBM.StartWebChat().then(webChat => {
                               
                        }).catch(reason => {

                        });
                    };
                    (function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) { return; }
                        js = d.createElement(s); js.id = id;
                        js.src = "https://webchat.chatbotmaker.io/cbm-jssdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'cbm-jssdk'));
                `,
            }}
        />
    );
};

export default SuriChatbotProvider;
