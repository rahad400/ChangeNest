"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Loader2, LogIn, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import { joinEvent } from "@/app/lib/join-event-action";

type JoinEventButtonProps = {
  eventId: string;
  initialJoined: boolean;
  initialCount: number;
  isAuthenticated: boolean;
};

const primaryButtonClasses =
  "inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand/95 hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none";

const JoinEventButton = ({
  eventId,
  initialJoined,
  initialCount,
  isAuthenticated,
}: JoinEventButtonProps) => {
  const router = useRouter();
  const [joined, setJoined] = useState(initialJoined);
  const [count, setCount] = useState(initialCount);
  const [isPending, setIsPending] = useState(false);

  const signInHref = `/sign-in?next=${encodeURIComponent(
    `/upcoming-event/${eventId}`,
  )}`;

  const countLabel =
    count > 0
      ? `${count} volunteer${count === 1 ? "" : "s"} already joined`
      : "Be the first to join";

  const handleJoin = async () => {
    if (isPending || joined) return;

    setIsPending(true);

    try {
      const result = await joinEvent(eventId);

      if (result.status === "unauthenticated") {
        router.push(signInHref);
        return;
      }

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      setJoined(true);
      setCount(result.count);
      toast.success("You joined the event. See you there!");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Link href={signInHref} className={primaryButtonClasses}>
          <LogIn aria-hidden="true" className="h-4 w-4" />
          Sign in to join
        </Link>
      ) : joined ? (
        <div
          role="status"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-5 py-3 text-sm font-semibold text-brand"
        >
          <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
          You&apos;re going
        </div>
      ) : (
        <button
          type="button"
          onClick={handleJoin}
          disabled={isPending}
          className={primaryButtonClasses}
        >
          {isPending ? (
            <Loader2
              aria-hidden="true"
              className="h-4 w-4 animate-spin motion-reduce:animate-none"
            />
          ) : (
            <UserPlus aria-hidden="true" className="h-4 w-4" />
          )}
          {isPending ? "Joining..." : "Join event"}
        </button>
      )}

      <p aria-live="polite" className="mt-2 text-center text-xs text-ink/50">
        {countLabel}
      </p>
    </div>
  );
};

export default JoinEventButton;
