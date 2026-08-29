"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const interactive = "a, button, [data-cursor], .glow-border, .cert-flip";
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement).closest(interactive);
      if (!el) return;
      setActive(true);
      const text = (el as HTMLElement).dataset.cursor || "";
      setLabel(text);
    };
    const onOut = (e: Event) => {
      const el = (e.target as HTMLElement).closest(interactive);
      if (!el) return;
      setActive(false);
      setLabel("");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      aria-hidden
    >
      <div
        className={`rounded-full bg-white transition-all duration-200 ${
          active ? "h-10 w-10 opacity-90" : "h-2.5 w-2.5 opacity-80"
        } flex items-center justify-center`}
      >
        {active && label && (
          <span
            ref={labelRef}
            className="text-[10px] font-semibold tracking-wide text-black"
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
