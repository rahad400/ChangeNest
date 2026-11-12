import { isIEvent, isUpcomingEvent } from "@/app/lib/event-display";
import type { IEvent } from "@/types";

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
    const response = await fetch("http://localhost:8000/upcoming-events", {
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
      `http://localhost:8000/details-event/${encodeURIComponent(id)}`,
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
  userId: string,
  queryKey: "createdBy" | "userId",
): Promise<EventsResult> => {
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    return { events: [], failed: true };
  }

  try {
    const response = await fetch(
      `http://localhost:8000/${path}?${queryKey}=${encodeURIComponent(userId)}`,
      {
        headers: { "x-internal-api-secret": secret },
        cache: "no-store",
      },
    );

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
export const fetchJoinedEvents = (userId: string): Promise<EventsResult> =>
  fetchUserEvents("my-joined-events", userId, "userId");

// Fetch events created by the user
export const fetchCreatedEvents = (userId: string): Promise<EventsResult> =>
  fetchUserEvents("my-events", userId, "createdBy");
