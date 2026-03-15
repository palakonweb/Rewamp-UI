import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { name: "Hero Sections", image: "/images/premium-heroes.png", colSpan: "col-span-1" },
    { name: "Interactive Buttons", image: "/images/premium-buttons.png", colSpan: "col-span-1" },
    { name: "Bento Grids", image: "/images/premium-bentos.png", colSpan: "col-span-1" },
    { name: "Interface Cards", image: "/images/premium-cards.png", colSpan: "col-span-1" },
    { name: "Navigations", image: "/images/premium-navbars.png", colSpan: "col-span-1" },
    { name: "Background Effects", image: "/images/premium-backgrounds.png", colSpan: "col-span-1" }
];

export default function ComponentCategories() {
    return (
        <section id="components" className="w-full py-24 relative">
            <div className="max-w-5xl mx-auto px-4 md:px-0">
                <div className="mb-14 text-center">
                    <h2 className="text-4xl md:text-5xl font-medium text-black dark:text-white mb-4 tracking-tight drop-shadow-sm">
                        Everything You Need to Build Modern Interfaces
                    </h2>
                    <p className="text-black/50 dark:text-white/50 text-[16px] md:text-[18px] max-w-2xl mx-auto font-light leading-relaxed">
                        A growing library of expertly designed UI blocks ready for your next project.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px] md:auto-rows-[340px]">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className={`relative rounded-3xl overflow-hidden group border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-[#0c0c0c] shadow-xl ${category.colSpan}`}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {/* Collage Image Background placed inside the parent card */}
                            <div className="absolute inset-0 w-full h-full p-2 md:p-3 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                                <div className="relative w-full h-full overflow-hidden rounded-[18px] ring-1 ring-black/5 dark:ring-white/10 group-hover:blur-[2px] transition-all duration-500 bg-white dark:bg-[#111]">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    {/* Permanent gradient overlay: dark at bottom, lighter at top */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 dark:from-black/90 to-transparent dark:to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* Dark/Light mode overlay mask for text readability on hover */}
                            <div className="absolute inset-0 bg-transparent group-hover:bg-white/80 dark:group-hover:bg-black/80 transition-colors duration-500 z-10" />

                            {/* Hover Reveal Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-black dark:text-white drop-shadow-sm mb-2">
                                    {category.name}
                                </h3>
                                <div className="h-0.5 w-12 bg-[var(--color-accent-red)] rounded-full" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
