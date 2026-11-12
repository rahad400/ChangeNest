"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCalendar, FiMapPin, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { formatEventDate, formatEventTime } from "@/app/lib/event-form";
import { leaveJoinedEvent } from "@/app/lib/leave-event-action";
import type { IEvent } from "@/types";

type JoinedEventCardProps = {
  event: IEvent;
};

const JoinedEventCard = ({ event }: JoinedEventCardProps) => {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  const { values, image } = event;
  const imageSource = image?.url || image?.dataUrl;
  const dateLabel = formatEventDate(values.date) || values.date;
  const startLabel = formatEventTime(values.startTime) || values.startTime;
  const endLabel = formatEventTime(values.endTime) || values.endTime;

  const handleLeave = async () => {
    if (isLeaving) return;

    const confirmed = window.confirm(
      `Leave "${values.title}"? You can join again anytime.`,
    );

    if (!confirmed) return;

    setIsLeaving(true);

    try {
      const result = await leaveJoinedEvent(event._id);

      if (result.status === "unauthenticated") {
        router.push(`/sign-in?next=${encodeURIComponent("/my-joined-events")}`);
        return;
      }

      if (result.status === "error") {
        toast.error(result.message);
        setIsLeaving(false);
        return;
      }

      toast.success("You left the event.");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsLeaving(false);
    }
  };

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-surface p-4 shadow-sm shadow-navy/5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
        {imageSource ? (
          <Image
            src={imageSource}
            alt={values.title}
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
            {values.title}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/55">
            <FiMapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {values.venue}, {values.city}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/55">
            <FiCalendar aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {dateLabel} · {startLabel}–{endLabel}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/upcoming-event/${event._id}`}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          View details
        </Link>
        <button
          type="button"
          onClick={handleLeave}
          disabled={isLeaving}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-red-500 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiTrash2 aria-hidden="true" className="h-3.5 w-3.5" />
          {isLeaving ? "Leaving..." : "Leave event"}
        </button>
      </div>
    </article>
  );
};

export default JoinedEventCard;
