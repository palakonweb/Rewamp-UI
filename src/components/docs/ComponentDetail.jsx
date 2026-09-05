import React from 'react';
import { SquareStack, Sparkles } from 'lucide-react';
import FitFrame from './FitFrame';
import CopyButton from './CopyButton';

// Reads the prompt straight out of a showcase's own hidden footer <code> tag
// (see .prompt-embed in index.css), so there's no separate copy to keep in
// sync with the component's real generation prompt.
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
    const [tab, setTab] = React.useState('preview');
    const previewRef = React.useRef(null);
    const prompt = usePromptFromDom(previewRef);
    const Component = entry.Component;

    return (
        <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl md:text-[32px] font-display font-bold uppercase text-charcoal tracking-wide">{entry.title}</h1>
                <p className="text-[14px] text-stone max-w-2xl">
                    {detail?.description || `A ${entry.title.toLowerCase()} component, ready to preview, copy, or ship.`}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist/25 text-[12px] font-mono font-medium text-ink-2">
                        <SquareStack size={13} strokeWidth={1.75} className="text-orange" />
                        {category.name}
                    </span>
                    {detail?.code && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist/25 text-[12px] font-mono font-medium text-ink-2">
                            <Sparkles size={13} strokeWidth={1.75} className="text-orange" />
                            Reference implementation
                        </span>
                    )}
                </div>
            </div>

            <div className="w-full border border-mist rounded-xl overflow-hidden bg-white">
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-cream border-b border-mist select-none">
                    <span className="text-[12.5px] font-mono font-medium text-ink-2 truncate">{entry.title}</span>
                    <div className="flex items-center gap-4 shrink-0">
                        <button
                            onClick={() => setTab('code')}
                            className={`text-[12.5px] font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange rounded ${tab === 'code' ? 'text-orange font-semibold' : 'text-stone hover:text-charcoal font-medium'
                                }`}
                        >
                            Code
                        </button>
                        <button
                            onClick={() => setTab('preview')}
                            className={`text-[12.5px] font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange rounded ${tab === 'preview' ? 'text-orange font-semibold' : 'text-stone hover:text-charcoal font-medium'
                                }`}
                        >
                            Preview
                        </button>
                    </div>
                </div>

                <div className="w-full min-h-[280px] p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                    {tab === 'preview' ? (
                        <div ref={previewRef} className="w-full">
                            <FitFrame>
                                <Component />
                            </FitFrame>
                        </div>
                    ) : (
                        <div className="w-full max-h-[420px] overflow-auto rounded-lg bg-charcoal -m-6 sm:-m-8">
                            {detail?.code ? (
                                <pre className="p-4 text-[12.5px] leading-relaxed text-milk font-mono whitespace-pre">
                                    <code>{detail.code}</code>
                                </pre>
                            ) : (
                                <p className="p-6 text-[13px] text-mist">
                                    This component hasn't been migrated to the new code-block format yet — it's still in
                                    the original catalog behind the scenes. Check back soon.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white border border-mist p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-mono font-semibold text-stone uppercase tracking-widest select-none">Prompt</p>
                        {prompt && <CopyButton text={prompt} label="Copy prompt" />}
                    </div>
                    <p className="text-[13px] text-charcoal font-mono leading-relaxed whitespace-pre-wrap">
                        {prompt || 'No prompt captured for this component yet.'}
                    </p>
                </div>
                <div className="rounded-lg bg-white border border-mist p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-mono font-semibold text-stone uppercase tracking-widest select-none">Code</p>
                        {detail?.code && <CopyButton text={detail.code} label="Copy code" />}
                    </div>
                    <p className="text-[13px] text-charcoal leading-relaxed">
                        {detail?.code
                            ? 'Full source for this component — copy it straight into your project.'
                            : 'Source snapshot not migrated yet for this component.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
