import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle } from 'lucide-react';

/*
 * MusicPlayerCardShowcase — animated music player card with vinyl disc spin,
 * waveform visualizer bars, and glassmorphic controls on a dark gradient background.
 */

const promptContent = `music player card — spinning vinyl disc with radial gradient, animated waveform equalizer bars with Framer Motion, glassmorphic controls, progress scrubber, frosted dark background`;

const TRACKS = [
  { title: 'Midnight Bloom', artist: 'Aether & Lo', duration: '3:42', hue: '#c084fc', bg: 'linear-gradient(135deg,#1a0a3e,#0a0a1a)' },
  { title: 'Golden Static', artist: 'Nova Drift', duration: '4:18', hue: '#f59e0b', bg: 'linear-gradient(135deg,#1a0f00,#0a0a00)' },
  { title: 'Ocean Script', artist: 'Cyan Theory', duration: '3:55', hue: '#22d3ee', bg: 'linear-gradient(135deg,#001a1a,#000a14)' },
];

const BAR_COUNT = 28;

function WaveformBars({ playing, hue }) {
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 32 }} aria-label="Waveform">
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const base = 0.25 + Math.sin(i * 0.7) * 0.2 + Math.cos(i * 0.4) * 0.15;
        return (
          <motion.div
            key={i}
            animate={playing ? {
              scaleY: [base, base + 0.5 + Math.random() * 0.4, base],
              opacity: [0.5, 1, 0.5],
            } : { scaleY: base * 0.4, opacity: 0.25 }}
            transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, repeatType: 'reverse', delay: i * 0.02 }}
            style={{ width: 2, height: '100%', borderRadius: 9999, background: hue, transformOrigin: 'bottom' }}
          />
        );
      })}
    </div>
  );
}

export default function MusicPlayerCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0.3);

  const t = TRACKS[trackIdx];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => p >= 1 ? 0 : p + 0.001), 100);
    return () => clearInterval(id);
  }, [playing, trackIdx]);

  const next = () => { setTrackIdx((trackIdx + 1) % TRACKS.length); setProgress(0); };
  const prev = () => { setTrackIdx((trackIdx - 1 + TRACKS.length) % TRACKS.length); setProgress(0); };

  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center" style={{ background: '#050508', minHeight: 480 }}>
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div key={trackIdx} className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            style={{ background: t.bg }} />
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center gap-6 w-[300px] my-12 py-8 px-6"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 28, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>

          {/* Vinyl disc */}
          <div className="relative">
            <motion.div
              animate={{ rotate: playing ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-[130px] h-[130px] rounded-full relative"
              style={{ background: `conic-gradient(from 0deg, ${t.hue}44, #111, ${t.hue}44, #111, ${t.hue}22, #0a0a0a)`, border: `1.5px solid ${t.hue}44`, boxShadow: `0 0 40px ${t.hue}33, 0 8px 32px rgba(0,0,0,0.5)` }}
            >
              {[60, 48, 36, 24].map(r => <div key={r} className="absolute top-1/2 left-1/2 rounded-full border border-white/5" style={{ width: r, height: r, marginLeft: -r / 2, marginTop: -r / 2 }} />)}
              <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: t.hue, boxShadow: `0 0 12px ${t.hue}` }} />
            </motion.div>
          </div>

          {/* Track info */}
          <AnimatePresence mode="wait">
            <motion.div key={trackIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
              <h3 className="font-black text-white text-[17px] tracking-tight">{t.title}</h3>
              <p className="text-[12px] mt-0.5 text-white/45">{t.artist}</p>
            </motion.div>
          </AnimatePresence>

          {/* Waveform */}
          <WaveformBars playing={playing} hue={t.hue} />

          {/* Progress bar */}
          <div className="w-full flex flex-col gap-1.5">
            <div className="w-full h-1 rounded-full overflow-hidden cursor-pointer" style={{ background: 'rgba(255,255,255,0.08)' }}
              onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setProgress((e.clientX - r.left) / r.width); }}>
              <motion.div className="h-full rounded-full" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.1 }} style={{ background: t.hue }} />
            </div>
            <div className="flex justify-between text-[9px] text-white/30 font-mono">
              <span>{Math.floor(progress * 3 + 0.01 * 60).toString().padStart(2,'0')}:{Math.floor((progress * 3 * 60) % 60).toString().padStart(2,'0')}</span>
              <span>{t.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button onClick={() => setLiked(l => !l)} aria-label="Like">
              <Heart size={16} style={{ color: liked ? '#f43f5e' : 'rgba(255,255,255,0.4)', fill: liked ? '#f43f5e' : 'none' }} />
            </button>
            <button onClick={prev} aria-label="Previous"><SkipBack size={18} className="text-white/60 hover:text-white transition-colors" /></button>
            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={() => setPlaying(p => !p)}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: t.hue, boxShadow: `0 4px 20px ${t.hue}66` }}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white" style={{ marginLeft: 2 }} />}
            </motion.button>
            <button onClick={next} aria-label="Next"><SkipForward size={18} className="text-white/60 hover:text-white transition-colors" /></button>
            <button aria-label="Shuffle"><Shuffle size={15} className="text-white/40" /></button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 w-full px-1">
            <Volume2 size={12} className="text-white/30 shrink-0" />
            <div className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div className="h-full w-3/4 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>
        </motion.div>

        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Music Player</span>
      </div>
</div>
  );
}
