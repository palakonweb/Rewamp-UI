import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PerspectiveFlipDeck
 * Exact recreation of Recording 154736.mp4:
 * 3D isometric perspective fanned card deck with sequential 3D flip card transition.
 */
export function PerspectiveFlipDeck({
  items = null,
  autoPlay = true,
  interval = 2400,
  cardWidth = 360,
  cardHeight = 210,
  className = '',
  onCardClick = null,
}) {
  const defaultCards = [
    { id: '1', number: '01', brand: 'rico.' },
    { id: '2', number: '02', brand: 'rico.' },
    { id: '3', number: '03', brand: 'rico.' },
    { id: '4', number: '04', brand: 'rico.' },
    { id: '5', number: '05', brand: 'rico.' },
    { id: '6', number: '06', brand: 'rico.' },
  ];

  const cardList = items || defaultCards;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [flippingCard, setFlippingCard] = useState(null);

  // Next card flip transition
  const handleNext = () => {
    if (flippingCard) return;
    const activeCard = cardList[currentIndex % cardList.length];
    setFlippingCard(activeCard);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardList.length);
      setFlippingCard(null);
    }, 550);
  };

  const handlePrev = () => {
    if (flippingCard) return;
    setCurrentIndex((prev) => (prev - 1 + cardList.length) % cardList.length);
  };

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, currentIndex, flippingCard, interval]);

  // We display 3 cards in the isometric stack:
  // slot 0 = Front (active card)
  // slot 1 = Middle card
  // slot 2 = Back card
  const visibleCards = [0, 1, 2].map((offset) => {
    const idx = (currentIndex + offset) % cardList.length;
    return { ...cardList[idx], slot: offset };
  });

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full h-[460px] md:h-[500px] overflow-hidden select-none flex items-center justify-center rounded-2xl ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #E8EAED 50%, #C9CDD2 100%)',
      }}
    >
      {/* Studio lighting vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(0, 0, 0, 0.18) 100%)',
        }}
      />

      {/* 3D Perspective Stage */}
      <div
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          width: cardWidth,
          height: cardHeight,
        }}
        onClick={handleNext}
      >
        {/* Render visible deck cards in reverse order (slot 2 -> slot 1 -> slot 0) */}
        {visibleCards
          .slice()
          .reverse()
          .map((card) => {
            // Isometric perspective offset matching reference video
            // slot 0 (front): x: 60px, scale: 1.0, zIndex: 30
            // slot 1 (mid):   x: -20px, scale: 0.96, zIndex: 20
            // slot 2 (back):  x: -100px, scale: 0.92, zIndex: 10
            const xOffset = (card.slot === 0 ? 55 : card.slot === 1 ? -20 : -95);
            const yOffset = (card.slot === 0 ? 10 : card.slot === 1 ? -5 : -20);
            const scale = 1 - card.slot * 0.04;
            const zIndex = 30 - card.slot * 10;
            const opacity = 1 - card.slot * 0.08;

            return (
              <motion.div
                key={`${card.id}-${card.slot}`}
                layoutId={card.slot !== 0 ? `card-${card.id}` : undefined}
                initial={false}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  scale,
                  opacity,
                  rotateY: -16,
                  rotateZ: -1.5,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 28,
                  mass: 0.8,
                }}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  position: 'absolute',
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Card Surface */}
                <div
                  className="group relative w-full h-full rounded-[24px] p-6 flex flex-col justify-between overflow-hidden transition-all duration-300"
                  style={{
                    background: 'linear-gradient(170deg, #18181A 0%, #111112 55%, #0A0A0B 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow:
                      card.slot === 0
                        ? '0 28px 52px -12px rgba(0, 0, 0, 0.62), 0 10px 20px -6px rgba(0, 0, 0, 0.4)'
                        : '0 18px 36px -10px rgba(0, 0, 0, 0.45)',
                  }}
                >
                  {/* Sheen overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      background: 'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.12) 0%, transparent 65%)',
                    }}
                  />

                  {/* Top Section */}
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-[14px] font-medium tracking-tight text-white/60 font-mono">
                      {card.brand || 'rico.'}
                    </span>

                    {/* Prominent Card Number (from video) */}
                    <span className="text-[34px] font-semibold tracking-tighter text-white/95 leading-none font-sans">
                      {card.number}
                    </span>
                  </div>

                  {/* Subtle Middle Divider Line */}
                  <div className="relative z-10 w-full my-auto">
                    <div className="w-full h-[1px] bg-white/[0.08]" />
                  </div>

                  {/* Bottom Section */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-white/30 font-mono">
                    <span>PERSPECTIVE DECK</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">CLICK TO FLIP</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

        {/* The 3D Peeling Flip Card that rotates out when clicking Next */}
        <AnimatePresence>
          {flippingCard && (
            <motion.div
              key={`flipping-${flippingCard.id}`}
              initial={{
                x: 55,
                y: 10,
                scale: 1.0,
                rotateY: -16,
                rotateZ: -1.5,
                opacity: 1,
              }}
              animate={{
                x: 180,
                y: -15,
                scale: 0.95,
                rotateY: 88,
                rotateZ: 4,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.52,
                ease: [0.25, 1, 0.5, 1],
              }}
              style={{
                width: cardWidth,
                height: cardHeight,
                position: 'absolute',
                zIndex: 45,
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="w-full h-full rounded-[24px] p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
                style={{
                  background: 'linear-gradient(170deg, #19191B 0%, #111112 55%, #0A0A0B 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.22)',
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[14px] font-medium tracking-tight text-white/60 font-mono">
                    {flippingCard.brand || 'rico.'}
                  </span>
                  <span className="text-[34px] font-semibold tracking-tighter text-white/95 leading-none">
                    {flippingCard.number}
                  </span>
                </div>
                <div className="w-full h-[1px] bg-white/[0.08]" />
                <div className="text-[11px] text-white/30 font-mono">
                  <span>PERSPECTIVE DECK</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PerspectiveFlipDeck;
