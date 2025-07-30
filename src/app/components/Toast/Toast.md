# Componente Toast

Um componente de notificação elegante que aparece vindo de baixo da tela com animações suaves.

## Características

- ✅ Animação suave vinda de baixo da tela
- ✅ Padding de 1rem conforme solicitado
- ✅ Background color isoartGold 0.25
- ✅ Ícone de check verde para sucesso
- ✅ Design responsivo
- ✅ Efeito de blur e backdrop-filter
- ✅ Auto-hide após 4 segundos (configurável)

## Uso

```tsx
import Toast from '@/app/components/Toast/Toast';

function MyComponent() {
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async () => {
        // Lógica de envio do formulário
        setShowToast(true);
    };

    return (
        <div>
            <button onClick={handleSubmit}>Enviar</button>
            
            <Toast
                message="Sua mensagem foi enviada com sucesso!"
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                duration={4000}
            />
        </div>
    );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `message` | `string` | - | Mensagem a ser exibida |
| `type` | `'success' \| 'error' \| 'info'` | `'success'` | Tipo de notificação |
| `isVisible` | `boolean` | - | Controla a visibilidade |
| `onClose` | `() => void` | - | Callback quando fecha |
| `duration` | `number` | `4000` | Duração em milissegundos |

## Tipos de Toast

- **success**: Verde com ícone de check
- **error**: Vermelho com ícone de erro
- **info**: Azul com ícone de informação

## Estilos

O componente usa as variáveis CSS do projeto:
- `--color-isoartGold`: Cor dourada da marca
- `--color-darkGold`: Cor do texto
- `--color-lightGreen`: Cor do ícone de sucesso
- `--font-Inter`: Fonte do texto 