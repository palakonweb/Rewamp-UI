import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Zap, Shield, Globe, ArrowRight } from 'lucide-react';

/*
 * PricingCardShowcase — three-tier premium pricing cards with toggle between
 * monthly/annual billing, staggered entrance, and active-tier glow highlight.
 */

const promptContent = `premium pricing card — three tiers with monthly/annual toggle, staggered entrance animation, active tier full-color glow border, feature list with animated checkmarks, dark glass aesthetic`;

const PLANS = [
  {
    name: 'Starter', icon: Zap, monthly: 9, annual: 7,
    description: 'For solo builders and early projects.',
    features: ['5 Projects', '10 GB Storage', 'API Access', 'Community Support', '99.5% Uptime SLA'],
    color: '#6366f1', cta: 'Start Free Trial', highlighted: false,
  },
  {
    name: 'Pro', icon: Shield, monthly: 29, annual: 22,
    description: 'The sweet spot for growing teams.',
    features: ['Unlimited Projects', '100 GB Storage', 'Priority API', 'Slack Support', '99.9% Uptime SLA', 'Custom Domains', 'Advanced Analytics'],
    color: '#DC143C', cta: 'Get Started', highlighted: true,
  },
  {
    name: 'Scale', icon: Globe, monthly: 79, annual: 59,
    description: 'Enterprise power without the friction.',
    features: ['Unlimited Everything', '10 TB Storage', 'Dedicated API', '24/7 Support', '99.99% SLA', 'SSO / SAML', 'SLA Contract', 'Custom Integrations'],
    color: '#0ea5e9', cta: 'Contact Sales', highlighted: false,
  },
];

function CheckIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6.5" fill={`${color}22`} stroke={`${color}55`} />
      <path d="M4.5 7L6.2 8.8L9.5 5.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [annual, setAnnual] = useState(false);

  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex flex-col items-center justify-center py-14 px-6 gap-8"
        style={{ background: '#080808', minHeight: 560 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(220,20,60,0.08) 0%, transparent 60%)' }} />

        {/* Billing toggle */}
        <div className="flex items-center gap-3 z-10">
          <span className="text-[12px] font-semibold" style={{ color: !annual ? 'white' : 'rgba(255,255,255,0.35)' }}>Monthly</span>
          <motion.button
            onClick={() => setAnnual(a => !a)}
            className="relative w-12 h-6 rounded-full"
            style={{ background: annual ? '#DC143C' : 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label="Toggle annual billing"
          >
            <motion.div animate={{ x: annual ? 24 : 2 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }} />
          </motion.button>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-semibold" style={{ color: annual ? 'white' : 'rgba(255,255,255,0.35)' }}>Annual</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(220,20,60,0.2)', color: '#DC143C', border: '1px solid rgba(220,20,60,0.3)' }}>-25%</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl z-10">
          {PLANS.map((plan, i) => {
            const IconComp = plan.icon;
            const price = annual ? plan.annual : plan.monthly;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative flex flex-col gap-5 p-5 rounded-[20px] cursor-pointer"
                style={{
                  background: plan.highlighted ? `${plan.color}14` : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${plan.highlighted ? plan.color + '55' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: plan.highlighted ? `0 0 60px ${plan.color}22, 0 8px 40px rgba(0,0,0,0.4)` : '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white"
                    style={{ background: plan.color, boxShadow: `0 4px 16px ${plan.color}66` }}>
                    Most Popular
                  </div>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${plan.color}22`, border: `1px solid ${plan.color}33` }}>
                    <IconComp size={16} style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-[15px]">{plan.name}</h3>
                    <p className="text-[10px] text-white/35 leading-tight mt-0.5">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span key={`${plan.name}-${annual}`} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}
                      className="font-black leading-none tracking-tight text-white" style={{ fontSize: 36 }}>
                      ${price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-white/30 text-[12px] mb-1.5">/mo</span>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${plan.color}33, transparent)` }} />

                {/* Features */}
                <ul className="flex flex-col gap-2">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <CheckIcon color={plan.color} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="mt-auto w-full py-2.5 rounded-xl text-[12px] font-bold flex items-center justify-center gap-2"
                  style={{
                    background: plan.highlighted ? plan.color : `${plan.color}14`,
                    border: `1px solid ${plan.highlighted ? 'transparent' : plan.color + '44'}`,
                    color: plan.highlighted ? 'white' : plan.color,
                    boxShadow: plan.highlighted ? `0 4px 20px ${plan.color}55` : 'none',
                  }}
                >
                  {plan.cta} <ArrowRight size={13} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Pricing Card</span>
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
