import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { stories } from "./data";
import { SectionHeading } from "./ui";

const StoriesOfChange = () => {
  return (
    <section
      aria-labelledby="change-stories-heading"
      className="border-y border-ink/5 bg-surface py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="change-stories-heading"
          eyebrow="Stories of change"
          demo="Illustrative stories"
          title={
            <>
              Change, told one{" "}
              <span className="font-serif font-normal italic text-brand">
                story
              </span>{" "}
              at a time.
            </>
          }
          description="The numbers matter, but the stories are what stay with us. Here is what happens after the sign-up sheet is put away."
          action={
            <Link
              href="/stories"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Read all stories
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {stories.map(({ title, excerpt, category, readTime, image }) => (
            <article
              key={title}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-surface shadow-sm shadow-navy/5 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-navy/10 motion-reduce:transform-none"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-navy backdrop-blur">
                  {category}
                </span>
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/40 px-2.5 py-1 text-[9px] font-semibold text-white/85 backdrop-blur">
                  <Clock3 aria-hidden="true" className="h-3 w-3" />
                  {readTime}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold tracking-tight text-ink">
                  <Link
                    href="/stories"
                    className="outline-none transition-colors hover:text-brand focus-visible:underline"
                  >
                    {title}
                  </Link>
                </h3>
                <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-ink/55">
                  {excerpt}
                </p>

                <Link
                  href="/stories"
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  Read more
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesOfChange;
