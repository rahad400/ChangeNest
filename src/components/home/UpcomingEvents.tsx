"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarPlus,
  RefreshCw,
  RotateCcw,
  SearchX,
  TriangleAlert,
} from "lucide-react";
import { getEventCategoryLabel } from "@/app/lib/event-display";
import UpcomingEventsCard from "@/components/events/UpcomingEeventCard";
import type { IEvent } from "@/types";
import { useHomeSearch } from "./HomeSearch";
import { SectionHeading } from "./ui";

type UpcomingEventsProps = {
  events: IEvent[];
  failed: boolean;
};

const UpcomingEvents = ({ events, failed }: UpcomingEventsProps) => {
  const {
    query,
    category: activeCategory,
    city: activeCity,
    hasFilters,
    clearFilters,
    scrollToEvents,
  } = useHomeSearch();

  const normalizedQuery = query.trim().toLowerCase();

  const matchingEvents = events.slice(0, 3).filter((event) => {
    const searchableText = [
      event.values.title,
      event.values.description,
      event.values.city,
      event.values.venue,
      getEventCategoryLabel(event.values.categoryId),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      normalizedQuery.length === 0 ||
      searchableText.includes(normalizedQuery);
    const matchesCategory =
      activeCategory === "all" ||
      event.values.categoryId === activeCategory;
    const matchesCity =
      activeCity === "all" || event.values.city === activeCity;

    return matchesQuery && matchesCategory && matchesCity;
  });

  const resultsLabel = hasFilters
    ? `${matchingEvents.length} ${
        matchingEvents.length === 1 ? "event" : "events"
      } match your filters`
    : `${events.length} upcoming ${
        events.length === 1 ? "event" : "events"
      } from our community`;

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
              href="/upcoming-event"
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

        {failed ? (
          <div className="mt-8 rounded-[2rem] border border-red-500/20 bg-surface p-10 text-center sm:p-14">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600">
              <TriangleAlert aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-ink">
              We couldn&apos;t load events right now.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/55">
              The event service may be taking a short break. Please try again
              in a moment.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              Try again
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p
                aria-live="polite"
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-3.5 py-2 text-xs font-semibold text-ink/55"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brand"
                />
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

            {matchingEvents.length > 0 ? (
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {matchingEvents.map((event) => (
                  <UpcomingEventsCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[2rem] border border-dashed border-ink/20 bg-surface p-10 text-center sm:p-14">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  {events.length === 0 ? (
                    <CalendarPlus aria-hidden="true" className="h-6 w-6" />
                  ) : (
                    <SearchX aria-hidden="true" className="h-6 w-6" />
                  )}
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">
                  {events.length === 0
                    ? "No upcoming events yet."
                    : "No events match those filters."}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/55">
                  {events.length === 0
                    ? "Be the first to bring your community together — create an event and it will show up right here."
                    : "Try a different cause or city — or clear the filters to see everything happening nearby."}
                </p>
                {events.length === 0 ? (
                  <Link
                    href="/create-event"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <CalendarPlus aria-hidden="true" className="h-4 w-4" />
                    Create an event
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      clearFilters();
                      scrollToEvents();
                    }}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <RotateCcw aria-hidden="true" className="h-4 w-4" />
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
