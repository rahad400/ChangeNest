import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
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

// Right side er community panel er tag list.
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

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        {/* Left side: text and buttons. */}
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-2 text-sm font-semibold text-ink shadow-sm shadow-ink/5 backdrop-blur">
            <span
              className="h-2 w-2 rounded-full bg-brand"
              aria-hidden="true"
            />
            Together We Grow
          </p>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/65 sm:text-sm">
            ChangeNest — Social Development &amp; Community Events Platform
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl xl:text-6xl"
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

          {/* Choto feature chips. */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-ink/65"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: image-free community panel. */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink p-6 shadow-2xl shadow-ink/25 sm:p-8">
            {/* Panel er vitore emerald glow. */}
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
            />

            {/* Halka dot pattern. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Community impact
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Powered by people like you
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand"
                  aria-hidden="true"
                />
                Growing
              </span>
            </div>

            {/* Center icon with soft rings. */}
            <div className="relative mt-8 flex min-h-64 items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute h-56 w-56 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute h-44 w-44 rounded-full border border-brand/25"
              />
              <div
                aria-hidden="true"
                className="absolute h-32 w-32 rounded-full bg-brand/15 blur-2xl"
              />

              <div className="relative flex h-24 w-24 animate-[float_6s_ease-in-out_infinite] motion-reduce:animate-none">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white p-2 shadow-xl shadow-brand/30 ring-4 ring-brand/20">
                  <Image
                    src={logo}
                    alt="ChangeNest logo"
                    width={112}
                    height={112}
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>

                <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-ink ring-4 ring-ink">
                  <FiHeart aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </div>

            {/* Community tags. */}
            <div className="relative mt-6 grid grid-cols-3 gap-2">
              {communityTags.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-brand" />
                  <span className="text-[11px] font-medium leading-tight text-white/70 sm:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
