"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  ArrowUpDown,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  Filter,
  MapPin,
  RotateCcw,
  Search,
  SearchX,
  Sparkles,
  X,
} from "lucide-react";
import { eventCategories } from "@/app/lib/event-form";
import { getEventCategoryLabel, getEventTimestamp } from "@/app/lib/event-display";
import UpcomingEventsCard from "@/components/events/UpcomingEeventCard";
import type { IEvent } from "@/types";

type SortOption = "date" | "latest" | "capacity";

type UpcomingEventsExplorerProps = {
  initialEvents: IEvent[];
};

const UpcomingEventsExplorer = ({ initialEvents }: UpcomingEventsExplorerProps) => {
  const searchInputId = useId();
  const categorySelectId = useId();
  const locationSelectId = useId();
  const sortSelectId = useId();

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Dynamically extract all unique cities from the available events
  const availableCities = useMemo(() => {
    const citySet = new Set<string>();
    for (const event of initialEvents) {
      const city = event.values.city?.trim();
      if (city) {
        citySet.add(city);
      }
    }
    return Array.from(citySet).sort();
  }, [initialEvents]);

  // Compute filtered and sorted events
  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = initialEvents.filter((event) => {
      // 1. Text Search across Title, City, Venue, and Description
      if (query.length > 0) {
        const titleMatch = event.values.title.toLowerCase().includes(query);
        const cityMatch = event.values.city.toLowerCase().includes(query);
        const venueMatch = event.values.venue.toLowerCase().includes(query);
        const descMatch = event.values.description.toLowerCase().includes(query);
        const catMatch = getEventCategoryLabel(event.values.categoryId)
          .toLowerCase()
          .includes(query);

        if (!titleMatch && !cityMatch && !venueMatch && !descMatch && !catMatch) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "all" && event.values.categoryId !== selectedCategory) {
        return false;
      }

      // 3. City Filter
      if (selectedCity !== "all" && event.values.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      return true;
    });

    // 4. Sorting logic
    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        // Earliest upcoming date first
        return a.values.date.localeCompare(b.values.date);
      }
      if (sortBy === "latest") {
        // Most recently added event first (using MongoDB ObjectId timestamp)
        return getEventTimestamp(b) - getEventTimestamp(a);
      }
      if (sortBy === "capacity") {
        // Highest capacity first
        const capA = Number(a.values.capacity) || 0;
        const capB = Number(b.values.capacity) || 0;
        return capB - capA;
      }
      return 0;
    });
  }, [initialEvents, searchQuery, selectedCategory, selectedCity, sortBy]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "all" ||
    selectedCity !== "all" ||
    sortBy !== "date";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCity("all");
    setSortBy("date");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header Section */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            Community Events Explorer
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Upcoming Events
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65 sm:text-base">
            Find meaningful volunteer activities near you. Filter by cause, location,
            or date, and sign up to support your local community.
          </p>
        </div>

        <Link
          href="/create-event"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
        >
          <CalendarPlus aria-hidden="true" className="h-4 w-4" />
          Create an event
        </Link>
      </header>

      {/* Filter and Search Control Bar */}
      <section
        aria-label="Filter events"
        className="mt-8 rounded-3xl border border-ink/10 bg-surface p-4 shadow-sm shadow-navy/5 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Text Search Input (Title, Venue, City) */}
          <div className="flex flex-col">
            <label
              htmlFor={searchInputId}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45"
            >
              Search
            </label>
            <div className="relative mt-1.5 flex items-center">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 h-4 w-4 text-ink/40"
              />
              <input
                id={searchInputId}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, venue, or city..."
                className="h-11 w-full rounded-2xl border border-ink/15 bg-canvas pl-10 pr-9 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 rounded-full p-1 text-ink/40 hover:bg-surface hover:text-ink"
                >
                  <X aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label
              htmlFor={categorySelectId}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45"
            >
              Category
            </label>
            <div className="relative mt-1.5">
              <Filter
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
              />
              <select
                id={categorySelectId}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-11 w-full appearance-none rounded-2xl border border-ink/15 bg-canvas pl-10 pr-10 text-sm font-medium text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                <option value="all">All Causes</option>
                {eventCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
              />
            </div>
          </div>

          {/* City Dropdown */}
          <div className="flex flex-col">
            <label
              htmlFor={locationSelectId}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45"
            >
              Location
            </label>
            <div className="relative mt-1.5">
              <MapPin
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
              />
              <select
                id={locationSelectId}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-11 w-full appearance-none rounded-2xl border border-ink/15 bg-canvas pl-10 pr-10 text-sm font-medium text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                <option value="all">All Cities</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
              />
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex flex-col">
            <label
              htmlFor={sortSelectId}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45"
            >
              Sort By
            </label>
            <div className="relative mt-1.5">
              <ArrowUpDown
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
              />
              <select
                id={sortSelectId}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-11 w-full appearance-none rounded-2xl border border-ink/15 bg-canvas pl-10 pr-10 text-sm font-medium text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                <option value="date">Upcoming Date (Earliest)</option>
                <option value="latest">Newly Added</option>
                <option value="capacity">Volunteer Capacity (High to Low)</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
              />
            </div>
          </div>
        </div>

        {/* Quick Category Chips for Fast Filtering */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/40">
            Causes:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition ${
              selectedCategory === "all"
                ? "border-brand bg-brand text-white"
                : "border-ink/15 bg-canvas text-ink/60 hover:border-brand/40 hover:text-ink"
            }`}
          >
            All Causes
          </button>
          {eventCategories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(active ? "all" : cat.id)}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-ink/15 bg-canvas text-ink/60 hover:border-brand/40 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Count & Clear Filters Banner */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-4 py-1.5 text-xs font-semibold text-ink/65">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
          Showing {filteredEvents.length} of {initialEvents.length}{" "}
          {initialEvents.length === 1 ? "upcoming event" : "upcoming events"}
        </p>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-surface px-4 py-1.5 text-xs font-semibold text-ink/65 transition hover:border-brand/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
            Clear all filters
          </button>
        ) : null}
      </div>

      {/* Event Cards Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event) => (
            <UpcomingEventsCard key={event._id} event={event} />
          ))}
        </div>
      ) : initialEvents.length === 0 ? (
        /* Empty State: No events exist on the platform yet */
        <div className="mt-10 rounded-[2.5rem] border border-dashed border-ink/15 bg-surface p-10 text-center sm:p-16">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand/10 text-brand">
            <CalendarDays aria-hidden="true" className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink">
            No upcoming events found
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/60">
            There are no upcoming volunteer events scheduled yet. Be the first to
            inspire change in your neighbourhood!
          </p>
          <Link
            href="/create-event"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90"
          >
            <CalendarPlus aria-hidden="true" className="h-4 w-4" />
            Create your first event
          </Link>
        </div>
      ) : (
        /* Empty State: Filters produced no matches */
        <div className="mt-10 rounded-[2.5rem] border border-dashed border-ink/15 bg-surface p-10 text-center sm:p-16">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand/10 text-brand">
            <SearchX aria-hidden="true" className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink">
            No events match your criteria
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/60">
            We couldn&apos;t find any events matching your selected filters. Try searching
            for a different keyword or clearing your filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-canvas px-6 py-3 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsExplorer;
