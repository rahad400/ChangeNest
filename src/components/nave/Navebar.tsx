"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "@/app/assets/logo.jpg";

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

  // Mobile menu open (true) ba closed (false) ache kina.
  const [isOpen, setIsOpen] = useState(false);

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
                    ? "text-ink after:scale-x-100"
                    : "text-ink/70 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign In button. Choto screen e hidden thake. */}
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="hidden items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink shadow-sm shadow-brand/20 transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:inline-flex"
          >
            Sign In
          </Link>
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

          {/* Mobile screen er Sign In button. */}
          <Link
            href="/sign-in"
            onClick={closeMenu}
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:hidden"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navebar;
