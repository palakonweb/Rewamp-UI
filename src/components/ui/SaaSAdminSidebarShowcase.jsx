import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Search, BarChart3, Users, Zap, Layout, ChevronDown, Bell, Settings } from 'lucide-react';

const promptContent = `Vercel-style deep dark Admin Sidebar. Features collapsible nested sub-menus, smooth Framer Motion layout sliding hover effects, and a highly polished agency aesthetic.`;

// Sidebar Item Component with Collapsible Submenu Support
function SidebarItem({ icon: Icon, label, badge, isExpanded, onToggle, isActive, onClick, subItems }) {
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
            if (hasSubItems) onToggle();
            else onClick();
        }}
        className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors z-10 ${
          isActive && !hasSubItems
            ? 'text-white bg-white/10'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive && !hasSubItems ? "text-indigo-400" : ""} />
          <span className="text-[13px] font-medium tracking-wide">{label}</span>
        </div>
        
        <div className="flex items-center gap-2">
            {badge && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/20">
                    {badge}
                </span>
            )}
            {hasSubItems && (
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} className="text-white/40" />
                </motion.div>
            )}
        </div>
      </button>

      {/* Nested Sub-items */}
      <AnimatePresence initial={false}>
        {hasSubItems && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pl-[30px] pr-2 py-1 mt-1 border-l border-white/10 ml-5">
                {subItems.map((sub, idx) => (
                    <button 
                        key={idx}
                        className="text-left px-3 py-2 rounded-lg text-[12px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        {sub.label}
                    </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SaaSAdminSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeId, setActiveId] = useState('analytics');
    const [expandedMenu, setExpandedMenu] = useState('customers');

    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-white/10 bg-[#000] shadow-xl flex">
                
                {/* 🎯 THE SAAS ADMIN SIDEBAR */}
                <aside className="w-[280px] h-full bg-[#0a0a0a] border-r border-white/10 flex flex-col z-10 shadow-[20px_0_40px_rgba(0,0,0,0.5)] py-6">
                    
                    {/* Header Workspace Selector */}
                    <div className="px-5 mb-8">
                        <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/10">
                                    <Zap size={16} className="text-white" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[13px] font-semibold text-white leading-tight tracking-wide">Acme Corp</span>
                                    <span className="text-[11px] text-white/40 leading-tight mt-0.5">Enterprise Plan</span>
                                </div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                        </button>
                    </div>

                    {/* Integrated Search */}
                    <div className="px-5 mb-8">
                        <div className="relative w-full flex items-center group">
                            <Search size={14} className="absolute left-3 text-white/40 group-focus-within:text-indigo-400 transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
                            />
                            <div className="absolute right-3 flex gap-1 pointer-events-none opacity-50 group-focus-within:opacity-0 transition-opacity">
                                <kbd className="text-[10px] font-mono font-medium text-white/60 bg-white/10 border border-white/10 px-1.5 py-0.5 rounded shadow-sm">⌘K</kbd>
                            </div>
                        </div>
                    </div>

                    {/* Nav Sections */}
                    <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-6 scrollbar-hide">
                        
                        {/* Section 1 */}
                        <div className="flex flex-col gap-1">
                            <span className="px-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">Overview</span>
                            
                            <SidebarItem 
                                icon={BarChart3} 
                                label="Analytics" 
                                isActive={activeId === 'analytics'}
                                onClick={() => setActiveId('analytics')}
                            />
                            
                            <SidebarItem 
                                icon={Users} 
                                label="Customers" 
                                badge="New"
                                isExpanded={expandedMenu === 'customers'}
                                onToggle={() => setExpandedMenu(expandedMenu === 'customers' ? null : 'customers')}
                                subItems={[
                                    { label: "Directory" },
                                    { label: "Segments" },
                                    { label: "Churn Prediction" }
                                ]}
                            />
                        </div>

                        {/* Section 2 */}
                        <div className="flex flex-col gap-1">
                            <span className="px-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">System</span>
                            
                            <SidebarItem 
                                icon={Layout} 
                                label="Layouts" 
                                isActive={activeId === 'layouts'}
                                onClick={() => setActiveId('layouts')}
                            />
                            <SidebarItem 
                                icon={Settings} 
                                label="Settings" 
                                isActive={activeId === 'settings'}
                                onClick={() => setActiveId('settings')}
                            />
                        </div>
                    </div>

                    {/* Footer Profile */}
                    <div className="mt-auto px-4 pt-4">
                        <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 text-[12px] font-bold overflow-hidden">
                                    <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col items-start flex-1">
                                    <span className="text-[13px] font-medium text-white leading-tight">Sarah Chen</span>
                                </div>
                            </div>
                            <Bell size={14} className="text-white/40 hover:text-white transition-colors" />
                        </button>
                    </div>
                </aside>

                {/* Dummy Content */}
                <div className="flex-1 p-10 opacity-30 pointer-events-none">
                     <div className="w-48 h-8 bg-white/10 rounded-lg mb-8"></div>
                     <div className="w-full h-40 bg-white/5 rounded-2xl border border-white/10 mb-6"></div>
                     <div className="flex gap-6">
                         <div className="flex-1 h-32 bg-white/5 rounded-2xl border border-white/10"></div>
                         <div className="flex-1 h-32 bg-white/5 rounded-2xl border border-white/10"></div>
                     </div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-white/20 text-[11px] font-semibold tracking-widest uppercase z-20">Premium Admin Sidebar</span>
            </div>
</div>
    );
}
