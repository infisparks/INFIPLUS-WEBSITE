import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "2241568519757954";
const META_ACCESS_TOKEN =
  process.env.META_ACCESS_TOKEN ||
  "EAAbUwfrQZBEwBTOII9ZCkDipY0YfiQlZABWWHBWDSoPlUn6mUmhse7W2TUvQj0ie2gudZCpLPRvs1SpDUZAypSqtGzZBktaOLrrCTbn9CdMmsRpD2tnSxbZC0FsaZCjuUiZBLDivacgQrUxjtnr8pSlbpGLMFvvQXZCvqixgPZChpTsx01ZAvKZBIBBbbgZC2aQ4D4VwZDZD";

function sha256(val?: string): string | undefined {
  if (!val) return undefined;
  return crypto.createHash("sha256").update(val.trim().toLowerCase()).digest("hex");
}

function normalizePhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  const cleaned = phone.replace(/\D/g, "");
  // Prepend India country code 91 if 10-digit number
  if (cleaned.length === 10) return `91${cleaned}`;
  return cleaned;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";

    const rawPhone = body.userData?.phone || body.phone;
    const rawName = body.userData?.name || body.name;
    const rawEmail = body.userData?.email || body.email;

    const normalizedPhone = normalizePhone(rawPhone);
    const hashedPhone = sha256(normalizedPhone);
    const hashedName = rawName
      ? sha256(rawName.trim().split(/\s+/)[0])
      : undefined;
    const hashedEmail = rawEmail ? sha256(rawEmail.trim()) : undefined;

    const userData: Record<string, any> = {
      client_user_agent: userAgent,
      client_ip_address: clientIp,
    };

    if (hashedPhone) userData.ph = [hashedPhone];
    if (hashedName) userData.fn = [hashedName];
    if (hashedEmail) userData.em = [hashedEmail];
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;

    const eventPayload = {
      data: [
        {
          event_name: body.eventName || "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.eventId || `lead_${Date.now()}`,
          event_source_url: body.eventSourceUrl || "https://infiplus.in/",
          action_source: "website",
          user_data: userData,
          custom_data: {
            content_name:
              body.customData?.content_name || "Hospital Demo Request",
            content_category: "Hospital Management Software",
            hospital_name:
              body.customData?.hospital_name || body.hospitalName || "",
            ...(body.customData || {}),
          },
        },
      ],
    };

    const metaUrl = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`;
    const metaRes = await fetch(metaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    });

    const metaData = await metaRes.json();

    return NextResponse.json(
      {
        success: metaRes.ok,
        events_received: metaData.events_received || 0,
        fbtrace_id: metaData.fbtrace_id,
        eventId: body.eventId,
        metaResponse: metaData,
      },
      { status: metaRes.status }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
