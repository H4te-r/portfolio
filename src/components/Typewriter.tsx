"use client";

import { useEffect, useRef, useState } from "react";

const lines = [
  "Hi, I'm Jess.",
  "IT Student.",
  "Still Debugging Life.",
];

export default function Typewriter() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const current = lines[lineIndex];
    const atEnd = !deleting && charIndex === current.length;
    const atStart = deleting && charIndex === 0;

    let delay = deleting ? 38 : 78;
    if (atEnd) delay = 1400;
    if (atStart) delay = 320;

    const id = window.setTimeout(() => {
      if (atEnd) {
        setDeleting(true);
        return;
      }
      if (atStart) {
        setDeleting(false);
        setLineIndex((i) => (i + 1) % lines.length);
        setCharIndex(0);
        return;
      }
      setCharIndex((c) => c + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(id);
  }, [charIndex, deleting, lineIndex]);

  const text = lines[lineIndex].slice(0, charIndex);

  return (
    <span className="inline-block min-h-[1.15em]">
      {text}
      <span className="ml-0.5 inline-block w-[0.08em] animate-pulse bg-accent align-middle">
        &nbsp;
      </span>
    </span>
  );
}
