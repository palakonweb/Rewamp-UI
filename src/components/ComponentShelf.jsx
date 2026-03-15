import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { motion } from "framer-motion";

// --- Mock Components ---
// These are slightly scaled-up, highly detailed mock components that match the Aceternity request.
// They use the 0.5s staggered fade logic matching the user's prompt.

const ProfileCard = () => (
    <div className="w-full flex flex-col items-center gap-4 bg-white/5 dark:bg-black/20 p-6 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent-red)] to-orange-400 p-[2px]"
        >
            <div className="w-full h-full rounded-full bg-black/80 dark:bg-black overflow-hidden border-2 border-transparent">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80')] bg-cover bg-center opacity-80 mix-blend-luminosity"></div>
            </div>
        </motion.div>
        <div className="flex flex-col items-center gap-2 w-full">
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-3/4 h-3 rounded bg-black/70 dark:bg-white/70"
            />
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="w-1/2 h-2 rounded bg-[var(--color-accent-red)]/80"
            />
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="w-[90%] h-2 rounded bg-black/20 dark:bg-white/20 mt-2"
            />
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="w-[60%] h-2 rounded bg-black/20 dark:bg-white/20"
            />
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.5 }}
                className="w-full mt-4 h-8 rounded-md bg-[var(--color-accent-red)] flex items-center justify-center border border-[var(--color-accent-red)]/50 shadow-[0_0_15px_rgba(154,0,2,0.3)]"
            >
                <div className="w-1/3 h-1.5 rounded-full bg-white/70"></div>
            </motion.div>
        </div>
    </div>
);

const FeatureBento = () => (
    <div className="w-full grid grid-cols-2 grid-rows-2 gap-2 h-48">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="row-span-2 col-span-1 rounded-xl bg-gradient-to-br from-[var(--color-accent-red)]/10 to-transparent border border-[var(--color-accent-red)]/20 p-4 flex flex-col gap-3"
        >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-red)]/20 mb-auto" />
            <div className="w-full h-2 rounded bg-black/40 dark:bg-white/40" />
            <div className="w-2/3 h-2 rounded bg-black/20 dark:bg-white/20" />
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="row-span-1 col-span-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 flex flex-col justify-end gap-2"
        >
            <div className="w-full h-1.5 rounded bg-black/30 dark:bg-white/30" />
            <div className="w-1/2 h-1.5 rounded bg-black/20 dark:bg-white/20" />
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="row-span-1 col-span-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 flex items-center justify-center overflow-hidden relative"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border border-dashed border-black/20 dark:border-white/20"
            />
            <div className="absolute w-6 h-6 rounded-full bg-[var(--color-accent-red)] blur-[8px] opacity-40"></div>
        </motion.div>
    </div>
);

const SettingsPanel = () => (
    <div className="w-full flex flex-col gap-3 bg-white/5 dark:bg-black/20 p-5 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.5 }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-black/10 dark:bg-white/10" />
                    <div className="flex flex-col gap-1.5">
                        <div className="w-20 h-2 rounded bg-black/60 dark:bg-white/60" />
                        <div className="w-12 h-1.5 rounded bg-black/30 dark:bg-white/30" />
                    </div>
                </div>
                {/* Toggle switch mock */}
                <div className={`w-8 h-4 rounded-full flex items-center px-0.5 ${i === 1 ? 'bg-[var(--color-accent-red)]' : 'bg-black/20 dark:bg-white/20'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform ${i === 1 ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
            </motion.div>
        ))}
    </div>
);

const MarketingHero = () => (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,var(--color-accent-red)_0%,transparent_50%)] rounded-xl border border-black/5 dark:border-white/5 h-48 relative overflow-hidden text-center opacity-90">
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="px-3 py-1 rounded-full border border-[var(--color-accent-red)]/40 bg-[var(--color-accent-red)]/10 mb-4 flex items-center gap-2"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] animate-pulse" />
            <div className="w-12 h-1.5 rounded-full bg-[var(--color-accent-red)]/60" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full max-w-[80%] h-6 rounded-md bg-black/80 dark:bg-white/80 mb-3"
        />
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="w-1/2 h-4 rounded-md bg-black/60 dark:bg-white/60 mb-6"
        />

        <div className="flex gap-3">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="w-20 h-8 rounded-lg bg-[var(--color-accent-red)] shadow-lg shadow-[var(--color-accent-red)]/20"
            />
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="w-20 h-8 rounded-lg border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
            />
        </div>
    </div>
);

const DataChart = () => (
    <div className="w-full flex flex-col gap-4 bg-white/5 dark:bg-black/20 p-5 rounded-xl border border-black/5 dark:border-white/5 shadow-sm h-48">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="flex justify-between items-end w-full"
        >
            <div className="flex flex-col gap-2">
                <div className="w-16 h-2 rounded bg-black/40 dark:bg-white/40" />
                <div className="w-24 h-4 rounded bg-black.80 dark:bg-white/80" />
            </div>
            <div className="px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20 flex items-center">
                <div className="w-8 h-1.5 rounded-full bg-green-500/70" />
            </div>
        </motion.div>

        {/* Bar Chart Mock */}
        <div className="flex-1 flex items-end justify-between gap-2 mt-2 border-t border-black/10 dark:border-white/10 pt-4">
            {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${height}%`, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                    className={`w-full rounded-t-sm ${i === 3 ? 'bg-[var(--color-accent-red)]' : 'bg-black/10 dark:bg-white/10'}`}
                />
            ))}
        </div>
    </div>
);


const ComponentItems = [
    {
        name: "User Cards",
        title: "Social block",
        component: <ProfileCard />,
    },
    {
        name: "Bento Layouts",
        title: "Content Grids",
        component: <FeatureBento />,
    },
    {
        name: "Forms",
        title: "Settings panel",
        component: <SettingsPanel />,
    },
    {
        name: "Hero Sections",
        title: "Landing headers",
        component: <MarketingHero />,
    },
    {
        name: "Dashboards",
        title: "Data visuals",
        component: <DataChart />,
    },
];

const ComponentShelf = () => {
    return (
        <section className="w-full pt-16 flex flex-col items-center relative overflow-hidden pb-32">
            <div className="text-center mb-16 relative z-10 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl text-black dark:text-white font-medium tracking-tight mb-4"
                >
                    Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-red)] to-red-400">Scale</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-black/60 dark:text-gray-400 font-light max-w-lg mx-auto text-lg leading-relaxed"
                >
                    A massive, ever-growing catalog of premium coded components. Copy, paste, and ship faster than ever.
                </motion.p>
            </div>

            <div className="w-full relative z-10 flex flex-col items-center justify-center">
                <InfiniteMovingCards
                    items={ComponentItems}
                    direction="right"
                    speed="slow"
                />
            </div>

        </section>
    );
};

export default ComponentShelf;
