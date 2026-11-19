import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, DollarSign, HelpCircle, Check } from 'lucide-react';

const steps = [
    { id: 'wallet', label: 'Choose Wallet', icon: ArrowUp },
    { id: 'amount', label: 'Choose Amount', icon: DollarSign },
    { id: 'coin', label: 'Choose coin', icon: HelpCircle },
];

const SPRING = { type: 'spring', stiffness: 380, damping: 30 };

function StepBadge({ Icon, state }) {
    // state: 'done' | 'active' | 'upcoming'
    if (state === 'upcoming') {
        return (
            <div
                className="relative h-14 w-14 shrink-0 rounded-full flex items-center justify-center"
                style={{
                    background: 'linear-gradient(160deg, #ffffff, #ececec)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -4px 8px rgba(0,0,0,0.05), 0 4px 10px -4px rgba(0,0,0,0.1)',
                }}
            >
                <Icon size={20} strokeWidth={2} className="text-neutral-400" />
            </div>
        );
    }

    return (
        <motion.div
            layout
            transition={SPRING}
            className="relative h-14 w-14 shrink-0 rounded-full flex items-center justify-center"
            style={{
                background: 'linear-gradient(160deg, #4FB3FF 0%, #0A84FF 55%, #0066E0 100%)',
                boxShadow:
                    'inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -6px 10px rgba(0,60,160,0.35), 0 10px 20px -8px rgba(10,132,255,0.6)',
            }}
        >
            {state === 'done' ? (
                <Check size={20} strokeWidth={2.5} className="text-white" />
            ) : (
                <Icon size={20} strokeWidth={2.25} className="text-white" />
            )}
        </motion.div>
    );
}

function Connector({ filled }) {
    return (
        <div className="relative w-14 h-10 flex items-center justify-center">
            <div className="h-full w-[3px] rounded-full overflow-hidden" style={{ backgroundColor: '#E5E5E5' }}>
                <motion.div
                    className="w-full rounded-full"
                    style={{ background: 'linear-gradient(to bottom, #0A84FF, #4FB3FF)' }}
                    initial={false}
                    animate={{ height: filled ? '100%' : '0%' }}
                    transition={SPRING}
                />
            </div>
        </div>
    );
}

export default function ProcessStepsCardShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10" style={{ backgroundColor: 'var(--bg)' }}>
            <div
                className="w-full max-w-sm rounded-[32px] px-7 py-8"
                style={{
                    backgroundColor: 'var(--surface)',
                    boxShadow: '0 24px 48px -18px rgba(0,0,0,0.16)',
                }}
            >
                {steps.map((step, i) => {
                    const Icon = step.icon;
                    const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'upcoming';

                    return (
                        <div key={step.id}>
                            <button
                                type="button"
                                onClick={() => setActiveIndex(i)}
                                className="flex items-center gap-4 w-full cursor-pointer text-left"
                            >
                                <StepBadge Icon={Icon} state={state} />
                                <span
                                    className="text-[22px] sm:text-[24px] font-bold transition-colors duration-200"
                                    style={{ color: state === 'upcoming' ? 'var(--text-subtle)' : 'var(--text-primary)' }}
                                >
                                    {step.label}
                                </span>
                            </button>
                            {i < steps.length - 1 && <Connector filled={i < activeIndex} />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
