"use client";

import { useState } from "react";
import type { UserAvatarProps } from "@/types";

// Name theke initials ber koro. Example: "Rahim Khan" -> "RK".
const getInitials = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "U";
};

const UserAvatar = ({ name, image, className = "" }: UserAvatarProps) => {
  // Kon image ta load fail koreche ta mone rakhi, jate notun URL dile abar try kora hoy.
  const [failedImage, setFailedImage] = useState<string | null>(null);

  const showImage = Boolean(image) && failedImage !== image;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand/15 font-semibold text-brand ${className}`}
    >
      {image && showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name ? `${name}'s avatar` : "User avatar"}
          onError={() => setFailedImage(image)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </span>
  );
};

export default UserAvatar;
