import { useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';
import { FileDown, StopCircle, Home, Lock } from 'lucide-react';

export default function AppLayout({ children }) {
    const { addToast } = useToast();
    const location = useLocation();

    const handleExportReport = () => {
        addToast('Report exported successfully! Check your downloads folder.', 'success');
    };

    const handleStopScan = () => {
        addToast('Scan has been stopped.', 'warning');
    };

    return (
        <div className="flex min-h-screen bg-surface-light-secondary dark:bg-surface-dark">
            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen min-w-0">
                {/* Top Header */}
                <header className="sticky top-0 z-40 bg-white/80 dark:bg-surface-dark-secondary/80 backdrop-blur-xl border-b border-surface-light-border dark:border-surface-dark-border">
                    <div className="flex items-center justify-between px-4 lg:px-6 py-3">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm ml-12 lg:ml-0">
                            <span className="font-semibold text-gray-900 dark:text-white">Scan</span>
                            <span className="text-gray-400">
                                <Home size={14} />
                            </span>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Lock size={12} />
                                Private Assets
                            </span>
                            <span className="text-gray-400">/</span>
                            <Link
                                to="#"
                                className="text-accent hover:text-accent-hover font-medium transition-colors"
                            >
                                New Scan
                            </Link>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <Button
                                variant="outline"
                                size="sm"
                                icon={FileDown}
                                onClick={handleExportReport}
                                className="hidden sm:inline-flex"
                            >
                                Export Report
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                icon={StopCircle}
                                onClick={handleStopScan}
                                className="hidden sm:inline-flex"
                            >
                                Stop Scan
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
