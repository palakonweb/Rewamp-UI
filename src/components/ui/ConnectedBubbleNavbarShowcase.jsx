import React, { useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = ['Home', 'Product', 'Contact'];

// Border-gradient trick: two backgrounds, one clipped to the padding box
// (the glossy fill + its top-left sheen) and one clipped to the border box
// (the metallic rim), so the rim reads as a real bezel rather than a flat
// stroke.
const glossyShape = {
    border: '1.5px solid transparent',
    background:
        'radial-gradient(120% 140% at 30% 18%, rgba(255,255,255,0.14), transparent 55%) padding-box, ' +
        'linear-gradient(150deg, #2c2c2f, #121214) padding-box, ' +
        'linear-gradient(135deg, #9a9a9e, #333335) border-box',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 16px 26px -10px rgba(0,0,0,0.55)',
};

// Shape lift: a touch higher + slightly bigger when the hover breaks its
// neighboring connector(s), selling the "snapped free" feel.
const SHAPE_SPRING = { type: 'spring', stiffness: 420, damping: 32 };
// Snappier, slightly underdamped so the connector visibly snaps rather than
// smoothly retracting.
const SNAP_SPRING = { type: 'spring', stiffness: 520, damping: 16 };

// A straight bar with fully rounded pill end-caps. Visible by default,
// snaps shut (scaleX -> 0 from its center) when either neighboring shape
// breaks away from it on hover.
function Connector({ broken }) {
    return (
        <motion.div
            aria-hidden="true"
            className="relative z-0 h-3.5 w-6 -mx-2 rounded-full shrink-0"
            style={{ ...glossyShape, boxShadow: '0 8px 14px -6px rgba(0,0,0,0.5)' }}
            animate={{ scaleX: broken ? 0 : 1, opacity: broken ? 0 : 1 }}
            transition={SNAP_SPRING}
        />
    );
}

function TriangleMark() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" style={{ transform: 'rotate(-12deg)' }} aria-hidden="true">
            <defs>
                <linearGradient id="connected-bubble-tri" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B7DBFF" />
                    <stop offset="55%" stopColor="#6FA6F2" />
                    <stop offset="100%" stopColor="#3C66C9" />
                </linearGradient>
            </defs>
            {/* Rounded corners on the triangle itself via stroke-linejoin,
                so the mark's tips read as softened rather than razor-sharp. */}
            <path
                d="M17 4 L17 20 L4 12 Z"
                fill="url(#connected-bubble-tri)"
                stroke="url(#connected-bubble-tri)"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ConnectedBubbleNavbarShowcase() {
    // null = nothing hovered = every connector intact (the reference's
    // default). Hovering a shape breaks only the connector(s) touching it,
    // and that shape nudges/lifts away as if it snapped free.
    const [hovered, setHovered] = useState(null);

    const logoBroken = hovered === 'logo' || hovered === 'main';
    const signupBroken = hovered === 'main' || hovered === 'signup';

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            <nav className="relative flex items-center">
                {/* Logo slot */}
                <motion.div
                    className="relative z-10 h-14 w-14 shrink-0 rounded-[20px] flex items-center justify-center cursor-pointer"
                    style={glossyShape}
                    animate={{ x: hovered === 'logo' ? -6 : 0, scale: hovered === 'logo' ? 1.05 : 1 }}
                    transition={SHAPE_SPRING}
                    onMouseEnter={() => setHovered('logo')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <TriangleMark />
                </motion.div>

                <Connector broken={logoBroken} />

                {/* Main links, grouped together in one shared pill */}
                <motion.div
                    className="relative z-10 h-14 shrink-0 rounded-full flex items-center gap-7 px-7 cursor-pointer"
                    style={glossyShape}
                    animate={{ scale: hovered === 'main' ? 1.03 : 1, y: hovered === 'main' ? -3 : 0 }}
                    transition={SHAPE_SPRING}
                    onMouseEnter={() => setHovered('main')}
                    onMouseLeave={() => setHovered(null)}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="text-[16px] font-medium whitespace-nowrap transition-opacity hover:opacity-80"
                            style={{ color: '#D7D7DC' }}
                        >
                            {link}
                        </a>
                    ))}
                </motion.div>

                <Connector broken={signupBroken} />

                {/* Sign Up */}
                <motion.div
                    className="relative z-10 h-[50px] shrink-0 rounded-full flex items-center px-6 cursor-pointer"
                    style={glossyShape}
                    animate={{ x: hovered === 'signup' ? 6 : 0, scale: hovered === 'signup' ? 1.05 : 1 }}
                    transition={SHAPE_SPRING}
                    onMouseEnter={() => setHovered('signup')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <a
                        href="#"
                        className="text-[16px] font-medium whitespace-nowrap transition-opacity hover:opacity-80"
                        style={{ color: '#D7D7DC' }}
                    >
                        Sign Up
                    </a>
                </motion.div>
            </nav>
        </div>
    );
}
