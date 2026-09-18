export const walletCardRevealPrompt = `Create an interactive layered fintech wallet card component that reveals masked balances on clicking an eye toggle, identical to the video reference.
- Outer container: A soft mint-sage background with a clean card frame.
- Behind the wallet: A tiered stack of 3 soft, beautifully styled branded payment cards:
  1. Stripe (soft lavender/periwinkle gradient with white lowercase logo, balance $32,495 / masked as "******")
  2. Wise (fresh lime gradient with Wise logo and arrow, balance $45,654 / masked as "******")
  3. PayPal (clean porcelain white ceramic card with PayPal double-P logo, balance $345,865 / masked as "******")
- Front pouch: A sleek tactile matte black leather wallet (#121212) with perimeter dashed stitching, a subtle top concave scoop opening, and a center display showing "Total Balance".
  - In hidden state: all 3 card headers peek out in neat tiers showing logos + masked asterisks "******", total balance shows "* * * * * *", eye icon at the bottom is eye-off in muted gray.
  - On clicking the eye button:
    - Cards slide up and fan out smoothly using cushioned spring physics.
    - Card balances animate from "******" into dollar amounts ($32,495, $45,654, $345,865).
    - Center total balance counts up smoothly from 0 to "$424,014" in refined Inter Medium typography.
    - Eye toggle icon illuminates into a glowing emerald green eye.
    - Clicking the eye again retracts all cards back into the pouch and re-masks the values.`;

export const walletCardRevealCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export interface CardData {
  id: string;
  name: string;
  logo: React.ReactNode;
  balance: string;
  hiddenBalance: string;
  background: string;
  textColor: string;
  boxShadow: string;
  border: string;
  yClosed: number;
  yOpen: number;
  width: string;
  zIndex: number;
}

export interface WalletCardRevealProps {
  initialRevealed?: boolean;
  totalBalanceAmount?: number;
  className?: string;
  onToggle?: (isRevealed: boolean) => void;
}

function CountUpNumber({ target, active }: { target: number; active: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString('en-US')
  );

  useEffect(() => {
    if (active) {
      const controls = animate(count, target, {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [active, target, count]);

  return <motion.span>{rounded}</motion.span>;
}

function StripeLogo() {
  return (
    <span className="text-[17px] font-bold text-white tracking-[-0.035em] font-sans select-none lowercase">
      stripe
    </span>
  );
}

function WiseLogo() {
  return (
    <div className="flex items-center gap-1.5 font-bold tracking-tight text-[#163300] select-none">
      <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] fill-current" aria-label="Wise icon">
        <path d="M3.5 3h12.8l-5.7 9.8h5.9L5.2 21l3.2-8.2H3.5L3.5 3z" />
      </svg>
      <span className="text-[16px] font-black tracking-tighter lowercase font-sans">wise</span>
    </div>
  );
}

function PayPalLogo() {
  return (
    <div className="flex items-center gap-1.5 select-none">
      <div className="relative w-4 h-5">
        <svg viewBox="0 0 24 28" className="w-full h-full">
          <path d="M5 2h10c4 0 7 2.5 6 6.5-1 4-4 6.5-8 6.5H9l-2 11H2L5 2z" fill="#003087" />
          <path d="M8 7h10c3.5 0 6 2 5 5.5s-3.5 6.5-7.5 6.5H12l-1.5 8H6l3-20h-1z" fill="#0079C1" opacity="0.9" />
        </svg>
      </div>
      <span className="text-[16px] font-black italic tracking-tight font-sans text-[#003087]">
        Pay<span className="text-[#0079C1]">Pal</span>
      </span>
    </div>
  );
}

export default function WalletCardReveal({
  initialRevealed = false,
  totalBalanceAmount = 424014,
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
      background: 'linear-gradient(135deg, #969BFB 0%, #8287F8 100%)',
      textColor: '#FFFFFF',
      boxShadow: '0 8px 24px -6px rgba(130, 135, 248, 0.38), 0 2px 6px rgba(0,0,0,0.04)',
      border: '1px solid rgba(255, 255, 255, 0.22)',
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
      background: 'linear-gradient(135deg, #A4EB76 0%, #8FE35C 100%)',
      textColor: '#163300',
      boxShadow: '0 8px 24px -6px rgba(143, 227, 92, 0.35), 0 2px 6px rgba(0,0,0,0.04)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
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
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F6F8FB 100%)',
      textColor: '#1E293B',
      boxShadow: '0 10px 28px -8px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      yClosed: 70,
      yOpen: 24,
      width: '98%',
      zIndex: 3,
    },
  ];

  return (
    <div className={\`relative flex flex-col items-center justify-center p-2 select-none \${className}\`}>
      <div className="relative w-full max-w-[320px] sm:max-w-[335px] pt-14 pb-4 flex flex-col items-center">
        {/* Behind Pouch: Stacked Brand Cards */}
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
                stiffness: 175,
                damping: 20,
                mass: 0.8,
                delay: isRevealed ? index * 0.04 : (2 - index) * 0.03,
              }}
              style={{
                background: card.background,
                color: card.textColor,
                zIndex: card.zIndex,
                width: card.width,
                boxShadow: card.boxShadow,
                border: card.border,
              }}
              className="absolute top-0 h-[170px] rounded-[24px] px-5 py-3.5 flex items-start justify-between backdrop-blur-xs transition-shadow"
            >
              <div className="flex items-center pt-0.5">{card.logo}</div>
              <div className="font-medium text-[14px] tracking-tight font-sans pt-0.5">
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.span
                      key="revealed"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
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
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="inline-block tracking-widest text-[12px]"
                    >
                      {card.hiddenBalance}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Front Pouch: Matte Black Leather Wallet */}
        <div
          className="relative z-10 w-full h-[295px] mt-24 rounded-[34px] bg-[#121212] text-white shadow-2xl shadow-black/40 flex flex-col justify-between p-6 sm:p-7 overflow-hidden border border-white/10"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 0%, #242424 0%, #0D0D0D 100%)',
          }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none p-2.5" aria-hidden="true">
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

          <div className="h-4" />

          {/* Balance Display: Inter Medium, $ Currency, CountUp Animation */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <div className="min-h-[40px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isRevealed ? (
                  <motion.div
                    key="revealed-total"
                    initial={{ opacity: 0, scale: 0.94, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -5 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="text-[25px] sm:text-[27px] font-medium tracking-[-0.025em] text-white/95 leading-none flex items-center gap-0.5"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    <span className="text-white/70 text-[21px] sm:text-[23px] font-normal mr-0.5">$</span>
                    <CountUpNumber target={totalBalanceAmount} active={isRevealed} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="hidden-total"
                    initial={{ opacity: 0, scale: 0.94, y: -5 }}
                    animate={{ opacity: 0.65, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 5 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="text-[24px] tracking-[0.26em] text-white/70 font-mono leading-none pl-2"
                  >
                    * * * * * *
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span
              className="text-[12.5px] font-normal text-white/40 mt-2 tracking-normal"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Total Balance
            </span>
          </div>

          {/* Bottom Eye Toggle Button */}
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
`;
