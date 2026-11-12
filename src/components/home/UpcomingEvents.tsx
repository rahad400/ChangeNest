"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
  RotateCcw,
  SearchX,
  Users,
} from "lucide-react";
import { categoryMap, events } from "./data";
import { useHomeSearch } from "./HomeSearch";
import { SectionHeading } from "./ui";

const UpcomingEvents = () => {
  const {
    query,
    category: activeCategory,
    city: activeCity,
    hasFilters,
    clearFilters,
    scrollToEvents,
  } = useHomeSearch();

  const normalizedQuery = query.trim().toLowerCase();

  const matchingEvents = events.filter((event) => {
    const category = categoryMap[event.categoryId];
    const searchableText = [
      event.title,
      event.description,
      event.city,
      event.venue,
      category.label,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      normalizedQuery.length === 0 ||
      searchableText.includes(normalizedQuery);
    const matchesCategory =
      activeCategory === "all" || event.categoryId === activeCategory;
    const matchesCity = activeCity === "all" || event.city === activeCity;

    return matchesQuery && matchesCategory && matchesCity;
  });

  // Default view e 6 ta event dekhi, "View all events" baki gulo dekhbe.
  const visibleEvents = hasFilters ? matchingEvents : matchingEvents.slice(0, 6);

  const resultsLabel = hasFilters
    ? `${matchingEvents.length} ${
        matchingEvents.length === 1 ? "event" : "events"
      } match your filters`
    : `Showing ${visibleEvents.length} of ${events.length} upcoming events`;

  return (
    <section
      id="upcoming-events"
      aria-labelledby="upcoming-heading"
      className="scroll-mt-24 bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="upcoming-heading"
          eyebrow="Upcoming near you"
          demo="Demo listings"
          title={
            <>
              Your next good story{" "}
              <span className="font-serif font-normal italic text-brand">
                starts here.
              </span>
            </>
          }
          description="Real causes, clear times, and hosts who will be glad you came. Search above or browse everything happening soon."
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

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <p
            aria-live="polite"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-3.5 py-2 text-xs font-semibold text-ink/55"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
            {resultsLabel}
          </p>

          {hasFilters ? (
            <button
              type="button"
              onClick={() => {
                clearFilters();
                scrollToEvents();
              }}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink/45 transition hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Clear filters
            </button>
          ) : null}
        </div>

        {visibleEvents.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleEvents.map((event) => {
              const category = categoryMap[event.categoryId];
              const Icon = category.icon;
              const filledPercent = Math.round(
                (event.attendees / (event.attendees + event.spotsLeft)) * 100,
              );

              return (
                <article
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface shadow-sm shadow-navy/5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-navy/10 motion-reduce:transform-none sm:flex-row"
                >
                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-navy sm:aspect-auto sm:w-40 lg:w-48">
                    <Image
                      src={event.image}
                      alt={`${event.title} community event`}
                      fill
                      sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.05] motion-reduce:transform-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent sm:bg-gradient-to-r"
                    />

                    <span className="absolute left-3 top-3 flex h-14 w-12 flex-col items-center justify-center rounded-xl bg-white/95 text-navy shadow-sm backdrop-blur">
                      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-brand">
                        {event.month}
                      </span>
                      <span className="text-lg font-bold leading-none">
                        {event.day}
                      </span>
                    </span>

                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur">
                      <Icon aria-hidden="true" className="h-3 w-3" />
                      {category.label}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-ink/45">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                        {event.time}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-ink/20"
                      />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                        {event.city}
                      </span>
                    </div>

                    <h3 className="mt-2 text-lg font-bold tracking-tight text-ink">
                      <Link
                        href="/events"
                        className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
                      >
                        {event.title}
                      </Link>
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink/50">
                      {event.venue}
                    </p>

                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-ink/50">
                        <span className="inline-flex items-center gap-1.5">
                          <Users aria-hidden="true" className="h-3.5 w-3.5" />
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
                        aria-label={`Join ${event.title}`}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-canvas px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        Join now
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-dashed border-ink/20 bg-surface p-10 text-center sm:p-14">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <SearchX aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-ink">
              No events match those filters.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/55">
              Try a different cause or city — or clear the filters to see
              everything happening nearby.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
