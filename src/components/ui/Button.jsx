import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  magnetic = true,
  onClick,
  ...props 
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!magnetic) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // max 8px pull
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-3 rounded-full font-medium transition-colors duration-300 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";
  
  const variants = {
    primary: "bg-[var(--accent)] text-white hover:bg-red-800 shadow-[0_0_20px_var(--glow)]",
    ghost: "glass text-[var(--text)] hover:text-white"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
