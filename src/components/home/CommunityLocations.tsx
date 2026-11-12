import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  MapPinned,
  Navigation,
} from "lucide-react";
import { communities } from "./data";
import { SectionHeading } from "./ui";

const CommunityLocations = () => {
  const totalEvents = communities.reduce(
    (count, community) => count + community.events,
    0,
  );

  return (
    <section
      aria-labelledby="locations-heading"
      className="bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="locations-heading"
          eyebrow="Community locations"
          demo="Demo community data"
          title={
            <>
              A nest that&apos;s growing,{" "}
              <span className="font-serif font-normal italic text-brand">
                city by city.
              </span>
            </>
          }
          description="Find active communities near you, see where people are already organizing, and help us bring ChangeNest to the next neighbourhood."
          action={
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Suggest a city
              <Navigation aria-hidden="true" className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex min-w-0 flex-col gap-3">
            {communities.map(({ city, events, focus, description }, index) => (
              <Link
                key={city}
                href={`/events?city=${encodeURIComponent(city)}`}
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-ink/10 bg-surface p-4 shadow-sm shadow-navy/5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-navy/5 motion-reduce:transform-none"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-xs font-bold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-sm font-bold text-ink">{city}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/35">
                      {events} events · {focus}
                    </span>
                  </span>
                  <span className="mt-1 block truncate text-xs text-ink/45">
                    {description}
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-ink/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand motion-reduce:transform-none"
                />
              </Link>
            ))}
          </div>

          {/* Map placeholder. Future map integration er jonno data attributes ready. */}
          <div
            data-map-region="bangladesh"
            data-map-status="placeholder"
            className="relative isolate min-h-[27rem] min-w-0 overflow-hidden rounded-[2rem] bg-navy p-5 text-white shadow-2xl shadow-navy/10 sm:p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                  <MapPinned aria-hidden="true" className="h-3.5 w-3.5" />
                  Community map
                </p>
                <p className="mt-1.5 text-xs text-white/45">
                  Active cities at a glance
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/40">
                Map coming soon
              </span>
            </div>

            <div className="relative mt-6 h-[17rem] sm:h-[19rem]">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {communities.slice(1).map((community) => (
                  <line
                    key={community.city}
                    x1={communities[0].x}
                    y1={communities[0].y}
                    x2={community.x}
                    y2={community.y}
                    stroke="rgba(34,197,94,0.22)"
                    strokeWidth="0.35"
                    strokeDasharray="1.5 1.5"
                  />
                ))}
              </svg>

              {communities.map(({ city, x, y, events }, index) => (
                <div
                  key={city}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="relative flex items-center gap-1.5">
                    <span className="relative flex h-3 w-3 shrink-0">
                      {index === 0 ? (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-40 motion-reduce:hidden" />
                      ) : null}
                      <span className="relative flex h-3 w-3 rounded-full border-2 border-navy bg-brand shadow-[0_0_0_1px_rgba(34,197,94,0.5)]" />
                    </span>
                    <span className="whitespace-nowrap rounded-full border border-white/10 bg-navy/80 px-2 py-1 text-[9px] font-semibold text-white/75 backdrop-blur">
                      {city}
                      <span className="ml-1 text-white/35">{events}</span>
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="relative mt-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
                  This season
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {communities.length} communities · {totalEvents} events
                </p>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                Explore
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-5 flex items-center gap-1.5 text-xs text-ink/35">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
          Community counts and map positions are demonstration data, ready to be
          replaced by live locations.
        </p>
      </div>
    </section>
  );
};

export default CommunityLocations;
