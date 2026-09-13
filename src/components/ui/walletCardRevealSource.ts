export const walletCardRevealPrompt = `Create an interactive layered fintech wallet card component that reveals masked balances on clicking an eye toggle, identical to the video reference.
- Outer container: A soft mint-sage background with a clean card frame.
- Behind the wallet: A stack of 3 branded payment cards:
  1. Stripe (lavender/periwinkle #9B9EFF with white logo, balance $32,495 / masked as "******")
  2. Wise (bright neon lime #9FE870 with Wise logo, balance $45,654 / masked as "******")
  3. PayPal (porcelain white/light gray #F1F4F7 with PayPal double-P logo, balance $345,865 / masked as "******")
- Front pouch: A tactile dark forest-moss leather wallet (#1E3020) with fine perimeter dashed stitching, a subtle top concave scoop opening, and a center display showing "Total Balance".
  - In hidden state: total balance shows "* * * * * *", eye icon at the bottom is eye-off in muted gray.
  - On clicking the eye button:
    - Cards slide up and fan out gracefully using Framer Motion spring physics.
    - Card balances smoothly animate from "******" into real dollar amounts.
    - Center total balance morphs into "424,014" in crisp bold white typography.
    - Eye toggle icon transforms into an illuminated green glowing eye.
    - Clicking the eye again retracts all cards back into the pouch and re-masks the values.`;

