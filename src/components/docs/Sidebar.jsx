import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search, X } from 'lucide-react';

// Left sidebar: white background, logo, search, and an expandable category
// tree. Monochrome — white/grey/black only, no color accents.
export default function Sidebar({ categories, activeSlug, onNavigate, query, onQueryChange, mobileOpen, onCloseMobile }) {
    const [openCategoryId, setOpenCategoryId] = React.useState(() => {
        const owner = categories.find((c) => c.components.some((entry) => entry.slug === activeSlug));
        return owner?.id ?? categories[0]?.id ?? null;
    });

    const trimmedQuery = query.trim().toLowerCase();
    const isSearching = trimmedQuery.length > 0;

    const totalComponents = React.useMemo(() => {
        return categories.reduce((sum, cat) => sum + (cat.components?.length || 0), 0);
    }, [categories]);

    const matchingCount = React.useMemo(() => {
        if (!isSearching) return totalComponents;
        return categories.reduce((sum, cat) => {
            return sum + cat.components.filter((entry) => entry.title.toLowerCase().includes(trimmedQuery)).length;
        }, 0);
    }, [categories, isSearching, trimmedQuery, totalComponents]);

    return (
        <>
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-charcoal/40 z-40 md:hidden"
                    onClick={onCloseMobile}
                    aria-hidden="true"
                />
            )}
            <aside
                className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-[280px] md:w-[260px] shrink-0 bg-[#F9FAFB] border-r border-mist flex flex-col transition-transform duration-300 md:translate-x-0 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between gap-2 px-5 pt-6 pb-5 shrink-0">
                    <a href="/components" className="flex items-center gap-2.5 select-none">
                        <img src="/logo.svg" alt="RewampUI" className="w-7 h-7 object-contain shrink-0" />
                        <span className="text-[15px] font-heading font-bold text-charcoal tracking-wide uppercase">RewampUI</span>
                    </a>
                    <button
                        onClick={onCloseMobile}
                        className="md:hidden text-stone hover:text-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal rounded"
                        aria-label="Close menu"
                    >
                        <X size={20} strokeWidth={1.75} />
                    </button>
                </div>

                <div className="px-5 pb-4 shrink-0">
                    <div className="relative">
                        <Search size={15} strokeWidth={1.75} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => onQueryChange(e.target.value)}
                            placeholder="Search components"
                            className="w-full bg-white border border-mist rounded-full pl-9 pr-3 py-2 text-[13px] text-charcoal placeholder:text-stone outline-none focus:border-charcoal transition-colors"
                        />
                    </div>
                    <div className="flex items-center justify-between pt-2 px-1 text-[11.5px] font-medium text-stone select-none">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                            <span>{isSearching ? 'Matching' : 'Total Components'}</span>
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-charcoal bg-sand/60 px-2 py-0.5 rounded-full border border-mist/70">
                            {isSearching ? `${matchingCount} / ${totalComponents}` : totalComponents}
                        </span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 pb-6 no-scrollbar">
                    <p className="px-2.5 text-[15px] font-heading font-bold text-charcoal select-none mb-2">
                        Components
                    </p>

                    {isSearching ? (
                        <ul className="flex flex-col gap-0.5">
                            {categories.flatMap((cat) =>
                                cat.components
                                    .filter((entry) => entry.title.toLowerCase().includes(trimmedQuery))
                                    .map((entry) => (
                                        <TreeItem
                                            key={entry.slug}
                                            entry={entry}
                                            active={entry.slug === activeSlug}
                                            onClick={() => onNavigate(entry.slug)}
                                        />
                                    ))
                            )}
                        </ul>
                    ) : (
                        <ul className="flex flex-col gap-1">
                            {categories.map((cat) => {
                                const expanded = openCategoryId === cat.id;
                                const Icon = cat.icon;
                                return (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => setOpenCategoryId(expanded ? null : cat.id)}
                                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-left text-[14px] font-normal text-charcoal hover:bg-mist/20 transition-colors duration-300 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                                            aria-expanded={expanded}
                                        >
                                            <DuotoneIcon icon={Icon} />
                                            <span className="flex-1 truncate">{cat.name}</span>
                                            <ChevronRight
                                                size={14}
                                                strokeWidth={2}
                                                className={`shrink-0 transition-transform duration-300 ease-out ${expanded ? 'rotate-90' : ''}`}
                                            />
                                        </button>
                                        {expanded && (
                                            <ul className="relative flex flex-col gap-1 mt-1 mb-2 ml-[19px] pl-4 border-l-2 border-mist">
                                                {cat.components.map((entry) => (
                                                    <TreeItem
                                                        key={entry.slug}
                                                        entry={entry}
                                                        active={entry.slug === activeSlug}
                                                        onClick={() => onNavigate(entry.slug)}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </nav>
            </aside>
        </>
    );
}

// Faux-duotone: a soft grey backdrop copy of the icon offset behind a solid
// charcoal copy on top, giving two-tone depth without introducing color.
function DuotoneIcon({ icon: Icon, size = 16 }) {
    return (
        <span className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
            <Icon
                size={size}
                strokeWidth={1.75}
                className="absolute text-mist"
                style={{ transform: 'translate(1.5px, 1.5px)' }}
            />
            <Icon size={size} strokeWidth={1.75} className="relative text-charcoal" />
        </span>
    );
}

function TreeItem({ entry, active, onClick }) {
    return (
        <li className="relative">
            {active && (
                <motion.span
                    layoutId="sidebar-active-dot"
                    transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                    className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange"
                />
            )}
            <button
                onClick={onClick}
                className={`w-full text-left px-2 py-1 rounded text-[13.5px] truncate transition-colors duration-300 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal ${
                    active ? 'bg-mist/25 text-charcoal font-semibold' : 'text-ink-2 hover:text-charcoal'
                }`}
            >
                {entry.title}
            </button>
        </li>
    );
}
