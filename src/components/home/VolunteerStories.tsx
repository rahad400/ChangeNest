import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Quote,
} from "lucide-react";
import { testimonials } from "./data";
import { SectionHeading } from "./ui";

const VolunteerStories = () => {
  return (
    <section
      aria-labelledby="stories-heading"
      className="bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="stories-heading"
          eyebrow="Volunteer testimonials"
          demo="Illustrative testimonials"
          title={
            <>
              The best part of ChangeNest is{" "}
              <span className="font-serif font-normal italic text-brand">
                the people.
              </span>
            </>
          }
          description="Different causes, different cities, same feeling after a good morning well spent. These are a few of the voices behind the numbers."
          action={
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Share your story
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map(({ quote, name, role, event, image }, index) => {
            const featured = index === 0;

            return (
              <figure
                key={name}
                className={`relative flex flex-col overflow-hidden rounded-[2rem] border p-6 shadow-sm sm:p-7 ${
                  featured
                    ? "border-brand/30 bg-surface text-ink shadow-lg shadow-brand/5 ring-1 ring-brand/20 dark:border-white/10 dark:bg-navy dark:text-white dark:shadow-navy/10"
                    : "border-ink/10 bg-surface text-ink shadow-navy/5"
                }`}
              >
                {featured ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/15 blur-3xl dark:bg-brand/20"
                  />
                ) : null}

                <div className="relative flex items-center justify-between gap-3">
                  <Quote
                    aria-hidden="true"
                    className={`h-7 w-7 ${
                      featured ? "text-brand" : "text-brand/35"
                    }`}
                  />
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] ${
                      featured
                        ? "bg-brand/10 text-brand dark:bg-white/10 dark:text-white/70"
                        : "bg-canvas text-ink/45"
                    }`}
                  >
                    <CalendarDays aria-hidden="true" className="h-3 w-3" />
                    {event}
                  </span>
                </div>

                <blockquote
                  className={`relative mt-4 flex-1 text-sm leading-7 sm:text-base sm:leading-8 ${
                    featured
                      ? "text-ink/80 dark:text-white/80"
                      : "text-ink/70"
                  }`}
                >
                  {quote}
                </blockquote>

                <figcaption
                  className={`relative mt-7 flex items-center gap-3 border-t pt-5 ${
                    featured ? "border-ink/10 dark:border-white/10" : "border-ink/10"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${name}, volunteer`}
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-brand/20"
                  />
                  <span className="min-w-0">
                    <span
                      className={`block truncate text-sm font-bold ${
                        featured ? "text-ink dark:text-white" : "text-ink"
                      }`}
                    >
                      {name}
                    </span>
                    <span
                      className={`mt-0.5 flex items-center gap-1 text-xs ${
                        featured ? "text-ink/50 dark:text-white/45" : "text-ink/45"
                      }`}
                    >
                      <MapPin aria-hidden="true" className="h-3 w-3" />
                      {role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VolunteerStories;
