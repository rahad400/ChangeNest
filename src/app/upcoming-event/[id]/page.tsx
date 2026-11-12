import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Sprout,
  UsersRound,
} from "lucide-react";
import type { IEvent } from "@/types/events";

export const metadata: Metadata = {
  title: "Event Details | ChangeNest",
  description:
    "Explore event details and find an opportunity to make a difference in your community.",
};

type DetailsPageProps = {
  params: Promise<{ id: string }>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isIEvent = (value: unknown): value is IEvent => {
  if (!isRecord(value) || !isRecord(value.values)) return false;

  const eventValues = value.values;
  const requiredFields = [
    "title",
    "categoryId",
    "description",
    "date",
    "startTime",
    "endTime",
    "city",
    "venue",
    "capacity",
  ];

  return (
    typeof value._id === "string" &&
    requiredFields.every((field) => typeof eventValues[field] === "string") &&
    (value.image === undefined ||
      value.image === null ||
      (isRecord(value.image) &&
        (value.image.url === undefined ||
          value.image.url === null ||
          typeof value.image.url === "string") &&
        (value.image.dataUrl === undefined ||
          value.image.dataUrl === null ||
          typeof value.image.dataUrl === "string")))
  );
};

const formatEventDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { id } = await params;
  let response: Response;

  try {
    response = await fetch(
      `http://localhost:8000/details-event/${encodeURIComponent(id)}`,
      { cache: "no-store" },
    );
  } catch {
    return <EventLoadError />;
  }

  if (response.status === 404) notFound();

  if (!response.ok) {
    return <EventLoadError />;
  }

  let result: unknown;

  try {
    result = await response.json();
  } catch {
    return <EventLoadError />;
  }

  if (!isIEvent(result)) {
    return <EventLoadError />;
  }

  const { values, image } = result;
  const imageSource = image?.url || image?.dataUrl;
  const category = values.categoryId.replaceAll("-", " ");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 4%, rgba(22, 163, 74, 0.12), transparent 28%), radial-gradient(circle at 5% 50%, color-mix(in srgb, var(--color-ink) 5%, transparent), transparent 30%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/upcoming-event"
          className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-4 py-2.5 text-sm font-semibold text-ink/70 shadow-sm transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          />
          All upcoming events
        </Link>

        <article className="mt-7 overflow-hidden rounded-[2rem] border border-ink/10 bg-surface shadow-[0_35px_100px_-55px_rgba(15,23,42,0.38)] sm:mt-9 sm:rounded-[2.5rem]">
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-50 to-lime-100 dark:from-emerald-950 dark:via-slate-900 dark:to-teal-950 sm:aspect-[2.15/1]">
            {imageSource ? (
              <Image
                src={imageSource}
                alt={values.title}
                fill
                unoptimized
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Sprout
                  aria-hidden="true"
                  className="h-20 w-20 text-brand/40 sm:h-28 sm:w-28"
                  strokeWidth={1}
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:p-9 lg:p-12">
              <span className="w-fit rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-semibold capitalize tracking-wide text-white backdrop-blur-md">
                {category}
              </span>
              <h1 className="max-w-4xl text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {values.title}
              </h1>
              <p className="flex items-center gap-2 text-sm font-medium text-white/85 sm:text-base">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>
                  {values.venue}, {values.city}
                </span>
              </p>
            </div>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 lg:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                About this event
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Make an impact together
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-ink/65 sm:text-base sm:leading-8">
                {values.description}
              </p>
            </div>

            <aside
              aria-label="Event information"
              className="h-fit rounded-3xl border border-ink/10 bg-canvas/75 p-5 sm:p-6"
            >
              <h2 className="text-base font-semibold text-ink">
                Event information
              </h2>
              <dl className="mt-5 space-y-5">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <CalendarDays
                      aria-hidden="true"
                      className="h-4.5 w-4.5"
                    />
                  </span>
                  <div>
                    <dt className="text-xs font-medium text-ink/50">Date</dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">
                      {formatEventDate(values.date)}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Clock3 aria-hidden="true" className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium text-ink/50">
                      Event time
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">
                      {values.startTime} – {values.endTime}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <MapPin aria-hidden="true" className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium text-ink/50">Venue</dt>
                    <dd className="mt-1 text-sm font-semibold leading-6 text-ink">
                      {values.venue}
                      <span className="block font-medium text-ink/60">
                        {values.city}
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <UsersRound
                      aria-hidden="true"
                      className="h-4.5 w-4.5"
                    />
                  </span>
                  <div>
                    <dt className="text-xs font-medium text-ink/50">
                      Volunteer capacity
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">
                      {values.capacity} spots
                    </dd>
                  </div>
                </div>
              </dl>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
};

const EventLoadError = () => (
  <main className="flex min-h-[60vh] items-center justify-center bg-canvas px-4 py-16">
    <div
      role="alert"
      className="w-full max-w-lg rounded-3xl border border-ink/10 bg-surface p-8 text-center shadow-xl shadow-navy/5 sm:p-10"
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <CalendarDays aria-hidden="true" className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">
        Event details are unavailable
      </h1>
      <p className="mt-3 text-sm leading-6 text-ink/60">
        We couldn&apos;t load this event right now. Please try again in a moment.
      </p>
      <Link
        href="/upcoming-event"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to upcoming events
      </Link>
    </div>
  </main>
);

export default DetailsPage;
