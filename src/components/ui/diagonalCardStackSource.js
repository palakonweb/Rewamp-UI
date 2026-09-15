export const diagonalCardStackPrompt = `A sleek, continuous diagonal card stream and tactile stacked deck transition. Features deep obsidian matte rounded cards arranged in a cascading diagonal staircase from top-left to bottom-right that continuously glide in an infinite seamless marquee. Includes interactive pointer dragging along the diagonal axis, pause-on-hover, and a smooth spring-physics collapse into a 3D isometric stacked card deck in the center.`;

export const diagonalCardStackCode = `import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function DiagonalCardStack({
  cards = null,
  isStacked = false,
  autoPlay = true,
  speed = 1.0,
  cardWidth = 230,
  cardHeight = 230,
  stepX = 135,
  stepY = 88,
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

  const defaultCards = [
    { id: '1', title: 'Stack 01', brand: 'rico.' },
    { id: '2', title: 'Stack 01', brand: 'rico.' },
    { id: '3', title: 'Stack 01', brand: 'rico.' },
    { id: '4', title: 'Stack 01', brand: 'rico.' },
    { id: '5', title: 'Stack 01', brand: 'rico.' },
    { id: '6', title: 'Stack 01', brand: 'rico.' },
    { id: '7', title: 'Stack 01', brand: 'rico.' },
    { id: '8', title: 'Stack 01', brand: 'rico.' },
  ];

  const cardList = cards || defaultCards;
  const numCards = cardList.length;
  const totalLength = numCards * Math.hypot(stepX, stepY);
  const unitStep = Math.hypot(stepX, stepY);

  const norm = Math.hypot(stepX, stepY);
  const dirX = stepX / norm;
  const dirY = stepY / norm;

  useEffect(() => {
    if (isStacked || !autoPlay || isHovered || dragActive) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time) => {
      if (lastTimeRef.current != null) {
        const dt = (time - lastTimeRef.current) / 1000;
        const moveSpeed = 65 * speed;
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

  const centerIndex = (numCards - 1) / 2;

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
      className={\`relative w-full h-[520px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl flex items-center justify-center \${className}\`}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #F0F0F0 45%, #DCDCDD 100%)',
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.14) 100%)',
        }}
      />

      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
        {cardList.map((card, idx) => {
          let posX = 0;
          let posY = 0;
          let zIndex = idx + 1;
          let scale = 1;
          let opacity = 1;

          if (isStacked) {
            const stackOffset = idx - centerIndex;
            posX = stackOffset * -3.5;
            posY = stackOffset * -3.5;
            zIndex = idx;
            scale = 1 - Math.abs(stackOffset) * 0.008;
          } else {
            const basePos = idx * unitStep;
            let currentPos = (basePos + offset) % totalLength;
            if (currentPos > totalLength / 2) {
              currentPos -= totalLength;
            }

            const stepRatio = currentPos / unitStep;
            posX = stepRatio * stepX;
            posY = stepRatio * stepY;
            zIndex = Math.round(100 + stepRatio * 10);

            const distFromCenter = Math.hypot(posX, posY);
            if (distFromCenter > 520) {
              opacity = Math.max(0, 1 - (distFromCenter - 520) / 120);
            }
          }

          return (
            <motion.div
              key={card.id || idx}
              initial={false}
              animate={{ x: posX, y: posY, scale, opacity }}
              transition={{
                type: 'spring',
                stiffness: isStacked ? 220 : 380,
                damping: isStacked ? 26 : 38,
                mass: 0.8,
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
              <div
                className="group relative w-full h-full rounded-[22px] p-5 flex flex-col justify-between overflow-hidden transition-all duration-200"
                style={{
                  background: 'linear-gradient(175deg, #18181A 0%, #111112 55%, #0B0B0C 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: isStacked
                    ? '0 10px 25px -5px rgba(0, 0, 0, 0.65), 0 0 1px rgba(0,0,0,0.8)'
                    : '0 24px 44px -10px rgba(0, 0, 0, 0.55), 0 8px 18px -4px rgba(0, 0, 0, 0.35)',
                }}
              >
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    background: 'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[14px] font-medium tracking-tight text-neutral-200 select-none">
                    {card.title || 'Stack 01'}
                  </span>
                  <div className="flex flex-col gap-[3px] items-end justify-center py-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="w-4 h-[2px] rounded-full bg-neutral-400" />
                    <span className="w-4 h-[2px] rounded-full bg-neutral-400" />
                  </div>
                </div>

                <div className="relative z-10 w-full my-auto">
                  <div className="w-full h-[1px] bg-[#242427]" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[13px] font-normal tracking-tight text-neutral-400 select-none">
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
`;
