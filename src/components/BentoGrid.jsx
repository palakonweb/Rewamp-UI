import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Copy, Check, Terminal, LayoutTemplate, FileCode2, Command, Bell, User, Settings, ArrowRight } from 'lucide-react';

// Typing effect for the search bar
const TypedSearchText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[index]);
                setIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedText("");
                setIndex(0);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span className="font-mono text-[13px] text-white/50 font-medium">
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[2px] h-[13px] bg-white/50 ml-1 align-middle"
            />
        </span>
    );
};


const BentoGrid = () => {
    return (
        <section
            id="features"
            className="w-full pt-20 flex flex-col items-center pb-24 overflow-hidden relative bg-transparent"
        >
            {/* Soft radial red glow behind the center card area */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(154,0,2,0.1),transparent_65%)] pointer-events-none z-0" />

            {/* Typography Header */}
            <div className="text-center z-10 mb-16 px-4 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-medium text-black dark:text-white mb-4 tracking-tight">
                    A Premium Library of UI Building Blocks
                </h2>
                <p className="text-black/50 dark:text-white/50 text-[15px] md:text-[17px] leading-relaxed font-light">
                    Access beautifully crafted UI components designed for modern SaaS applications.
                </p>
            </div>

            {/* Grid Layout: 5 Cards (1 Left, 1 Center, 1 Right x 2 Rows) */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[250px] gap-4 w-full h-auto min-h-[500px] max-w-5xl px-4 md:px-0 mx-auto relative z-10"
            >

                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                    whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                    className="md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-1 hover:shadow-[0_8px_30px_rgba(154,0,2,0.1)] glass-panel rounded-3xl p-5 flex flex-col relative overflow-hidden group border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-[#0c0c0c] transition-all"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-red)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none z-0" />

                    <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mb-4">
                        {/* Realistic Search Bar UI */}
                        <div className="w-full h-11 rounded-xl bg-[#1a1a1a] border border-white/5 shadow-inner flex items-center px-3 relative group-hover:border-white/10 transition-colors">
                            <Search size={14} className="text-white/30 shrink-0 mr-2.5" />
                            {/* Static or typing placeholder */}
                            <TypedSearchText text="Search components..." />

                            <div className="absolute right-2 px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-white/40 border border-white/10 font-mono flex items-center gap-0.5">
                                <Command size={8} /> K
                            </div>''
                        </div>

                        {/* Faux dropdown results */}
                        <div className="w-full mt-2 bg-[#1a1a1a] border border-white/5 rounded-xl p-1 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-1/4 w-12 h-12 bg-[var(--color-accent-red)]/10 blur-[15px] rounded-full pointer-events-none" />
                            <div className="w-full px-2 py-1.5 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group/item">
                                <LayoutTemplate size={10} className="text-white/30 group-hover/item:text-[var(--color-accent-red)]" />
                                <span className="text-[10px] text-white/70 group-hover/item:text-white">Pricing Cards</span>
                            </div>
                            <div className="w-full px-2 py-1.5 flex items-center gap-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group/item">
                                <User size={10} className="text-white/30 group-hover/item:text-[var(--color-accent-red)]" />
                                <span className="text-[10px] text-white/70 group-hover/item:text-white">Profile Settings</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-black dark:text-white text-[15px] font-medium mt-auto relative z-10 tracking-tight">Instant Search</h3>
                </motion.div>

                {/* ------------------------------------------------------------- */}
                {/* 2. Interactive Screen Demo (Center highlight) */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } } }}
                    whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                    className="col-start-1 md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2 glass-panel rounded-3xl p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden group border border-[var(--color-accent-red)]/10 dark:border-[var(--color-accent-red)]/20 bg-white dark:bg-[#060606] shadow-[0_0_50px_rgba(154,0,2,0.05)] dark:shadow-[0_0_50px_rgba(154,0,2,0.08)] hover:shadow-[0_15px_60px_rgba(154,0,2,0.15)] transition-all"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent-red)]/10 to-transparent pointer-events-none z-0 opacity-50" />
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-red)]/50 to-transparent z-10" />

                    <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mb-8">

                        {/* Realistic Application Screen / Dashboard Mockup */}
                        <div className="relative w-full max-w-[480px] h-[240px] md:h-[320px] bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl flex flex-col z-10 overflow-hidden ring-1 ring-white/5">

                            {/* App Header Chrome */}
                            <div className="h-10 w-full bg-[#111] flex items-center px-4 justify-between border-b border-white/5 shrink-0 z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-[var(--color-accent-red)]/20 flex flex-shrink-0 items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-accent-red)]" />
                                    </div>
                                    <span className="text-[11px] font-medium text-white/90">Acme Corp</span>
                                    <div className="h-3 w-px bg-white/10 mx-1" />
                                    <span className="text-[10px] text-white/40">Projects</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Settings size={12} className="text-white/30" />
                                    <Bell size={12} className="text-white/30" />
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600 border border-white/10" />
                                </div>
                            </div>

                            {/* App Content Area */}
                            <div className="flex-1 w-full h-full relative bg-[#050505] flex items-center justify-center p-6 overflow-hidden">

                                {/* Background grid for texture inside app */}
                                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />

                                {/* Interactive UI Component (Pricing Card Example) */}
                                <div className="relative w-full max-w-[260px] bg-[#111] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col items-center z-10">
                                    <div className="w-full flex justify-between items-start mb-4">
                                        <div className="flex flex-col text-left">
                                            <span className="text-white/80 text-[13px] font-medium mb-1">Pro Plan</span>
                                            <span className="text-white/40 text-[9px]">For scaling teams</span>
                                        </div>
                                        <div className="px-2 py-0.5 rounded-full bg-[var(--color-accent-red)]/10 text-[var(--color-accent-red)] text-[9px] font-medium border border-[var(--color-accent-red)]/20">Popular</div>
                                    </div>

                                    <div className="w-full flex items-baseline gap-1 mb-6">
                                        <span className="text-3xl font-bold text-white tracking-tight">$49</span>
                                        <span className="text-white/40 text-[10px]">/ month</span>
                                    </div>

                                    {/* The Target Button that gets clicked */}
                                    <motion.button
                                        animate={{
                                            scale: [1, 1, 0.95, 1, 1],
                                            backgroundColor: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)", "rgba(154,0,2,0.8)", "rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)"],
                                            borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)", "rgba(154,0,2,1)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.65, 1], ease: "easeInOut" }}
                                        className="w-full h-9 rounded-lg border border-white/10 bg-white/5 text-white text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-sm overflow-hidden relative group/btn"
                                    >
                                        <span className="relative z-10">Copy Component</span>
                                        <ArrowRight size={10} className="relative z-10" />

                                        {/* Internal button glow when 'clicked' */}
                                        <motion.div
                                            animate={{ opacity: [0, 0, 1, 0, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.65, 1] }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                                        />
                                    </motion.button>
                                </div>

                                {/* Animated Cursor simulating a user click */}
                                <motion.div
                                    animate={{
                                        x: [100, 0, 0, 100],
                                        y: [120, 50, 50, 120],
                                        scale: [1, 1, 0.85, 1, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 0.65, 1], ease: "easeInOut" }}
                                    className="absolute z-50 w-6 h-6 ml-[-12px] mt-[-12px]"
                                    style={{ left: "50%", top: "50%" }}
                                >
                                    {/* Realistic macOS cursor SVG */}
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                                        <path d="M4 2L20 10.6667L12 13.3333L10.6667 21.3333L4 2Z" fill="white" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
                                    </svg>

                                    {/* Ripple effect on click */}
                                    <motion.div
                                        animate={{ scale: [0, 1.5, 1.5], opacity: [0, 0.5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.6, 1] }}
                                        className="absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white/30 rounded-full pointer-events-none"
                                    />
                                </motion.div>

                                {/* Toast Notification explicitly triggered after click */}
                                <motion.div
                                    animate={{ y: [20, -10, -10, 20], opacity: [0, 1, 1, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.55, 0.85, 1] }}
                                    className="absolute bottom-6 bg-[#222] border border-white/10 text-white text-[11px] font-medium px-4 py-2.5 rounded-lg flex items-center gap-2.5 shadow-2xl z-40 transform -translate-x-1/2 left-1/2"
                                >
                                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Check size={10} className="text-emerald-400" />
                                    </div>
                                    Copied to clipboard
                                </motion.div>

                            </div>
                        </div>
                    </div>

                    <h3 className="text-black dark:text-white text-[18px] md:text-[20px] font-medium mt-auto relative z-10 tracking-tight pb-1">From Prompt to Production Code</h3>
                    <p className="text-black/50 dark:text-white/50 text-[13px] font-light z-10 max-w-sm">Every generated component is optimized for modern frameworks and ready to drop into your project.</p>
                </motion.div>

                {/* ------------------------------------------------------------- */}
                {/* 3. Clean Components (Top Right) */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                    whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                    className="md:col-start-4 md:col-span-1 md:row-start-1 md:row-span-1 hover:shadow-[0_8px_30px_rgba(154,0,2,0.1)] glass-panel rounded-3xl p-5 flex flex-col items-center justify-center relative overflow-hidden group border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-[#0c0c0c] transition-all"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(154,0,2,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 mb-4 cursor-pointer">
                        {/* Realistic UI Profile Card Preview */}
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(154,0,2,0.15)", borderColor: "rgba(154,0,2,0.3)" }}
                            className="w-full max-w-[170px] bg-[#151515] border border-white/5 rounded-2xl p-4 shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col items-center"
                        >
                            <div className="absolute top-0 left-0 right-0 h-10 bg-[var(--color-accent-red)]/10" />
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-[#151515] shadow-lg z-10 mt-2 mb-2 flex items-center justify-center relative">
                                {/* Online indicator pulse */}
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#151515]" />
                            </div>
                            <div className="text-white text-[11px] font-semibold mb-0.5 z-10">Palak</div>
                            <div className="text-white/40 text-[9px] font-medium mb-3 z-10">@palak</div>

                            <div className="w-full flex gap-1.5 z-10 mt-1">
                                <div className="flex-1 h-6 rounded-lg bg-white/10 text-white text-[9px] font-medium flex items-center justify-center hover:bg-white/20 transition-colors">Follow</div>
                                <div className="flex-1 h-6 rounded-lg border border-white/10 text-white text-[9px] font-medium flex items-center justify-center hover:bg-white/5 transition-colors">Message</div>
                            </div>
                        </motion.div>
                    </div>

                    <h3 className="text-black dark:text-white text-[15px] font-medium mt-auto relative z-10 tracking-tight w-full text-left">Built for Real Applications</h3>
                </motion.div>

                {/* ------------------------------------------------------------- */}
                {/* 4. Instant Export (Bottom Left) */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                    whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                    className="md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-1 hover:shadow-[0_8px_30px_rgba(154,0,2,0.1)] glass-panel rounded-3xl p-5 flex flex-col relative overflow-hidden group border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-[#0c0c0c] transition-all"
                >
                    <div className="flex-1 flex w-full relative z-10 mb-4 items-center justify-center">
                        {/* Compact Code Block UI */}
                        <div className="w-full bg-[#111] rounded-xl border border-white/5 overflow-hidden shadow-2xl relative">
                            <div className="w-full h-8 bg-[#161616] border-b border-white/5 flex items-center px-3 justify-between">
                                <span className="text-[9px] text-white/50 font-mono flex items-center gap-1.5">
                                    <Terminal size={10} className="text-white/30" /> bash
                                </span>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)]/10 p-1.5 rounded-md cursor-pointer transition-colors relative"
                                >
                                    <Copy size={10} />
                                    {/* Faint static Copied tooltip for demo purpose */}
                                    <div className="absolute -top-6 right-0 bg-white text-black px-1.5 py-0.5 rounded text-[7px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        COPIED
                                    </div>
                                </motion.div>
                            </div>
                            <div className="p-4 font-mono text-[10px] md:text-[11px] leading-relaxed text-white/80 select-all">
                                <span className="text-emerald-400">npx</span> conjure-ui@latest <span className="text-[#a5d6ff]">add</span> search-bar
                            </div>
                        </div>
                    </div>

                    <h3 className="text-black dark:text-white text-[15px] font-medium mt-auto relative z-10 tracking-tight">Instant Export</h3>
                </motion.div>

                {/* ------------------------------------------------------------- */}
                {/* 5. Developer Ready (Bottom Right) */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                    whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                    className="md:col-start-4 md:col-span-1 md:row-start-2 md:row-span-1 hover:shadow-[0_8px_30px_rgba(154,0,2,0.1)] glass-panel rounded-3xl p-5 flex flex-col relative overflow-hidden group border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-[#0c0c0c] transition-all"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-red)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex-1 flex items-center justify-center w-full relative z-10 mb-4">
                        {/* Realistic Code Snippet Window */}
                        <div className="w-full max-w-[180px] bg-[#111] rounded-xl border border-white/5 shadow-2xl overflow-hidden relative group-hover:border-[var(--color-accent-red)]/20 transition-colors">
                            {/* Window Chrome */}
                            <div className="h-6 bg-[#161616] flex items-center px-2.5 gap-1.5 border-b border-white/5">
                                <FileCode2 size={10} className="text-[#519aba]" />
                                <span className="text-[8px] font-mono text-white/60">Button.tsx</span>
                            </div>

                            <div className="p-3 bg-[#0a0a0a] text-left">
                                <div className="font-mono text-[7px] text-white/90 leading-[1.6]">
                                    <span className="text-[#c678dd]">export</span> <span className="text-[#ff7b72]">function</span> <span className="text-[#79c0ff]">Button</span>(&#123; <span className="text-[#e2c08d]">className</span> &#125;) &#123;<br />
                                    &nbsp;&nbsp;<span className="text-[#c678dd]">return</span> (<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-[#e06c75]">button</span><br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#d19a66]">className</span>=<span className="text-[#98c379]">`</span><span className="text-[#98c379]">px-4 py-2 bg-red-500 rounded-md </span><span className="text-[#56b6c2]">$&#123;</span><span className="text-[#e2c08d]">className</span><span className="text-[#56b6c2]">&#125;</span><span className="text-[#98c379]">`</span><br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/50">&#123;</span><span className="text-[#e2c08d]">children</span><span className="text-white/50">&#125;</span><br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-[#e06c75]">button</span>&gt;<br />
                                    &nbsp;&nbsp;)<br />
                                    &#125;
                                </div>
                            </div>

                            {/* Decorative line highlight inside code */}
                            <div className="absolute top-[49px] left-0 right-0 h-[11px] bg-white/5 border-l-2 border-[var(--color-accent-red)] pointer-events-none" />
                        </div>
                    </div>

                    <h3 className="text-[15px] font-medium mt-auto relative z-10 text-black dark:text-white tracking-tight text-left w-full group-hover:text-[var(--color-accent-red)] transition-colors">Developer Ready</h3>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default BentoGrid;
