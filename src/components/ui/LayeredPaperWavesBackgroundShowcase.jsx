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
            {/* PREVIEW SECTION — live LayeredPaperWaves (three.js / WebGL) */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#D9EBF9] shadow-2xl">
                <div className="absolute inset-0 z-0">
                    <LayeredPaperWaves
                        speed={0.40}
                        scale={1.0}
                        amplitude={1.0}
                    />
                </div>
                <BackgroundHeroOverlay title="Layered paper waves to enhance your UI" />
            </div>

            {/* PROMPT CARD */}
            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 dark:border-white/10">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold">Exact Prompt</p>
                    <motion.button
                        onClick={handleCopy}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent dark:border-white/5 transition-all"
                        aria-label="Copy prompt text"
                    >
                        {copied ? (
                            <>
                                <Check size={14} className="text-emerald-500" />
                                <span className="text-[12px] font-medium text-emerald-500">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy size={14} className="text-black/60 dark:text-white/60" />
                                <span className="text-[12px] font-medium text-black/70 dark:text-white/70">Copy</span>
                            </>
                        )}
                    </motion.button>
                </div>
                <p className="text-[13px] leading-relaxed text-black/80 dark:text-white/80 font-mono p-5 whitespace-pre-wrap max-h-[220px] overflow-y-auto">
                    {promptContent}
                </p>
            </div>

            <p className="text-[11px] text-black/40 dark:text-white/40 text-center -mt-2">
                Requires the <code className="font-mono">three</code> package.
            </p>
        </div>
    );
}
