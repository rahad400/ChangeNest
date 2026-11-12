"use client";

import { useState, type Key } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "@heroui/react";
import { toast } from "react-toastify";
import {
  FiCalendar,
  FiGrid,
  FiLogOut,
  FiPlusCircle,
  FiUser,
} from "react-icons/fi";
import { signOut, useSession } from "@/app/lib/auth-client";
import UserAvatar from "./UserAvatar";

import { FaRegCalendarCheck } from "react-icons/fa6";

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
      case "dashboard":
        router.push("/dashboard");
        break;
      case "profile":
        router.push("/profile");
        break;
      case "create-event":
        router.push("/create-event");
        break;
      case "my-joined-events":
        router.push("/my-joined-events");
        break;
      case "my-events":
        router.push("/my-events");
        break;
      case "sign-out":
        void handleSignOut();
        break;
    }
  };

  // Session na thakle user menu dekhabo na.
  if (isPending || !session?.user) return null;

  const user = session.user;

  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Open user menu"
        className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink transition-all hover:border-brand/40 hover:bg-canvas hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:h-10 sm:w-10"
      >
        {user.image ? (
          <UserAvatar
            name={user.name}
            image={user.image}
            className="h-full w-full text-[11px]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-full text-ink transition-colors group-hover:text-brand">
            <FiUser className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </span>
        )}
      </Dropdown.Trigger>

      <Dropdown.Popover placement="bottom end">
        <Dropdown.Menu aria-label="User menu" onAction={handleAction}>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <span className="flex items-center gap-2">
              <FiGrid aria-hidden="true" className="h-4 w-4 text-ink/55" />
              Dashboard
            </span>
          </Dropdown.Item>

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
          <Dropdown.Item id="my-joined-events" textValue="My Joined Events">
            <span className="flex items-center gap-2">
              <FaRegCalendarCheck 
                aria-hidden="true"
                className="h-4 w-4 text-ink/55"
              />
              My Joined Events
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
