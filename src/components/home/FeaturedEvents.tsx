import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import { categoryMap, featuredEvents } from "./data";
import { SectionHeading } from "./ui";

const FeaturedEvents = () => {
  return (
    <section
      aria-labelledby="featured-heading"
      className="border-y border-ink/5 bg-surface py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="featured-heading"
          eyebrow="Featured this week"
          demo="Demo listings"
          title={
            <>
              Three ways to{" "}
              <span className="font-serif font-normal italic text-brand">
                show up
              </span>{" "}
              this week.
            </>
          }
          description="Hand-picked events with clear details, friendly hosts, and room for one more pair of hands."
          action={
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              View all events
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featuredEvents.map((event) => {
            const category = categoryMap[event.categoryId];
            const Icon = category.icon;
            const filledPercent = Math.round(
              (event.attendees / (event.attendees + event.spotsLeft)) * 100,
            );

            return (
              <article
                key={event.id}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-surface shadow-sm shadow-navy/5 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-navy/10 motion-reduce:transform-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                  <Image
                    src={event.image}
                    alt={`${event.title} community event`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 90vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/65 via-navy/5 to-transparent"
                  />

                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-navy backdrop-blur">
                    <Icon aria-hidden="true" className="h-3 w-3 text-brand" />
                    {category.label}
                  </span>

                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/45 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                    <CalendarDays aria-hidden="true" className="h-3 w-3" />
                    {event.dateLabel}
                  </span>

                  <p className="absolute bottom-4 left-5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                    {event.city}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-ink/45">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                      {event.time}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
                    <span>{event.spotsLeft} spots left</span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
                    <Link
                      href="/events"
                      className="outline-none transition-colors hover:text-brand focus-visible:underline"
                    >
                      {event.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-ink/60">
                    {event.description}
                  </p>

                  <p className="mt-4 flex items-start gap-1.5 text-xs leading-5 text-ink/50">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    />
                    <span>
                      {event.venue}, {event.city}
                    </span>
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-ink/50">
                      <span className="inline-flex items-center gap-1.5">
                        <Users
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />
                        {event.attendees} going
                      </span>
                      <span>{event.spotsLeft} spots left</span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${filledPercent}%` }}
                      />
                    </div>

                    <Link
                      href="/events"
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                      View details
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
