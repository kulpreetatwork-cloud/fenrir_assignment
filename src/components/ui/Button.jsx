export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    className = '',
    icon: Icon,
    ...props
}) {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-accent hover:bg-accent-hover text-white shadow-sm hover:shadow-md active:scale-[0.98]',
        outline: 'border border-surface-light-border dark:border-surface-dark-border bg-transparent hover:bg-gray-50 dark:hover:bg-surface-dark-tertiary text-gray-700 dark:text-gray-200',
        danger: 'border border-red-200 dark:border-red-800 bg-transparent hover:bg-red-50 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary text-gray-600 dark:text-gray-300',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-2.5 text-base',
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
            {children}
        </button>
    );
}
