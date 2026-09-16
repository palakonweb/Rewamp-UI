import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, CheckCircle2, XCircle } from 'lucide-react';

const promptContent = `Set of three pricing cards (Studio, Starter, Pro) with a soft pastel aesthetic. Cards feature rounded corners, light backgrounds, distinct colored feature blocks (faint green, yellow, pink), and large typography. The middle card has a bright lime accent button and a floating 'until may' pill on the price. Simple, clean, high-contrast text.`;

function PricingCard({ title, desc, price, period, features, theme = 'default', isMiddle = false, delay = 0 }) {
  // Theme mappings
  const bg = theme === 'pink' ? 'bg-[#fdf2f8]' : 'bg-white';
  const featureBoxBg = theme === 'green' ? 'bg-[#f0fdf4]' : theme === 'yellow' ? 'bg-[#fefce8]' : theme === 'pink' ? 'bg-[#fce7f3]' : 'bg-slate-50';
  const buttonClass = theme === 'lime' 
      ? 'bg-[#d9f95d] text-slate-900 border border-[#c4e548] hover:bg-[#cbf03e]' 
      : 'bg-[#18181b] text-white hover:bg-black';
  const iconColor = (status) => status ? 'text-emerald-500' : 'text-rose-400';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -3, scale: 1.01 }}
      className={`w-full max-w-[280px] rounded-[32px] p-6 pb-8 mx-auto flex flex-col shadow-xl border border-black/5 ${bg} relative transition-all duration-300 group`}
    >
        <h3 className="text-slate-900 font-medium text-[20px] tracking-tight mb-4">{title}</h3>
        <p className="text-slate-400 text-[12px] font-medium mb-2">{desc}</p>
        
        <div className="flex items-baseline gap-1 mb-6 relative">
            <span className="text-slate-900 font-medium text-[42px] leading-none tracking-tighter sm:text-[48px]">{price}</span>
            <span className="text-slate-900 text-[12px] font-medium">/{period}</span>
            
            {/* The absolute pill for middle card */}
            {isMiddle && (
                <motion.div animate={{ y: [-2, 2, -2], rotate: [3, 5, 3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                   className="absolute -top-3 -right-2 bg-[#d9f95d] px-3 py-1 rounded-full text-slate-800 font-bold text-[10px] shadow-sm border border-[#c4e548] z-10">
                   until may
                </motion.div>
            )}
        </div>

        {/* Feature Box */}
        <motion.div variants={{ initial: { opacity: 0.8 }, hover: { opacity: 1 } }} initial="initial" whileHover="hover" className={`w-full rounded-[16px] p-4 flex flex-col gap-3 mb-6 ${featureBoxBg}`}>
           {features.map((f, i) => (
               <motion.div key={i} custom={i} variants={{ initial: { x: -10, opacity: 0 }, animate: { x: 0, opacity: 1 } }} initial="initial" animate="animate" transition={{ delay: delay + 0.2 + (i * 0.1) }} className="flex items-center gap-3 relative overflow-hidden">
                  <motion.div whileHover={{ scale: 1.2, rotate: 180 }} transition={{ type: 'spring', stiffness: 300 }} className="cursor-pointer">
                    {f.included ? <CheckCircle2 size={16} className={iconColor(true)} /> : <XCircle size={16} className={iconColor(false)} />}
                  </motion.div>
                  <span className="text-slate-700 text-[13px] font-medium">{f.text}</span>
               </motion.div>
           ))}
        </motion.div>

        <p className="text-slate-600 text-[11px] font-medium mb-6 leading-relaxed max-w-[200px]">
           All the essentials to build and launch your first portfolio
        </p>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`w-full py-4 rounded-full font-bold text-[14px] mt-auto transition-colors shadow-md ${buttonClass}`}>
           Choose
        </motion.button>
    </motion.div>
  );
}

export default function PastelPricingCardsShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const featuresList = [
      { text: '1 project', included: true },
      { text: 'Up to 3 pages', included: true },
      { text: 'Email support', included: true },
      { text: 'Basic analytics', included: true },
  ];
  
  const featuresListMiddle = [
      { text: '1 project', included: true },
      { text: 'Up to 3 pages', included: true },
      { text: 'Email support', included: false },
      { text: 'Basic analytics', included: false },
  ];

  return (
    <div className="w-full flex flex-col gap-6 max-w-6xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 py-16 px-6 flex items-center justify-center min-h-[600px] bg-[#d5e0d5] dark:bg-[#202520]">
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[900px] mx-auto z-10">
            
            <PricingCard 
                title="Studio"
                desc="Best for teams and agencies"
                price="$199.90"
                period="month"
                theme="green"
                features={featuresList}
                delay={0.1}
            />

            <PricingCard 
                title="Starter"
                desc="Perfect to get started"
                price="$49.90"
                period="month"
                theme="yellow"
                isMiddle={true}
                features={featuresListMiddle}
                delay={0.2}
            />

            <PricingCard 
                title="Pro"
                desc="Perfect to get started"
                price="$49.90"
                period="month"
                theme="pink"
                features={featuresListMiddle}
                delay={0.3}
            />

         </div>

      </div>
</div>
  );
}
