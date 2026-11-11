import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Paperclip, Image as ImageIcon, FileText, Video, ArrowUp } from 'lucide-react';

const attachmentIcons = [
    { id: 'attach', icon: Paperclip, label: 'Attach file' },
    { id: 'image', icon: ImageIcon, label: 'Add image' },
    { id: 'file', icon: FileText, label: 'Add document' },
    { id: 'video', icon: Video, label: 'Add video' },
];

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

    useEffect(() => {
        const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
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
                        placeholder="Message Maya Chen..."
                        className="w-full bg-transparent outline-none text-[16px]"
                        style={{ color: 'var(--text-primary)' }}
                    />
                </div>

                <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderTop: '1px solid var(--border)' }}
                >
                    <div className="flex items-center gap-1">
                        {attachmentIcons.map(({ id, icon: Icon, label }) => (
                            <button
                                key={id}
                                type="button"
                                aria-label={label}
                                className="h-9 w-9 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200"
                                style={{ color: 'var(--text-secondary)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--elevated)';
                                    e.currentTarget.style.color = 'var(--brand-strong)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                <Icon size={19} strokeWidth={1.8} />
                            </button>
                        ))}
                    </div>

                    {/* Send button: a brand-lilac gradient that keeps drifting
                        through its own stops (background-position tween on an
                        oversized gradient) rather than sitting static. */}
                    <motion.button
                        type="button"
                        aria-label="Send message"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        className="h-11 w-11 shrink-0 flex items-center justify-center rounded-full cursor-pointer"
                        style={{
                            backgroundImage: `linear-gradient(120deg, var(--lilac-400), var(--lilac-600), var(--lilac-500), var(--lilac-400))`,
                            backgroundSize: '300% 300%',
                            boxShadow: '0 6px 18px -4px rgba(193, 180, 216, 0.55)',
                        }}
                    >
                        <ArrowUp size={20} strokeWidth={2.4} style={{ color: '#2C2420' }} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
