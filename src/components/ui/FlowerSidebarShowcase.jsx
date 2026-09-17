import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

// Clean Blooming Lilac Flower Icon
export function LilacFlowerIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 6 Blooming Petals in Brand Lilac */}
      <circle cx="12" cy="5.8" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="17.4" cy="8.9" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="17.4" cy="15.1" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="12" cy="18.2" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="6.6" cy="15.1" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="6.6" cy="8.9" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      {/* Center Core */}
      <circle cx="12" cy="12" r="3.4" fill="#262626" stroke="#FAFAFA" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="1.3" fill="#D4CBE5" />
    </svg>
  );
}

const NAV_GROUPS = [
  {
    category: 'OVERVIEW',
    items: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'explore', label: 'Explore Components' },
      { id: 'templates', label: 'Page Templates' },
    ]
  },
  {
    category: 'PROJECTS',
    items: [
      { id: 'design-system', label: 'Design Tokens' },
      { id: 'animations', label: 'Fluid Motion' },
      { id: 'notifications', label: 'Activity Feed' },
      { id: 'preferences', label: 'Settings' },
    ]
  }
];

export const flowerSidebarPrompt = `A tactile vertical Flower Sidebar Navigation component in React:
- Features an SVG curved flightpath rail running along navigation items.
- A blooming 6-petal lilac flower indicator icon glides smoothly along the rail using Framer Motion spring physics.
- The rail path dynamically draws a filled progress trace up to the active flower node.
- Supports hierarchical category sections with micro-animations on hover and active states.
- Clean search bar, brand header with RewampUI logo, and compact responsive profile pill at the bottom.
- Styled with brand lilac (#D4CBE5), slate (#171717), and translucent frosted glass backdrop.`;

export default function FlowerSidebarShowcase() {
  const [activeId, setActiveId] = useState('explore');
  const [search, setSearch] = useState('');

  // Flatten items for rail coordinates
  const flatItems = useMemo(() => {
    const list = [];
    NAV_GROUPS.forEach(g => {
      list.push({ id: `cat-${g.category}`, isCategory: true, label: g.category });
      g.items.forEach(it => list.push({ ...it, isCategory: false }));
    });
    return list;
  }, []);

  const itemHeight = 36;
  const startY = 18;
  const rootX = 16;
  const nestedX = 26;

  const nodes = useMemo(() => {
    return flatItems.map((item, idx) => ({
      ...item,
      x: item.isCategory ? rootX : nestedX,
      y: startY + idx * itemHeight,
      idx
    }));
  }, [flatItems]);

  const activeNode = nodes.find(n => n.id === activeId) || nodes[1];
  const activeIdx = activeNode ? activeNode.idx : 1;

  // Complete SVG path
  const railPath = useMemo(() => {
    if (nodes.length === 0) return '';
    let d = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];
      if (prev.x === curr.x) {
        d += ` L ${curr.x} ${curr.y}`;
      } else {
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
    }
    return d;
  }, [nodes]);

  // Covered rail path up to the active flower
  const coveredPath = useMemo(() => {
    if (nodes.length === 0 || activeIdx <= 0) return '';
    let d = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 1; i <= activeIdx; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];
      if (prev.x === curr.x) {
        d += ` L ${curr.x} ${curr.y}`;
      } else {
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
    }
    return d;
  }, [nodes, activeIdx]);

  return (
    <div className="w-full max-w-sm mx-auto flex items-center justify-center p-10">
      <div className="w-[280px] flex flex-col justify-between overflow-hidden">
        {/* Top Header with Brand Mark */}
        <div>
          <div className="flex items-center gap-2.5 pb-3.5 border-b border-black/5 dark:border-white/5">
            <img src="/logo.svg" alt="RewampUI" className="w-7 h-7 object-contain shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                RewampUI
              </h4>
              <span className="text-[10px] font-mono text-neutral-400">
                Flower Rail Nav
              </span>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative my-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Quick search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl pl-8 pr-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-[#D4CBE5] transition-colors"
            />
          </div>

          {/* Flower Rail Navigation Tree */}
          <div className="relative py-1">
            <svg 
              className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
              style={{ zIndex: 5 }}
            >
              {/* Dim Base Rail */}
              <path
                d={railPath}
                fill="none"
                stroke="currentColor"
                className="text-neutral-200 dark:text-neutral-800"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Highlighted Covered Trail */}
              <path
                d={coveredPath}
                fill="none"
                stroke="#D4CBE5"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              {/* Rail Waypoint Nodes */}
              {nodes.map(n => (
                <circle
                  key={n.id}
                  cx={n.x}
                  cy={n.y}
                  r={n.isCategory ? 2.5 : 2}
                  fill={n.idx <= activeIdx ? '#D4CBE5' : '#737373'}
                  className="transition-colors duration-200"
                />
              ))}
            </svg>

            {/* Sliding Flower Node */}
            <motion.div
              animate={{ x: activeNode.x - 8, y: activeNode.y - 8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              className="absolute z-20 pointer-events-none"
            >
              <LilacFlowerIcon className="w-4 h-4 drop-shadow-[0_2px_8px_rgba(212,203,229,0.7)]" />
            </motion.div>

            {/* Nav Labels */}
            <div className="flex flex-col">
              {nodes.map(node => {
                if (node.isCategory) {
                  return (
                    <div
                      key={node.id}
                      style={{ height: itemHeight }}
                      className="flex items-center pl-7 text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase select-none"
                    >
                      {node.label}
                    </div>
                  );
                }

                const isActive = activeId === node.id;

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveId(node.id)}
                    style={{ height: itemHeight }}
                    className={`flex items-center justify-between pl-8 pr-3 rounded-xl text-xs transition-colors text-left cursor-pointer select-none ${
                      isActive
                        ? 'font-semibold text-neutral-900 dark:text-white bg-[#D4CBE5]/20 dark:bg-[#D4CBE5]/15'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{node.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4CBE5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Status Pill */}
        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              Active: {activeId}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
            Flower
          </span>
        </div>
      </div>
    </div>
  );
}

FlowerSidebarShowcase.customTitle = 'Flower Nav Bar';
FlowerSidebarShowcase.customSlug = 'flower-sidebar';
