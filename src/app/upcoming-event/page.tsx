import UpcomingEventsCard from "@/components/events/UpcomingEeventCard";
import type { IEvent } from "@/types/events";

const UpcommingEventpage = async () => {
  const res = await fetch("http://localhost:8000/upcoming-events", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: IEvent[] = await res.json();

  return (
    <div className=" container mx-auto my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <UpcomingEventsCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default UpcommingEventpage;
