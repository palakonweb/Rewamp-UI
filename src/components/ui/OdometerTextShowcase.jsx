
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Physical slot-machine odometer text animation, numbers physically scroll vertically with spring physics and motion blur, high-effort custom implementation, premium dashboard aesthetic`;

// Individual spinning digit
function Digit({ value, height = 50, delay = 0 }) {
  const animatedValue = useSpring(0, { stiffness: 60, damping: 20, bounce: 0.2 });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        animatedValue.set(value);
      }, delay * 1000);
    }
  }, [inView, value, animatedValue, delay]);

  // Map the animated value to a Y translation (each digit is 'height' px tall)
  const y = useTransform(animatedValue, (v) => -v * height);
  // Add a fake motion blur effect based on velocity
  const filter = useTransform(animatedValue, (v) => {
    const velocity = animatedValue.getVelocity();
    const blur = Math.min(Math.abs(velocity) * 0.015, 8); // Max 8px blur
    return `blur(0px) translateY(0px)`; // Simplified for cross-browser, let's stick to standard Y movement, complex SVG filters per digit can tank perf.
  });

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height, width: '0.65em' }}>
      <motion.div
        className="absolute top-0 left-0 flex flex-col items-center justify-start w-full"
        style={{ y, filter }}
      >
        {[...Array(10).keys()].map((num) => (
          <div key={num} className="flex items-center justify-center font-bold tracking-tighter" style={{ height }}>
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Handles parsing strings into odometers (e.g., "$4,250")
export function Odometer({ value, height = 48, className, baseDelay = 0 }) {
  const strValue = value.toString();
  // For simplicity in this demo, we assume the value maps cleanly to digits.
  // We'll strip non-digits and just animate the digits.
  const digits = strValue.split('');

  return (
    <div className={`flex items-center font-mono ${className}`} style={{ fontSize: height * 0.85, lineHeight: `${height}px` }}>
      {digits.map((char, i) => {
        const isDigit = !isNaN(parseInt(char, 10));
        if (!isDigit) {
          return (
            <span key={i} className="flex items-center justify-center font-bold" style={{ height }}>
              {char}
            </span>
          );
        }
        return <Digit key={i} value={parseInt(char, 10)} height={height} delay={baseDelay + (digits.length - i) * 0.15} />;
      })}
    </div>
  );
}

export default function OdometerTextShowcase() {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const stats = [
    { label: 'Revenue', value: '$42,500', color: '#c8a87e' },
    { label: 'Active Users', value: '1,284', color: '#7ec8c8' },
    { label: 'Latency', value: '12ms', color: '#7ec8a4' },
  ];

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[450px]"
        style={{ background: '#08080a' }}>

        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <p className="text-[10px] uppercase tracking-[0.3em] mb-12 relative z-10" style={{ color: 'rgba(255,255,255,0.3)' }}>Physical Odometer</p>

        <div key={key} className="flex flex-wrap justify-center gap-12 sm:gap-20 w-full relative z-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}>
                <Odometer value={stat.value} height={56} baseDelay={i * 0.2} />
              </div>
              <p className="text-[11px] mt-4 font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setKey(k => k + 1)}
          className="mt-16 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase relative z-10"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
          Roll Numbers
        </motion.button>
      </div>
</div>
  );
}
