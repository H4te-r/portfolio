"use client";

import { useEffect, useState } from "react";

const lines = [
  "Hi, I'm Jes.",
  "IT Student.",
  "Aspiring Security Analyst.",
];

export default function Typewriter() {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex];
    const atEnd = !deleting && text === current;
    const atStart = deleting && text === "";

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
        return;
      }
      const nextLen = text.length + (deleting ? -1 : 1);
      setText(current.slice(0, nextLen));
    }, delay);

    return () => window.clearTimeout(id);
  }, [text, deleting, lineIndex]);

  return (
    <span className="inline-block min-h-[1.15em]">
      {text}
      <span className="ml-0.5 inline-block w-[0.08em] animate-pulse bg-accent align-middle">
        &nbsp;
      </span>
    </span>
  );
}
