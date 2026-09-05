import React from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import RightRail, { JumpToDropdown } from './RightRail';
import ComponentDetail from './ComponentDetail';
import { categories, readyDetails, findComponentBySlug } from '../docsRegistry';

export default function DocsShell({ slug, onNavigate }) {
    const [query, setQuery] = React.useState('');
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

    const found = slug ? findComponentBySlug(slug) : null;
    const fallback = findComponentBySlug('balloon-contact-button') || { category: categories[1], entry: categories[1].components[0] };
    const { category, entry } = found || fallback;

    React.useEffect(() => {
        if (!found && slug) onNavigate(fallback.entry.slug);
    }, [slug]);

    const handleNavigate = (nextSlug) => {
        onNavigate(nextSlug);
        setMobileNavOpen(false);
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans flex">
            <Sidebar
                categories={categories}
                activeSlug={entry.slug}
                onNavigate={handleNavigate}
                query={query}
                onQueryChange={setQuery}
                mobileOpen={mobileNavOpen}
                onCloseMobile={() => setMobileNavOpen(false)}
            />

            <main className="flex-1 min-w-0 flex flex-col">
                <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-mist sticky top-0 bg-white z-30">
                    <button
                        onClick={() => setMobileNavOpen(true)}
                        className="text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange rounded"
                        aria-label="Open menu"
                    >
                        <Menu size={20} strokeWidth={1.75} />
                    </button>
                    <img src="/purrform-logo.png" alt="Purrform" className="w-6 h-6 object-contain" />
                    <span className="text-[14px] font-semibold text-charcoal">Purrform</span>
                </header>

                <div className="flex-1 px-4 sm:px-8 md:px-10 py-6 sm:py-10">
                    <JumpToDropdown category={category} activeSlug={entry.slug} onNavigate={handleNavigate} />
                    <ComponentDetail category={category} entry={entry} detail={readyDetails[entry.slug]} />
                </div>
            </main>

            <RightRail category={category} activeSlug={entry.slug} onNavigate={handleNavigate} />
        </div>
    );
}
