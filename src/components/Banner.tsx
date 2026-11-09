import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiHeart,
  FiMapPin,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import logo from "@/app/assets/logo.jpg";

// Hero te dekha choto feature list.
const highlights = [
  { label: "Local events", icon: FiMapPin },
  { label: "Shared skills", icon: FiZap },
  { label: "Real impact", icon: FiHeart },
] as const;

// Community card er tag list.
const communityTags = [
  { label: "Volunteers", icon: FiUsers },
  { label: "Local events", icon: FiCalendar },
  { label: "Shared skills", icon: FiZap },
] as const;

const Banner = () => {
  return (
    // Main hero section. Ei section ta navbar er niche show hobe.
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-canvas"
    >
      {/* Soft emerald ar navy background glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(22, 163, 74, 0.16), transparent 32%), radial-gradient(circle at 10% 90%, rgba(15, 23, 42, 0.08), transparent 38%)",
        }}
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
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-2 text-sm font-semibold text-ink shadow-sm shadow-ink/5 backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Together We Grow
          </p>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/55 sm:text-sm">
            ChangeNest — Social Development &amp; Community Events Platform
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl xl:text-6xl"
          >
            Be the <span className="text-brand">Change</span> You Want to See
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-ink/70 sm:text-lg">
            ChangeNest is a social development events platform where people can
            discover social activities, participate in community events,
            organize events, and contribute to positive social change.
          </p>

          <p className="mt-3 max-w-xl text-base leading-7 text-ink/70 sm:text-lg">
            We connect volunteers, event organizers, and communities.
          </p>

          {/* Main action buttons. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
            >
              Explore Events
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>

            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
            >
              Join Us
            </Link>
          </div>

          {/* Choto feature pills. */}
          <ul className="mt-8 flex flex-wrap gap-2">
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

        {/* Right side: modern bento community composition. */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          {/* Composition er pichone soft emerald glow. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-brand/10 blur-3xl"
          />

          <div className="relative grid gap-3 sm:gap-4">
            {/* Main community card. */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink p-5 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.65)] sm:p-6">
              {/* Card er vitore emerald glow. */}
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
              />

              {/* Halka dot pattern. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Card header. */}
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Community
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Change <span className="text-brand">Nest</span>
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70 motion-reduce:hidden" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  Growing
                </span>
              </div>

              {/* Logo medallion with orbit rings. */}
              <div className="relative mt-5 flex min-h-48 items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute h-48 w-48 rounded-full border border-white/10"
                />
                <div
                  aria-hidden="true"
                  className="absolute h-36 w-36 rounded-full border border-dashed border-brand/25"
                />
                <div
                  aria-hidden="true"
                  className="absolute h-24 w-24 rounded-full bg-brand/20 blur-2xl"
                />

                {/* Choto orbit dots. */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand/70"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-[10%] h-1 w-1 rounded-full bg-white/30"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-[12%] top-1/3 h-1.5 w-1.5 rounded-full bg-brand/40"
                />

                <div className="relative flex h-24 w-24 animate-[float_6s_ease-in-out_infinite] motion-reduce:animate-none">
                  <div className="flex h-full w-full items-center justify-center rounded-[1.75rem] bg-white p-2 shadow-2xl shadow-brand/30 ring-1 ring-white/60">
                    <Image
                      src={logo}
                      alt="ChangeNest logo"
                      width={112}
                      height={112}
                      priority
                      className="h-full w-full rounded-[1.25rem] object-contain"
                    />
                  </div>

                  <span className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-ink shadow-lg shadow-brand/30 ring-4 ring-ink">
                    <FiHeart aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Medallion er niche caption. */}
              <p className="relative text-center text-sm font-semibold text-white sm:text-base">
                Powered by people like you
              </p>
              <p className="relative mt-1 text-center text-[11px] leading-5 text-white/45 sm:text-xs">
                Volunteers, organizers, and communities — growing together.
              </p>

              {/* Community tags. */}
              <div className="relative mt-5 grid grid-cols-3 gap-2">
                {communityTags.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center backdrop-blur"
                  >
                    <Icon aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
                    <span className="text-[10px] font-medium leading-tight text-white/60 sm:text-[11px]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento er choto dui card. */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Link
                href="/events"
                className="group rounded-[1.5rem] border border-ink/10 bg-white p-4 shadow-lg shadow-ink/5 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <FiCalendar aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-ink/25 transition-colors group-hover:text-brand"
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-ink">
                  Explore events
                </p>
                <p className="mt-1 text-xs leading-5 text-ink/55">
                  Find social activities near you.
                </p>
              </Link>

              <Link
                href="/join"
                className="group rounded-[1.5rem] bg-brand p-4 shadow-lg shadow-brand/25 transition hover:-translate-y-1 hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transform-none"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/10 text-ink">
                    <FiUsers aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-ink/40 transition-colors group-hover:text-ink"
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-ink">
                  Join the community
                </p>
                <p className="mt-1 text-xs leading-5 text-ink/75">
                  Volunteer, organize, and grow.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
