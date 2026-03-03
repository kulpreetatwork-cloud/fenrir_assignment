import { ShieldAlert, ShieldX, AlertTriangle, Shield } from 'lucide-react';

const config = {
    critical: {
        bg: 'bg-severity-critical/10 dark:bg-severity-critical/20',
        text: 'text-severity-critical',
        border: 'border-severity-critical/20',
        icon: ShieldX,
    },
    high: {
        bg: 'bg-severity-high/10 dark:bg-severity-high/20',
        text: 'text-severity-high',
        border: 'border-severity-high/20',
        icon: ShieldAlert,
    },
    medium: {
        bg: 'bg-severity-medium/10 dark:bg-severity-medium/20',
        text: 'text-severity-medium',
        border: 'border-severity-medium/20',
        icon: AlertTriangle,
    },
    low: {
        bg: 'bg-severity-low/10 dark:bg-severity-low/20',
        text: 'text-severity-low',
        border: 'border-severity-low/20',
        icon: Shield,
    },
};

export default function SeverityBadge({ severity, className = '' }) {
    const { bg, text, border } = config[severity] || config.low;

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${bg} ${text} ${border} ${className}`}
            role="status"
            aria-label={`${severity} severity`}
        >
            {severity}
        </span>
    );
}

export function SeverityIcon({ severity, size = 20, className = '' }) {
    const conf = config[severity] || config.low;
    const Icon = conf.icon;
    return <Icon size={size} className={`${conf.text} ${className}`} />;
}
