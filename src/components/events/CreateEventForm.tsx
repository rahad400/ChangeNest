"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Button,
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
  FiArrowRight,
  FiCalendar,
  FiImage,
  FiMapPin,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import {
  eventCategories,
  eventCities,
  eventImageMimeTypes,
  initialEventFormValues,
  isValidEventImageUrl,
  isEventCategoryId,
  maxEventImageSize,
  todayDateValue,
  validateEventForm,
  type EventFormErrors,
  type EventFormField,
  type EventFormValues,
} from "@/app/lib/event-form";
import { useSession } from "@/app/lib/auth-client";

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

const CreateEventForm = () => {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState(initialEventFormValues);
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const userId = session?.user?.id;
  // console.log("User ID is there:", userId);
  const [image, setImage] = useState<{
    dataUrl: string;
    fileName: string;
  } | null>(null);
  const [imageSource, setImageSource] = useState<"upload" | "link">("upload");
  const [imageUrl, setImageUrl] = useState("");

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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

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

  const clearForm = () => {
    setValues(initialEventFormValues);
    setErrors({});
    setImage(null);
    setImageUrl("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) {
      toast.error("You must be logged in to create an event.");
      return;
    }

    const nextErrors = validateEventForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    if (imageSource === "link" && imageUrl && !isValidEventImageUrl(imageUrl)) {
      toast.error(
        "Enter a valid image link beginning with http:// or https://.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/create-event", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values,
          image:
            imageSource === "link"
              ? imageUrl
                ? { url: imageUrl }
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
        // console.log(result);
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
        }

        toast.error("We couldn't create your event. Please try again.");
        return;
      }

      toast.success("Your event has been created.");
      clearForm();
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
          aria-labelledby="event-details-heading"
          className="rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
        >
          <div className="mb-6 flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <FiImage aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Step 01 · Event basics
              </p>
              <h2
                id="event-details-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-ink"
              >
                Event details
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink/60">
                Tell volunteers what you are organizing and why it matters.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
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
              />
              {errors.title && <FieldError>{errors.title}</FieldError>}
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
              <Select.Trigger>
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
                placeholder="e.g. 25"
              />
              {errors.capacity && <FieldError>{errors.capacity}</FieldError>}
            </TextField>

            <TextField
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
          aria-labelledby="event-image-heading"
          className="rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
        >
          <div className="mb-5 flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <FiImage aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Step 02 · Make it stand out
              </p>
              <h2
                id="event-image-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-ink"
              >
                Event image
                <span className="ml-2 text-sm font-normal text-ink/50">
                  Optional
                </span>
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink/60">
                Add an image to help volunteers recognize your event.
              </p>
            </div>
          </div>

          <div
            aria-label="Image source"
            className="inline-flex rounded-full border border-ink/10 bg-canvas p-1"
          >
            <Button
              type="button"
              isDisabled={isSubmitting}
              aria-pressed={imageSource === "upload"}
              onPress={() => setImageSource("upload")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                imageSource === "upload"
                  ? "bg-surface text-brand shadow-sm"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Upload
            </Button>
            <Button
              type="button"
              isDisabled={isSubmitting}
              aria-pressed={imageSource === "link"}
              onPress={() => setImageSource("link")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                imageSource === "link"
                  ? "bg-surface text-brand shadow-sm"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Image link
            </Button>
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
                <div className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-canvas p-4 sm:flex-row sm:items-center">
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
                      Image preview ready to upload
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        type="button"
                        isDisabled={isSubmitting}
                        onPress={() => imageInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition hover:bg-surface"
                      >
                        <FiUpload aria-hidden="true" className="h-3.5 w-3.5" />
                        Change image
                      </Button>
                      <Button
                        type="button"
                        isDisabled={isSubmitting}
                        onPress={() => setImage(null)}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-500/10"
                      >
                        <FiX aria-hidden="true" className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  isDisabled={isSubmitting}
                  onPress={() => imageInputRef.current?.click()}
                  className="flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-canvas px-4 py-6 text-sm font-medium text-ink/65 transition hover:border-brand/50 hover:bg-brand/5 hover:text-brand"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <FiImage aria-hidden="true" className="h-5 w-5" />
                  </span>
                  Choose an image
                  <span className="text-xs font-normal text-ink/45">
                    JPG, PNG, or WebP · Max 2 MB
                  </span>
                </Button>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <TextField
                name="imageUrl"
                type="url"
                value={imageUrl}
                onChange={setImageUrl}
                isDisabled={isSubmitting}
              >
                <Label>Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  maxLength={2048}
                />
              </TextField>
              {imageUrl && isValidEventImageUrl(imageUrl) && (
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
          aria-labelledby="event-time-heading"
          className="rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
        >
          <div className="mb-6 flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <FiCalendar aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Step 03 · Pick a time
              </p>
              <h2
                id="event-time-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-ink"
              >
                When is it happening?
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink/60">
                Set a date and the local start and end times.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <TextField
              name="date"
              value={values.date}
              onChange={(value) => updateField("date", value)}
              isInvalid={Boolean(errors.date)}
              isDisabled={isSubmitting}
              isRequired
            >
              <Label>Date</Label>
              <Input type="date" min={todayDateValue()} />
              {errors.date && <FieldError>{errors.date}</FieldError>}
            </TextField>

            <TextField
              name="startTime"
              value={values.startTime}
              onChange={(value) => updateField("startTime", value)}
              isInvalid={Boolean(errors.startTime)}
              isDisabled={isSubmitting}
              isRequired
            >
              <Label>Start time</Label>
              <Input type="time" />
              {errors.startTime && <FieldError>{errors.startTime}</FieldError>}
            </TextField>

            <TextField
              name="endTime"
              value={values.endTime}
              onChange={(value) => updateField("endTime", value)}
              isInvalid={Boolean(errors.endTime)}
              isDisabled={isSubmitting}
              isRequired
            >
              <Label>End time</Label>
              <Input type="time" />
              {errors.endTime && <FieldError>{errors.endTime}</FieldError>}
            </TextField>
          </div>
        </section>

        <section
          aria-labelledby="event-location-heading"
          className="rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7"
        >
          <div className="mb-6 flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <FiMapPin aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Step 04 · Set the place
              </p>
              <h2
                id="event-location-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-ink"
              >
                Where should volunteers meet?
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink/60">
                Include a city and a clear venue or meeting point.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
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
              />
              <datalist id="event-city-options">
                {eventCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
              {errors.city && <FieldError>{errors.city}</FieldError>}
            </TextField>

            <TextField
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
              />
              {errors.venue && <FieldError>{errors.venue}</FieldError>}
            </TextField>
          </div>
        </section>

        <div className="rounded-3xl border border-brand/15 bg-brand/5 p-5 sm:p-6">
          <Checkbox
            name="guidelines"
            isSelected={values.guidelines}
            onChange={(checked) => updateField("guidelines", checked)}
            isInvalid={Boolean(errors.guidelines)}
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
            {errors.guidelines && <FieldError>{errors.guidelines}</FieldError>}
          </Checkbox>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-xs text-ink/55">
          <FiMapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
          Your event will be saved to ChangeNest.
        </p>
        <div className="flex flex-col-reverse gap-6 sm:flex-row">
          <Button
            type="button"
            isDisabled={isSubmitting}
            onPress={() => router.push("/")}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/25 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
          >
            {isSubmitting ? (
              "Creating event..."
            ) : (
              <>
                Create event
                <FiArrowRight aria-hidden="true" className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateEventForm;
