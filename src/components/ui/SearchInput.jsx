import { Search } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
    return (
        <div className={`relative flex-1 ${className}`}>
            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
            />
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-secondary text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                aria-label={placeholder}
            />
        </div>
    );
}
