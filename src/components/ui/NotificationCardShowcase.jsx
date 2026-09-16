import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Bell, MessageCircle, Star, Zap, UserPlus, Heart, X } from 'lucide-react';

/*
 * NotificationCardShowcase — animated notification feed with staggered mount,
 * swipe-to-dismiss via drag, live unread count badge, and shimmer on new items.
 */

const promptContent = `notification feed card — staggered list entrance animation, drag-to-dismiss with velocity threshold, live unread count badge with pulse, icon-type color coding, dark glass card UI`;

const ICON_MAP = { message: MessageCircle, star: Star, zap: Zap, follow: UserPlus, like: Heart };
const COLOR_MAP = { message: '#60a5fa', star: '#fbbf24', zap: '#a78bfa', follow: '#4ade80', like: '#f43f5e' };

const INITIAL = [
  { id: '1', type: 'message', title: 'New message from Sarah',   desc: '"The new components look incredible!"', time: '2m ago',  read: false },
  { id: '2', type: 'star',    title: 'Purrform hit 12k stars', desc: 'Your repo is trending on GitHub 🚀',   time: '14m ago', read: false },
  { id: '3', type: 'follow',  title: 'James Okafor followed you',desc: 'Head of Engineering @ Pulse Labs',    time: '1h ago',  read: false },
  { id: '4', type: 'zap',     title: 'Deploy succeeded',         desc: 'prod-v2.4.1 is live on edge network', time: '2h ago',  read: true  },
  { id: '5', type: 'like',    title: 'Priya liked your post',    desc: '"The glassmorphism article"',          time: '3h ago',  read: true  },
];

export default function NotificationCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [items, setItems] = useState(INITIAL);

  const dismiss = (id) => setItems(prev => prev.filter(n => n.id !== id));
  const markAll = () => setItems(prev => prev.map(n => ({ ...n, read: true })));
  const unread = items.filter(n => !n.read).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center py-12 px-6"
        style={{ background: '#07070d', minHeight: 500 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(96,165,250,0.07) 0%, transparent 55%)' }} />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md rounded-[22px] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell size={18} className="text-white/70" />
                <AnimatePresence>
                  {unread > 0 && (
                    <motion.div
                      key="badge"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white"
                      style={{ background: '#DC143C', boxShadow: '0 0 10px rgba(220,20,60,0.6)' }}
                    >
                      {unread}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-white font-black text-[14px]">Notifications</span>
            </div>
            <button onClick={markAll} className="text-[10px] font-semibold transition-colors hover:text-white/80"
              style={{ color: 'rgba(255,255,255,0.35)' }}>
              Mark all read
            </button>
          </div>

          {/* Notifications list */}
          <div className="flex flex-col py-2">
            <AnimatePresence initial={false}>
              {items.map((n, i) => {
                const IconComp = ICON_MAP[n.type] || Bell;
                const color = COLOR_MAP[n.type] || '#fff';
                return (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 120, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.04, ease: 'easeOut' }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={(_, info) => { if (info.velocity.x > 300 || info.offset.x > 80) dismiss(n.id); }}
                    className="flex items-start gap-3 px-5 py-3.5 border-b cursor-grab active:cursor-grabbing"
                    style={{
                      borderColor: 'rgba(255,255,255,0.04)',
                      background: !n.read ? 'rgba(255,255,255,0.025)' : 'transparent',
                    }}
                  >
                    {/* Icon */}
                    <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
                      <IconComp size={15} style={{ color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[12px] leading-tight truncate" style={{ color: n.read ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)' }}>
                          {n.title}
                        </p>
                        {!n.read && <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                          className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#DC143C' }} />}
                      </div>
                      <p className="text-[11px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{n.desc}</p>
                      <p className="text-[9px] mt-1 font-medium" style={{ color: `${color}77` }}>{n.time}</p>
                    </div>

                    {/* Dismiss */}
                    <button onClick={() => dismiss(n.id)} aria-label="Dismiss notification"
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <X size={11} className="text-white/50" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {items.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2 py-10">
                <Bell size={24} className="text-white/15" />
                <p className="text-white/25 text-[12px]">All caught up!</p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <button className="text-[11px] font-semibold text-white/30 hover:text-white/60 transition-colors">
              View all notifications →
            </button>
          </div>
        </div>

        <p className="absolute bottom-6 left-0 right-0 text-center text-white/20 text-[10px] font-medium">
          ← Drag notifications to dismiss
        </p>
        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Notifications</span>
      </div>
</div>
  );
}
