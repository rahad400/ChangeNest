import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Compass, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found | ChangeNest",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-canvas px-4 py-16 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(22, 163, 74, 0.12), transparent 35%)",
        }}
      />

      <div className="w-full max-w-xl rounded-[2.5rem] border border-ink/10 bg-surface p-8 text-center shadow-[0_35px_100px_-55px_rgba(15,23,42,0.38)] sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand/10 text-brand">
          <Compass aria-hidden="true" className="h-8 w-8" />
        </span>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
          404 · Page not found
        </p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          This page wandered off
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">
          The page you are looking for does not exist or has moved. Let us get
          you back to something worth doing.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Home aria-hidden="true" className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/upcoming-event"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            Browse events
          </Link>
        </div>
      </div>
    </main>
  );
}
