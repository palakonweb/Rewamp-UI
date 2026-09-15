import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';

const promptContent = `dark developer card — code types in character-by-character on hover, terminal frame with real syntax highlighting colors, pulsing cursor, copy-to-clipboard chip`;

const SNIPPETS = [
    {
        lang: 'typescript',
        label: 'AI Inference',
        color: '#38bdf8',
        code: [
            { text: 'const ', color: '#c792ea' },
            { text: 'response', color: '#82aaff' },
            { text: ' = await ', color: '#89ddff' },
            { text: 'ai', color: '#ffcb6b' },
            { text: '.stream({\n  ', color: '#89ddff' },
            { text: 'model', color: '#f78c6c' },
            { text: ': ', color: '#89ddff' },
            { text: '"gpt-orbit-4"', color: '#c3e88d' },
            { text: ',\n  ', color: '#89ddff' },
            { text: 'messages', color: '#f78c6c' },
            { text: ': ', color: '#89ddff' },
            { text: 'context', color: '#82aaff' },
            { text: ',\n', color: '#89ddff' },
            { text: '});', color: '#89ddff' },
        ],
    },
    {
        lang: 'css',
        label: 'Glass Effect',
        color: '#a78bfa',
        code: [
            { text: '.glass ', color: '#82aaff' },
            { text: '{\n  ', color: '#89ddff' },
            { text: 'backdrop-filter', color: '#f78c6c' },
            { text: ': ', color: '#89ddff' },
            { text: 'blur(24px)', color: '#c3e88d' },
            { text: ';\n  ', color: '#89ddff' },
            { text: 'background', color: '#f78c6c' },
            { text: ': ', color: '#89ddff' },
            { text: 'rgba(255,255,255,.07)', color: '#c3e88d' },
            { text: ';\n  ', color: '#89ddff' },
            { text: 'border', color: '#f78c6c' },
            { text: ': ', color: '#89ddff' },
            { text: '1px solid rgba(255,255,255,.12)', color: '#c3e88d' },
            { text: ';\n}', color: '#89ddff' },
        ],
    },
    {
        lang: 'bash',
        label: 'Deploy',
        color: '#34d399',
        code: [
            { text: '$ ', color: '#34d399' },
            { text: 'orbit ', color: '#fff' },
            { text: 'deploy ', color: '#c792ea' },
            { text: '--region ', color: '#89ddff' },
            { text: 'edge-all ', color: '#c3e88d' },
            { text: '--scale ', color: '#89ddff' },
            { text: 'auto\n', color: '#c3e88d' },
            { text: '✓ ', color: '#34d399' },
            { text: 'Deploying to 200 nodes...', color: '#ffffff88' },
            { text: '\n✓ ', color: '#34d399' },
            { text: 'Live in ', color: '#ffffff88' },
            { text: '1.2s', color: '#ffcb6b' },
            { text: ' 🚀', color: '#fff' },
        ],
    },
];

function TypedCode({ tokens }) {
    const [visible, setVisible] = useState(0);
    const full = tokens.map(t => t.text).join('');
    const totalChars = full.length;

    useEffect(() => {
        setVisible(0);
        let i = 0;
        const id = setInterval(() => {
            i++;
            setVisible(i);
            if (i >= totalChars) clearInterval(id);
        }, 18);
        return () => clearInterval(id);
    }, [tokens, totalChars]);

    // Reconstruct tokens up to `visible` chars
    let rendered = [];
    let charCount = 0;
    for (const t of tokens) {
        if (charCount >= visible) break;
        const slice = t.text.slice(0, visible - charCount);
        rendered.push({ text: slice, color: t.color });
        charCount += t.text.length;
    }

    return (
        <pre className="text-[12.5px] leading-[1.8] font-mono whitespace-pre-wrap break-words">
            {rendered.map((r, i) => (
                <span key={i} style={{ color: r.color }}>{r.text}</span>
            ))}
            {visible < totalChars && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    style={{ color: '#fff', borderRight: '2px solid #fff', marginLeft: 1 }}
                >
                    &nbsp;
                </motion.span>
            )}
        </pre>
    );
}

export default function MorphingCodeCardShowcase() {
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const snap = SNIPPETS[active];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[560px] rounded-[24px] overflow-hidden bg-[#07070d] border border-white/[0.06] flex items-center justify-center">

                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(56,189,248,0.06) 0%, transparent 65%)' }}
                />

                <div className="relative w-[480px] flex flex-col gap-0">
                    {/* Tab bar */}
                    <div className="flex items-center gap-0 rounded-t-[18px] overflow-hidden"
                        style={{ background: '#0e0e16', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}>
                        {/* Traffic lights */}
                        <div className="flex items-center gap-1.5 px-3 py-3">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        {/* Tabs */}
                        <div className="flex-1 flex">
                            {SNIPPETS.map((s, i) => (
                                <button
                                    key={s.label}
                                    onClick={() => setActive(i)}
                                    className="px-4 py-2.5 text-[11.5px] font-medium transition-all"
                                    style={{
                                        color: active === i ? s.color : 'rgba(255,255,255,0.3)',
                                        borderBottom: active === i ? `1.5px solid ${s.color}` : '1.5px solid transparent',
                                        background: active === i ? `${s.color}08` : 'transparent',
                                    }}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                        <div className="pr-3">
                            <Terminal size={13} className="text-white/20" />
                        </div>
                    </div>

                    {/* Code pane */}
                    <div className="rounded-b-[18px] overflow-hidden"
                        style={{ background: '#090912', border: '1px solid rgba(255,255,255,0.07)', borderTop: 'none' }}>

                        {/* Top beam accent */}
                        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${snap.color}66, transparent)` }} />

                        {/* Line numbers + code */}
                        <div className="flex p-5 gap-4 min-h-[220px]">
                            {/* Gutter */}
                            <div className="flex flex-col gap-0 text-[12.5px] leading-[1.8] font-mono text-white/15 shrink-0 select-none">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <span key={i}>{String(i + 1).padStart(2, ' ')}</span>
                                ))}
                            </div>
                            {/* Code */}
                            <div className="flex-1">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={active}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <TypedCode tokens={snap.code} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Status bar */}
                        <div className="flex items-center justify-between px-5 py-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span className="text-white/25 text-[10px] font-mono uppercase">{snap.lang}</span>
                            </div>
                            <span className="text-white/20 text-[10px] font-mono">orbit://purrform-ui</span>
                        </div>
                    </div>
                </div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Code Card</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono">{promptContent}</code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
