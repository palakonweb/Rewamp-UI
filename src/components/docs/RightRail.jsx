import React from 'react';
import { motion } from 'framer-motion';
import { ListTree } from 'lucide-react';

// Right rail: "Similar Components" — sibling components within the open
// category, with the same sliding dot + connector line as the sidebar, so
// people can jump between related components without leaving the page.
export default function RightRail({ category, activeSlug, onNavigate }) {
    return (
        <aside className="hidden lg:flex flex-col w-[220px] shrink-0 sticky top-0 h-screen overflow-y-auto pt-10 sm:pt-14 pb-12 px-6 gap-3 border-l border-mist bg-white no-scrollbar">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-stone uppercase tracking-widest select-none px-2">
                <ListTree size={13} strokeWidth={1.75} />
                Similar Components
            </p>
            <ul className="relative flex flex-col gap-1 mt-1 ml-2 pl-4 border-l-2 border-mist">
                {category.components.map((entry) => {
                    const active = entry.slug === activeSlug;
                    return (
                        <li key={entry.slug} className="relative">
                            {active && (
                                <motion.span
                                    layoutId="rail-active-dot"
                                    transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                                    className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange"
                                />
                            )}
                            <button
                                onClick={() => onNavigate(entry.slug)}
                                className={`w-full text-left px-2 py-1 rounded text-[12.5px] truncate transition-colors duration-300 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal ${
                                    active ? 'text-charcoal font-semibold' : 'text-ink-2 hover:text-charcoal'
                                }`}
                            >
                                {entry.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}

export function JumpToDropdown({ category, activeSlug, onNavigate }) {
    return (
        <div className="lg:hidden mb-4">
            <label className="sr-only" htmlFor="jump-to-select">Jump to component</label>
            <select
                id="jump-to-select"
                value={activeSlug}
                onChange={(e) => onNavigate(e.target.value)}
                className="w-full bg-white border border-mist rounded-md px-3 py-2 text-[13px] text-charcoal outline-none focus:border-charcoal transition-colors"
            >
                {category.components.map((entry) => (
                    <option key={entry.slug} value={entry.slug}>
                        {entry.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
