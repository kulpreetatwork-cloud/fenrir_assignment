export function SkeletonLine({ className = '' }) {
    return (
        <div className={`h-4 bg-gray-200 dark:bg-surface-dark-tertiary rounded animate-pulse ${className}`} />
    );
}

export function SkeletonCard({ className = '' }) {
    return (
        <div className={`rounded-xl border border-surface-light-border dark:border-surface-dark-border p-6 ${className}`}>
            <SkeletonLine className="w-1/3 mb-4" />
            <SkeletonLine className="w-2/3 mb-2" />
            <SkeletonLine className="w-1/2" />
        </div>
    );
}

export function SkeletonTable({ rows = 5 }) {
    return (
        <div className="space-y-3">
            <div className="flex gap-4 px-4 py-3">
                <SkeletonLine className="w-1/4" />
                <SkeletonLine className="w-1/6" />
                <SkeletonLine className="w-1/6" />
                <SkeletonLine className="w-1/4" />
                <SkeletonLine className="w-1/6" />
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 px-4 py-4 border-t border-surface-light-border dark:border-surface-dark-border">
                    <SkeletonLine className="w-1/4" />
                    <SkeletonLine className="w-1/6" />
                    <SkeletonLine className="w-1/6" />
                    <SkeletonLine className="w-1/4" />
                    <SkeletonLine className="w-1/6" />
                </div>
            ))}
        </div>
    );
}
