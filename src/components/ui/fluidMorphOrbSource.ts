export const fluidMorphOrbPrompt = `Create a sleek AI thinking indicator capsule with a 3D animated orb on the left and dynamic reasoning status text on the right:
- Layout: A compact floating dark matte pill capsule (rounded-full, bg-[#1E1E23], border border-white/12, shadow-2xl).
- Left: An interactive 3D animated orb (supports Particle Matrix dot cloud with Fibonacci distribution, or Cobalt Fluid morphing mesh).
- Right: Smooth cycling reasoning status text with blur-fade transitions:
  "pondering..." -> "manifesting vibes..." -> "brewing thoughts..." -> "hold up a sec..." -> "crafting magic..." -> "all set for you 💫"
- Tech: React, Three.js (WebGL), custom GLSL shaders, and Framer Motion.`;

export const fluidMorphOrbCode = `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface AIThinkingOrbProps {
  className?: string;
  size?: number;
  speed?: number;
  variant?: 'dots' | 'fluid';
}

const particleVertexShader = \`
uniform float uTime;
attribute float aSize;
attribute float aPhase;
varying float vAlpha;

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
  float n = snoise(norm * 1.8 + vec3(0.0, uTime * 0.45, 0.0)) * 0.065;
  vec3 displaced = position + norm * n;
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aSize * (68.0 / -mvPosition.z);
  vAlpha = smoothstep(-1.0, 1.0, norm.z) * 0.65 + 0.35;
}
\`;

const particleFragmentShader = \`
varying float vAlpha;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.5, 0.12, dist) * vAlpha;
  gl_FragColor = vec4(vec3(0.95, 0.97, 1.0), alpha);
}
\`;

export default function AIThinkingOrb({
  className = '',
  size = 44,
  speed = 1.0,
  variant = 'dots',
}: AIThinkingOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.003 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const count = 380;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const phi = Math.PI * (3 - Math.sqrt(5));
    const radius = 1.15;

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      positions[i * 3] = Math.cos(theta) * radiusAtY * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;
      sizes[i] = 1.8 + Math.random() * 1.6;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speed;
      material.uniforms.uTime.value = elapsedTime * 1.4;

      if (!isDraggingRef.current) {
        group.rotation.y += rotationVelocityRef.current.y;
        group.rotation.x += rotationVelocityRef.current.x;
        rotationVelocityRef.current.y = THREE.MathUtils.lerp(rotationVelocityRef.current.y, 0.003, 0.04);
        rotationVelocityRef.current.x = THREE.MathUtils.lerp(rotationVelocityRef.current.x, 0.0, 0.04);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [size, speed, variant]);

  return (
    <div className={\`relative flex items-center justify-center \${className}\`}>
      <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
    </div>
  );
}
`;
