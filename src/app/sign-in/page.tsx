import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiHeart, FiUsers } from "react-icons/fi";
import logo from "@/app/assets/logo.jpg";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | ChangeNest",
  description:
    "Sign in to your ChangeNest account to discover community events, connect with volunteers, and keep making a difference.",
};

// Left panel er benefit list.
const benefits = [
  {
    title: "Everything in one place",
    description: "Your events, registrations, and activity stay together.",
    icon: FiCalendar,
  },
  {
    title: "Stay close to your community",
    description: "Reconnect with volunteers and organizers around you.",
    icon: FiUsers,
  },
  {
    title: "Keep the momentum going",
    description: "Small actions add up to meaningful change.",
    icon: FiHeart,
  },
] as const;

const SignInPage = () => {
  return (
    // Pura sign-in page er main wrapper.
    <main className="relative isolate overflow-hidden bg-canvas">
      {/* Soft emerald ar navy background glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 8%, rgba(22, 163, 74, 0.14), transparent 30%), radial-gradient(circle at 8% 92%, rgba(15, 23, 42, 0.07), transparent 34%)",
        }}
      />

      {/* Halka grid pattern. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 72%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Main card: left e brand panel, right e form. */}
        <div className="rise-in overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-[0_40px_120px_-60px_rgba(15,23,42,0.5)] sm:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            {/* Left brand panel. Mobile e hidden thake. */}
            <aside className="relative hidden overflow-hidden bg-ink p-10 text-white lg:flex lg:flex-col xl:p-12">
              {/* Panel er vitore emerald glow. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
              />

              {/* Halka dot pattern. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Choto decorative ring. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full border border-white/5"
              />

              {/* Logo ar brand name. */}
              <div className="relative">
                <Link
                  href="/"
                  aria-label="Change Nest home"
                  className="inline-flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <Image
                    src={logo}
                    alt="Change Nest logo"
                    width={48}
                    height={48}
                    className="h-11 w-11 rounded-2xl object-cover ring-2 ring-white/15"
                  />
                  <span className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-white">
                      Change <span className="text-brand">Nest</span>
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                      Together We Grow
                    </span>
                  </span>
                </Link>
              </div>

              {/* Main message. */}
              <div className="relative mt-14">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand backdrop-blur">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  Welcome back
                </p>

                <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
                  Your community is waiting.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/60 xl:text-base">
                  Sign in to pick up where you left off and keep making a
                  difference with people who care about the same things.
                </p>

                {/* Benefit list. */}
                <ul className="mt-8 space-y-3">
                  {benefits.map(({ title, description, icon: Icon }) => (
                    <li
                      key={title}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white">
                          {title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-white/55">
                          {description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Panel er niche choto closing line. */}
              <div className="relative mt-auto border-t border-white/10 pt-6">
                <p className="text-sm font-semibold text-white">
                  Small actions. Real impact.
                </p>
                <p className="mt-1 text-xs leading-5 text-white/50">
                  Your next opportunity to help is already waiting inside.
                </p>
              </div>
            </aside>

            {/* Right side: sign-in form card. */}
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="mx-auto w-full max-w-md">
                <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  Member sign in
                </p>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Welcome back
                </h1>

                <p className="mt-3 text-sm leading-7 text-ink/60 sm:text-base">
                  Sign in to your ChangeNest account to continue where you left
                  off.
                </p>

                <SignInForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
