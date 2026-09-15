import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronDown, X, Sparkles, Flame } from 'lucide-react';

/**
 * Helper to generate 365 days of contribution data
 * Weighted so level 0 and 1 are common, with organic streaks.
 */
function generateContributions(totalDays = 365) {
  const data = [];
  const now = new Date(2026, 8, 15); // Sept 15, 2026 (local context date)
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - totalDays);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    // Weighted random contribution count
    const rand = Math.random();
    let count = 0;
    let level = 0;

    if (rand > 0.88) {
      count = Math.floor(Math.random() * 8) + 9; // 9-16
      level = 4;
    } else if (rand > 0.72) {
      count = Math.floor(Math.random() * 5) + 5; // 5-8
      level = 3;
    } else if (rand > 0.52) {
      count = Math.floor(Math.random() * 3) + 2; // 2-4
      level = 2;
    } else if (rand > 0.32) {
      count = 1;
      level = 1;
    } else {
      count = 0;
      level = 0;
    }

    const dateStr = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

    data.push({
      date: dateStr,
      rawDate: d,
      count,
      level,
    });
  }

  return data;
}

// 5-step lilac/violet scale
const LILAC_LEVELS = [
  '#F1EEF7', // 0: empty / muted
  '#DCD0F0', // 1: light lilac
  '#B79CE8', // 2: medium lilac
  '#8F63D9', // 3: vibrant violet
  '#6D28C7', // 4: deep royal violet
];

// Mock avatars for the activity panel
const ACTIVE_MEMBERS = [
  { id: 1, name: 'Elena Rostova', role: 'Design Lead', color: 'from-fuchsia-500 to-violet-600', initials: 'ER' },
  { id: 2, name: 'Marcus Vance', role: 'Frontend Core', color: 'from-violet-500 to-indigo-600', initials: 'MV' },
  { id: 3, name: 'Sora Tanaka', role: 'Creative Dev', color: 'from-purple-500 to-pink-600', initials: 'ST' },
  { id: 4, name: 'Liam Chen', role: 'Motion Engineer', color: 'from-indigo-500 to-purple-600', initials: 'LC' },
  { id: 5, name: 'Amara Diallo', role: 'UI Architect', color: 'from-violet-600 to-fuchsia-600', initials: 'AD' },
  { id: 6, name: 'Oliver Quinn', role: 'Shader Specialist', color: 'from-pink-500 to-rose-600', initials: 'OQ' },
];

