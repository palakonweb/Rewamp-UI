import { useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import PixelCloud from './backgrounds/PixelCloud';
import { pixelCloudPrompt } from './pixelCloudSource';

const promptContent = pixelCloudPrompt;

export default function PixelCloudBackgroundShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION - live PixelCloud (three.js / WebGL) */}
            <div className="relative w-full flex-1 min-h-0 rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#3876ba] shadow-2xl">
                <div className="absolute inset-0 z-0">
                    <PixelCloud
                        cloudColor="#fbf8f2"
                        skyTopColor="#3876ba"
                        skyBottomColor="#8cbfe8"
                        speed={1}
                        count={6}
                        pixelSize={6}
                    />
                </div>
                <BackgroundHeroOverlay />
            </div>

            {/* PROMPT CARD */}
<p className="text-[11px] text-black/40 dark:text-white/40 text-center -mt-2">
                Requires the <code className="font-mono">three</code> package.
            </p>
        </div>
    );
}
