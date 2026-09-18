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
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) setScreenSize('mobile');
      else if (w < 820) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effWidth = screenSize === 'mobile' ? Math.min(cardWidth, 210) : screenSize === 'tablet' ? Math.min(cardWidth, 280) : cardWidth;
  const effHeight = screenSize === 'mobile' ? Math.min(cardHeight, 135) : screenSize === 'tablet' ? Math.min(cardHeight, 175) : cardHeight;
  const effStepX = screenSize === 'mobile' ? 24 : screenSize === 'tablet' ? 42 : 60;
  const effBaseX = screenSize === 'mobile' ? 0 : screenSize === 'tablet' ? 10 : 20;

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
      className={`relative w-full max-w-full h-[380px] sm:h-[480px] md:h-[530px] overflow-hidden select-none flex items-center justify-center rounded-2xl ${className}`}
    >
      {/* 3D Isometric Deck Stage */}
      <div
        className="relative flex items-center justify-center cursor-pointer max-w-full"
        style={{
          perspective: 1400,
          perspectiveOrigin: '50% 50%',
          width: effWidth,
          height: effHeight,
        }}
        onClick={triggerFlip}
      >
        {cardList.map((card, idx) => {
          // Relative position slot from current activeIndex
          const slot = (idx - activeIndex + numCards) % numCards;
          const isFront = slot === 0;

          let targetX = effBaseX - slot * effStepX;
          let targetY = 0 - slot * (isMobile ? 5 : 8);
          let targetScale = 1 - slot * 0.035;
          let targetRotY = 0;
          let targetRotX = 0;
          let targetRotZ = 0;
          let targetOpacity = slot > 2 ? 0 : 1 - slot * 0.06;
          let zIndex = 30 - slot * 5;

          // When flip is in progress:
          if (isFlipping) {
            if (isFront) {
              targetRotY = 90;
              targetRotX = 0;
              targetRotZ = 0;
              targetOpacity = 0;
              targetScale = 0.98;
              zIndex = 40;
            } else if (slot <= 3) {
              const nextSlot = slot - 1;
              targetX = effBaseX - nextSlot * effStepX;
              targetY = 0 - nextSlot * (isMobile ? 5 : 8);
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
                duration: isFront && isFlipping ? 0.6 : 0.52,
                ease: isFront && isFlipping ? [0.35, 0.85, 0.45, 1] : [0.34, 1.3, 0.64, 1],
              }}
              style={{
                width: effWidth,
                height: effHeight,
                position: 'absolute',
                zIndex,
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Pure Card Surface */}
              <div
                className="w-full h-full rounded-[18px] sm:rounded-[24px] overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  boxShadow:
                    slot === 0 && !isFlipping
                      ? '0 32px 64px -12px rgba(0, 0, 0, 0.52), 0 10px 22px -6px rgba(0, 0, 0, 0.32)'
                      : '0 18px 36px -10px rgba(0, 0, 0, 0.38)',
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
