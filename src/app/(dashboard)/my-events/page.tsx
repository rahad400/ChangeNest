import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { auth } from "@/app/lib/auth";
import { fetchCreatedEvents } from "@/app/lib/events";
import MyEventsCard from "@/components/events/my-events-details/MyEventsCard";
import MyNoEvent from "@/components/events/my-events-details/MyNoEvent";

export const metadata: Metadata = {
  title: "My Created Events | ChangeNest",
  description:
    "Manage the community events you have organized, update event schedules, or remove listings on ChangeNest.",
};

export default async function MyEventsPage() {
  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null);

  if (!session) {
    redirect("/sign-in");
  }

  const { events } = await fetchCreatedEvents();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
            Organizer Space
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            My Created Events
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/60">
            Manage the events you&apos;ve organized and keep your volunteers in the loop.
          </p>
        </div>

        {events.length > 0 && (
          <Link
            href="/create-event"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <FiPlus aria-hidden="true" className="h-4 w-4" />
            Create new event
          </Link>
        )}
      </header>

      {events.length > 0 ? (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <MyEventsCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <MyNoEvent />
      )}
    </div>
  );
}
