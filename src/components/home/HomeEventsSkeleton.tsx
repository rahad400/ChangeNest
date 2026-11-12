// Event section load hobar somoy er skeleton. Real layout er sathe mile rakha hoyeche.
const HomeEventsSkeleton = () => {
  return (
    <div aria-hidden="true" className="bg-canvas">
      {/* Search panel skeleton */}
      <section className="relative z-10 bg-canvas pb-4 sm:pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-ink/10 bg-surface p-4 sm:p-5 lg:p-6">
            <div className="h-3 w-40 rounded-full bg-ink/10" />
            <div className="mt-3 h-5 w-56 rounded-full bg-ink/10" />
            <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[1.35fr_1fr_1fr_auto]">
              <div className="h-12 rounded-xl bg-ink/10" />
              <div className="h-12 rounded-xl bg-ink/10" />
              <div className="h-12 rounded-xl bg-ink/10" />
              <div className="h-12 rounded-xl bg-ink/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Category grid skeleton */}
      <section className="bg-canvas py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-32 rounded-full bg-ink/10" />
          <div className="mt-3 h-7 w-72 max-w-full rounded-full bg-ink/10" />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-36 rounded-[1.5rem] border border-ink/10 bg-surface"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Event cards skeleton */}
      <section className="bg-canvas py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-36 rounded-full bg-ink/10" />
          <div className="mt-3 h-7 w-80 max-w-full rounded-full bg-ink/10" />
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-surface"
              >
                <div className="aspect-[16/10] bg-ink/10" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-2/3 rounded-full bg-ink/10" />
                  <div className="h-3 w-1/2 rounded-full bg-ink/10" />
                  <div className="h-9 rounded-full bg-ink/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeEventsSkeleton;
