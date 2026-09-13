export const wireframeRingOrbPrompt = `Create an AI reasoning indicator capsule featuring a 3D wireframe contour ring orb on the left and dynamic reasoning status text on the right:
- Visual Identity: Dark matte aesthetics matching modern AI models with a floating capsule (rounded-full, bg-[#1C1C21], border border-white/12, shadow-2xl).
- Left: A real-time 3D wireframe orb composed of concentric latitude contour rings slicing through a sphere, rotating smoothly at a 32-degree tilt with harmonic wave breathing along the rings.
- Right: Reasoning status text smoothly cycling with blur-fade transitions:
  "thinking..." -> "manifesting...." -> "cooking...." -> "hold.upp..." -> "let me cookkk............" -> "donebestiee..."
- Tech: React, Three.js (WebGL), and Framer Motion.`;

export const wireframeRingOrbCode = `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface WireframeRingOrbProps {
  className?: string;
  size?: number;
  speed?: number;
  ringCount?: number;
  color?: string;
}

export default function WireframeRingOrb({
  className = '',
  size = 46,
  speed = 1.0,
  ringCount = 9,
  color = '#FFFFFF',
}: WireframeRingOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0.004, y: 0.007 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    rootGroup.rotation.z = THREE.MathUtils.degToRad(32);
    rootGroup.rotation.x = THREE.MathUtils.degToRad(20);
    scene.add(rootGroup);

    const sphereRadius = 1.15;
    const rings: {
      line: THREE.LineLoop;
      baseZ: number;
      phase: number;
    }[] = [];

    const segments = 96;

    for (let i = 0; i < ringCount; i++) {
      const tNorm = ringCount > 1 ? (i / (ringCount - 1)) * 2 - 1 : 0;
      const z = tNorm * 0.82 * sphereRadius;
      const r = Math.sqrt(Math.max(0.08, sphereRadius * sphereRadius - z * z));

      const points: THREE.Vector3[] = [];
      for (let j = 0; j < segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const ringAlpha = THREE.MathUtils.lerp(0.95, 0.55, Math.abs(tNorm));

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: ringAlpha,
        linewidth: 1,
      });

      const line = new THREE.LineLoop(geometry, material);
      rootGroup.add(line);

      rings.push({ line, baseZ: z, phase: i * 0.55 });
    }

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speed;

      rings.forEach((ring) => {
        const wave = Math.sin(elapsedTime * 2.2 - ring.phase) * 0.045;
        const scaleFactor = 1 + wave;
        ring.line.scale.set(scaleFactor, scaleFactor, 1);
        ring.line.position.z = ring.baseZ + Math.cos(elapsedTime * 1.8 - ring.phase) * 0.035;

        const mat = ring.line.material as THREE.LineBasicMaterial;
        mat.opacity = 0.65 + Math.sin(elapsedTime * 2.0 + ring.phase) * 0.28;
      });

      if (!isDraggingRef.current) {
        rootGroup.rotation.y += rotationVelocityRef.current.y;
        rootGroup.rotation.x += rotationVelocityRef.current.x;
        rotationVelocityRef.current.y = THREE.MathUtils.lerp(rotationVelocityRef.current.y, 0.007, 0.04);
        rotationVelocityRef.current.x = THREE.MathUtils.lerp(rotationVelocityRef.current.x, 0.004, 0.04);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || size;
      const h = container.clientHeight || size;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevPointerRef.current.x;
      const dy = e.clientY - prevPointerRef.current.y;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };

      rootGroup.rotation.y += dx * 0.01;
      rootGroup.rotation.x += dy * 0.01;
      rotationVelocityRef.current = { x: dy * 0.003, y: dx * 0.003 };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      rings.forEach((r) => {
        r.line.geometry.dispose();
        (r.line.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [size, speed, ringCount, color]);

  return (
    <div className={\`relative flex items-center justify-center \${className}\`}>
      <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
    </div>
  );
}
`;
