import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiEye,
  FiHeart,
  FiPlusCircle,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import logo from "@/app/assets/logo.jpg";

export const metadata: Metadata = {
  title: "About Us | ChangeNest",
  description:
    "Learn how ChangeNest connects volunteers, event organizers, and communities to create positive social change.",
};

// Ei cards gulo About page e "What you can do" section e dekhabe.
const actions = [
  {
    title: "Discover events",
    description:
      "Find social activities and community events that match your interests.",
    icon: FiCalendar,
  },
  {
    title: "Join activities",
    description:
      "Meet new people, volunteer your time, and become part of something meaningful.",
    icon: FiUsers,
  },
  {
    title: "Organize initiatives",
    description:
      "Create your own event and bring your community together around a cause.",
    icon: FiPlusCircle,
  },
] as const;

// Right side er community card er choto tags.
const communityGroups = [
  { label: "Volunteers", icon: FiUsers },
  { label: "Organizers", icon: FiHeart },
  { label: "Communities", icon: FiTarget },
] as const;

const AboutUsPage = () => {
  return (
    // Pura About page er main wrapper.
    <main className="bg-canvas">
      {/* Hero section: intro text ar community card. */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, rgba(22, 163, 74, 0.14), transparent 30%), radial-gradient(circle at 5% 90%, color-mix(in srgb, var(--color-ink) 8%, transparent), transparent 36%)",
          }}
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-surface/80 px-4 py-2 text-sm font-semibold text-ink shadow-sm shadow-navy/5 backdrop-blur">
              <span
                className="h-2 w-2 rounded-full bg-brand"
                aria-hidden="true"
              />
              About ChangeNest
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl xl:text-6xl">
              Together We Grow.{" "}
              <span className="text-brand">Together We Change.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-ink/70 sm:text-lg">
              ChangeNest is a social development and community events platform
              that brings people together to create positive change. We connect
             volunteers, event organizers, and communities to discover
              meaningful activities and make a real difference in society.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-navy shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                Explore Events
                <FiArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>

              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-surface/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                Join Us
              </Link>
            </div>
          </div>

          {/* Branded community card. Ekhane kono photo use kora hoy nai. */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy p-6 shadow-2xl shadow-navy/25 sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
              />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Our community
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Built around people like you
                </p>
              </div>

              <div className="relative mt-8 flex flex-col items-center text-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-3 shadow-xl shadow-brand/20 ring-4 ring-brand/20">
                  <Image
                    src={logo}
                    alt="ChangeNest logo"
                    width={160}
                    height={160}
                    priority
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>

                <p className="mt-6 max-w-xs text-sm leading-6 text-white/70">
                  Together, small actions become real change for our
                  communities.
                </p>
              </div>

              <div className="relative mt-8 grid grid-cols-3 gap-2">
                {communityGroups.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4 text-brand" />
                    <span className="text-[11px] font-medium leading-tight text-white/70 sm:text-xs">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission ar Vision cards. */}
      <section
        aria-labelledby="mission-vision-heading"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      >
        <h2 id="mission-vision-heading" className="sr-only">
          Our mission and vision
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-sm shadow-navy/5 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <FiTarget aria-hidden="true" className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-ink">Our Mission</h3>
            <p className="mt-3 leading-7 text-ink/70">
              Our mission is to make volunteering easier, encourage community
              participation, and support initiatives that build a better future.
            </p>
          </article>

          <article className="rounded-[2rem] bg-navy p-6 text-white shadow-sm shadow-navy/10 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand">
              <FiEye aria-hidden="true" className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-white">Our Vision</h3>
            <p className="mt-3 leading-7 text-white/70">
              To build a connected and supportive community where everyone has
              the opportunity to contribute, inspire others, and create a
              positive social impact.
            </p>
          </article>
        </div>
      </section>

      {/* What you can do section. */}
      <section
        aria-labelledby="actions-heading"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            What you can do
          </p>
          <h2
            id="actions-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            One platform. Many ways to make a difference.
          </h2>
          <p className="mt-4 leading-7 text-ink/70">
            Through ChangeNest, everyone can discover events, join social
            activities, organize initiatives, and become part of something
            meaningful.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {actions.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-sm shadow-navy/5 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-navy/10 motion-reduce:transform-none"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA section. */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-10 shadow-xl shadow-brand/20 sm:px-10 lg:px-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[32px] border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
          />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy/60">
                Be part of something meaningful
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Ready to create change with us?
              </h2>
              <p className="mt-3 leading-7 text-navy/75">
                Discover local events, meet new people, and turn small actions
                into real impact.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-brand motion-reduce:transform-none"
              >
                Explore Events
                <FiArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>

              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-full border border-navy/20 bg-white/85 px-6 py-3.5 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-brand motion-reduce:transform-none"
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

export default AboutUsPage;
