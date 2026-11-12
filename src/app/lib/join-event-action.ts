"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export type JoinEventResult =
  | { status: "joined"; count: number }
  | { status: "unauthenticated" }
  | { status: "error"; message: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const eventIdPattern = /^[a-f0-9]{24}$/i;

// Join request server theke pathai, tai userId browser theke spoof kora jabe na.
export async function joinEvent(eventId: string): Promise<JoinEventResult> {
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
      message: "Joining is not configured right now. Please try again later.",
    };
  }

  try {
    const response = await fetch(
      `http://localhost:8000/join-event/${encodeURIComponent(eventId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-api-secret": secret,
        },
        body: JSON.stringify({ userId: session.user.id }),
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
      message: "We couldn't join this event. Check your connection and try again.",
    };
  }
}
