/**
 * ══════════════════════════════════════════════════════════════════
 *   INFIPLUS HEALTHCARE - META CONVERSIONS API (CAPI) WORKER
 * ══════════════════════════════════════════════════════════════════
 * 
 * INSTRUCTIONS TO DEPLOY ON CLOUDFLARE IN 60 SECONDS:
 * 1. Log in to your Cloudflare Dashboard (https://dash.cloudflare.com).
 * 2. On the left menu, click "Workers & Pages" -> "Overview".
 * 3. Click the blue button: "Create application" -> "Create Worker".
 * 4. Give it a name (e.g., "infiplus-meta-capi") and click "Deploy".
 * 5. On the Worker page, click "Edit code" (or "Quick edit").
 * 6. Select and delete everything in the editor, then PASTE THIS ENTIRE FILE.
 * 7. Click "Deploy" (top right).
 * 8. Copy the worker's URL (e.g. https://infiplus-meta-capi.yourname.workers.dev).
 * 9. Provide that URL back in the chat or add it to .env.local as:
 *    NEXT_PUBLIC_CLOUDFLARE_CAPI_URL=https://infiplus-meta-capi.yourname.workers.dev
 */

const META_PIXEL_ID = "2241568519757954";
const META_ACCESS_TOKEN =
  "EAAbUwfrQZBEwBTOII9ZCkDipY0YfiQlZABWWHBWDSoPlUn6mUmhse7W2TUvQj0ie2gudZCpLPRvs1SpDUZAypSqtGzZBktaOLrrCTbn9CdMmsRpD2tnSxbZC0FsaZCjuUiZBLDivacgQrUxjtnr8pSlbpGLMFvvQXZCvqixgPZChpTsx01ZAvKZBIBBbbgZC2aQ4D4VwZDZD";

// SHA-256 Hashing using Cloudflare native Web Crypto API
async function sha256(str) {
  if (!str) return undefined;
  const buffer = new TextEncoder().encode(str.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Normalize phone number to standard international format (e.g. 919876543210)
function normalizePhone(phone) {
  if (!phone) return undefined;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) return `91${cleaned}`;
  return cleaned;
}

// Helper to extract cookies by name
function getCookie(cookieHeader, name) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : undefined;
}

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // 1. Handle CORS Preflight OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // 2. Health check / GET request
    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          status: "healthy",
          service: "Infiplus Meta Conversions API Worker",
          pixel_id: META_PIXEL_ID,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    try {
      const body = await request.json();
      const pixelId = env?.META_PIXEL_ID || META_PIXEL_ID;
      const accessToken = env?.META_ACCESS_TOKEN || META_ACCESS_TOKEN;

      const cookieHeader = request.headers.get("Cookie") || "";
      const clientIp =
        request.headers.get("CF-Connecting-IP") ||
        request.headers.get("x-real-ip") ||
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "127.0.0.1";
      const userAgent = request.headers.get("User-Agent") || "";

      // Extract Meta cookies (_fbp and _fbc)
      const fbp = body.fbp || getCookie(cookieHeader, "_fbp");
      const fbc = body.fbc || getCookie(cookieHeader, "_fbc");

      // Extract user parameters
      const rawPhone = body.userData?.phone || body.phone;
      const rawName = body.userData?.name || body.name;
      const rawEmail = body.userData?.email || body.email;

      // Hash user parameters with SHA-256 according to Meta specs
      const normalizedPhone = normalizePhone(rawPhone);
      const hashedPhone = normalizedPhone ? await sha256(normalizedPhone) : undefined;
      const hashedName = rawName ? await sha256(rawName.trim().split(/\s+/)[0]) : undefined;
      const hashedEmail = rawEmail ? await sha256(rawEmail.trim()) : undefined;

      const userData = {
        client_user_agent: userAgent,
        client_ip_address: clientIp,
      };

      if (hashedPhone) userData.ph = [hashedPhone];
      if (hashedName) userData.fn = [hashedName];
      if (hashedEmail) userData.em = [hashedEmail];
      if (fbp) userData.fbp = fbp;
      if (fbc) userData.fbc = fbc;

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

      // Forward event to Meta Graph API
      const metaUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
      const metaRes = await fetch(metaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventPayload),
      });

      const metaData = await metaRes.json();

      return new Response(
        JSON.stringify({
          success: metaRes.ok,
          events_received: metaData.events_received || 0,
          fbtrace_id: metaData.fbtrace_id,
          eventId: body.eventId,
          metaResponse: metaData,
        }),
        {
          status: metaRes.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: err.message || "Failed to process Meta CAPI event",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  },
};
