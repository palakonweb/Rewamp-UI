import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Calendar, CheckCircle2, Briefcase, Plus, Clock, Users } from 'lucide-react';

/*
 * Workspace Hub Bento — Clean light productivity
 * Palette: cloud #f4f6f8, soft blue #7ea4c8, warm gray #9a9a9e
 */

const promptContent = `Clean light productivity bento grid with white cards on cloud-gray background, SVG circular progress ring, task checklist with animated checkmarks, calendar date tile, team chat with typing indicator, soft blue accent, warm gray text, gentle entry animations, premium workspace UI`;

// ── SVG Progress Ring ──
function ProgressRing({ percent = 68, size = 80 }) {
  const r = 32;
  const circumference = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(126,164,200,0.1)" strokeWidth="6" />
      <motion.circle cx="40" cy="40" r={r} fill="none" stroke="#7ea4c8" strokeWidth="6" strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: circumference * (1 - percent / 100) }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
      <text x="40" y="43" textAnchor="middle" fill="#2a2a2e" fontSize="14" fontWeight="700">{percent}%</text>
    </svg>
  );
}

// ── Tile ──
const tileV = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function Tile({ children, className, custom = 0 }) {
  return (
    <motion.div custom={custom} variants={tileV} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -2, boxShadow: '0 12px 36px rgba(0,0,0,0.06)', transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`bg-white rounded-[20px] p-6 relative overflow-hidden flex flex-col justify-between ${className}`}
      style={{ border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
    >
      {children}
    </motion.div>
  );
}

export default function ProductivityBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[28px] overflow-hidden border border-black/5 p-6 sm:p-8"
        style={{ background: '#f4f6f8', minHeight: 640 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8 px-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ background: 'rgba(126,164,200,0.15)', color: '#7ea4c8' }}>M</div>
            <div>
              <h2 className="font-bold text-[15px]" style={{ color: '#2a2a2e' }}>Good morning, Mia</h2>
              <p className="text-[11px]" style={{ color: '#9a9a9e' }}>You have 5 tasks to complete today.</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="h-9 px-4 rounded-full font-semibold text-[12px] flex items-center gap-1.5"
            style={{ background: '#2a2a2e', color: '#fff' }}>
            <Plus size={14} /> New Task
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-[200px]">

          {/* ── Project Overview (2col × 2row) ── */}
          <Tile className="md:col-span-2 md:row-span-2" custom={0}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(200,168,126,0.12)' }}>
                  <Briefcase size={14} style={{ color: '#c8a87e' }} />
                </div>
                <span className="font-semibold text-[13px]" style={{ color: '#2a2a2e' }}>Q3 Roadmap</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{ background: 'rgba(126,200,164,0.1)', color: '#5a9a6a' }}>On Track</span>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-[24px] leading-tight mb-2" style={{ color: '#2a2a2e' }}>
                Website Redesign<br />& Rebranding
              </h3>
              <div className="flex items-center gap-4 text-[11px]" style={{ color: '#9a9a9e' }}>
                <span className="flex items-center gap-1"><Clock size={12} /> Due Oct 24</span>
                <span className="flex items-center gap-1"><Users size={12} /> 4 Members</span>
              </div>
            </div>

            <div className="w-full rounded-2xl p-4 mt-auto" style={{ background: '#f8f9fa', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-[12px]" style={{ color: '#2a2a2e' }}>Overall Progress</span>
                <ProgressRing percent={68} size={50} />
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(126,164,200,0.1)' }}>
                <motion.div className="h-full rounded-full"
                  initial={{ width: 0 }} whileInView={{ width: '68%' }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  style={{ background: '#7ea4c8' }}
                />
              </div>
            </div>
          </Tile>

          {/* ── Tasks ── */}
          <Tile className="md:col-span-2" custom={1}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[14px]" style={{ color: '#2a2a2e' }}>My Tasks</h3>
              <button className="text-[11px] font-semibold" style={{ color: '#7ea4c8' }}>View All</button>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { t: 'Review design specs', d: 'Today', done: true },
                { t: 'Update brand copy', d: 'Tomorrow', done: false },
              ].map((task, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: '#f8f9fa', border: '1px solid rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{
                        background: task.done ? '#7ea4c8' : 'transparent',
                        borderColor: task.done ? '#7ea4c8' : 'rgba(0,0,0,0.15)',
                        color: '#fff'
                      }}
                    >
                      {task.done && (
                        <motion.svg viewBox="0 0 12 12" width="10" height="10"
                          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }} viewport={{ once: true }}>
                          <motion.path d="M2 6 L5 9 L10 3" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"
                            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }} viewport={{ once: true }} />
                        </motion.svg>
                      )}
                    </motion.div>
                    <span className={`text-[12px] font-medium ${task.done ? 'line-through' : ''}`}
                      style={{ color: task.done ? '#9a9a9e' : '#2a2a2e' }}>{task.t}</span>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-1 rounded-lg"
                    style={{ background: '#fff', color: '#9a9a9e', border: '1px solid rgba(0,0,0,0.05)' }}>{task.d}</span>
                </motion.div>
              ))}
            </div>
          </Tile>

          {/* ── Calendar ── */}
          <Tile className="items-center justify-center text-center" custom={2}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: 'rgba(139,126,200,0.08)' }}>
              <Calendar size={20} style={{ color: '#8b7ec8' }} />
            </div>
            <motion.h3 className="font-bold text-[30px] leading-none mb-1"
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }} viewport={{ once: true }}
              style={{ color: '#2a2a2e' }}>
              14
            </motion.h3>
            <p className="text-[11px] font-medium uppercase tracking-widest" style={{ color: '#9a9a9e' }}>Tue, Oct</p>
          </Tile>

          {/* ── Team Chat ── */}
          <Tile className="p-0 relative" custom={3}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,126,164,0.06), rgba(200,168,126,0.04))' }} />
            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
              <div>
                <div className="flex mb-3">
                  {['#e8c8a4', '#a4c8e8', '#c8a4c8'].map((c, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="w-7 h-7 rounded-full border-2 border-white"
                      style={{ marginLeft: i ? -6 : 0, background: c }}
                    />
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-7 h-7 rounded-full border border-[rgba(0,0,0,0.06)] bg-white flex items-center justify-center text-[8px] font-bold"
                    style={{ marginLeft: -6, color: '#9a9a9e' }}>+2</motion.div>
                </div>
                <h3 className="font-bold text-[13px]" style={{ color: '#2a2a2e' }}>Team Chat</h3>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full rounded-xl p-2.5 flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.04)' }}
              >
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-2 h-2 rounded-full" style={{ background: '#7ec8a4' }} />
                <span className="text-[10px]" style={{ color: '#9a9a9e' }}>Sarah typing...</span>
              </motion.div>
            </div>
          </Tile>

        </div>
      </div>

      {/* Prompt footer */}
      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p>
          <code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
