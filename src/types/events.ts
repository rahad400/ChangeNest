import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

// All 8 core categories supported across ChangeNest
export type CategoryId =
  | "environment"
  | "healthcare"
  | "education"
  | "charity"
  | "community-service"
  | "disaster-relief"
  | "animal-welfare"
  | "social-awareness";

// Event category alias for consistency in forms
export type EventCategoryId = CategoryId;

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: string;
  dot: string;
};

// Homepage display event model
export type HomeEvent = {
  id: string;
  title: string;
  categoryId: CategoryId;
  city: string;
  venue: string;
  dateLabel: string;
  month: string;
  day: string;
  time: string;
  attendees: number;
  spotsLeft: number;
  description: string;
  image: StaticImageData;
  featured: boolean;
};

// Event creation form fields
export type EventFormValues = {
  title: string;
  categoryId: EventCategoryId | "";
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  city: string;
  venue: string;
  capacity: string;
  guidelines: boolean;
};

export type EventFormField = keyof EventFormValues;
export type EventFormErrors = Partial<Record<EventFormField, string>>;

// Validated payload ready for MongoDB insertion
export type EventSubmission = {
  title: string;
  categoryId: EventCategoryId;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  city: string;
  venue: string;
  capacity: number;
};


 export interface IEvent {
  _id: string;
  values: {
    title: string;
    categoryId: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    city: string;
    venue: string;
    capacity: string;
  };
  image?: {
    dataUrl?: string | null;
    url?: string | null;
  } | null;
  createdBy?: string;
}
