export default function ProgressBar({ progress = 0, className = '' }) {
    const getColor = () => {
        if (progress <= 10) return 'bg-severity-critical';
        if (progress <= 50) return 'bg-severity-high';
        if (progress <= 80) return 'bg-severity-medium';
        return 'bg-accent';
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-surface-dark-tertiary rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${getColor()}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 min-w-[36px] text-right">
                {progress}%
            </span>
        </div>
    );
}
