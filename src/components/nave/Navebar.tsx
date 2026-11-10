"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import logo from "@/app/assets/logo.jpg";
import { signOut, useSession } from "@/app/lib/auth-client";
import UserAvatar from "@/components/profile/UserAvatar";

// Navbar er menu links. Notun link lagle ekhane add koro.
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
] as const;

// Ei link ta current page er link kina check kore.
// Example: /about-us page e thakle "About Us" active hobe.
const isActiveLink = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

const Navebar = () => {
  // Current page er path. Example: "/" or "/about".
  const pathname = usePathname();
  const router = useRouter();

  // Mobile menu open (true) ba closed (false) ache kina.
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = useSession();

  // Mobile menu open thakle Escape key chaple menu bondho hobe.
  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  // Menu close korar choto helper.
  const closeMenu = () => setIsOpen(false);

  // Sign out er por session clear hobe ar page refresh hobe.
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

      closeMenu();
      toast.success("You've been signed out.");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong while signing you out.");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Navbar e user er first name dekhabo.
  const firstName = session?.user.name?.trim().split(/\s+/)[0] || "Profile";

  return (
    // Sticky header: page scroll korleo navbar upore fixed thake.
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
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
          aria-label="Change Nest home"
          className="group flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:gap-3"
        >
          <Image
            src={logo}
            alt="Change Nest logo"
            width={48}
            height={48}
            priority
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-brand/20 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
          />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-lg font-bold tracking-tight text-ink sm:text-xl">
              Change <span className="text-brand">Nest</span>
            </span>
            <span className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-[0.16em] text-ink/50 sm:text-[11px]">
              Together We Grow
            </span>
          </span>
        </Link>

        {/* Desktop menu. Boro screen e dekhabe. */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            // Ei link ta active kina check koro.
            const active = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-brand after:transition-transform after:duration-200 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  active
                    ? "text-green-600  after:scale-x-100"
                    : "text-ink/70 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Session thakle profile ar sign out, nahole sign in. */}
        <div className="hidden items-center gap-2 sm:flex">
          {isPending ? (
            <span
              aria-hidden="true"
              className="h-9 w-9 animate-pulse rounded-full bg-canvas"
            />
          ) : session?.user ? (
            <>
              <Link
                href="/profile"
                aria-label="Open your profile"
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white py-1 pl-1 pr-3 text-sm font-semibold text-ink transition-colors hover:border-ink/20 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <UserAvatar
                  name={session.user.name}
                  image={session.user.image}
                  className="h-8 w-8 text-[11px]"
                />
                <span className="max-w-24 truncate">{firstName}</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-3.5 py-2 text-sm font-semibold text-ink/70 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiLogOut aria-hidden="true" className="h-4 w-4" />
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink shadow-sm shadow-brand/20 transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu. Choto screen e button chaple niche open hobe. */}
      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full border-t border-ink/10 bg-white shadow-xl shadow-ink/5 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <nav className="px-4 py-4 sm:px-6" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              // Ei link ta active kina check koro.
              const active = isActiveLink(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                      active
                        ? "bg-brand/10 text-ink"
                        : "text-ink/70 hover:bg-canvas hover:text-ink"
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

          {/* Mobile screen er profile ar sign out actions. */}
          {isPending ? null : session?.user ? (
            <div className="mt-4 space-y-2 sm:hidden">
              <Link
                href="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl border border-ink/10 bg-canvas px-4 py-3 transition-colors hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <UserAvatar
                  name={session.user.name}
                  image={session.user.image}
                  className="h-10 w-10 text-sm"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {session.user.name}
                  </span>
                  <span className="block truncate text-xs text-ink/50">
                    {session.user.email}
                  </span>
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 px-4 py-3 text-sm font-semibold text-ink/70 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiLogOut aria-hidden="true" className="h-4 w-4" />
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              onClick={closeMenu}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:hidden"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navebar;
