"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  categories,
  eventCountByCategory,
  type CategoryId,
} from "./data";
import { useHomeSearch } from "./HomeSearch";
import { SectionHeading } from "./ui";

const CategoryGrid = () => {
  const { category: activeCategory, setCategory, scrollToEvents } =
    useHomeSearch();

  // Category click korle filter set kore upcoming list e scroll koro.
  const focusCategory = (categoryId: CategoryId) => {
    setCategory(categoryId);
    scrollToEvents();
  };

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
          description="Pick a cause to jump straight to matching events. Browsing is always free, and you can change your mind as often as you like."
          action={
            <Link
              href="/events"
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

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map(
            ({ id, label, description, icon: Icon, tone, dot }) => {
              const active = activeCategory === id;
              const count = eventCountByCategory[id];

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => focusCategory(id)}
                  aria-pressed={active}
                  className={`group relative flex h-full min-w-0 flex-col items-start rounded-[1.5rem] border p-5 text-left transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none ${
                    active
                      ? "border-brand/40 bg-brand/5 shadow-lg shadow-brand/10"
                      : "border-ink/10 bg-surface hover:border-brand/30 hover:shadow-lg hover:shadow-navy/5"
                  }`}
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
                    <span>{active ? "Filtering" : "Explore"}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    />
                  </span>
                </button>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
