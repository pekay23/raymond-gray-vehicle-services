import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parentUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    // Map the local form data to the Universal Form standard
    const payload = {
      sourceDomain: "vehicleservices.raymondgray.com",
      formType: "Vehicle Booking",
      customerName: body.fullName || "Anonymous",
      customerEmail: body.email || null,
      customerPhone: body.whatsappNumber || null,
      payload: {
        vehicleMake: body.vehicleMake,
        vehicleModel: body.vehicleModel,
        regNumber: body.regNumber,
        odometer: body.odometer,
        serviceType: body.serviceType,
        description: body.description,
        preferredDate: body.preferredDate,
        bookingOption: body.bookingOption,
        location: body.location
      }
    };

    const res = await fetch(`${parentUrl}/api/webhooks/forms`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": process.env.WEBHOOK_SECRET || "" 
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("[Booking Proxy] Invalid JSON from upstream:", responseText.substring(0, 250));
      return NextResponse.json(
        { error: "Upstream service returned an invalid response." },
        { status: res.ok ? 500 : res.status }
      );
    }
    
    // Vehicle Services client expects { success: true, jobId: "..." }
    if (res.ok && data.success) {
      return NextResponse.json({ success: true, jobId: data.ref });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("[Booking Proxy]", error);
    return NextResponse.json(
      { error: "Failed to submit booking" },
      { status: 500 }
    );
  }
}
