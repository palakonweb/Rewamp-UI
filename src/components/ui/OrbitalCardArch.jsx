import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * OrbitalCardArch
 * Exact recreation of Recording 154820.mp4:
 * Three-card orbital arch with gentle floating animation and smooth center deck collapse.
 */
export function OrbitalCardArch({
  cards = null,
  isStacked = false,
  autoCycle = true,
  cycleInterval = 2800,
  cardSize = 215,
  className = '',
  onCardClick = null,
}) {
  const defaultCards = [
    { id: '1', title: 'Orbit 7-03', brand: 'rico.' },
    { id: '2', title: 'Orbit 7-03', brand: 'rico.' },
    { id: '3', title: 'Orbit 7-03', brand: 'rico.' },
  ];

  const cardList = cards || defaultCards;
  const [activeSlotOffset, setActiveSlotOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through the 3 orbital positions
  useEffect(() => {
    if (!autoCycle || isPaused || isStacked) return;
    const interval = setInterval(() => {
      setActiveSlotOffset((prev) => (prev + 1) % 3);
    }, cycleInterval);
    return () => clearInterval(interval);
  }, [autoCycle, isPaused, isStacked, cycleInterval]);

  // Three slots along the orbital arch
  const slotConfigs = [
    { x: -250, y: 35, rotateZ: -12, scale: 0.94, zIndex: 10 }, // Left
    { x: 0, y: 0, rotateZ: 0, scale: 1.0, zIndex: 20 },         // Center
    { x: 250, y: 35, rotateZ: 12, scale: 0.94, zIndex: 10 },    // Right
  ];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full h-[460px] md:h-[500px] overflow-hidden select-none flex items-center justify-center rounded-2xl ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #E8EAED 50%, #C9CDD2 100%)',
      }}
    >
      {/* Studio Lighting Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(0, 0, 0, 0.18) 100%)',
        }}
      />

      {/* Orbit Guide Arc (Subtle aesthetic backdrop curve) */}
      <div 
        className="absolute w-[640px] h-[340px] rounded-[50%] border border-neutral-300/40 pointer-events-none -top-16 opacity-30"
      />

      {/* 3-Card Interactive Stage */}
      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
        {cardList.slice(0, 3).map((card, idx) => {
          // Calculate which slot this card currently occupies
          const slotIndex = (idx + activeSlotOffset) % 3;
          const config = slotConfigs[slotIndex];

          let posX = config.x;
          let posY = config.y;
          let rotZ = config.rotateZ;
          let scale = config.scale;
          let zIndex = config.zIndex;

          if (isStacked) {
            // Collapsed into center card deck (shown at 00:04 of video)
            const stackOffset = idx;
            posX = -stackOffset * 3;
            posY = -stackOffset * 3;
            rotZ = 0;
            scale = 1 - stackOffset * 0.006;
            zIndex = 30 - idx;
          }

          return (
            <motion.div
              key={card.id || idx}
              initial={false}
              animate={{
                x: posX,
                y: posY,
                rotateZ: rotZ,
                scale,
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 26,
                mass: 0.85,
              }}
              style={{
                width: cardSize,
                height: cardSize,
                position: 'absolute',
                top: -cardSize / 2,
                left: -cardSize / 2,
                zIndex,
              }}
              className="pointer-events-auto"
              onClick={() => onCardClick && onCardClick(card, idx)}
            >
              {/* Card Surface */}
              <div
                className="group relative w-full h-full rounded-[22px] p-5 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(175deg, #18181A 0%, #121214 55%, #0B0B0C 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow:
                    slotIndex === 1 && !isStacked
                      ? '0 26px 48px -10px rgba(0, 0, 0, 0.6), 0 8px 16px -4px rgba(0, 0, 0, 0.35)'
                      : '0 16px 32px -8px rgba(0, 0, 0, 0.45)',
                }}
              >
                {/* Sheen overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-35"
                  style={{
                    background: 'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.1) 0%, transparent 65%)',
                  }}
                />

                {/* Top Section */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[13px] font-medium tracking-tight text-white/90 select-none">
                    {card.title || 'Orbit 7-03'}
                  </span>

                  {/* Top Right Double Dash Mark (from video) */}
                  <div className="flex flex-col gap-[3px] items-end justify-center py-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="w-3.5 h-[2px] rounded-full bg-white/50" />
                    <span className="w-3.5 h-[2px] rounded-full bg-white/50" />
                  </div>
                </div>

                {/* Middle Divider Line */}
                <div className="relative z-10 w-full my-auto">
                  <div className="w-full h-[1px] bg-white/[0.08]" />
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[12px] font-normal tracking-tight text-white/45 select-none font-mono">
                    {card.brand || 'rico.'}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default OrbitalCardArch;
