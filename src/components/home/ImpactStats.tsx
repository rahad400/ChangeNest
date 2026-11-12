import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { impactStats } from "./data";

const ImpactStats = () => {
  return (
    <section
      aria-labelledby="impact-heading"
      className="relative isolate overflow-hidden border-y border-ink/10 bg-surface py-16 text-ink transition-colors duration-200 dark:border-transparent dark:bg-navy dark:text-white sm:py-20 lg:py-24"
    >
      {/* Emerald glow and light grid adapting to light and dark themes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-brand/10 blur-3xl dark:bg-brand/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-ink) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-ink) 5%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-brand"
              />
              Our impact in numbers
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-canvas px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/50 dark:border-white/10 dark:bg-white/5 dark:text-white/40">
              Demo figures
            </span>
          </div>

          <h2
            id="impact-heading"
            className="mt-5 text-balance text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
          >
            Good hours add up to{" "}
            <span className="font-serif font-normal italic text-brand">
              real change.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-ink/65 dark:text-white/60 sm:text-base">
            Behind every number is a weekend given away, a neighbour helped, and
            a community that trusts its own people a little more.
          </p>

          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-ink/10 bg-canvas/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="text-xs leading-5 text-ink/60 dark:text-white/45">
              These are demonstration figures for the homepage preview. Live
              platform numbers will replace them once event data is connected.
            </p>
          </div>

          <Link
            href="/about-us"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:hover:text-white"
          >
            How we think about impact
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:gap-4">
          {impactStats.map(({ value, suffix, label, detail, icon: Icon }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-[1.5rem] border border-ink/10 bg-canvas/80 p-5 backdrop-blur transition-colors hover:border-brand/30 hover:bg-surface dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-brand/30 dark:hover:bg-white/[0.07] sm:p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/10 blur-2xl transition-opacity group-hover:opacity-80"
              />

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>

              <dd className="mt-5 text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl">
                {value}
                {suffix ? <span className="text-brand">{suffix}</span> : null}
              </dd>
              <dt className="mt-1 text-sm font-semibold text-ink/80 dark:text-white/85">
                {label}
              </dt>
              <p className="mt-2 hidden text-xs leading-5 text-ink/50 dark:text-white/45 sm:block">
                {detail}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default ImpactStats;
