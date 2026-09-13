export const archCardCarouselPrompt = `Create an interactive curved arch card carousel (wheel deck slider) matching modern editorial motion design:
- Geometry: Cards are dynamically arranged along a convex circular arch / convex wheel with radius ~900px, tangential z-rotation following the curve curvature.
- Center Stage: Cards rise towards the apex at the center with natural scale and drop shadow, descending and angling gracefully towards the outer wings.
- Tactile Physics: Smooth pointer drag and swipe with instantaneous velocity tracking, friction damping, spring snapping, and horizontal mouse wheel support.
- Dome Track: A soft subtle convex radial surface beneath the cards highlighting the wheel track.
- Controls: Smooth autoplay toggle, previous/next buttons, and interactive card indicators.
- Tech: React, Framer Motion, TypeScript, Tailwind CSS.`;

export const archCardCarouselCode = `import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

export interface CardItem {
  id: string;
  title: string;
  category: string;
  color: string;
  customContent?: React.ReactNode;
}

const DEMO_CARDS: CardItem[] = [
  {
    id: '1',
    title: 'Typographic Poster',
    category: 'Editorial',
    color: '#18181B',
    customContent: (
      <div className="w-full h-full bg-[#1A1A1E] text-white flex flex-col justify-between p-5 select-none">
        <span className="text-[10px] font-mono tracking-widest text-white/50">N° 01 / ARCH</span>
        <div className="my-auto space-y-[-8px]">
          <h2 className="text-4xl font-black tracking-tighter text-white">OK</h2>
          <h2 className="text-4xl font-black tracking-tighter text-zinc-400">RO</h2>
          <h2 className="text-3xl font-black tracking-tighter text-white/20">GRO</h2>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">100% PURE</span>
      </div>
    ),
  },
  {
    id: '2',
    title: 'Ceramic Form',
    category: 'Sculpture',
    color: '#D4CEBC',
    customContent: (
      <div className="w-full h-full bg-[#E5DFC9] relative p-5 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-[#786D5C] uppercase">Studio Vessel</span>
        <div className="w-24 h-36 mx-auto bg-stone-300 rounded-full shadow-lg" />
        <span className="text-xs font-semibold text-[#5A5042]">Form Study</span>
      </div>
    ),
  },
  {
    id: '3',
    title: 'Woven Blanket',
    category: 'Textile',
    color: '#C92A2A',
    customContent: (
      <div className="w-full h-full bg-[#B31D1D] p-5 text-white flex flex-col justify-between">
        <span className="text-[10px] font-mono uppercase text-white/70">Nordic Weave</span>
        <div className="w-32 h-32 mx-auto bg-emerald-700 rounded-lg shadow-inner" />
        <span className="text-xs font-semibold">Wool 98%</span>
      </div>
    ),
  },
  {
    id: '4',
    title: 'Avian Focus',
    category: 'Fauna',
    color: '#212529',
    customContent: (
      <div className="w-full h-full bg-[#111113] p-5 text-white flex flex-col justify-end">
        <span className="text-[10px] font-mono uppercase text-zinc-400">Studio</span>
        <h4 className="text-base font-semibold">Columba Livia</h4>
      </div>
    ),
  },
  {
    id: '5',
    title: 'Nocturne Profile',
    category: 'Portrait',
    color: '#09090B',
    customContent: (
      <div className="w-full h-full bg-[#070709] p-5 text-white flex flex-col justify-between">
        <span className="text-[10px] font-mono text-white/40">50MM F/1.2</span>
        <h4 className="text-base font-semibold text-white/90">Luminescence</h4>
      </div>
    ),
  },
  {
    id: '6',
    title: 'Cobalt Arc',
    category: 'Abstract',
    color: '#3B82F6',
    customContent: (
      <div className="w-full h-full bg-[#7CA1D8] p-5 text-black flex flex-col justify-between">
        <span className="text-[10px] font-mono font-bold text-black/60">№ 42</span>
        <h4 className="text-base font-bold">CONCENTRIC</h4>
      </div>
    ),
  },
  {
    id: '7',
    title: 'Chroma Field',
    category: 'Digital',
    color: '#84CC16',
    customContent: (
      <div className="w-full h-full bg-[#1C1917] p-5 text-white flex flex-col justify-between">
        <span className="text-[10px] font-mono text-lime-400">SPECTRUM 08</span>
        <h4 className="text-base font-bold text-lime-400">SYNAPSE</h4>
      </div>
    ),
  },
];

export default function ArchCardCarousel({
  cards = DEMO_CARDS,
  radius = 920,
  stepAngleDeg = 14.5,
  cardWidth = 195,
  cardHeight = 265,
}: {
  cards?: CardItem[];
  radius?: number;
  stepAngleDeg?: number;
  cardWidth?: number;
  cardHeight?: number;
}) {
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  const stepAngleRad = (stepAngleDeg * Math.PI) / 180;
  const count = cards.length;
  const totalSpanRad = count * stepAngleRad;

  useEffect(() => {
    const centerIndex = (Math.round(-rotation / stepAngleDeg) % count + count) % count;
    setActiveIndex(centerIndex);
  }, [rotation, stepAngleDeg, count]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.02) {
          setRotation((prev) => prev + velocityRef.current);
          velocityRef.current *= 0.94;
        } else if (isPlaying) {
          setRotation((prev) => prev - 0.18);
        }
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startRotationRef.current = rotation;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    setRotation(startRotationRef.current + (dx / radius) * (180 / Math.PI) * 1.35);

    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    velocityRef.current = ((e.clientX - lastXRef.current) / dt) * 0.45;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const rotateTo = (i: number) => {
    velocityRef.current = 0;
    setRotation(-i * stepAngleDeg);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative w-full overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing"
        style={{ height: \`\${cardHeight + 175}px\` }}
      >
        {/* Dome arc */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: \`\${radius * 2}px\`,
            height: \`\${radius * 2}px\`,
            bottom: \`-\${radius * 2 - (cardHeight + 115)}px\`,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F1EEE7 45%, #E5E1D5 100%)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        />

        {/* Cards along arch */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {cards.map((card, i) => {
            const rotRad = (rotation * Math.PI) / 180;
            const baseAngle = i * stepAngleRad + rotRad;
            let offsetAngle = ((baseAngle % totalSpanRad) + totalSpanRad) % totalSpanRad;
            if (offsetAngle > totalSpanRad / 2) offsetAngle -= totalSpanRad;

            const offsetDeg = (offsetAngle * 180) / Math.PI;
            if (Math.abs(offsetDeg) > 55) return null;

            const x = radius * Math.sin(offsetAngle);
            const y = radius * (1 - Math.cos(offsetAngle));
            const dist = Math.abs(offsetDeg);

            return (
              <div
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  rotateTo(i);
                }}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  width: \`\${cardWidth}px\`,
                  height: \`\${cardHeight}px\`,
                  transformOrigin: '50% 100%',
                  transform: \`translate3d(\${x}px, \${y}px, 0px) rotateZ(\${offsetDeg}deg) scale(\${Math.max(0.86, 1.0 - (dist / 55) * 0.16)})\`,
                  zIndex: Math.round(100 - dist * 1.5),
                  opacity: dist > 46 ? 1 - (dist - 46) / 9 : 1,
                  filter: \`drop-shadow(0 \${14 - dist * 0.18}px 20px rgba(0,0,0,0.14))\`,
                }}
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden border border-black/8 bg-white shadow-xs">
                  {card.customContent}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-black/8 shadow-sm mt-3">
        <button
          onClick={() => setRotation((r) => r + stepAngleDeg)}
          className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-black/70 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-1.5">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => rotateTo(idx)}
              className={\`transition-all rounded-full cursor-pointer \${
                activeIndex === idx ? 'w-5 h-2 bg-[#EC5E27]' : 'w-2 h-2 bg-black/20'
              }\`}
            />
          ))}
        </div>
        <button
          onClick={() => setRotation((r) => r - stepAngleDeg)}
          className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-black/70 cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
`;
