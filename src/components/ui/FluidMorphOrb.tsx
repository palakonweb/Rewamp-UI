import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface FluidMorphOrbProps {
  className?: string;
  size?: number;
  speed?: number;
  variant?: 'dots' | 'fluid';
}

// ── Particle Dotted Sphere Shaders (Matching the User Screenshot) ──
const particleVertexShader = `
uniform float uTime;
attribute float aSize;
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
  float n = snoise(norm * 1.6 + vec3(0.0, uTime * 0.4, 0.0)) * 0.05;
  vec3 displaced = position + norm * n;
  
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Point size scaled for 36-48px canvas (roughly 2.2 to 3.8px per dot)
  gl_PointSize = aSize * (13.5 / -mvPosition.z);
  
  // Depth shading: facing particles are bright white, rear particles are softer
  vAlpha = smoothstep(-1.1, 1.0, norm.z) * 0.72 + 0.28;
}
`;

const particleFragmentShader = `
varying float vAlpha;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;
  
  // Clean anti-aliased circular dot
  float alpha = smoothstep(0.5, 0.2, dist) * vAlpha;
  gl_FragColor = vec4(vec3(1.0), alpha);
}
`;

// ── Fluid Morph Shaders (Matching the Video) ──
const fluidVertexShader = `
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

uniform float uTime;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vDisplacement;

float getDisplacement(vec3 p, float t) {
  vec3 np = normalize(p);
  vec3 waveAxis = normalize(vec3(0.28, 0.94, 0.18));
  float h = dot(np, waveAxis);
  float ribbons = sin(h * 7.5 - t * 2.2) * 0.042;
  float n = snoise(np * 1.5 + vec3(0.0, t * 0.4, 0.0)) * 0.022;
  return ribbons + n;
}

void main() {
  float disp = getDisplacement(position, uTime);
  vDisplacement = disp;
  vec3 displacedPosition = position + normal * disp;
  
  vec3 v1 = abs(normal.y) < 0.92 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(normal, v1));
  vec3 bitangent = cross(normal, tangent);
  
  float eps = 0.012;
  vec3 pT = position + tangent * eps;
  vec3 pB = position + bitangent * eps;
  vec3 normT = normalize(pT);
  vec3 normB = normalize(pB);
  
  vec3 dispT = pT + normT * getDisplacement(pT, uTime);
  vec3 dispB = pB + normB * getDisplacement(pB, uTime);
  
  vec3 newNormal = normalize(cross(dispT - displacedPosition, dispB - displacedPosition));
  vNormal = normalize(normalMatrix * newNormal);
  
  vec4 worldPos = modelMatrix * vec4(displacedPosition, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const fluidFragmentShader = `
uniform vec3 uColorBase;
uniform vec3 uColorHighlight;
uniform vec3 uColorDeep;
uniform vec3 uColorFresnel;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vDisplacement;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorldPosition);
  
  vec3 lightDir1 = normalize(vec3(0.85, 1.25, 1.5));
  float wrap1 = 0.45;
  float NdotL1 = max((dot(N, lightDir1) + wrap1) / (1.0 + wrap1), 0.0);
  
  vec3 lightDir2 = normalize(vec3(-0.85, -0.5, 0.6));
  float wrap2 = 0.50;
  float NdotL2 = max((dot(N, lightDir2) + wrap2) / (1.0 + wrap2), 0.0) * 0.45;
  
  vec3 H = normalize(lightDir1 + V);
  float spec = pow(max(dot(N, H), 0.0), 9.0) * 0.22;
  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.5);
  
  float valley = smoothstep(-0.03, 0.03, vDisplacement);
  vec3 surfaceColor = mix(uColorDeep, uColorBase, valley);
  surfaceColor = mix(surfaceColor, uColorHighlight, smoothstep(0.01, 0.05, vDisplacement) * 0.85);
  
  vec3 diffuse = surfaceColor * (NdotL1 * 0.75 + NdotL2 + 0.52);
  vec3 rim = uColorFresnel * fresnel * 0.45;
  vec3 specular = vec3(0.88, 0.94, 1.0) * spec;
  
  gl_FragColor = vec4(diffuse + rim + specular, 1.0);
}
`;

export default function FluidMorphOrb({
  className = '',
  size = 40,
  speed = 1.0,
  variant = 'dots',
}: FluidMorphOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.0035 });
  const objectGroupRef = useRef<THREE.Group | null>(null);

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
    objectGroupRef.current = group;

    let cleanupGeometry: () => void = () => {};
    let updateUniforms: (t: number) => void = () => {};

    if (variant === 'dots') {
      // ── Particle Dot Cloud: 190 crisp dots with Fibonacci distribution matching user screenshot ──
      const count = 190;
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
      const radius = 1.15;

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;

        positions[i * 3] = Math.cos(theta) * radiusAtY * radius;
        positions[i * 3 + 1] = y * radius;
        positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;

        // Size: 0.85 to 1.35 factor
        sizes[i] = 0.85 + Math.random() * 0.5;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: {
          uTime: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      group.add(points);

      updateUniforms = (t: number) => {
        material.uniforms.uTime.value = t;
      };

      cleanupGeometry = () => {
        geometry.dispose();
        material.dispose();
      };
    } else {
      // ── Smooth Fluid Cobalt Mesh (From Video) ──
      const geometry = new THREE.IcosahedronGeometry(1.15, 64);
      const material = new THREE.ShaderMaterial({
        vertexShader: fluidVertexShader,
        fragmentShader: fluidFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColorBase: { value: new THREE.Color('#3864F6') },
          uColorHighlight: { value: new THREE.Color('#789EF9') },
          uColorDeep: { value: new THREE.Color('#2040C0') },
          uColorFresnel: { value: new THREE.Color('#9AB8FF') },
        },
      });

      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);

      updateUniforms = (t: number) => {
        material.uniforms.uTime.value = t;
      };

      cleanupGeometry = () => {
        geometry.dispose();
        material.dispose();
      };
    }

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speed;

      updateUniforms(elapsedTime * 1.4);

      if (!isDraggingRef.current && group) {
        group.rotation.y += rotationVelocityRef.current.y;
        group.rotation.x += rotationVelocityRef.current.x;
        rotationVelocityRef.current.y = THREE.MathUtils.lerp(rotationVelocityRef.current.y, 0.0035, 0.04);
        rotationVelocityRef.current.x = THREE.MathUtils.lerp(rotationVelocityRef.current.x, 0.0, 0.04);
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
      if (!isDraggingRef.current || !group) return;
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
      cleanupGeometry();
      renderer.dispose();
    };
  }, [size, speed, variant]);

  return (
    <div className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}>
      <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
    </div>
  );
}
