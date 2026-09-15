import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * PerspectiveFlipDeck
 * Exact recreation of Recording 2026-09-15 154736.mp4:
 * 3D isometric perspective fanned card deck.
 * When cycling, the front card physically swings open to the right
 * around its right vertical hinge (from -22deg to 85deg) revealing
 * the next card which smoothly slides forward with spring physics.
 * Pure image cards with no black overlays and no text.
 */
export function PerspectiveFlipDeck({
  items = null,
  autoPlay = true,
  interval = 2800,
  cardWidth = 360,
  cardHeight = 220,
  className = '',
}) {
  // Pure surreal art images provided by the user
  const defaultCards = [
    { id: '1', image: '/cards/sky-curtain.png' },
    { id: '2', image: '/cards/airplane-sunset.png' },
    { id: '3', image: '/cards/rainbow-hill.png' },
    { id: '4', image: '/cards/train-window.jpg' },
    { id: '5', image: '/cards/kangaroo-planet.png' },
  ];

  const cardList = items || defaultCards;
  const numCards = cardList.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Trigger the 3D swinging flip
  const triggerFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % numCards);
      setIsFlipping(false);
    }, 650);
  };

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(() => {
      triggerFlip();
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, isFlipping, interval]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full h-[480px] md:h-[530px] overflow-hidden select-none flex items-center justify-center rounded-2xl ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #EAECEF 55%, #CFD4DB 100%)',
      }}
    >
      {/* Studio lighting vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(0, 0, 0, 0.16) 100%)',
        }}
      />

      {/* 3D Isometric Deck Stage */}
      <div
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          width: cardWidth,
          height: cardHeight,
        }}
        onClick={triggerFlip}
      >
        {cardList.map((card, idx) => {
          // Relative position slot from current activeIndex
          // 0 = front card, 1 = mid card, 2 = back card, etc.
          const slot = (idx - activeIndex + numCards) % numCards;
          const isFront = slot === 0;

          // Resting coordinates from Recording 154736.mp4:
          // Front card (slot 0) at x: 25, y: 0
          // Middle card (slot 1) at x: -25, y: -8
          // Back card (slot 2) at x: -75, y: -16
          let targetX = 25 - slot * 50;
          let targetY = 0 - slot * 8;
          let targetScale = 1 - slot * 0.035;
          let targetRotY = -22;
          let targetRotX = 8;
          let targetRotZ = -2;
          let targetOpacity = slot > 2 ? 0 : 1 - slot * 0.06;
          let zIndex = 30 - slot * 5;

          // When flip is in progress:
          if (isFlipping) {
            if (isFront) {
              // The front card physically swings open around its right edge in 3D
              targetRotY = 86;
              targetRotX = 3;
              targetRotZ = 4;
              targetOpacity = 0;
              targetScale = 0.96;
              zIndex = 40;
            } else if (slot <= 3) {
              // Cards behind slide forward into next slot position
              const nextSlot = slot - 1;
              targetX = 25 - nextSlot * 50;
              targetY = 0 - nextSlot * 8;
              targetScale = 1 - nextSlot * 0.035;
              targetOpacity = nextSlot > 2 ? 0 : 1 - nextSlot * 0.06;
              zIndex = 30 - nextSlot * 5;
            }
          }

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x: targetX,
                y: targetY,
                scale: targetScale,
                opacity: targetOpacity,
                rotateY: targetRotY,
                rotateX: targetRotX,
                rotateZ: targetRotZ,
              }}
              transition={{
                duration: isFront && isFlipping ? 0.62 : 0.55,
                ease: isFront && isFlipping ? [0.35, 0.85, 0.45, 1] : [0.34, 1.3, 0.64, 1],
              }}
              style={{
                width: cardWidth,
                height: cardHeight,
                position: 'absolute',
                zIndex,
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Pure Card Surface - No text, No black overlays */}
              <div
                className="w-full h-full rounded-[22px] overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  boxShadow:
                    slot === 0 && !isFlipping
                      ? '0 30px 60px -12px rgba(0, 0, 0, 0.55), 0 10px 22px -6px rgba(0, 0, 0, 0.35)'
                      : '0 18px 36px -10px rgba(0, 0, 0, 0.4)',
                }}
              >
                <img
                  src={card.image}
                  alt="Card Art"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PerspectiveFlipDeck;
