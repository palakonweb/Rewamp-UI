import React, { useEffect, useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `soft aurora glowing waves, premium canvas fragment shader for deep fluid color transition`;

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;

  void main() {
    vec2 p = gl_FragCoord.xy / u_resolution.xy;
    p.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.15;
    
    // Smooth sweeping waves based on sin/cos combinations
    float wave1 = sin(p.x * 2.0 + t) * 0.5 + 0.5;
    float wave2 = sin(p.y * 3.0 - t * 1.5 + wave1) * 0.5 + 0.5;
    float wave3 = sin((p.x + p.y) * 2.0 + t + wave2 * 2.0) * 0.5 + 0.5;
    
    // Soft Aurora Palette (brand lilac tones, dark background)
    vec3 bg = vec3(0.01, 0.02, 0.04);
    vec3 auroraMain = vec3(0.894, 0.867, 0.941); // Lilac 400 #E4DDF0
    vec3 auroraSec = vec3(0.831, 0.796, 0.898); // Lilac 500 #D4CBE5 (primary brand)
    vec3 auroraAccent = vec3(0.612, 0.557, 0.722); // Lilac 700 #9C8EB8
    
    vec3 currentLayer = mix(auroraMain, auroraSec, wave1);
    currentLayer = mix(currentLayer, auroraAccent, wave2);
    
    // Mask out the aurora to just be glowing bands
    float mask = smoothstep(0.4, 0.6, wave3);
    mask *= sin(p.y * 3.14) * 1.2; // fade edges
    mask = clamp(mask, 0.0, 1.0);
    
    vec3 finalColor = mix(bg, currentLayer, mask * 0.4); // 0.4 opacity on glow
    
    // Add additive ambient light
    finalColor += auroraMain * smoothstep(0.7, 1.0, wave2) * 0.2;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function SoftAuroraShowcase() {
    const canvasRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const compileShader = (type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const vertices = new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, "u_time");
        const uResolutionLocation = gl.getUniformLocation(program, "u_resolution");

        const resize = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        let startTime = Date.now();
        let animationFrameId;

        const render = () => {
            gl.uniform1f(uTimeLocation, (Date.now() - startTime) / 1000);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#0a0a0a] shadow-2xl flex items-center justify-center p-8">
                
                {/* 🌌 MOTION BACKGROUND */}
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

                <BackgroundHeroOverlay />
            </div>

            {/* 📋 PROMPT CARD */}
</div>
    );
}
