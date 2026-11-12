"use client";

import type { FormEvent } from "react";
import {
  ChevronDown,
  LayoutGrid,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { eventCategories } from "@/app/lib/event-form";
import type { IEvent } from "@/types";
import { useHomeSearch } from "./HomeSearch";

type EventSearchProps = {
  events: IEvent[];
};

const EventSearch = ({ events }: EventSearchProps) => {
  const {
    query,
    category,
    city,
    setQuery,
    setCategory,
    setCity,
    scrollToEvents,
  } = useHomeSearch();

  // City list backend er real event theke ashe, hardcode na.
  const cities = Array.from(
    new Set(events.map((event) => event.values.city).filter(Boolean)),
  ).sort();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    scrollToEvents();
  };

  // Quick city chip click korle filter set kore results e scroll kore.
  const focusCity = (value: string) => {
    setCity(value);
    scrollToEvents();
  };

  return (
    <section
      aria-labelledby="event-search-heading"
      className="relative z-10 bg-canvas pb-4 sm:pb-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-ink/10 bg-surface p-4 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] sm:p-5 lg:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                Find your next good thing
              </p>
              <h2
                id="event-search-heading"
                className="mt-1.5 text-xl font-bold tracking-tight text-ink sm:text-2xl"
              >
                Search community events
              </h2>
            </div>
            <p className="hidden items-center gap-1.5 text-xs font-medium text-ink/45 sm:flex">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
              {eventCategories.length} causes · {cities.length} cities
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[1.35fr_1fr_1fr_auto]"
          >
            <label className="group relative min-w-0">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                Event name
              </span>
              <span className="relative block">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 transition-colors group-focus-within:text-brand"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try “cleanup”, “health”, or “reading”"
                  className="h-12 w-full min-w-0 rounded-xl border border-ink/12 bg-canvas pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </span>
            </label>

            <label className="group relative min-w-0">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                Category
              </span>
              <span className="relative block">
                <LayoutGrid
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 transition-colors group-focus-within:text-brand"
                />
                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as typeof category)
                  }
                  className="h-12 w-full appearance-none rounded-xl border border-ink/12 bg-canvas pl-11 pr-10 text-sm font-medium text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  <option value="all">All categories</option>
                  {eventCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
                />
              </span>
            </label>

            <label className="group relative min-w-0">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                Location
              </span>
              <span className="relative block">
                <MapPin
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 transition-colors group-focus-within:text-brand"
                />
                <select
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-ink/12 bg-canvas pl-11 pr-10 text-sm font-medium text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  <option value="all">All locations</option>
                  {cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
                />
              </span>
            </label>

            <button
              type="submit"
              className="group inline-flex h-12 items-center justify-center gap-2 self-end rounded-xl bg-navy px-6 text-sm font-semibold text-white transition hover:bg-brand hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:mb-0"
            >
              <Search
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:scale-110 motion-reduce:transform-none"
              />
              Search
            </button>
          </form>

          {cities.length > 0 ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                Popular
              </span>
              {cities.slice(0, 4).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => focusCity(item)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                    city === item
                      ? "border-brand/40 bg-brand/10 text-brand"
                      : "border-ink/10 bg-canvas text-ink/55 hover:border-brand/30 hover:text-ink"
                  }`}
                >
                  <MapPin aria-hidden="true" className="h-3 w-3" />
                  {item}
                </button>
              ))}
              {city !== "all" ? (
                <button
                  type="button"
                  onClick={() => setCity("all")}
                  className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-ink/40 transition hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  Clear location
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default EventSearch;
