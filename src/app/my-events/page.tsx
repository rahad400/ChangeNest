import Link from "next/link";
import { headers } from "next/headers";
import { FiPlus } from "react-icons/fi";
import MyEventsCard from "@/components/my-events-details/MyEventsCard";
import MyNoEvent from "@/components/my-events-details/MyNoEvent";
import type { IEvent } from "@/types";

const MyEventsPage = async () => {
  const requestHeaders = await headers();

  const res = await fetch("http://localhost:3000/api/my-events", {
    headers: {
      cookie: requestHeaders.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  const data: unknown = await res.json();
  const events: IEvent[] = Array.isArray(data) ? (data as IEvent[]) : [];

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-canvas">
      {/* Page er background e halka brand glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(22, 163, 74, 0.12), transparent 30%), radial-gradient(circle at 5% 100%, color-mix(in srgb, var(--color-ink) 6%, transparent), transparent 32%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="rise-in flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-brand"
              />
              Your events
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              My events
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/60">
              Manage the events you&apos;ve created and keep your community in
              the loop.
            </p>
          </div>

          {events.length > 0 && (
            <Link
              href="/create-event"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand/95 hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none"
            >
              <FiPlus aria-hidden="true" className="h-4 w-4" />
              Create event
            </Link>
          )}
        </header>

        <div className="rise-in mt-8">
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
      </div>
    </main>
  );
};

export default MyEventsPage;
