"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Checkbox,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiImage,
  FiLink,
  FiLoader,
  FiMapPin,
  FiSave,
  FiUpload,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import {
  eventCategories,
  eventCities,
  eventImageMimeTypes,
  formatEventDate,
  formatEventTime,
  initialEventFormValues,
  isValidEventImageUrl,
  isEventCategoryId,
  maxEventImageSize,
  parseEventFormValues,
  todayDateValue,
  validateEventForm,
  type EventFormErrors,
  type EventFormField,
  type EventFormValues,
} from "@/app/lib/event-form";

type CreateEventFormProps = {
  userId: string;
};

type ImageSource = "upload" | "link";

type EventDraft = {
  values: EventFormValues;
  imageSource: ImageSource;
  imageUrl: string;
};

type DraftStore = {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => string | null;
  getServerSnapshot: () => null;
  save: (draft: EventDraft) => void;
  clear: () => void;
};

const DRAFT_KEY_PREFIX = "changenest:create-event-draft:v1:";
const DRAFT_SAVE_DELAY = 600;
const REQUIRED_DETAIL_COUNT = Object.keys(initialEventFormValues).length;
const timeInputPattern = /^([01]\d|2[0-3]):[0-5]\d$/;

const fieldLabels: Record<EventFormField, string> = {
  title: "Event name",
  categoryId: "Cause",
  description: "Description",
  date: "Date",
  startTime: "Start time",
  endTime: "End time",
  city: "City",
  venue: "Venue",
  capacity: "Volunteer spots",
  guidelines: "Community guidelines",
};

const fieldElementIds: Record<EventFormField, string> = {
  title: "event-title",
  categoryId: "event-category",
  description: "event-description",
  date: "event-date",
  startTime: "event-start-time",
  endTime: "event-end-time",
  city: "event-city",
  venue: "event-venue",
  capacity: "event-capacity",
  guidelines: "event-guidelines",
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isEventFormErrors = (value: unknown): value is EventFormErrors => {
  if (!isRecord(value)) return false;

  const fields = Object.keys(fieldLabels);

  return Object.entries(value).every(
    ([field, message]) => fields.includes(field) && typeof message === "string",
  );
};

// Draft localStorage e rakhi, jate refresh ba tab close hole kaj na hari.
const createDraftStore = (userId: string): DraftStore => {
  const key = `${DRAFT_KEY_PREFIX}${userId}`;

  return {
    subscribe(callback) {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    getSnapshot() {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    getServerSnapshot() {
      return null;
    },
    save(draft) {
      try {
        window.localStorage.setItem(key, JSON.stringify(draft));
      } catch {
        // Storage blocked ba full hole draft save hobe na.
      }
    },
    clear() {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Storage blocked hole kichu korar nei.
      }
    },
  };
};

const hasDraftContent = (values: EventFormValues, imageUrl: string) => {
  if (imageUrl.trim()) return true;

  return Object.entries(values).some(([field, value]) =>
    field === "guidelines"
      ? value === true
      : typeof value === "string" && value.trim().length > 0,
  );
};

const parseDraft = (raw: string | null): EventDraft | null => {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!isRecord(parsed)) return null;

    const values = parseEventFormValues(parsed.values);

    if (!values) return null;

    return {
      values: {
        ...values,
        categoryId: isEventCategoryId(values.categoryId)
          ? values.categoryId
          : "",
      },
      imageSource: parsed.imageSource === "link" ? "link" : "upload",
      imageUrl:
        typeof parsed.imageUrl === "string"
          ? parsed.imageUrl.slice(0, 2048)
          : "",
    };
  } catch {
    return null;
  }
};

