import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiEdit2, FiMapPin, FiTrash2 } from "react-icons/fi";
import type { IEvent } from "@/types";

type MyEventsCardProps = {
  event: IEvent;
};

const MyEventsCard = ({ event }: MyEventsCardProps) => {


  const imageSource = event.image?.url || event.image?.dataUrl;

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-surface p-4 shadow-sm shadow-navy/5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
        {imageSource ? (
          <Image
            src={imageSource}
            alt={event.values.title}
            width={160}
            height={160}
            unoptimized
            className="h-40 w-full rounded-xl object-cover sm:w-40"
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center rounded-xl bg-brand/10 text-sm font-semibold text-brand sm:w-40">
            No image
          </div>
        )}

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold tracking-tight text-ink">
            {event.values.title}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/55">
            <FiMapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {event.values.venue}, {event.values.city}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/55">
            <FiCalendar aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {event.values.date} · {event.values.startTime}–{event.values.endTime}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/event-edit?id=${event._id}`}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <FiEdit2 aria-hidden="true" className="h-3.5 w-3.5" />
          Edit
        </Link>
        <Link
          href={`/upcoming-event/${event._id}`}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          View details
        </Link>
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-red-500 rounded-full px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          <FiTrash2 aria-hidden="true" className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </article>
  );
};

export default MyEventsCard;
