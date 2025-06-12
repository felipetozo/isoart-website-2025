import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'lightBlue';
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
    style?: React.CSSProperties; // Added style prop
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
    style, // Destructured style prop
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="btnWrapper">
            <button
                type={type}
                className={buttonClasses}
                onClick={onClick}
                disabled={disabled}
                style={style} // Applied style prop
            >
                {children}
            </button>
        </div>
    );
};

export default Button;