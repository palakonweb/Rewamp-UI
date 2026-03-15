import React from 'react';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';

const row1 = [
    {
        name: "Floating Action Nav",
        component: (
            <div className="w-[260px] h-[150px] rounded-[24px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt/nav_bar.png" alt="Floating Nav" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    },
    {
        name: "Premium Tactile Buttons",
        component: (
            <div className="w-[260px] h-[150px] rounded-[24px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt/generate_button.png" alt="Tactile Buttons" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    },
    {
        name: "Premium UI Card",
        component: (
            <div className="w-[260px] h-[150px] rounded-[24px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt/ui_card.png" alt="Premium UI Card" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    },
    {
        name: "Bento Profile Card",
        component: (
            <div className="w-[260px] h-[150px] rounded-[24px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt/profile_card.png" alt="Profile Card" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    },
    {
        name: "Small Glass Button",
        component: (
            <div className="w-[260px] h-[150px] rounded-[24px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt/glass_button.png" alt="Small Glass Button" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    }
];

const row2 = [
    {
        name: "Ambient Glow Gradient",
        component: (
            <div className="w-[380px] h-[220px] rounded-[30px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt2/ambient_glow.png" alt="Ambient Glow Gradient" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    },
    {
        name: "Subtle Grid BG",
        component: (
            <div className="w-[380px] h-[220px] rounded-[30px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt2/subtle_grid.png" alt="Subtle Grid BG" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    },
    {
        name: "Floating UI Particles",
        component: (
            <div className="w-[380px] h-[220px] rounded-[30px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt2/floating_particles.png" alt="Floating UI Particles" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    },
    {
        name: "Hero Animation Concept",
        component: (
            <div className="w-[380px] h-[220px] rounded-[30px] bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <img src="/images/belt2/hero_animation.png" alt="Hero Animation Concept" className="w-[125%] h-[125%] object-cover transition-transform duration-700 hover:scale-[1.1]" />
            </div>
        )
    }
];

export default function MovingBeltSection() {
    return (
        <section className="w-full py-16 relative overflow-hidden bg-transparent border-t border-black/5 dark:border-white/5">
            <div className="text-center mb-16 relative px-4 z-10">
                <h2 className="text-3xl md:text-5xl font-light text-black dark:text-white tracking-tight mb-4">
                    Hundreds of micro-components.
                </h2>
                <p className="text-black/50 dark:text-white/50 text-[16px] md:text-[18px] font-light max-w-xl mx-auto leading-relaxed">
                    Instantly drop in powerfully built, pre-styled primitives like cinematic navbars, inputs, and tab bars.
                </p>
            </div>

            {/* Infinite Row 1 (Moving Right) */}
            <div className="w-full flex flex-col items-center justify-center overflow-hidden mb-6 md:mb-8">
                <InfiniteMovingCards
                    items={row1}
                    direction="right"
                    speed="slow"
                    pauseOnHover={true}
                    className="py-4"
                />
            </div>

            {/* Infinite Row 2 (Moving Left) */}
            <div className="w-full flex flex-col items-center justify-center overflow-hidden">
                <InfiniteMovingCards
                    items={row2}
                    direction="left"
                    speed="slow"
                    pauseOnHover={true}
                    className="py-4"
                />
            </div>
        </section>
    );
}
