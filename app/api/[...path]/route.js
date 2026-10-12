import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedRoutes = {
  GET: [/^auth\/me$/, /^bookings\/[a-zA-Z0-9_-]+$/, /^bookings\/reference\/[a-zA-Z0-9_-]+$/],
  POST: [/^flights\/search$/, /^auth\/(login|register|logout)$/, /^bookings\/draft$/, /^bookings\/[a-zA-Z0-9_-]+\/(addons|payment-details)$/],
  PUT: [/^bookings\/[a-zA-Z0-9_-]+\/(travellers|fare)$/],
};

async function forwardRequest(request, context) {
  const { path } = await context.params;
  const route = path.join("/");
  if (!allowedRoutes[request.method]?.some((pattern) => pattern.test(route))) {
    return NextResponse.json({ message: "API route not found." }, { status: 404 });
  }

  const apiBase = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.airflighto.com/api").replace(/\/$/, "");
  const headers = { "Content-Type": "application/json" };
  const authorization = request.headers.get("authorization");
  if (authorization) headers.Authorization = authorization;

  try {
    // Use server-to-server requests for the configured booking service.
    // Forward bearer authentication without forwarding browser Origin.
    const response = await fetch(`${apiBase}/${route}`, {
      method: request.method,
      headers,
      body: request.method === "GET" ? undefined : await request.text(),
      cache: "no-store",
      signal: AbortSignal.timeout(120000),
    });
    return new Response(response.status === 204 ? null : await response.text(), {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const timeout = error.name === "TimeoutError" || error.name === "AbortError";
    return NextResponse.json({ message: timeout ? "Request timed out. Please try again." : "Unable to reach the booking service. Please try again." }, { status: timeout ? 504 : 502 });
  }
}

export const GET = forwardRequest;
export const POST = forwardRequest;
export const PUT = forwardRequest;
