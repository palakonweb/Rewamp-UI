import React from 'react';
import AppleNavbar from './AppleNavbar';
import { appleNavbarPrompt } from './appleNavbarSource';

export default function AppleNavbarShowcase() {
    return (
        <div className="w-full flex flex-col gap-4">
            {/* Plain white canvas — just the navbar, no demo chrome */}
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl border border-mist bg-white flex flex-col">
                <div className="absolute top-0 left-0 right-0 z-40 w-full flex justify-center">
                    <AppleNavbar />
                </div>
            </div>

            {/* Hidden prompt tag extracted by usePromptFromDom */}
            <div className="hidden" aria-hidden="true">
                <code>{appleNavbarPrompt}</code>
            </div>
        </div>
    );
}
