import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Compass,
  HeartHandshake,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";

const perks = [
  {
    icon: Compass,
    title: "Discover",
    copy: "Find causes that matter to you.",
  },
  {
    icon: HeartHandshake,
    title: "Join",
    copy: "Sign up in one click, no forms.",
  },
  {
    icon: UsersRound,
    title: "Show up",
    copy: "Meet neighbours and make impact.",
  },
];

const MyNoJoinedEvent = () => {
  return (
    <section
      aria-labelledby="no-joined-events-heading"
      className="relative isolate overflow-hidden rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.5)] sm:rounded-[2.5rem] sm:p-10 lg:p-12"
    >
      {/* Empty state er background e soft brand glow thakbe. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(22, 163, 74, 0.12), transparent 32%), radial-gradient(circle at 4% 96%, color-mix(in srgb, var(--color-ink) 6%, transparent), transparent 30%)",
        }}
      />

      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            Your impact starts here
          </p>

          <h2
            id="no-joined-events-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            No joined events yet.{" "}
            <span className="text-brand">Find your people.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-ink/60">
            Browse local volunteer events, join with one click, and keep every
            cause you care about in one place.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/upcoming-event"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand/95 hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none"
            >
              <Compass aria-hidden="true" className="h-4 w-4" />
              Browse events
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none">
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
            </Link>

            <Link
              href="/create-event"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none"
            >
              Create an event
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {perks.map((perk) => {
              const Icon = perk.icon;

              return (
                <li
                  key={perk.title}
                  className="rounded-2xl border border-ink/10 bg-canvas/70 p-3.5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <p className="mt-2.5 text-xs font-semibold text-ink">
                    {perk.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-ink/50">
                    {perk.copy}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Joined event card er ekta preview illustration. */}
        <div aria-hidden="true" className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-8 -z-10 rounded-full bg-brand/10 blur-3xl" />

          <div className="absolute -left-4 top-8 hidden -rotate-6 items-center gap-2 rounded-2xl border border-brand/15 bg-surface/90 px-3.5 py-2 text-[11px] font-semibold text-brand shadow-lg backdrop-blur sm:flex">
            <Sparkles className="h-3.5 w-3.5" />
            Good people, good causes
          </div>

          <div className="rounded-[1.75rem] border border-ink/10 bg-canvas p-3 shadow-2xl shadow-navy/10">
            <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand/25 via-brand/10 to-surface">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.5) 0, transparent 30%)",
                }}
              />
              <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand shadow-sm">
                Community
              </span>
              <HeartHandshake className="h-14 w-14 text-brand" />
            </div>

            <div className="p-4">
              <div className="h-3 w-3/4 rounded-full bg-ink/15" />
              <div className="mt-2 h-2.5 w-1/2 rounded-full bg-ink/10" />

              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-brand" />
                  <div className="h-2 w-28 rounded-full bg-ink/10" />
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  <div className="h-2 w-36 rounded-full bg-ink/10" />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-dashed border-brand/30 bg-brand/5 px-3.5 py-3">
                <span className="text-xs font-semibold text-brand">
                  Your next event
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 right-2 rotate-3 rounded-2xl border border-ink/10 bg-surface px-3.5 py-2 text-[11px] font-semibold text-ink shadow-lg">
            <span className="flex items-center gap-1.5">
              <UsersRound className="h-3.5 w-3.5 text-brand" />
              Join in one click
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyNoJoinedEvent;
