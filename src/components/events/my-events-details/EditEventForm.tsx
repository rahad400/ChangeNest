"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheck,
  FiImage,
  FiMapPin,
  FiSave,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import {
  eventCategories,
  eventCities,
  eventImageMimeTypes,
  initialEventFormValues,
  isEventCategoryId,
  isValidEventImageUrl,
  maxEventImageSize,
  todayDateValue,
  validateEventForm,
  type EventFormErrors,
  type EventFormField,
  type EventFormValues,
} from "@/app/lib/event-form";
import type { IEvent } from "@/types";

type EditEventFormProps = {
  event: IEvent;
};

const inputBase =
  "mt-2 w-full rounded-2xl border bg-surface px-4 py-3 text-sm text-ink shadow-sm shadow-navy/5 outline-none transition placeholder:text-ink/40 focus:ring-2 disabled:cursor-not-allowed disabled:bg-canvas";

const inputTone = (invalid: boolean) =>
  invalid
    ? "border-red-300 focus:border-red-400 focus:ring-red-200"
    : "border-ink/15 focus:border-brand focus:ring-brand/25";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isEventFormErrors = (value: unknown): value is EventFormErrors => {
  if (!isRecord(value)) return false;

  const fields: EventFormField[] = [
    "title",
    "categoryId",
    "description",
    "date",
    "startTime",
    "endTime",
    "city",
    "venue",
    "capacity",
    "guidelines",
  ];

  return Object.entries(value).every(
    ([field, message]) =>
      fields.some((validField) => validField === field) &&
      typeof message === "string",
  );
};

const FieldError = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => (
  <p
    id={id}
    role="alert"
    className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600"
  >
    <FiAlertCircle aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" />
    <span>{children}</span>
  </p>
);

const SectionHeading = ({
  step,
  title,
  description,
  icon,
}: {
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
}) => (
  <div className="mb-6 flex items-start gap-4">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
      {icon}
    </span>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
        Step {step}
      </p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-ink/60">{description}</p>
    </div>
  </div>
);

