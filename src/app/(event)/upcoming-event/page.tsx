import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import { fetchUpcomingEvents } from "@/app/lib/events";
import UpcomingEventsExplorer from "@/components/events/UpcomingEventsExplorer";

export const metadata: Metadata = {
  title: "Upcoming Events | ChangeNest",
  description:
    "Explore upcoming community volunteer events, filter by cause or city, and join hands with neighbours to create meaningful local change.",
};

export default async function UpcomingEventPage() {
  const { events, failed } = await fetchUpcomingEvents();

  if (failed) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-lg rounded-[2.5rem] border border-red-500/20 bg-surface p-10 text-center shadow-lg shadow-navy/5 sm:p-14">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-500/10 text-red-600">
            <AlertCircle aria-hidden="true" className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Could not load events
          </h1>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            We are having trouble communicating with the events service.
            Please ensure the backend is running and try refreshing the page.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/upcoming-event"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              Try again
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas">
      <UpcomingEventsExplorer initialEvents={events} />
    </main>
  );
}
