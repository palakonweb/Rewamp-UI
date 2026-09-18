import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import skyCurtain from '../../assets/cards/sky-curtain.webp';
import airplaneSunset from '../../assets/cards/airplane-sunset.webp';
import rainbowHill from '../../assets/cards/rainbow-hill.webp';
import trainWindow from '../../assets/cards/train-window.webp';
import kangarooPlanet from '../../assets/cards/kangaroo-planet.webp';

/**
 * DiagonalCardStack
 * Exact recreation of the diagonal cascading card stream & stacked deck collapse animation.
 */
export function DiagonalCardStack({
  cards = null,
  isStacked = false,
  autoPlay = true,
  speed = 1.0,
  cardWidth = 220,
  cardHeight = 220,
  stepX = 132,
  stepY = 84,
  className = '',
  onCardClick = null,
}) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [containerWidth, setContainerWidth] = useState(900);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, startOffset: 0 });

  // Measure the component's own container (not window.innerWidth) so sizing
  // reacts continuously to the actual available width - including when a side
  // panel shrinks the stage without the window itself resizing.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const REFERENCE_WIDTH = 900;
  const geomScale = Math.min(1, Math.max(0.45, containerWidth / REFERENCE_WIDTH));
  const screenSize = containerWidth < 480 ? 'mobile' : containerWidth < 820 ? 'tablet' : 'desktop';
  const effCardWidth = Math.round(Math.min(cardWidth, 220) * geomScale);
  const effCardHeight = Math.round(Math.min(cardHeight, 220) * geomScale);
  const effStepX = Math.round(stepX * geomScale);
  const effStepY = Math.round(stepY * geomScale);

  // Default cards matching the exact video design with surreal art imagery
  const defaultCards = [
    { id: '1', title: 'Stack 01', brand: 'rico.', image: skyCurtain },
    { id: '2', title: 'Stack 02', brand: 'rico.', image: airplaneSunset },
    { id: '3', title: 'Stack 03', brand: 'rico.', image: rainbowHill },
    { id: '4', title: 'Stack 04', brand: 'rico.', image: trainWindow },
    { id: '5', title: 'Stack 05', brand: 'rico.', image: kangarooPlanet },
    { id: '6', title: 'Stack 06', brand: 'rico.', image: skyCurtain },
    { id: '7', title: 'Stack 07', brand: 'rico.', image: airplaneSunset },
    { id: '8', title: 'Stack 08', brand: 'rico.', image: rainbowHill },
    { id: '9', title: 'Stack 09', brand: 'rico.', image: trainWindow },
    { id: '10', title: 'Stack 10', brand: 'rico.', image: kangarooPlanet },
  ];

  const cardList = cards || defaultCards;
  const numCards = cardList.length;
  const totalLength = numCards * Math.hypot(effStepX, effStepY);
  const unitStep = Math.hypot(effStepX, effStepY);

  const norm = Math.hypot(effStepX, effStepY);
  const dirX = effStepX / norm;
  const dirY = effStepY / norm;

  // Continuous animation loop moving up-left
  useEffect(() => {
    if (isStacked || !autoPlay || isHovered || dragActive) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time) => {
      if (lastTimeRef.current != null) {
        const dt = (time - lastTimeRef.current) / 1000;
        const moveSpeed = 68 * speed;
        setOffset((prev) => {
          let next = prev - moveSpeed * dt;
          if (next < 0) next += totalLength;
          return next % totalLength;
        });
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isStacked, autoPlay, isHovered, dragActive, speed, totalLength]);

  // Pointer drag along the diagonal axis
  const handlePointerDown = (e) => {
    if (isStacked) return;
    setDragActive(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startOffset: offset,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragActive || isStacked) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const projectedDelta = dx * dirX + dy * dirY;
    let nextOffset = dragStartRef.current.startOffset + projectedDelta;
    while (nextOffset < 0) nextOffset += totalLength;
    setOffset(nextOffset % totalLength);
  };

  const handlePointerUp = (e) => {
    if (dragActive) {
      setDragActive(false);
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
        setDragActive(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full max-w-full h-[400px] sm:h-[480px] md:h-[520px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl flex items-center justify-center ${className}`}
    >
      {/* Cards Engine Anchor */}
      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
        {cardList.map((card, idx) => {
          let posX = 0;
          let posY = 0;
          let zIndex = idx + 1;
          let scale = 1;
          let opacity = 1;

          if (isStacked) {
            // Stacked deck in center
            const layerFromTop = numCards - 1 - idx;
            const stackStep = screenSize === 'mobile' ? 1.5 : 3;
            posX = -layerFromTop * stackStep;
            posY = -layerFromTop * stackStep;
            zIndex = idx + 10;
            scale = 1 - layerFromTop * 0.005;
            opacity = 1;
          } else {
            // Diagonal cascade stream
            const basePos = idx * unitStep;
            let currentPos = (basePos + offset) % totalLength;
            if (currentPos > totalLength / 2) {
              currentPos -= totalLength;
            }

            const stepRatio = currentPos / unitStep;
            posX = stepRatio * effStepX;
            posY = stepRatio * effStepY;

            // zIndex ensures the lower-right cards overlap the upper-left ones
            zIndex = Math.round(100 + stepRatio * 10);

            // Subtle edge fade at boundaries
            const distFromCenter = Math.hypot(posX, posY);
            const fadeThreshold = screenSize === 'mobile' ? 220 : screenSize === 'tablet' ? 340 : 480;
            if (distFromCenter > fadeThreshold) {
              opacity = Math.max(0, 1 - (distFromCenter - fadeThreshold) / 100);
            }
          }

          return (
            <motion.div
              key={card.id || idx}
              initial={false}
              animate={{
                x: posX,
                y: posY,
                scale,
                opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: isStacked ? 240 : 360,
                damping: isStacked ? 28 : 36,
                mass: 0.85,
              }}
              style={{
                width: effCardWidth,
                height: effCardHeight,
                zIndex,
                position: 'absolute',
                top: -effCardHeight / 2,
                left: -effCardWidth / 2,
              }}
              className="pointer-events-auto"
              onClick={() => onCardClick && onCardClick(card, idx)}
            >
              {/* Card Surface - Pure Image */}
              <div
                className="w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: isStacked
                    ? '0 12px 28px -6px rgba(0, 0, 0, 0.65), 0 0 1px rgba(0,0,0,0.85)'
                    : '0 26px 46px -12px rgba(0, 0, 0, 0.55), 0 8px 18px -4px rgba(0, 0, 0, 0.35)',
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                  decoding="async"
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

export default DiagonalCardStack;
