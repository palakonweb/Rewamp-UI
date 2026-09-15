import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, startOffset: 0 });

  // Default cards matching the exact video design: "Stack 01", divider, "rico."
  const defaultCards = [
    { id: '1', title: 'Stack 01', brand: 'rico.' },
    { id: '2', title: 'Stack 01', brand: 'rico.' },
    { id: '3', title: 'Stack 01', brand: 'rico.' },
    { id: '4', title: 'Stack 01', brand: 'rico.' },
    { id: '5', title: 'Stack 01', brand: 'rico.' },
    { id: '6', title: 'Stack 01', brand: 'rico.' },
    { id: '7', title: 'Stack 01', brand: 'rico.' },
    { id: '8', title: 'Stack 01', brand: 'rico.' },
    { id: '9', title: 'Stack 01', brand: 'rico.' },
    { id: '10', title: 'Stack 01', brand: 'rico.' },
  ];

  const cardList = cards || defaultCards;
  const numCards = cardList.length;
  const totalLength = numCards * Math.hypot(stepX, stepY);
  const unitStep = Math.hypot(stepX, stepY);

  const norm = Math.hypot(stepX, stepY);
  const dirX = stepX / norm;
  const dirY = stepY / norm;

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
      className={`relative w-full h-[480px] md:h-[520px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl flex items-center justify-center ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #E8EAED 50%, #C9CDD2 100%)',
      }}
    >
      {/* Vignette Shadow Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(0, 0, 0, 0.18) 100%)',
        }}
      />

      {/* Cards Engine Anchor */}
      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
        {cardList.map((card, idx) => {
          let posX = 0;
          let posY = 0;
          let zIndex = idx + 1;
          let scale = 1;
          let opacity = 1;

          if (isStacked) {
            // Stacked deck in center (exact recreation of frame 5.1s)
            // The top card is in the front, and subsequent cards peek behind
            const layerFromTop = numCards - 1 - idx;
            posX = -layerFromTop * 3;
            posY = -layerFromTop * 3;
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
            posX = stepRatio * stepX;
            posY = stepRatio * stepY;

            // zIndex ensures the lower-right cards overlap the upper-left ones
            zIndex = Math.round(100 + stepRatio * 10);

            // Subtle edge fade at boundaries
            const distFromCenter = Math.hypot(posX, posY);
            if (distFromCenter > 480) {
              opacity = Math.max(0, 1 - (distFromCenter - 480) / 120);
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
                width: cardWidth,
                height: cardHeight,
                zIndex,
                position: 'absolute',
                top: -cardHeight / 2,
                left: -cardWidth / 2,
              }}
              className="pointer-events-auto"
              onClick={() => onCardClick && onCardClick(card, idx)}
            >
              {/* Card Surface */}
              <div
                className="group relative w-full h-full rounded-[22px] p-5 flex flex-col justify-between overflow-hidden cursor-pointer transition-transform duration-200"
                style={{
                  background: 'linear-gradient(175deg, #18181A 0%, #121214 55%, #0B0B0C 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: isStacked
                    ? '0 12px 28px -6px rgba(0, 0, 0, 0.65), 0 0 1px rgba(0,0,0,0.85)'
                    : '0 26px 46px -12px rgba(0, 0, 0, 0.58), 0 8px 18px -4px rgba(0, 0, 0, 0.35)',
                }}
              >
                {/* Subtle sheen highlight */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    background: 'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.1) 0%, transparent 65%)',
                  }}
                />

                {/* Top Section */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[13px] font-medium tracking-tight text-white/90 select-none">
                    {card.title || 'Stack 01'}
                  </span>

                  {/* Top Right Double Dash Mark */}
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

export default DiagonalCardStack;
