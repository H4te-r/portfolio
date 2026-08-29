"use client";

import {
  useRef,
  useState,
  useCallback,
  type MouseEvent,
  type ReactNode,
  type CSSProperties,
} from "react";

export function Magnetic({
  children,
  className = "",
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: "translate3d(0,0,0)",
  });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setStyle({
      transform: `translate3d(${x * strength}px, ${y * strength}px, 0)`,
      transition: "transform 80ms linear",
    });
  };

  const onLeave = () => {
    setStyle({
      transform: "translate3d(0,0,0)",
      transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
    });
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
    >
      {children}
    </div>
  );
}

/* ── Shared glow-follow overlay ───────────────────────── */

function useGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = glowRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.opacity = "1";
    el.style.background = `radial-gradient(280px circle at ${x}px ${y}px, var(--accent-glow), transparent 70%)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = glowRef.current;
    if (!el) return;
    el.style.opacity = "0";
  }, []);

  return { glowRef, onMove, onLeave };
}

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
  });
  const { glowRef, onMove: glowMove, onLeave: glowLeave } = useGlow();

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 60ms linear",
    });
    glowMove(e);
  };

  const onLeave = (e: MouseEvent) => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
    });
    glowLeave();
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
    >
      {children}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300"
        aria-hidden
      />
    </div>
  );
}

export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { glowRef, onMove, onLeave } = useGlow();

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300"
        aria-hidden
      />
    </div>
  );
}
