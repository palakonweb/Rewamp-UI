// perf: code-split suspense boundary with CardSkeleton and isolated ErrorBoundary
import React, { Suspense } from 'react';
import { RefreshCw, Copy, Check, SquareStack } from 'lucide-react';
import FitFrame from './FitFrame';
import { highlightJs } from './highlightCode';
import ErrorBoundary from '../ui/ErrorBoundary';
import { CardSkeleton } from '../ui/Skeleton';

// Unified preview/code card: header has an icon+title on the left, a reset
// (remount) button and Code/Preview tabs on the right. The code view gets a
// small inline copy icon and a lightweight regex-based syntax highlight.
export default function PreviewCard({ title, Component, code, previewRef, preserveBg = false }) {
    const [tab, setTab] = React.useState('preview');
    const [resetKey, setResetKey] = React.useState(0);
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        if (!code) return;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="w-full rounded-lg border border-mist bg-white overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-mist/10 border-b border-mist select-none">
                <div className="flex items-center gap-2 text-[13px] font-medium text-charcoal truncate">
                    <SquareStack size={14} strokeWidth={1.75} className="text-stone shrink-0" />
                    <span className="truncate">{title}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    <button
                        onClick={() => setResetKey((k) => k + 1)}
                        aria-label="Reset preview"
                        className="text-stone hover:text-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal rounded"
                    >
                        <RefreshCw size={13} strokeWidth={1.75} />
                    </button>
                    <button
                        onClick={() => setTab('code')}
                        className={`text-[12.5px] pb-0.5 border-b-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal rounded ${tab === 'code' ? 'text-charcoal font-semibold border-charcoal' : 'text-stone border-transparent hover:text-charcoal'
                            }`}
                    >
                        Code
                    </button>
                    <button
                        onClick={() => setTab('preview')}
                        className={`text-[12.5px] pb-0.5 border-b-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal rounded ${tab === 'preview' ? 'text-charcoal font-semibold border-charcoal' : 'text-stone border-transparent hover:text-charcoal'
                            }`}
                    >
                        Preview
                    </button>
                </div>
            </div>

            <div className="relative">
                {tab === 'code' && code && (
                    <button
                        onClick={handleCopy}
                        aria-label="Copy code"
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-white border border-mist text-stone hover:text-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                )}

                {tab === 'preview' ? (
                    <div ref={previewRef} className="w-full min-h-[220px] p-4 sm:p-6 flex items-center justify-center overflow-auto">
                        <FitFrame key={resetKey} preserveBg={preserveBg}>
                            <ErrorBoundary>
                                <Suspense fallback={<CardSkeleton />}>
                                    <div className="animate-component-fade-in w-full flex items-center justify-center">
                                        <Component />
                                    </div>
                                </Suspense>
                            </ErrorBoundary>
                        </FitFrame>
                    </div>
                ) : (
                    <div className="w-full max-h-[420px] overflow-auto">
                        {code ? (
                            <pre className="p-4 pr-12 text-[12.5px] leading-relaxed font-mono whitespace-pre text-charcoal">
                                <code>{highlightJs(code)}</code>
                            </pre>
                        ) : (
                            <p className="p-6 text-[13px] text-stone">
                                This component hasn't been migrated to the new code-block format yet — it's still in the
                                original catalog behind the scenes. Check back soon.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
