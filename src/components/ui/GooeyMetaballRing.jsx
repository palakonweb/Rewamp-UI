import React, { useEffect, useRef, useState, useId } from 'react';
import { motion } from 'framer-motion';

/**
 * GooeyMetaballRing
 * Recreating Recording 2026-09-20 182252.mp4:
 * Organic liquid metaball droplets orbiting an elliptical ring path.
 * Droplets smoothly fuse into larger fluid masses, stretch organic bridge necks,
 * and snap apart as their differential orbital velocities cross.
 */
export function GooeyMetaballRing({
  color = '#000000',
  size = 360,
  speed = 1.0,
  className = '',
}) {
  const filterId = useId().replace(/:/g, '-');
  const svgRef = useRef(null);
  const circlesRef = useRef([]);
  const rafId = useRef(null);

  // 6 organic fluid metaballs matching the video's cluster and stretch rhythm
  const blobsData = useRef([
    { angle: 0.0, baseSpeed: 0.016, radius: 52, orbitR: 98, phase: 0.0 },
    { angle: 1.1, baseSpeed: 0.022, radius: 42, orbitR: 104, phase: 1.4 },
    { angle: 2.1, baseSpeed: 0.014, radius: 58, orbitR: 96, phase: 2.8 },
    { angle: 3.3, baseSpeed: 0.025, radius: 36, orbitR: 102, phase: 3.9 },
    { angle: 4.4, baseSpeed: 0.018, radius: 50, orbitR: 100, phase: 4.7 },
    { angle: 5.4, baseSpeed: 0.020, radius: 44, orbitR: 98, phase: 5.8 },
  ]);

  useEffect(() => {
    let t = 0;
    const center = size / 2;

    const tick = () => {
      t += 0.02 * speed;
      const blobs = blobsData.current;

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const el = circlesRef.current[i];
        if (!el) continue;

        // Differential harmonic speed: blobs catch up, fuse, stretch, and separate
        const speedWave = Math.sin(t * 1.4 + b.phase) * 0.55;
        b.angle += (b.baseSpeed + speedWave * 0.008) * speed;

        // Radial breathing and slight elliptical deformation
        const rOffset = Math.sin(t * 2.0 + b.phase) * 6;
        const currentOrbitR = b.orbitR + rOffset;

        // Slightly tilted ellipse for natural organic orbit
        const rawX = Math.cos(b.angle) * currentOrbitR;
        const rawY = Math.sin(b.angle) * (currentOrbitR * 0.88);

        // Tilt orbit by ~25 degrees
        const rot = 0.44;
        const cx = center + (rawX * Math.cos(rot) - rawY * Math.sin(rot));
        const cy = center + (rawX * Math.sin(rot) + rawY * Math.cos(rot));

        // Plump breathing radius
        const currentR = b.radius + Math.sin(t * 2.4 + b.phase) * 4;

        el.setAttribute('cx', cx.toFixed(2));
        el.setAttribute('cy', cy.toFixed(2));
        el.setAttribute('r', Math.max(16, currentR).toFixed(2));
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [size, speed]);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Thick Organic Gooey Metaball Filter */}
          <filter id={`gooey-${filterId}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -13"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>

        {/* Filtered Liquid Blob Orbit */}
        <g filter={`url(#gooey-${filterId})`} fill={color}>
          {blobsData.current.map((_, i) => (
            <circle
              key={i}
              ref={(el) => {
                circlesRef.current[i] = el;
              }}
              cx={size / 2}
              cy={size / 2}
              r={40}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default GooeyMetaballRing;
