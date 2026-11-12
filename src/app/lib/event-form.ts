import type {
  EventCategoryId,
  EventFormValues,
  EventFormField,
  EventFormErrors,
  EventSubmission,
} from "@/types";

export type {
  EventCategoryId,
  EventFormValues,
  EventFormField,
  EventFormErrors,
  EventSubmission,
};

// Create event form ar API route duijon ei validation use kore.
export const eventCategories = [
  { id: "environment", label: "Environment" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "charity", label: "Charity" },
  { id: "community-service", label: "Community Service" },
  { id: "disaster-relief", label: "Disaster Relief" },
  { id: "animal-welfare", label: "Animal Welfare" },
  { id: "social-awareness", label: "Social Awareness" },
] as const;

// Home page er city list er sathe miliye rakho.
export const eventCities = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rajshahi",
] as const;

export const maxEventImageSize = 2 * 1024 * 1024;
export const eventImageMimeTypes = ["image/jpeg", "image/png", "image/webp"];

export const isValidEventImageUrl = (value: string) => {
  if (!value || value.length > 2048) return false;

  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
};

export const initialEventFormValues: EventFormValues = {
  title: "",
  categoryId: "",
  description: "",
  date: "",
  startTime: "00:00",
  endTime: "00:00",
  city: "",
  venue: "",
  capacity: "",
  guidelines: false,
};

const categoryIds = new Set<string>(
  eventCategories.map((category) => category.id),
);

const dateInputPattern = /^\d{4}-\d{2}-\d{2}$/;
const timeInputPattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export const isEventCategoryId = (value: string): value is EventCategoryId =>
  categoryIds.has(value);

const isValidDateInput = (value: string) => {
  if (!dateInputPattern.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const localDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const todayDateValue = () => localDateValue(new Date());

export const formatEventDate = (value: string) => {
  if (!isValidDateInput(value)) return "";

  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatEventTime = (value: string) => {
  if (!timeInputPattern.test(value)) return "";

  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
};

export const validateEventForm = (values: EventFormValues): EventFormErrors => {
  const errors: EventFormErrors = {};

  const title = values.title.trim();

  if (!title) {
    errors.title = "Please give your event a name.";
  } else if (title.length < 5) {
    errors.title = "Use at least 5 characters for the event title.";
  } else if (title.length > 120) {
    errors.title = "Keep the event title under 120 characters.";
  }

  if (!isEventCategoryId(values.categoryId)) {
    errors.categoryId = "Choose the cause your event supports.";
  }

  const description = values.description.trim();

  if (!description) {
    errors.description = "Tell volunteers what the event is about.";
  } else if (description.length < 30) {
    errors.description =
      "Add at least 30 characters so people know what to expect.";
  } else if (description.length > 2000) {
    errors.description = "Keep the description under 2,000 characters.";
  }

  if (!isValidDateInput(values.date)) {
    errors.date = "Choose a valid event date.";
  } else {
    const selectedDate = new Date(`${values.date}T00:00:00`);
    const today = new Date(`${todayDateValue()}T00:00:00`);

    if (selectedDate < today) {
      errors.date = "Choose today or a future date.";
    }
  }

  if (!timeInputPattern.test(values.startTime)) {
    errors.startTime = "Choose a start time.";
  }

  if (!timeInputPattern.test(values.endTime)) {
    errors.endTime = "Choose an end time.";
  }

  if (
    !errors.startTime &&
    !errors.endTime &&
    values.endTime <= values.startTime
  ) {
    errors.endTime = "End time must be after the start time.";
  }

  const city = values.city.trim();

  if (!city) {
    errors.city = "Enter the city where the event will happen.";
  } else if (city.length < 2) {
    errors.city = "Enter a valid city name.";
  } else if (city.length > 80) {
    errors.city = "Keep the city name under 80 characters.";
  }

  const venue = values.venue.trim();

  if (!venue) {
    errors.venue = "Enter the venue or meeting point.";
  } else if (venue.length < 3) {
    errors.venue = "Add a little more detail about the venue.";
  } else if (venue.length > 160) {
    errors.venue = "Keep the venue under 160 characters.";
  }

  const capacity = Number(values.capacity);

  if (!values.capacity.trim()) {
    errors.capacity = "Set how many volunteers you can host.";
  } else if (!Number.isInteger(capacity) || capacity < 1) {
    errors.capacity = "Enter a whole number of at least 1.";
  } else if (capacity > 5000) {
    errors.capacity = "Keep capacity at 5,000 volunteers or fewer.";
  }

  if (!values.guidelines) {
    errors.guidelines = "Please agree to the community guidelines.";
  }

  return errors;
};

export const parseEventFormValues = (
  input: unknown,
): EventFormValues | null => {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }

  const record = input as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" ? value : "");

  return {
    title: text(record.title),
    categoryId: text(record.categoryId) as EventFormValues["categoryId"],
    description: text(record.description),
    date: text(record.date),
    startTime: text(record.startTime),
    endTime: text(record.endTime),
    city: text(record.city),
    venue: text(record.venue),
    capacity:
      typeof record.capacity === "number"
        ? String(record.capacity)
        : text(record.capacity),
    guidelines: record.guidelines === true,
  };
};

export const toEventSubmission = (
  values: EventFormValues,
): EventSubmission | null => {
  if (!isEventCategoryId(values.categoryId)) return null;

  return {
    title: values.title.trim(),
    categoryId: values.categoryId,
    description: values.description.trim(),
    date: values.date,
    startTime: values.startTime,
    endTime: values.endTime,
    city: values.city.trim(),
    venue: values.venue.trim(),
    capacity: Number(values.capacity),
  };
};
