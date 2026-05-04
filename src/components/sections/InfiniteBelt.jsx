import React from 'react';
import { motion } from 'framer-motion';

const BELT_ITEMS = [
  'Generate Buttons',
  'Build Navbars',
  'Create Dashboards',
  'Design Forms',
  'Ship Pricing Pages',
  'Craft Modals',
  'Compose Layouts',
  'Structure Interfaces',
];

function BeltItem({ name }) {
  return (
    <div className="liquid-metal mx-3 flex-shrink-0 group cursor-pointer hover:shadow-[0_0_24px_var(--glow)] transition-shadow duration-500">
      <div className="bg-white rounded-[5px] px-10 py-4 flex items-center justify-center">
        <span className="font-display text-sm tracking-[0.06em] text-[var(--text)] whitespace-nowrap group-hover:text-[var(--accent)] transition-colors duration-300">
          {name}
        </span>
      </div>
    </div>
  );
}

export function InfiniteBelt() {
  const beltItems = [...BELT_ITEMS, ...BELT_ITEMS];

  return (
    <section className="relative w-full py-24 overflow-hidden bg-transparent flex flex-col items-center justify-center">
      
      {/* Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-center px-6"
      >
        <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] tracking-[0.04em] text-white">
          A system of components
        </h2>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-14 text-center px-6"
      >
        <p className="text-gray-400 font-serif text-lg italic">
          In motion.
        </p>
      </motion.div>

      {/* Infinite scrolling belt */}
      <div className="relative w-full flex items-center">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#2E2E2E] to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex items-center w-max"
            animate={{ x: [0, -2400] }} 
            transition={{ 
              ease: "linear", 
              duration: 35, 
              repeat: Infinity 
            }}
          >
            {beltItems.map((name, idx) => (
              <BeltItem key={idx} name={name} />
            ))}
          </motion.div>
        </div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#2E2E2E] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
