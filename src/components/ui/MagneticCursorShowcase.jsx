import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

/*
 * Canvas Reveal Cursor — Aceternity SVG Mask inspired
 * Mouse acts as a flashlight revealing a hidden colorful layer beneath a dark mask.
 * Uses SVG mask with feGaussianBlur for buttery-soft edge.
 */

const promptContent = `Canvas reveal cursor effect with SVG mask flashlight revealing a vibrant hidden layer beneath a dark overlay, soft gaussian blur mask edge, spring-based cursor tracking, dark background with colorful content revealed on hover, Aceternity canvas-reveal inspired`;

export default function MagneticCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 250, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 250, damping: 25 });
  const [isHovering, setIsHovering] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorX.set(x);
    cursorY.set(y);
    setPos({ x, y });
  }, [cursorX, cursorY]);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div ref={containerRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] min-h-[500px] cursor-none"
        style={{ background: '#0a0a0e' }}>

        {/* Colorful revealed layer (always present but masked) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1040 0%, #0a2030 50%, #101a10 100%)' }} />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              {['#c9918a', '#7ec8a4', '#8b7ec8', '#7ec8c8', '#c8a87e'].map((c, i) => (
                <motion.div key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-10 h-10 rounded-2xl"
                  style={{ background: `${c}30`, border: `1px solid ${c}40`, boxShadow: `0 4px 20px ${c}20` }}
                />
              ))}
            </div>
            <h2 className="text-[36px] sm:text-[48px] font-bold leading-[1.05] tracking-tight" style={{ color: '#f0ede8' }}>
              Reveal the <span style={{ color: '#7ec8c8' }}>hidden</span> layer.
            </h2>
            <p className="text-[14px] mt-4 max-w-md mx-auto" style={{ color: 'rgba(240,237,232,0.5)' }}>
              Move your cursor to illuminate what lies beneath the surface.
            </p>
            <div className="flex gap-3 justify-center mt-8">
              {['Explore', 'Learn More', 'Get Started'].map((t, i) => (
                <div key={i} className="px-4 py-2 rounded-xl text-[12px] font-semibold"
                  style={{ background: 'rgba(126,200,200,0.1)', color: '#7ec8c8', border: '1px solid rgba(126,200,200,0.2)' }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dark overlay mask — the mouse "cuts" a circle through this */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <filter id="revealBlur">
                <feGaussianBlur stdDeviation="30" />
              </filter>
              <mask id="revealMask">
                <rect width="100%" height="100%" fill="white" />
                {isHovering && (
                  <circle cx={pos.x} cy={pos.y} r="120" fill="black" filter="url(#revealBlur)" />
                )}
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#0a0a0e" mask="url(#revealMask)" />
          </svg>
        </div>

        {/* Subtle ring cursor */}
        {isHovering && (
          <motion.div className="absolute z-30 pointer-events-none rounded-full"
            style={{
              width: 40, height: 40,
              x: springX, y: springY,
              translateX: '-50%', translateY: '-50%',
              border: '1.5px solid rgba(126,200,200,0.4)',
              boxShadow: '0 0 20px rgba(126,200,200,0.1)',
            }}
          />
        )}

        {/* Prompt when not hovering */}
        {!isHovering && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <motion.p animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[13px] font-medium" style={{ color: 'rgba(240,237,232,0.25)' }}>
              Hover to reveal →
            </motion.p>
          </div>
        )}
      </div>
</div>
  );
}
