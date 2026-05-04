import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-40 overflow-hidden flex items-center justify-center bg-[var(--bg)]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[120px] opacity-10"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display text-[var(--text)] mb-8 tracking-tight"
        >
          Ready to build faster?
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <button 
            onClick={() => navigate('/components')}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 bg-[var(--text)] rounded-full hover:bg-[var(--accent)] hover:shadow-[0_0_40px_var(--glow)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative flex items-center gap-2">
              Start Generating <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
