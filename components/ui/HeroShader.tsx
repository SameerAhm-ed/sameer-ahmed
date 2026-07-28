"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A slow, flowing cobalt "aurora" behind the hero, rendered as a single
 * fullscreen WebGL quad with an fbm-noise fragment shader. GPU-cheap.
 * Only mounts on fine-pointer desktops with motion enabled; otherwise the
 * CSS fallback in Hero shows instead.
 */
const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec3 u_base;
uniform vec3 u_accent;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
// 3 octaves, not 5. The last two contribute detail that the blur and the 0.6
// alpha throw away anyway, and they cost two full noise() calls per pixel.
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * 3.0;
  float t = u_time * 0.06;
  float n = fbm(p + vec2(t, -t * 0.5) + fbm(p + t));
  vec3 bone = u_base;
  vec3 cobalt = u_accent;
  vec3 col = mix(bone, cobalt, smoothstep(0.35, 0.9, n));
  float fade = smoothstep(0.05, 0.75, uv.x);      // keep left (text) calm
  float alpha = fade * 0.6 * smoothstep(0.2, 0.95, n);

  // Cursor-reactive glow: the aurora gathers toward the pointer.
  float aspect = u_res.x / u_res.y;
  vec2 d = (uv - u_mouse) * vec2(aspect, 1.0);
  float glow = smoothstep(0.5, 0.0, length(d));
  col = mix(col, cobalt, glow * 0.7);
  alpha = clamp(alpha + glow * 0.4, 0.0, 0.95);

  gl_FragColor = vec4(col, alpha);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export default function HeroShader() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Only run on fine-pointer desktops with motion enabled.
  useEffect(() => {
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const cv = canvas.current;
    if (!cv) return;
    const gl = cv.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uBase = gl.getUniformLocation(prog, "u_base");
    const uAccent = gl.getUniformLocation(prog, "u_accent");
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Pull the surface + accent straight from the CSS tokens so the aurora
    // follows the theme instead of baking in the light palette.
    const rgb = (v: string): [number, number, number] => {
      const h = v.trim().replace("#", "");
      const n = parseInt(
        h.length === 3
          ? h
              .split("")
              .map((c) => c + c)
              .join("")
          : h,
        16
      );
      return [
        ((n >> 16) & 255) / 255,
        ((n >> 8) & 255) / 255,
        (n & 255) / 255,
      ];
    };
    const syncTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      gl.uniform3fv(uBase, rgb(cs.getPropertyValue("--bone")));
      gl.uniform3fv(uAccent, rgb(cs.getPropertyValue("--cobalt")));
    };
    syncTheme();
    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Smoothed pointer (normalized, y-flipped to match gl_FragCoord).
    let tx = 0.72;
    let ty = 0.62;
    let mx = tx;
    let my = ty;
    const onMouse = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse);

    // Capped at 1: this is an out-of-focus gradient, so rendering it at retina
    // density buys nothing visible and roughly doubles the fragment cost.
    const dpr = Math.min(window.devicePixelRatio || 1, 1);
    const resize = () => {
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uRes, cv.width, cv.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    // pause when tab hidden to save battery
    const onVis = () => {
      // Always cancel first — otherwise a repeated "visible" event stacks a
      // second rAF loop on top of the running one.
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
      themeObserver.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={canvas} aria-hidden className="h-full w-full" />;
}
