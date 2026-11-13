import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, type CategoryId } from "./data";
import { SectionHeading } from "./ui";
import type { IEvent } from "@/types";

type CategoryGridProps = {
  events: IEvent[];
};

const CategoryGrid = ({ events }: CategoryGridProps) => {
  // Count backend er real event theke hiseb hoy, demo data theke na.
  const countByCategory = (categoryId: CategoryId) =>
    events.filter((event) => event.values.categoryId === categoryId).length;

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="scroll-mt-24 bg-canvas py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="categories-heading"
          eyebrow="Explore causes"
          title={
            <>
              Find the cause that{" "}
              <span className="font-serif font-normal italic text-brand">
                fits your week.
              </span>
            </>
          }
          description="Pick a cause to see every event supporting it. Browsing is always free, and you can change your mind as often as you like."
          action={
            <Link
              href="/upcoming-event"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Browse all events
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          }
        />

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Link
            href="/upcoming-event"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink/55 transition hover:border-brand/30 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            All categories
          </Link>
          <p className="text-xs text-ink/45">
            {events.length} {events.length === 1 ? "event" : "events"} live
            right now
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map(
            ({ id, label, description, icon: Icon, tone, dot }) => {
              const count = countByCategory(id);

              return (
                <Link
                  key={id}
                  href={`/categories/${id}`}
                  className="group relative flex h-full min-w-0 flex-col items-start rounded-[1.5rem] border border-ink/10 bg-surface p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
                >
                  <span className="flex w-full items-start justify-between gap-2">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-ink/5 bg-canvas px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-ink/40">
                      <span
                        aria-hidden="true"
                        className={`h-1 w-1 rounded-full ${dot}`}
                      />
                      {count} {count === 1 ? "event" : "events"}
                    </span>
                  </span>

                  <span className="mt-4 block text-sm font-bold tracking-tight text-ink">
                    {label}
                  </span>
                  <span className="mt-1.5 block text-xs leading-5 text-ink/50">
                    {description}
                  </span>

                  <span className="mt-auto flex w-full items-center justify-between pt-4 text-[11px] font-semibold text-brand">
                    <span>Explore</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    />
                  </span>
                </Link>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
