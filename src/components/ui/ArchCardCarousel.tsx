import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

export interface CardItem {
  id: string;
  title: string;
  category: string;
  color: string;
  image?: string;
  customContent?: React.ReactNode;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 'typography',
    title: 'Typographic Poster',
    category: 'Editorial',
    color: '#18181B',
    customContent: (
      <div className="w-full h-full bg-[#1A1A1E] text-white flex flex-col justify-between p-5 select-none relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-mono tracking-widest text-white/50">N° 01 / ARCH</span>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="my-auto space-y-[-8px]">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none text-white">
            OK
          </h2>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none text-zinc-400">
            RO
          </h2>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter leading-none text-white/20">
            GRO
          </h2>
        </div>
        <div className="border-t border-white/10 pt-2 flex justify-between items-center text-[10px] font-mono text-zinc-400">
          <span>VOL. 26</span>
          <span>100% PURE</span>
        </div>
      </div>
    ),
  },
  {
    id: 'ceramic-vase',
    title: 'Ceramic Form',
    category: 'Sculpture',
    color: '#D4CEBC',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=85',
    customContent: (
      <div className="w-full h-full bg-[#E5DFC9] relative overflow-hidden flex items-center justify-center">
        {/* Modern sculpted vase illustration fallback */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFEAE1] to-[#D8CFBC]" />
        <svg viewBox="0 0 200 280" className="w-3/4 h-3/4 drop-shadow-xl">
          <defs>
            <linearGradient id="vaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F6F0" />
              <stop offset="45%" stopColor="#EDE5D8" />
              <stop offset="85%" stopColor="#C8BCAB" />
              <stop offset="100%" stopColor="#9C8E7B" />
            </linearGradient>
            <filter id="vaseShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity="0.25" />
            </filter>
          </defs>
          <ellipse cx="100" cy="245" rx="55" ry="12" fill="#B5A895" opacity="0.4" />
          <path
            d="M90,35 C90,30 110,30 110,35 L108,80 C135,115 155,160 155,200 C155,235 130,245 100,245 C70,245 45,235 45,200 C45,160 65,115 92,80 Z"
            fill="url(#vaseGrad)"
            filter="url(#vaseShadow)"
          />
          <ellipse cx="100" cy="35" rx="10" ry="3.5" fill="#8C7E6D" opacity="0.6" />
        </svg>
        <span className="absolute bottom-3 left-4 text-[10px] font-medium tracking-widest text-[#786D5C] uppercase">
          Studio Vessel
        </span>
      </div>
    ),
  },
  {
    id: 'folded-textile',
    title: 'Woven Blanket',
    category: 'Textile',
    color: '#C92A2A',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=85',
    customContent: (
      <div className="w-full h-full bg-[#B31D1D] relative overflow-hidden flex flex-col justify-between p-4 text-white">
        <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-white/70">
          <span>Nordic Weave</span>
          <span>Wool 98%</span>
        </div>
        {/* Geometric drape illustration */}
        <div className="my-auto relative w-full h-44 flex items-center justify-center">
          <div className="w-36 h-40 bg-[#0F5132] rounded-b-xl shadow-2xl relative overflow-hidden border-t-8 border-[#198754]">
            {/* Plaid grid pattern */}
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, #E63946 0px, #E63946 8px, transparent 8px, transparent 16px),
                  repeating-linear-gradient(90deg, #48CAE4 0px, #48CAE4 8px, transparent 8px, transparent 16px)
                `,
                backgroundBlendMode: 'difference',
              }}
            />
            <div className="absolute bottom-0 inset-x-0 h-6 bg-[#0B3D26] flex items-center justify-center">
              <div className="w-full border-b border-dashed border-emerald-300/40" />
            </div>
          </div>
        </div>
        <div className="text-[11px] font-medium tracking-wide text-white/90">
          Double-faced check throw
        </div>
      </div>
    ),
  },
  {
    id: 'pigeon-portrait',
    title: 'Avian Focus',
    category: 'Fauna',
    color: '#212529',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=85',
    customContent: (
      <div className="w-full h-full bg-[#111113] relative overflow-hidden flex flex-col justify-end p-5 text-white">
        {/* Subtle portrait gradient & radial eye highlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/60 to-zinc-800/40" />
        <svg viewBox="0 0 200 240" className="absolute top-4 inset-x-0 w-full h-48 opacity-90">
          <path
            d="M60,180 C50,110 80,40 140,50 C180,60 190,130 180,180 Z"
            fill="#3F3F46"
          />
          <path
            d="M140,50 C160,55 175,80 165,100 C155,115 130,110 120,95 Z"
            fill="#52525B"
          />
          <circle cx="148" cy="76" r="10" fill="#E4E4E7" />
          <circle cx="149" cy="76" r="4.5" fill="#09090B" />
          <circle cx="151" cy="74" r="1.5" fill="#FFFFFF" />
          <polygon points="175,80 205,92 172,96" fill="#F43F5E" />
        </svg>
        <div className="relative z-10">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
            Monochrome Studio
          </span>
          <h3 className="text-base font-semibold text-white mt-0.5">Columba Livia</h3>
        </div>
      </div>
    ),
  },
  {
    id: 'noir-profile',
    title: 'Nocturne Profile',
    category: 'Portrait',
    color: '#09090B',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85',
    customContent: (
      <div className="w-full h-full bg-[#070709] relative overflow-hidden flex flex-col justify-between p-5 text-white">
        <div className="flex justify-between items-start z-10">
          <span className="text-[10px] font-mono tracking-widest text-white/40">SERIES 04</span>
          <span className="text-[10px] font-mono text-white/30">50MM F/1.2</span>
        </div>
        {/* Silhouette profile vector */}
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="rimGlow" cx="70%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#A1A1AA" stopOpacity="0.4" />
              <stop offset="80%" stopColor="#18181B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M40,260 C40,210 65,190 85,170 C95,160 90,140 85,120 C80,105 75,90 95,60 C115,30 150,35 160,65 C165,80 155,95 155,110 C165,115 175,125 170,140 C165,150 150,155 145,165 C140,175 165,220 170,260 Z"
            fill="url(#rimGlow)"
          />
        </svg>
        <div className="relative z-10 border-t border-white/10 pt-2">
          <p className="text-[12px] font-medium text-white/80">Luminescence</p>
          <p className="text-[10px] font-mono text-white/40">CHIAROSCURO</p>
        </div>
      </div>
    ),
  },
  {
    id: 'blue-geometry',
    title: 'Cobalt Arc',
    category: 'Abstract',
    color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85',
    customContent: (
      <div className="w-full h-full bg-[#7CA1D8] relative overflow-hidden flex flex-col justify-between p-5 text-black">
        <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-widest text-black/60">
          <span>GRAPHIC STUDY</span>
          <span>№ 42</span>
        </div>
        {/* Bold black typographic arc from video */}
        <div className="relative w-full h-40 flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-36 h-36">
            <path
              d="M30,130 C30,60 90,30 140,30 L140,70 C105,70 70,90 70,130 Z"
              fill="#09090B"
            />
            <circle cx="120" cy="110" r="16" fill="#09090B" />
          </svg>
        </div>
        <div className="text-[11px] font-bold tracking-tight text-black/80">
          CONCENTRIC HARMONICS
        </div>
      </div>
    ),
  },
  {
    id: 'acid-art',
    title: 'Chroma Field',
    category: 'Digital',
    color: '#84CC16',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=85',
    customContent: (
      <div className="w-full h-full bg-[#1C1917] relative overflow-hidden flex flex-col justify-between p-5 text-white">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-mono tracking-wider text-lime-400">SPECTRUM 08</span>
          <div className="w-3 h-3 rounded-full border border-lime-400 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-lime-400" />
          </div>
        </div>
        <div className="my-auto relative">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-lime-500 via-emerald-400 to-teal-300 blur-sm opacity-90 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-black tracking-wider">
            SYNAPSE
          </div>
        </div>
        <div className="text-[10px] font-mono text-stone-400 flex justify-between">
          <span>FREQ: 142.4Hz</span>
          <span>SYNC: OK</span>
        </div>
      </div>
    ),
  },
];

export interface ArchCardCarouselProps {
  cards?: CardItem[];
  radius?: number;
  stepAngleDeg?: number;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
  autoPlaySpeed?: number; // degrees per frame (0 to disable by default)
}

export default function ArchCardCarousel({
  cards = DEFAULT_CARDS,
  radius = 840,
  stepAngleDeg = 13.2,
  cardWidth = 175,
  cardHeight = 244,
  className = '',
  autoPlaySpeed = 0,
}: ArchCardCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlaySpeed > 0);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const stepAngleRad = (stepAngleDeg * Math.PI) / 180;
  const count = cards.length;
  const totalSpanRad = count * stepAngleRad;

  // Track active center card index whenever rotation changes
  useEffect(() => {
    // Current normalized rotation in index space
    const centerIndex = (Math.round(-rotation / stepAngleDeg) % count + count) % count;
    setActiveIndex(centerIndex);
  }, [rotation, stepAngleDeg, count]);

  // Autoplay / Inertia animation loop
  useEffect(() => {
    let lastStamp = performance.now();

    const updateLoop = (now: number) => {
      const dt = Math.min((now - lastStamp) / 1000, 0.1);
      lastStamp = now;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.02) {
          setRotation((prev) => prev + velocityRef.current);
          velocityRef.current *= 0.94; // friction
        } else if (isPlaying) {
          setRotation((prev) => prev - (autoPlaySpeed || 0.18));
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, autoPlaySpeed]);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startRotationRef.current = rotation;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);

    const deltaX = currentX - startXRef.current;
    // Map linear pixel movement to rotation degrees along the arch
    const degDelta = (deltaX / radius) * (180 / Math.PI) * 1.35;
    setRotation(startRotationRef.current + degDelta);

    // Compute instantaneous velocity
    const dx = currentX - lastXRef.current;
    velocityRef.current = (dx / dt) * 0.45;

    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already lost
    }
  };

  // Step rotation by index
  const rotateToCard = useCallback(
    (index: number) => {
      const targetDeg = -index * stepAngleDeg;
      // Smooth snap to target
      velocityRef.current = 0;
      setRotation(targetDeg);
    },
    [stepAngleDeg]
  );

  const handlePrev = () => {
    setRotation((prev) => Math.round(prev / stepAngleDeg) * stepAngleDeg + stepAngleDeg);
  };

  const handleNext = () => {
    setRotation((prev) => Math.round(prev / stepAngleDeg) * stepAngleDeg - stepAngleDeg);
  };

  const handleReset = () => {
    velocityRef.current = 0;
    setRotation(0);
  };

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* ── Carousel Viewport ── */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          height: `${cardHeight + 175}px`,
        }}
      >
        {/* ── Bottom Convex Dome Wheel Arc (matching reference video) ── */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            bottom: `-${radius * 2 - (cardHeight + 115)}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F1EEE7 45%, #E5E1D5 100%)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 -20px 50px -15px rgba(0, 0, 0, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
          }}
        />

        {/* ── Cards Rendered Along Circular Arch ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {cards.map((card, i) => {
            // Convert current rotation to radians
            const rotRad = (rotation * Math.PI) / 180;
            const baseAngle = i * stepAngleRad + rotRad;

            // Normalize angle to [-totalSpanRad / 2, totalSpanRad / 2] for smooth looping
            let offsetAngle = ((baseAngle % totalSpanRad) + totalSpanRad) % totalSpanRad;
            if (offsetAngle > totalSpanRad / 2) {
              offsetAngle -= totalSpanRad;
            }

            const offsetDeg = (offsetAngle * 180) / Math.PI;

            // Only render cards currently within visible angular window
            if (Math.abs(offsetDeg) > 55) return null;

            // Polar coordinates along apex arch:
            // Center of circle is below: (0, R - cardHeight / 2)
            const x = radius * Math.sin(offsetAngle);
            const y = radius * (1 - Math.cos(offsetAngle)); // y drops as angle deviates from center

            // Cards tilt tangent to the circle
            const rotateZ = offsetDeg;

            // Scale & Depth
            const distFromCenter = Math.abs(offsetDeg);
            const scale = Math.max(0.86, 1.0 - (distFromCenter / 55) * 0.16);
            const opacity = distFromCenter > 46 ? 1 - (distFromCenter - 46) / 9 : 1;
            const zIndex = Math.round(100 - distFromCenter * 1.5);
            const isCenter = distFromCenter < stepAngleDeg / 2;

            return (
              <div
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  rotateToCard(i);
                }}
                className="absolute pointer-events-auto cursor-pointer transition-shadow duration-300"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transformOrigin: '50% 100%',
                  transform: `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotateZ}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter: `drop-shadow(0 ${14 - distFromCenter * 0.18}px ${20 + (isCenter ? 10 : 0)}px rgba(0, 0, 0, ${0.14 + (isCenter ? 0.08 : 0)}))`,
                }}
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden border border-black/8 bg-white transition-transform duration-200 hover:scale-[1.02] shadow-xs flex flex-col">
                  {card.customContent ? (
                    card.customContent
                  ) : card.image ? (
                    <div className="w-full h-full relative overflow-hidden bg-zinc-100">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                        <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                          {card.category}
                        </span>
                        <h4 className="text-sm font-semibold tracking-tight leading-snug">
                          {card.title}
                        </h4>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full h-full p-5 flex flex-col justify-between"
                      style={{ backgroundColor: card.color }}
                    >
                      <span className="text-xs font-mono uppercase text-white/70">
                        {card.category}
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight">{card.title}</h4>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Control Bar Below Arch ── */}
      <div className="relative z-10 -mt-2 flex items-center justify-between gap-4 px-6 py-3 rounded-full bg-white/90 backdrop-blur-md border border-black/8 shadow-sm max-w-sm w-full mx-auto">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            title="Previous card"
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            title="Next card"
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Card Dots Indicator */}
        <div className="flex items-center gap-1.5">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => rotateToCard(idx)}
              title={card.title}
              className={`transition-all rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-5 h-2 bg-[#EC5E27]'
                  : 'w-2 h-2 bg-black/15 hover:bg-black/30'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause rotation' : 'Autoplay rotation'}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition-all cursor-pointer"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={handleReset}
            title="Reset position"
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition-all cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
