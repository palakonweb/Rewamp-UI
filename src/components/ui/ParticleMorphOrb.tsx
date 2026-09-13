import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ParticleMorphOrbProps {
  className?: string;
  size?: number;
  speed?: number;
  pointCount?: number;
}

const vertexShader = `
uniform float uTime;
varying float vFresnel;
varying float vAlpha;

// 3D Simplex noise
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec3 norm = normalize(position);
  
  float t = uTime * 0.95;
  
  // Breathing modulation: pulses between gentle sphere and deep organic lobes
  float breath = 0.5 + 0.5 * sin(t * 0.7);
  
  // Spherical coordinates
  float angle = atan(norm.y, norm.x);
  float elevation = acos(clamp(norm.z, -1.0, 1.0));
  
  // 4-lobe harmonic wave matching the video's undulating petal folds
  float lobeWave = sin(4.0 * angle + t * 0.85) * sin(3.0 * elevation + t * 0.45) * 0.24;
  
  // Multi-frequency simplex noise for fluid ripples
  float noise1 = snoise(norm * 1.8 + vec3(0.0, t * 0.45, t * 0.25)) * 0.18;
  float noise2 = snoise(norm * 3.5 - vec3(t * 0.35, -t * 0.25, t * 0.15)) * 0.08;
  
  float disp = (lobeWave + noise1 + noise2) * (0.65 + 0.35 * breath);
  vec3 displaced = position + norm * disp;
  
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Pinpoint star dots - delicate and crisp
  gl_PointSize = 1.35;
  
  // Edge grazing accumulation for bright glowing rim folds
  vec3 viewDir = normalize(-mvPosition.xyz);
  vec3 worldNormal = normalize(normalMatrix * norm);
  float edge = 1.0 - abs(dot(worldNormal, viewDir));
  vFresnel = pow(edge, 2.2);
  
  // Depth-based transparency: front dots are clear, back dots are softer
  vAlpha = smoothstep(-1.2, 1.0, norm.z) * 0.5 + 0.5;
}
`;

const fragmentShader = `
varying float vFresnel;
varying float vAlpha;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;
  
  // Soft circular dot
  float shape = smoothstep(0.5, 0.1, dist);
  
  // Rim folds glow intensely white while interior dots are delicate translucent stars
  float brightness = 0.15 + vFresnel * 0.85;
  float alpha = shape * brightness * vAlpha * 0.75;
  
  gl_FragColor = vec4(vec3(0.96, 0.98, 1.0), alpha);
}
`;

export default function ParticleMorphOrb({
  className = '',
  size = 56,
  speed = 1.0,
  pointCount = 1800,
}: ParticleMorphOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0.002, y: 0.007 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    // Tilt to show the pole spiral angle seen in the video
    group.rotation.x = 0.52;
    group.rotation.z = -0.28;
    scene.add(group);

    // Concentric latitude rings matching video
    const baseGeom = new THREE.SphereGeometry(1.18, 54, 36);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', baseGeom.getAttribute('position'));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speed;

      material.uniforms.uTime.value = elapsedTime * 1.25;

      if (!isDraggingRef.current) {
        group.rotation.y += rotationVelocityRef.current.y;
        group.rotation.x += rotationVelocityRef.current.x;
        rotationVelocityRef.current.y = THREE.MathUtils.lerp(rotationVelocityRef.current.y, 0.005, 0.04);
        rotationVelocityRef.current.x = THREE.MathUtils.lerp(rotationVelocityRef.current.x, 0.0025, 0.04);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || size;
      const h = container.clientHeight || size;
      if (w === 0 || h === 0) return;
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

      group.rotation.y += dx * 0.01;
      group.rotation.x += dy * 0.01;
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
      geometry.dispose();
      baseGeom.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [size, speed, pointCount]);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
    >
      <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
    </div>
  );
}
