"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";
import type { ProjectScreenshot } from "@/data/projects";

export default function ProjectScreenshots({
  title,
  screenshots,
}: {
  title: string;
  screenshots: ProjectScreenshot[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cover = screenshots[0];
  const extras = screenshots.slice(1);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") {
        setOpenIndex((i) =>
          i === null ? i : (i + 1) % screenshots.length
        );
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + screenshots.length) % screenshots.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, screenshots.length]);

  if (!cover) return null;

  const active = openIndex !== null ? screenshots[openIndex] : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        className="relative mb-4 block aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-background-card text-left"
        aria-label={`View ${title} screenshots`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </button>
      {extras.length > 0 && (
        <button
          type="button"
          onClick={() => setOpenIndex(1)}
          className="mb-4 text-xs text-muted transition-colors hover:text-accent"
        >
          View more screenshots
        </button>
      )}

      {active && openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="absolute -top-10 right-0 text-muted hover:text-foreground"
              aria-label="Close screenshots"
            >
              <HiX size={28} />
            </button>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-background">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {screenshots.length > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(
                      (openIndex - 1 + screenshots.length) % screenshots.length
                    )
                  }
                  className="flex items-center gap-1 text-sm text-muted hover:text-foreground"
                  aria-label="Previous screenshot"
                >
                  <HiChevronLeft size={20} />
                  Previous
                </button>
                <p className="text-xs text-muted">
                  {openIndex + 1} / {screenshots.length}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex((openIndex + 1) % screenshots.length)
                  }
                  className="flex items-center gap-1 text-sm text-muted hover:text-foreground"
                  aria-label="Next screenshot"
                >
                  Next
                  <HiChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
