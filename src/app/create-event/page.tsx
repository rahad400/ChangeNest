import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import CreateEventForm from "@/components/events/CreateEventForm";

export const metadata: Metadata = {
  title: "Create an Event | ChangeNest",
  description:
    "Create a volunteer event and bring your community together for a cause.",
};

const CreateEventPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 8%, rgba(22, 163, 74, 0.14), transparent 30%), radial-gradient(circle at 8% 92%, color-mix(in srgb, var(--color-ink) 7%, transparent), transparent 34%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header className="rise-in mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            Make a difference
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Create a volunteer event
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/60 sm:text-base">
            Bring people together around a cause you care about. Share the
            details and we&apos;ll help your community show up.
          </p>
        </header>

        <div className="rise-in mx-auto mt-9 max-w-3xl rounded-[2rem] border border-ink/10 bg-surface p-5 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.5)] sm:mt-12 sm:rounded-[2.5rem] sm:p-8 lg:p-10">
          <CreateEventForm />
        </div>
      </div>
    </main>
  );
};

export default CreateEventPage;
