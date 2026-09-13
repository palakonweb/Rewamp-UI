import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export interface CardData {
  id: string;
  name: string;
  logo: React.ReactNode;
  balance: string;
  hiddenBalance: string;
  bgColor: string;
  textColor: string;
  yClosed: number;
  yOpen: number;
  width: string;
  zIndex: number;
}

export interface WalletCardRevealProps {
  initialRevealed?: boolean;
  totalBalance?: string;
  className?: string;
  onToggle?: (isRevealed: boolean) => void;
}

// ─── Brand Logos ──────────────────────────────────────────────────────────────

function StripeLogo() {
  return (
    <span className="text-[19px] font-bold text-white tracking-[-0.04em] font-sans select-none lowercase">
      stripe
    </span>
  );
}

function WiseLogo() {
  return (
    <div className="flex items-center gap-1.5 font-bold tracking-tight text-[#163300] select-none">
      {/* Wise flag/arrow bolt */}
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-label="Wise icon">
        <path d="M3.5 3h12.8l-5.7 9.8h5.9L5.2 21l3.2-8.2H3.5L3.5 3z" />
      </svg>
      <span className="text-[17px] font-black tracking-tighter lowercase font-sans">wise</span>
    </div>
  );
}

function PayPalLogo() {
  return (
    <div className="flex items-center gap-1.5 select-none">
      {/* Double P monogram */}
      <div className="relative w-4 h-5">
        <svg viewBox="0 0 24 28" className="w-full h-full">
          <path d="M5 2h10c4 0 7 2.5 6 6.5-1 4-4 6.5-8 6.5H9l-2 11H2L5 2z" fill="#003087" />
          <path d="M8 7h10c3.5 0 6 2 5 5.5s-3.5 6.5-7.5 6.5H12l-1.5 8H6l3-20h-1z" fill="#0079C1" opacity="0.9" />
        </svg>
      </div>
      <span className="text-[17px] font-black italic tracking-tight font-sans text-[#003087]">
        Pay<span className="text-[#0079C1]">Pal</span>
      </span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WalletCardReveal({
  initialRevealed = false,
  totalBalance = '424,014',
  className = '',
  onToggle,
}: WalletCardRevealProps) {
  const [isRevealed, setIsRevealed] = useState(initialRevealed);

  const handleToggle = () => {
    const next = !isRevealed;
    setIsRevealed(next);
    onToggle?.(next);
  };

  const cards: CardData[] = [
    {
      id: 'stripe',
      name: 'Stripe',
      logo: <StripeLogo />,
      balance: '$32,495',
      hiddenBalance: '******',
      bgColor: '#9B9EFF', // soft lavender periwinkle
      textColor: '#FFFFFF',
      yClosed: 0,
      yOpen: -68,
      width: '88%',
      zIndex: 1,
    },
    {
      id: 'wise',
      name: 'Wise',
      logo: <WiseLogo />,
      balance: '$45,654',
      hiddenBalance: '******',
      bgColor: '#9FE870', // wise lime
      textColor: '#163300',
      yClosed: 34,
      yOpen: -22,
      width: '93%',
      zIndex: 2,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      logo: <PayPalLogo />,
      balance: '$345,865',
      hiddenBalance: '******',
      bgColor: '#F1F4F7', // porcelain light card
      textColor: '#1E293B',
      yClosed: 70,
      yOpen: 24,
      width: '98%',
      zIndex: 3,
    },
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 sm:p-8 select-none ${className}`}>
      {/* Container sizing */}
      <div className="relative w-[320px] sm:w-[335px] pt-14 pb-4 flex flex-col items-center">
        
        {/* ── Behind Pouch: Stacked Brand Cards ── */}
        <div className="absolute top-0 w-full flex justify-center">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                y: isRevealed ? card.yOpen : card.yClosed,
                scale: isRevealed ? 1 - (2 - index) * 0.015 : 1 - (2 - index) * 0.025,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
                mass: 0.85,
                delay: isRevealed ? index * 0.04 : (2 - index) * 0.03,
              }}
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
                zIndex: card.zIndex,
                width: card.width,
              }}
              className="absolute top-0 h-[170px] rounded-[24px] px-5 py-3.5 shadow-sm flex items-start justify-between border border-black/5"
            >
              {/* Brand Logo */}
              <div className="flex items-center pt-0.5">{card.logo}</div>

              {/* Amount / Masked Asterisks */}
              <div className="font-semibold text-[14.5px] tracking-tight pt-0.5">
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.span
                      key="revealed"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.18 }}
                      className="inline-block"
                    >
                      {card.balance}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="hidden"
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 0.75, y: 0 }}
                      exit={{ opacity: 0, y: 3 }}
                      transition={{ duration: 0.18 }}
                      className="inline-block tracking-widest text-[12.5px]"
                    >
                      {card.hiddenBalance}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Front Pouch: Sleek Matte Black Leather Wallet ── */}
        <div
          className="relative z-10 w-full h-[300px] mt-24 rounded-[34px] bg-[#121212] text-white shadow-2xl shadow-black/40 flex flex-col justify-between p-6 sm:p-7 overflow-hidden border border-white/10"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 0%, #242424 0%, #0D0D0D 100%)',
          }}
        >
          {/* Subtle perimeter stitch thread */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none p-2.5"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="26"
              fill="none"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Top concave scoop cutout visually framing cards */}
          <div
            aria-hidden="true"
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-44 h-7 bg-transparent rounded-b-[100%] shadow-[inset_0_-2px_6px_rgba(0,0,0,0.5)]"
          />

          <div className="h-4" />

          {/* Center Balance Display */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <div className="min-h-[46px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isRevealed ? (
                  <motion.div
                    key="revealed-total"
                    initial={{ opacity: 0, scale: 0.92, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="text-[38px] sm:text-[42px] font-extrabold tracking-tight text-white leading-none font-sans"
                  >
                    {totalBalance}
                  </motion.div>
                ) : (
                  <motion.div
                    key="hidden-total"
                    initial={{ opacity: 0, scale: 0.92, y: -6 }}
                    animate={{ opacity: 0.65, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 6 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="text-[26px] tracking-[0.28em] text-white/70 font-mono leading-none pl-2"
                  >
                    * * * * * *
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[13px] font-medium text-white/45 mt-2 tracking-normal">
              Total Balance
            </span>
          </div>

          {/* Bottom Interactive Eye Button */}
          <div className="flex justify-center pb-0.5">
            <motion.button
              onClick={handleToggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={isRevealed ? 'Hide balances' : 'Reveal balances'}
              className="relative group p-3 rounded-full cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              style={{
                backgroundColor: isRevealed ? 'rgba(34, 197, 94, 0.18)' : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isRevealed ? (
                  <motion.div
                    key="eye-open"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Eye size={22} className="text-[#86EFAC] drop-shadow-[0_0_8px_rgba(134,239,172,0.5)]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="eye-off"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <EyeOff size={22} className="text-white/30 group-hover:text-white/60 transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
