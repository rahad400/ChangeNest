import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Compass,
  ExternalLink,
  HeartHandshake,
  MapPin,
  Sprout,
  UsersRound,
} from "lucide-react";
import { auth } from "@/app/lib/auth";
import { eventCategories, formatEventTime } from "@/app/lib/event-form";
import { eventApiUrl } from "@/app/lib/event-api";
import JoinEventButton from "@/components/events/JoinEventButton";
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

const formatTimeRange = (startTime: string, endTime: string) => {
  const start = formatEventTime(startTime) || startTime;
  const end = formatEventTime(endTime) || endTime;

  return `${start} – ${end}`;
};

type JoinSummary = {
  joined: boolean;
  count: number;
};

const getJoinSummary = async (eventId: string): Promise<JoinSummary> => {
  try {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    const jwtToken = session
      ? await auth.api.getToken({ headers: requestHeaders })
      : null;
    const token = jwtToken?.token;

    const response = await fetch(
      eventApiUrl(`join-event/${encodeURIComponent(eventId)}`),
      {
        headers: token ? { authorization: `Bearer ${token}` } : {},
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return { joined: false, count: 0 };
    }

    const data: unknown = await response.json();

    if (!isRecord(data)) {
      return { joined: false, count: 0 };
    }

    return {
      joined: data.joined === true,
      count: typeof data.count === "number" ? data.count : 0,
    };
  } catch {
    return { joined: false, count: 0 };
  }
};

type EventFactProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

const EventFact = ({ icon: Icon, label, value }: EventFactProps) => (
  <div className="flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-canvas sm:p-4">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
      <Icon aria-hidden="true" className="h-4 w-4" />
    </span>
    <div className="min-w-0">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold leading-5 text-ink">{value}</dd>
    </div>
  </div>
);

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { id } = await params;

  // Invalid id hole backend e request na pathiye direct 404 dekhai.
  if (!/^[a-f0-9]{24}$/i.test(id)) notFound();

  let response: Response;

  try {
    response = await fetch(
      eventApiUrl(`details-event/${encodeURIComponent(id)}`),
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
  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null);
  const joinSummary = await getJoinSummary(id);
  const categoryLabel =
    eventCategories.find((category) => category.id === values.categoryId)
      ?.label ?? values.categoryId.replaceAll("-", " ");
  const timeRange = formatTimeRange(values.startTime, values.endTime);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${values.venue}, ${values.city}`,
  )}`;

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-canvas">
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
          className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 bg-surface px-4 py-2.5 text-sm font-semibold text-ink/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transform-none"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          />
          All upcoming events
        </Link>

        <article className="mt-7 overflow-hidden rounded-[2rem] border border-ink/10 bg-surface shadow-[0_35px_100px_-55px_rgba(15,23,42,0.38)] sm:mt-9 sm:rounded-[2.5rem]">
          <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-brand/20 via-brand/5 to-surface sm:aspect-[2.3/1]">
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

            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/5" />

            <div className="absolute inset-x-0 bottom-0 p-5 pb-20 sm:p-8 sm:pb-24 lg:p-12 lg:pb-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brand"
                />
                {categoryLabel}
              </span>

              <h1 className="mt-3 max-w-4xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {values.title}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-white/85 sm:text-base">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>
                  {values.venue}, {values.city}
                </span>
              </p>
            </div>
          </div>

          {/* Key info ek jaygay rakho, jate beginner ra turant bujhte pare. */}
          <dl className="relative z-10 mx-4 -mt-8 grid grid-cols-2 gap-1 rounded-2xl border border-ink/10 bg-surface p-2 shadow-xl shadow-navy/5 sm:mx-8 lg:grid-cols-4">
            <EventFact
              icon={CalendarDays}
              label="Date"
              value={formatEventDate(values.date)}
            />
            <EventFact icon={Clock3} label="Time" value={timeRange} />
            <EventFact
              icon={MapPin}
              label="Location"
              value={`${values.venue}, ${values.city}`}
            />
            <EventFact
              icon={UsersRound}
              label="Capacity"
              value={`${values.capacity} spots`}
            />
          </dl>

          <div className="mx-4 mt-5 flex flex-col gap-4 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/10 via-brand/5 to-surface p-5 sm:mx-8 sm:flex-row sm:items-center sm:justify-between lg:mx-12">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                <HeartHandshake aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-ink">
                  Join this event
                </h2>
                <p className="mt-1 text-sm leading-6 text-ink/55">
                  Your spot helps the organizer plan ahead.
                </p>
              </div>
            </div>

            <div className="sm:w-56">
              <JoinEventButton
                eventId={id}
                initialJoined={joinSummary.joined}
                initialCount={joinSummary.count}
                isAuthenticated={Boolean(session)}
              />
            </div>
          </div>

          <div className="grid gap-8 p-5 pt-8 sm:p-8 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14 lg:p-12 lg:pt-12">
            <div>
              <section aria-labelledby="about-heading">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                  Event overview
                </p>
                <h2
                  id="about-heading"
                  className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
                >
                  About this event
                </h2>
                <p className="mt-4 whitespace-pre-line text-pretty text-sm leading-7 text-ink/65 sm:text-base sm:leading-8">
                  {values.description}
                </p>
              </section>

              <section
                aria-labelledby="location-heading"
                className="mt-8 rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <MapPin aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <div>
                      <h2
                        id="location-heading"
                        className="text-base font-semibold text-ink"
                      >
                        Where to meet
                      </h2>
                      <p className="mt-1 text-sm font-medium text-ink/70">
                        {values.venue}
                      </p>
                      <p className="text-sm text-ink/45">{values.city}</p>
                    </div>
                  </div>

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-4 py-2.5 text-xs font-semibold text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none"
                  >
                    Open in Google Maps
                    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 via-surface to-surface p-6 shadow-sm">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl"
                />

                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                  <Compass aria-hidden="true" className="h-5 w-5" />
                </span>

                <h2 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                  More ways to make a difference
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/60">
                  Find another cause close to your heart, or bring your own idea
                  to life.
                </p>

                <div className="mt-5 flex flex-col gap-2.5">
                  <Link
                    href="/upcoming-event"
                    className="group inline-flex min-h-11 items-center justify-between gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand/95 hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none"
                  >
                    Explore more events
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    />
                  </Link>

                  <Link
                    href="/create-event"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none"
                  >
                    Create an event
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
};

const EventLoadError = () => (
  <main className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-canvas px-4 py-16">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(22, 163, 74, 0.12), transparent 35%)",
      }}
    />

    <div
      role="alert"
      className="w-full max-w-lg rounded-[2rem] border border-ink/10 bg-surface p-8 text-center shadow-[0_35px_100px_-55px_rgba(15,23,42,0.38)] sm:p-10"
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <CalendarDays aria-hidden="true" className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">
        Event details are unavailable
      </h1>
      <p className="mt-3 text-sm leading-6 text-ink/60">
        We couldn&apos;t load this event right now. Please try again in a
        moment.
      </p>
      <Link
        href="/upcoming-event"
        className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand/95 hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to upcoming events
      </Link>
    </div>
  </main>
);

export default DetailsPage;
