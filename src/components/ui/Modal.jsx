import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                        aria-hidden="true"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className={`w-full max-w-lg bg-white dark:bg-surface-dark-secondary rounded-2xl shadow-2xl border border-surface-light-border dark:border-surface-dark-border ${className}`}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-light-border dark:border-surface-dark-border">
                                <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <div className="px-6 py-4">{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
