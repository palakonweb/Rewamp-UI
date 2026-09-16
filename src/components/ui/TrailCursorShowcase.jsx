import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

/*
 * Blob Cursor — React Bits inspired
 * An organic blob trails behind the cursor with physics-based inertia.
 * Multiple layered blobs at different spring stiffnesses create depth.
 */

const promptContent = `Organic blob cursor with multiple layered trailing blobs at different spring stiffnesses creating depth and parallax, mix-blend-mode for color interaction, dark background with gradient content, React Bits blob cursor inspired`;

export default function TrailCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // 3 blobs at different stiffnesses = organic layered trail
  const blob1X = useSpring(cursorX, { stiffness: 120, damping: 14 });
  const blob1Y = useSpring(cursorY, { stiffness: 120, damping: 14 });
  const blob2X = useSpring(cursorX, { stiffness: 60, damping: 12 });
  const blob2Y = useSpring(cursorY, { stiffness: 60, damping: 12 });
  const blob3X = useSpring(cursorX, { stiffness: 30, damping: 10 });
  const blob3Y = useSpring(cursorY, { stiffness: 30, damping: 10 });

  const [isHovering, setIsHovering] = useState(false);

  const handleMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  }, [cursorX, cursorY]);

  const blobs = [
    { x: blob3X, y: blob3Y, size: 140, color: 'rgba(139,126,200,0.15)', blur: 40 },
    { x: blob2X, y: blob2Y, size: 80, color: 'rgba(126,200,200,0.2)', blur: 20 },
    { x: blob1X, y: blob1Y, size: 40, color: 'rgba(201,145,138,0.3)', blur: 8 },
  ];

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div ref={containerRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] flex flex-col items-center justify-center min-h-[500px] cursor-none"
        style={{ background: '#080810' }}>

        {/* Blob layers */}
        {isHovering && blobs.map((blob, i) => (
          <motion.div key={i} className="absolute pointer-events-none rounded-full"
            style={{
              width: blob.size, height: blob.size,
              x: blob.x, y: blob.y,
              translateX: '-50%', translateY: '-50%',
              background: blob.color,
              filter: `blur(${blob.blur}px)`,
              zIndex: 10 + i,
            }}
          />
        ))}

        {/* Lead cursor dot */}
        {isHovering && (
          <motion.div className="absolute z-40 pointer-events-none rounded-full"
            style={{
              width: 8, height: 8,
              x: blob1X, y: blob1Y,
              translateX: '-50%', translateY: '-50%',
              background: '#f0ede8',
              boxShadow: '0 0 8px rgba(240,237,232,0.5)',
            }}
          />
        )}

        {/* Content */}
        <div className="text-center pointer-events-none relative z-30 px-8">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(139,126,200,0.4)' }}>Blob Cursor</p>
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight leading-[1.1]" style={{ color: '#e8e4ef' }}>
            Organic. Layered. Alive.
          </h2>
          <p className="text-[13px] mt-4 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(232,228,239,0.3)' }}>
            Three blobs at different spring stiffnesses create a parallax depth effect. The slowest blob trails far behind, the fastest stays close.
          </p>

          {/* Mini demo cards */}
          <div className="flex gap-3 justify-center mt-8">
            {[
              { label: 'Fast', stiff: '120', color: '#c9918a' },
              { label: 'Medium', stiff: '60', color: '#7ec8c8' },
              { label: 'Slow', stiff: '30', color: '#8b7ec8' },
            ].map((b, i) => (
              <div key={i} className="px-4 py-3 rounded-2xl text-center" style={{ background: `${b.color}08`, border: `1px solid ${b.color}15` }}>
                <p className="text-[18px] font-bold" style={{ color: b.color }}>{b.stiff}</p>
                <p className="text-[9px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: `${b.color}80` }}>stiffness</p>
                <p className="text-[10px] mt-1" style={{ color: 'rgba(240,237,232,0.3)' }}>{b.label}</p>
              </div>
            ))}
          </div>
        </div>

        {!isHovering && (
          <motion.p animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-8 text-[11px]" style={{ color: 'rgba(240,237,232,0.2)' }}>
            Move your cursor inside
          </motion.p>
        )}
      </div>
</div>
  );
}
