import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, Lock } from 'lucide-react';

const promptContent = `Vercel/Linear style magnetic button. Glassmorphic dark pill with an interactive interior spotlight that precisely tracks the mouse cursor. Text layers have subtle parallax movement.`;

function LinearMagneticButton({ children }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring configurations
  const springConfigBtn = { stiffness: 200, damping: 20, mass: 0.2 };
  const springConfigText = { stiffness: 300, damping: 15, mass: 0.1 };
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const btnX = useSpring(mouseX, springConfigBtn);
  const btnY = useSpring(mouseY, springConfigBtn);
  
  const textX = useSpring(useTransform(mouseX, v => v * 0.5), springConfigText);
  const textY = useSpring(useTransform(mouseY, v => v * 0.5), springConfigText);

  // Interior Spotlight position (raw pixels from top/left)
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull
    mouseX.set((e.clientX - centerX) * 0.2); 
    mouseY.set((e.clientY - centerY) * 0.2);

    // Spotlight tracking inside button
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="relative px-12 py-5 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-white/10"
      style={{ x: btnX, y: btnY, background: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(10px)' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Dynamic Interior Spotlight */}
      <motion.div 
        className="absolute w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"
        style={{ 
            x: spotX, 
            y: spotY, 
            translateX: '-50%', 
            translateY: '-50%',
            opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Parallax Content Layer */}
      <motion.div 
        className="relative z-10 flex items-center gap-3 text-white/90 font-medium tracking-wide text-sm"
        style={{ x: textX, y: textY }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function MagneticParallaxButtonShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-16 flex flex-col items-center justify-center min-h-[400px] bg-[#020202]">
        
        {/* Ambient background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <p className="absolute top-10 text-[10px] uppercase tracking-[0.3em] mb-12 text-white/30 text-center">
          Linear Spotlight Button
        </p>

        <LinearMagneticButton>
          <Lock size={16} className="text-white/50" />
          <span>Authenticate</span>
        </LinearMagneticButton>

      </div>
</div>
  );
}
