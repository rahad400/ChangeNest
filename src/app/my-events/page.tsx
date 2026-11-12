import MyEventsCard from "@/components/my-events-details/MyEventsCard";
import { headers } from "next/headers";

const MyEventsPage = async () => {
  const requestHeaders = await headers();

  const res = await fetch("http://localhost:3000/api/my-events", {
    headers: {
      cookie: requestHeaders.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  const data = await res.json();

  console.log(data);

  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8 container mx-auto">
      {Array.isArray(data) &&
        data.map((event) => <MyEventsCard key={event._id} event={event} />)}
    </div>
  );
};

export default MyEventsPage;
