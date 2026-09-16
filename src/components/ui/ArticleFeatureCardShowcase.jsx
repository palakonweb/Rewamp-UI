import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, ArrowUpRight, BookOpen, Clock, Heart } from 'lucide-react';

/*
 * ArticleFeatureCardShowcase — editorial article cards with 3D tilt on hover,
 * image parallax layer, animated bookmark/like, and reading time badge.
 */

const promptContent = `editorial article feature card — 3D tilt with mouse-proximity rotateX/rotateY, image layer parallax inside card, animated like button with spring burst, reading time badge, dark premium editorial aesthetic`;

const ARTICLES = [
  {
    id: '1', category: 'Design Systems', tag: 'Featured',
    title: 'The Invisible Grid: How White Space Drives Conversion',
    excerpt: 'The most powerful design element isn\'t what you add — it\'s what you leave out. A deep dive into spatial rhythm and visual hierarchy.',
    readTime: '6 min read', likes: 847,
    accent: '#DC143C',
    gradient: 'linear-gradient(135deg, #1a0808 0%, #0d0505 100%)',
    imageGrad: 'linear-gradient(160deg, rgba(220,20,60,0.3) 0%, rgba(100,5,20,0.8) 100%)',
  },
  {
    id: '2', category: 'Engineering', tag: 'Deep Dive',
    title: 'Why Your Animation Feels Wrong (And How to Fix It)',
    excerpt: 'Spring physics, bezier curves, and why linear animations feel robotic. The math behind motion that feels natural.',
    readTime: '9 min read', likes: 1204,
    accent: '#7c3aed',
    gradient: 'linear-gradient(135deg, #0d0820 0%, #060412 100%)',
    imageGrad: 'linear-gradient(160deg, rgba(124,58,237,0.35) 0%, rgba(40,10,80,0.85) 100%)',
  },
  {
    id: '3', category: 'Product', tag: 'Opinion',
    title: 'Dark Mode is a Product Decision, Not a Theme',
    excerpt: 'Beyond color inversion — how intentional darkness creates emotion, focus, and brand identity that users remember.',
    readTime: '4 min read', likes: 593,
    accent: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #050e1a 0%, #030810 100%)',
    imageGrad: 'linear-gradient(160deg, rgba(14,165,233,0.3) 0%, rgba(5,30,60,0.85) 100%)',
  },
];

function ArticleCard({ article, index }) {
  const ref = useRef(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 22 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 22 });
  const imgX = useTransform(mx, [0, 1], [-10, 10]);
  const imgY = useTransform(my, [0, 1], [-10, 10]);

  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onMouseLeave = () => { mx.set(0.5); my.set(0.5); };

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      className="relative flex flex-col rounded-[20px] overflow-hidden cursor-pointer"
      role="article"
      aria-label={article.title}
      tabIndex={0}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        <motion.div className="absolute inset-0" style={{ x: imgX, y: imgY, scale: 1.08, background: article.imageGrad }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%)' }} />

        {/* Decorative shapes inside image */}
        <motion.div className="absolute top-4 right-4 opacity-40 pointer-events-none" style={{ x: useTransform(mx, [0,1], [6,-6]) }}>
          <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
            <circle cx="30" cy="30" r="25" fill="none" stroke={article.accent} strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="30" cy="30" r="12" fill={`${article.accent}33`} />
          </svg>
        </motion.div>

        {/* Category + tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
            style={{ background: `${article.accent}33`, color: article.accent, border: `1px solid ${article.accent}44` }}>
            {article.category}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/50">{article.tag}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4" style={{ background: article.gradient }}>
        <h3 className="font-black text-white text-[14px] leading-snug tracking-tight line-clamp-2">{article.title}</h3>
        <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{article.excerpt}</p>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-white/30 text-[10px]">
              <Clock size={9} /><span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1 text-white/30 text-[10px]">
              <BookOpen size={9} /><span>Article</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.8 }}
              className="flex items-center gap-1"
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              <motion.div animate={{ scale: liked ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.3 }}>
                <Heart size={13} style={{ fill: liked ? article.accent : 'none', color: liked ? article.accent : 'rgba(255,255,255,0.25)', transition: 'all 0.2s' }} />
              </motion.div>
              <span className="text-[10px] font-semibold" style={{ color: liked ? article.accent : 'rgba(255,255,255,0.3)' }}>
                {likeCount.toLocaleString()}
              </span>
            </motion.button>

            <motion.div whileHover={{ x: 2, y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
              <ArrowUpRight size={15} style={{ color: `${article.accent}99` }} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ArticleFeatureCardShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center py-12 px-8"
        style={{ background: '#060608', minHeight: 480 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(220,20,60,0.06) 0%, transparent 55%)' }} />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
          style={{ perspective: 1000 }}>
          {ARTICLES.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
        </div>

        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Article Cards</span>
      </div>
</div>
  );
}
