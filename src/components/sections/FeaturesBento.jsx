import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

/* ═══ Premium Spotlight Card with Mouse Tracking ═══ */
function SpotlightCard({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(255,255,255,1), transparent 80%)`;
  const borderMask = useMotionTemplate`radial-gradient(300px circle at ${springX}px ${springY}px, rgba(129,1,0,0.8), transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      // Added liquid-metal class to match the button border & edges
      className={`group relative liquid-metal flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ${className}`}
    >
      {/* Spotlight Border (On Hover) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[6px]"
        style={{
          background: borderMask,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Spotlight Surface Glow */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-[#810100]/[0.02] to-transparent rounded-[6px]"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      />

      <div className="relative z-10 h-full flex flex-col rounded-[6px] bg-white">
        {children}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   1. PROMPT TO INTERFACE (Tall Left Card)
   ═══════════════════════════════════════════ */
function PromptCard() {
  return (
    <div className="flex flex-col h-full p-8 relative">
      <motion.div 
        className="mb-8 relative z-20"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Increased heading size from 28px to 36px/40px */}
        <h3 className="text-[36px] md:text-[40px] leading-[1.05] text-[var(--text)] mb-2 tracking-[-0.02em]">
          From prompt to <br/><span className="text-[var(--accent)]">interface.</span>
        </h3>
        <p className="text-[var(--text-3)] font-sans text-[14px] leading-relaxed max-w-[200px]">
          Describe your idea. Watch it render instantly.
        </p>
      </motion.div>

      <div className="flex-1 relative flex flex-col items-center justify-center pt-10 font-sans">
        <motion.div 
          className="w-full max-w-[280px] bg-[var(--bg)] border border-gray-100 rounded-[6px] p-2 pl-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center gap-3 relative z-20"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="opacity-80">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36-7.36l-.71.71M6.34 17.66l-.71.71m15.36 0l-.71-.71M6.34 6.34l-.71-.71" />
          </svg>
          <div className="flex-1 text-[var(--text)] text-[13px] font-medium tracking-wide flex">
            <motion.div 
              className="overflow-hidden whitespace-nowrap"
              animate={{ width: ['0%', '100%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
            >
              pricing card with toggle
            </motion.div>
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>|</motion.span>
          </div>
          <div className="w-8 h-8 rounded bg-[var(--accent)] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </motion.div>

        <div className="my-5 relative h-8 w-px flex flex-col items-center justify-center">
          <motion.div 
            className="w-[2px] bg-gradient-to-b from-transparent via-[#810100]/50 to-transparent absolute"
            animate={{ top: ['-100%', '200%'], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ height: '30px' }}
          />
        </div>

        <motion.div 
          className="w-full max-w-[280px] bg-[var(--bg)] rounded-[6px] border border-gray-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] p-4 relative z-10"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="flex justify-center items-center gap-3 mb-4 relative z-10">
            <span className="text-[10px] text-[var(--text-3)] font-medium">Monthly</span>
            <div className="w-8 h-4 rounded-full bg-[var(--accent)] p-[2px] flex items-center justify-end shadow-inner">
              <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
            </div>
            <span className="text-[10px] text-[var(--text)] font-semibold">Yearly</span>
          </div>

          <div className="flex gap-2 relative z-10">
            <div className="flex-1 bg-[var(--surface)] border border-gray-200/50 rounded-[6px] p-3 flex flex-col items-center">
              <span className="text-[9px] font-medium mb-0.5 text-[var(--text-2)]">Starter</span>
              <span className="text-[18px] font-bold mb-3 text-[var(--text)]">$19</span>
              <div className="w-full space-y-1.5 mt-auto">
                <div className="flex gap-1.5 items-center"><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg><span className="text-[6px] text-[var(--text-3)]">10 Projects</span></div>
              </div>
            </div>
            <div className="flex-1 bg-[var(--bg)] border border-[#faeaea] rounded-[6px] p-3 flex flex-col items-center relative shadow-md ring-1 ring-[#810100]/10">
              <div className="absolute -top-2 bg-[var(--accent)] text-white text-[7px] font-bold px-2 py-0.5 rounded shadow-sm">Popular</div>
              <span className="text-[9px] font-medium mb-0.5 text-[var(--text)] mt-1">Pro</span>
              <span className="text-[18px] font-bold mb-3 text-[var(--accent)]">$49</span>
              <div className="w-full space-y-1.5 mt-auto">
                <div className="flex gap-1.5 items-center"><svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg><span className="text-[6px] text-[var(--text-2)] font-medium">Unlimited</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   2. AI THAT UNDERSTANDS DESIGN (Center Top)
   ═══════════════════════════════════════════ */
function AIUnderstandsDesign() {
  return (
    <div className="p-8 h-full flex flex-col relative overflow-hidden">
      <motion.div 
        className="relative z-20 w-[80%] mb-2"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-[22px] text-[var(--text)] mb-2">
          AI that<br/>understands<br/>design.
        </h3>
        <p className="text-[var(--text-3)] font-sans text-[13px] leading-relaxed">
          Trained on modern UI patterns.
        </p>
      </motion.div>

      <div className="flex-1 relative flex items-center justify-center font-sans">
        <motion.div 
          className="relative w-[240px] h-[160px] mt-8 ml-8"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: [55, 45, 55], rotateZ: [-25, -15, -25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 border border-dashed border-gray-300 rounded-[6px] flex flex-col p-3 gap-2 opacity-50" style={{ transform: 'translateZ(-10px)' }}></div>
          
          <motion.div 
            className="absolute inset-0 bg-[var(--bg)] rounded-[6px] shadow-[0_25px_50px_rgba(0,0,0,0.12)] border border-gray-100 p-4 flex flex-col" 
            animate={{ translateZ: [10, 20, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[16px]">
                 👩‍🎨
               </div>
               <div className="flex flex-col justify-center">
                  <div className="text-[11px] font-bold text-[var(--text)] leading-tight">Jane Doe</div>
                  <div className="text-[8px] text-[var(--text-3)] font-medium">UI Designer</div>
               </div>
            </div>
            <div className="text-[8px] text-[var(--text-2)] leading-[1.6] mt-4 font-medium max-w-[180px]">
              "Conjure entirely changed how I build. Components are clean and consistent."
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -right-6 -top-10 w-20 h-20 bg-[var(--accent)] rounded-[6px] shadow-[0_20px_40px_rgba(129,1,0,0.4)] flex flex-col items-center justify-center border border-white/20" 
            animate={{ translateZ: [40, 60, 40], rotateZ: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="mb-1 opacity-90"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span className="text-[7px] text-white font-medium tracking-wide opacity-80">Image</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   3. EDIT IT YOUR WAY (Right Top)
   ═══════════════════════════════════════════ */
function FullyEditable() {
  const duration = 10;
  const ease = "easeInOut";
  const times = [0, 0.2, 0.5, 0.8, 1]; // 0: Start, 0.2: Radius Change, 0.5: Color Change, 0.8: Shadow Toggle, 1: Reset

  return (
    <div className="p-8 h-full flex flex-col relative">
      <motion.div 
        className="relative z-20 w-full mb-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-[22px] text-[var(--text)] mb-2">
          Edit it<br/>your way.
        </h3>
        <p className="text-[var(--text-3)] font-sans text-[13px] leading-relaxed">
          Tweak every detail instantly.
        </p>
      </motion.div>

      <div className="flex-1 relative flex items-center justify-center font-sans">
        {/* Animated Live Preview Element */}
        <motion.div 
          className="absolute -top-4 right-2 w-16 h-16 border z-10 flex items-center justify-center overflow-hidden"
          animate={{ 
            borderRadius: ['4px', '24px', '24px', '24px', '4px'],
            backgroundColor: ['var(--bg)', 'var(--bg)', '#f0f9ff', '#f0f9ff', 'var(--bg)'],
            borderColor: ['#e5e7eb', '#e5e7eb', '#bae6fd', '#bae6fd', '#e5e7eb'],
            boxShadow: [
              '0 4px 6px rgba(0,0,0,0.05)', 
              '0 4px 6px rgba(0,0,0,0.05)', 
              '0 4px 6px rgba(0,0,0,0.05)', 
              '0 20px 40px rgba(0,0,0,0.15)', 
              '0 4px 6px rgba(0,0,0,0.05)'
            ]
          }}
          transition={{ duration, repeat: Infinity, times, ease }}
        >
          <motion.div 
            className="w-10 h-10 flex flex-col items-center justify-center"
            animate={{ 
              borderRadius: ['2px', '16px', '16px', '16px', '2px'],
              backgroundColor: ['rgba(129,1,0,0.1)', 'rgba(129,1,0,0.1)', 'rgba(14,165,233,0.15)', 'rgba(14,165,233,0.15)', 'rgba(129,1,0,0.1)']
            }}
            transition={{ duration, repeat: Infinity, times, ease }}
          >
            <motion.span 
              className="text-[6px] font-semibold mt-1"
              animate={{ color: ['var(--accent)', 'var(--accent)', '#0ea5e9', '#0ea5e9', 'var(--accent)'] }}
              transition={{ duration, repeat: Infinity, times, ease }}
            >
              Radius
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Settings Panel */}
        <motion.div 
          className="w-full bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_25px_50px_rgba(0,0,0,0.1)] rounded-[6px] p-5 relative z-20 mt-4"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex gap-2.5 mb-5 items-center justify-center">
            {/* Red Button (Default Selected -> Unselected) */}
            <motion.div 
              className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center relative overflow-hidden"
              animate={{ 
                scale: [1, 1, 0.85, 0.85, 1],
                opacity: [1, 1, 0.5, 0.5, 1],
                boxShadow: ['0 4px 6px rgba(129,1,0,0.3)', '0 4px 6px rgba(129,1,0,0.3)', 'none', 'none', '0 4px 6px rgba(129,1,0,0.3)']
              }}
              transition={{ duration, repeat: Infinity, times, ease }}
            >
              <motion.div 
                className="absolute inset-0 rounded border-2 border-[var(--accent)]/30 pointer-events-none"
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{ duration, repeat: Infinity, times, ease }}
              />
              <motion.svg 
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"
                animate={{ scale: [1, 1, 0, 0, 1] }}
                transition={{ duration, repeat: Infinity, times, ease }}
              >
                <path d="M20 6L9 17l-5-5"/>
              </motion.svg>
            </motion.div>

            {/* Blue Button (Unselected -> Selected) */}
            <motion.div 
              className="w-6 h-6 rounded bg-[#0ea5e9] flex items-center justify-center relative overflow-hidden"
              animate={{ 
                scale: [0.85, 0.85, 1, 1, 0.85],
                opacity: [0.5, 0.5, 1, 1, 0.5],
                boxShadow: ['none', 'none', '0 4px 6px rgba(14,165,233,0.3)', '0 4px 6px rgba(14,165,233,0.3)', 'none']
              }}
              transition={{ duration, repeat: Infinity, times, ease }}
            >
              <motion.div 
                className="absolute inset-0 rounded border-2 border-[#0ea5e9]/30 pointer-events-none"
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration, repeat: Infinity, times, ease }}
              />
              <motion.svg 
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"
                animate={{ scale: [0, 0, 1, 1, 0] }}
                transition={{ duration, repeat: Infinity, times, ease }}
              >
                <path d="M20 6L9 17l-5-5"/>
              </motion.svg>
            </motion.div>

            <div className="w-5 h-5 rounded bg-emerald-500 shadow-sm opacity-50"></div>
            <div className="w-5 h-5 rounded bg-purple-500 shadow-sm opacity-50"></div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[var(--text-2)] font-medium w-12">Radius</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full relative">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-[var(--text)] rounded-full" 
                  animate={{ width: ['20%', '80%', '80%', '80%', '20%'] }} 
                  transition={{ duration, repeat: Infinity, times, ease }}
                ></motion.div>
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-gray-300 shadow-md rounded-full" 
                  animate={{ left: ['20%', '80%', '80%', '80%', '20%'], x: '-50%' }} 
                  transition={{ duration, repeat: Infinity, times, ease }}
                ></motion.div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[var(--text-2)] font-medium">Shadows</span>
              <div className="w-8 h-4 rounded-full p-[2px] bg-[var(--accent)] shadow-inner flex items-center justify-end">
                <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   4. CODE READY (Code Editor)
   ═══════════════════════════════════════════ */
function CodeReady() {
  const codeLines = [
    { html: `<span style="color:#c678dd">export function</span> <span style="color:#dcdcaa">Card</span>() {` },
    { html: `  <span style="color:#c678dd">return</span> (` },
    { html: `    <span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span><span style="color:#d4d4d4">=</span><span style="color:#ce9178">"p-4 bg-[var(--bg)]"</span><span style="color:#808080">&gt;</span>` },
    { html: `      <span style="color:#808080">&lt;</span><span style="color:#569cd6">h3</span><span style="color:#808080">&gt;</span><span style="color:#d4d4d4">Premium</span><span style="color:#808080">&lt;/</span><span style="color:#569cd6">h3</span><span style="color:#808080">&gt;</span>` },
    { html: `    <span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>` },
    { html: `  )` },
    { html: `}` },
  ];

  return (
    <div className="p-8 h-full flex flex-col relative">
      <motion.div 
        className="relative z-20 w-full mb-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-[22px] text-[var(--text)] mb-2">
          Ready to<br/>ship.
        </h3>
        <p className="text-[var(--text-3)] font-sans text-[13px] leading-relaxed max-w-[200px]">
          Clean React & Tailwind code.
        </p>
      </motion.div>

      <div className="flex-1 relative flex items-center justify-center mt-4">
        <motion.div 
          className="w-full bg-[var(--noir)] rounded-[6px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] overflow-hidden border border-[#333] relative z-20"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between px-3 py-2 bg-[#2d2d2d] border-b border-[#404040]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="text-[#999] text-[9px] font-mono">Component.tsx</span>
          </div>
          
          <div className="p-4 font-mono text-[10px] leading-[1.8] relative bg-[var(--noir)]">
            {codeLines.map((line, i) => (
              <motion.div 
                key={i}
                className="flex gap-3 overflow-hidden whitespace-nowrap"
                initial={{ width: '0%' }}
                animate={{ width: ['0%', '100%', '100%', '0%'] }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  times: [0, 0.1, 0.8, 1],
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              >
                <span className="text-[#858585] select-none w-3 text-right">{i + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: line.html }} />
              </motion.div>
            ))}
            
            <motion.div 
              className="w-2 h-3 bg-white/70 absolute bottom-[26px] left-[30px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   5. PREVIEW IN REAL-TIME (Right Bottom)
   ═══════════════════════════════════════════ */
function LivePreview() {
  return (
    <div className="p-8 h-full flex flex-col relative">
      <motion.div 
        className="relative z-20 w-full mb-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-[22px] text-[var(--text)] mb-2">
          Preview in<br/>real-time.
        </h3>
        <p className="text-[var(--text-3)] font-sans text-[14px] leading-relaxed max-w-[200px]">
          See changes instantly.
        </p>
      </motion.div>

      <div className="flex-1 relative flex items-center justify-center font-sans">
        <motion.div 
          className="w-full bg-[var(--surface)] rounded-[6px] shadow-[0_25px_50px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden relative z-20"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-[var(--surface)] px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
            <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
            <div className="w-3 h-3 rounded-full bg-[#e5e5e5]"></div>
            <div className="ml-4 flex-1 h-5 bg-[#fafafa] border border-gray-200 shadow-inner rounded flex items-center justify-center">
               <span className="text-[8px] text-[var(--text-3)] font-mono tracking-wider">localhost:3000</span>
            </div>
            <div className="w-8"></div>
          </div>
          
          <div className="p-5 bg-[var(--bg)] relative overflow-hidden flex flex-col items-center">
            <div className="flex items-center gap-3 w-full mb-4">
              <div className="w-10 h-10 rounded-full bg-[#fde9e9] shadow-sm flex items-center justify-center text-[18px]">
                 🤖
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[12px] font-bold text-[var(--text)] leading-tight mb-0.5">Conjure AI</div>
                <div className="text-[9px] text-[var(--text-3)] italic">@conjure_dev</div>
              </div>
            </div>
            
            <motion.div 
              className="w-full py-2 bg-[#f5e6e6] text-[#b39999] text-[10px] font-semibold text-center rounded cursor-pointer border border-[#f0dada] shadow-sm"
              animate={{ backgroundColor: ['#f5e6e6', 'var(--accent)', '#f5e6e6'], color: ['#b39999', '#ffffff', '#b39999'], borderColor: ['#f0dada', 'var(--accent)', '#f0dada'], boxShadow: ['0 1px 2px rgba(0,0,0,0.05)', '0 4px 10px rgba(129,1,0,0.3)', '0 1px 2px rgba(0,0,0,0.05)'] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 1], ease: "easeInOut" }}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 1] }}
              >
                Follow
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export function FeaturesBento() {
  return (
    <section id="bento" className="relative py-24 selection:bg-[var(--accent)] selection:text-white flex flex-col items-center justify-center min-h-[120vh]">

      <div className="relative z-10 w-full max-w-[1140px] px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <SpotlightCard className="lg:row-span-2 lg:col-span-1 min-h-[500px] h-full" delay={0.6}>
            <PromptCard />
          </SpotlightCard>

          <SpotlightCard className="min-h-[260px]" delay={0.7}>
            <AIUnderstandsDesign />
          </SpotlightCard>

          <SpotlightCard className="min-h-[260px]" delay={0.8}>
            <FullyEditable />
          </SpotlightCard>

          <SpotlightCard className="min-h-[260px]" delay={0.9}>
            <CodeReady />
          </SpotlightCard>

          <SpotlightCard className="min-h-[260px]" delay={1.0}>
            <LivePreview />
          </SpotlightCard>
        </div>

        <motion.div 
          className="mt-10 mx-auto w-fit bg-[var(--bg)] rounded-[6px] py-3 px-6 flex items-center justify-between gap-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] liquid-metal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--accent)]"></div>
            <span className="text-[11px] font-bold tracking-widest text-[var(--text)] uppercase font-sans">Conjure UI</span>
          </div>

          <div className="hidden md:block text-[13px] text-[var(--text-2)] font-medium tracking-wide font-sans">
            Design. Generate. <span className="text-[var(--accent)]">Ship.</span>
          </div>

          <button className="flex items-center gap-2 bg-[var(--accent)] text-white px-5 py-2 rounded text-[12px] font-semibold hover:bg-[var(--accent-hover)] transition-colors cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200 font-sans">
            Start conjuring 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
