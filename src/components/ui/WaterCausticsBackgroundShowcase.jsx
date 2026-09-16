import { useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import WaterCaustics from './backgrounds/WaterCaustics';
import { waterCausticsPrompt } from './waterCausticsSource';

const promptContent = waterCausticsPrompt;

export default function WaterCausticsBackgroundShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION — live WaterCaustics (three.js / WebGL) */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#104E63] shadow-2xl">
                <div className="absolute inset-0 z-0">
                    <WaterCaustics
                        speed={0.35}
                        scale={1.0}
                        bloomStrength={0.50}
                        threshold={0.75}
                        exposure={1.05}
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
