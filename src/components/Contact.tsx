"use client";

import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import SectionWrapper from "./SectionWrapper";

// ──────────────────────────────────────────────
// TODO: Replace these with your actual EmailJS IDs
// 1. Sign up at https://www.emailjs.com/
// 2. Create an Email Service (e.g. Gmail)
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Copy your Service ID, Template ID, and Public Key below
// ──────────────────────────────────────────────
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
      <h2 className="mb-4 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
        Let&apos;s Connect
      </h2>
      <p className="mx-auto mb-12 max-w-md text-center text-slate-400">
        Have a project idea, an internship opportunity, or just want to say hi?
        Drop me a message.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-lg flex-col gap-5"
      >
        <input
          type="text"
          name="from_name"
          required
          placeholder="Your Name"
          className="rounded-xl border border-slate-800 bg-[#0a0f1e] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-cyan-500"
        />
        <input
          type="email"
          name="from_email"
          required
          placeholder="Your Email"
          className="rounded-xl border border-slate-800 bg-[#0a0f1e] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-cyan-500"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Your Message"
          className="resize-none rounded-xl border border-slate-800 bg-[#0a0f1e] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-cyan-500"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-cyan-500 py-3.5 text-sm font-semibold text-[#0a0f1e] transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "sent" && (
          <p className="text-center text-sm text-emerald-400">
            Message sent — I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-400">
            Something went wrong. Please try again or reach out directly.
          </p>
        )}
      </form>
    </SectionWrapper>
  );
}
