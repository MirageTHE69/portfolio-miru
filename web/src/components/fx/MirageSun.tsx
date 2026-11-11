"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

/** Values the hero animates: `intro` 0→1 raises the sun, `scroll` 0→1 sinks it. */
export type SunState = { intro: number; scroll: number };

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Draws the logo's sun (dome, stripes, diagonal slash) and bends it with
// drifting noise so it shimmers like heat haze. The pointer stirs the haze.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uIntro;
uniform float uScroll;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
float band(float y, float a, float b, float aa){
  return smoothstep(a - aa, a + aa, y) * smoothstep(b + aa, b - aa, y);
}

void main(){
  vec2 c = uCenter;
  c.y -= (1.0 - uIntro) * uRadius * 1.15;   // rises during the intro
  c.y -= uScroll * uRadius * 1.9;           // sinks as the page scrolls
  vec2 q = (gl_FragCoord.xy - c) / uRadius;
  vec2 m = (uMouse - c) / uRadius;
  float aa = 1.5 / uRadius;

  // Heat haze: stronger below the horizon, near the pointer, and while sinking.
  float n1 = fbm(vec2(q.x * 2.6, q.y * 5.0 - uTime * 0.55));
  float n2 = fbm(vec2(q.x * 7.0 + 4.0, q.y * 12.0 - uTime * 1.05));
  float below = smoothstep(0.35, -1.1, q.y);
  float near = exp(-dot(q - m, q - m) * 1.6);
  float amp = 0.008 + 0.026 * below + 0.070 * near + 0.08 * uScroll;
  vec2 w = q;
  w.x += (n1 - 0.5) * amp * 2.2 + (n2 - 0.5) * amp * 0.7;
  w.y += (n2 - 0.5) * amp * 0.6;

  float d = length(w);
  float shape = 0.0;
  if (w.y > 0.0) {
    shape = smoothstep(1.0 + aa, 1.0 - aa, d) * smoothstep(0.0, aa, w.y);
  } else {
    float y = -w.y;
    float ax = abs(w.x);
    shape  = band(y, 0.125, 0.275, aa)  * smoothstep(0.98 + aa, 0.98 - aa, ax);
    shape += band(y, 0.375, 0.500, aa)  * smoothstep(0.90 + aa, 0.90 - aa, ax);
    shape += band(y, 0.600, 0.700, aa)  * smoothstep(0.76 + aa, 0.76 - aa, ax);
    shape += band(y, 0.800, 0.875, aa)  * smoothstep(0.5475 + aa, 0.5475 - aa, ax);
    shape += band(y, 0.9625, 1.0125, aa) * smoothstep(0.225 + aa, 0.225 - aa, ax);
  }
  // The diagonal slash from the logo.
  shape *= smoothstep(0.125 - aa, 0.125 + aa, abs(w.x - w.y * 0.2708));

  float glow = exp(-max(length(q) - 0.85, 0.0) * 1.9) * 0.34 + near * 0.05;
  vec3 hot = mix(vec3(1.0, 0.353, 0.122), vec3(1.0, 0.56, 0.30), clamp(w.y * 0.9 + n1 * 0.25, 0.0, 1.0));
  float fade = uIntro * (1.0 - smoothstep(0.35, 1.0, uScroll));
  float a = clamp(shape + glow * (1.0 - shape), 0.0, 1.0) * fade;
  vec3 col = mix(vec3(1.0, 0.353, 0.122), hot, shape);
  gl_FragColor = vec4(col * a, a);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export function MirageSun({ state }: { state: RefObject<SunState> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = reduced ? null : canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl && vs && fs ? gl.createProgram() : null;

    if (!gl || !vs || !fs || !program) {
      // No WebGL, or the visitor prefers reduced motion: show the plain logo mark.
      const id = requestAnimationFrame(() => setFallback(true));
      return () => cancelAnimationFrame(id);
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uRes = uniform("uRes");
    const uTime = uniform("uTime");
    const uMouse = uniform("uMouse");
    const uCenter = uniform("uCenter");
    const uRadius = uniform("uRadius");
    const uIntro = uniform("uIntro");
    const uScroll = uniform("uScroll");

    let dpr = 1;
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);

      // Right of the headline on desktop; above it on phones.
      const desktop = rect.width >= 1024;
      const cx = (desktop ? 0.75 : 0.7) * width;
      const cy = (desktop ? 0.54 : 0.82) * height;
      const radius = desktop ? Math.min(width * 0.165, height * 0.3) : width * 0.2;
      gl.uniform2f(uRes, width, height);
      gl.uniform2f(uCenter, cx, cy);
      gl.uniform1f(uRadius, radius);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) * dpr;
      mouse.ty = (rect.bottom - e.clientY) * dpr;
    };

    let frame = 0;
    let visible = true;
    const start = performance.now();

    const draw = (now: number) => {
      frame = 0;
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIntro, state.current?.intro ?? 1);
      gl.uniform1f(uScroll, state.current?.scroll ?? 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(draw);
    };

    // Only render while the hero is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [state]);

  if (fallback) {
    return (
      <Image
        src="/brand/mark.svg"
        alt=""
        width={88}
        height={88}
        unoptimized
        className="pointer-events-none absolute right-[8%] top-[12%] h-auto w-[40vw] max-w-[420px] opacity-90 lg:top-1/2 lg:w-[30vw] lg:-translate-y-1/2"
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
