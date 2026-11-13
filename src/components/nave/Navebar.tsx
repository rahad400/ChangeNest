"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import logo from "@/app/assets/logo.jpg";
import { useSession } from "@/app/lib/auth-client";

import ThemeToggle from "@/components/nave/ThemeToggle";
import User from "../auth/profile/user";

// Dashboard shell er mobile e nijer header ache, tai global navbar hide thakbe.
const dashboardShellRoutes = [
  "/dashboard",
  "/profile",
  "/my-events",
  "/my-joined-events",
] as const;

const isDashboardShellRoute = (pathname: string) =>
  dashboardShellRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

// Ei link ta current page er link kina check kore.
const isActiveLink = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === "/dashboard") {
    return (
      pathname === "/dashboard" ||
      pathname.startsWith("/dashboard/") ||
      pathname.startsWith("/my-events") ||
      pathname.startsWith("/my-joined-events") ||
      pathname.startsWith("/create-event") ||
      pathname.startsWith("/event-edit") ||
      pathname.startsWith("/profile")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

const Navebar = () => {
  const pathname = usePathname();
  const isDashboardShell = isDashboardShellRoute(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();

  // Desktop navigation links: logged in user der jonno Dashboard samne thake
  const desktopNavLinks = session?.user
    ? [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Upcoming Events", href: "/upcoming-event" },
        { label: "About", href: "/about-us" },
        { label: "Contact", href: "/contact" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Upcoming Events", href: "/upcoming-event" },
        { label: "About", href: "/about-us" },
        { label: "Contact", href: "/contact" },
      ];

  // Mobile navigation links: sohoje jate sob page e jaoa jay
  const mobileNavLinks = session?.user
    ? [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Upcoming Events", href: "/upcoming-event" },
        { label: "About", href: "/about-us" },
        { label: "Contact", href: "/contact" },
      ]
    : desktopNavLinks;

  // Mobile menu open thakle Escape key chaple menu bondho hobe.
  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    // Sticky header: page scroll korleo navbar upore fixed thake.
    <header
      className={`sticky top-0 z-50 border-b border-ink/10 bg-surface/90 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/80 ${
        isDashboardShell ? "hidden lg:block" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Mobile menu open/close button. */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:hidden"
        >
          {isOpen ? (
            <FiX aria-hidden="true" className="h-5 w-5" />
          ) : (
            <FiMenu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>

        {/* Logo ar brand name. Click korle home page e jabe. */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="ChangeNest home"
          className="group flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:gap-3"
        >
          <Image
            src={logo}
            alt="ChangeNest logo"
            width={48}
            height={48}
            priority
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-brand/20 transition-transform duration-200 group-hover:scale-105 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
          />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Change<span className="text-brand">Nest</span>
            </span>
            <span className="truncate text-[10px] font-medium uppercase tracking-[0.16em] text-ink/50 sm:text-[11px]">
              Together We Grow
            </span>
          </span>
        </Link>

        {/* Desktop menu. Boro screen e dekhabe. */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {desktopNavLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-brand after:transition-transform after:duration-200 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  active
                    ? "font-semibold text-brand after:scale-x-100"
                    : "text-ink/75 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle ar auth actions. Sob screen size e visible. */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <span
              aria-hidden="true"
              className="h-9 w-9 animate-pulse rounded-full bg-canvas"
            />
          ) : session?.user ? (
            <User />
          ) : (
            <>
              <Link
                href="/sign-in"
                className="group relative hidden items-center gap-2 overflow-hidden rounded-full border border-ink/15 bg-surface px-3.5 py-2 text-sm font-semibold text-ink shadow-sm shadow-navy/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/5 hover:text-brand hover:shadow-md hover:shadow-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:inline-flex motion-reduce:transform-none"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-200 group-hover:bg-brand group-hover:text-white">
                  <FiLogIn
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  />
                </span>
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="hidden items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-navy shadow-sm shadow-brand/20 transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:inline-flex"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu. Choto screen e button chaple niche open hobe. */}
      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full border-t border-ink/10 bg-surface shadow-xl shadow-navy/5 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <nav className="px-4 py-4 sm:px-6" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {mobileNavLinks.map((link) => {
              const active = isActiveLink(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                      active
                        ? "bg-brand/10 font-semibold text-brand"
                        : "text-ink/75 hover:bg-canvas hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <span
                        className="h-2 w-2 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Signed out hole mobile menu e login ar get started. */}
          {!isPending && !session?.user ? (
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Link
                href="/sign-in"
                onClick={closeMenu}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-ink/15 bg-canvas/60 px-5 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:border-brand/40 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <FiLogIn
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                />
                Log in
              </Link>
              <Link
                href="/sign-up"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Get started
              </Link>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navebar;
