export const marbledFluidOrbPrompt = `Create an iridescent marbled fluid silk orb AI thinking indicator in light mode:
- Visual Identity: A clean white floating AI thinking pill capsule (rounded-full, bg-white, border border-black/10, shadow-lg).
- Left: An interactive 3D WebGL sphere featuring a swirling iridescent silk fluid core (sampled from user reference video):
  - Translucent milky white glass sphere with dual specular glints and bright white Fresnel rim lighting.
  - Multi-frequency domain-warped 3D simplex noise creating smooth, folding silk ribbons.
  - Rich pastel-neon palette: glowing coral crimson (#FF2E55), vibrant rose pink (#FF7599), warm apricot peach (#FFB38F), and soft lilac violet (#BD5CF0).
  - Subsurface scattering simulating light passing through the translucent marble.
- Right: Shimmery reasoning text cycling with blur-fade transitions:
  "thinking..." -> "weaving thoughts..." -> "connecting sparks..." -> "almost there..." -> "crafting magic..." -> "all set for you"
- Tech Stack: React, Three.js (WebGL), GLSL Shaders, Framer Motion.`;

export const marbledFluidOrbCode = `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface MarbledFluidOrbProps {
  className?: string;
  size?: number;
  speed?: number;
}

const vertexShader = \`
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
\`;

const fragmentShader = \`
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec2 vUv;

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

  float t = uTime * 0.35;
  vec3 axis = normalize(vec3(0.35, 1.0, 0.25));
  mat3 rot = rotateAxis(axis, t * 0.50);

  vec3 p = rot * vPosition;

  vec3 q = vec3(
    snoise(p * 0.65 + vec3(0.0, t * 0.18, 0.0)),
    snoise(p * 0.65 + vec3(3.2, -t * 0.15, 1.4)),
    snoise(p * 0.65 + vec3(-2.1, 1.1, t * 0.12))
  );

  vec3 r = vec3(
    snoise(p * 0.75 + 1.1 * q + vec3(1.4, -t * 0.16, 0.6)),
    snoise(p * 0.75 + 1.1 * q + vec3(-2.5, t * 0.15, -1.2)),
    snoise(p * 0.75 + 1.1 * q + vec3(0.4, 1.8, -t * 0.14))
  );

  float wave1 = sin(p.y * 1.5 + p.x * 1.2 + r.x * 1.8 + t * 0.35);
  float wave2 = cos(p.x * 1.4 - p.z * 1.2 + r.y * 1.6 - t * 0.28);
  float wave3 = sin(p.z * 1.6 + p.y * 1.0 + r.z * 1.5 + t * 0.22);

  vec3 colMilk = vec3(0.99, 0.985, 0.98);
  vec3 colPeach = vec3(1.0, 0.69, 0.53);
  vec3 colPink = vec3(1.0, 0.35, 0.52);
  vec3 colCoral = vec3(1.0, 0.15, 0.33);
  vec3 colViolet = vec3(0.73, 0.25, 0.88);
  vec3 colLilac = vec3(0.92, 0.72, 0.96);

  float blendPeach = smoothstep(-0.65, 0.45, wave1);
  float blendPink = smoothstep(-0.45, 0.60, wave2);
  float blendCoral = smoothstep(0.15, 0.85, wave1 * wave2);
  float blendViolet = smoothstep(-0.15, 0.65, wave3 * 0.8 + q.y * 0.4);
  float blendLilac = smoothstep(0.20, 0.80, r.x * 0.5 + 0.5);

  vec3 marbleColor = mix(colMilk, colPeach, blendPeach * 0.88);
  marbleColor = mix(marbleColor, colPink, blendPink * 0.85);
  marbleColor = mix(marbleColor, colCoral, blendCoral * 0.92);
  marbleColor = mix(marbleColor, colViolet, blendViolet * 0.75);
  marbleColor = mix(marbleColor, colLilac, blendLilac * 0.35);

  float NdotV = max(dot(N, V), 0.0);
  vec3 lightDir = normalize(vec3(0.6, 0.8, 1.2));
  float diffuse = max((dot(N, lightDir) + 0.4) / 1.4, 0.0);
  vec3 finalColor = marbleColor * (0.86 + 0.14 * diffuse);

  float softRim = pow(1.0 - NdotV, 2.8);
  finalColor = mix(finalColor, colMilk, softRim * 0.35);

  gl_FragColor = vec4(finalColor, 1.0);
}
\`;

export default function MarbledFluidOrb({
  className = '',
  size = 40,
  speed = 1.0,
}: MarbledFluidOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1.22, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speed;
      material.uniforms.uTime.value = elapsedTime * 1.4;
      mesh.rotation.y += 0.0035;
      mesh.rotation.x += 0.0018;
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
  }, [size, speed]);

  return (
    <div
      className={\`relative flex items-center justify-center cursor-grab active:cursor-grabbing \${className}\`}
      style={{ width: size, height: size }}
    >
      <div ref={containerRef} className="w-full h-full flex items-center justify-center rounded-full overflow-hidden" />
    </div>
  );
}
`;
