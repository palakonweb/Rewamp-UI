import React from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';

// Split button: primary click copies the prompt; the caret opens a small
// menu to copy prompt or code individually.
export default function CopyPageButton({ prompt, code }) {
    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const copy = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setOpen(false);
        setTimeout(() => setCopied(false), 1500);
    };

    if (!prompt && !code) return null;

    return (
        <div className="relative inline-flex select-none">
            <div className="flex items-center rounded-md border border-mist overflow-hidden">
                <button
                    onClick={() => copy(prompt || code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium text-charcoal bg-white hover:bg-mist/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? 'Copied' : 'Copy Prompt'}
                </button>
                <button
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Copy options"
                    aria-expanded={open}
                    className="px-2 py-1.5 border-l border-mist text-charcoal bg-white hover:bg-mist/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                >
                    <ChevronDown size={13} strokeWidth={2} />
                </button>
            </div>

            {open && (
                <div className="absolute top-full mt-1 right-0 w-40 rounded-md border border-mist bg-white shadow-md py-1 z-20">
                    {code && (
                        <button
                            onClick={() => copy(code)}
                            className="w-full text-left px-3 py-1.5 text-[12.5px] text-charcoal hover:bg-mist/15 transition-colors"
                        >
                            Copy code
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
