import Image from "next/image";
import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import logo from "@/app/assets/logo.jpg";

// Quick links er list. Navbar er sathe same route use kora hoyeche.
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-event" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
] as const;

// Get involved links mapped to working application routes
const involvedLinks = [
  { label: "Explore Events", href: "/upcoming-event" },
  { label: "Create Event", href: "/create-event" },
  { label: "Join & Volunteer", href: "/sign-up" },
] as const;

// Social links. Real profile link pele href update koro.
const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
] as const;

// Contact info list. Phone ar location ekhono placeholder.
const contactItems = [
  {
    label: "support@changenest.com",
    href: "mailto:support@changenest.com",
    icon: FiMail,
  },
  {
    label: "+880 1XXXXXXXXX",
    href: null,
    icon: FiPhone,
  },
  {
    label: "Dhaka, Bangladesh",
    href: null,
    icon: FiMapPin,
  },
] as const;

// Footer er section heading er common style.
const headingStyles =
  "text-xs font-semibold uppercase tracking-[0.18em] text-white/50";

// Footer link er common style.
const linkStyles =
  "rounded-sm text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy text-white">
      {/* Footer er upore halka emerald gradient line. */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-brand/50 to-transparent"
      />

      {/* Navy background er vitore soft emerald glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-brand/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        {/* Main grid: mobile e 2 column, desktop e 12 column. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand section. */}
          <div className="col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label="ChangeNest home"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <Image
                src={logo}
                alt="ChangeNest logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-brand/30"
              />
              <span className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">
                  Change <span className="text-brand">Nest</span>
                </span>
                <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  Together We Grow
                </span>
              </span>
            </Link>

            <p className="mt-5 inline-flex items-start gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
              />
              Together We Grow. Together We Change.
            </p>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
              ChangeNest brings volunteers, organizers, and communities together
              to create positive social change through meaningful events and
              activities.
            </p>
          </div>

          {/* Quick Links. */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className={headingStyles}>Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={linkStyles}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved. */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className={headingStyles}>Get Involved</h2>
            <ul className="mt-4 space-y-2.5">
              {involvedLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={linkStyles}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact. */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h2 className={headingStyles}>Contact</h2>
            <ul className="mt-4 space-y-3">
              {contactItems.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="group flex items-start gap-2.5 rounded-sm text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                    >
                      <Icon
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      />
                      <span className="break-words">{label}</span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-2.5 text-sm text-white/60">
                      <Icon
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      />
                      <span className="break-words">{label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us. */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h2 className={headingStyles}>Follow Us</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`ChangeNest on ${label}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 transition hover:border-brand/30 hover:bg-brand/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-3 w-3 text-brand"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar: copyright ar policy links. */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>© 2026 ChangeNest. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy"
              className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
            <Link
              href="/terms"
              className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
