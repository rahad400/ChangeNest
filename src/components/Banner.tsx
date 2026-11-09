import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiMapPin, FiZap } from "react-icons/fi";
import banner from "@/app/assets/banner.jpg";

// Hero te dekha choto feature list.
const highlights = [
  { label: "Local events", icon: FiMapPin },
  { label: "Shared skills", icon: FiZap },
  { label: "Real impact", icon: FiHeart },
] as const;

const Banner = () => {
  return (
    // Main hero section. Ei section ta navbar er niche show hobe.
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-canvas"
    >
      {/* Slow move kora soft emerald background glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] animate-[drift_18s_ease-in-out_infinite] rounded-full bg-brand/15 blur-3xl motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[30rem] w-[30rem] animate-[drift_24s_ease-in-out_infinite_reverse] rounded-full bg-ink/5 blur-3xl motion-reduce:animate-none"
      />

      {/* Halka grid pattern. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 72%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8 lg:py-24">
        {/* Left side: text and buttons. */}
        <div className="max-w-2xl">
          <p className="rise-in inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-2 text-sm font-semibold text-ink shadow-sm shadow-ink/5 backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Together We Grow
          </p>

          <p className="rise-in mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/55 [animation-delay:90ms] sm:text-sm">
            ChangeNest — Social Development &amp; Community Events Platform
          </p>

          <h1
            id="hero-heading"
            className="rise-in mt-4 text-balance text-4xl font-bold tracking-tight text-ink [animation-delay:160ms] sm:text-5xl xl:text-6xl"
          >
            Be the <span className="text-brand">Change</span> You Want to See
          </h1>

          <p className="rise-in mt-6 max-w-xl text-base leading-7 text-ink/70 [animation-delay:230ms] sm:text-lg">
            ChangeNest is a social development events platform where people can
            discover social activities, participate in community events,
            organize events, and contribute to positive social change.
          </p>

          <p className="rise-in mt-3 max-w-xl text-base leading-7 text-ink/70 [animation-delay:300ms] sm:text-lg">
            We connect volunteers, event organizers, and communities.
          </p>

          {/* Main action buttons. */}
          <div className="rise-in mt-8 flex flex-col gap-3 [animation-delay:370ms] sm:flex-row">
            <Link
              href="/events"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
            >
              Explore Events
              <FiArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>

            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
            >
              Join Us
            </Link>
          </div>

          {/* Choto feature pills. */}
          <ul className="rise-in mt-8 flex flex-wrap gap-2 [animation-delay:440ms]">
            {highlights.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3.5 py-2 text-xs font-semibold text-ink/70 shadow-sm shadow-ink/5 backdrop-blur"
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: clean banner image with a gentle float animation. */}
        <div className="rise-in relative mx-auto w-full max-w-lg [animation-delay:260ms] lg:max-w-none">
          {/* Image er pichone soft emerald halo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-brand/10 blur-3xl"
          />

          <div className="relative animate-[float_7s_ease-in-out_infinite] motion-reduce:animate-none">
            {/* Image card. */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 p-2 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.45)] ring-1 ring-ink/5 backdrop-blur sm:p-2.5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white">
                {/* Logo er pichone halka emerald glow. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(22,163,74,0.14),transparent_62%)]"
                />

                <Image
                  src={banner}
                  alt="ChangeNest logo — a bird and upward arrow symbolising community growth"
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, (min-width: 640px) 32rem, 92vw"
                  className="object-cover mix-blend-multiply"
                />

                {/* Image er upore halka brand tint. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-brand/5 via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Floating community badge. */}
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink px-4 py-3 shadow-xl shadow-ink/30 sm:left-6">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-brand"
              />
              <p className="text-xs font-semibold text-white">
                Powered by people like you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
