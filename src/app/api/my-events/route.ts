import { auth } from "@/app/lib/auth";
import { eventApiUrl } from "@/app/lib/event-api";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const authHeaders = await headers();
  const session = await auth.api.getSession({
    headers: authHeaders,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const jwtToken = await auth.api.getToken({
      headers: authHeaders,
    });
    const token = jwtToken?.token;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const response = await fetch(eventApiUrl("my-events"), {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

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
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const jwtToken = await auth.api.getToken({
      headers: reqHeaders,
    });

    const token = jwtToken?.token;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    let eventData: unknown;

    try {
      eventData = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid event data" },
        { status: 400 },
      );
    }

    const response = await fetch(eventApiUrl("my-events"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("My Events POST Error:", error);

    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 },
    );
  }
};

export const PUT = async (request: Request) => {
  const authHeaders = await headers();
  const session = await auth.api.getSession({ headers: authHeaders });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid event data" },
        { status: 400 },
      );
    }

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

    const jwtToken = await auth.api.getToken({ headers: authHeaders });
    const token = jwtToken?.token;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      eventApiUrl(`my-events/${encodeURIComponent(id)}`),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
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
