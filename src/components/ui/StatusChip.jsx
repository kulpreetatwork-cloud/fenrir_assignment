const config = {
    Completed: {
        bg: 'bg-status-completed-bg dark:bg-status-completed-bg-dark',
        text: 'text-status-completed',
        border: 'border-status-completed/20',
    },
    Scheduled: {
        bg: 'bg-status-scheduled-bg dark:bg-status-scheduled-bg-dark',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-300 dark:border-gray-600',
    },
    Failed: {
        bg: 'bg-status-failed-bg dark:bg-status-failed-bg-dark',
        text: 'text-status-failed',
        border: 'border-status-failed/20',
    },
};

export default function StatusChip({ status, className = '' }) {
    const { bg, text, border } = config[status] || config.Scheduled;

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${bg} ${text} ${border} ${className}`}
            role="status"
            aria-label={`Status: ${status}`}
        >
            {status}
        </span>
    );
}
