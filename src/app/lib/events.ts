import { auth } from "@/app/lib/auth";
import { eventApiUrl } from "@/app/lib/event-api";
import { isIEvent, isUpcomingEvent } from "@/app/lib/event-display";
import type { IEvent } from "@/types";
import { headers } from "next/headers";

// Standard result for list-based event queries
export type EventsResult = {
  events: IEvent[];
  failed: boolean;
};

// Standard result for single event queries
export type SingleEventResult = {
  event: IEvent | null;
  notFound: boolean;
  failed: boolean;
};

// Safely converts unknown backend data into a validated array of IEvent items
const parseEvents = (data: unknown): IEvent[] =>
  Array.isArray(data) ? data.filter(isIEvent) : [];

// Fetch all upcoming events (filters out events whose dates are in the past)
export const fetchUpcomingEvents = async (): Promise<EventsResult> => {
  try {
    const response = await fetch(eventApiUrl("upcoming-events"), {
      cache: "no-store",
    });

    if (!response.ok) {
      return { events: [], failed: true };
    }

    const data: unknown = await response.json();

    return {
      events: parseEvents(data).filter(isUpcomingEvent),
      failed: false,
    };
  } catch {
    return { events: [], failed: true };
  }
};

// Fetch a single event by its 24-character hexadecimal MongoDB ObjectId
export const fetchEventById = async (
  id: string,
): Promise<SingleEventResult> => {
  // Return notFound early if ID is not a valid 24-character hex string
  if (!/^[a-f0-9]{24}$/i.test(id)) {
    return { event: null, notFound: true, failed: false };
  }

  try {
    const response = await fetch(
      eventApiUrl(`details-event/${encodeURIComponent(id)}`),
      { cache: "no-store" },
    );

    if (response.status === 404) {
      return { event: null, notFound: true, failed: false };
    }

    if (!response.ok) {
      return { event: null, notFound: false, failed: true };
    }

    const data: unknown = await response.json();

    if (!isIEvent(data)) {
      return { event: null, notFound: false, failed: true };
    }

    return { event: data, notFound: false, failed: false };
  } catch {
    return { event: null, notFound: false, failed: true };
  }
};

// Generic helper to fetch events for a specific user (joined or created)
const fetchUserEvents = async (
  path: "my-events" | "my-joined-events",
): Promise<EventsResult> => {
  try {
    const jwtToken = await auth.api.getToken({ headers: await headers() });
    const token = jwtToken?.token;

    if (!token) {
      return { events: [], failed: true };
    }

    const response = await fetch(eventApiUrl(path), {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return { events: [], failed: true };
    }

    const data: unknown = await response.json();

    return { events: parseEvents(data), failed: false };
  } catch {
    return { events: [], failed: true };
  }
};

// Fetch events the user has joined
export const fetchJoinedEvents = (): Promise<EventsResult> =>
  fetchUserEvents("my-joined-events");

// Fetch events created by the user
export const fetchCreatedEvents = (): Promise<EventsResult> =>
  fetchUserEvents("my-events");
