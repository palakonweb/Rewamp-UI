export const contributionActivityPrompt = `# Prompt: Lilac GitHub-style Contribution Graph with Expandable Activity Widget

Build a single React component called ContributionActivity using Tailwind + framer-motion.

## 1. Contribution Graph
- GitHub-style heatmap: 7 rows x ~53 cols, rounded squares (~11px, 3px gap), month labels above, total count bottom-left, Less/More legend bottom-right.
- 5-step lilac/violet scale: #F1EEF7 → #DCD0F0 → #B79CE8 → #8F63D9 → #6D28C7.
- whileHover={{ scale: 1.35 }} spring on each cell. Hover shows date + count.

## 2. Glass frame
- bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl
- shadow-[0_8px_32px_rgba(109,40,199,0.12)] ring-1 ring-inset ring-white/50
- Outer: bg-gradient-to-br from-violet-100/70 via-fuchsia-50/50 to-white/80

## 3. Recent Activity widget (top-right overlapping card)
- Collapsed pill: dark Activity icon circle + 3 initials avatars + "+3" + chevron-down
- Expanded panel: glass card with grid 2-col x 3-row contributor cards, waveform badges, "View all" footer button
- Morphs between states with layoutId="activity-panel" + AnimatePresence
- Outside click catcher to dismiss

## 4. Motion
- layoutId shared layout, spring { stiffness: 320, damping: 28 }
- staggerChildren: 0.04 on grid items expand`;

