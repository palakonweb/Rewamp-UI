import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import {
    Paperclip,
    LayoutGrid,
    CircleDashed,
    PenLine,
    Sparkles,
    AudioLines,
    Loader2,
    FileUp,
    ImageUp,
    FolderUp,
} from 'lucide-react';

const SPRING = { type: 'spring', stiffness: 380, damping: 32 };
const POPOVER_SPRING = { type: 'spring', stiffness: 420, damping: 34 };

const attachOptions = [
    { id: 'file', icon: FileUp, label: 'Upload file' },
    { id: 'image', icon: ImageUp, label: 'Upload image' },
    { id: 'drive', icon: FolderUp, label: 'Add from Drive' },
];

// Generic icon substitutes for each integration, not literal logo
// reproductions: four-square grid for Slack, a dashed circle for Figma
// (its own mark is a ring of circles), a pencil for VS Code.
const CONNECTORS = [
    { id: 'slack', icon: LayoutGrid, label: 'Slack', color: '#6B3FA0' },
    { id: 'figma', icon: CircleDashed, label: 'Figma', color: '#A259FF' },
    { id: 'vscode', icon: PenLine, label: 'VS Code', color: '#2680C2' },
];

function ConnectorIcon({ connector, status, onClick }) {
    const Icon = connector.icon;
    const color = status === 'connected' ? connector.color : status === 'connecting' ? '#9A9A9A' : '#C9C9C9';

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`${status === 'connected' ? 'Disconnect' : 'Connect'} ${connector.label}`}
            className="relative h-7 w-7 flex items-center justify-center rounded-full cursor-pointer"
        >
            {status === 'connecting' && (
                <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1.5px solid ${connector.color}` }}
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
                />
            )}
            <motion.span
                animate={status === 'connecting' ? { rotate: 360 } : { rotate: 0 }}
                transition={
                    status === 'connecting'
                        ? { duration: 0.9, repeat: Infinity, ease: 'linear' }
                        : { type: 'spring', stiffness: 400, damping: 24 }
                }
                className="flex"
            >
                <Icon size={14} strokeWidth={2} style={{ color }} />
            </motion.span>
            {status === 'connected' && (
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: connector.color }}
                />
            )}
        </button>
    );
}

const EFFORT_LEVELS = ['Low', 'Medium', 'High'];
const EFFORT_DESCRIPTIONS = ['Fastest', 'Balanced', 'Most capable, slowest'];
// Sparkle intensity scales with the selected level - bigger icon, more
// glow, and (at High only) two extra sparkle flecks pop in around it.
const SPARKLE_SCALE = [0.8, 1, 1.25];
const THUMB_SIZE = 48;

// Equalizer-style bar icon inside the slider thumb - bars fill in dark as
// the level rises, matching the reference.
function LevelBars({ level }) {
    const heights = [7, 11, 15];
    return (
        <div className="flex items-end gap-[3px]">
            {heights.map((h, i) => (
                <span
                    key={i}
                    className="w-[3px] rounded-sm"
                    style={{ height: h, backgroundColor: i <= level ? '#171717' : '#D4D4D4' }}
                />
            ))}
        </div>
    );
}

// Draggable thumb on a dark track with a glowing, grain-textured plasma
// trail filling in behind it - snaps to the nearest of the three levels on
// release.
function EffortSlider({ level, onChange }) {
    const trackRef = useRef(null);
    const [travel, setTravel] = useState(0);
    const x = useMotionValue(0);

    useEffect(() => {
        if (trackRef.current) {
            setTravel(trackRef.current.offsetWidth - THUMB_SIZE);
        }
    }, []);

    useEffect(() => {
        if (travel > 0) {
            x.set((level / (EFFORT_LEVELS.length - 1)) * travel);
        }
        // Only re-sync from the level prop (e.g. on first measure) - drags
        // manage x themselves until released.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [travel]);

    const handleDragEnd = () => {
        if (travel <= 0) return;
        const pct = x.get() / travel;
        const nearest = Math.round(pct * (EFFORT_LEVELS.length - 1));
        const target = (nearest / (EFFORT_LEVELS.length - 1)) * travel;
        animate(x, target, { type: 'spring', stiffness: 420, damping: 34 });
        onChange(nearest);
    };

    const fillWidth = useTransform(x, (v) => v + THUMB_SIZE / 2);

    return (
        <div
            ref={trackRef}
            className="relative h-12 rounded-full overflow-hidden select-none"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-white/25" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-white/25" />

            {/* Glowing plasma trail behind the thumb */}
            <motion.div className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none" style={{ width: fillWidth }}>
                <motion.div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(45% 160% at 100% 50%, rgba(120,255,221,0.65), transparent 70%)' }}
                    animate={{ opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <svg className="absolute inset-0 w-full h-full mix-blend-screen opacity-50" aria-hidden="true">
                    <filter id="effort-plasma-grain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.25" numOctaves="2" seed="7" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.35  0 0 0 0 1  0 0 0 0 0.85  0 0 0 0.55 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#effort-plasma-grain)" />
                </svg>
            </motion.div>

            {/* Draggable thumb */}
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: travel }}
                dragElastic={0}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x, width: THUMB_SIZE, height: THUMB_SIZE }}
                className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_6px_18px_-4px_rgba(255,255,255,0.45)] flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
                <LevelBars level={level} />
            </motion.div>
        </div>
    );
}

function EffortSparkle({ level }) {
    return (
        <span className="relative inline-flex items-center justify-center">
            {level === 2 && (
                <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: 'rgba(250, 204, 21, 0.35)', filter: 'blur(6px)' }}
                    animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}
            <motion.span
                animate={{ scale: SPARKLE_SCALE[level] }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                className="relative"
            >
                <Sparkles size={14} strokeWidth={2} className={level === 2 ? 'text-amber-500' : 'text-neutral-800'} />
            </motion.span>
            <AnimatePresence>
                {level === 2 && (
                    <>
                        <motion.span
                            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                            animate={{ opacity: 1, scale: 1, x: 7, y: -6 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: 0.05, type: 'spring', stiffness: 400, damping: 18 }}
                            className="absolute text-amber-400"
                        >
                            <Sparkles size={7} strokeWidth={2.5} />
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                            animate={{ opacity: 1, scale: 1, x: -8, y: 5 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 18 }}
                            className="absolute text-amber-400"
                        >
                            <Sparkles size={6} strokeWidth={2.5} />
                        </motion.span>
                    </>
                )}
            </AnimatePresence>
        </span>
    );
}

// Popovers in this component open DOWNWARD (below their trigger) - both the
// attach menu and this one - since opening upward was getting clipped by
// the showcase frame's top edge.
function ModelEffortButton() {
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(1);

    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className="flex items-center gap-1.5 h-9 px-3 rounded-full border border-neutral-200 cursor-pointer">
                <EffortSparkle level={level} />
                <span className="text-[13px] font-medium text-neutral-800">{EFFORT_LEVELS[level]}</span>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: -6, transition: { duration: 0.12 } }}
                        transition={POPOVER_SPRING}
                        style={{ originY: 0 }}
                        className="absolute top-full left-0 mt-3 w-56 z-20"
                    >
                        <div className="absolute left-6 bottom-full -mb-1.5 h-2.5 w-2.5 rotate-45 bg-white shadow-[2px_2px_3px_-1px_rgba(0,0,0,0.08)]" />
                        <div className="rounded-2xl bg-white shadow-[0_16px_32px_-12px_rgba(0,0,0,0.25)] p-3">
                            <div className="flex items-center justify-between px-1 pb-2">
                                <p className="text-[12px] font-medium text-neutral-400">Thinking effort</p>
                                <p className="text-[12px] font-semibold text-neutral-700">{EFFORT_LEVELS[level]}</p>
                            </div>
                            <EffortSlider level={level} onChange={setLevel} />
                            <div className="flex items-center justify-center gap-2 pt-3">
                                <EffortSparkle level={level} />
                                <span className="text-[13px] font-medium text-neutral-600">{EFFORT_DESCRIPTIONS[level]}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function AttachButton() {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                type="button"
                aria-label="Attachments"
                className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-700 cursor-pointer"
            >
                <Paperclip size={15} strokeWidth={2} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: -6, transition: { duration: 0.12 } }}
                        transition={POPOVER_SPRING}
                        style={{ originY: 0 }}
                        className="absolute top-full left-0 mt-3 w-44 z-20"
                    >
                        <div className="absolute left-6 bottom-full -mb-1.5 h-2.5 w-2.5 rotate-45 bg-white shadow-[2px_2px_3px_-1px_rgba(0,0,0,0.08)]" />
                        <div className="rounded-xl bg-white shadow-[0_16px_32px_-12px_rgba(0,0,0,0.25)] p-1.5">
                            {attachOptions.map((option) => {
                                const OptionIcon = option.icon;
                                return (
                                    <div
                                        key={option.id}
                                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors"
                                    >
                                        <OptionIcon size={15} strokeWidth={2} className="text-neutral-400 shrink-0" />
                                        {option.label}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AIPromptStatusInputShowcase() {
    const [value, setValue] = useState('');
    const [generating, setGenerating] = useState(false);
    const textareaRef = useRef(null);

    // Connector state lives here (not inside ConnectorIcon) so clicking an
    // unconnected icon can show a "Please connect your X" banner above the
    // input - the same banner shape for all three integrations, not just
    // Slack - before running the per-icon connecting animation.
    const [connectBanner, setConnectBanner] = useState(null);
    const [connectingId, setConnectingId] = useState(null);
    const [connectedIds, setConnectedIds] = useState([]);

    const handleConnectorClick = (connector) => {
        if (connectedIds.includes(connector.id)) {
            setConnectedIds((ids) => ids.filter((id) => id !== connector.id));
            return;
        }
        if (connectingId) return;
        setConnectBanner(connector);
    };

    const handleConnect = () => {
        if (!connectBanner) return;
        const id = connectBanner.id;
        setConnectBanner(null);
        setConnectingId(id);
        setTimeout(() => {
            setConnectingId(null);
            setConnectedIds((ids) => [...ids, id]);
        }, 900);
    };

    const handleSend = () => {
        if (generating || !value.trim()) return;
        setGenerating(true);
        setValue('');
        // No real backend behind this demo - the "thinking" state just runs
        // for a beat and then clears, standing in for a finished answer.
        setTimeout(() => setGenerating(false), 2400);
    };

    const showFrame = generating || Boolean(connectBanner);
    const BannerIcon = connectBanner?.icon;

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="w-full max-w-lg">
                <div
                    className="rounded-[26px] overflow-hidden"
                    style={{
                        backgroundColor: showFrame ? '#F3F3F2' : 'transparent',
                        boxShadow: showFrame ? '0 20px 44px -18px rgba(0,0,0,0.14)' : 'none',
                    }}
                >
                    {/* Connect banner - above the input, generalized to
                        whichever connector was just clicked. */}
                    <AnimatePresence initial={false}>
                        {connectBanner && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={SPRING}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="flex items-center gap-2 text-[14px] font-medium text-neutral-700">
                                        {BannerIcon && <BannerIcon size={16} strokeWidth={2.25} style={{ color: connectBanner.color }} />}
                                        Please connect your {connectBanner.label}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleConnect}
                                        className="h-8 px-4 rounded-full bg-neutral-900 text-white text-[13px] font-semibold cursor-pointer"
                                    >
                                        Connect
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* The input card itself */}
                    <div
                        className="relative m-1.5 rounded-[22px] bg-white pt-5"
                        style={{
                            boxShadow: showFrame
                                ? '0 6px 16px -8px rgba(0,0,0,0.12)'
                                : '0 20px 44px -18px rgba(0,0,0,0.14)',
                        }}
                    >
                        <div className="px-5 pb-6 min-h-[28px]">
                            {generating ? (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-[17px] text-neutral-400"
                                >
                                    Hold on, we&rsquo;re generating your answer&hellip;
                                </motion.p>
                            ) : (
                                <textarea
                                    ref={textareaRef}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Ask something&hellip;"
                                    rows={1}
                                    className="w-full resize-none bg-transparent outline-none text-[17px] text-neutral-900 placeholder:text-neutral-400"
                                />
                            )}
                        </div>

                        <div className="flex items-center justify-between px-5 pb-4">
                            <div className="flex items-center gap-1.5">
                                <AttachButton />
                                <div className="flex items-center gap-1 h-9 px-1.5 rounded-full border border-neutral-200">
                                    {CONNECTORS.map((connector) => (
                                        <ConnectorIcon
                                            key={connector.id}
                                            connector={connector}
                                            status={
                                                connectingId === connector.id
                                                    ? 'connecting'
                                                    : connectedIds.includes(connector.id)
                                                      ? 'connected'
                                                      : 'idle'
                                            }
                                            onClick={() => handleConnectorClick(connector)}
                                        />
                                    ))}
                                </div>
                                <ModelEffortButton />
                            </div>
                            <motion.button
                                type="button"
                                onClick={handleSend}
                                disabled={!value.trim()}
                                whileTap={value.trim() ? { scale: 0.9 } : undefined}
                                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                                aria-label="Send"
                                className="h-9 w-9 flex items-center justify-center rounded-full bg-neutral-900 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <AudioLines size={15} strokeWidth={2} className="text-white" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Thinking banner - only while generating */}
                    <AnimatePresence initial={false}>
                        {generating && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={SPRING}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="flex items-center gap-2 text-[14px] font-medium text-neutral-700">
                                        <Sparkles size={16} strokeWidth={2} className="text-neutral-800" />
                                        Thinking&hellip;
                                    </span>
                                    <Loader2 size={16} strokeWidth={2.25} className="text-neutral-400 animate-spin" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Helper hint while actively typing */}
                <AnimatePresence initial={false}>
                    {!generating && !connectBanner && value.length > 0 && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="pt-3 pl-2 text-[13px] text-neutral-400"
                        >
                            Shift + Enter to add new line
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
