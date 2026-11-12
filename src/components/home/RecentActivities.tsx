import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";
import { recentActivities } from "./data";
import { SectionHeading } from "./ui";

const RecentActivities = () => {
  const [featured, ...rest] = recentActivities;

  return (
    <section
      aria-labelledby="activities-heading"
      className="bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="activities-heading"
          eyebrow="Recent community activities"
          demo="Sample activity feed"
          title={
            <>
              Good things that{" "}
              <span className="font-serif font-normal italic text-brand">
                already happened.
              </span>
            </>
          }
          description="A look back at the mornings, afternoons, and shared efforts that made a neighbourhood feel a little more like a nest."
          action={
            <Link
              href="/upcoming-event"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              See what&apos;s next
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          {/* Boro editorial card. Image er upor content overlay. */}
          <article className="group relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-navy shadow-sm shadow-navy/10">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/5"
            />

            <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-3 sm:inset-x-7 sm:top-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brand"
                />
                Completed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy/35 px-3 py-1.5 text-[10px] font-semibold text-white/80 backdrop-blur">
                <CalendarDays aria-hidden="true" className="h-3 w-3" />
                {featured.date}
              </span>
            </div>

            <div className="absolute inset-x-6 bottom-6 sm:inset-x-7 sm:bottom-7">
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-white/65">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {featured.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users aria-hidden="true" className="h-3.5 w-3.5" />
                  {featured.participants} participants
                </span>
              </p>

              <h3 className="mt-3 max-w-lg text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/65">
                {featured.description}
              </p>

              <Link
                href="/upcoming-event"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                Read the recap
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                />
              </Link>
            </div>
          </article>

          <div className="grid gap-5">
            {rest.map((activity) => (
              <article
                key={activity.title}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface shadow-sm shadow-navy/5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-navy/10 motion-reduce:transform-none sm:flex-row"
              >
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-navy sm:aspect-auto sm:w-40 lg:w-44">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(min-width: 1024px) 176px, (min-width: 640px) 160px, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05] motion-reduce:transform-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent sm:bg-gradient-to-r"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-5">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    <span className="inline-flex items-center gap-1">
                      <MapPin aria-hidden="true" className="h-3 w-3" />
                      {activity.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users aria-hidden="true" className="h-3 w-3" />
                      {activity.participants}
                    </span>
                  </p>

                  <h3 className="mt-2 text-base font-bold tracking-tight text-ink">
                    {activity.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-ink/50">
                    {activity.description}
                  </p>

                  <p className="mt-auto pt-4 text-[10px] font-medium text-ink/35">
                    {activity.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentActivities;
