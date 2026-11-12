"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export type LeaveEventResult =
  | { status: "left" }
  | { status: "unauthenticated" }
  | { status: "error"; message: string };

const eventIdPattern = /^[a-f0-9]{24}$/i;

// Leave request server theke pathai, tai userId browser theke spoof kora jabe na.
export async function leaveJoinedEvent(
  eventId: string,
): Promise<LeaveEventResult> {
  if (!eventIdPattern.test(eventId)) {
    return { status: "error", message: "This event link looks invalid." };
  }

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { status: "unauthenticated" };
  }

  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    return {
      status: "error",
      message: "Leaving events is not configured right now. Please try again later.",
    };
  }

  try {
    const response = await fetch(
      `http://localhost:8000/leave-event/${encodeURIComponent(eventId)}?userId=${encodeURIComponent(session.user.id)}`,
      {
        method: "DELETE",
        headers: { "x-internal-api-secret": secret },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        status: "error",
        message: "We couldn't update your joined events. Please try again.",
      };
    }

    revalidatePath("/my-joined-events");
    revalidatePath(`/upcoming-event/${eventId}`);

    return { status: "left" };
  } catch {
    return {
      status: "error",
      message:
        "We couldn't update your joined events. Check your connection and try again.",
    };
  }
}
