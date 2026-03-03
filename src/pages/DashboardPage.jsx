import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Plus,
    Filter,
    Columns3,
    TrendingUp,
    TrendingDown,
    Clock,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { orgInfo, severityStats, scans } from '../data/mockData';
import { SeverityIcon } from '../components/ui/SeverityBadge';
import StatusChip from '../components/ui/StatusChip';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import ProgressBar from '../components/ui/ProgressBar';
import Modal from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { SkeletonTable } from '../components/ui/Skeleton';

const ITEMS_PER_PAGE = 15;

export default function DashboardPage() {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showNewScanModal, setShowNewScanModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [showFilter, setShowFilter] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(t);
    }, []);

    const filteredScans = useMemo(() => {
        let result = scans;
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                s => s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q)
            );
        }
        if (statusFilter !== 'all') {
            result = result.filter(s => s.status === statusFilter);
        }
        return result;
    }, [search, statusFilter]);

    const totalPages = Math.ceil(filteredScans.length / ITEMS_PER_PAGE);
    const pagedScans = filteredScans.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleNewScan = () => {
        setShowNewScanModal(false);
        addToast('New scan initiated successfully!', 'success');
    };

    const VulnCount = ({ count, severity }) => {
        if (!count && count !== 0) return null;
        const colors = {
            critical: 'bg-severity-critical',
            high: 'bg-severity-high',
            medium: 'bg-severity-medium',
            low: 'bg-severity-low',
        };
        return (
            <span
                className={`inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 rounded-md text-xs font-bold text-white ${colors[severity]}`}
                aria-label={`${count} ${severity} vulnerabilities`}
            >
                {count}
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Org Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-surface-dark-secondary rounded-xl border border-surface-light-border dark:border-surface-dark-border px-4 lg:px-6 py-3"
            >
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">Org:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{orgInfo.name}</span>
                    </div>
                    <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-surface-dark-border" />
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">Owner:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{orgInfo.owner}</span>
                    </div>
                    <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-surface-dark-border" />
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">Total Scans:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{orgInfo.totalScans}</span>
                    </div>
                    <div className="hidden md:block w-px h-5 bg-gray-200 dark:bg-surface-dark-border" />
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">Scheduled:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{orgInfo.scheduled}</span>
                    </div>
                    <div className="hidden lg:block w-px h-5 bg-gray-200 dark:bg-surface-dark-border" />
                    <div className="hidden lg:flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">Rescans:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{orgInfo.rescans}</span>
                    </div>
                    <div className="hidden lg:block w-px h-5 bg-gray-200 dark:bg-surface-dark-border" />
                    <div className="hidden lg:flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">Failed Scans:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{orgInfo.failedScans}</span>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs">
                        <Clock size={14} />
                        {orgInfo.lastUpdated}
                    </div>
                </div>
            </motion.div>

            {/* Severity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {severityStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-surface-dark-secondary rounded-xl border border-surface-light-border dark:border-surface-dark-border p-5 hover:shadow-lg dark:hover:shadow-black/20 transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</h3>
                            <SeverityIcon severity={stat.severity} size={22} />
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.count}</span>
                            <span
                                className={`flex items-center gap-1 text-xs font-medium mb-1 ${stat.trend === 'up' ? 'text-severity-critical' : 'text-severity-low'
                                    }`}
                            >
                                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {stat.change}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Toolbar & Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-surface-dark-secondary rounded-xl border border-surface-light-border dark:border-surface-dark-border overflow-hidden"
            >
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 lg:px-6 py-4 border-b border-surface-light-border dark:border-surface-dark-border">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search scans by name or type..."
                        className="w-full sm:flex-1"
                    />
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative">
                            <Button
                                variant="outline"
                                size="sm"
                                icon={Filter}
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                Filter
                            </Button>
                            {showFilter && (
                                <div className="absolute top-full mt-2 right-0 bg-white dark:bg-surface-dark-secondary border border-surface-light-border dark:border-surface-dark-border rounded-lg shadow-xl z-20 py-1 min-w-[140px]">
                                    {['all', 'Completed', 'Scheduled', 'Failed'].map(f => (
                                        <button
                                            key={f}
                                            onClick={() => { setStatusFilter(f); setShowFilter(false); setPage(1); }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-surface-dark-tertiary transition-colors capitalize ${statusFilter === f ? 'text-accent font-medium' : 'text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {f === 'all' ? 'All Statuses' : f}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Button variant="outline" size="sm" icon={Columns3}>
                            Column
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            icon={Plus}
                            onClick={() => setShowNewScanModal(true)}
                        >
                            New scan
                        </Button>
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <div className="p-4 lg:p-6">
                        <SkeletonTable rows={8} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]" role="table">
                            <thead>
                                <tr className="border-b border-surface-light-border dark:border-surface-dark-border">
                                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Scan Name
                                    </th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[180px]">
                                        Progress
                                    </th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Vulnerability
                                    </th>
                                    <th className="text-right px-4 lg:px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Last Scan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagedScans.map((scan, i) => (
                                    <motion.tr
                                        key={scan.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.03 }}
                                        onClick={() => navigate(`/scan/${scan.id}`)}
                                        className="border-b border-surface-light-border dark:border-surface-dark-border hover:bg-gray-50 dark:hover:bg-surface-dark-tertiary/50 cursor-pointer transition-colors group"
                                        role="row"
                                        tabIndex="0"
                                        onKeyDown={e => { if (e.key === 'Enter') navigate(`/scan/${scan.id}`); }}
                                    >
                                        <td className="px-4 lg:px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                                                {scan.name}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {scan.type}
                                        </td>
                                        <td className="px-4 py-4">
                                            <StatusChip status={scan.status} />
                                        </td>
                                        <td className="px-4 py-4">
                                            <ProgressBar progress={scan.progress} />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1.5">
                                                {scan.vulnerabilities.critical != null && (
                                                    <VulnCount count={scan.vulnerabilities.critical} severity="critical" />
                                                )}
                                                {scan.vulnerabilities.high != null && (
                                                    <VulnCount count={scan.vulnerabilities.high} severity="high" />
                                                )}
                                                {scan.vulnerabilities.medium != null && (
                                                    <VulnCount count={scan.vulnerabilities.medium} severity="medium" />
                                                )}
                                                {scan.vulnerabilities.low != null && (
                                                    <VulnCount count={scan.vulnerabilities.low} severity="low" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">
                                            {scan.lastScan}
                                        </td>
                                    </motion.tr>
                                ))}
                                {pagedScans.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-12 text-gray-400 dark:text-gray-500">
                                            No scans match your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && (
                    <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-t border-surface-light-border dark:border-surface-dark-border">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Showing {Math.min(filteredScans.length, (page - 1) * ITEMS_PER_PAGE + 1)}–{Math.min(page * ITEMS_PER_PAGE, filteredScans.length)} of {filteredScans.length} Scans
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary disabled:opacity-30 transition-colors"
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || totalPages === 0}
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary disabled:opacity-30 transition-colors"
                                aria-label="Next page"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* New Scan Modal */}
            <Modal isOpen={showNewScanModal} onClose={() => setShowNewScanModal(false)} title="Create New Scan">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Scan Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter scan name"
                            className="w-full px-4 py-2.5 rounded-lg border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-tertiary text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            aria-label="Scan name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Scan Type
                        </label>
                        <select
                            className="w-full px-4 py-2.5 rounded-lg border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-tertiary text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            aria-label="Scan type"
                        >
                            <option>Greybox</option>
                            <option>Blackbox</option>
                            <option>Whitebox</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Target URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-tertiary text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            aria-label="Target URL"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-3 border-t border-surface-light-border dark:border-surface-dark-border">
                        <Button variant="ghost" onClick={() => setShowNewScanModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleNewScan}>
                            Start Scan
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
