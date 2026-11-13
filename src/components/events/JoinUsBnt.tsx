"use client";

import { useSession } from "@/app/lib/auth-client";
import Link from "next/link";

const JoinUsBnt = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Link
        href={session ? "/dashboard" : "/sign-up"}
        className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-surface/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none"
      >
        Join Us
      </Link>
    </div>
  );
};

export default JoinUsBnt;
