import styles from './button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'light-blue' | 'gold-border';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    className = '',
    type = 'button',
    style,
}) => {
    const buttonClasses = [
        styles['button'],
        styles[variant],
        styles[size],
        fullWidth ? styles['full-width'] : '',
        disabled ? styles['disabled'] : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={styles['btn-wrapper']}>
            <button
                type={type}
                className={buttonClasses}
                onClick={onClick}
                disabled={disabled}
                style={style}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;