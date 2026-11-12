import {
  eventCategories,
  formatEventDate,
  formatEventTime,
  todayDateValue,
} from "@/app/lib/event-form";
import type { IEvent } from "@/types";

// Check if a value is an object (not null and not an array)
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// MongoDB ObjectId is a 24-character hexadecimal string
const objectIdPattern = /^[a-f0-9]{24}$/i;

// Type guard to verify if an incoming object matches the IEvent interface
export const isIEvent = (value: unknown): value is IEvent => {
  if (!isRecord(value) || !isRecord(value.values)) return false;

  const eventValues = value.values;
  const requiredFields = [
    "title",
    "categoryId",
    "description",
    "date",
    "startTime",
    "endTime",
    "city",
    "venue",
    "capacity",
  ];

  return (
    typeof value._id === "string" &&
    requiredFields.every((field) => typeof eventValues[field] === "string")
  );
};

// Returns true if the event date is today or in the future
export const isUpcomingEvent = (event: IEvent): boolean =>
  event.values.date >= todayDateValue();

// Converts a category ID (e.g. "animal-welfare") into a readable title (e.g. "Animal Welfare")
export const getEventCategoryLabel = (categoryId: string): string =>
  eventCategories.find((category) => category.id === categoryId)?.label ??
  categoryId.replaceAll("-", " ");

// Color themes matching each cause category
export type CategoryTheme = {
  badge: string;
  dot: string;
};

const categoryThemeMap: Record<string, CategoryTheme> = {
  environment: {
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  healthcare: {
    badge: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    dot: "bg-rose-500",
  },
  education: {
    badge: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
    dot: "bg-sky-500",
  },
  charity: {
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    dot: "bg-amber-500",
  },
  "community-service": {
    badge: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20",
    dot: "bg-violet-500",
  },
  "disaster-relief": {
    badge: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    dot: "bg-orange-500",
  },
  "animal-welfare": {
    badge: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
    dot: "bg-teal-500",
  },
  "social-awareness": {
    badge: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
    dot: "bg-indigo-500",
  },
};

const defaultCategoryTheme: CategoryTheme = {
  badge: "bg-brand/10 text-brand border-brand/20",
  dot: "bg-brand",
};

// Returns badge and dot color classes for a category
export const getCategoryTheme = (categoryId: string): CategoryTheme =>
  categoryThemeMap[categoryId] ?? defaultCategoryTheme;

// Formats date string into readable text (e.g. "Sat, Nov 21, 2026")
export const getEventDateLabel = (date: string): string =>
  formatEventDate(date) || date;

// Formats time string into 12-hour format with AM/PM (e.g. "9:00 AM")
export const getEventTimeLabel = (time: string): string =>
  formatEventTime(time) || time;

// Combines start and end time into a single range label (e.g. "9:00 AM – 1:00 PM")
export const getEventTimeRange = (startTime: string, endTime: string): string => {
  const start = getEventTimeLabel(startTime);
  const end = getEventTimeLabel(endTime);

  if (start && end) return `${start} – ${end}`;
  return start || end || "";
};

// Safely extracts the displayable image URL from an event
export const getEventImageUrl = (image?: IEvent["image"]): string | null => {
  if (!image) return null;
  return image.url || image.dataUrl || null;
};

// Formats the volunteer capacity label with graceful fallback
export const getEventCapacityLabel = (
  capacity: string | number | undefined,
): string => {
  const numericCapacity = Number(capacity);
  if (Number.isFinite(numericCapacity) && numericCapacity > 0) {
    return `Up to ${numericCapacity} volunteers`;
  }
  return "Open capacity";
};

// Combines venue and city into a readable location string
export const getEventLocation = (venue: string, city: string): string => {
  const cleanVenue = venue.trim();
  const cleanCity = city.trim();

  if (cleanVenue && cleanCity) return `${cleanVenue}, ${cleanCity}`;
  return cleanVenue || cleanCity || "Location to be announced";
};

// Extracts creation timestamp from MongoDB ObjectId (first 4 bytes represent seconds)
export const getEventTimestamp = (event: IEvent): number => {
  if (!objectIdPattern.test(event._id)) return 0;

  return Number.parseInt(event._id.slice(0, 8), 16) * 1000;
};
