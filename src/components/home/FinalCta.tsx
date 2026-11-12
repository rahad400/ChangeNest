import Link from "next/link";
import { ArrowRight, HeartHandshake, Plus, Sparkles } from "lucide-react";
import { finalCta } from "./data";
import {
  arrowStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "./ui";

const FinalCta = () => {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-canvas pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-navy px-6 py-14 text-center text-white shadow-2xl shadow-navy/15 sm:px-10 sm:py-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse at center, black, transparent 72%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full border-[22px] border-brand/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-16 h-48 w-48 rounded-full border-[18px] border-white/5"
          />

          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            Start where you are
          </p>

          <h2
            id="final-cta-heading"
            className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-bold tracking-[-0.04em] sm:text-4xl lg:text-5xl"
          >
            {finalCta.title.split(" ").map((word, index) =>
              word.toLowerCase() === "big" ? (
                <span
                  key={`${word}-${index}`}
                  className="font-serif font-normal italic text-brand"
                >
                  {word}{" "}
                </span>
              ) : (
                <span key={`${word}-${index}`}>{word} </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            {finalCta.description}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/events" className={primaryButtonStyles}>
              Explore events
              <ArrowRight aria-hidden="true" className={arrowStyles} />
            </Link>

            <Link
              href="/events/create"
              className={`${secondaryButtonStyles} border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10 hover:text-white`}
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              Create an event
            </Link>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-xs text-white/40 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-1.5">
              <HeartHandshake aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
              Free to join
            </span>
            <span
              aria-hidden="true"
              className="hidden h-1 w-1 rounded-full bg-white/20 sm:block"
            />
            <span>Free to host</span>
            <span
              aria-hidden="true"
              className="hidden h-1 w-1 rounded-full bg-white/20 sm:block"
            />
            <span>No experience needed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
