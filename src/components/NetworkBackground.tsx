"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

type Node = { x: number; y: number };
type Edge = { a: number; b: number };

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let raf = 0;
    let pulse: { path: number[]; t: number; active: boolean } = {
      path: [],
      t: 0,
      active: false,
    };
    let nextPulse = performance.now() + 2500;

    const isMobile = () => window.innerWidth < 768;

    const rebuild = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isMobile() ? 18 : 42;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
      }));

      edges = [];
      const maxDist = isMobile() ? 140 : 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < maxDist) edges.push({ a: i, b: j });
        }
      }
    };

    const pickPath = () => {
      if (edges.length === 0) return [];
      const start = Math.floor(Math.random() * nodes.length);
      const path = [start];
      let current = start;
      for (let step = 0; step < 4; step++) {
        const neighbors = edges
          .filter((e) => e.a === current || e.b === current)
          .map((e) => (e.a === current ? e.b : e.a))
          .filter((n) => !path.includes(n));
        if (!neighbors.length) break;
        current = neighbors[Math.floor(Math.random() * neighbors.length)];
        path.push(current);
      }
      return path.length > 1 ? path : [];
    };

    const draw = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const styles = getComputedStyle(document.documentElement);
      const link = styles.getPropertyValue("--link").trim() || "rgba(56,189,248,0.18)";
      const nodeColor = styles.getPropertyValue("--node").trim() || "rgba(6,182,212,0.45)";
      const pulseColor = styles.getPropertyValue("--pulse").trim() || "#22d3ee";

      ctx.strokeStyle = link;
      ctx.lineWidth = 1;
      for (const e of edges) {
        ctx.beginPath();
        ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
        ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
        ctx.stroke();
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = nodeColor;
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!pulse.active && now >= nextPulse) {
        const path = pickPath();
        if (path.length) {
          pulse = { path, t: 0, active: true };
        }
        nextPulse = now + 2800 + Math.random() * 2200;
      }

      if (pulse.active) {
        pulse.t += 0.012;
        if (pulse.t >= 1) {
          pulse.active = false;
        } else {
          const segs = pulse.path.length - 1;
          const pos = pulse.t * segs;
          const i = Math.min(Math.floor(pos), segs - 1);
          const f = pos - i;
          const a = nodes[pulse.path[i]];
          const b = nodes[pulse.path[i + 1]];
          const x = a.x + (b.x - a.x) * f;
          const y = a.y + (b.y - a.y) * f;
          const alpha = Math.sin(pulse.t * Math.PI);

          ctx.beginPath();
          ctx.fillStyle = pulseColor;
          ctx.globalAlpha = 0.15 + alpha * 0.55;
          ctx.arc(x, y, 3.5 + alpha * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.strokeStyle = pulseColor;
          ctx.globalAlpha = 0.25 + alpha * 0.4;
          ctx.lineWidth = 1.5;
          for (let s = 0; s <= i; s++) {
            const p0 = nodes[pulse.path[s]];
            const p1 = nodes[pulse.path[s + 1]];
            if (s === 0) ctx.moveTo(p0.x, p0.y);
            if (s < i) ctx.lineTo(p1.x, p1.y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    rebuild();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", rebuild);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", rebuild);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
}