export const contributionActivityCode = `import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronDown, X, Sparkles, Flame } from 'lucide-react';

function generateContributions(totalDays = 371) {
  const data = [];
  const now = new Date(2026, 8, 15);
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - totalDays);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const rand = Math.random();
    let count = 0, level = 0;
    if (rand > 0.88) { count = Math.floor(Math.random()*8)+9; level = 4; }
    else if (rand > 0.72) { count = Math.floor(Math.random()*5)+5; level = 3; }
    else if (rand > 0.52) { count = Math.floor(Math.random()*3)+2; level = 2; }
    else if (rand > 0.32) { count = 1; level = 1; }
    data.push({ date: \`\${months[d.getMonth()]} \${d.getDate()}, \${d.getFullYear()}\`, rawDate: d, count, level });
  }
  return data;
}

const LILAC = ['#F1EEF7','#DCD0F0','#B79CE8','#8F63D9','#6D28C7'];
const MEMBERS = [
  { id:1, name:'Elena Rostova', role:'Design Lead', color:'from-fuchsia-500 to-violet-600', initials:'ER' },
  { id:2, name:'Marcus Vance', role:'Frontend Core', color:'from-violet-500 to-indigo-600', initials:'MV' },
  { id:3, name:'Sora Tanaka', role:'Creative Dev', color:'from-purple-500 to-pink-600', initials:'ST' },
  { id:4, name:'Liam Chen', role:'Motion Engineer', color:'from-indigo-500 to-purple-600', initials:'LC' },
  { id:5, name:'Amara Diallo', role:'UI Architect', color:'from-violet-600 to-fuchsia-600', initials:'AD' },
  { id:6, name:'Oliver Quinn', role:'Shader Specialist', color:'from-pink-500 to-rose-600', initials:'OQ' },
];

export default function ContributionActivity({ className = '' }) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);
  const contributions = useMemo(() => generateContributions(371), []);
  const weeks = useMemo(() => { const c=[]; for(let i=0;i<contributions.length;i+=7) c.push(contributions.slice(i,i+7)); return c; }, [contributions]);
  const total = useMemo(() => contributions.reduce((a,c)=>a+c.count,0), [contributions]);
  const monthLabels = useMemo(() => {
    const labels=[]; let last=-1;
    weeks.forEach((w,i)=>{ const d=w[0]?.rawDate; if(d){ const m=d.getMonth(); if(m!==last&&i>0&&i<weeks.length-2){ labels.push({colIdx:i,name:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m]}); last=m; } } });
    return labels;
  }, [weeks]);

  return (
    <div className={\`relative w-full max-w-5xl mx-auto p-4 sm:p-8 rounded-[36px] bg-gradient-to-br from-violet-100/70 via-fuchsia-50/50 to-white/80 select-none overflow-visible \${className}\`}>
      <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(109,40,199,0.12)] ring-1 ring-inset ring-white/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pr-36 sm:pr-48">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">Contribution Heatmap</h3>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">2025 – 2026</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">Continuous delivery, releases, and repository events</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 border border-white/80 shadow-sm text-xs font-medium text-neutral-700">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>42 Day Streak</span>
          </div>
        </div>

        {/* Activity Widget */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-30">
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.button key="pill" layoutId="activity-panel" onClick={()=>setExpanded(true)}
                whileHover={{scale:1.03}} whileTap={{scale:0.98}}
                className="flex items-center gap-2.5 bg-white/80 hover:bg-white/95 backdrop-blur-xl border border-white/80 rounded-full py-1.5 pl-2 pr-3.5 shadow-[0_8px_24px_rgba(109,40,199,0.15)] cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center"><Activity className="w-4 h-4 text-violet-300" /></div>
                <div className="flex items-center -space-x-2.5">
                  {MEMBERS.slice(0,3).map(m=>(
                    <div key={m.id} className={\`w-7 h-7 rounded-full bg-gradient-to-br \${m.color} text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white\`}>{m.initials}</div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 pl-0.5">
                  <span>+3</span><ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </div>
              </motion.button>
            ) : (
              <motion.div key="card" layoutId="activity-panel"
                className="w-80 sm:w-96 bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 shadow-[0_20px_50px_rgba(109,40,199,0.25)] ring-1 ring-inset ring-white/70 origin-top-right overflow-hidden">
                <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center"><Activity className="w-3.5 h-3.5 text-white" /></div>
                    <div><h4 className="text-sm font-bold text-neutral-900">Recent Activity</h4><p className="text-[11px] text-neutral-500">6 active contributors today</p></div>
                  </div>
                  <button onClick={()=>setExpanded(false)} className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500"><X className="w-3.5 h-3.5" /></button>
                </div>
                <motion.div initial="hidden" animate="visible" variants={{visible:{transition:{staggerChildren:0.04}}}}
                  className="grid grid-cols-2 gap-3 py-4 max-h-[290px] overflow-y-auto">
                  {MEMBERS.map(m=>(
                    <motion.div key={m.id} variants={{hidden:{opacity:0,y:10,scale:0.95},visible:{opacity:1,y:0,scale:1}}}
                      className="flex flex-col items-center text-center p-3 rounded-2xl bg-violet-50/50 hover:bg-violet-100/50 border border-violet-100">
                      <div className="relative mb-2">
                        <div className={\`w-12 h-12 rounded-full bg-gradient-to-br \${m.color} text-white font-bold text-sm flex items-center justify-center ring-2 ring-white\`}>{m.initials}</div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neutral-900 border-2 border-white flex items-center justify-center"><Activity className="w-2.5 h-2.5 text-violet-300" /></div>
                      </div>
                      <span className="text-xs font-semibold text-neutral-900">{m.name}</span>
                      <span className="text-[10px] text-neutral-500">{m.role}</span>
                    </motion.div>
                  ))}
                </motion.div>
                <button onClick={()=>setExpanded(false)} className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-300" /><span>View all contributions</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {expanded && <div onClick={()=>setExpanded(false)} className="fixed inset-0 z-20" />}

        {/* Heatmap */}
        <div className="overflow-x-auto pb-3 pt-2">
          <div className="min-w-[760px]">
            <div className="flex text-[11px] font-medium text-neutral-400 mb-2 pl-9">
              {weeks.map((_,idx)=>{ const l=monthLabels.find(m=>m.colIdx===idx); return <div key={idx} className="w-[14px] text-left overflow-visible" style={{minWidth:'14px'}}>{l&&<span className="text-neutral-600 font-semibold">{l.name}</span>}</div>; })}
            </div>
            <div className="flex items-start gap-2">
              <div className="flex flex-col justify-between text-[10px] font-medium text-neutral-400 pr-1 h-[95px]"><span>Mon</span><span>Wed</span><span>Fri</span></div>
              <div className="flex gap-[3px]">
                {weeks.map((week,ci)=>(
                  <div key={ci} className="flex flex-col gap-[3px]">
                    {week.map((cell,ri)=>(
                      <motion.div key={\`\${ci}-\${ri}\`} whileHover={{scale:1.35}}
                        onMouseEnter={()=>setHoveredCell(cell)} onMouseLeave={()=>setHoveredCell(null)}
                        className="w-[11px] h-[11px] rounded-[2.5px] cursor-pointer"
                        style={{backgroundColor:LILAC[cell.level]}} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            {hoveredCell
              ? <span className="text-violet-700 font-semibold">{hoveredCell.count===0?'No contributions':\`\${hoveredCell.count} contribution\${hoveredCell.count===1?'':'s'}\`} on {hoveredCell.date}</span>
              : <span><strong className="text-neutral-900 font-bold">{total.toLocaleString()}</strong> contributions in the last year</span>}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <span>Less</span>
            <div className="flex items-center gap-[3px]">
              {LILAC.map((c,i)=><div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{backgroundColor:c}} />)}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}`;