export default function ContributionActivity({ className = '' }) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);

  const contributions = useMemo(() => generateContributions(371), []); // ~53 weeks

  // Group into columns of 7 days (weeks)
  const weeks = useMemo(() => {
    const cols = [];
    for (let i = 0; i < contributions.length; i += 7) {
      cols.push(contributions.slice(i, i + 7));
    }
    return cols;
  }, [contributions]);

  const totalContributions = useMemo(() => {
    return contributions.reduce((acc, curr) => acc + curr.count, 0);
  }, [contributions]);

  // Compute month headers over columns
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, colIdx) => {
      const firstDay = week[0]?.rawDate;
      if (firstDay) {
        const month = firstDay.getMonth();
        if (month !== lastMonth && colIdx > 0 && colIdx < weeks.length - 2) {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          labels.push({ colIdx, name: monthNames[month] });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [weeks]);

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto p-4 sm:p-8 rounded-[36px] bg-gradient-to-br from-violet-100/70 via-fuchsia-50/50 to-white/80 select-none overflow-visible ${className}`}
      style={{
        boxShadow: '0 20px 60px -15px rgba(109, 40, 199, 0.12)',
      }}
    >
      {/* Soft background ambient glow orbs */}
      <div className="absolute top-4 left-1/4 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Glass frame around the whole graph */}
      <div
        className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(109,40,199,0.12)] ring-1 ring-inset ring-white/50"
      >
        {/* Header Row: Title & Streak Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pr-36 sm:pr-48">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">
                Contribution Heatmap
              </h3>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
                2025 – 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Continuous delivery, releases, and repository events
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 border border-white/80 shadow-sm text-xs font-medium text-neutral-700">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>42 Day Streak</span>
            </div>
          </div>
        </div>

        {/* 3. Recent Activity Widget (Top-Right Overlapping the card corner) */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-30">
          <AnimatePresence mode="wait">
            {!expanded ? (
              // Collapsed Pill State
              <motion.button
                key="pill"
                layoutId="activity-panel"
                onClick={() => setExpanded(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="flex items-center gap-2.5 bg-white/80 hover:bg-white/95 backdrop-blur-xl border border-white/80 rounded-full py-1.5 pl-2 pr-3.5 shadow-[0_8px_24px_rgba(109,40,199,0.15)] ring-1 ring-inset ring-white/60 transition-colors cursor-pointer group"
              >
                {/* Waveform circle icon */}
                <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  <Activity className="w-4 h-4 text-violet-300" />
                </div>

                {/* Overlapping avatars */}
                <div className="flex items-center -space-x-2.5">
                  {ACTIVE_MEMBERS.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${m.color} text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white shadow-sm`}
                    >
                      {m.initials}
                    </div>
                  ))}
                </div>

                {/* +N counter & Chevron */}
                <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 pl-0.5">
                  <span>+3</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
                </div>
              </motion.button>
            ) : (
              // Expanded Card State
              <motion.div
                key="card"
                layoutId="activity-panel"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="w-80 sm:w-96 bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 shadow-[0_20px_50px_rgba(109,40,199,0.25)] ring-1 ring-inset ring-white/70 origin-top-right overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white shadow-sm">
                      <Activity className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">Recent Activity</h4>
                      <p className="text-[11px] text-neutral-500">6 active contributors today</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpanded(false)}
                    className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Grid of 2 columns x N rows */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.04 },
                    },
                  }}
                  className="grid grid-cols-2 gap-3 py-4 max-h-[290px] overflow-y-auto pr-1"
                >
                  {ACTIVE_MEMBERS.map((member) => (
                    <motion.div
                      key={member.id}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.95 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                      className="flex flex-col items-center text-center p-3 rounded-2xl bg-violet-50/50 hover:bg-violet-100/50 border border-violet-100 transition-all cursor-pointer group"
                    >
                      <div className="relative mb-2">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} text-white font-bold text-sm flex items-center justify-center ring-2 ring-white shadow-md group-hover:scale-105 transition-transform`}
                        >
                          {member.initials}
                        </div>
                        {/* Waveform icon badge */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neutral-900 border-2 border-white flex items-center justify-center text-[9px] text-violet-300 shadow-sm">
                          <Activity className="w-2.5 h-2.5" />
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-neutral-900 leading-tight">
                        {member.name}
                      </span>
                      <span className="text-[10px] text-neutral-500 mt-0.5">
                        {member.role}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setExpanded(false)}
                    className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-violet-300" />
                    <span>View all contributions</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Click outside catcher when expanded */}
        {expanded && (
          <div
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-20 cursor-default"
          />
        )}

        {/* 1. Contribution Graph Heatmap Area */}
        <div className="overflow-x-auto pb-3 pt-2 scrollbar-thin scrollbar-thumb-violet-200">
          <div className="min-w-[760px]">
            {/* Month labels row */}
            <div className="flex text-[11px] font-medium text-neutral-400 mb-2 pl-9">
              {weeks.map((week, idx) => {
                const label = monthLabels.find((m) => m.colIdx === idx);
                return (
                  <div
                    key={idx}
                    className="w-[14px] text-left overflow-visible"
                    style={{ minWidth: '14px' }}
                  >
                    {label ? <span className="text-neutral-600 font-semibold">{label.name}</span> : null}
                  </div>
                );
              })}
            </div>

            {/* Day grid container with weekday labels */}
            <div className="flex items-start gap-2">
              {/* Day of week labels */}
              <div className="flex flex-col justify-between text-[10px] font-medium text-neutral-400 pr-1 h-[95px] select-none">
                <span className="leading-none">Mon</span>
                <span className="leading-none">Wed</span>
                <span className="leading-none">Fri</span>
              </div>

              {/* Heatmap 7x53 grid */}
              <div className="flex gap-[3px]">
                {weeks.map((week, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-[3px]">
                    {week.map((cell, rowIdx) => (
                      <motion.div
                        key={`${colIdx}-${rowIdx}`}
                        whileHover={{ scale: 1.35 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                        onMouseEnter={() => setHoveredCell(cell)}
                        onMouseLeave={() => setHoveredCell(null)}
                        className="w-[11px] h-[11px] rounded-[2.5px] cursor-pointer transition-colors relative"
                        style={{
                          backgroundColor: LILAC_LEVELS[cell.level],
                          boxShadow:
                            cell.level > 2
                              ? '0 0 6px rgba(109, 40, 199, 0.35)'
                              : 'inset 0 0 0 0.5px rgba(255,255,255,0.4)',
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Tooltip display & Footer stats */}
        <div className="mt-5 pt-4 border-t border-white/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500">
          {/* Bottom-left: Total count or active cell inspection */}
          <div className="flex items-center gap-2 font-medium">
            {hoveredCell ? (
              <span className="text-violet-700 font-semibold flex items-center gap-1.5 animate-fadeIn">
                <span className="w-2 h-2 rounded-full bg-violet-600 inline-block" />
                {hoveredCell.count === 0
                  ? 'No contributions'
                  : `${hoveredCell.count} contribution${hoveredCell.count === 1 ? '' : 's'}`}{' '}
                on {hoveredCell.date}
              </span>
            ) : (
              <span className="text-neutral-700">
                <strong className="text-neutral-900 font-bold">{totalContributions.toLocaleString()}</strong> contributions in the last year
              </span>
            )}
          </div>

          {/* Bottom-right: 5-step lilac swatch legend */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
            <span>Less</span>
            <div className="flex items-center gap-[3px]">
              {LILAC_LEVELS.map((color, idx) => (
                <div
                  key={idx}
                  className="w-[10px] h-[10px] rounded-[2px]"
                  style={{
                    backgroundColor: color,
                    border: idx === 0 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
