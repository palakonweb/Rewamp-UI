import { useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import LayeredPaperWaves from './backgrounds/LayeredPaperWaves';
import { layeredPaperWavesPrompt } from './layeredPaperWavesSource';

const promptContent = layeredPaperWavesPrompt;

export default function LayeredPaperWavesBackgroundShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION - live LayeredPaperWaves (three.js / WebGL) */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#D9EBF9] shadow-2xl">
                <div className="absolute inset-0 z-0">
                    <LayeredPaperWaves
                        speed={0.40}
                        scale={1.0}
                        amplitude={1.0}
                    />
                </div>
                <BackgroundHeroOverlay isLight={true} />
            </div>

            {/* PROMPT CARD */}
<p className="text-[11px] text-black/40 dark:text-white/40 text-center -mt-2">
                Requires the <code className="font-mono">three</code> package.
            </p>
        </div>
    );
}
