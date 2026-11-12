import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";
import {
  getCategoryTheme,
  getEventCategoryLabel,
  getEventCapacityLabel,
  getEventDateLabel,
  getEventImageUrl,
  getEventLocation,
  getEventTimeRange,
} from "@/app/lib/event-display";
import type { IEvent } from "@/types";

interface UpcomingEventsCardProps {
  event: IEvent;
}

const UpcomingEventsCard = ({ event }: UpcomingEventsCardProps) => {
  const { values, image } = event;

  const eventImage = getEventImageUrl(image);
  const categoryLabel = getEventCategoryLabel(values.categoryId);
  const categoryTheme = getCategoryTheme(values.categoryId);
  const dateLabel = getEventDateLabel(values.date);
  const timeRangeLabel = getEventTimeRange(values.startTime, values.endTime);
  const locationLabel = getEventLocation(values.venue, values.city);
  const capacityLabel = getEventCapacityLabel(values.capacity);
  const detailsHref = `/upcoming-event/${event._id}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-surface shadow-sm shadow-navy/5 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-navy/10 motion-reduce:transform-none">
      {/* Event Image Banner or Friendly Fallback */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-gradient-to-br from-brand/20 via-brand/5 to-surface">
        {eventImage ? (
          <Image
            src={eventImage}
            alt={`${values.title} community event`}
            fill
            unoptimized
            sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <CalendarDays
              aria-hidden="true"
              className="h-12 w-12 text-brand/50"
            />
          </div>
        )}

        {/* Cause Category Badge with Category-Specific Color Accent */}
        <span
          className={`absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 truncate rounded-full border bg-surface/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-sm backdrop-blur ${categoryTheme.badge}`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${categoryTheme.dot}`}
          />
          <span className="truncate">{categoryLabel}</span>
        </span>
      </div>

      {/* Event Details Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Date and Time Header */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-ink/45">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
            {dateLabel}
          </span>
          {timeRangeLabel ? (
            <>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink/20" />
              <span className="inline-flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                {timeRangeLabel}
              </span>
            </>
          ) : null}
        </div>

        {/* Event Title */}
        <h3 className="mt-2.5 line-clamp-2 text-lg font-bold tracking-tight text-ink">
          <Link
            href={detailsHref}
            className="outline-none transition-colors hover:text-brand focus-visible:underline"
          >
            {values.title}
          </Link>
        </h3>

        {/* Location */}
        <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-ink/55">
          <MapPin
            aria-hidden="true"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
          />
          <span className="line-clamp-2">{locationLabel}</span>
        </p>

        {/* Footer: Capacity and Action Button */}
        <div className="mt-auto pt-5">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink/50">
            <UsersRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand/70" />
            {capacityLabel}
          </p>

          <Link
            href={detailsHref}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            View details
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default UpcomingEventsCard;
