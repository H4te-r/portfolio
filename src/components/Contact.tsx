"use client";

import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import SectionWrapper from "./SectionWrapper";
import Reveal, { SectionIcon } from "./Reveal";
import { Magnetic } from "./MotionEffects";

const SERVICE_ID = "service_ktw5ahe";
const TEMPLATE_ID = "template_wxor8br";
const PUBLIC_KEY = "lye4QUavJ5Jsd6WoJ";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact" className="section-alt">
      <SectionIcon />
      <Reveal type="up">
        <h2 className="mb-4 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
          Let&apos;s Connect
        </h2>
        <p className="mx-auto mb-12 max-w-md text-center text-muted">
          Have a project idea, an internship opportunity, or just want to say hi?
          Drop me a message.
        </p>
      </Reveal>

      <Reveal type="up" delay={0.08}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="theme-surface glow-border mx-auto flex max-w-lg flex-col gap-5 rounded-2xl border border-border p-6"
        >
          <input
            type="text"
            name="from_name"
            required
            placeholder="Your Name"
            className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
          />
          <input
            type="email"
            name="from_email"
            required
            placeholder="Your Email"
            className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your Message"
            className="resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
          />

          <Magnetic className="w-full">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-accent py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-[var(--accent-glow)] disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </Magnetic>

          {status === "sent" && (
            <p className="text-center text-sm text-emerald-500">
              Message sent — I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-500">
              Something went wrong. Please try again or reach out directly.
            </p>
          )}
        </form>
      </Reveal>
    </SectionWrapper>
  );
}
