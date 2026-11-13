"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { eventApiUrl } from "@/app/lib/event-api";

export type JoinEventResult =
  | { status: "joined"; count: number }
  | { status: "unauthenticated" }
  | { status: "error"; message: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const eventIdPattern = /^[a-f0-9]{24}$/i;

export async function joinEvent(eventId: string): Promise<JoinEventResult> {
  if (!eventIdPattern.test(eventId)) {
    return { status: "error", message: "This event link looks invalid." };
  }

  const reqHearder = await headers();

  const session = await auth.api.getSession({ headers: reqHearder });

  if (!session) {
    return { status: "unauthenticated" };
  }

  try {
    const jwtToken = await auth.api.getToken({
      headers: reqHearder,
    });
    const token = jwtToken?.token;
    if (!token) {
      return {
        status: "error",
        message: "Joining is not configured right now. Please try again later.",
      };
    }
    const response = await fetch(
      eventApiUrl(`join-event/${encodeURIComponent(eventId)}`),
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        status: "error",
        message: "We couldn't join this event. Please try again.",
      };
    }

    const data: unknown = await response.json();
    const count =
      isRecord(data) && typeof data.count === "number" ? data.count : 0;

    revalidatePath(`/upcoming-event/${eventId}`);

    return { status: "joined", count };
  } catch {
    return {
      status: "error",
      message:
        "We couldn't join this event. Check your connection and try again.",
    };
  }
}
