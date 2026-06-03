import { NextResponse } from "next/server";

// Server-to-server proxy for vehicle bookings.
//
// The browser POSTs here (same-origin, so no CORS), and this handler relays the
// booking to the main Raymond Gray platform's dedicated vehicle-bookings
// endpoint. Going server-to-server is deliberate: the platform locks that
// endpoint's CORS to the production subdomain, so a *browser* on localhost would
// be blocked — but this proxy is exempt, which is exactly why bookings work
// identically from localhost and from the live site.
//
// The platform endpoint owns all validation, per-IP rate limiting, the honeypot
// and the submit-timing check (see raymond-gray-platform
// src/app/api/vehicle-bookings/route.ts + lib/validations/vehicle-bookings.ts).
// We keep this proxy a thin shaping/relay layer — the platform is the single
// source of truth for what a valid booking is.
const PLATFORM_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the real visitor's IP so the platform's per-IP rate limit applies
    // to the customer, not to this serverless function's shared egress IP.
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "";

    // The client may send `location` as a string (already-resolved address) or,
    // defensively, as the LocationPicker object. Normalise to the string the
    // platform schema expects (max 500, empty allowed for workshop drop-offs).
    const location =
      typeof body.location === "string"
        ? body.location
        : body.location?.address ?? "";

    // Map the wizard state to the platform's vehicleBookingCreateSchema.
    const payload = {
      fullName: body.fullName,
      whatsappNumber: body.whatsappNumber,
      email: body.email || "",
      location,
      latitude: body.latitude ?? null,
      longitude: body.longitude ?? null,
      vehicleMake: body.vehicleMake,
      vehicleModel: body.vehicleModel,
      regNumber: body.regNumber,
      odometer: body.odometer || undefined,
      serviceType: body.serviceType,
      // The platform requires a non-empty description. The wizard's notes field
      // is optional, so fall back to a sensible default rather than 400-ing a
      // perfectly valid booking that simply had no extra notes.
      description:
        (typeof body.description === "string" && body.description.trim()) ||
        `${body.serviceType || "Service"} booking — no additional notes provided.`,
      preferredDate: body.preferredDate || undefined,
      bookingOption: body.bookingOption || "dropoff",
      formLoadedAt: body.formLoadedAt,
    };

    const res = await fetch(`${PLATFORM_URL}/api/vehicle-bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp ? { "x-forwarded-for": clientIp } : {}),
      },
      body: JSON.stringify(payload),
    });

    // Guard against a non-JSON upstream (e.g. a 404 HTML page if the URL/path is
    // misconfigured) so the client can degrade to the WhatsApp fallback instead
    // of throwing a parse error.
    const text = await res.text();
    let data: { success?: boolean; jobId?: string; error?: string } | null;
    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "[Booking Proxy] Non-JSON upstream response:",
        res.status,
        text.slice(0, 250)
      );
      return NextResponse.json(
        { error: "Booking service is unavailable. Please use WhatsApp." },
        { status: 502 }
      );
    }

    if (res.ok && data?.success) {
      return NextResponse.json({ success: true, jobId: data.jobId });
    }

    // Log the upstream detail server-side; return a safe, generic message.
    console.error("[Booking Proxy] Upstream rejected:", res.status, data);
    return NextResponse.json(
      { error: data?.error || "Failed to submit booking." },
      { status: res.status === 429 ? 429 : 400 }
    );
  } catch (error) {
    console.error("[Booking Proxy]", error);
    return NextResponse.json({ error: "Failed to submit booking" }, { status: 500 });
  }
}
