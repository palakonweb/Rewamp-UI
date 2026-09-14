import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface MarbledFluidOrbProps {
  className?: string;
  size?: number;
  speed?: number;
}

const vertexShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const fragmentShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec2 vUv;

// Classic 3D Simplex Noise
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

// 3D rotation around an arbitrary unit axis
mat3 rotateAxis(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat3(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c
  );
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorldPosition);

  // Time & smooth tumbling rotation
  float t = uTime * 0.35;
  vec3 axis = normalize(vec3(0.35, 1.0, 0.25));
  mat3 rot = rotateAxis(axis, t * 0.50);

  // Smooth rotated coordinates
  vec3 p = rot * vPosition;

  // Pure, buttery smooth harmonic waves (ZERO noise grain, ZERO sparkles)
  float h1 = sin(p.x * 1.1 + p.y * 0.9 + t * 0.45);
  float h2 = cos(p.y * 1.2 - p.z * 0.8 - t * 0.38);
  float h3 = sin(p.z * 1.0 + p.x * 0.7 + t * 0.30);

  // Broad sweeping marble fold
  float marbleFold = sin(p.y * 1.8 + h1 * 1.2 + h2 * 0.8 + t * 0.25);
  float marbleFold2 = cos(p.x * 1.6 - h3 * 1.1 + h1 * 0.6 - t * 0.20);
  float violetFold = sin(p.z * 1.5 + p.y * 0.8 - t * 0.35);

  // Colors sampled from reference video:
  // - Pure alabaster milk white (#FFFDF8)
  // - Warm pastel apricot peach (#FFAF88)
  // - Soft glowing coral rose (#FF4B6E)
  // - Vibrant candy ruby (#FF2654)
  // - Muted soft lilac violet (#B965D8)
  vec3 colMilk = vec3(0.99, 0.985, 0.98);
  vec3 colPeach = vec3(1.0, 0.70, 0.54);
  vec3 colPink = vec3(1.0, 0.36, 0.52);
  vec3 colCoral = vec3(1.0, 0.15, 0.33);
  vec3 colViolet = vec3(0.74, 0.28, 0.88);
  vec3 colLilac = vec3(0.92, 0.74, 0.96);

  // Buttery continuous gradient blending (wide smoothstep transitions)
  float blendPeach = smoothstep(-0.8, 0.4, marbleFold);
  float blendPink = smoothstep(-0.4, 0.6, marbleFold2);
  float blendCoral = smoothstep(0.1, 0.85, marbleFold * marbleFold2);
  float blendViolet = smoothstep(0.05, 0.75, violetFold);
  float blendLilac = smoothstep(-0.2, 0.6, h3);

  vec3 marbleColor = mix(colMilk, colPeach, blendPeach * 0.90);
  marbleColor = mix(marbleColor, colPink, blendPink * 0.85);
  marbleColor = mix(marbleColor, colCoral, blendCoral * 0.92);
  marbleColor = mix(marbleColor, colViolet, blendViolet * 0.75);
  marbleColor = mix(marbleColor, colLilac, blendLilac * 0.30);

  // Soft satin / matte lighting (diffuse wrap, zero specular sparkles)
  float NdotV = max(dot(N, V), 0.0);
  vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
  float diffuse = max((dot(N, lightDir) + 0.4) / 1.4, 0.0);
  vec3 finalColor = marbleColor * (0.88 + 0.12 * diffuse);

  // Soft milky rim falloff (smooth 3D depth)
  float softRim = pow(1.0 - NdotV, 2.8);
  finalColor = mix(finalColor, colMilk, softRim * 0.32);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function MarbledFluidOrb({
  className = '',
  size = 40,
  speed = 1.0,
}: MarbledFluidOrbProps) {
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

    const geometry = new THREE.SphereGeometry(1.22, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speed;

      material.uniforms.uTime.value = elapsedTime * 1.4;

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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [size, speed]);

  return (
    <div
      className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      style={{ width: size, height: size }}
    >
      <div ref={containerRef} className="w-full h-full flex items-center justify-center rounded-full overflow-hidden" />
    </div>
  );
}