const EditEventForm = ({ event }: EditEventFormProps) => {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<EventFormValues>(() => ({
    ...initialEventFormValues,
    title: event.values.title,
    categoryId: isEventCategoryId(event.values.categoryId)
      ? event.values.categoryId
      : "",
    description: event.values.description,
    date: event.values.date,
    startTime: event.values.startTime,
    endTime: event.values.endTime,
    city: event.values.city,
    venue: event.values.venue,
    capacity: String(event.values.capacity ?? ""),
    guidelines: true,
  }));
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageSource, setImageSource] = useState<"upload" | "link">(
    event.image?.dataUrl ? "upload" : "link",
  );
  const [imageUrl, setImageUrl] = useState(event.image?.url ?? "");
  const [image, setImage] = useState<{
    dataUrl: string;
    fileName: string;
  } | null>(
    event.image?.dataUrl
      ? { dataUrl: event.image.dataUrl, fileName: "Current image" }
      : null,
  );

  const updateField = <K extends EventFormField>(
    field: K,
    value: EventFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleImageChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const file = changeEvent.currentTarget.files?.[0];
    changeEvent.currentTarget.value = "";

    if (!file) return;

    if (!eventImageMimeTypes.includes(file.type)) {
      toast.error("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > maxEventImageSize) {
      toast.error("Event images must be 2 MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        toast.error("We couldn't read that image. Please try another file.");
        return;
      }

      setImage({ dataUrl: reader.result, fileName: file.name });
    };
    reader.onerror = () => {
      toast.error("We couldn't read that image. Please try another file.");
    };
    reader.readAsDataURL(file);
  };

  const imageUrlInvalid =
    imageSource === "link" &&
    imageUrl.length > 0 &&
    !isValidEventImageUrl(imageUrl);

  const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const nextErrors = validateEventForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    if (imageUrlInvalid) {
      toast.error(
        "Enter a valid image link beginning with http:// or https://.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/my-events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: event._id,
          values,
          image:
            imageSource === "link"
              ? imageUrl
                ? { url: imageUrl }
                : null
              : image
                ? { dataUrl: image.dataUrl, fileName: image.fileName }
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

        toast.error("We couldn't update your event. Please try again.");
        return;
      }

      toast.success("Your event has been updated.");
      router.push("/my-events");
      router.refresh();
    } catch {
      toast.error("Couldn't connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="space-y-5">
        <section
          aria-labelledby="edit-event-basics"
          className="rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
        >
          <SectionHeading
            step="01"
            title="Event basics"
            description="Keep the title, cause, and description clear for volunteers."
            icon={<FiImage aria-hidden="true" className="h-5 w-5" />}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="edit-title"
                className="text-sm font-semibold text-ink"
              >
                Event name
              </label>
              <input
                id="edit-title"
                name="title"
                type="text"
                value={values.title}
                onChange={(changeEvent) =>
                  updateField("title", changeEvent.target.value)
                }
                maxLength={120}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? "edit-title-error" : undefined}
                className={`${inputBase} ${inputTone(Boolean(errors.title))}`}
              />
              {errors.title && (
                <FieldError id="edit-title-error">{errors.title}</FieldError>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-category"
                className="text-sm font-semibold text-ink"
              >
                Cause
              </label>
              <select
                id="edit-category"
                name="categoryId"
                value={values.categoryId}
                onChange={(changeEvent) => {
                  const category = changeEvent.target.value;
                  updateField(
                    "categoryId",
                    isEventCategoryId(category) ? category : "",
                  );
                }}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.categoryId)}
                aria-describedby={
                  errors.categoryId ? "edit-category-error" : undefined
                }
                className={`${inputBase} ${inputTone(
                  Boolean(errors.categoryId),
                )}`}
              >
                <option value="">Choose a cause</option>
                {eventCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <FieldError id="edit-category-error">
                  {errors.categoryId}
                </FieldError>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-capacity"
                className="text-sm font-semibold text-ink"
              >
                Volunteer spots
              </label>
              <input
                id="edit-capacity"
                name="capacity"
                type="number"
                min={1}
                max={5000}
                step={1}
                value={values.capacity}
                onChange={(changeEvent) =>
                  updateField("capacity", changeEvent.target.value)
                }
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.capacity)}
                aria-describedby={
                  errors.capacity ? "edit-capacity-error" : undefined
                }
                className={`${inputBase} ${inputTone(
                  Boolean(errors.capacity),
                )}`}
              />
              {errors.capacity && (
                <FieldError id="edit-capacity-error">
                  {errors.capacity}
                </FieldError>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="edit-description"
                className="text-sm font-semibold text-ink"
              >
                What will volunteers do?
              </label>
              <textarea
                id="edit-description"
                name="description"
                rows={5}
                maxLength={2000}
                value={values.description}
                onChange={(changeEvent) =>
                  updateField("description", changeEvent.target.value)
                }
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? "edit-description-error" : undefined
                }
                className={`${inputBase} ${inputTone(
                  Boolean(errors.description),
                )} resize-y`}
              />
              {errors.description ? (
                <FieldError id="edit-description-error">
                  {errors.description}
                </FieldError>
              ) : (
                <p className="mt-1.5 text-xs text-ink/45">
                  At least 30 characters. {values.description.length}/2,000
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="edit-event-image"
          className="rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
        >
          <SectionHeading
            step="02"
            title="Event image"
            description="Replace the image volunteers see on your event card."
            icon={<FiImage aria-hidden="true" className="h-5 w-5" />}
          />

          <div
            aria-label="Image source"
            className="inline-flex rounded-full border border-ink/10 bg-canvas p-1"
          >
            <button
              type="button"
              disabled={isSubmitting}
              aria-pressed={imageSource === "upload"}
              onClick={() => setImageSource("upload")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                imageSource === "upload"
                  ? "bg-surface text-brand shadow-sm"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Upload
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              aria-pressed={imageSource === "link"}
              onClick={() => setImageSource("link")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                imageSource === "link"
                  ? "bg-surface text-brand shadow-sm"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
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

              {image ? (
                <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-ink/10 bg-canvas p-4 sm:flex-row sm:items-center">
                  <Image
                    src={image.dataUrl}
                    alt="Event image preview"
                    width={160}
                    height={120}
                    unoptimized
                    className="h-28 w-full rounded-xl object-cover sm:w-40"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {image.fileName}
                    </p>
                    <p className="mt-1 text-xs text-ink/55">
                      This image will replace the current one.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => imageInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <FiUpload aria-hidden="true" className="h-3.5 w-3.5" />
                        Change image
                      </button>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setImage(null)}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="mt-4 flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-canvas px-4 py-6 text-sm font-medium text-ink/65 transition hover:border-brand/50 hover:bg-brand/5 hover:text-brand disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <FiImage aria-hidden="true" className="h-5 w-5" />
                  </span>
                  Choose an image
                  <span className="text-xs font-normal text-ink/45">
                    JPG, PNG, or WebP · Max 2 MB
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="mt-4 space-y-3">
              <label
                htmlFor="edit-image-url"
                className="text-sm font-semibold text-ink"
              >
                Image URL
              </label>
              <input
                id="edit-image-url"
                name="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(changeEvent) => setImageUrl(changeEvent.target.value)}
                placeholder="https://example.com/event-image.jpg"
                maxLength={2048}
                disabled={isSubmitting}
                aria-invalid={imageUrlInvalid}
                aria-describedby={
                  imageUrlInvalid ? "edit-image-url-error" : undefined
                }
                className={`${inputBase} ${inputTone(imageUrlInvalid)}`}
              />
              {imageUrlInvalid && (
                <FieldError id="edit-image-url-error">
                  Enter a valid image link beginning with http:// or https://.
                </FieldError>
              )}
              {imageUrl && !imageUrlInvalid && (
                <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-canvas p-3">
                  <Image
                    src={imageUrl}
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
          aria-labelledby="edit-event-time"
          className="rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
        >
          <SectionHeading
            step="03"
            title="Date and time"
            description="Update when volunteers should arrive and finish."
            icon={<FiCalendar aria-hidden="true" className="h-5 w-5" />}
          />

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label
                htmlFor="edit-date"
                className="text-sm font-semibold text-ink"
              >
                Date
              </label>
              <input
                id="edit-date"
                name="date"
                type="date"
                min={todayDateValue()}
                value={values.date}
                onChange={(changeEvent) =>
                  updateField("date", changeEvent.target.value)
                }
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? "edit-date-error" : undefined}
                className={`${inputBase} ${inputTone(Boolean(errors.date))}`}
              />
              {errors.date && (
                <FieldError id="edit-date-error">{errors.date}</FieldError>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-start-time"
                className="text-sm font-semibold text-ink"
              >
                Start time
              </label>
              <input
                id="edit-start-time"
                name="startTime"
                type="time"
                value={values.startTime||"00:00"}
                onChange={(changeEvent) =>
                  updateField("startTime", changeEvent.target.value)
                }
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.startTime)}
                aria-describedby={
                  errors.startTime ? "edit-start-time-error" : undefined
                }
                className={`${inputBase} ${inputTone(
                  Boolean(errors.startTime),
                )}`}
              />
              {errors.startTime && (
                <FieldError id="edit-start-time-error">
                  {errors.startTime}
                </FieldError>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-end-time"
                className="text-sm font-semibold text-ink"
              >
                End time
              </label>
              <input
                id="edit-end-time"
                name="endTime"
                type="time"
                value={values.endTime||"00:00"}
                onChange={(changeEvent) =>
                  updateField("endTime", changeEvent.target.value)
                }
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.endTime)}
                aria-describedby={
                  errors.endTime ? "edit-end-time-error" : undefined
                }
                className={`${inputBase} ${inputTone(Boolean(errors.endTime))}`}
              />
              {errors.endTime && (
                <FieldError id="edit-end-time-error">
                  {errors.endTime}
                </FieldError>
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="edit-event-location"
          className="rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
        >
          <SectionHeading
            step="04"
            title="Location"
            description="Give volunteers a clear city and meeting point."
            icon={<FiMapPin aria-hidden="true" className="h-5 w-5" />}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-city"
                className="text-sm font-semibold text-ink"
              >
                City
              </label>
              <input
                id="edit-city"
                name="city"
                type="text"
                list="edit-event-city-options"
                value={values.city}
                onChange={(changeEvent) =>
                  updateField("city", changeEvent.target.value)
                }
                maxLength={80}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? "edit-city-error" : undefined}
                className={`${inputBase} ${inputTone(Boolean(errors.city))}`}
              />
              <datalist id="edit-event-city-options">
                {eventCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
              {errors.city && (
                <FieldError id="edit-city-error">{errors.city}</FieldError>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-venue"
                className="text-sm font-semibold text-ink"
              >
                Venue or meeting point
              </label>
              <input
                id="edit-venue"
                name="venue"
                type="text"
                value={values.venue}
                onChange={(changeEvent) =>
                  updateField("venue", changeEvent.target.value)
                }
                maxLength={160}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.venue)}
                aria-describedby={errors.venue ? "edit-venue-error" : undefined}
                className={`${inputBase} ${inputTone(Boolean(errors.venue))}`}
              />
              {errors.venue && (
                <FieldError id="edit-venue-error">{errors.venue}</FieldError>
              )}
            </div>
          </div>
        </section>

        <div className="rounded-3xl border border-brand/15 bg-brand/5 p-5 sm:p-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="guidelines"
              checked={values.guidelines}
              onChange={(changeEvent) =>
                updateField("guidelines", changeEvent.target.checked)
              }
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.guidelines)}
              aria-describedby={
                errors.guidelines ? "edit-guidelines-error" : undefined
              }
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/25 accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            />
            <span className="text-sm leading-6 text-ink/80">
              I agree to follow the ChangeNest community guidelines and keep
              this event safe and welcoming.
            </span>
          </label>
          {errors.guidelines && (
            <FieldError id="edit-guidelines-error">
              {errors.guidelines}
            </FieldError>
          )}
        </div>
      </div>

      <div className="sticky bottom-4 z-10 mt-6 flex flex-col gap-4 rounded-3xl border border-ink/10 bg-surface/95 p-4 shadow-xl shadow-navy/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-xs text-ink/55">
          <FiCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
          Your changes will be saved to this event.
        </p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => router.push("/my-events")}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/25 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
          >
            {isSubmitting ? (
              "Saving changes..."
            ) : (
              <>
                <FiSave aria-hidden="true" className="h-4 w-4" />
                Save changes
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditEventForm;
