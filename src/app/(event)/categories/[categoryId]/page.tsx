import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import { isEventCategoryId } from "@/app/lib/event-form";
import { fetchUpcomingEvents } from "@/app/lib/events";
import UpcomingEventsCard from "@/components/events/UpcomingEeventCard";
import { categoryMap } from "@/components/home/data";

type CategoryPageProps = PageProps<"/categories/[categoryId]">;

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const { categoryId } = await params;

  if (!isEventCategoryId(categoryId)) {
    return { title: "Category not found | ChangeNest" };
  }

  const category = categoryMap[categoryId];

  return {
    title: `${category.label} Events | ChangeNest`,
    description: `Browse upcoming ${category.label.toLowerCase()} volunteer events. ${category.description}`,
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  // Invalid category hole backend call na kore direct 404 dekhai.
  if (!isEventCategoryId(categoryId)) notFound();

  const category = categoryMap[categoryId];
  const { events, failed } = await fetchUpcomingEvents();

  // Category onujayi filter kore date onujayi sajano hoy.
  const categoryEvents = events
    .filter((event) => event.values.categoryId === categoryId)
    .sort((first, second) => first.values.date.localeCompare(second.values.date));

  const Icon = category.icon;

  return (
    <main className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/upcoming-event"
          className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 bg-surface px-4 py-2.5 text-sm font-semibold text-ink/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transform-none"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          />
          All upcoming events
        </Link>

        <header className="relative mt-6 overflow-hidden rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-sm shadow-navy/5 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${category.tone}`}
              >
                <Icon aria-hidden="true" className="h-7 w-7" />
              </span>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                  Explore causes
                </p>
                <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {category.label} events
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60 sm:text-base sm:leading-7">
                  {category.description} Find a time that works for you and join
                  neighbours making a difference.
                </p>
              </div>
            </div>

            {!failed ? (
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-canvas px-3.5 py-2 text-xs font-semibold text-ink/55">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${category.dot}`}
                />
                {categoryEvents.length} upcoming{" "}
                {categoryEvents.length === 1 ? "event" : "events"}
              </span>
            ) : null}
          </div>
        </header>

        {failed ? (
          <section
            role="alert"
            className="mt-8 rounded-[2rem] border border-red-500/20 bg-surface p-8 text-center shadow-sm sm:p-12"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600">
              <AlertCircle aria-hidden="true" className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink">
              Could not load {category.label.toLowerCase()} events
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">
              We are having trouble communicating with the events service.
              Please ensure the backend is running and try refreshing the page.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/categories/${categoryId}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <RefreshCw aria-hidden="true" className="h-4 w-4" />
                Try again
              </Link>
              <Link
                href="/upcoming-event"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Browse all events
              </Link>
            </div>
          </section>
        ) : categoryEvents.length === 0 ? (
          <section className="mt-8 rounded-[2rem] border border-ink/10 bg-surface p-8 text-center shadow-sm sm:p-12">
            <span
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl ${category.tone}`}
            >
              <Icon aria-hidden="true" className="h-8 w-8" />
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink">
              No {category.label.toLowerCase()} events scheduled yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">
              New {category.label.toLowerCase()} opportunities are added all the
              time. Browse every cause, or host the first event for this one.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/upcoming-event"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                Browse all events
              </Link>
              <Link
                href="/create-event"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Create an event
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ) : (
          <section aria-labelledby="category-events-heading" className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2
                id="category-events-heading"
                className="text-lg font-bold tracking-tight text-ink sm:text-xl"
              >
                Upcoming {category.label.toLowerCase()} events
              </h2>
              <p className="text-xs text-ink/45">
                Sorted by the soonest date
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryEvents.map((event) => (
                <UpcomingEventsCard key={event._id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
