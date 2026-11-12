import type { Metadata } from "next";
import Banner from "@/components/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import CommunityLocations from "@/components/home/CommunityLocations";
import EventSearch from "@/components/home/EventSearch";
import Faq from "@/components/home/Faq";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import FinalCta from "@/components/home/FinalCta";
import { HomeSearchProvider } from "@/components/home/HomeSearch";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactStats from "@/components/home/ImpactStats";
import Newsletter from "@/components/home/Newsletter";
import Partners from "@/components/home/Partners";
import RecentActivities from "@/components/home/RecentActivities";
import StoriesOfChange from "@/components/home/StoriesOfChange";
import UpcomingEvents from "@/components/home/UpcomingEvents";
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
      {/* Hero, search, categories, ar event lists ek state share kore. */}
      <HomeSearchProvider>
        <Banner />
        <EventSearch />
        <CategoryGrid />
        <FeaturedEvents />
        <UpcomingEvents />
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
