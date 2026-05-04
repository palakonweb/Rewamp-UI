import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Download, RotateCw, Check } from 'lucide-react';

const TABS = ['React', 'Tailwind', 'HTML'];

const MOCK_CODE = {
  React: `import React from 'react';

export function PricingCard({ plan, price, features }) {
  return (
    <div className="glass-card p-8 max-w-sm">
      <h3 className="text-xl font-semibold mb-2">{plan}</h3>
      <p className="text-4xl font-bold mb-6">\${price}<span className="text-sm font-light">/mo</span></p>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check size={14} /> {f}
          </li>
        ))}
      </ul>
      <button className="w-full py-3 bg-black text-white rounded-lg">
        Get Started
      </button>
    </div>
  );
}`,
  Tailwind: `<div class="backdrop-blur-xl bg-white/60 border border-black/5 rounded-xl p-8 max-w-sm shadow-lg">
  <h3 class="text-xl font-semibold mb-2">Pro Plan</h3>
  <p class="text-4xl font-bold mb-6">$29<span class="text-sm font-light">/mo</span></p>
  <ul class="space-y-3 mb-8 text-sm">
    <li class="flex items-center gap-2">✓ Unlimited components</li>
    <li class="flex items-center gap-2">✓ Priority support</li>
    <li class="flex items-center gap-2">✓ Custom themes</li>
  </ul>
  <button class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
    Get Started
  </button>
</div>`,
  HTML: `<div style="backdrop-filter:blur(24px);background:rgba(255,255,255,0.6);border:1px solid rgba(0,0,0,0.05);border-radius:12px;padding:2rem;max-width:24rem;box-shadow:0 8px 32px rgba(0,0,0,0.04);">
  <h3 style="font-size:1.25rem;font-weight:600;margin-bottom:0.5rem;">Pro Plan</h3>
  <p style="font-size:2.25rem;font-weight:700;margin-bottom:1.5rem;">$29<span style="font-size:0.875rem;font-weight:300;">/mo</span></p>
  <ul style="list-style:none;padding:0;margin-bottom:2rem;">
    <li>✓ Unlimited components</li>
    <li>✓ Priority support</li>
    <li>✓ Custom themes</li>
  </ul>
  <button style="width:100%;padding:0.75rem;background:#000;color:#fff;border:none;border-radius:0.5rem;cursor:pointer;">Get Started</button>
</div>`,
};

const VARIATIONS = [
  'Minimal pricing card with glass effect',
  'Dark mode variant with accent glow',
  'Compact horizontal layout',
];

export function ComponentView() {
  const [activeTab, setActiveTab] = useState('React');
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState('A glassmorphic pricing card with plan name, price, features list, and CTA button');

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_CODE[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[70vh]">
          
          {/* LEFT PANEL — Prompt & Variations */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)] font-mono mb-3 block">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full glass rounded-xl p-4 text-sm text-[var(--text)] bg-white/40 border border-black/[0.06] outline-none resize-none font-light focus:bg-white/70 transition-all"
              />
              <button className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--text)] text-white text-sm font-medium hover:bg-[var(--accent)] transition-all duration-300">
                <RotateCw size={14} /> Regenerate
              </button>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)] font-mono mb-3 block">Variations</label>
              <div className="flex flex-col gap-2">
                {VARIATIONS.map((v, i) => (
                  <button
                    key={i}
                    className={`text-left text-sm p-3 rounded-xl border transition-all duration-300 font-light ${
                      i === 0
                        ? 'border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] text-[var(--text)]'
                        : 'border-black/[0.04] bg-white/30 text-[var(--text-2)] hover:bg-white/60'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER PANEL — Live Preview */}
          <div className="lg:col-span-5 flex flex-col">
            <label className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)] font-mono mb-3">Preview</label>
            <div className="flex-1 glass-card rounded-2xl p-8 flex items-center justify-center bg-[#f8f8f4]">
              {/* Mock rendered component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 max-w-sm w-full"
              >
                <h3 className="text-xl font-semibold mb-2 text-[var(--text)]">Pro Plan</h3>
                <p className="text-4xl font-bold mb-6 text-[var(--text)]">
                  $29<span className="text-sm font-light text-[var(--text-2)]">/mo</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {['Unlimited components', 'Priority support', 'Custom themes'].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-2)]">
                      <Check size={14} className="text-[var(--accent)]" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-[var(--text)] text-white rounded-lg text-sm font-medium hover:bg-[var(--accent)] transition-colors">
                  Get Started
                </button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT PANEL — Code */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)] font-mono">Code</label>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
                  {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
                  <Download size={12} /> Download
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-3 bg-black/[0.03] rounded-lg p-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-medium rounded-md transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-white text-[var(--text)] shadow-sm'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Code block */}
            <div className="flex-1 rounded-2xl bg-[#1B1717] p-6 overflow-auto">
              <pre className="text-sm font-mono text-[#EDEBDD] leading-relaxed whitespace-pre-wrap">
                <code>{MOCK_CODE[activeTab]}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
