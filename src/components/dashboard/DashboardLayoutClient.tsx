"use client";

import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

type DashboardLayoutClientProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  children: React.ReactNode;
};

export default function DashboardLayoutClient({
  user,
  children,
}: DashboardLayoutClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Sidebar: sticky on desktop, drawer on mobile */}
      <DashboardSidebar
        user={user}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile Header */}
        <DashboardHeader
          user={user}
          onOpenMobile={() => setMobileOpen(true)}
        />

        {/* Page Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
