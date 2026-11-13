import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  CalendarDays,
  CalendarPlus,
  Compass,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { auth } from "@/app/lib/auth";
import {
  fetchCreatedEvents,
  fetchJoinedEvents,
  fetchUpcomingEvents,
} from "@/app/lib/events";
import {
  getEventCategoryLabel,
  getEventDateLabel,
  getEventLocation,
} from "@/app/lib/event-display";

export const metadata: Metadata = {
  title: "Dashboard Overview | ChangeNest",
  description:
    "View your community impact, manage joined volunteer events, and create new social development initiatives on ChangeNest.",
};

export default async function DashboardPage() {
  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null);

  if (!session) {
    redirect("/sign-in");
  }

  const [joinedResult, createdResult, upcomingResult] = await Promise.all([
    fetchJoinedEvents(),
    fetchCreatedEvents(),
    fetchUpcomingEvents(),
  ]);

  const joinedEvents = joinedResult.events;
  const createdEvents = createdResult.events;
  const upcomingCount = upcomingResult.events.length;

  const firstName = session.user.name?.trim().split(/\s+/)[0] || "Friend";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-ink/10 bg-gradient-to-br from-brand/15 via-surface to-surface p-6 shadow-sm shadow-navy/5 sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl"
        />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              Volunteer Dashboard
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Welcome back, {firstName}!
            </h1>
            <p className="mt-2 text-sm leading-6 text-ink/65 sm:text-base">
              Here is what is happening with your causes. You can review events you have joined,
              manage events you host, or organize a new gathering anytime.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              href="/create-event"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <CalendarPlus aria-hidden="true" className="h-4 w-4" />
              Create an event
            </Link>
            <Link
              href="/upcoming-event"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-2.5 text-xs font-semibold text-ink transition hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Compass aria-hidden="true" className="h-4 w-4" />
              Explore events
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Statistics Cards */}
      <section aria-label="Statistics overview" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Joined Events Stat */}
        <Link
          href="/my-joined-events"
          className="group rounded-3xl border border-ink/10 bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <CalendarCheck2 aria-hidden="true" className="h-6 w-6" />
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">
              View all
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {joinedEvents.length}
          </p>
          <p className="mt-1 text-sm font-semibold text-ink/75">
            Joined Events
          </p>
          <p className="mt-1 text-xs text-ink/45">
            Causes you are signed up to attend
          </p>
        </Link>

        {/* Created Events Stat */}
        <Link
          href="/my-events"
          className="group rounded-3xl border border-ink/10 bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <CalendarDays aria-hidden="true" className="h-6 w-6" />
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">
              Manage
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {createdEvents.length}
          </p>
          <p className="mt-1 text-sm font-semibold text-ink/75">
            Created Events
          </p>
          <p className="mt-1 text-xs text-ink/45">
            Events you have organized for your community
          </p>
        </Link>

        {/* Community Events Stat */}
        <Link
          href="/upcoming-event"
          className="group rounded-3xl border border-ink/10 bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-md sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <UserCheck aria-hidden="true" className="h-6 w-6" />
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">
              Explore
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {upcomingCount}
          </p>
          <p className="mt-1 text-sm font-semibold text-ink/75">
            Available Opportunities
          </p>
          <p className="mt-1 text-xs text-ink/45">
            Upcoming volunteer activities across cities
          </p>
        </Link>
      </section>

      {/* Recent Events Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Joined Events Preview */}
        <section
          aria-labelledby="recent-joined-heading"
          className="rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="recent-joined-heading"
                className="text-lg font-bold tracking-tight text-ink"
              >
                Recently Joined
              </h2>
              <p className="text-xs text-ink/50">
                Events you are signed up to attend
              </p>
            </div>
            <Link
              href="/my-joined-events"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
            >
              View all
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {joinedEvents.length > 0 ? (
              joinedEvents.slice(0, 3).map((event) => (
                <div
                  key={event._id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-canvas p-3.5 transition hover:border-brand/30"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {event.values.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-ink/50">
                      {getEventDateLabel(event.values.date)} ·{" "}
                      {getEventLocation(event.values.venue, event.values.city)}
                    </p>
                  </div>
                  <Link
                    href={`/upcoming-event/${event._id}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white"
                  >
                    Details
                  </Link>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center">
                <p className="text-xs font-medium text-ink/55">
                  You haven&apos;t joined any events yet.
                </p>
                <Link
                  href="/upcoming-event"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                >
                  Find events to join
                  <ArrowRight aria-hidden="true" className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Recent Created Events Preview */}
        <section
          aria-labelledby="recent-created-heading"
          className="rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="recent-created-heading"
                className="text-lg font-bold tracking-tight text-ink"
              >
                Events You Organize
              </h2>
              <p className="text-xs text-ink/50">
                Events you have created and host
              </p>
            </div>
            <Link
              href="/my-events"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
            >
              Manage all
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {createdEvents.length > 0 ? (
              createdEvents.slice(0, 3).map((event) => (
                <div
                  key={event._id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-canvas p-3.5 transition hover:border-brand/30"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {event.values.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-ink/50">
                      {getEventCategoryLabel(event.values.categoryId)} ·{" "}
                      {getEventDateLabel(event.values.date)}
                    </p>
                  </div>
                  <Link
                    href={`/event-edit?id=${event._id}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-ink transition hover:border-brand hover:text-brand"
                  >
                    Edit
                  </Link>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center">
                <p className="text-xs font-medium text-ink/55">
                  You haven&apos;t created any events yet.
                </p>
                <Link
                  href="/create-event"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                >
                  Create an event now
                  <ArrowRight aria-hidden="true" className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
