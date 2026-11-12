import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import ProfileForm from "@/components/auth/profile/ProfileForm";

export const metadata: Metadata = {
  title: "Profile Settings | ChangeNest",
  description:
    "Update your ChangeNest profile details, your display name, and avatar across the platform.",
};

export default async function ProfilePage() {
  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null);

  if (!session) {
    redirect("/sign-in");
  }

  const memberSince = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(session.user.createdAt));

  return (
    <div className="space-y-6">
      <header>
        <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
          Account Settings
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Profile Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/60">
          Manage how your name and avatar appear across ChangeNest community events.
        </p>
      </header>

      <div className="rounded-[2.5rem] border border-ink/10 bg-surface p-6 shadow-sm sm:p-10">
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
  );
}
