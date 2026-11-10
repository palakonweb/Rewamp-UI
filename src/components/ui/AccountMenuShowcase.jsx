import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Users,
    CreditCard,
    SlidersHorizontal,
    Info,
    LogOut,
} from 'lucide-react';

const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'subscription', label: 'Subscription', icon: CreditCard, badge: 'Pro' },
    { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
    { id: 'help', label: 'Help Center', icon: Info },
    { id: 'signout', label: 'Sign Out', icon: LogOut, isSignOut: true },
];

const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.7 };

// Default profile-picture mark: a solid purple circle with a white user
// silhouette, used for the avatar trigger - kept as inline SVG per the
// no-emoji / SVG-only iconography rule. Fixed (theme-independent) purple
// fill, same as a real uploaded avatar wouldn't recolor with site theme.
function UserAvatarMark({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#8E7CC3" />
            <circle cx="12" cy="9.6" r="3.6" fill="#FFFFFF" />
            <path
                d="M4.6 19.4c1.2-3.4 4-5.2 7.4-5.2s6.2 1.8 7.4 5.2c-2 1.7-4.6 2.6-7.4 2.6s-5.4-0.9-7.4-2.6Z"
                fill="#FFFFFF"
            />
        </svg>
    );
}

export default function AccountMenuShowcase() {
    // Starts open so the showcase displays the full menu layout at a glance,
    // matching the reference design; the avatar still toggles it.
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState('profile');
    const [hovered, setHovered] = useState(null);
    const rootRef = useRef(null);

    // Follows the real dashboard's theme mechanism (data-theme attribute on
    // <html>, see ThemeToggle.jsx) rather than a .dark class, so this demo
    // stays in sync with the site's own brand (lilac) tokens in both modes.
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

    useEffect(() => {
        function handlePointer(e) {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
        }
        function handleKey(e) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('mousedown', handlePointer);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handlePointer);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    return (
        <div ref={rootRef} className="relative w-full min-h-[460px] sm:min-h-[520px] select-none">
            {/* Avatar: anchored to its own fixed size, independent of the menu
                below it, so toggling the menu never moves it. */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 h-14 w-14 shrink-0 rounded-full flex items-center justify-center cursor-pointer ring-2 focus:outline-none"
                style={{ '--tw-ring-color': 'var(--brand-strong)' }}
            >
                <UserAvatarMark className="h-14 w-14" />
            </button>

            {/* Dropdown panel: anchored from the same fixed point, offset by
                the avatar's own half-height + a fixed gap - never by the
                panel's own (variable) size. */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } }}
                        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                        onMouseLeave={() => setHovered(null)}
                        className="absolute left-1/2 w-72 origin-top rounded-[28px] p-2.5"
                        style={{
                            top: 'calc(42% + 40px)',
                            marginLeft: '-144px',
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            boxShadow: isDark
                                ? '0 20px 48px -12px rgba(0,0,0,0.6)'
                                : '0 20px 48px -12px rgba(0,0,0,0.18)',
                        }}
                    >
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = !item.isSignOut && active === item.id;
                            const showPill = hovered ? hovered === item.id : isActive;

                            return (
                                <button
                                    key={item.id}
                                    role="menuitem"
                                    type="button"
                                    onClick={() => !item.isSignOut && setActive(item.id)}
                                    onMouseEnter={() => setHovered(item.id)}
                                    className="relative w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium cursor-pointer"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {showPill && (
                                        <motion.span
                                            layoutId="account-menu-pill"
                                            transition={PILL_SPRING}
                                            className="absolute inset-0 rounded-2xl"
                                            style={{ backgroundColor: 'var(--elevated)' }}
                                        />
                                    )}
                                    <Icon
                                        size={18}
                                        strokeWidth={2}
                                        className="relative shrink-0"
                                        style={{ color: isActive ? 'var(--brand-strong)' : 'var(--text-secondary)' }}
                                    />
                                    <span className="relative flex-1 text-left">{item.label}</span>
                                    {item.badge && (
                                        <span
                                            className="relative rounded-md px-2 py-0.5 text-[11px] font-semibold"
                                            style={{ backgroundColor: 'var(--brand-strong)', color: '#2C2420' }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="sr-only">Click the avatar to open the account menu.</p>
        </div>
    );
}
