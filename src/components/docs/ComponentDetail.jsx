import React from 'react';
import { Copy, Check, Sparkles, Code2 } from 'lucide-react';
import PreviewCard from './PreviewCard';
import CopyPageButton from './CopyPageButton';
import { highlightJs } from './highlightCode';

function usePromptFromDom(ref) {
    const [prompt, setPrompt] = React.useState(null);
    React.useEffect(() => {
        const codeEls = ref.current?.querySelectorAll('code');
        const last = codeEls && codeEls.length ? codeEls[codeEls.length - 1] : null;
        setPrompt(last?.textContent?.trim() || null);
    }, [ref]);
    return prompt;
}

export default function ComponentDetail({ category, entry, detail }) {
    const previewRef = React.useRef(null);
    const domPrompt = usePromptFromDom(previewRef);
    const effectivePrompt = detail?.prompt || domPrompt;

    const [copiedPrompt, setCopiedPrompt] = React.useState(false);
    const [copiedCode, setCopiedCode] = React.useState(false);

    const handleCopyPrompt = () => {
        if (!effectivePrompt) return;
        navigator.clipboard.writeText(effectivePrompt);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 1500);
    };

    const handleCopyCode = () => {
        if (!detail?.code) return;
        navigator.clipboard.writeText(detail.code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 1500);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-[760px]">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <h1 className="text-[26px] md:text-[30px] font-heading font-bold text-charcoal tracking-tight">
                            {entry.title}
                        </h1>
                        {detail?.techStack && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange/10 text-orange border border-orange/20">
                                {detail.techStack}
                            </span>
                        )}
                    </div>
                    <p className="text-[14px] text-stone">
                        {detail?.description || `A ${entry.title.toLowerCase()} component, ready to preview, copy, or ship.`}
                    </p>
                </div>
                <CopyPageButton prompt={effectivePrompt} code={detail?.code} />
            </div>

            <p className="text-[13px] font-medium text-stone">{category.name}</p>

            {/* Live Preview Card */}
            <PreviewCard
                title={entry.title}
                Component={entry.Component}
                code={detail?.code}
                previewRef={previewRef}
                preserveBg={category.id === 'bgs'}
            />

            {/* Prompt Block — Sand background, own Copy button per AGENTS.md */}
            <div className="rounded-xl bg-sand/65 border border-mist p-4 sm:p-5 flex flex-col gap-3 transition-colors">
                <div className="flex items-center justify-between gap-2 select-none">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-charcoal uppercase tracking-wider">
                        <Sparkles size={13} className="text-orange" />
                        <span>Prompt</span>
                    </div>

                    {effectivePrompt && (
                        <button
                            onClick={handleCopyPrompt}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[12px] font-medium bg-white/80 hover:bg-white text-charcoal border border-mist/80 shadow-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                            aria-label="Copy prompt"
                        >
                            {copiedPrompt ? (
                                <>
                                    <Check size={13} className="text-emerald-600" />
                                    <span className="text-emerald-700 font-semibold">Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={13} className="text-stone" />
                                    <span>Copy prompt</span>
                                </>
                            )}
                        </button>
                    )}
                </div>

                <p className="text-[13px] text-charcoal font-mono leading-relaxed whitespace-pre-wrap selection:bg-orange/20">
                    {effectivePrompt || 'No prompt captured for this component yet.'}
                </p>
            </div>

            {/* Code Block — Own Copy button & Tech Stack badge per AGENTS.md */}
            <div className="rounded-xl bg-white border border-mist overflow-hidden shadow-xs">
                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-cream border-b border-mist select-none">
                    <div className="flex items-center gap-2">
                        <Code2 size={15} className="text-stone" />
                        <span className="text-[12px] font-bold text-charcoal uppercase tracking-wider">Source Code</span>
                        {detail?.techStack && (
                            <span className="text-[11px] font-medium text-stone ml-1">
                                ({detail.techStack})
                            </span>
                        )}
                    </div>

                    {detail?.code && (
                        <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[12px] font-medium bg-white hover:bg-mist/20 text-charcoal border border-mist shadow-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                            aria-label="Copy code"
                        >
                            {copiedCode ? (
                                <>
                                    <Check size={13} className="text-emerald-600" />
                                    <span className="text-emerald-700 font-semibold">Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={13} className="text-stone" />
                                    <span>Copy code</span>
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="w-full max-h-[440px] overflow-auto bg-white">
                    {detail?.code ? (
                        <pre className="p-4 sm:p-5 text-[12.5px] leading-relaxed font-mono whitespace-pre text-charcoal selection:bg-orange/20">
                            <code>{highlightJs(detail.code)}</code>
                        </pre>
                    ) : (
                        <p className="p-6 text-[13px] text-stone">
                            This component's source block is being prepared. Preview is live above.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
