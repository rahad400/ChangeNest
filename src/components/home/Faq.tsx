import Link from "next/link";
import { ArrowRight, Mail, Plus } from "lucide-react";
import { faqs } from "./data";
import { SectionHeading } from "./ui";

const Faq = () => {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="faq-heading"
              eyebrow="FAQ"
              title={
                <>
                  Questions,{" "}
                  <span className="font-serif font-normal italic text-brand">
                    answered.
                  </span>
                </>
              }
              description="Everything you need to know before your first event — or your first time hosting one."
            />

            <div className="mt-8 rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm shadow-navy/5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Mail aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-bold text-ink">
                Still curious?
              </p>
              <p className="mt-1.5 text-xs leading-5 text-ink/50">
                Send us a note and a real person will get back to you.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Contact the team
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map(({ question, answer }, index) => (
              <details key={question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-xl px-2 py-5 text-left transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 text-[10px] font-bold tracking-[0.12em] text-brand/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-ink sm:text-base">
                      {question}
                    </span>
                  </span>
                  <span className="faq-plus mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-surface text-ink/45 transition-transform duration-300">
                    <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <div className="px-2 pb-5 pl-10 text-sm leading-7 text-ink/55 sm:pl-11">
                  {answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
