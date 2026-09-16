import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import PillTrailCursor from './PillTrailCursor';
import { pillTrailPrompt } from './pillTrailSource';

export default function PillTrailCursorShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(pillTrailPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* ── Interactive White Canvas Preview (matching reference video Recording 2026-09-13 170458.mp4) ── */}
            <PillTrailCursor
                trailLength={16}
                baseSpacing={24}
                maxSpacing={38}
                pillHeight={26}
                fontSize={11.5}
                className="w-full rounded-[24px] border border-black/10 dark:border-white/10 shadow-xs overflow-hidden"
                style={{ background: '#ffffff' }}
            >
                <div
                    className="relative w-full select-none"
                    style={{
                        minHeight: '520px',
                        background: '#ffffff',
                    }}
                />
            </PillTrailCursor>

            {/* ── Prompt block ── */}
</div>
    );
}
