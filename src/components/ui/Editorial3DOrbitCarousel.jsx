import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/**
 * Editorial3DOrbitCarousel
 * Exact recreation of Recording 2026-09-15 154902.mp4:
 * Cascading 3D diagonal conveyor stream of pure surreal art posters.
 * Cards travel continuously from bottom-right towards top-left,
 * tilting dynamically (from -14deg in center to +22deg at top-left exit)
 * with SHOWCASE 11 architectural watermark and editor controls.
 * Pure image cards with no black overlays and no text.
 */
export function Editorial3DOrbitCarousel({
  items = null,
  autoRotate = true,
  speed = 1.0,
  cardWidth = 220,
  cardHeight = 300,
  className = '',
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, startProgress: 0 });
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Pure surreal art images provided by the user
  const defaultItems = [
    { id: '1', image: '/cards/sky-curtain.png' },
    { id: '2', image: '/cards/airplane-sunset.png' },
    { id: '3', image: '/cards/rainbow-hill.png' },
    { id: '4', image: '/cards/train-window.jpg' },
    { id: '5', image: '/cards/kangaroo-planet.png' },
  ];

  const cards = items || defaultItems;
  const numCards = cards.length;

  // Diagonal motion vector from bottom-right (dx: 125, dy: 85) to top-left (-125, -85)
  // Matching the exact spacing and overlap from Recording 154902.mp4
  const stepX = 125;
  const stepY = 85;
  const unitStep = Math.hypot(stepX, stepY);
  const totalLength = numCards * unitStep;

  const dirX = stepX / unitStep;
  const dirY = stepY / unitStep;

  // Continuous animation loop moving up-left
  useEffect(() => {
    if (!autoRotate || isHovered || isDragging) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time) => {
      if (lastTimeRef.current != null) {
        const dt = (time - lastTimeRef.current) / 1000;
        const v = 58 * speed;
        setProgress((prev) => {
          let next = prev - v * dt;
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
  }, [autoRotate, isHovered, isDragging, speed, totalLength]);

  // Pointer drag to scrub along diagonal
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startProgress: progress,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const projectedDelta = dx * dirX + dy * dirY;
    let next = dragStartRef.current.startProgress + projectedDelta;
    while (next < 0) next += totalLength;
    setProgress(next % totalLength);
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
      className={`relative w-full h-[580px] md:h-[640px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl flex items-center justify-center ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #F8F9FA 0%, #E9ECEF 55%, #CED4DA 100%)',
        perspective: 1400,
      }}
    >
      {/* Top Header Controls from Video: Arrow + SHOWCASE 11 */}
      <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none z-20 text-neutral-800">
        <button className="p-1.5 rounded-full hover:bg-black/5 transition-colors pointer-events-auto cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-neutral-800" />
        </button>
        <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-neutral-500">
          SHOWCASE 11
        </span>
      </div>

      {/* Giant Architectural Background Watermark from Video: "SHOWCASE 11" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div className="flex items-center justify-center w-full px-6 opacity-[0.09] dark:opacity-[0.07]">
          <span className="text-[120px] sm:text-[180px] md:text-[230px] font-black tracking-tighter text-black uppercase leading-none">
            SH
          </span>
          <span className="w-24 sm:w-48" />
          <span className="text-[120px] sm:text-[180px] md:text-[230px] font-black tracking-tighter text-black uppercase leading-none">
            E 11
          </span>
        </div>
      </div>

      {/* 3D Diagonal Cylindrical Conveyor Anchor */}
      <div
        className="relative w-0 h-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {cards.map((card, idx) => {
          // Calculate continuous position along infinite diagonal loop
          const basePos = idx * unitStep;
          let currentPos = (basePos + progress) % totalLength;
          if (currentPos > totalLength / 2) {
            currentPos -= totalLength;
          }

          const stepRatio = currentPos / unitStep; // approx -2 to +2 for visible cards
          const posX = stepRatio * stepX;
          const posY = stepRatio * stepY;

          // Visual coordinates and rotation matching Recording 154902.mp4:
          // - When stepRatio > 0 (bottom-right / center-right): rotateZ is around -14deg
          // - As it crosses center (stepRatio approx -0.5 to 0): rotateZ is around -8deg to -6deg
          // - As it exits at top-left (stepRatio < -0.8): rotateZ smoothly tilts up to +22deg!
          let rotZ = -14;
          if (stepRatio < 0) {
            // Smoothly interpolate from -14deg up to +22deg as it moves towards top-left
            const t = Math.min(1, Math.abs(stepRatio) / 1.5);
            rotZ = -14 + t * 36; // -14 -> +22
          }

          // Depth scaling & zIndex matching video
          // Center-right cards (stepRatio around 0.3) are on top and largest
          const distFromFocus = Math.abs(stepRatio - 0.2);
          const scale = Math.max(0.82, 1.16 - distFromFocus * 0.16);
          // zIndex ensures lower-right card overlaps the card to its left
          const zIndex = Math.round(50 - stepRatio * 15);

          // Edge fade
          const distFromCenter = Math.hypot(posX, posY);
          const opacity = Math.max(0, 1 - Math.max(0, distFromCenter - 450) / 100);

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x: posX,
                y: posY,
                scale,
                opacity,
                rotateZ: rotZ,
              }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 42,
                mass: 0.75,
              }}
              style={{
                width: cardWidth,
                height: cardHeight,
                position: 'absolute',
                top: -cardHeight / 2,
                left: -cardWidth / 2,
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              className="pointer-events-auto"
              onClick={() => {
                // Click card to pull it into center focus
                setProgress((prev) => (prev - currentPos + totalLength) % totalLength);
              }}
            >
              {/* Pure Card Surface - No text, No black overlays */}
              <div
                className="w-full h-full rounded-[22px] overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
                style={{
                  boxShadow:
                    Math.abs(stepRatio) < 1.0
                      ? '0 30px 60px -14px rgba(0, 0, 0, 0.45), 0 12px 24px -6px rgba(0, 0, 0, 0.25)'
                      : '0 16px 32px -8px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                }}
              >
                <img
                  src={card.image}
                  alt="Artwork"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Editor Bar from Video: JITTER · VIDEO · TEMPLATE */}
      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono tracking-wider uppercase text-neutral-500">
        <span>JITTER</span>
        <span className="font-semibold text-neutral-700">VIDEO</span>
        <span>TEMPLATE</span>
      </div>
    </div>
  );
}

export default Editorial3DOrbitCarousel;
