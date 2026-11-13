import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import { auth } from "@/app/lib/auth";
import { eventApiUrl } from "@/app/lib/event-api";
import EditEventForm from "@/components/events/my-events-details/EditEventForm";
import type { IEvent } from "@/types";

export const metadata: Metadata = {
  title: "Edit Event | ChangeNest",
  description:
    "Update your volunteer event details so your community knows what to expect.",
};

type EventEditPageProps = {
  searchParams: Promise<{ id?: string | string[] }>;
};

const isIEvent = (value: unknown): value is IEvent => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record._id === "string" &&
    typeof record.values === "object" &&
    record.values !== null &&
    !Array.isArray(record.values)
  );
};

const EventEditError = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <main className="flex min-h-[70vh] items-center justify-center bg-canvas px-4 py-16">
    <div className="w-full max-w-lg rounded-[2rem] border border-ink/10 bg-surface p-8 text-center shadow-xl shadow-navy/5 sm:p-10">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <FiAlertCircle aria-hidden="true" className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-ink/60">{description}</p>
      <Link
        href="/my-events"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to my events
      </Link>
    </div>
  </main>
);

const EventEditPage = async ({ searchParams }: EventEditPageProps) => {
  const params = await searchParams;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const authHeaders = await headers();
  const session = await auth.api.getSession({ headers: authHeaders });

  if (!session) {
    const nextPath = id
      ? `/event-edit?id=${encodeURIComponent(id)}`
      : "/my-events";
    redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);
  }

  if (!id) {
    return (
      <EventEditError
        title="Choose an event to edit"
        description="Open this page from one of your events so we know which one to update."
      />
    );
  }

  let event: IEvent | null = null;
  let loadFailed = false;

  try {
    const jwtToken = await auth.api.getToken({ headers: authHeaders });
    const token = jwtToken?.token;

    if (!token) {
      loadFailed = true;
    } else {
      const response = await fetch(eventApiUrl("my-events"), {
        headers: { authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (!response.ok) {
        loadFailed = true;
      } else {
        const data: unknown = await response.json();

        if (Array.isArray(data)) {
          event =
            data.find(
              (item): item is IEvent => isIEvent(item) && item._id === id,
            ) ?? null;
        }
      }
    }
  } catch {
    loadFailed = true;
  }

  if (loadFailed) {
    return (
      <EventEditError
        title="Event details are unavailable"
        description="We couldn't load this event right now. Please try again in a moment."
      />
    );
  }

  if (!event) {
    return (
      <EventEditError
        title="Event not found"
        description="This event doesn't exist, or it isn't one of your events to edit."
      />
    );
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 8%, rgba(22, 163, 74, 0.14), transparent 30%), radial-gradient(circle at 8% 92%, color-mix(in srgb, var(--color-ink) 7%, transparent), transparent 34%)",
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          href="/my-events"
          className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-4 py-2.5 text-sm font-semibold text-ink/70 shadow-sm transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <FiArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          />
          Back to my events
        </Link>

        <header className="rise-in mt-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            Manage event
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Edit your event
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/60 sm:text-base">
            Update the details volunteers see, then save your changes. The
            current event is{" "}
            <span className="font-semibold text-ink">{event.values.title}</span>
            .
          </p>
        </header>

        <div className="rise-in mt-8 rounded-[2rem] border border-ink/10 bg-surface p-5 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.5)] sm:mt-10 sm:rounded-[2.5rem] sm:p-8 lg:p-10">
          <EditEventForm event={event} />
        </div>
      </div>
    </main>
  );
};

export default EventEditPage;
