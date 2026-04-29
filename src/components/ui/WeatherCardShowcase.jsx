import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

/*
 * WeatherCardShowcase — premium weather card with animated sky gradient background,
 * floating sun/cloud SVG, hourly forecast row, and 4-stat detail grid.
 */

const promptContent = `weather card — animated sky gradient that transitions with weather state, floating animated sun/cloud SVG elements with spring motion, hourly forecast row, glassmorphic stat chips, premium dark glass card`;

const CITIES = [
  {
    city: 'San Francisco', country: 'US', temp: 18, feels: 15, condition: 'Partly Cloudy',
    humidity: 72, wind: 14, visibility: 16, uv: 4,
    sky: ['#0a2a5e', '#1a1a5e'],
    hourly: [
      { time: 'Now', temp: 18, icon: '⛅' }, { time: '14:00', temp: 19, icon: '🌤' },
      { time: '16:00', temp: 17, icon: '☁️' }, { time: '18:00', temp: 15, icon: '🌧' },
      { time: '20:00', temp: 13, icon: '🌧' }, { time: '22:00', temp: 12, icon: '🌙' },
    ],
  },
  {
    city: 'Tokyo', country: 'JP', temp: 24, feels: 26, condition: 'Sunny',
    humidity: 55, wind: 8, visibility: 20, uv: 7,
    sky: ['#0a1a3e', '#1a0a40'],
    hourly: [
      { time: 'Now', temp: 24, icon: '☀️' }, { time: '14:00', temp: 26, icon: '☀️' },
      { time: '16:00', temp: 25, icon: '🌤' }, { time: '18:00', temp: 22, icon: '⛅' },
      { time: '20:00', temp: 20, icon: '🌙' }, { time: '22:00', temp: 18, icon: '🌙' },
    ],
  },
  {
    city: 'London', country: 'GB', temp: 11, feels: 8, condition: 'Rainy',
    humidity: 88, wind: 22, visibility: 8, uv: 1,
    sky: ['#0f0f18', '#111820'],
    hourly: [
      { time: 'Now', temp: 11, icon: '🌧' }, { time: '14:00', temp: 12, icon: '🌧' },
      { time: '16:00', temp: 11, icon: '⛈' }, { time: '18:00', temp: 10, icon: '🌧' },
      { time: '20:00', temp: 9, icon: '☁️' }, { time: '22:00', temp: 8, icon: '☁️' },
    ],
  },
];

function AnimatedSun() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className="absolute"
      style={{ top: '10%', right: '12%', width: 80, height: 80 }}
      aria-hidden="true"
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        {[0,45,90,135].map(a => (
          <motion.line key={a} x1="40" y1="8" x2="40" y2="18" stroke="rgba(251,191,36,0.5)" strokeWidth="2.5" strokeLinecap="round"
            style={{ transformOrigin: '40px 40px', rotate: `${a}deg` }} />
        ))}
        <circle cx="40" cy="40" r="14" fill="rgba(251,191,36,0.85)" />
        <circle cx="40" cy="40" r="14" fill="none" stroke="rgba(251,191,36,0.4)" strokeWidth="6" />
      </svg>
    </motion.div>
  );
}

function FloatingCloud({ delay = 0, top = '20%', opacity = 0.6 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left: '-10%', opacity }}
      aria-hidden="true"
      animate={{ x: ['0%', '120%'] }}
      transition={{ duration: 40 + delay * 5, repeat: Infinity, ease: 'linear', delay }}
    >
      <svg width="120" height="50" viewBox="0 0 120 50">
        <ellipse cx="70" cy="32" rx="40" ry="18" fill="rgba(255,255,255,0.07)" />
        <ellipse cx="45" cy="36" rx="30" ry="14" fill="rgba(255,255,255,0.06)" />
        <ellipse cx="60" cy="22" rx="28" ry="16" fill="rgba(255,255,255,0.07)" />
      </svg>
    </motion.div>
  );
}

export default function WeatherCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [cityIdx, setCityIdx] = useState(0);
  const c = CITIES[cityIdx];

  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center py-12 px-6"
        style={{ background: '#060610', minHeight: 480 }}>

        {/* Sky background */}
        <AnimatePresence mode="wait">
          <motion.div key={cityIdx} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{ background: `linear-gradient(160deg, ${c.sky[0]} 0%, ${c.sky[1]} 100%)` }} />
        </AnimatePresence>

        {/* Sky elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {cityIdx === 1 && <AnimatedSun />}
          <FloatingCloud delay={0} top="15%" opacity={0.5} />
          <FloatingCloud delay={8} top="35%" opacity={0.35} />
        </div>

        {/* City tabs */}
        <div className="absolute top-4 left-4 z-20 flex gap-1.5">
          {CITIES.map((city, i) => (
            <button key={city.city} onClick={() => setCityIdx(i)}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all"
              style={{ background: cityIdx === i ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${cityIdx === i ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`, color: cityIdx === i ? '#fff' : 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}>
              {city.city}
            </button>
          ))}
        </div>

        {/* Main card */}
        <AnimatePresence mode="wait">
          <motion.div key={cityIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-md flex flex-col gap-5"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: '24px', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

            {/* City + temp */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-black text-white text-[20px] leading-tight">{c.city}</h3>
                <p className="text-white/45 text-[11px] mt-0.5">{c.country} · {c.condition}</p>
              </div>
              <div className="text-right">
                <div className="font-black text-white leading-none" style={{ fontSize: 52 }}>{c.temp}°</div>
                <p className="text-white/40 text-[10px]">Feels {c.feels}°</p>
              </div>
            </div>

            {/* Hourly forecast */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
              {c.hourly.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl shrink-0"
                  style={{ background: i === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', border: `1px solid ${i === 0 ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.06)'}` }}>
                  <span className="text-[9px] font-semibold" style={{ color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}>{h.time}</span>
                  <span style={{ fontSize: 18 }}>{h.icon}</span>
                  <span className="text-[11px] font-bold text-white">{h.temp}°</span>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: Droplets, label: 'Humidity', val: `${c.humidity}%`, color: '#60a5fa' },
                { icon: Wind,     label: 'Wind',     val: `${c.wind}km/h`, color: '#a78bfa' },
                { icon: Eye,      label: 'Visibility',val: `${c.visibility}km`, color: '#34d399' },
                { icon: Thermometer, label: 'UV Index', val: `${c.uv}`,   color: '#fbbf24' },
              ].map(({ icon: Icon, label, val, color }) => (
                <div key={label} className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Icon size={13} style={{ color }} />
                  <span className="font-bold text-white text-[11px]">{val}</span>
                  <span className="text-[8px] text-white/30 text-center leading-none">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Weather Card</span>
      </div>

      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 overflow-hidden">
          <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p>
          <code className="text-[13px] text-black/80 dark:text-white/80 font-mono">{promptContent}</code>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
