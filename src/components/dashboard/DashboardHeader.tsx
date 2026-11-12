"use client";

import Link from "next/link";
import { Menu, Plus } from "lucide-react";
import UserAvatar from "@/components/auth/profile/UserAvatar";

type DashboardHeaderProps = {
  user: {
    name: string;
    image?: string | null;
  };
  onOpenMobile: () => void;
};

export default function DashboardHeader({
  user,
  onOpenMobile,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/10 bg-surface/90 px-4 backdrop-blur sm:px-6 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open sidebar navigation"
          className="rounded-2xl border border-ink/10 p-2 text-ink hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Menu aria-hidden="true" className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold tracking-tight text-ink">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href="/create-event"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-brand/90"
        >
          <Plus aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Event</span>
        </Link>
        <Link href="/profile" aria-label="Go to profile">
          <UserAvatar
            name={user.name}
            image={user.image}
            className="h-8 w-8 text-[11px]"
          />
        </Link>
      </div>
    </header>
  );
}
