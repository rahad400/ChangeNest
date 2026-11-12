import { IEvent } from "@/types/events";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

interface UpcomingEventsCardProps {
  event: IEvent;
}

const UpcomingEventsCard = ({ event }: UpcomingEventsCardProps) => {
  const { values, image } = event;

  const eventImage = image?.url || image?.dataUrl;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Event Image */}
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-200">
        {eventImage ? (
          <Image
            src={eventImage}
            alt={values.title}
            fill
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <span className="text-4xl">🌱</span>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold capitalize text-emerald-700 shadow-sm">
          {values.categoryId.replace("-", " ")}
        </span>

        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm">
          <CalendarDays size={12} />
          {values.date}
        </span>
      </div>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock3 size={14} />
          <span>
            {values.startTime} - {values.endTime}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-emerald-600 line-clamp-1">
          {values.title}
        </h3>

        <div className="mt-3 space-y-2 text-xs text-gray-600">
          <p className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-emerald-600" />
            <span className="line-clamp-1">
              {values.venue}, {values.city}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Users size={15} className="shrink-0 text-emerald-600" />
            Capacity: {values.capacity}
          </p>
        </div>

        <Link
          href={`/upcoming-event/${event._id}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
        >
          View Details
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
};

export default UpcomingEventsCard;
