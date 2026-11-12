import type { Metadata } from "next";
import { Suspense } from "react";
import Banner from "@/components/Banner";
import CommunityLocations from "@/components/home/CommunityLocations";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import HomeEvents from "@/components/home/HomeEvents";
import HomeEventsSkeleton from "@/components/home/HomeEventsSkeleton";
import { HomeSearchProvider } from "@/components/home/HomeSearch";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactStats from "@/components/home/ImpactStats";
import Newsletter from "@/components/home/Newsletter";
import Partners from "@/components/home/Partners";
import RecentActivities from "@/components/home/RecentActivities";
import StoriesOfChange from "@/components/home/StoriesOfChange";
import VolunteerOfMonth from "@/components/home/VolunteerOfMonth";
import VolunteerStories from "@/components/home/VolunteerStories";

export const metadata: Metadata = {
  title: "ChangeNest — Be the Change You Want to See.",
  description:
    "Discover local volunteer events, meet people who care, and turn a few free hours into real change in your community with ChangeNest.",
};

export default function Home() {
  return (
    <main className="bg-canvas">
      {/* Banner, search, categories, and upcoming events share search and filter context */}
      <HomeSearchProvider>
        <Banner />
        <Suspense fallback={<HomeEventsSkeleton />}>
          <HomeEvents />
        </Suspense>
      </HomeSearchProvider>

      <ImpactStats />
      <HowItWorks />
      <RecentActivities />
      <Partners />
      <VolunteerOfMonth />
      <VolunteerStories />
      <StoriesOfChange />
      <CommunityLocations />
      <Newsletter />
      <Faq />
      <FinalCta />
    </main>
  );
}
