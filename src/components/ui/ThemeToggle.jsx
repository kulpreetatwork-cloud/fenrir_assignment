import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle({ className = '' }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary transition-colors focus-ring ${className}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {isDark ? (
                    <Sun size={20} className="text-amber-400" />
                ) : (
                    <Moon size={20} className="text-gray-600" />
                )}
            </motion.div>
        </button>
    );
}
