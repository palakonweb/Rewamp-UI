export const flightpathTOCPrompt = `Create an interactive "On This Page" / Table of Contents tree navigation component in light mode with an animated airplane traveler gliding along an organic curved SVG rail.

Requirements:
- Clean light mode aesthetic matching warm milk/cream/sand design tokens (#FFFDF2, #FAF6ED, #E8E2D5).
- Vertical hierarchical navigation tree supporting root items and indented sub-items (e.g. Installation -> Prerequisites, Installation Steps).
- Continuous curved SVG rail connecting each item node with smooth cubic bezier S-curves when branching into nested sub-items.
- An animated supersonic airplane indicator that physically glides along the curved rail from node to node with spring physics (stiffness: 360, damping: 26).
- The airplane points towards the active text label, which transitions to bold charcoal.
- Auto-tour mode that steps through sections sequentially, with pause on hover and click-to-fly interaction.
- Zero extraneous text or clutter.`;

export const flightpathTOCCode = `import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane, List } from 'lucide-react';

export function FlightpathTOC({
  items = null,
  activeId = null,
  onSelect = null,
  autoTour = true,
  tourInterval = 2200,
  className = '',
}) {
  const defaultItems = useMemo(
    () => [
      { id: 'installation', label: 'Installation', level: 0 },
      { id: 'prerequisites', label: 'Prerequisites', level: 1 },
      { id: 'installation-steps', label: 'Installation Steps', level: 1 },
      { id: 'configuration', label: 'Configuration', level: 0 },
      { id: 'usage', label: 'Usage', level: 0 },
      { id: 'customizing-content', label: 'Customizing Content', level: 1 },
      { id: 'submenu-content', label: 'Submenu Content', level: 1 },
      { id: 'features', label: 'Features', level: 0 },
    ],
    []
  );

  const navItems = items || defaultItems;
  const [currentId, setCurrentId] = useState(activeId || navItems[3].id);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (activeId) setCurrentId(activeId);
  }, [activeId]);

  useEffect(() => {
    if (!autoTour || isHovered) return;
    const timer = setInterval(() => {
      setCurrentId((prev) => {
        const idx = navItems.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % navItems.length;
        return navItems[nextIdx].id;
      });
    }, tourInterval);
    return () => clearInterval(timer);
  }, [autoTour, isHovered, navItems, tourInterval]);

  const itemHeight = 36;
  const startY = 22;
  const rootX = 22;
  const nestedX = 40;

  const nodes = useMemo(() => {
    return navItems.map((item, index) => ({
      ...item,
      x: item.level === 0 ? rootX : nestedX,
      y: startY + index * itemHeight,
      index,
    }));
  }, [navItems, itemHeight, startY, rootX, nestedX]);

  const railPath = useMemo(() => {
    if (nodes.length === 0) return '';
    let d = \`M \${nodes[0].x} \${nodes[0].y}\`;
    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];
      if (prev.x === curr.x) {
        d += \` L \${curr.x} \${curr.y}\`;
      } else {
        const midY = (prev.y + curr.y) / 2;
        d += \` C \${prev.x} \${midY}, \${curr.x} \${midY}, \${curr.x} \${curr.y}\`;
      }
    }
    return d;
  }, [nodes]);

  const activeNode = nodes.find((n) => n.id === currentId) || nodes[0];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={\`relative w-[280px] rounded-2xl bg-[#FFFDF2] border border-[#E8E2D5] p-5 select-none shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] overflow-hidden \${className}\`}
    >
      <div className="flex items-center gap-2 pb-3 mb-1 border-b border-[#EAE4D8]">
        <List className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-[11px] font-semibold font-mono tracking-widest uppercase text-neutral-400">
          On This Page
        </span>
      </div>

      <div className="relative" style={{ height: startY + nodes.length * itemHeight + 10 }}>
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
          <path
            d={railPath}
            fill="none"
            stroke="#DFD8CC"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {nodes.map((node) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.id === currentId ? 0 : 2}
              fill={node.level === 0 ? '#9C968B' : '#B8B2A6'}
            />
          ))}
        </svg>

        <motion.div
          className="absolute z-20 pointer-events-none flex items-center justify-center"
          animate={{ x: activeNode.x - 9, y: activeNode.y - 9 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.75 }}
          style={{ width: 18, height: 18 }}
        >
          <Plane className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900 rotate-90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)]" />
        </motion.div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
          {nodes.map((node) => {
            const isActive = node.id === currentId;
            return (
              <div
                key={node.id}
                onClick={() => {
                  setCurrentId(node.id);
                  onSelect?.(node.id);
                }}
                className="absolute flex items-center cursor-pointer pointer-events-auto"
                style={{
                  top: node.y - 11,
                  left: node.level === 0 ? 44 : 62,
                  height: 22,
                  right: 0,
                }}
              >
                <span
                  className={\`text-[13px] tracking-tight whitespace-nowrap transition-colors \${
                    isActive ? 'font-bold text-neutral-950' : 'font-normal text-neutral-500 hover:text-neutral-800'
                  }\`}
                >
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FlightpathTOC;`;
