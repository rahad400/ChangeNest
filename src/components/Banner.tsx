import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";
import logo from "@/app/assets/logo.jpg";
import heroImage from "@/app/assets/home/hero.jpg";
import { categories, testimonials } from "./home/data";
import {
  arrowStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "./home/ui";

const Banner = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-canvas"
    >
      {/* Soft emerald glow and depth rings for a captivating ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-44 -z-10 h-[38rem] w-[38rem] animate-[drift_20s_ease-in-out_infinite] rounded-full bg-brand/15 blur-3xl motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-44 -z-10 h-[34rem] w-[34rem] animate-[drift_26s_ease-in-out_infinite_reverse] rounded-full bg-teal-400/12 blur-3xl motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-ink) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-ink) 4%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 76%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-20 xl:gap-20">
        {/* Left: message, actions, logo badge, and quick causes */}
        <div className="min-w-0 max-w-2xl">
          {/* Official logo pill badge */}
          <div className="rise-in inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-surface/90 py-1.5 pl-1.5 pr-4 shadow-sm shadow-brand/10 backdrop-blur">
            <Image
              src={logo}
              alt="ChangeNest official emblem"
              width={28}
              height={28}
              priority
              className="h-7 w-7 rounded-full object-cover ring-2 ring-brand/30"
            />
            <span className="flex items-center gap-2 text-xs font-semibold text-ink">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Together We Grow · ChangeNest
            </span>
          </div>

          <h1
            id="hero-heading"
            className="rise-in mt-6 text-balance text-[2.85rem] font-bold leading-[0.98] tracking-[-0.05em] text-ink [animation-delay:80ms] sm:text-6xl xl:text-[4.6rem]"
          >
            Be the{" "}
            <span className="relative inline-block font-serif font-normal italic tracking-[-0.02em] text-brand">
              change
              <svg
                aria-hidden="true"
                viewBox="0 0 220 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-brand/35 sm:-bottom-2 sm:h-3"
              >
                <path
                  d="M3 10C48 4 104 2 217 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            <br />
            you want to see.
          </h1>

          <p className="rise-in mt-6 max-w-xl text-base leading-7 text-ink/70 [animation-delay:160ms] sm:text-lg sm:leading-8">
            ChangeNest brings caring people and local causes together. Find a
            cleanup, a health camp, a reading circle — or create something only your
            neighbourhood could dream up.
          </p>

          <div className="rise-in mt-8 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Link href="/upcoming-event" className={primaryButtonStyles}>
              Explore events
              <ArrowRight aria-hidden="true" className={arrowStyles} />
            </Link>
            <Link href="/sign-up" className={secondaryButtonStyles}>
              Become a volunteer
              <UsersRound aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          {/* Quick popular cause tags */}
          <div className="rise-in mt-6 flex flex-wrap items-center gap-2 [animation-delay:300ms]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/40">
              Popular causes:
            </span>
            {[
              "Environmental Cleanup",
              "Healthcare Camps",
              "Youth Education",
              "Animal Care",
            ].map((cause) => (
              <Link
                key={cause}
                href="/upcoming-event"
                className="inline-flex items-center rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-medium text-ink/75 transition-all hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
              >
                {cause}
              </Link>
            ))}
          </div>

          <div className="rise-in mt-8 flex flex-col gap-3 [animation-delay:360ms]">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {testimonials.map(({ name, image }) => (
                  <Image
                    key={name}
                    src={image}
                    alt=""
                    width={40}
                    height={40}
                    aria-hidden="true"
                    className="h-9 w-9 rounded-full border-2 border-canvas object-cover"
                  />
                ))}
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-canvas bg-navy text-brand">
                  <UsersRound aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
              <p className="text-sm leading-6 text-ink/65">
                <span className="font-semibold text-ink">
                  A growing community
                </span>{" "}
                of 12,000+ people who show up for each other.
              </p>
            </div>

            <p className="inline-flex items-center gap-2 text-xs font-medium text-ink/50">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-brand" />
              100% Free to join · No experience needed
            </p>
          </div>
        </div>

        {/* Right: community visual showcase with ChangeNest logo integration */}
        <div className="rise-in relative mx-auto min-w-0 w-full max-w-[33rem] [animation-delay:220ms] lg:max-w-none">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-brand/12 blur-3xl"
          />

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/30 bg-navy shadow-[0_40px_120px_-55px_rgba(15,23,42,0.65)]">
              <Image
                src={heroImage}
                alt="Volunteers coming together at a ChangeNest community initiative."
                fill
                priority
                sizes="(min-width: 1024px) 44vw, (min-width: 640px) 80vw, 92vw"
                className="object-cover"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent"
              />

              {/* Logo pill badge on image */}
              <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-navy/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md sm:left-6 sm:top-6">
                <Image
                  src={logo}
                  alt="ChangeNest Logo"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-cover ring-1 ring-brand/50"
                />
                <span>ChangeNest Community</span>
              </div>

              <div className="absolute inset-x-5 bottom-6 sm:inset-x-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">
                  Made by neighbours
                </p>
                <h2 className="mt-2 max-w-sm text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
                  Small hours. Real change.
                </h2>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                    Across your city
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                    Every week
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <UsersRound aria-hidden="true" className="h-3.5 w-3.5" />
                    Everyone welcome
                  </span>
                </p>
              </div>
            </div>

            {/* Floating event card with quick redirect */}
            <Link
              href="/upcoming-event"
              className="group absolute -bottom-16 left-4 hidden w-[19rem] items-center gap-3 rounded-2xl border border-ink/10 bg-surface p-3 pr-4 shadow-2xl shadow-navy/20 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:left-6 sm:flex motion-reduce:transform-none"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand text-navy shadow-md shadow-brand/20">
                <CalendarDays aria-hidden="true" className="h-6 w-6" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-brand">
                  <Sparkles aria-hidden="true" className="h-3 w-3" />
                  Find your next event
                </span>
                <span className="mt-1 block truncate text-sm font-semibold text-ink">
                  Browse upcoming events
                </span>
                <span className="mt-0.5 block text-[11px] text-ink/50">
                  Filter by cause, city, and date →
                </span>
              </span>

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ink/35 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>

            {/* Floating ChangeNest logo badge on top right */}
            <div className="absolute -right-4 top-16 z-20 hidden items-center gap-3 rounded-2xl border border-ink/10 bg-surface/95 p-3 shadow-xl shadow-navy/15 backdrop-blur-md md:flex">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 p-1">
                <Image
                  src={logo}
                  alt="ChangeNest Official"
                  width={36}
                  height={36}
                  className="h-8 w-8 rounded-lg object-contain"
                />
              </div>
              <div>
                <span className="block text-xs font-bold leading-none text-ink">
                  ChangeNest Hub
                </span>
                <span className="mt-1 block text-[10px] font-semibold text-brand">
                  {categories.length} Causes · Community Led
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
