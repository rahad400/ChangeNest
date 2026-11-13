export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back link skeleton */}
      <div className="h-11 w-44 animate-pulse rounded-full bg-ink/10" />

      {/* Category header skeleton */}
      <div className="mt-6 rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-ink/10" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-3 w-32 animate-pulse rounded-full bg-ink/10" />
              <div className="h-9 w-64 max-w-full animate-pulse rounded-2xl bg-ink/10" />
              <div className="h-4 w-full max-w-lg animate-pulse rounded-xl bg-ink/10" />
              <div className="h-4 w-3/4 max-w-md animate-pulse rounded-xl bg-ink/10" />
            </div>
          </div>
          <div className="h-9 w-32 shrink-0 animate-pulse rounded-full bg-ink/10" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-surface shadow-sm"
          >
            <div className="aspect-[16/10] animate-pulse bg-ink/10" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-1/2 animate-pulse rounded-full bg-ink/10" />
              <div className="h-5 w-3/4 animate-pulse rounded-xl bg-ink/10" />
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-ink/10" />
              <div className="h-10 animate-pulse rounded-full bg-ink/10 pt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
