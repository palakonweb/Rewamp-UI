import React, { useState } from 'react';
import AppleNavbar from './AppleNavbar';
import { appleNavbarPrompt } from './appleNavbarSource';
import { Wifi, Battery, Search, SlidersHorizontal, Sparkles, Video, Maximize2 } from 'lucide-react';

export default function AppleNavbarShowcase() {
  const [notchMode, setNotchMode] = useState('ai-thinking');
  const [alwaysExpanded, setAlwaysExpanded] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      {/* ── macOS Desktop Canvas ── */}
      <div
        className="relative w-full h-[470px] rounded-[24px] overflow-hidden shadow-2xl border border-black/15 flex flex-col select-none"
        style={{
          background: 'linear-gradient(135deg, #F8DEB5 0%, #F5C695 35%, #ECA676 65%, #C28268 100%)',
        }}
      >
        {/* Organic macOS wallpaper ambient shapes like reference image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-85">
          <div
            className="absolute -top-16 left-1/4 w-[500px] h-[500px] rounded-full blur-[80px]"
            style={{
              background: 'radial-gradient(circle, rgba(255, 235, 195, 0.8) 0%, rgba(246, 175, 125, 0.4) 60%, transparent 80%)',
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[420px] h-[340px] rounded-full blur-[60px]"
            style={{
              background: 'radial-gradient(circle, rgba(254, 215, 170, 0.7) 0%, rgba(224, 130, 90, 0.3) 70%, transparent 80%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        {/* ── Top macOS Menu Bar ── */}
        <div className="relative z-30 w-full h-7 px-4 flex items-center justify-between text-black/85 text-[11.5px] font-semibold bg-white/25 backdrop-blur-md border-b border-black/[0.06]">
          {/* Left: Apple Logo & Menu Items */}
          <div className="flex items-center gap-3.5">
            <svg className="w-3.5 h-3.5 fill-current opacity-90" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12-14.44-6.42-9.88-11.45-21.2-15.1-33.97-3.65-12.76-5.48-24.81-5.48-36.14 0-14.54 3.73-26.44 11.19-35.71 7.46-9.26 16.73-14.07 27.81-14.43 4.89 0 10.45 1.25 16.68 3.74 6.24 2.49 10.23 3.79 11.98 3.9 1.76-.11 5.92-1.47 12.5-4.08 6.57-2.61 11.83-3.79 15.77-3.53 11.64.66 21.04 4.84 28.2 12.54-9.9 5.98-14.73 14.34-14.51 25.07.22 8.37 3.53 15.48 9.92 21.32 6.39 5.84 14.18 9.38 23.36 10.63-2.39 7.39-5.38 15.11-8.97 23.16zM119.22 31.84c0-7.39 2.67-14.38 8.01-20.97 5.34-6.59 11.83-10.87 19.46-12.87.22 1.3.33 2.49.33 3.58 0 7.27-2.82 14.37-8.47 21.29-5.65 6.92-12.21 11.17-19.67 12.76-.11-1.3-.22-2.4-.33-3.79z" />
            </svg>
            <span className="font-bold">Finder</span>
            <span className="hidden sm:inline font-normal opacity-85">File</span>
            <span className="hidden sm:inline font-normal opacity-85">Edit</span>
            <span className="hidden sm:inline font-normal opacity-85">View</span>
            <span className="hidden md:inline font-normal opacity-85">Go</span>
            <span className="hidden md:inline font-normal opacity-85">Window</span>
          </div>

          {/* Center: Empty space reserved for notch */}
          <div className="w-[180px]" />

          {/* Right: Status Icons & Clock */}
          <div className="flex items-center gap-2.5 opacity-90 text-[11px]">
            <Search size={12} strokeWidth={2.2} className="cursor-pointer" />
            <SlidersHorizontal size={12} strokeWidth={2.2} className="cursor-pointer" />
            <Wifi size={12} strokeWidth={2.2} />
            <Battery size={13} strokeWidth={2.2} />
            <span className="font-semibold ml-1">Tue Aug 13 12:18 PM</span>
          </div>
        </div>

        {/* ── The Dynamic Apple Notch hanging from the top edge ── */}
        <div className="absolute top-0 left-0 right-0 z-40 w-full flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <AppleNavbar
              alwaysExpanded={alwaysExpanded}
              notchMode={notchMode}
            />
          </div>
        </div>

        {/* ── Bottom Desktop Controls (Switch Modes) ── */}
        <div className="relative mt-auto z-10 p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Mode 1: AI Thinking Notch */}
            <button
              onClick={() => {
                setAlwaysExpanded(false);
                setNotchMode('ai-thinking');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all shadow-md cursor-pointer border ${
                notchMode === 'ai-thinking' && !alwaysExpanded
                  ? 'bg-black text-white border-black/20'
                  : 'bg-white/80 hover:bg-white text-black border-white/60'
              }`}
            >
              <Sparkles size={12} className="text-[#EC5E27]" />
              <span>AI Thinking Notch</span>
            </button>

            {/* Mode 2: Camera Notch */}
            <button
              onClick={() => {
                setAlwaysExpanded(false);
                setNotchMode('camera');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all shadow-md cursor-pointer border ${
                notchMode === 'camera' && !alwaysExpanded
                  ? 'bg-black text-white border-black/20'
                  : 'bg-white/80 hover:bg-white text-black border-white/60'
              }`}
            >
              <Video size={12} />
              <span>Camera Notch</span>
            </button>

            {/* Mode 3: Always Expanded */}
            <button
              onClick={() => setAlwaysExpanded(!alwaysExpanded)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all shadow-md cursor-pointer border ${
                alwaysExpanded
                  ? 'bg-black text-white border-black/20'
                  : 'bg-white/80 hover:bg-white text-black border-white/60'
              }`}
            >
              <Maximize2 size={12} />
              <span>{alwaysExpanded ? 'Collapse on Mouse Leave' : 'Lock Expanded'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-white/90 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EC5E27] animate-pulse" />
            <span>Hover notch to dynamically expand into full navbar</span>
          </div>
        </div>
      </div>

      {/* Hidden prompt tag extracted by usePromptFromDom */}
      <div className="hidden" aria-hidden="true">
        <code>{appleNavbarPrompt}</code>
      </div>
    </div>
  );
}
