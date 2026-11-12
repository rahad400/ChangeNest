import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  MapPin,
  Quote,
  Sparkles,
} from "lucide-react";
import { volunteerOfMonth } from "./data";
import { SectionHeading } from "./ui";

const VolunteerOfMonth = () => {
  const {
    name,
    role,
    city,
    quote,
    hours,
    events,
    causes,
    image,
    achievements,
  } = volunteerOfMonth;

  return (
    <section
      aria-labelledby="volunteer-heading"
      className="bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="volunteer-heading"
          eyebrow="Volunteer of the month"
          demo="Sample profile"
          title={
            <>
              The people behind the{" "}
              <span className="font-serif font-normal italic text-brand">
                progress.
              </span>
            </>
          }
          description="Every month, we celebrate someone who keeps showing up — not for the spotlight, but because the work matters."
          action={
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Meet the community
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          }
        />

        <div className="relative mt-10 overflow-hidden rounded-[2.5rem] bg-navy text-white shadow-2xl shadow-navy/15">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse at center, black, transparent 74%)",
            }}
          />

          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-7 sm:p-10 lg:p-12 xl:p-14">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                  <Award aria-hidden="true" className="h-3.5 w-3.5" />
                  Volunteer spotlight
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Sample profile
                </span>
              </div>

              <h3 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                {name}
              </h3>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/55">
                <span>{role}</span>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-white/25"
                />
                <span className="inline-flex items-center gap-1">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {city}
                </span>
              </p>

              <blockquote className="relative mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                <Quote
                  aria-hidden="true"
                  className="absolute -left-1 -top-4 h-8 w-8 text-brand/20"
                />
                <span className="relative pl-6">{quote}</span>
              </blockquote>

              <dl className="mt-7 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04] py-4 text-center">
                <div>
                  <dd className="text-2xl font-bold text-white">{hours}</dd>
                  <dt className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Hours
                  </dt>
                </div>
                <div>
                  <dd className="text-2xl font-bold text-white">{events}</dd>
                  <dt className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Events
                  </dt>
                </div>
                <div>
                  <dd className="text-2xl font-bold text-white">{causes}</dd>
                  <dt className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Causes
                  </dt>
                </div>
              </dl>

              <ul className="mt-6 space-y-2.5">
                {achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex items-start gap-2.5 text-sm text-white/65"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    />
                    {achievement}
                  </li>
                ))}
              </ul>

              <Link
                href="/sign-up"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-navy transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                Start your own story
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                />
              </Link>
            </div>

            <div className="relative min-h-[24rem] lg:min-h-full">
              <Image
                src={image}
                alt={`${name}, ${role}`}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-navy/45 lg:via-transparent"
              />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">
                    This month&apos;s recognition
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Community cleanup lead
                  </p>
                </div>
                <Award aria-hidden="true" className="h-6 w-6 text-brand" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerOfMonth;
