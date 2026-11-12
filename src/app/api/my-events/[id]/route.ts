import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const response = await fetch(
      `http://localhost:8000/delete-event/${encodeURIComponent(id)}?createdBy=${encodeURIComponent(
        session.user.id,
      )}`,
      {
        method: "DELETE",
        headers: {
          "x-internal-api-secret": process.env.INTERNAL_API_SECRET!,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    return NextResponse.json(
      { message: "Failed to delete event" },
      { status: 500 },
    );
  }
}
