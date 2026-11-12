import { redirect } from "next/navigation";

type MyEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MyEventPage({ params }: MyEventPageProps) {
  const { id } = await params;
  redirect(`/event-edit?id=${encodeURIComponent(id)}`);
}
