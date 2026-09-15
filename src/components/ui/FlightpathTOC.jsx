import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane, ListTree } from 'lucide-react';

/**
 * FlightpathTOC
 * Purrform UI Navigation Tree with Supersonic Traveler:
 * Light-mode hierarchical tree showing real Purrform categories and components,
 * with a supersonic airplane indicator gliding along an organic curved SVG rail.
 * Clean light mode, zero extra text.
 */
export function FlightpathTOC({
  items = null,
  activeId = null,
  onSelect = null,
  autoTour = true,
  tourInterval = 2200,
  headerTitle = 'Purrform UI',
  className = '',
}) {
  // Real Purrform UI categories and components
  const defaultItems = useMemo(
    () => [
      { id: 'cards', label: 'Cards', level: 0 },
      { id: 'diagonal-card-stack', label: 'Diagonal Card Stack', level: 1 },
      { id: 'perspective-flip-deck', label: 'Perspective Flip Deck', level: 1 },
      { id: 'orbital-card-arch', label: 'Orbital Card Arch', level: 1 },
      { id: 'editorial-3d-orbit-carousel', label: 'Editorial 3D Orbit', level: 1 },
      { id: 'sidebars', label: 'Sidebars', level: 0 },
      { id: 'flightpath-toc', label: 'Flightpath TOC', level: 1 },
      { id: 'navbars', label: 'Navbars', level: 0 },
      { id: 'apple-navbar', label: 'Apple Navbar', level: 1 },
      { id: 'buttons', label: 'Buttons', level: 0 },
    ],
    []
  );

  const navItems = items || defaultItems;
  const [currentId, setCurrentId] = useState(activeId || 'perspective-flip-deck');
  const [isHovered, setIsHovered] = useState(false);

  // Sync with external activeId
  useEffect(() => {
    if (activeId) setCurrentId(activeId);
  }, [activeId]);

  // Auto-tour through Purrform components
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

  // Geometry parameters
  const itemHeight = 35;
  const startY = 20;
  const rootX = 22;
  const nestedX = 38;

  // Compute node coordinates
  const nodes = useMemo(() => {
    return navItems.map((item, index) => ({
      ...item,
      x: item.level === 0 ? rootX : nestedX,
      y: startY + index * itemHeight,
      index,
    }));
  }, [navItems, itemHeight, startY, rootX, nestedX]);

  // Build curved SVG rail path
  const railPath = useMemo(() => {
    if (nodes.length === 0) return '';
    let d = `M ${nodes[0].x} ${nodes[0].y}`;

    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];

      if (prev.x === curr.x) {
        d += ` L ${curr.x} ${curr.y}`;
      } else {
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
    }
    return d;
  }, [nodes]);

  const activeNode = nodes.find((n) => n.id === currentId) || nodes[0];

  const handleItemClick = (id) => {
    setCurrentId(id);
    onSelect?.(id);
  };

  const svgHeight = startY + nodes.length * itemHeight + 8;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-[270px] sm:w-[285px] rounded-2xl bg-[#FFFDF2] border border-[#E8E2D5] p-5 select-none shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.03)] overflow-hidden ${className}`}
    >
      {/* Header: Purrform UI */}
      <div className="flex items-center gap-2 pb-3 mb-1 border-b border-[#EAE4D8]">
        <ListTree className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-[11px] font-semibold font-mono tracking-widest uppercase text-neutral-400">
          {headerTitle}
        </span>
      </div>

      {/* Tree Track and Navigation Items */}
      <div className="relative" style={{ height: svgHeight }}>
        {/* Continuous SVG Rail Track */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 1 }}
        >
          {/* Background Rail Line */}
          <path
            d={railPath}
            fill="none"
            stroke="#DFD8CC"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Static Anchor Dots */}
          {nodes.map((node) => {
            const isActive = node.id === currentId;
            return (
              <circle
                key={`dot-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={isActive ? 0 : 2}
                fill={node.level === 0 ? '#9C968B' : '#B8B2A6'}
                className="transition-all duration-200"
              />
            );
          })}
        </svg>

        {/* Animated Supersonic Airplane Traveler Indicator */}
        <motion.div
          className="absolute z-20 pointer-events-none flex items-center justify-center"
          animate={{
            x: activeNode.x - 9,
            y: activeNode.y - 9,
          }}
          transition={{
            type: 'spring',
            stiffness: 360,
            damping: 26,
            mass: 0.75,
          }}
          style={{ width: 18, height: 18 }}
        >
          {/* Supersonic Jet pointing right */}
          <motion.div
            animate={{
              rotate: 90,
              scale: [1, 1.15, 1],
            }}
            transition={{
              scale: { duration: 0.3, ease: 'easeOut' },
            }}
            className="flex items-center justify-center text-neutral-900"
          >
            <Plane
              className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900 drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>

        {/* Interactive Text Labels - Pure Purrform components */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
          {nodes.map((node) => {
            const isActive = node.id === currentId;
            const textLeft = node.level === 0 ? 40 : 56;

            return (
              <div
                key={node.id}
                onClick={() => handleItemClick(node.id)}
                className="absolute flex items-center cursor-pointer pointer-events-auto group"
                style={{
                  top: node.y - 11,
                  left: textLeft,
                  height: 22,
                  right: 0,
                }}
              >
                <span
                  className={`text-[12.5px] tracking-tight whitespace-nowrap transition-colors duration-150 ${
                    isActive
                      ? 'font-bold text-neutral-950'
                      : node.level === 0
                      ? 'font-medium text-neutral-600 group-hover:text-neutral-900'
                      : 'font-normal text-neutral-400 group-hover:text-neutral-700'
                  }`}
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

export default FlightpathTOC;
