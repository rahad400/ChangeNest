import { fetchUpcomingEvents } from "@/app/lib/events";
import CategoryGrid from "./CategoryGrid";
import EventSearch from "./EventSearch";
import UpcomingEvents from "./UpcomingEvents";

// Ei section ta Suspense e fetch kore, tai hero sathe sathe dekha jay.
const HomeEvents = async () => {
  const { events, failed } = await fetchUpcomingEvents();

  return (
    <>
      <EventSearch events={events} />
      <CategoryGrid events={events} />
      <UpcomingEvents events={events} failed={failed} />
    </>
  );
};

export default HomeEvents;
