import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "/dashboard";
  const search = headerList.get("x-search") || "";
  const destination = `${pathname}${search}`;

  // Complete server-side database session validation
  const session = await auth.api
    .getSession({ headers: headerList })
    .catch(() => null);

  if (!session) {
    redirect(`/sign-in?next=${encodeURIComponent(destination)}`);
  }

  return (
    <DashboardLayoutClient user={session.user}>
      {children}
    </DashboardLayoutClient>
  );
}