const addHoursToTime = (value: string, hours: number) => {
  if (!timeInputPattern.test(value)) return "";

  const [hour, minute] = value.split(":").map(Number);
  const totalMinutes = Math.min(hour * 60 + minute + hours * 60, 23 * 60 + 59);
  const nextHour = Math.floor(totalMinutes / 60);
  const nextMinute = totalMinutes % 60;

  return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(
    2,
    "0",
  )}`;
};

const getDurationLabel = (start: string, end: string) => {
  if (
    !timeInputPattern.test(start) ||
    !timeInputPattern.test(end) ||
    end <= start
  ) {
    return "";
  }

  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  const totalMinutes =
    endHour * 60 + endMinute - (startHour * 60 + startMinute);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return [hours > 0 ? `${hours} hr` : "", minutes > 0 ? `${minutes} min` : ""]
    .filter(Boolean)
    .join(" ");
};

const SectionHeading = ({
  step,
  kicker,
  title,
  description,
  headingId,
  icon,
  optional = false,
}: {
  step: string;
  kicker: string;
  title: string;
  description: string;
  headingId: string;
  icon: ReactNode;
  optional?: boolean;
}) => (
  <div className="mb-6 flex items-start gap-4">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
      {icon}
    </span>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
        Step {step} · {kicker}
      </p>
      <h2
        id={headingId}
        className="mt-1 text-xl font-semibold tracking-tight text-ink"
      >
        {title}
        {optional && (
          <span className="ml-2 align-middle text-xs font-normal text-ink/45">
            Optional
          </span>
        )}
      </h2>
      <p className="mt-1 text-sm leading-6 text-ink/60">{description}</p>
    </div>
  </div>
);

const DiscardDialog = ({
  open,
  onClose,
  onDiscard,
}: {
  open: boolean;
  onClose: () => void;
  onDiscard: () => void;
}) => {
  const keepEditingRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) keepEditingRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy/50 backdrop-blur-sm"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="discard-draft-title"
        aria-describedby="discard-draft-description"
        className="rise-in relative w-full max-w-md rounded-3xl border border-ink/10 bg-surface p-6 shadow-2xl shadow-navy/20 sm:p-7"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
          <FiAlertCircle aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2
          id="discard-draft-title"
          className="mt-4 text-xl font-semibold tracking-tight text-ink"
        >
          Discard this draft?
        </h2>
        <p
          id="discard-draft-description"
          className="mt-2 text-sm leading-6 text-ink/60"
        >
          Your unsaved changes and the draft saved on this device will be
          removed. This can&apos;t be undone.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={keepEditingRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/25 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Keep editing
          </button>
          <button
            type="button"
            onClick={onDiscard}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Discard draft
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateEventForm = ({ userId }: CreateEventFormProps) => {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const categoryTriggerRef = useRef<HTMLButtonElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const lastFocusedAttemptRef = useRef(0);

  const [draftStore] = useState(() => createDraftStore(userId));
  const storedDraft = useSyncExternalStore(
    draftStore.subscribe,
    draftStore.getSnapshot,
    draftStore.getServerSnapshot,
  );

  const [values, setValues] = useState(initialEventFormValues);
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [draftNoticeDismissed, setDraftNoticeDismissed] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [image, setImage] = useState<{
    dataUrl: string;
    fileName: string;
  } | null>(null);
  const [imageSource, setImageSource] = useState<ImageSource>("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [imageUrlTouched, setImageUrlTouched] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const hasStoredDraft = Boolean(storedDraft) && !draftNoticeDismissed;
  const liveErrors = validateEventForm(values);
  const errorEntries = (
    Object.entries(errors) as [EventFormField, string][]
  ).filter(([, message]) => Boolean(message));
  const errorCount = errorEntries.length;
  const completedRequired = Math.max(
    0,
    REQUIRED_DETAIL_COUNT - Object.keys(liveErrors).length,
  );
  const progressPercent = Math.round(
    (completedRequired / REQUIRED_DETAIL_COUNT) * 100,
  );
  const allRequiredComplete = completedRequired === REQUIRED_DETAIL_COUNT;
  const imageUrlInvalid =
    imageSource === "link" &&
    imageUrl.trim().length > 0 &&
    !isValidEventImageUrl(imageUrl.trim());
  const showImageUrlError =
    imageUrlInvalid && (imageUrlTouched || submitAttempt > 0);
  const allReady = allRequiredComplete && !imageUrlInvalid;
  const isDirty = hasDraftContent(values, imageUrl) || Boolean(image);
  const durationLabel = getDurationLabel(values.startTime, values.endTime);
  const formattedDate = formatEventDate(values.date);
  const detailsComplete =
    !liveErrors.title &&
    !liveErrors.categoryId &&
    !liveErrors.description &&
    !liveErrors.capacity;
  const imageComplete =
    Boolean(image) ||
    (imageSource === "link" && isValidEventImageUrl(imageUrl.trim()));
  const scheduleComplete =
    !liveErrors.date && !liveErrors.startTime && !liveErrors.endTime;
  const locationComplete = !liveErrors.city && !liveErrors.venue;
  const sections = [
    { id: "create-event-details", label: "Details", complete: detailsComplete },
    { id: "create-event-image", label: "Image", complete: imageComplete },
    { id: "create-event-time", label: "Schedule", complete: scheduleComplete },
    {
      id: "create-event-location",
      label: "Location",
      complete: locationComplete,
    },
  ];

  const markInteracted = () => {
    setHasInteracted(true);
    setDraftNoticeDismissed(true);
  };

  const updateField = <K extends EventFormField>(
    field: K,
    value: EventFormValues[K],
  ) => {
    markInteracted();
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validateField = (field: EventFormField) => {
    const nextErrors = validateEventForm(values);

    setErrors((current) => {
      const next = { ...current };

      if (nextErrors[field]) next[field] = nextErrors[field];
      else delete next[field];

      return next;
    });
  };

  const handleStartTimeChange = (value: string) => {
    markInteracted();
    setValues((current) => {
      const next = { ...current, startTime: value };

      if (value && (!current.endTime || current.endTime <= value)) {
        next.endTime = addHoursToTime(value, 2);
      }

      return next;
    });
    setErrors((current) => {
      const next = { ...current };
      delete next.startTime;
      delete next.endTime;
      return next;
    });
  };

  const updateImageUrl = (value: string) => {
    markInteracted();
    setImageUrl(value);
    setImageError("");
  };

  const changeImageSource = (source: ImageSource) => {
    setImageSource(source);
    setImageError("");
  };

  const applyImageFile = (file: File) => {
    if (!eventImageMimeTypes.includes(file.type)) {
      setImageError("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > maxEventImageSize) {
      setImageError("Event images must be 2 MB or smaller.");
      return;
    }

    markInteracted();
    setImageError("");
    setImageSource("upload");

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setImageError("We couldn't read that image. Please try another file.");
        return;
      }

      setImage({ dataUrl: reader.result, fileName: file.name });
    };
    reader.onerror = () => {
      setImageError("We couldn't read that image. Please try another file.");
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (file) applyImageFile(file);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isSubmitting) setIsDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isSubmitting) setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (isSubmitting) return;

    const file = event.dataTransfer.files?.[0];
    if (file) applyImageFile(file);
  };

  const removeImage = () => {
    markInteracted();
    setImage(null);
    setImageError("");
  };

  const resumeDraft = () => {
    const draft = parseDraft(storedDraft);

    if (!draft) {
      draftStore.clear();
      setDraftNoticeDismissed(true);
      toast.error("That draft couldn't be restored. You can start fresh.");
      return;
    }

    setValues(draft.values);
    setImageSource(draft.imageSource);
    setImageUrl(draft.imageUrl);
    setErrors({});
    setSubmitAttempt(0);
    setImageError("");
    setImageUrlTouched(false);
    setHasInteracted(true);
    setDraftNoticeDismissed(true);
    toast.info("Draft restored. Uploaded images aren't saved in drafts.");
  };

  const discardStoredDraft = () => {
    draftStore.clear();
    setDraftNoticeDismissed(true);
  };

  const focusField = (field: EventFormField) => {
    const element =
      field === "categoryId"
        ? categoryTriggerRef.current
        : field === "guidelines"
          ? document.querySelector<HTMLElement>('input[name="guidelines"]')
          : document.getElementById(fieldElementIds[field]);

    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus({ preventScroll: true });
  };

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const requestCancel = () => {
    if (isDirty) {
      setIsCancelDialogOpen(true);
      return;
    }

    router.push("/my-events");
  };

  const confirmCancel = () => {
    draftStore.clear();
    setHasInteracted(false);
    setDraftNoticeDismissed(true);
    setIsCancelDialogOpen(false);
    router.push("/my-events");
  };

  useEffect(() => {
    if (!hasInteracted || isSubmitting) return;

    const timeout = window.setTimeout(() => {
      if (!hasDraftContent(values, imageUrl)) {
        draftStore.clear();
        return;
      }

      draftStore.save({ values, imageSource, imageUrl });
    }, DRAFT_SAVE_DELAY);

    return () => window.clearTimeout(timeout);
  }, [draftStore, hasInteracted, imageSource, imageUrl, isSubmitting, values]);

  useEffect(() => {
    if (!isDirty || isSubmitting) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isSubmitting]);

  useEffect(() => {
    if (submitAttempt === 0 || errorCount === 0) return;
    if (lastFocusedAttemptRef.current === submitAttempt) return;

    lastFocusedAttemptRef.current = submitAttempt;
    summaryRef.current?.focus({ preventScroll: true });
    summaryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [errorCount, submitAttempt]);

  const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    if (!userId) {
      toast.error("You must be logged in to create an event.");
      return;
    }

    const nextErrors = validateEventForm(values);
    setErrors(nextErrors);
    setSubmitAttempt((current) => current + 1);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    const trimmedImageUrl = imageUrl.trim();

    if (
      imageSource === "link" &&
      trimmedImageUrl &&
      !isValidEventImageUrl(trimmedImageUrl)
    ) {
      setImageUrlTouched(true);
      toast.error(
        "Enter a valid image link beginning with http:// or https://.",
      );

      const input = document.getElementById("event-image-url");
      input?.scrollIntoView({ behavior: "smooth", block: "center" });
      input?.focus({ preventScroll: true });
      return;
    }

    setIsSubmitting(true);

    const submissionValues: EventFormValues = {
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      city: values.city.trim(),
      venue: values.venue.trim(),
      capacity: values.capacity.trim(),
    };

    try {
      const response = await fetch("/api/my-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: submissionValues,
          image:
            imageSource === "link"
              ? trimmedImageUrl
                ? { url: trimmedImageUrl }
                : null
              : image
                ? {
                    dataUrl: image.dataUrl,
                    fileName: image.fileName,
                  }
                : null,
        }),
      });

      let result: unknown;

      try {
        result = await response.json();
      } catch {
        toast.error("We couldn't read the server response. Please try again.");
        return;
      }

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session expired. Please sign in again.");
          router.push("/sign-in");
          return;
        }

        if (isRecord(result)) {
          if (isEventFormErrors(result.errors)) {
            setErrors(result.errors);
          }

          if (typeof result.error === "string") {
            toast.error(result.error);
            return;
          }

          if (typeof result.message === "string") {
            toast.error(result.message);
            return;
          }
        }

        toast.error("We couldn't create your event. Please try again.");
        return;
      }

      draftStore.clear();
      setHasInteracted(false);
      toast.success("Your event has been created.");
      router.push("/my-events");
      router.refresh();
    } catch {
      toast.error("Couldn't connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        className="create-event-form"
      >
        <div className="space-y-5">
          {hasStoredDraft && (
            <div
              role="status"
              className="flex flex-col gap-3 rounded-2xl border border-brand/20 bg-brand/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <FiSave aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    You have an unsaved draft
                  </p>
                  <p className="mt-1 text-xs leading-5 text-ink/55">
                    Resume where you left off, or discard it. Uploaded images
                    aren&apos;t saved in drafts.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 pl-12 sm:pl-0">
                <button
                  type="button"
                  onClick={resumeDraft}
                  className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  Resume draft
                </button>
                <button
                  type="button"
                  onClick={discardStoredDraft}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:text-red-400"
                >
                  Discard
                </button>
              </div>
            </div>
          )}

          {submitAttempt > 0 && errorCount > 0 && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              aria-labelledby="create-event-error-summary"
              className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              <div className="flex items-start gap-3">
                <FiAlertCircle
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400"
                />
                <div>
                  <h2
                    id="create-event-error-summary"
                    className="text-sm font-semibold text-red-700 dark:text-red-300"
                  >
                    Please fix{" "}
                    {errorCount === 1 ? "1 field" : `${errorCount} fields`}
                  </h2>
                  <ul className="mt-2 space-y-1.5">
                    {errorEntries.map(([field, message]) => (
                      <li key={field}>
                        <button
                          type="button"
                          onClick={() => focusField(field)}
                          className="text-left text-xs font-medium text-red-700 underline-offset-2 hover:underline dark:text-red-300"
                        >
                          {fieldLabels[field]}: {message}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-ink/10 bg-canvas/70 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Event setup
              </p>
              <p className="text-xs font-medium text-ink/55">
                {allReady
                  ? "All required details complete"
                  : allRequiredComplete
                    ? "Check the image link"
                    : `${completedRequired} of ${REQUIRED_DETAIL_COUNT} required details`}
              </p>
            </div>
            <div
              role="progressbar"
              aria-label="Required event details completed"
              aria-valuemin={0}
              aria-valuemax={REQUIRED_DETAIL_COUNT}
              aria-valuenow={completedRequired}
              aria-valuetext={`${completedRequired} of ${REQUIRED_DETAIL_COUNT} required details complete`}
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10"
            >
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <nav
              aria-label="Jump to a form section"
              className="mt-4 flex flex-wrap gap-2"
            >
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
                    section.complete
                      ? "border-brand/25 bg-brand/10 text-brand"
                      : "border-ink/10 bg-surface text-ink/60 hover:border-ink/20 hover:text-ink"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${
                      section.complete
                        ? "bg-brand text-white"
                        : "bg-ink/5 text-ink/50"
                    }`}
                  >
                    {section.complete ? (
                      <FiCheck aria-hidden="true" className="h-2.5 w-2.5" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  {section.label}
                </button>
              ))}
            </nav>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ink/45">
              <FiSave aria-hidden="true" className="h-3 w-3 shrink-0" />
              Your progress is saved automatically on this device.
            </p>
          </div>

          <section
            id="create-event-details"
            aria-labelledby="event-details-heading"
            className="scroll-mt-24 rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
          >
            <SectionHeading
              step="01"
              kicker="Event basics"
              title="Event details"
              description="Tell volunteers what you are organizing and why it matters."
              headingId="event-details-heading"
              icon={<FiImage aria-hidden="true" className="h-5 w-5" />}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="event-title"
                className="sm:col-span-2"
                name="title"
                value={values.title}
                onChange={(value) => updateField("title", value)}
                isInvalid={Boolean(errors.title)}
                isDisabled={isSubmitting}
                isRequired
              >
                <Label>Event name</Label>
                <Input
                  placeholder="e.g. Community garden clean-up"
                  maxLength={120}
                  onBlur={() => validateField("title")}
                />
                {errors.title ? (
                  <FieldError>{errors.title}</FieldError>
                ) : (
                  <span className="text-xs text-ink/50">
                    Make it specific and easy to scan. {values.title.length}/120
                  </span>
                )}
              </TextField>

              <Select
                name="categoryId"
                selectedKey={values.categoryId || null}
                onSelectionChange={(key) => {
                  const selectedCategory = key ? String(key) : "";
                  updateField(
                    "categoryId",
                    isEventCategoryId(selectedCategory) ? selectedCategory : "",
                  );
                }}
                isInvalid={Boolean(errors.categoryId)}
                isDisabled={isSubmitting}
                isRequired
                placeholder="Choose a cause"
                className="w-full"
              >
                <Label>Cause</Label>
                <Select.Trigger ref={categoryTriggerRef} type="button">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {eventCategories.map((category) => (
                      <ListBox.Item
                        key={category.id}
                        id={category.id}
                        textValue={category.label}
                      >
                        {category.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                {errors.categoryId && (
                  <FieldError>{errors.categoryId}</FieldError>
                )}
              </Select>

              <TextField
                id="event-capacity"
                name="capacity"
                value={values.capacity}
                onChange={(value) => updateField("capacity", value)}
                isInvalid={Boolean(errors.capacity)}
                isDisabled={isSubmitting}
                isRequired
              >
                <Label>Volunteer spots</Label>
                <Input
                  type="number"
                  min={1}
                  max={5000}
                  step={1}
                  inputMode="numeric"
                  placeholder="e.g. 25"
                  onBlur={() => validateField("capacity")}
                />
                {errors.capacity ? (
                  <FieldError>{errors.capacity}</FieldError>
                ) : (
                  <span className="text-xs text-ink/50">
                    You can update this later from My Events.
                  </span>
                )}
              </TextField>

              <TextField
                id="event-description"
                className="sm:col-span-2"
                name="description"
                value={values.description}
                onChange={(value) => updateField("description", value)}
                isInvalid={Boolean(errors.description)}
                isDisabled={isSubmitting}
                isRequired
              >
                <Label>What will volunteers do?</Label>
                <TextArea
                  rows={5}
                  maxLength={2000}
                  placeholder="Share the purpose, activities, and anything volunteers should know."
                  onBlur={() => validateField("description")}
                />
                {errors.description ? (
                  <FieldError>{errors.description}</FieldError>
                ) : (
                  <span className="text-xs text-ink/50">
                    At least 30 characters. {values.description.length}/2,000
                  </span>
                )}
              </TextField>
            </div>
          </section>

          <section
            id="create-event-image"
            aria-labelledby="event-image-heading"
            className="scroll-mt-24 rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
          >
            <SectionHeading
              step="02"
              kicker="Make it stand out"
              title="Event image"
              description="Add an image to help volunteers recognize your event."
              headingId="event-image-heading"
              icon={<FiImage aria-hidden="true" className="h-5 w-5" />}
              optional
            />

            <div
              role="group"
              aria-label="Image source"
              className="inline-flex w-full items-center gap-1 rounded-full border border-ink/10 bg-canvas p-1 shadow-sm sm:w-auto"
            >
              <button
                type="button"
                disabled={isSubmitting}
                aria-pressed={imageSource === "upload"}
                onClick={() => changeImageSource("upload")}
                className={`inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none ${
                  imageSource === "upload"
                    ? "bg-surface text-brand shadow-sm ring-1 ring-brand/20"
                    : "text-ink/55 hover:bg-surface/70 hover:text-ink"
                }`}
              >
                <FiUpload aria-hidden="true" className="h-3.5 w-3.5" />
                Upload
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                aria-pressed={imageSource === "link"}
                onClick={() => changeImageSource("link")}
                className={`inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none ${
                  imageSource === "link"
                    ? "bg-surface text-brand shadow-sm ring-1 ring-brand/20"
                    : "text-ink/55 hover:bg-surface/70 hover:text-ink"
                }`}
              >
                <FiLink aria-hidden="true" className="h-3.5 w-3.5" />
                Image link
              </button>
            </div>

            {imageSource === "upload" ? (
              <>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="sr-only"
                  aria-label="Upload an event image"
                />

                <div
                  className="mt-4"
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {image ? (
                    <div
                      className={`flex flex-col gap-4 rounded-2xl border p-4 transition-all duration-200 sm:flex-row sm:items-center ${
                        isDragging
                          ? "border-brand bg-brand/10 shadow-inner shadow-brand/10"
                          : "border-ink/10 bg-gradient-to-br from-surface to-canvas shadow-sm"
                      }`}
                    >
                      <div className="relative w-full shrink-0 sm:w-44">
                        <Image
                          src={image.dataUrl}
                          alt="Event image preview"
                          width={176}
                          height={132}
                          unoptimized
                          className="h-32 w-full rounded-xl object-cover ring-1 ring-ink/10"
                        />
                        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                          <FiCheck aria-hidden="true" className="h-3 w-3" />
                          Ready
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">
                          {image.fileName}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-ink/55">
                          This image will appear on your event card.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => imageInputRef.current?.click()}
                            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-ink/15 bg-surface px-4 py-2 text-xs font-semibold text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
                          >
                            <FiUpload
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                            />
                            Change image
                          </button>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={removeImage}
                            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400"
                          >
                            <FiX aria-hidden="true" className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => imageInputRef.current?.click()}
                      className={`group flex min-h-36 w-full cursor-pointer select-none flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-8 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none ${
                        isDragging
                          ? "border-brand bg-brand/10 shadow-inner shadow-brand/10"
                          : "border-ink/15 bg-gradient-to-b from-surface to-canvas hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 motion-reduce:transform-none ${
                          isDragging
                            ? "bg-brand text-white"
                            : "bg-brand/10 text-brand ring-1 ring-brand/15"
                        }`}
                      >
                        <FiUploadCloud aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-ink">
                          {isDragging
                            ? "Drop your image here"
                            : "Click to upload or drag and drop"}
                        </span>
                        <span className="text-xs text-ink/50">
                          JPG, PNG, or WebP · Max 2 MB
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-[11px] font-semibold text-brand transition-colors duration-200 group-hover:border-brand/35 group-hover:bg-brand/10">
                        <FiImage aria-hidden="true" className="h-3 w-3" />
                        Browse files
                      </span>
                    </button>
                  )}
                </div>

                <p className="mt-2 text-xs text-ink/45">
                  Landscape images (16:9) look best on event cards.
                </p>

                {imageError && (
                  <p
                    role="alert"
                    className="mt-2 flex items-start gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                  >
                    <FiAlertCircle
                      aria-hidden="true"
                      className="mt-px h-3.5 w-3.5 shrink-0"
                    />
                    <span>{imageError}</span>
                  </p>
                )}
              </>
            ) : (
              <div className="mt-4 space-y-3">
                <TextField
                  id="event-image-url"
                  name="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={updateImageUrl}
                  isInvalid={showImageUrlError}
                  isDisabled={isSubmitting}
                >
                  <Label>Image URL</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/event-image.jpg"
                    maxLength={2048}
                    onBlur={() => setImageUrlTouched(true)}
                  />
                  {showImageUrlError ? (
                    <FieldError>
                      Enter a valid image link beginning with http:// or
                      https://.
                    </FieldError>
                  ) : (
                    <span className="text-xs text-ink/50">
                      Paste a direct link to a JPG, PNG, or WebP image.
                    </span>
                  )}
                </TextField>

                {imageUrl.trim() && !imageUrlInvalid && (
                  <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-canvas p-3">
                    <Image
                      src={imageUrl.trim()}
                      alt="Event image preview"
                      width={112}
                      height={84}
                      unoptimized
                      className="h-20 w-28 rounded-xl object-cover"
                    />
                    <p className="break-all text-xs text-ink/55">
                      Image link preview
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          <section
            id="create-event-time"
            aria-labelledby="event-time-heading"
            className="scroll-mt-24 rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
          >
            <SectionHeading
              step="03"
              kicker="Pick a time"
              title="When is it happening?"
              description="Set a date and the local start and end times."
              headingId="event-time-heading"
              icon={<FiCalendar aria-hidden="true" className="h-5 w-5" />}
            />

            <div className="grid gap-5 sm:grid-cols-3">
              <TextField
                id="event-date"
                name="date"
                value={values.date}
                onChange={(value) => updateField("date", value)}
                isInvalid={Boolean(errors.date)}
                isDisabled={isSubmitting}
                isRequired
              >
                <Label>Date</Label>
                <Input
                  type="date"
                  min={todayDateValue()}
                  onBlur={() => validateField("date")}
                />
                {errors.date ? (
                  <FieldError>{errors.date}</FieldError>
                ) : (
                  <span className="text-xs text-ink/50">
                    {formattedDate || "Choose today or a future date."}
                  </span>
                )}
              </TextField>

              <TextField
                id="event-start-time"
                name="startTime"
                value={values.startTime || "00:00"}
                onChange={handleStartTimeChange}
                isInvalid={Boolean(errors.startTime)}
                isDisabled={isSubmitting}
                isRequired
              >
                <Label>Start time</Label>
                <Input type="time" onBlur={() => validateField("startTime")} />
                {errors.startTime && (
                  <FieldError>{errors.startTime}</FieldError>
                )}
              </TextField>

              <TextField
                id="event-end-time"
                name="endTime"
                value={values.endTime || "00:00"}
                onChange={(value) => updateField("endTime", value)}
                isInvalid={Boolean(errors.endTime)}
                isDisabled={isSubmitting}
                isRequired
              >
                <Label>End time</Label>
                <Input type="time" onBlur={() => validateField("endTime")} />
                {errors.endTime && <FieldError>{errors.endTime}</FieldError>}
              </TextField>
            </div>

            {durationLabel ? (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand">
                <FiClock aria-hidden="true" className="h-3.5 w-3.5" />
                {formatEventTime(values.startTime)} –{" "}
                {formatEventTime(values.endTime)} · {durationLabel}
              </p>
            ) : (
              <p className="mt-4 text-xs text-ink/45">
                Pick a start time and we&apos;ll suggest a two-hour window you
                can adjust.
              </p>
            )}
          </section>

          <section
            id="create-event-location"
            aria-labelledby="event-location-heading"
            className="scroll-mt-24 rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
          >
            <SectionHeading
              step="04"
              kicker="Set the place"
              title="Where should volunteers meet?"
              description="Include a city and a clear venue or meeting point."
              headingId="event-location-heading"
              icon={<FiMapPin aria-hidden="true" className="h-5 w-5" />}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="event-city"
                name="city"
                value={values.city}
                onChange={(value) => updateField("city", value)}
                isInvalid={Boolean(errors.city)}
                isDisabled={isSubmitting}
                isRequired
              >
                <Label>City</Label>
                <Input
                  list="event-city-options"
                  placeholder="e.g. Dhaka"
                  maxLength={80}
                  onBlur={() => validateField("city")}
                />
                <datalist id="event-city-options">
                  {eventCities.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
                {errors.city && <FieldError>{errors.city}</FieldError>}
              </TextField>

              <TextField
                id="event-venue"
                name="venue"
                value={values.venue}
                onChange={(value) => updateField("venue", value)}
                isInvalid={Boolean(errors.venue)}
                isDisabled={isSubmitting}
                isRequired
              >
                <Label>Venue or meeting point</Label>
                <Input
                  placeholder="e.g. Ramna Park, west entrance"
                  maxLength={160}
                  onBlur={() => validateField("venue")}
                />
                {errors.venue ? (
                  <FieldError>{errors.venue}</FieldError>
                ) : (
                  <span className="text-xs text-ink/50">
                    Be specific so volunteers can find you.
                  </span>
                )}
              </TextField>
            </div>
          </section>

          <div className="rounded-3xl border border-brand/15 bg-brand/5 p-5 sm:p-6">
            <Checkbox
              id="event-guidelines"
              name="guidelines"
              isSelected={values.guidelines}
              onChange={(checked) => updateField("guidelines", checked)}
              isInvalid={Boolean(errors.guidelines)}
              isRequired
              className="w-full"
              isDisabled={isSubmitting}
            >
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <span className="text-sm leading-6 text-ink/80">
                  I agree to follow the ChangeNest community guidelines and keep
                  this event safe and welcoming.
                </span>
              </Checkbox.Content>
              {errors.guidelines && (
                <FieldError>{errors.guidelines}</FieldError>
              )}
            </Checkbox>
          </div>
        </div>

        <div className="sticky bottom-4 z-10 mt-6 flex flex-col gap-4 rounded-3xl border border-ink/10 bg-surface/95 p-4 shadow-xl shadow-navy/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-medium text-ink/60">
              <FiCheckCircle
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 ${
                  allReady ? "text-brand" : "text-ink/35"
                }`}
              />
              {allReady
                ? "Everything looks complete."
                : allRequiredComplete
                  ? "Check the image link before publishing."
                  : `${completedRequired} of ${REQUIRED_DETAIL_COUNT} required details complete.`}
            </p>
            <p className="mt-1 pl-6 text-[11px] text-ink/40">
              You can edit this event later from My Events.
            </p>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={requestCancel}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-surface px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand/95 hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
            >
              {isSubmitting ? (
                <>
                  <FiLoader
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin motion-reduce:animate-none"
                  />
                  Creating event...
                </>
              ) : (
                <>
                  Create event
                  <FiArrowRight aria-hidden="true" className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <DiscardDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onDiscard={confirmCancel}
      />
    </>
  );
};

export default CreateEventForm;
