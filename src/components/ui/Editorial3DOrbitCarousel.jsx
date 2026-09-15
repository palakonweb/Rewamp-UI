import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Editorial3DOrbitCarousel
 * Exact recreation of Recording 154902.mp4:
 * 3D tilted elliptical carousel of vibrant editorial poster cards with SHOWCASE watermark.
 */
export function Editorial3DOrbitCarousel({
  autoRotate = true,
  speed = 1.0,
  className = '',
}) {
  const containerRef = useRef(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, startAngle: 0 });
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Six distinct editorial poster designs from the reference video
  const posterCards = [
    {
      id: 'red-duotone',
      type: 'red',
      render: () => (
        <div className="w-full h-full bg-gradient-to-br from-[#881337] via-[#991B1B] to-[#450A0A] p-5 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Silhouette shadow backdrop */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_40%,#F43F5E,transparent_60%)]" />
          <div className="relative z-10 text-[10px] tracking-widest font-mono uppercase text-red-200/70">
            SHOWCASE · 01
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold tracking-tight leading-tight">RED NOCTURNE</h3>
            <p className="text-[11px] text-red-200/60 font-mono mt-1">NORSE BJØRGIN</p>
          </div>
        </div>
      ),
    },
    {
      id: 'stark-swiss',
      type: 'white',
      render: () => (
        <div className="w-full h-full bg-[#FFFFFF] p-5 flex flex-col justify-between text-neutral-900 border border-neutral-200/80 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">ARCHIVE</span>
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
          </div>
          {/* Oversized Typographic Character from video */}
          <div className="my-auto flex flex-col items-center justify-center">
            <div className="w-10 h-2 bg-neutral-900 mb-2 rounded-xs" />
            <span className="text-[80px] font-black leading-none tracking-tighter">E</span>
          </div>
          <div className="text-[10px] font-mono text-neutral-400 tracking-wider">
            EDITION · 11
          </div>
        </div>
      ),
    },
    {
      id: 'gola-yellow',
      type: 'yellow',
      render: () => (
        <div className="w-full h-full bg-[#FACC15] p-5 flex flex-col justify-between text-neutral-950 relative overflow-hidden">
          {/* Quirky Eyewear Graphic from video */}
          <div className="my-auto flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl font-serif leading-none -mt-4">'</span>
              <div className="w-10 h-10 rounded-full border-[6px] border-neutral-950" />
              <div className="w-10 h-10 rounded-full border-[6px] border-neutral-950" />
            </div>
            <span className="text-[26px] font-black tracking-tight mt-1">선글라스</span>
            <span className="text-[8px] font-bold tracking-widest uppercase bg-neutral-950 text-[#FACC15] px-2 py-0.5 rounded-full mt-2">
              GOLA EYEWEAR
            </span>
          </div>
          <div className="text-[10px] font-mono text-neutral-800 tracking-widest">
            COLLECTION 24
          </div>
        </div>
      ),
    },
    {
      id: 'obsidian-bust',
      type: 'dark',
      render: () => (
        <div className="w-full h-full bg-[#1C1C1F] p-5 flex flex-col justify-between text-white relative overflow-hidden border border-white/10">
          <div className="text-[10px] font-mono tracking-widest text-neutral-400">
            SCULPTURE
          </div>
          <div className="my-auto flex flex-col items-center justify-center opacity-85">
            <div className="w-20 h-24 rounded-t-full bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-900 flex items-center justify-center relative shadow-inner">
              <div className="absolute bottom-0 w-28 h-8 bg-neutral-800 rounded-t-lg" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
            <span>PROFILE</span>
            <span>04</span>
          </div>
        </div>
      ),
    },
    {
      id: 'electric-blue',
      type: 'blue',
      render: () => (
        <div className="w-full h-full bg-[#2563EB] p-5 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono text-blue-200">
            <span>INTERFACE</span>
            <span className="px-2 py-0.5 rounded-full bg-[#A3E635] text-neutral-950 font-bold text-[9px] shadow-sm animate-bounce">
              Hello!
            </span>
          </div>
          {/* Big "Re-" typographic element from video */}
          <div className="my-auto">
            <span className="text-5xl font-black tracking-tighter block leading-none">
              Re—
            </span>
            <span className="text-xs text-blue-100 font-mono mt-1 block">
              3D Interactive
            </span>
          </div>
          <div className="text-[10px] font-mono text-blue-200/80">
            SYSTEM 2026
          </div>
        </div>
      ),
    },
    {
      id: 'swiss-ai',
      type: 'swiss',
      render: () => (
        <div className="w-full h-full bg-[#F5F5F7] p-5 flex flex-col justify-between text-neutral-900 border border-neutral-200/80 relative overflow-hidden">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase block mb-1">
              MANIFESTO
            </span>
            <h4 className="text-[13px] font-extrabold uppercase tracking-tight leading-snug">
              HOW—TO—SURVIVE THE AI ERA →
            </h4>
          </div>
          <div className="border-t border-neutral-300 pt-3">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">
              OPEN CONFERENCE
            </div>
            <div className="text-[11px] font-bold text-neutral-800">
              NORSE BJØRGIN
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              FRI—SUN · NOV 24
            </div>
          </div>
        </div>
      ),
    },
  ];

  const totalCards = posterCards.length;
  // Ellipse dimensions
  const rx = 260; // horizontal radius
  const ry = 95;  // vertical radius

  // Continuous rotation loop
  useEffect(() => {
    if (!autoRotate || isHovered || isDragging) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time) => {
      if (lastTimeRef.current != null) {
        const dt = (time - lastTimeRef.current) / 1000;
        const angularVelocity = 0.55 * speed; // radians per second
        setRotationAngle((prev) => (prev + angularVelocity * dt) % (2 * Math.PI));
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoRotate, isHovered, isDragging, speed]);

  // Drag interaction
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      startAngle: rotationAngle,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const angleDelta = (dx / 180) * (Math.PI / 2);
    setRotationAngle(dragStartRef.current.startAngle + angleDelta);
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
      className={`relative w-full h-[520px] md:h-[560px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl flex items-center justify-center ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #FAFBFD 0%, #E6E8EC 55%, #D0D4DA 100%)',
      }}
    >
      {/* Giant Architectural Watermark Text from video: "SHOWCASE 11" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[120px] sm:text-[160px] md:text-[200px] font-black tracking-tighter text-neutral-900/[0.07] uppercase whitespace-nowrap">
          SHOWCASE 11
        </span>
      </div>

      {/* Tilted Perspective Plane */}
      <div 
        className="relative w-0 h-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: 'rotateZ(-8deg)',
        }}
      >
        {posterCards.map((card, idx) => {
          // Angle for each card along the 3D orbit
          const baseAngle = (idx / totalCards) * 2 * Math.PI;
          const currentAngle = (baseAngle + rotationAngle) % (2 * Math.PI);

          // 3D Elliptical Projection
          const x = Math.sin(currentAngle) * rx;
          const y = Math.cos(currentAngle) * ry;

          // Depth attributes (cos gives depth from -1 [back] to +1 [front])
          const depth = Math.cos(currentAngle);
          const normDepth = (depth + 1) / 2; // 0 (back) to 1 (front)

          const scale = 0.84 + normDepth * 0.26;
          const zIndex = Math.round(normDepth * 50);
          const opacity = 0.65 + normDepth * 0.35;
          const rotZ = Math.sin(currentAngle) * -7;

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x,
                y,
                scale,
                opacity,
                rotateZ: rotZ,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 40,
                mass: 0.7,
              }}
              style={{
                width: 195,
                height: 255,
                position: 'absolute',
                top: -127,
                left: -97,
                zIndex,
              }}
              className="pointer-events-auto"
              onClick={() => {
                // Clicking a card smoothly brings it to front (depth = 1 => currentAngle = 0)
                setRotationAngle((prev) => prev - currentAngle);
              }}
            >
              <div
                className="w-full h-full rounded-[18px] overflow-hidden shadow-2xl transition-transform duration-200 hover:scale-[1.04] cursor-pointer"
                style={{
                  boxShadow:
                    normDepth > 0.6
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 8px 18px -6px rgba(0, 0, 0, 0.25)'
                      : '0 12px 24px -8px rgba(0, 0, 0, 0.25)',
                }}
              >
                {card.render()}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Editorial3DOrbitCarousel;
