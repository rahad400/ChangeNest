import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Compass, RefreshCw } from "lucide-react";
import { auth } from "@/app/lib/auth";
import { fetchJoinedEvents } from "@/app/lib/events";
import JoinedEventCard from "@/components/events/my-joined-events/JoinedEventCard";
import MyNoJoinedEvent from "@/components/events/my-joined-events/MyNoJoinedEvent";

export const metadata: Metadata = {
  title: "My Joined Events | ChangeNest",
  description:
    "Review every ChangeNest event you have registered for, check event details, or leave an event whenever needed.",
};

export default async function MyJoinedEventsPage() {
  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null);

  if (!session) {
    redirect(`/sign-in?next=${encodeURIComponent("/my-joined-events")}`);
  }

  const { events, failed } = await fetchJoinedEvents(session.user.id);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
            Volunteer Impact
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            My Joined Events
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/60">
            Every cause you have signed up for, in one place. Open the details or leave an event whenever you need to.
          </p>
        </div>

        {events.length > 0 && (
          <div className="flex shrink-0 items-center gap-3">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/10 bg-surface px-4 py-2 text-xs font-semibold text-ink shadow-sm">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
              {events.length} {events.length === 1 ? "event" : "events"} joined
            </span>
            <Link
              href="/upcoming-event"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Compass aria-hidden="true" className="h-4 w-4" />
              Browse more
            </Link>
          </div>
        )}
      </header>

      {failed ? (
        <section
          role="alert"
          className="rounded-[2rem] border border-red-500/20 bg-surface p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-lg font-semibold text-ink">
            We couldn&apos;t load your joined events
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-ink/60">
            The event service may be temporarily unavailable. Please try again in a moment.
          </p>
          <Link
            href="/my-joined-events"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
          >
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            Try again
          </Link>
        </section>
      ) : events.length > 0 ? (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <JoinedEventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <MyNoJoinedEvent />
      )}
    </div>
  );
}
