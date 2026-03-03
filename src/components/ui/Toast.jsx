import { useState, createContext, useContext, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.95 }}
                            className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-xl
                ${toast.type === 'success' ? 'bg-green-50 dark:bg-green-950/80 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' : ''}
                ${toast.type === 'error' ? 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200' : ''}
                ${toast.type === 'warning' ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200' : ''}
                ${toast.type === 'info' ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200' : ''}
              `}
                        >
                            <span className="mt-0.5 shrink-0">
                                {toast.type === 'success' && <CheckCircle size={18} />}
                                {toast.type === 'error' && <AlertOctagon size={18} />}
                                {toast.type === 'warning' && <AlertTriangle size={18} />}
                                {toast.type === 'info' && <Info size={18} />}
                            </span>
                            <p className="text-sm font-medium flex-1">{toast.message}</p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                                aria-label="Dismiss notification"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
}
