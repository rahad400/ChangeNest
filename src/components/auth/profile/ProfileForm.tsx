"use client";

import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import {
  FiAlertCircle,
  FiCheck,
  FiLink,
  FiLoader,
  FiMail,
  FiUpload,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { authClient } from "@/app/lib/auth-client";
import UserAvatar from "@/components/auth/profile/UserAvatar";
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

const avatarMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const maxAvatarFileSize = 2 * 1024 * 1024;
const maxAvatarDimension = 256;

type ImageSource = "upload" | "link";

type UploadedImage = {
  dataUrl: string;
  fileName: string;
};

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image could not be loaded."));
    };
    image.src = objectUrl;
  });

// Avatar ke chhoto WebP data URL e convert kori, jate session response halka thake.
const createAvatarDataUrl = async (file: File) => {
  const image = await loadImage(file);
  const largestSide = Math.max(image.naturalWidth, image.naturalHeight);
  const scale =
    largestSide > maxAvatarDimension ? maxAvatarDimension / largestSide : 1;
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available.");

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, width, height);

  // WebP support na thakle JPEG fallback.
  const webp = canvas.toDataURL("image/webp", 0.86);
  return webp.startsWith("data:image/webp")
    ? webp
    : canvas.toDataURL("image/jpeg", 0.9);
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
  const imageInputRef = useRef<HTMLInputElement>(null);

  const initialImage = user.image ?? "";
  const initialImageIsDataUrl = initialImage.startsWith("data:");

  const [name, setName] = useState(user.name);
  const [imageSource, setImageSource] = useState<ImageSource>(
    initialImage && !initialImageIsDataUrl ? "link" : "upload",
  );
  const [imageUrl, setImageUrl] = useState(
    initialImageIsDataUrl ? "" : initialImage,
  );
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    initialImageIsDataUrl
      ? { dataUrl: initialImage, fileName: "Current photo" }
      : null,
  );
  const [nameTouched, setNameTouched] = useState(false);
  const [imageTouched, setImageTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const trimmedName = name.trim();
  const trimmedImageUrl = imageUrl.trim();
  const selectedImage =
    imageSource === "upload" ? (uploadedImage?.dataUrl ?? "") : trimmedImageUrl;
  const isBusy = isSaving || isProcessingImage;

  const nameError = !trimmedName
    ? "Please enter your name."
    : trimmedName.length < 3
      ? "Your name must be at least 3 characters."
      : null;

  const imageUrlError =
    imageSource === "link" && !isValidImageUrl(trimmedImageUrl)
      ? "Enter a valid image URL starting with http:// or https://."
      : null;
  const showImageUrlError = Boolean(imageTouched && imageUrlError);

  const previewName = trimmedName || user.name;
  const previewImage = imageUrlError ? null : selectedImage;

  const changeImageSource = (source: ImageSource) => {
    setImageSource(source);
    setImageError(null);
    setImageTouched(false);
    setFormError(null);
  };

  const openImagePicker = () => {
    if (isBusy) return;
    imageInputRef.current?.click();
  };

  const applyImageFile = async (file: File) => {
    if (!avatarMimeTypes.includes(file.type)) {
      setImageError("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > maxAvatarFileSize) {
      setImageError("Profile photos must be 2 MB or smaller.");
      return;
    }

    setImageError(null);
    setFormError(null);
    setIsProcessingImage(true);

    try {
      const dataUrl = await createAvatarDataUrl(file);
      setUploadedImage({ dataUrl, fileName: file.name });
      setImageSource("upload");
    } catch {
      setImageError("We couldn't read that image. Please try another file.");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (file) void applyImageFile(file);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isBusy) setIsDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isBusy) setIsDragging(true);
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

    if (isBusy) return;

    const file = event.dataTransfer.files?.[0];
    if (file) void applyImageFile(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImageUrl("");
    setImageError(null);
    setImageTouched(false);
    setFormError(null);

    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameTouched(true);
    setImageTouched(true);
    setFormError(null);

    if (isProcessingImage) {
      toast.info("Please wait for your photo to finish processing.");
      return;
    }

    if (nameError || imageUrlError) return;

    setIsSaving(true);

    try {
      // Better Auth er updateUser diye name ar image update hocche.
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: selectedImage || null,
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
          image={previewImage}
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
            value={name}
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

        {/* Avatar image: upload ba direct URL, duitai support kori. */}
        <div>
          <p className="text-sm font-semibold text-ink">Profile photo</p>
          <p className="mt-1 text-xs text-ink/45">
            Upload a photo or paste a direct image link.
          </p>

          <div
            role="group"
            aria-label="Profile photo source"
            className="mt-3 inline-flex w-full items-center gap-1 rounded-full border border-ink/10 bg-canvas p-1 shadow-sm sm:w-auto"
          >
            <button
              type="button"
              disabled={isBusy}
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
              disabled={isBusy}
              aria-pressed={imageSource === "link"}
              onClick={() => changeImageSource("link")}
              className={`inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none ${
                imageSource === "link"
                  ? "bg-surface text-brand shadow-sm ring-1 ring-brand/20"
                  : "text-ink/55 hover:bg-surface/70 hover:text-ink"
              }`}
            >
              <FiLink aria-hidden="true" className="h-3.5 w-3.5" />
              Image URL
            </button>
          </div>

          {imageSource === "upload" ? (
            <>
              <input
                ref={imageInputRef}
                id="profile-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={isBusy}
                className="sr-only"
                aria-label="Upload a profile photo"
              />

              <div
                className="mt-3"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadedImage ? (
                  <div
                    className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                      isDragging
                        ? "border-brand bg-brand/10 shadow-inner shadow-brand/10"
                        : "border-ink/10 bg-canvas"
                    }`}
                  >
                    <UserAvatar
                      name={previewName}
                      image={uploadedImage.dataUrl}
                      className="h-14 w-14 text-lg"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">
                        {uploadedImage.fileName}
                      </p>
                      <p className="mt-0.5 text-xs text-ink/50">
                        {isDragging
                          ? "Drop to replace this photo."
                          : "Click change or drop another image to replace it."}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={openImagePicker}
                        disabled={isBusy}
                        aria-label="Replace profile photo"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink transition hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <FiUpload aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={removeImage}
                        disabled={isBusy}
                        aria-label="Remove profile photo"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-red-600 transition hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400"
                      >
                        <FiX aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openImagePicker}
                    disabled={isBusy}
                    className={`group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-dashed px-5 py-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                      isDragging
                        ? "border-brand bg-brand/10 shadow-inner shadow-brand/10"
                        : "border-ink/15 bg-canvas hover:border-brand/50 hover:bg-brand/5"
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/15">
                      {isProcessingImage ? (
                        <FiLoader
                          aria-hidden="true"
                          className="h-5 w-5 animate-spin"
                        />
                      ) : (
                        <FiUploadCloud
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      )}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink">
                        {isProcessingImage
                          ? "Processing image..."
                          : isDragging
                            ? "Drop your image here"
                            : "Click to upload or drag and drop"}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink/50">
                        JPG, PNG, or WebP · Max 2 MB
                      </span>
                    </span>
                  </button>
                )}
              </div>

              {imageError ? (
                <FieldErrorText id="profile-image-error">
                  {imageError}
                </FieldErrorText>
              ) : (
                <p id="profile-image-hint" className="mt-2 text-xs text-ink/45">
                  Square images look best. We resize uploads automatically.
                </p>
              )}
            </>
          ) : (
            <div className="mt-3">
              <label htmlFor="profile-image" className="sr-only">
                Image URL
              </label>

              <input
                id="profile-image"
                name="image"
                type="url"
                inputMode="url"
                autoComplete="url"
                spellCheck={false}
                maxLength={2048}
                placeholder="https://example.com/avatar.jpg"
                value={imageUrl}
                onChange={(event) => {
                  setImageUrl(event.target.value);
                  setImageError(null);
                  setFormError(null);
                }}
                onBlur={() => setImageTouched(true)}
                aria-invalid={showImageUrlError}
                aria-describedby={
                  showImageUrlError
                    ? "profile-image-error"
                    : "profile-image-hint"
                }
                className={`${inputBase} bg-surface px-4 py-3 ${inputTone(
                  showImageUrlError,
                )}`}
              />

              {showImageUrlError && imageUrlError ? (
                <FieldErrorText id="profile-image-error">
                  {imageUrlError}
                </FieldErrorText>
              ) : (
                <p id="profile-image-hint" className="mt-1.5 text-xs text-ink/45">
                  Paste a direct image link, or leave it empty to use your
                  initials.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink/45">
            Changes apply across ChangeNest right away.
          </p>

          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-navy shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 motion-reduce:transform-none"
          >
            {isSaving ? (
              <>
                <FiLoader aria-hidden="true" className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isProcessingImage ? (
              <>
                <FiLoader aria-hidden="true" className="h-4 w-4 animate-spin" />
                Preparing...
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
