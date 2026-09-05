import React from 'react';
import { ChevronRight, Search, X, Home, BookOpen } from 'lucide-react';

// Left sidebar: logo + wordmark, a "Get Started" group, then a searchable
// expandable category -> component tree. Active item is plain white/grey
// chrome with orange used only as the text/icon accent.
export default function Sidebar({ categories, activeSlug, onNavigate, query, onQueryChange, mobileOpen, onCloseMobile }) {
    const [openCategoryId, setOpenCategoryId] = React.useState(() => {
        const owner = categories.find((c) => c.components.some((entry) => entry.slug === activeSlug));
        return owner?.id ?? categories[0]?.id ?? null;
    });

    const trimmedQuery = query.trim().toLowerCase();
    const isSearching = trimmedQuery.length > 0;
    const currentCategory = categories.find((c) => c.components.some((entry) => entry.slug === activeSlug)) || categories[0];

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
                className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-[280px] md:w-[260px] shrink-0 bg-white border-r border-mist flex flex-col transition-transform duration-300 md:translate-x-0 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between gap-2 px-4 pt-6 pb-4 shrink-0">
                    <a href="/components" className="flex items-center gap-2.5 select-none">
                        <img src="/purrform-logo.png" alt="Purrform" className="w-7 h-7 object-contain shrink-0" />
                        <span className="text-[16px] font-display font-bold text-charcoal tracking-wide uppercase">Purrform</span>
                    </a>
                    <button
                        onClick={onCloseMobile}
                        className="md:hidden text-stone hover:text-orange transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange rounded"
                        aria-label="Close menu"
                    >
                        <X size={20} strokeWidth={1.75} />
                    </button>
                </div>

                <div className="mx-4 mb-4 shrink-0 flex items-center gap-2.5 rounded-lg border border-mist px-3 py-2.5 select-none">
                    <span className="flex items-center justify-center w-7 h-7 rounded-md bg-orange/10 text-orange shrink-0 font-mono text-[13px] font-bold">
                        {currentCategory.name.charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-mono font-semibold text-charcoal truncate">{currentCategory.name}</p>
                        <p className="text-[11px] font-mono text-stone truncate">React &middot; Tailwind &middot; Framer Motion</p>
                    </div>
                </div>

                <div className="relative px-4 pb-4 shrink-0">
                    <Search size={15} strokeWidth={1.75} className="absolute left-7 top-1/2 -translate-y-1/2 text-stone pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        placeholder="Search components"
                        className="w-full bg-milk border border-mist rounded-md pl-8 pr-3 py-2 text-[13px] text-charcoal placeholder:text-stone outline-none focus:border-orange transition-colors"
                    />
                </div>

                <nav className="flex-1 overflow-y-auto px-2 pb-6">
                    {!isSearching && (
                        <div className="mb-4">
                            <p className="px-2.5 text-[11px] font-mono font-semibold text-stone uppercase tracking-widest select-none mb-1">
                                Get Started
                            </p>
                            <ul className="flex flex-col gap-0.5">
                                <li>
                                    <a
                                        href="/"
                                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[13px] font-mono text-ink-2 hover:bg-milk hover:text-charcoal transition-colors select-none"
                                    >
                                        <Home size={15} strokeWidth={1.75} />
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/documentation"
                                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[13px] font-mono text-ink-2 hover:bg-milk hover:text-charcoal transition-colors select-none"
                                    >
                                        <BookOpen size={15} strokeWidth={1.75} />
                                        Documentation
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}

                    {!isSearching && (
                        <p className="px-2.5 text-[11px] font-mono font-semibold text-stone uppercase tracking-widest select-none mb-1">
                            Components
                        </p>
                    )}

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
                                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-left text-[13px] font-mono font-medium text-ink-2 hover:bg-milk hover:text-charcoal transition-colors select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                                            aria-expanded={expanded}
                                        >
                                            <Icon size={16} strokeWidth={1.75} className="shrink-0" />
                                            <span className="flex-1 truncate">{cat.name}</span>
                                            <ChevronRight
                                                size={14}
                                                strokeWidth={2}
                                                className={`shrink-0 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
                                            />
                                        </button>
                                        {expanded && (
                                            <ul className="flex flex-col gap-0.5 mt-0.5 mb-1 pl-5 border-l border-mist ml-4">
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

function TreeItem({ entry, active, onClick }) {
    return (
        <li>
            <button
                onClick={onClick}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-[13px] font-mono truncate transition-colors select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                    active ? 'text-orange font-semibold' : 'text-ink-2 hover:bg-mist/10 hover:text-charcoal'
                }`}
            >
                {entry.title}
            </button>
        </li>
    );
}
