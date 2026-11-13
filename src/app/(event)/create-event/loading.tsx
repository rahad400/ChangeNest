export default function Loading() {
  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 8%, rgba(22, 163, 74, 0.14), transparent 30%), radial-gradient(circle at 8% 92%, color-mix(in srgb, var(--color-ink) 7%, transparent), transparent 34%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Back link skeleton */}
        <div className="h-11 w-40 animate-pulse rounded-full bg-ink/10" />

        {/* Header skeleton */}
        <div className="mx-auto mt-6 max-w-3xl space-y-4">
          <div className="mx-auto h-7 w-40 animate-pulse rounded-full bg-ink/10" />
          <div className="mx-auto h-11 w-full max-w-md animate-pulse rounded-2xl bg-ink/10" />
          <div className="mx-auto h-4 w-full max-w-2xl animate-pulse rounded-xl bg-ink/10" />
          <div className="mx-auto h-4 w-2/3 max-w-xl animate-pulse rounded-xl bg-ink/10" />
        </div>

        {/* Form card skeleton */}
        <div className="mx-auto mt-9 max-w-3xl rounded-[2rem] border border-ink/10 bg-surface p-5 shadow-sm sm:mt-12 sm:rounded-[2.5rem] sm:p-8 lg:p-10">
          {/* Progress skeleton */}
          <div className="rounded-2xl border border-ink/10 bg-canvas/60 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-32 animate-pulse rounded-full bg-ink/10" />
              <div className="h-3 w-10 animate-pulse rounded-full bg-ink/10" />
            </div>
            <div className="mt-3 h-1.5 animate-pulse rounded-full bg-ink/10" />
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-28 animate-pulse rounded-full bg-ink/10"
                />
              ))}
            </div>
          </div>

          {/* Event details skeleton */}
          <div className="mt-6 rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 animate-pulse rounded-2xl bg-ink/10" />
              <div className="space-y-2">
                <div className="h-2.5 w-20 animate-pulse rounded-full bg-ink/10" />
                <div className="h-5 w-40 animate-pulse rounded-lg bg-ink/10" />
                <div className="h-3 w-64 max-w-full animate-pulse rounded-full bg-ink/10" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <div className="h-3 w-24 animate-pulse rounded-full bg-ink/10" />
                <div className="h-11 animate-pulse rounded-xl bg-ink/10" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded-full bg-ink/10" />
                <div className="h-11 animate-pulse rounded-xl bg-ink/10" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-28 animate-pulse rounded-full bg-ink/10" />
                <div className="h-11 animate-pulse rounded-xl bg-ink/10" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <div className="h-3 w-24 animate-pulse rounded-full bg-ink/10" />
                <div className="h-28 animate-pulse rounded-xl bg-ink/10" />
              </div>
            </div>
          </div>

          {/* Image skeleton */}
          <div className="mt-6 rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 animate-pulse rounded-2xl bg-ink/10" />
              <div className="space-y-2">
                <div className="h-2.5 w-16 animate-pulse rounded-full bg-ink/10" />
                <div className="h-5 w-36 animate-pulse rounded-lg bg-ink/10" />
                <div className="h-3 w-64 max-w-full animate-pulse rounded-full bg-ink/10" />
              </div>
            </div>

            <div className="mt-5 h-36 animate-pulse rounded-2xl border border-dashed border-ink/10 bg-ink/5" />
            <div className="mt-4 h-11 animate-pulse rounded-xl bg-ink/10" />
          </div>

          {/* Time and place skeleton */}
          <div className="mt-6 rounded-3xl border border-ink/10 bg-canvas/60 p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 animate-pulse rounded-2xl bg-ink/10" />
              <div className="space-y-2">
                <div className="h-2.5 w-20 animate-pulse rounded-full bg-ink/10" />
                <div className="h-5 w-48 animate-pulse rounded-lg bg-ink/10" />
                <div className="h-3 w-60 max-w-full animate-pulse rounded-full bg-ink/10" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded-full bg-ink/10" />
                  <div className="h-11 animate-pulse rounded-xl bg-ink/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Actions skeleton */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <div className="h-11 w-28 animate-pulse rounded-full bg-ink/10" />
            <div className="h-11 w-40 animate-pulse rounded-full bg-ink/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
