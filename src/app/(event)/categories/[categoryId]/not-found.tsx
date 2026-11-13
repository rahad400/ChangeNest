import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  SearchX,
} from "lucide-react";

export default function CategoryNotFound() {
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
          <SearchX aria-hidden="true" className="h-8 w-8" />
        </span>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
          404 · Category
        </p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Category not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">
          That cause does not exist on ChangeNest. Browse all upcoming events to
          find a cause that fits your week.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/upcoming-event"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            Browse all events
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Back home
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <Link
          href="/upcoming-event"
          className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold text-ink/50 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
          />
          All upcoming events
        </Link>
      </div>
    </main>
  );
}
