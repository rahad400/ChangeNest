import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { howItWorksSteps } from "./data";
import { SectionHeading } from "./ui";

const HowItWorks = () => {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="border-y border-ink/5 bg-surface py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="how-it-works-heading"
          align="center"
          eyebrow="How it works"
          title={
            <>
              From curious to{" "}
              <span className="font-serif font-normal italic text-brand">
                contributing
              </span>{" "}
              in three steps.
            </>
          }
          description="No lengthy application, no special skills required. Just find something that feels right and take the first step."
        />

        <div className="relative mt-14">
          {/* Desktop connector line. Icons er pichone subtle dashed line. */}
          <div
            aria-hidden="true"
            className="absolute left-[17%] right-[17%] top-8 hidden border-t border-dashed border-ink/15 lg:block"
          />

          <ol className="relative grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {howItWorksSteps.map(
              ({ title, description, icon: Icon, points }, index) => (
                <li
                  key={title}
                  className="flex flex-col items-center text-center"
                >
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/15 bg-brand/10 text-brand shadow-sm shadow-brand/10">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white ring-4 ring-surface">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>

                  <h3 className="mt-6 text-lg font-bold tracking-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-ink/55">
                    {description}
                  </p>

                  <ul className="mt-4 space-y-2 text-left">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-xs leading-5 text-ink/50"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ),
            )}
          </ol>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-ink/5 pt-8 text-center sm:flex-row sm:gap-4 sm:text-left">
          <p className="text-sm text-ink/50">
            Most volunteers start with one event. That&apos;s enough.
          </p>
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Find your first event
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
