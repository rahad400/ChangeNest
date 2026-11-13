import "server-only";

const localEventApiUrl = "http://localhost:8000";

export const eventApiUrl = (path: string): string => {
  const configuredUrl = process.env.EVENT_API_URL;
  const baseUrl =
    configuredUrl ||
    (process.env.NODE_ENV === "production" ? null : localEventApiUrl);

  if (!baseUrl) {
    throw new Error("EVENT_API_URL must be set in production.");
  }

  return new URL(
    path.replace(/^\/+/, ""),
    `${baseUrl.replace(/\/+$/, "")}/`,
  ).toString();
};
