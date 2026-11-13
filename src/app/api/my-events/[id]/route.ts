import { auth } from "@/app/lib/auth";
import { eventApiUrl } from "@/app/lib/event-api";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const jwtToken = await auth.api.getToken({ headers: requestHeaders });
    const token = jwtToken?.token;

    if (!token) {
      return NextResponse.json(
        { message: "Event deletion is not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(
      eventApiUrl(`delete-event/${encodeURIComponent(id)}`),
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
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
