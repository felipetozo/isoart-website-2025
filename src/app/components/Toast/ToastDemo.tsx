'use client';
import { useState } from 'react';
import Toast from './Toast';

function ToastDemo() {
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showInfoToast, setShowInfoToast] = useState(false);

    return (
        <div style={{ padding: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
                onClick={() => setShowSuccessToast(true)}
                style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                }}
            >
                Testar Toast de Sucesso
            </button>
            
            <button 
                onClick={() => setShowErrorToast(true)}
                style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                }}
            >
                Testar Toast de Erro
            </button>
            
            <button 
                onClick={() => setShowInfoToast(true)}
                style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                }}
            >
                Testar Toast de Info
            </button>

            <Toast
                message="Sua mensagem foi enviada com sucesso!"
                type="success"
                isVisible={showSuccessToast}
                onClose={() => setShowSuccessToast(false)}
                duration={4000}
            />

            <Toast
                message="Erro ao enviar mensagem. Tente novamente."
                type="error"
                isVisible={showErrorToast}
                onClose={() => setShowErrorToast(false)}
                duration={4000}
            />

            <Toast
                message="Informação importante para você."
                type="info"
                isVisible={showInfoToast}
                onClose={() => setShowInfoToast(false)}
                duration={4000}
            />
        </div>
    );
}

export default ToastDemo; 