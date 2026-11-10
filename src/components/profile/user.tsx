"use client";

import { useState, type Key } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "@heroui/react";
import { toast } from "react-toastify";
import {
  FiCalendar,
  FiChevronDown,
  FiLogOut,
  FiPlusCircle,
  FiUser,
} from "react-icons/fi";
import { signOut, useSession } from "@/app/lib/auth-client";
import UserAvatar from "./UserAvatar";

const User = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Sign out er por session clear hobe ar home page e fire jabo.
  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await signOut();

      if (error) {
        toast.error(
          error.message || "Couldn't sign you out. Please try again.",
        );
        return;
      }

      toast.success("You've been signed out.");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong while signing you out.");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Menu item click korle ei handler ta cholbe.
  const handleAction = (key: Key) => {
    switch (key) {
      case "profile":
        router.push("/profile");
        break;
      case "create-event":
        router.push("/events/create");
        break;
      case "my-events":
        router.push("/events");
        break;
      case "sign-out":
        void handleSignOut();
        break;
    }
  };

  // Session na thakle user menu dekhabo na.
  if (isPending || !session?.user) return null;

  const user = session.user;
  const firstName = user.name?.trim().split(/\s+/)[0] || "Profile";

  return (
    <Dropdown>
      <Dropdown.Trigger className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white py-1 pl-1 pr-3 text-sm font-semibold text-ink transition-colors hover:border-ink/20 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
        <UserAvatar
          name={user.name}
          image={user.image}
          className="h-8 w-8 text-[11px]"
        />
        <span className="max-w-24 truncate">{firstName}</span>
        <FiChevronDown
          aria-hidden="true"
          className="h-3.5 w-3.5 text-ink/45"
        />
      </Dropdown.Trigger>

      <Dropdown.Popover placement="bottom end">
        <Dropdown.Menu aria-label="User menu" onAction={handleAction}>
          <Dropdown.Item id="profile" textValue="Profile">
            <span className="flex items-center gap-2">
              <FiUser aria-hidden="true" className="h-4 w-4 text-ink/55" />
              Profile
            </span>
          </Dropdown.Item>

          <Dropdown.Item id="create-event" textValue="Create Event">
            <span className="flex items-center gap-2">
              <FiPlusCircle
                aria-hidden="true"
                className="h-4 w-4 text-ink/55"
              />
              Create Event
            </span>
          </Dropdown.Item>

          <Dropdown.Item id="my-events" textValue="My Events">
            <span className="flex items-center gap-2">
              <FiCalendar aria-hidden="true" className="h-4 w-4 text-ink/55" />
              My Events
            </span>
          </Dropdown.Item>

          <Dropdown.Item
            id="sign-out"
            textValue="Sign Out"
            isDisabled={isSigningOut}
            className="text-red-600"
          >
            <span className="flex items-center gap-2">
              <FiLogOut aria-hidden="true" className="h-4 w-4" />
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default User;
