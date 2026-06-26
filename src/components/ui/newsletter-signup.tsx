"use client";

/**
 * NewsletterSignup — split-layout newsletter capture.
 *
 * Two-column: left = headline + description, right = form with UnderlineInput.
 * On dark/ink background for dramatic contrast against light page sections.
 *
 * Usage:
 *   <NewsletterSignup />
 */

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { WordReveal } from "@/components/motion";

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Real submission wired in Phase 4 (Resend integration)
    setSubmitted(true);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      {/* Left — copy */}
      <div className="flex flex-col justify-center gap-6">
        <span className="label-caps text-[var(--gold)]">
          Letters from the Atelier
        </span>
        <h2 className="text-display-md leading-[1.05] font-medium tracking-[-0.02em] text-white">
          <WordReveal
            text="Stay close to the craft."
            immediate={false}
            stagger={0.08}
            amount={0.4}
          />
        </h2>
        <p className="text-body-lg max-w-[44ch] text-white/70">
          New arrivals, artisan stories, seasonal notes, and trade-only releases
          — delivered quietly, once a month. No noise.
        </p>
        <ul className="flex flex-col gap-3 pt-2">
          {[
            "Early access to new collections",
            "Behind-the-scenes from our atelier",
            "Trade-only pricing for designers",
          ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="text-body-sm flex items-center gap-3 text-white/80"
            >
              <Check
                className="h-4 w-4 text-[var(--gold)]"
                strokeWidth={1.5}
                aria-hidden
              />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-4 border border-white/10 bg-white/5 p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)]">
              <Check
                className="h-5 w-5 text-[var(--ink)]"
                strokeWidth={2}
                aria-hidden
              />
            </div>
            <h3 className="text-headline-md font-medium text-white">
              Welcome to the inner circle.
            </h3>
            <p className="text-body-md text-white/70">
              Check your inbox for a confirmation link. The next letter sends on
              the first of the month.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 border border-white/10 bg-white/5 p-10"
          >
            <div className="flex flex-col gap-2">
              <span className="label-caps text-white/60">Email Address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-0 border-b border-white/20 bg-transparent py-3 text-white transition-colors duration-300 outline-none placeholder:text-white/30 focus:border-[var(--gold)]"
                aria-label="Email address"
              />
            </div>
            <Button variant="gold" size="lg" type="submit">
              Subscribe
              <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </Button>
            <p className="text-body-sm text-white/40">
              By subscribing, you agree to receive one email per month.
              Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
