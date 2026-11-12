import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json({
    message: "success",
    userId: session.user.id,
  });
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
