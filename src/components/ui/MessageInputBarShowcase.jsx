import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, Image as ImageIcon, FileText, Video, ArrowUp } from 'lucide-react';

const attachmentIcons = [
    {
        id: 'attach',
        icon: Paperclip,
        label: 'Attach file',
        options: ['Upload from computer', 'Add from Drive', 'Recent files'],
    },
    {
        id: 'image',
        icon: ImageIcon,
        label: 'Add image',
        options: ['Upload photo', 'Take photo', 'Browse gallery'],
    },
    {
        id: 'file',
        icon: FileText,
        label: 'Add document',
        options: ['Upload PDF', 'Upload Doc', 'Scan document'],
    },
    {
        id: 'video',
        icon: Video,
        label: 'Add video',
        options: ['Upload video', 'Record video', 'Paste link'],
    },
];

// Same spring used for the Account Menu's sliding active-pill and the Glass
// Action Dock / Skeleton Nav Reveal tooltips, kept identical here so every
// hover-driven highlight in the kit moves with the same feel.
const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.7 };

export default function MessageInputBarShowcase() {
    // Follows the real dashboard's theme mechanism (data-theme attribute on
    // <html>), same as AccountMenuShowcase, so this stays in sync with the
    // site's own brand tokens in both light and dark mode.
    const [isDark, setIsDark] = useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') === 'dark';
        }
        return false;
    });

    const [hovered, setHovered] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const rootRef = useRef(null);

    useEffect(() => {
        const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        function handlePointer(e) {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpenMenu(null);
        }
        function handleKey(e) {
            if (e.key === 'Escape') setOpenMenu(null);
        }
        document.addEventListener('mousedown', handlePointer);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handlePointer);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    return (
        <div ref={rootRef} className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            <div
                className="w-full max-w-xl rounded-[28px] p-1"
                style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: isDark
                        ? '0 20px 48px -12px rgba(0,0,0,0.6)'
                        : '0 20px 48px -12px rgba(0,0,0,0.12)',
                }}
            >
                <div className="px-5 pt-4 pb-3">
                    <input
                        type="text"
                        placeholder="Follow palakonweb"
                        className="w-full bg-transparent outline-none text-[16px]"
                        style={{ color: 'var(--text-primary)' }}
                    />
                </div>

                <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderTop: '1px solid var(--border)' }}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div className="flex items-center gap-1">
                        {attachmentIcons.map(({ id, icon: Icon, label, options }) => {
                            const isHovered = hovered === id;
                            const isOpen = openMenu === id;

                            return (
                                <div key={id} className="relative flex items-center">
                                    {/* Hover tooltip: a single shared layoutId glides
                                        between icons, same mechanism as the dock and
                                        skeleton-nav showcases. Suppressed while this
                                        icon's submenu is open. */}
                                    {isHovered && !openMenu && (
                                        <div className="absolute -top-2 inset-x-0 flex justify-center pointer-events-none z-20 -translate-y-full">
                                            <motion.div
                                                layoutId="message-input-tooltip"
                                                transition={PILL_SPRING}
                                                className="px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
                                                style={{ backgroundColor: isDark ? '#1a1a1f' : '#1F1F1F' }}
                                            >
                                                <span className="text-[12px] font-medium text-white">{label}</span>
                                            </motion.div>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        aria-label={label}
                                        aria-expanded={isOpen}
                                        onMouseEnter={() => setHovered(id)}
                                        onClick={() => setOpenMenu((v) => (v === id ? null : id))}
                                        className="h-9 w-9 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200"
                                        style={{
                                            color: isHovered || isOpen ? 'var(--brand-strong)' : 'var(--text-secondary)',
                                            backgroundColor: isHovered || isOpen ? 'var(--elevated)' : 'transparent',
                                        }}
                                    >
                                        <Icon size={19} strokeWidth={1.8} />
                                    </button>

                                    {/* Submenu: each icon's own action list. */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                role="menu"
                                                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.12 } }}
                                                transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                                                className="absolute bottom-full left-0 mb-3 w-48 origin-bottom-left rounded-2xl p-1.5 z-30"
                                                style={{
                                                    backgroundColor: 'var(--surface)',
                                                    border: '1px solid var(--border)',
                                                    boxShadow: isDark
                                                        ? '0 16px 36px -10px rgba(0,0,0,0.6)'
                                                        : '0 16px 36px -10px rgba(0,0,0,0.18)',
                                                }}
                                            >
                                                {options.map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        role="menuitem"
                                                        onClick={() => setOpenMenu(null)}
                                                        className="w-full text-left px-3 py-2 rounded-xl text-[13px] font-medium cursor-pointer transition-colors duration-150"
                                                        style={{ color: 'var(--text-primary)' }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--elevated)'; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Send button: a brand-lilac gradient that keeps drifting
                        through its own stops (background-position tween on an
                        oversized gradient), plus a diagonal light sweep layered
                        on top so the motion reads clearly even where the lilac
                        stops are close in hue. */}
                    <motion.button
                        type="button"
                        aria-label="Send message"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        className="relative h-11 w-11 shrink-0 flex items-center justify-center rounded-full cursor-pointer overflow-hidden"
                        style={{
                            backgroundImage: `linear-gradient(120deg, var(--lilac-300), var(--lilac-600), var(--lilac-400), var(--lilac-600), var(--lilac-300))`,
                            backgroundSize: '400% 400%',
                            boxShadow: '0 6px 18px -4px rgba(193, 180, 216, 0.55)',
                        }}
                    >
                        <motion.div
                            animate={{ x: ['-120%', '120%'] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[20deg] pointer-events-none"
                        />
                        <ArrowUp size={20} strokeWidth={2.4} className="relative" style={{ color: '#2C2420' }} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
