import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { partners } from "./data";
import { SectionHeading } from "./ui";

const Partners = () => {
  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y border-ink/5 bg-surface py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="partners-heading"
          eyebrow="Trusted organizations & partners"
          demo="Sample partner network"
          title={
            <>
              Good work is{" "}
              <span className="font-serif font-normal italic text-brand">
                better together.
              </span>
            </>
          }
          description="We work alongside local organizations that know their communities best — sharing reach, resources, and a little extra pair of hands."
          action={
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Become a partner
              <Handshake aria-hidden="true" className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map(({ name, focus, icon: Icon }) => (
            <div
              key={name}
              className="group flex flex-col items-center justify-center gap-2.5 rounded-[1.5rem] border border-ink/10 bg-canvas px-4 py-6 text-center transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/5 motion-reduce:transform-none"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink/45 shadow-sm shadow-navy/5 transition-colors group-hover:text-brand">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold tracking-tight text-ink">
                {name}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink/40">
                {focus}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-ink/40">
          Partner names are illustrative for this homepage preview.{" "}
          <Link
            href="/contact"
            className="font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Talk to us about partnering
            <ArrowRight aria-hidden="true" className="ml-1 inline h-3.5 w-3.5" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Partners;
