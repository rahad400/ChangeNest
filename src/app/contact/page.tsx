import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | ChangeNest",
  description:
    "Contact the ChangeNest team about community events, volunteering, partnerships, or anything else on your mind.",
};

// Contact information er card data.
// Email chara onno gulote href nai, tai segulo plain text hisebe show hobe.
const contactDetails = [
  {
    label: "Email",
    value: "support@changenest.com",
    helper: "Best for questions, ideas, and partnerships.",
    icon: FiMail,
    href: "mailto:support@changenest.com",
  },
  {
    label: "Phone",
    value: "+880 1XXXXXXXXX",
    helper: "Call us during working hours.",
    icon: FiPhone,
    href: null,
  },
  {
    label: "Location",
    value: "Dhaka, Bangladesh",
    helper: "Our home base for community events.",
    icon: FiMapPin,
    href: null,
  },
];

// Social icon list. Real profile link pele href update koro.
const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
];

const ContactPage = () => {
  return (
    // Pura Contact page er main wrapper.
    <main className="bg-canvas">
      {/* Hero section: heading, intro, ar quick actions. */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, rgba(22, 163, 74, 0.14), transparent 30%), radial-gradient(circle at 5% 90%, color-mix(in srgb, var(--color-ink) 8%, transparent), transparent 36%)",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-surface/80 px-4 py-2 text-sm font-semibold text-ink shadow-sm shadow-navy/5 backdrop-blur">
              <span
                className="h-2 w-2 rounded-full bg-brand"
                aria-hidden="true"
              />
              Contact Us
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl xl:text-6xl">
              We&apos;d Love to{" "}
              <span className="text-brand">Hear From You!</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
              Have questions, suggestions, or want to organize a community
              event? We&apos;re here to help. Get in touch with the ChangeNest
              team and let&apos;s make a positive difference together.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-navy shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                Send a message
                <FiSend aria-hidden="true" className="h-4 w-4" />
              </Link>

              <a
                href="mailto:support@changenest.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-surface/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                <FiMail aria-hidden="true" className="h-4 w-4" />
                Email us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact information cards. */}
      <section
        aria-labelledby="contact-info-heading"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Contact Information
          </p>
          <h2
            id="contact-info-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            The easiest ways to reach us
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactDetails.map(({ label, value, helper, icon: Icon, href }) => (
            <article
              key={label}
              className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-sm shadow-navy/5 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-navy/10 motion-reduce:transform-none"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">
                {label}
              </h3>

              {href ? (
                <a
                  href={href}
                  className="mt-1 inline-block break-words text-lg font-bold text-ink transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-1 break-words text-lg font-bold text-ink">
                  {value}
                </p>
              )}

              <p className="mt-2 text-sm leading-6 text-ink/60">{helper}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Message form ar sidebar. */}
      <section
        id="contact-form"
        aria-labelledby="contact-form-heading"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form card. */}
          <div className="rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-sm shadow-navy/5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Send a message
            </p>
            <h2
              id="contact-form-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              Tell us what&apos;s on your mind
            </h2>
            <p className="mt-3 leading-7 text-ink/65">
              Questions, ideas, or an event you want to organize — write to us
              and the ChangeNest team will get back to you.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Sidebar: working hours ar social media. */}
          <div className="flex flex-col gap-6">
            {/* Working hours er navy card. */}
            <div className="relative overflow-hidden rounded-[2rem] bg-navy p-6 text-white shadow-xl shadow-navy/20 sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/20 blur-3xl"
              />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/15 text-brand">
                  <FiClock aria-hidden="true" className="h-5 w-5" />
                </div>

                <h2 className="mt-4 text-xl font-bold text-white">
                  Working Hours
                </h2>

                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-white/60">Saturday – Thursday</dt>
                    <dd className="font-semibold text-white">
                      9:00 AM – 6:00 PM
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-white/60">Friday</dt>
                    <dd className="font-semibold text-brand">Closed</dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm leading-6 text-white/60">
                  Send a message anytime — we&apos;ll reply during working
                  hours.
                </p>
              </div>
            </div>

            {/* Social media card. */}
            <div className="rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-sm shadow-navy/5 sm:p-8">
              <h2 className="text-xl font-bold text-ink">Social Media</h2>
              <p className="mt-3 text-sm leading-6 text-ink/60">
                Stay connected with ChangeNest and follow our community
                activities on social media.
              </p>

              <ul className="mt-5 flex gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-canvas text-ink transition hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing tagline band. */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-10 shadow-xl shadow-navy/20 sm:px-10 lg:px-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-brand/10 blur-2xl"
          />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Be part of the change
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Together We Grow. Together We Change.
              </h2>
              <p className="mt-3 leading-7 text-white/65">
                Have an idea for a community event? We&apos;d love to help you
                get it started.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Link
                href="/upcoming-event"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-navy shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy motion-reduce:transform-none"
              >
                Explore Events
                <FiArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy motion-reduce:transform-none"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
