import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Radar,
    Map,
    FlaskConical,
    CheckSquare,
    FileText,
    ChevronDown,
    ChevronUp,
    X,
    Loader2,
    Zap,
    Cpu,
    Activity,
} from 'lucide-react';
import { scanDetail, activityLogs, verificationLogs, findings, scanStatusBar } from '../data/mockData';
import SeverityBadge from '../components/ui/SeverityBadge';
import { SkeletonCard, SkeletonLine } from '../components/ui/Skeleton';

const stepIcons = [Radar, Map, FlaskConical, CheckSquare, FileText];

function CircularProgress({ progress }) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-[130px] h-[130px] flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-gray-200 dark:text-surface-dark-tertiary"
                />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-accent transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{progress}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">In Progress</span>
            </div>
        </div>
    );
}

function StepTracker({ steps, currentStep }) {
    return (
        <div className="flex items-center justify-between flex-1 max-w-2xl">
            {steps.map((step, i) => {
                const Icon = stepIcons[i];
                const isActive = i === currentStep;
                const isCompleted = i < currentStep;
                return (
                    <div key={step} className="flex flex-col items-center gap-2 relative">
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                    : isCompleted
                                        ? 'bg-accent/20 text-accent'
                                        : 'bg-gray-100 dark:bg-surface-dark-tertiary text-gray-400 dark:text-gray-500'
                                }`}
                        >
                            <Icon size={22} />
                        </div>
                        <span
                            className={`text-xs font-medium ${isActive ? 'text-accent' : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            {step}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

function LogEntry({ log }) {
    const renderText = (text) => {
        // Parse special markup in log text
        const parts = text.split(/(<url>.*?<\/url>|<code>.*?<\/code>|<strong>.*?<\/strong>|\n)/g);
        return parts.map((part, i) => {
            if (part === '\n') return <br key={i} />;
            if (part.startsWith('<url>')) {
                const url = part.replace(/<\/?url>/g, '');
                return (
                    <span key={i} className="text-accent font-medium">
                        {url}
                    </span>
                );
            }
            if (part.startsWith('<code>')) {
                const code = part.replace(/<\/?code>/g, '');
                return (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-mono text-xs">
                        {code}
                    </span>
                );
            }
            if (part.startsWith('<strong>')) {
                const strong = part.replace(/<\/?strong>/g, '');
                return (
                    <span key={i} className="font-bold text-amber-500">
                        {strong}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div className="flex gap-3 py-2.5 group">
            <span className="text-accent/70 font-mono text-xs shrink-0 mt-0.5 select-all">
                [{log.time}]
            </span>
            <p className="text-sm text-gray-300 dark:text-gray-300 leading-relaxed font-mono">
                {renderText(log.text)}
            </p>
        </div>
    );
}

function FindingCard({ finding }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card hover:shadow-md dark:hover:shadow-black/20 transition-shadow"
        >
            <div className="flex items-start justify-between mb-2">
                <SeverityBadge severity={finding.severity} />
                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{finding.timestamp}</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5">{finding.title}</h4>
            <p className="text-xs text-accent font-medium mb-2">{finding.endpoint}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{finding.description}</p>
        </motion.div>
    );
}

export default function ScanDetailPage() {
    const [activeTab, setActiveTab] = useState('activity');
    const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    const logs = activeTab === 'activity' ? activityLogs : verificationLogs;

    if (isLoading) {
        return (
            <div className="space-y-6 animate-fade-in">
                <SkeletonCard className="h-[200px]" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <SkeletonCard className="lg:col-span-2 h-[400px]" />
                    <SkeletonCard className="h-[400px]" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Top Section: Progress + Steps + Metadata */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-surface-dark-secondary rounded-xl border border-surface-light-border dark:border-surface-dark-border p-6"
            >
                <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
                    <CircularProgress progress={scanDetail.progress} />
                    <StepTracker steps={scanDetail.steps} currentStep={scanDetail.currentStep} />
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 pt-6 border-t border-surface-light-border dark:border-surface-dark-border">
                    {[
                        { label: 'Scan Type', value: scanDetail.scanType },
                        { label: 'Targets', value: scanDetail.targets },
                        { label: 'Started At', value: scanDetail.startedAt },
                        { label: 'Credentials', value: scanDetail.credentials },
                        { label: 'Files', value: scanDetail.files },
                        { label: 'Checklists', value: scanDetail.checklists, accent: true },
                    ].map((item) => (
                        <div key={item.label}>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                            <p className={`text-sm font-semibold ${item.accent ? 'text-accent' : 'text-gray-900 dark:text-white'}`}>
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Console + Findings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live Scan Console */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white dark:bg-surface-dark-secondary rounded-xl border border-surface-light-border dark:border-surface-dark-border overflow-hidden"
                >
                    {/* Console Header */}
                    <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-surface-light-border dark:border-surface-dark-border">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Live Scan Console
                            </h3>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-surface-dark-tertiary text-xs text-gray-500 dark:text-gray-400">
                                <Loader2 size={12} className="animate-spin" />
                                Running...
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary transition-colors"
                                aria-label={isConsoleExpanded ? 'Collapse console' : 'Expand console'}
                            >
                                {isConsoleExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            <button
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary transition-colors"
                                aria-label="Close console"
                            >
                                <X size={16} className="text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {isConsoleExpanded && (
                        <>
                            {/* Tabs */}
                            <div className="flex border-b border-surface-light-border dark:border-surface-dark-border">
                                <button
                                    onClick={() => setActiveTab('activity')}
                                    className={`px-6 py-3 text-sm font-medium transition-all relative ${activeTab === 'activity'
                                            ? 'text-accent'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                        }`}
                                    role="tab"
                                    aria-selected={activeTab === 'activity'}
                                >
                                    Activity Log
                                    {activeTab === 'activity' && (
                                        <motion.div
                                            layoutId="tab-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('verification')}
                                    className={`px-6 py-3 text-sm font-medium transition-all relative ${activeTab === 'verification'
                                            ? 'text-accent'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                        }`}
                                    role="tab"
                                    aria-selected={activeTab === 'verification'}
                                >
                                    Verification Loops
                                    {activeTab === 'verification' && (
                                        <motion.div
                                            layoutId="tab-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                        />
                                    )}
                                </button>
                            </div>

                            {/* Log Output */}
                            <div className="p-4 lg:p-6 max-h-[500px] overflow-y-auto bg-gray-900 dark:bg-surface-dark">
                                <div className="space-y-0">
                                    {logs.map((log, i) => (
                                        <LogEntry key={i} log={log} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>

                {/* Finding Log */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-surface-dark-secondary rounded-xl border border-surface-light-border dark:border-surface-dark-border overflow-hidden"
                >
                    <div className="px-4 lg:px-6 py-3 border-b border-surface-light-border dark:border-surface-dark-border">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Finding Log</h3>
                    </div>
                    <div className="p-4 space-y-4 max-h-[560px] overflow-y-auto">
                        {findings.map((finding, i) => (
                            <FindingCard key={finding.id} finding={finding} />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Status Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-surface-dark-secondary rounded-xl border border-surface-light-border dark:border-surface-dark-border px-4 lg:px-6 py-3"
            >
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Zap size={16} className="text-accent" />
                        <span>Sub-agents: <span className="font-semibold text-gray-900 dark:text-white">{scanStatusBar.subAgents}</span></span>
                    </div>
                    <div className="w-px h-4 bg-gray-200 dark:bg-surface-dark-border hidden sm:block" />
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Cpu size={16} className="text-accent" />
                        <span>Parallel Executions: <span className="font-semibold text-gray-900 dark:text-white">{scanStatusBar.parallelExecutions}</span></span>
                    </div>
                    <div className="w-px h-4 bg-gray-200 dark:bg-surface-dark-border hidden sm:block" />
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Activity size={16} className="text-accent" />
                        <span>Operations: <span className="font-semibold text-gray-900 dark:text-white">{scanStatusBar.operations}</span></span>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2">
                        {Object.entries(scanStatusBar.findings).map(([sev, count]) => (
                            count > 0 && (
                                <span
                                    key={sev}
                                    className={`inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded text-xs font-bold text-white ${sev === 'critical' ? 'bg-severity-critical' :
                                            sev === 'high' ? 'bg-severity-high' :
                                                sev === 'medium' ? 'bg-severity-medium' : 'bg-severity-low'
                                        }`}
                                >
                                    {count}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