export const walletCardRevealCode = `import React, { useState } from 'react';
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
  offsetYClosed: number;
  offsetYOpen: number;
}

export interface WalletCardRevealProps {
  initialRevealed?: boolean;
  totalBalance?: string;
  className?: string;
  onToggle?: (isRevealed: boolean) => void;
}

function StripeLogo() {
  return (
    <svg viewBox="0 0 60 25" className="h-6 w-auto fill-current" aria-label="Stripe">
      <path d="M59.64 14.28c0-4.59-2.27-8.22-6.66-8.22-4.42 0-7.09 3.63-7.09 8.19 0 5.41 3.24 8.17 7.78 8.17 2.22 0 3.89-.5 5.16-1.29v-3.77c-1.27.73-2.73 1.15-4.48 1.15-1.78 0-3.32-.62-3.52-2.58h8.77c0-.21.04-1.22.04-1.65zm-8.8-1.74c0-1.89 1.14-2.65 2.12-2.65.95 0 2.05.76 2.05 2.65h-4.17zm-10.43-6.48c-1.78 0-2.92.83-3.48 1.41V6.31h-4.54v21.13l4.89-1.04v-4.99c.59.5 1.63 1.16 3.09 1.16 3.81 0 6.69-3.08 6.69-8.11-.01-4.88-2.93-8.4-6.65-8.4zm-1.32 12.33c-1.32 0-2.17-.51-2.65-1.07v-6.31c.5-.61 1.36-1.12 2.65-1.12 2.04 0 3.32 1.83 3.32 4.23 0 2.45-1.27 4.27-3.32 4.27zm-13.4-15.65l-4.9 1.04v3.83h-2.71v3.96h2.71v7.03c0 3.34 2.22 5.08 5.41 5.08 1.39 0 2.4-.25 2.92-.56v-3.84c-.45.18-2.67.87-2.67-1.74v-5.97h3.19V6.31h-3.19l-.76-3.57zm-10.87 5.84h-4.87v16.14h4.87V8.58zm-2.44-6.42c-1.65 0-2.99 1.33-2.99 2.98 0 1.66 1.34 3 2.99 3 1.66 0 3-1.34 3-3 0-1.65-1.34-2.98-3-2.98zM4.77 12.7c0-.82.68-1.37 1.83-1.37 1.62 0 3.69.52 5.29 1.41V8.65C10.22 7.97 8.35 7.6 6.55 7.6 2.65 7.6 0 9.71 0 13.06c0 5.25 7.23 4.41 7.23 6.68 0 .97-.85 1.48-2.02 1.48-1.75 0-4.04-.72-5.83-1.71v4.22c1.97.85 4.04 1.22 5.78 1.22 4.04 0 6.94-2 6.94-5.46 0-5.64-7.33-4.66-7.33-6.79z" />
    </svg>
  );
}

function WiseLogo() {
  return (
    <div className="flex items-center gap-1.5 font-bold tracking-tight">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Wise icon">
        <path d="M3.5 3h12.8l-5.7 9.8h5.9L5.2 21l3.2-8.2H3.5L3.5 3z" />
      </svg>
      <span className="text-[17px] font-black tracking-tighter lowercase">wise</span>
    </div>
  );
}

function PayPalLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative w-5 h-6">
        <svg viewBox="0 0 24 28" className="w-full h-full">
          <path d="M5 2h10c4 0 7 2.5 6 6.5-1 4-4 6.5-8 6.5H9l-2 11H2L5 2z" fill="#003087" />
          <path d="M8 7h10c3.5 0 6 2 5 5.5s-3.5 6.5-7.5 6.5H12l-1.5 8H6l3-20h-1z" fill="#0079C1" opacity="0.88" />
        </svg>
      </div>
      <span className="text-[17px] font-black italic tracking-tight text-[#003087]">
        Pay<span className="text-[#0079C1]">Pal</span>
      </span>
    </div>
  );
}

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
      bgColor: '#9B9EFF',
      textColor: '#FFFFFF',
      offsetYClosed: 0,
      offsetYOpen: -130,
    },
    {
      id: 'wise',
      name: 'Wise',
      logo: <WiseLogo />,
      balance: '$45,654',
      hiddenBalance: '******',
      bgColor: '#9FE870',
      textColor: '#163300',
      offsetYClosed: 32,
      offsetYOpen: -68,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      logo: <PayPalLogo />,
      balance: '$345,865',
      hiddenBalance: '******',
      bgColor: '#F1F4F7',
      textColor: '#1E293B',
      offsetYClosed: 64,
      offsetYOpen: -6,
    },
  ];

  return (
    <div className={\`relative flex flex-col items-center justify-center p-6 sm:p-10 select-none \${className}\`}>
      <div className="relative w-full max-w-[340px] pt-32 pb-4 flex flex-col items-center">
        {/* Layered Brand Cards */}
        <div className="absolute top-0 w-full flex justify-center pointer-events-none">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                y: isRevealed ? card.offsetYOpen : card.offsetYClosed,
                scale: isRevealed ? 1 - (2 - index) * 0.02 : 1 - (2 - index) * 0.03,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 24,
                mass: 0.9,
                delay: isRevealed ? index * 0.04 : (2 - index) * 0.03,
              }}
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
                zIndex: index + 1,
                width: index === 0 ? '90%' : index === 1 ? '95%' : '100%',
              }}
              className="absolute top-28 h-[160px] rounded-[24px] px-5 py-4 shadow-md flex items-start justify-between border border-black/5"
            >
              <div className="flex items-center">{card.logo}</div>
              <div className="font-semibold text-[15px] tracking-tight">
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.span
                      key="revealed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {card.balance}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="hidden"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 0.75, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block tracking-widest text-[13px]"
                    >
                      {card.hiddenBalance}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Front Pouch: Dark Leather Wallet */}
        <div
          className="relative z-10 w-full h-[330px] rounded-[36px] bg-[#1E3020] text-white shadow-2xl flex flex-col justify-between p-7 overflow-hidden border border-emerald-950/40"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 0%, #2A422D 0%, #172619 100%)',
          }}
        >
          {/* Perimeter Stitched Seam */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none p-2.5" aria-hidden="true">
            <rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="28"
              fill="none"
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          </svg>

          <div className="h-6" />

          {/* Balance Display */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <div className="min-h-[48px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isRevealed ? (
                  <motion.div
                    key="revealed-total"
                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -8 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="text-[38px] sm:text-[42px] font-extrabold tracking-tight text-white leading-none font-sans"
                  >
                    {totalBalance}
                  </motion.div>
                ) : (
                  <motion.div
                    key="hidden-total"
                    initial={{ opacity: 0, scale: 0.92, y: -8 }}
                    animate={{ opacity: 0.65, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 8 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="text-[28px] tracking-[0.28em] text-white/70 font-mono leading-none pl-2"
                  >
                    * * * * * *
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[13px] font-medium text-emerald-100/50 mt-2">
              Total Balance
            </span>
          </div>

          {/* Bottom Eye Toggle Button */}
          <div className="flex justify-center pb-1">
            <motion.button
              onClick={handleToggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={isRevealed ? 'Hide balances' : 'Reveal balances'}
              className="relative group p-3 rounded-full cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              style={{
                backgroundColor: isRevealed ? 'rgba(34, 197, 94, 0.15)' : 'rgba(0, 0, 0, 0.22)',
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
