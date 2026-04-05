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
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

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
    <SectionWrapper id="contact">
      <h2 className="mb-12 text-center text-3xl font-bold text-white">
        Get in Touch
      </h2>

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
          className="rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
        />
        <input
          type="email"
          name="from_email"
          required
          placeholder="Your Email"
          className="rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Your Message"
          className="resize-none rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-indigo-500 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "sent" && (
          <p className="text-center text-sm text-green-400">
            Message sent! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-400">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </SectionWrapper>
  );
}
