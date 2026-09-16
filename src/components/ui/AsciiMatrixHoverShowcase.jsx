import React, { useRef, useState, useEffect } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `ASCII Matrix Hover Background. A grid of characters where cursor proximity triggers wild character randomization and bright neon glowing, settling back into static state as the cursor leaves.`;

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>[]{}";

export default function AsciiMatrixHoverShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Mask tracking for the bright neon glow
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const maskImage = useMotionTemplate`radial-gradient(250px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`;

  const [grid, setGrid] = useState([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  // Setup initial grid
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Roughly 20px per character block
      const c = Math.floor(rect.width / 24);
      const r = Math.floor(rect.height / 24);
      setCols(c);
      setRows(r);

      const newGrid = [];
      for (let i = 0; i < c * r; i++) {
        newGrid.push(CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length)));
      }
      setGrid(newGrid);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    // Randomize characters near the mouse
    const col = Math.floor(x / 24);
    const row = Math.floor(y / 24);
    const radius = 3; // Grid cells radius to randomize

    setGrid(prev => {
      const next = [...prev];
      for (let i = Math.max(0, col - radius); i <= Math.min(cols - 1, col + radius); i++) {
        for (let j = Math.max(0, row - radius); j <= Math.min(rows - 1, row + radius); j++) {
          const index = j * cols + i;
          // Calculate true distance to give it a circular randomization field
          const dist = Math.sqrt(Math.pow(i - col, 2) + Math.pow(j - row, 2));
          if (dist < radius && Math.random() > 0.3) {
             next[index] = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
          }
        }
      }
      return next;
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/10 flex flex-col items-center justify-center min-h-[500px] bg-[#020202] group select-none cursor-crosshair"
      >
        
        {/* Base Dim Grid */}
        <div className="absolute inset-0 p-4 font-mono text-[10px] sm:text-[12px] leading-[24px] tracking-[14px] sm:tracking-[16px] text-white/[0.05] break-words overflow-hidden pointer-events-none">
           {grid.map((char, i) => <span key={`base-${i}`}>{char}</span>)}
        </div>

        {/* Hover Highlight Grid Layer (Uses Mask) */}
        <motion.div 
            className="absolute inset-0 p-4 font-mono text-[10px] sm:text-[12px] leading-[24px] tracking-[14px] sm:tracking-[16px] break-words overflow-hidden pointer-events-none"
            style={{
                WebkitMaskImage: maskImage,
                maskImage: maskImage,
                color: '#34d399', // Emerald Neon Matrix Color
                textShadow: '0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.4)'
            }}
        >
           {grid.map((char, i) => <span key={`highlight-${i}`}>{char}</span>)}
        </motion.div>

        <BackgroundHeroOverlay />
      </div>
</div>
  );
}
