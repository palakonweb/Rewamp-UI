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
        <div className="w-full h-full flex flex-col gap-6">
            {/* ── Interactive Cursor Preview ── */}
            <PillTrailCursor
                trailLength={16}
                baseSpacing={24}
                maxSpacing={38}
                pillHeight={26}
                fontSize={11.5}
                className="w-full h-full"
            >
                <div
                    className="relative w-full h-full select-none"
                />
            </PillTrailCursor>

            {/* ── Prompt block ── */}
</div>
    );
}
