import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    Radar,
    CalendarClock,
    Bell,
    Settings,
    HelpCircle,
    ChevronRight,
    Menu,
    X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const topNav = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Projects', icon: FolderKanban, path: '#' },
    { label: 'Scans', icon: Radar, path: '/dashboard' },
    { label: 'Schedule', icon: CalendarClock, path: '#' },
];

const bottomNav = [
    { label: 'Notifications', icon: Bell, path: '#' },
    { label: 'Settings', icon: Settings, path: '#' },
    { label: 'Support', icon: HelpCircle, path: '#' },
];

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        if (path === '#') return false;
        if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname.startsWith('/scan');
        return location.pathname === path;
    };

    const NavItem = ({ item }) => {
        const active = isActive(item.path);
        return (
            <NavLink
                to={item.path === '#' ? '#' : item.path}
                onClick={(e) => {
                    if (item.path === '#') e.preventDefault();
                    setMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
          ${active
                        ? 'bg-accent text-white shadow-sm shadow-accent/25'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary hover:text-gray-900 dark:hover:text-gray-200'
                    }
        `}
                aria-current={active ? 'page' : undefined}
            >
                <item.icon size={20} />
                <span>{item.label}</span>
            </NavLink>
        );
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-4 py-5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">aps</span>
            </div>

            {/* Top Navigation */}
            <nav className="flex-1 px-3 space-y-1 mt-2" aria-label="Main navigation">
                {topNav.map(item => (
                    <NavItem key={item.label} item={item} />
                ))}
            </nav>

            {/* Bottom Navigation */}
            <nav className="px-3 space-y-1 mb-4" aria-label="Secondary navigation">
                {bottomNav.map(item => (
                    <NavItem key={item.label} item={item} />
                ))}
            </nav>

            {/* User Profile */}
            <div className="px-3 pb-4">
                <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        A
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@edu.com</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Security Lead</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-surface-dark-secondary shadow-lg border border-surface-light-border dark:border-surface-dark-border"
                aria-label="Open navigation menu"
            >
                <Menu size={22} className="text-gray-700 dark:text-gray-200" />
            </button>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-[220px] shrink-0 bg-white dark:bg-surface-dark-secondary border-r border-surface-light-border dark:border-surface-dark-border h-screen sticky top-0">
                {sidebarContent}
            </aside>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-[260px] bg-white dark:bg-surface-dark-secondary z-50 shadow-2xl"
                        >
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark-tertiary"
                                aria-label="Close navigation menu"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
