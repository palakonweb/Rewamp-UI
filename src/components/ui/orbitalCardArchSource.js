export const orbitalCardArchPrompt = `A 3D curved orbital card arch with subtle floating physics and center card deck collapse. Features three square matte obsidian cards ('Orbit 7-03') arranged in an orbital trajectory with left and right cards tilted along the arc. Clicking or toggling smoothly collapses all three cards into a single stacked deck in the center with spring physics.`;

export const orbitalCardArchCode = `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function OrbitalCardArch({
  cards = null,
  isStacked = false,
  autoCycle = true,
  cardSize = 215,
}) {
  const defaultCards = [
    { id: '1', title: 'Orbit 7-03', brand: 'rico.' },
    { id: '2', title: 'Orbit 7-03', brand: 'rico.' },
    { id: '3', title: 'Orbit 7-03', brand: 'rico.' },
  ];

  const cardList = cards || defaultCards;
  const [activeSlotOffset, setActiveSlotOffset] = useState(0);

  useEffect(() => {
    if (!autoCycle || isStacked) return;
    const interval = setInterval(() => {
      setActiveSlotOffset((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, [autoCycle, isStacked]);

  const slotConfigs = [
    { x: -250, y: 35, rotateZ: -12, scale: 0.94, zIndex: 10 },
    { x: 0, y: 0, rotateZ: 0, scale: 1.0, zIndex: 20 },
    { x: 250, y: 35, rotateZ: 12, scale: 0.94, zIndex: 10 },
  ];

  return (
    <div
      className="relative w-full h-[480px] overflow-hidden flex items-center justify-center rounded-2xl"
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #E8EAED 50%, #C9CDD2 100%)',
      }}
    >
      <div className="relative w-0 h-0 flex items-center justify-center">
        {cardList.slice(0, 3).map((card, idx) => {
          const slotIndex = (idx + activeSlotOffset) % 3;
          const config = slotConfigs[slotIndex];

          const posX = isStacked ? -idx * 3 : config.x;
          const posY = isStacked ? -idx * 3 : config.y;
          const rotZ = isStacked ? 0 : config.rotateZ;
          const scale = isStacked ? 1 - idx * 0.006 : config.scale;
          const zIndex = isStacked ? 30 - idx : config.zIndex;

          return (
            <motion.div
              key={card.id}
              animate={{ x: posX, y: posY, rotateZ: rotZ, scale }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              style={{
                width: cardSize,
                height: cardSize,
                position: 'absolute',
                top: -cardSize / 2,
                left: -cardSize / 2,
                zIndex,
              }}
            >
              <div className="w-full h-full rounded-[22px] p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#18181A] to-[#0B0B0C] border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white/90">{card.title}</span>
                  <div className="flex flex-col gap-1">
                    <span className="w-3.5 h-[2px] rounded-full bg-white/50" />
                    <span className="w-3.5 h-[2px] rounded-full bg-white/50" />
                  </div>
                </div>
                <div className="w-full h-[1px] bg-white/10" />
                <span className="text-xs text-white/40 font-mono">{card.brand}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
`;
