import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TextHoverEffect({ text, duration }) {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // Auto-animate: sweep the reveal mask across the text
  useEffect(() => {
    let frame;
    let start = null;
    const cycleDuration = 4000; // ms for one full sweep

    function animate(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) % cycleDuration;
      const progress = elapsed / cycleDuration;

      // Sweep left to right, then right to left
      const cx = progress < 0.5
        ? (progress * 2) * 100       // 0% → 100%
        : (1 - (progress - 0.5) * 2) * 100; // 100% → 0%

      if (!hovered) {
        setMaskPosition({ cx: `${cx}%`, cy: "50%" });
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);

  // Mouse tracking override
  useEffect(() => {
    if (svgRef.current && hovered && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor, hovered]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 900 200"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          <stop offset="0%" stopColor="#D2042D" />
          <stop offset="25%" stopColor="#ff1e46" />
          <stop offset="50%" stopColor="#8B0000" />
          <stop offset="75%" stopColor="#D2042D" />
          <stop offset="100%" stopColor="#ff1e46" />
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="25%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0.15, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      {/* Base stroke outline */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="fill-transparent font-display font-bold"
        style={{ stroke: 'rgba(0,0,0,0.06)', fontSize: '120px' }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      {/* Gradient reveal — auto-sweeps + responds to hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.5"
        mask="url(#textMask)"
        className="fill-transparent font-display font-bold"
        style={{ fontSize: '120px' }}
      >
        {text}
      </text>
    </svg>
  );
}
