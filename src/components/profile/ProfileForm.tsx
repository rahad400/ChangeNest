"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "react-toastify";
import {
  FiAlertCircle,
  FiCheck,
  FiLoader,
  FiMail,
} from "react-icons/fi";
import { authClient } from "@/app/lib/auth-client";
import UserAvatar from "@/components/profile/UserAvatar";
import type { ProfileFormProps } from "@/types";

const inputBase =
  "w-full rounded-2xl border text-sm text-ink shadow-sm shadow-navy/5 outline-none transition placeholder:text-ink/40 focus:ring-2 disabled:cursor-not-allowed";

const inputTone = (invalid: boolean) =>
  invalid
    ? "border-red-300 focus:border-red-400 focus:ring-red-200"
    : "border-ink/15 focus:border-brand focus:ring-brand/25";

// Avatar URL valid http(s) link kina check koro.
const isValidImageUrl = (value: string) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const FieldErrorText = ({
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

const ProfileForm = ({ user, memberSince }: ProfileFormProps) => {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image ?? "");
  const [nameTouched, setNameTouched] = useState(false);
  const [imageTouched, setImageTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const trimmedName = name.trim();
  const trimmedImage = image.trim();

  const nameError = !trimmedName
    ? "Please enter your name."
    : trimmedName.length < 3
      ? "Your name must be at least 3 characters."
      : null;

  const imageError = isValidImageUrl(trimmedImage)
    ? null
    : "Enter a valid image URL starting with http:// or https://.";

  const previewName = trimmedName || user.name;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameTouched(true);
    setImageTouched(true);
    setFormError(null);

    if (nameError || imageError) return;

    setIsSaving(true);

    try {
      // Better Auth er updateUser diye name ar image update hocche.
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || null,
      });

      if (error) {
        const message =
          error.message ||
          "We couldn't update your profile. Please try again.";

        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("Your profile has been updated.");
      router.refresh();
    } catch {
      const message =
        "Something went wrong while saving your profile. Check your connection and try again.";

      setFormError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {/* Profile preview. Image fail korle initials show hobe. */}
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-center">
        <UserAvatar
          name={previewName}
          image={imageError ? null : trimmedImage}
          className="h-20 w-20 text-2xl"
        />

        <div className="min-w-0">
          <p className="truncate text-xl font-bold tracking-tight text-ink">
            {previewName || "Your profile"}
          </p>
          <p className="truncate text-sm text-ink/55">{user.email}</p>
          <p className="mt-1 text-xs text-ink/45">Member since {memberSince}</p>
        </div>
      </div>

      <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-6">
        {formError ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            <FiAlertCircle
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span>{formError}</span>
          </p>
        ) : null}

        {/* Full name */}
        <div>
          <label
            htmlFor="profile-name"
            className="text-sm font-semibold text-ink"
          >
            Full name
          </label>

          <input
            id="profile-name"
            name="name"
            type="text"
            required
            minLength={3}
            maxLength={60}
            autoComplete="name"
            placeholder="Change name"
            // value={name}
            onChange={(event) => {
              setName(event.target.value);
              setFormError(null);
            }}
            onBlur={() => setNameTouched(true)}
            aria-invalid={Boolean(nameTouched && nameError)}
            aria-describedby={
              nameTouched && nameError ? "profile-name-error" : undefined
            }
            className={`${inputBase} mt-2 bg-surface px-4 py-3 ${inputTone(
              Boolean(nameTouched && nameError),
            )}`}
          />

          {nameTouched && nameError ? (
            <FieldErrorText id="profile-name-error">{nameError}</FieldErrorText>
          ) : null}
        </div>

        {/* Email. Better Auth e email change alada flow, tai ekhane read-only. */}
        <div>
          <label
            htmlFor="profile-email"
            className="text-sm font-semibold text-ink"
          >
            Email
          </label>

          <div className="relative mt-2">
            <FiMail
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35"
            />
            <input
              id="profile-email"
              name="email"
              type="email"
              value={user.email}
              readOnly
              className={`${inputBase} cursor-not-allowed border-ink/15 bg-canvas py-3 pl-11 pr-4 text-ink/60`}
            />
          </div>

          <p className="mt-1.5 text-xs text-ink/45">
            Email can&apos;t be changed here.
          </p>
        </div>

        {/* Avatar image URL */}
        <div>
          <label
            htmlFor="profile-image"
            className="text-sm font-semibold text-ink"
          >
             Image URL
          </label>

          <input
            id="profile-image"
            name="image"
            type="url"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            placeholder="https://example.com/avatar.jpg"
            // value={image}
            onChange={(event) => {
              setImage(event.target.value);
              setFormError(null);
            }}
            onBlur={() => setImageTouched(true)}
            aria-invalid={Boolean(imageTouched && imageError)}
            aria-describedby={
              imageTouched && imageError
                ? "profile-image-error"
                : "profile-image-hint"
            }
            className={`${inputBase} mt-2 bg-surface px-4 py-3 ${inputTone(
              Boolean(imageTouched && imageError),
            )}`}
          />

          {imageTouched && imageError ? (
            <FieldErrorText id="profile-image-error">{imageError}</FieldErrorText>
          ) : (
            <p id="profile-image-hint" className="mt-1.5 text-xs text-ink/45">
              Paste a square image link, or leave it empty to use your initials.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink/45">
            Changes apply across ChangeNest right away.
          </p>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-navy shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 motion-reduce:transform-none"
          >
            {isSaving ? (
              <>
                <FiLoader aria-hidden="true" className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FiCheck aria-hidden="true" className="h-4 w-4" />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
