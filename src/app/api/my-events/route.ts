import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `http://localhost:8000/my-events?createdBy=${session.user.id}`,
      {
        method: "GET",
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
    console.error("My Events GET Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const eventData = await request.json();

    const response = await fetch("http://localhost:8000/my-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-api-secret": process.env.INTERNAL_API_SECRET!,
      },
      body: JSON.stringify({
        ...eventData,
        createdBy: session.user.id,
      }),
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 },
    );
  }
};

export const PUT = async (request: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid event data" },
        { status: 400 },
      );
    }

    const { id, ...eventData } = body as Record<string, unknown>;

    if (typeof id !== "string" || !id) {
      return NextResponse.json(
        { message: "Event id is required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `http://localhost:8000/my-events/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-internal-api-secret": process.env.INTERNAL_API_SECRET!,
        },
        body: JSON.stringify({
          ...eventData,
          createdBy: session.user.id,
        }),
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("My Events PUT Error:", error);

    return NextResponse.json(
      { message: "Failed to update event" },
      { status: 500 },
    );
  }
};
