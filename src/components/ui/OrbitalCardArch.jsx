import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * OrbitalCardArch
 * Exact recreation of Recording 2026-09-15 154820.mp4:
 * Cards gliding along a panoramic 3D curved horizon cylinder (rotateY, translateZ)
 * with continuous scroll and center deck collapse.
 */
export function OrbitalCardArch({
  cards = null,
  isStacked = false,
  autoScroll = true,
  speed = 1.0,
  cardWidth = 220,
  cardHeight = 220,
  className = '',
  onCardClick = null,
}) {
  const containerRef = useRef(null);
  const lastTimeRef = useRef(null);
  const animFrameRef = useRef(null);
  const dragStartRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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

  const effCardWidth = screenSize === 'mobile' ? Math.min(cardWidth, 130) : screenSize === 'tablet' ? Math.min(cardWidth, 175) : cardWidth;
  const effCardHeight = screenSize === 'mobile' ? Math.min(cardHeight, 130) : screenSize === 'tablet' ? Math.min(cardHeight, 175) : cardHeight;
  const stepDistance = screenSize === 'mobile' ? 145 : screenSize === 'tablet' ? 205 : 270;

  // Default cards with the surreal art images
  const defaultCards = [
    { id: '1', title: 'Orbit 7-01', brand: 'rico.', image: '/cards/sky-curtain.png' },
    { id: '2', title: 'Orbit 7-02', brand: 'rico.', image: '/cards/airplane-sunset.png' },
    { id: '3', title: 'Orbit 7-03', brand: 'rico.', image: '/cards/rainbow-hill.png' },
    { id: '4', title: 'Orbit 7-04', brand: 'rico.', image: '/cards/train-window.jpg' },
    { id: '5', title: 'Orbit 7-05', brand: 'rico.', image: '/cards/kangaroo-planet.png' },
  ];

  const cardList = cards || defaultCards;
  const numCards = cardList.length;
  const totalWidth = numCards * stepDistance;

  // Continuous cylindrical scroll (moving left)
  useEffect(() => {
    if (isStacked || !autoScroll || isHovered || isDragging) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time) => {
      if (lastTimeRef.current != null) {
        const dt = (time - lastTimeRef.current) / 1000;
        const v = 50 * speed;
        setScrollX((prev) => {
          let next = prev - v * dt;
          if (next < 0) next += totalWidth;
          return next % totalWidth;
        });
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isStacked, autoScroll, isHovered, isDragging, speed, totalWidth]);

  // Pointer drag along horizon
  const handlePointerDown = (e) => {
    if (isStacked) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      startScroll: scrollX,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isStacked) return;
    const dx = e.clientX - dragStartRef.current.x;
    let next = dragStartRef.current.startScroll + dx;
    while (next < 0) next += totalWidth;
    setScrollX(next % totalWidth);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full max-w-full h-[400px] sm:h-[480px] md:h-[520px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl flex items-center justify-center ${className}`}
      style={{
        perspective: 1200,
      }}
    >
      {/* 3D Panoramic Cylinder Stage */}
      <div
        className="relative w-0 h-0 flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {cardList.map((card, idx) => {
          let posX = 0;
          let posY = 0;
          let rotY = 0;
          let rotZ = 0;
          let scale = 1;
          let zIndex = 10;
          let opacity = 1;

          if (isStacked) {
            const stackOffset = idx;
            const stackStep = screenSize === 'mobile' ? 1.5 : 3;
            posX = -stackOffset * stackStep;
            posY = -stackOffset * stackStep;
            rotY = 0;
            rotZ = 0;
            scale = 1 - stackOffset * 0.006;
            zIndex = 40 - idx;
          } else {
            // Position along curved cylinder
            const basePos = idx * stepDistance;
            let currentX = (basePos + scrollX) % totalWidth;
            if (currentX > totalWidth / 2) {
              currentX -= totalWidth;
            }

            posX = currentX;
            const normDivider = screenSize === 'mobile' ? 170 : screenSize === 'tablet' ? 240 : 300;
            const normalizedX = currentX / normDivider; // -1 to +1
            posY = Math.pow(normalizedX, 2) * (screenSize === 'mobile' ? 16 : 28);
            rotY = -normalizedX * (screenSize === 'mobile' ? 18 : 24);
            rotZ = normalizedX * 7;
            scale = Math.max(0.85, 1 - Math.abs(normalizedX) * 0.12);
            zIndex = Math.round(50 - Math.abs(normalizedX) * 20);

            // Fade if far out
            const fadeThreshold = screenSize === 'mobile' ? 220 : screenSize === 'tablet' ? 340 : 420;
            if (Math.abs(currentX) > fadeThreshold) {
              opacity = Math.max(0, 1 - (Math.abs(currentX) - fadeThreshold) / 80);
            }
          }

          return (
            <motion.div
              key={card.id || idx}
              initial={false}
              animate={{
                x: posX,
                y: posY,
                rotateY: rotY,
                rotateZ: rotZ,
                scale,
                opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
                mass: 0.8,
              }}
              style={{
                width: effCardWidth,
                height: effCardHeight,
                position: 'absolute',
                top: -effCardHeight / 2,
                left: -effCardWidth / 2,
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              className="pointer-events-auto"
              onClick={() => onCardClick && onCardClick(card, idx)}
            >
              {/* Card Surface - Pure Image */}
              <div
                className="w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow:
                    Math.abs(posX) < 80 && !isStacked
                      ? '0 30px 60px -12px rgba(0, 0, 0, 0.55), 0 10px 22px -5px rgba(0, 0, 0, 0.35)'
                      : '0 16px 32px -8px rgba(0, 0, 0, 0.4)',
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
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

export default OrbitalCardArch;
