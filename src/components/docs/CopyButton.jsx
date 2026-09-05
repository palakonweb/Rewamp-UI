import React from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ text, label = 'Copy' }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-mono font-semibold transition-colors cursor-pointer select-none border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                copied
                    ? 'bg-success/10 border-success/30 text-success'
                    : 'bg-milk border-mist text-charcoal hover:border-orange/50 hover:text-orange'
            }`}
        >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : label}
        </button>
    );
}
