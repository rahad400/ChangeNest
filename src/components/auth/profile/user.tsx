"use client";

import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { useSession } from "@/app/lib/auth-client";
import UserAvatar from "./UserAvatar";

// Navbar e direct profile link. Account nav sidebar/dashboard e ache.
const User = () => {
  const { data: session, isPending } = useSession();

  if (isPending || !session?.user) return null;

  const user = session.user;

  return (
    <Link
      href="/profile"
      aria-label="Go to your profile"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink transition-all hover:border-brand/40 hover:bg-canvas hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:h-10 sm:w-10"
    >
      {user.image ? (
        <UserAvatar
          name={user.name}
          image={user.image}
          className="h-full w-full text-[11px]"
        />
      ) : (
        <FiUser className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      )}
    </Link>
  );
};

export default User;
