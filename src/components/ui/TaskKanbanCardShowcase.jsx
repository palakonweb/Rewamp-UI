import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Copy, Check, Circle, CheckCircle2, Plus, Flag, Clock, Tag } from 'lucide-react';

/*
 * TaskKanbanCardShowcase — interactive kanban-style task card with
 * drag-to-reorder tasks, animated completion checkmarks, priority flags,
 * and a radial SVG progress ring.
 */

const promptContent = `kanban task card — drag-to-reorder task list with Framer Motion Reorder, animated SVG radial progress ring, checkbox completion with spring animation, priority flag badges, dark glass aesthetic`;

const PRIORITY = {
  high:   { label: 'High',   color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  medium: { label: 'Medium', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  low:    { label: 'Low',    color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
};

const INITIAL_TASKS = [
  { id: '1', text: 'Design system audit & tokens update', done: false, priority: 'high' },
  { id: '2', text: 'Refactor API response normalization', done: true,  priority: 'high' },
  { id: '3', text: 'Write Storybook stories for components', done: false, priority: 'medium' },
  { id: '4', text: 'Update CI/CD pipeline configuration', done: false, priority: 'medium' },
  { id: '5', text: 'Conduct user research interviews', done: true,  priority: 'low' },
];

function ProgressRing({ pct, color }) {
  const r = 26, circ = 2 * Math.PI * r;
  return (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-label={`${Math.round(pct * 100)}% complete`}>
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <motion.circle
        cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct) }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

export default function TaskKanbanCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleDone = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const doneCount = tasks.filter(t => t.done).length;
  const pct = doneCount / tasks.length;
  const ACCENT = '#DC143C';

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center py-12 px-6"
        style={{ background: '#09090f', minHeight: 520 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(220,20,60,0.07) 0%, transparent 55%)' }} />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md flex flex-col gap-0 rounded-[22px] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
                <span className="text-white font-black text-[14px] tracking-tight">Design Sprint</span>
              </div>
              <div className="flex items-center gap-3 pl-4">
                <div className="flex items-center gap-1 text-white/30 text-[10px]"><Clock size={9} /><span>Due April 30</span></div>
                <div className="flex items-center gap-1 text-white/30 text-[10px]"><Tag size={9} /><span>UI/UX</span></div>
              </div>
            </div>
            <ProgressRing pct={pct} color={ACCENT} />
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <motion.div className="h-full" animate={{ width: `${pct * 100}%` }} transition={{ duration: 0.4 }} style={{ background: `linear-gradient(90deg, ${ACCENT}, rgba(220,20,60,0.5))` }} />
          </div>

          {/* Task list */}
          <Reorder.Group axis="y" values={tasks} onReorder={setTasks} className="flex flex-col px-3 py-3 gap-1.5">
            {tasks.map(task => {
              const p = PRIORITY[task.priority];
              return (
                <Reorder.Item key={task.id} value={task} className="list-none">
                  <motion.div
                    layout
                    whileDrag={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 10 }}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-grab active:cursor-grabbing select-none"
                    style={{ background: task.done ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)', border: `1px solid ${task.done ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'}` }}
                  >
                    <button
                      onClick={() => toggleDone(task.id)}
                      className="shrink-0"
                      aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
                    >
                      <AnimatePresence mode="wait">
                        {task.done
                          ? <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 22 }}>
                              <CheckCircle2 size={18} style={{ color: ACCENT }} />
                            </motion.div>
                          : <motion.div key="empty" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Circle size={18} className="text-white/20" />
                            </motion.div>
                        }
                      </AnimatePresence>
                    </button>

                    <span
                      className="flex-1 text-[12px] font-medium leading-snug transition-all"
                      style={{ color: task.done ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.75)', textDecoration: task.done ? 'line-through' : 'none' }}
                    >
                      {task.text}
                    </span>

                    <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                      style={{ background: p.bg, color: p.color, border: `1px solid ${p.color}33` }}>
                      {task.priority}
                    </span>
                  </motion.div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <span className="text-white/25 text-[10px] font-medium">{doneCount}/{tasks.length} tasks complete</span>
            <button className="flex items-center gap-1.5 text-[10px] font-bold transition-all px-2.5 py-1.5 rounded-lg hover:bg-white/5"
              style={{ color: ACCENT, border: `1px solid rgba(220,20,60,0.25)` }}>
              <Plus size={11} /> Add Task
            </button>
          </div>
        </div>

        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Kanban Card</span>
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
