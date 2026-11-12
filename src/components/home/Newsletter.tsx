"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Unmount er age pending timer clear koro.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!valid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Demo only: real submission e ei jaygay API call hobe.
    timeoutRef.current = setTimeout(() => {
      setStatus("success");
      setMessage(
        "This demo form doesn't send email yet — connect your provider to go live.",
      );
    }, 700);
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-canvas pb-16 sm:pb-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-brand px-6 py-10 text-navy shadow-2xl shadow-brand/20 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[26px] border-navy/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-navy/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-navy">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                The nest letter
              </p>

              <h2
                id="newsletter-heading"
                className="mt-4 max-w-xl text-balance text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.06]"
              >
                A little good news,{" "}
                <span className="font-serif font-normal italic">
                  once a month.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-navy/70 sm:text-base">
                New events, community stories, and simple ways to help — sent
                with care, never with noise.
              </p>

              <p className="mt-4 text-xs font-medium text-navy/65">
                No spam. Unsubscribe anytime.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-navy/10 bg-white/35 p-4 backdrop-blur-sm sm:p-5">
              {status === "success" ? (
                <div
                  aria-live="polite"
                  className="flex flex-col items-start gap-3 rounded-2xl bg-white/70 p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-navy">
                    <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">
                      You&apos;re on the list.
                    </p>
                    <p className="mt-1 text-xs leading-5 text-navy/60">
                      {message}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setEmail("");
                      setMessage("");
                    }}
                    className="text-xs font-semibold text-navy/70 underline decoration-navy/30 underline-offset-2 transition hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <Mail
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40"
                      />
                      <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (status === "error") {
                            setStatus("idle");
                            setMessage("");
                          }
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-invalid={status === "error"}
                        aria-describedby={
                          status === "error" ? "newsletter-error" : undefined
                        }
                        className="h-12 w-full rounded-xl border border-navy/15 bg-white/80 pl-11 pr-4 text-sm text-navy outline-none transition placeholder:text-navy/35 focus:border-navy/40 focus:ring-2 focus:ring-navy/15"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white transition hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-brand disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin"
                          />
                          Joining…
                        </>
                      ) : (
                        <>
                          <Send aria-hidden="true" className="h-4 w-4" />
                          Subscribe
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-3 flex items-start justify-between gap-3">
                    <p
                      aria-live="polite"
                      className={`text-[11px] leading-5 ${
                        status === "error"
                          ? "font-medium text-red-900"
                          : "text-navy/60"
                      }`}
                      id={status === "error" ? "newsletter-error" : undefined}
                    >
                      {status === "error"
                        ? message
                        : "Demo form — no emails are sent until a provider is connected."}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
