import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata: Metadata = {
  title: "Your Profile | ChangeNest",
  description:
    "Update your ChangeNest profile details and choose the avatar shown across the community.",
};

const ProfilePage = async () => {
  // Session na thakle sign-in page e pathao.
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  // Date server e format koro, jate hydration mismatch na hoy.
  const memberSince = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(session.user.createdAt));

  return (
    <main className="relative isolate overflow-hidden bg-canvas">
      {/* Soft emerald background glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 8%, rgba(22, 163, 74, 0.14), transparent 30%), radial-gradient(circle at 8% 92%, color-mix(in srgb, var(--color-ink) 7%, transparent), transparent 34%)",
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rise-in">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand"
              aria-hidden="true"
            />
            Member profile
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your profile
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/60 sm:text-base">
            Update how you appear across ChangeNest. Your name and Profile Image are
            used throughout the site.
          </p>
        </div>

        <div className="rise-in mt-8 rounded-[2rem] border border-ink/10 bg-surface p-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.5)] sm:rounded-[2.5rem] sm:p-10">
          <ProfileForm
            user={{
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }}
            memberSince={memberSince}
          />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
