import React from 'react';
import { ListTree } from 'lucide-react';

// Right rail: sibling variants within the open category, so people can jump
// between related components without leaving the page. Below ~960px this
// collapses into a "Jump to" dropdown (rendered by DocsShell above the
// center panel instead).
export default function RightRail({ category, activeSlug, onNavigate }) {
    return (
        <aside className="hidden lg:flex flex-col w-[220px] shrink-0 sticky top-0 h-screen overflow-y-auto px-4 py-6 gap-3 border-l border-mist bg-white">
            <p className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-stone uppercase tracking-widest select-none px-2">
                <ListTree size={13} strokeWidth={1.75} />
                In {category.name}
            </p>
            <ul className="flex flex-col gap-0.5">
                {category.components.map((entry) => {
                    const active = entry.slug === activeSlug;
                    return (
                        <li key={entry.slug}>
                            <button
                                onClick={() => onNavigate(entry.slug)}
                                className={`w-full text-left px-2.5 py-1.5 rounded-md text-[12.5px] font-mono truncate transition-colors select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                                    active ? 'text-orange font-semibold' : 'text-ink-2 hover:text-charcoal'
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
        <div className="lg:hidden mb-2">
            <label className="sr-only" htmlFor="jump-to-select">Jump to component</label>
            <select
                id="jump-to-select"
                value={activeSlug}
                onChange={(e) => onNavigate(e.target.value)}
                className="w-full bg-white border border-mist rounded-md px-3 py-2 text-[13px] text-charcoal outline-none focus:border-orange transition-colors"
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
