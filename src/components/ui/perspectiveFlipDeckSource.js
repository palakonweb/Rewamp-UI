export const perspectiveFlipDeckPrompt = `A 3D isometric perspective card deck carousel with sequential peeling flip transitions. Features wide dark obsidian cards fanned along a 3D perspective plane with clean white numbering ('01', '02', '03') and divider lines. The front card flips open to the right in 3D perspective around a vertical hinge as subsequent cards smoothly shift forward with spring physics.`;

export const perspectiveFlipDeckCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PerspectiveFlipDeck({
  items = null,
  autoPlay = true,
  interval = 2400,
  cardWidth = 360,
  cardHeight = 210,
}) {
  const defaultCards = [
    { id: '1', number: '01', brand: 'rico.' },
    { id: '2', number: '02', brand: 'rico.' },
    { id: '3', number: '03', brand: 'rico.' },
    { id: '4', number: '04', brand: 'rico.' },
  ];

  const cardList = items || defaultCards;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippingCard, setFlippingCard] = useState(null);

  const handleNext = () => {
    if (flippingCard) return;
    setFlippingCard(cardList[currentIndex % cardList.length]);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardList.length);
      setFlippingCard(null);
    }, 550);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, currentIndex, flippingCard]);

  const visibleCards = [0, 1, 2].map((offset) => {
    const idx = (currentIndex + offset) % cardList.length;
    return { ...cardList[idx], slot: offset };
  });

  return (
    <div
      className="relative w-full h-[480px] overflow-hidden flex items-center justify-center rounded-2xl"
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #E8EAED 50%, #C9CDD2 100%)',
      }}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          perspective: 1200,
          width: cardWidth,
          height: cardHeight,
        }}
        onClick={handleNext}
      >
        {visibleCards.slice().reverse().map((card) => {
          const xOffset = card.slot === 0 ? 55 : card.slot === 1 ? -20 : -95;
          const yOffset = card.slot === 0 ? 10 : card.slot === 1 ? -5 : -20;
          return (
            <motion.div
              key={card.id + '-' + card.slot}
              animate={{
                x: xOffset,
                y: yOffset,
                scale: 1 - card.slot * 0.04,
                opacity: 1 - card.slot * 0.08,
                rotateY: -16,
                rotateZ: -1.5,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{
                width: cardWidth,
                height: cardHeight,
                position: 'absolute',
                zIndex: 30 - card.slot * 10,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="w-full h-full rounded-[24px] p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#18181A] to-[#0A0A0B] border border-white/10 shadow-2xl">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-white/60 font-mono">{card.brand}</span>
                  <span className="text-4xl font-semibold text-white">{card.number}</span>
                </div>
                <div className="w-full h-[1px] bg-white/10" />
                <div className="text-xs text-white/30 font-mono">PERSPECTIVE DECK</div>
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {flippingCard && (
            <motion.div
              key={flippingCard.id}
              initial={{ x: 55, y: 10, rotateY: -16, opacity: 1 }}
              animate={{ x: 180, y: -15, rotateY: 88, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.52, ease: [0.25, 1, 0.5, 1] }}
              style={{
                width: cardWidth,
                height: cardHeight,
                position: 'absolute',
                zIndex: 45,
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="w-full h-full rounded-[24px] p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#19191B] to-[#0A0A0B] border border-white/10 shadow-2xl">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-white/60 font-mono">{flippingCard.brand}</span>
                  <span className="text-4xl font-semibold text-white">{flippingCard.number}</span>
                </div>
                <div className="w-full h-[1px] bg-white/10" />
                <div className="text-xs text-white/30 font-mono">PERSPECTIVE DECK</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
`;
