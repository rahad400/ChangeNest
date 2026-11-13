"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { eventApiUrl } from "@/app/lib/event-api";

export type LeaveEventResult =
  | { status: "left" }
  | { status: "unauthenticated" }
  | { status: "error"; message: string };

const eventIdPattern = /^[a-f0-9]{24}$/i;

export async function leaveJoinedEvent(
  eventId: string,
): Promise<LeaveEventResult> {
  if (!eventIdPattern.test(eventId)) {
    return { status: "error", message: "This event link looks invalid." };
  }

  const authHeaders = await headers();
  const session = await auth.api.getSession({ headers: authHeaders });

  if (!session) {
    return { status: "unauthenticated" };
  }

  try {
    const jwtToken = await auth.api.getToken({ headers: authHeaders });
    const token = jwtToken?.token;
    if (!token) {
      return {
        status: "error",
        message:
          "Leaving events is not configured right now. Please try again later.",
      };
    }
    const response = await fetch(
      eventApiUrl(`leave-event/${encodeURIComponent(eventId)}`),
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
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
