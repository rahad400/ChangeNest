import { redirect } from "next/navigation";

type MyEventPageProps = {
  params: Promise<{ id: string }>;
};

const MyEventPage = async ({ params }: MyEventPageProps) => {
  const { id } = await params;

  redirect(`/event-edit?id=${encodeURIComponent(id)}`);
};

export default MyEventPage;
