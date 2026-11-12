import type { ReactNode } from "react";

// Section heading er shared style. Prottek section e same rhythm thake.
type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  demo?: string;
  className?: string;
};

export const SectionHeading = ({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  action,
  demo,
  className = "",
}: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      } ${className}`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        <div
          className={`flex flex-wrap items-center gap-2.5 ${
            centered ? "justify-center" : ""
          }`}
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            {eyebrow}
          </p>
          {demo ? <DemoTag label={demo} /> : null}
        </div>

        <h2
          id={id}
          className="mt-4 text-balance text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
        >
          {title}
        </h2>

        {description ? (
          <p className="mt-4 max-w-xl text-sm leading-7 text-ink/60 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className={`shrink-0 ${centered ? "mt-1" : ""}`}>{action}</div>
      ) : null}
    </div>
  );
};

// Demo content ke subtly label kore, jate misleading na hoy.
export const DemoTag = ({ label = "Demo content" }: { label?: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/40">
    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand/60" />
    {label}
  </span>
);

export const primaryButtonStyles =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-navy shadow-lg shadow-brand/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transform-none";

export const secondaryButtonStyles =
  "group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transform-none";

export const arrowStyles =
  "h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none";

export const cardStyles =
  "rounded-[2rem] border border-ink/10 bg-surface shadow-sm shadow-navy/5";
