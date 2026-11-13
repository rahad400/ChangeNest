"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ExternalLink,
  Home,
  LayoutDashboard,
  LogOut,
  User,
  X,
} from "lucide-react";
import logo from "@/app/assets/logo.jpg";
import { signOut } from "@/app/lib/auth-client";
import UserAvatar from "@/components/auth/profile/UserAvatar";
import { toast } from "react-toastify";

type DashboardSidebarProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

const navigationItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Joined Events",
    href: "/my-joined-events",
    icon: CheckCircle2,
  },
  {
    label: "My Created Events",
    href: "/my-events",
    icon: CalendarDays,
  },
  {
    label: "Profile Settings",
    href: "/profile",
    icon: User,
  },
] as const;

export default function DashboardSidebar({
  user,
  mobileOpen,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile drawer on route change
  useEffect(() => {
    onCloseMobile();
  }, [pathname, onCloseMobile]);

  // Handle escape key to close mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseMobile();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onCloseMobile]);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error(error.message || "Failed to sign out.");
        return;
      }
      toast.success("Signed out successfully.");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("An error occurred during sign out.");
    }
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto p-5">
      {/* Top: Logo and Navigation */}
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between gap-3 px-2">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Image
              src={logo}
              alt="ChangeNest"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-brand/20"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-ink">
                Change <span className="text-brand">Nest</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/45">
                Dashboard
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="rounded-full p-2 text-ink/50 hover:bg-canvas hover:text-ink lg:hidden"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Action: Create Event */}
        <div className="mt-6 px-2">
          <Link
            href="/create-event"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <CalendarPlus aria-hidden="true" className="h-4 w-4" />
            Create Event
          </Link>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Dashboard sidebar navigation" className="mt-6 space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand/10 text-brand shadow-sm shadow-brand/5"
                    : "text-ink/65 hover:bg-canvas hover:text-ink"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className={`h-4 w-4 ${isActive ? "text-brand" : "text-ink/45"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: User Card and Site Link */}
      <div className="space-y-3 border-t border-ink/10 pt-4">
        {/* Link back to public site */}
        <Link
          href="/"
          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-ink/55 transition hover:bg-canvas hover:text-ink"
        >
          <span className="flex items-center gap-2">
            <Home aria-hidden="true" className="h-3.5 w-3.5" />
            ChangeNest Home
          </span>
          <ExternalLink aria-hidden="true" className="h-3 w-3" />
        </Link>

        {/* User Profile Card */}
        <div className="flex items-center rounded-2xl border border-ink/10 bg-canvas p-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <UserAvatar
              name={user.name}
              image={user.image}
              className="h-9 w-9 text-xs"
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-ink">
                {user.name}
              </p>
              <p className="truncate text-[10px] text-ink/45">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Log out: red border ar red text, jate danger action clear hoy. */}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-500 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-red-500/50 dark:text-red-400 dark:hover:border-red-400 dark:hover:bg-red-500/10"
        >
          <LogOut aria-hidden="true" className="h-4 w-4" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (lg+) */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-ink/10 bg-surface lg:block lg:top-20 lg:h-[calc(100vh-5rem)]">
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop & Slide-over */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            aria-hidden="true"
            onClick={onCloseMobile}
            className="fixed inset-0 bg-navy/40 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer sheet */}
          <div className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-surface shadow-2xl transition-transform">
            {navContent}
          </div>
        </div>
      ) : null}
    </>
  );
}
