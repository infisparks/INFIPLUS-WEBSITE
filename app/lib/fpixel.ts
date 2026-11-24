export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "2241568519757954";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    dataLayer?: any[];
    gtag?: any;
  }
}

/**
 * Ensures Meta Pixel EventValidation plugin does not suppress "Lead" or "Schedule"
 * on B2B hospital healthcare software domains.
 */
export const unrestrictLeadAndSchedule = () => {
  if (typeof window === "undefined") return;
  try {
    const fbq = window.fbq;
    if (fbq && typeof fbq.registerPlugin === "function") {
      fbq.registerPlugin("lead_unrestrictor", {
        __fbEventsPlugin: 1,
        plugin: function (_fbqInstance: any, instance: any, config: any) {
          try {
            if (instance && typeof instance.optIn === "function") {
              instance.optIn(FB_PIXEL_ID, "EventValidation", false);
            }
            if (config && typeof config.set === "function") {
              config.set(FB_PIXEL_ID, "eventValidation", {
                unverifiedEventNames: [],
                restrictedEventNames: [],
              });
            }
          } catch (e) {
            // Silently handled
          }
        },
      });
      if (typeof fbq.loadPlugin === "function") {
        fbq.loadPlugin("lead_unrestrictor");
      }
    }
  } catch (e) {
    // Ignore
  }
};

/**
 * Log pageview to Meta Pixel
 */
export const pageview = () => {
  if (typeof window !== "undefined") {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }
};

/**
 * Helper to retrieve cookies on client
 */
export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : undefined;
};

/**
 * Helper to retrieve fbclid from URL or format as _fbc
 */
export const getFbc = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  const cookieFbc = getCookie("_fbc");
  if (cookieFbc) return cookieFbc;

  try {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    if (fbclid) {
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  } catch (e) {}
  return undefined;
};

/**
 * Log standard Meta Pixel events (e.g. Lead, Schedule, Contact)
 */
export const trackEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {},
  options?: { eventID?: string }
) => {
  if (typeof window !== "undefined") {
    // Unrestrict Lead and Schedule before dispatching
    if (eventName === "Lead" || eventName === "Schedule") {
      unrestrictLeadAndSchedule();
    }

    if (typeof window.fbq === "function") {
      if (options?.eventID) {
        window.fbq("track", eventName, parameters, { eventID: options.eventID });
      } else {
        window.fbq("track", eventName, parameters);
      }
      console.log(`%c🎯 [Meta Pixel] Tracked standard event: ${eventName}`, "color: #1877F2; font-weight: bold;", {
        parameters,
        options,
      });
    } else {
      // Initialize fbq queue if script is still downloading
      const fbqQueue = (window.fbq =
        window.fbq ||
        function (...args: unknown[]) {
          ((window.fbq as any).queue = (window.fbq as any).queue || []).push(args);
        });
      if (options?.eventID) {
        fbqQueue("track", eventName, parameters, { eventID: options.eventID });
      } else {
        fbqQueue("track", eventName, parameters);
      }
      console.log(`%c🎯 [Meta Pixel] Queued event: ${eventName}`, "color: #1877F2; font-weight: bold;", {
        parameters,
        options,
      });
    }
  }
};

/**
 * Dispatches server-side event to Meta Conversions API (CAPI)
 * via Cloudflare Worker (if configured) or Next.js internal /api/meta-conversions route.
 */
export const sendMetaConversionApiEvent = async (params: {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  userData: {
    name?: string;
    phone?: string;
    email?: string;
  };
  customData?: Record<string, any>;
}) => {
  if (typeof window === "undefined") return;

  const cfUrl =
    process.env.NEXT_PUBLIC_CLOUDFLARE_CAPI_URL ||
    "https://infiplusconversionevent.infisparks.workers.dev";
  const endpoint =
    cfUrl && cfUrl.trim().length > 0 ? cfUrl.trim() : "/api/meta-conversions";

  const payload = {
    eventName: params.eventName,
    eventId: params.eventId,
    eventSourceUrl: params.eventSourceUrl || window.location.href,
    userData: params.userData,
    customData: params.customData,
    fbp: getCookie("_fbp"),
    fbc: getFbc(),
  };

  console.log(
    `%c🚀 [Meta Conversions API] Dispatching server-side event to: ${endpoint}`,
    "color: #8B5CF6; font-weight: bold;",
    {
      eventName: params.eventName,
      eventId: params.eventId,
      phone: params.userData?.phone,
      name: params.userData?.name,
    }
  );

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && (data.events_received >= 1 || data.success)) {
      console.log(
        `%c✅ [Meta Conversions API] SUCCESS! Meta received ${data.events_received || 1} event(s)!\n` +
          `   • Event: ${params.eventName}\n` +
          `   • Event ID: ${params.eventId}\n` +
          `   • FB Trace ID: ${data.fbtrace_id}\n` +
          `   • Status: 200 OK`,
        "color: #059669; font-weight: bold; font-size: 13px; background: #ECFDF5; padding: 6px 10px; border-radius: 6px; border: 1px solid #A7F3D0;",
        data
      );
    } else {
      console.warn(
        `%c⚠️ [Meta Conversions API] Response from Meta API:`,
        "color: #D97706; font-weight: bold;",
        data
      );
    }
    return data;
  } catch (err) {
    console.error("%c❌ [Meta Conversions API] Failed to send to Meta:", "color: #DC2626; font-weight: bold;", err);
  }
};

/**
 * Fires standard "Lead" event to BOTH Meta Browser Pixel & Meta Conversions API (CAPI)
 * with deduplication via eventID.
 */
export const trackLeadEvent = (parameters: {
  name?: string;
  hospitalName?: string;
  source: string;
  phone?: string;
  email?: string;
}) => {
  unrestrictLeadAndSchedule();

  const contentName = `${parameters.source} - ${parameters.hospitalName || "Hospital Demo Request"}`;
  const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // 1. Fire Browser Pixel with eventID for deduplication
  trackEvent(
    "Lead",
    {
      content_name: contentName,
      content_category: "Hospital Management Software",
      hospital_name: parameters.hospitalName || "",
    },
    { eventID: eventId }
  );

  // 2. Fire Server-side Conversions API (CAPI) with matching eventId
  sendMetaConversionApiEvent({
    eventName: "Lead",
    eventId,
    eventSourceUrl: typeof window !== "undefined" ? window.location.href : "https://infiplus.in/",
    userData: {
      name: parameters.name,
      phone: parameters.phone,
      email: parameters.email,
    },
    customData: {
      content_name: contentName,
      content_category: "Hospital Management Software",
      hospital_name: parameters.hospitalName || "",
      source: parameters.source,
    },
  });
};

/**
 * Log custom Meta Pixel events
 */
export const trackCustomEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined") {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, parameters);
      console.log(`[Meta Pixel] Tracked custom event: ${eventName}`, parameters);
    } else {
      const fbqQueue = (window.fbq =
        window.fbq ||
        function (...args: unknown[]) {
          ((window.fbq as any).queue = (window.fbq as any).queue || []).push(args);
        });
      fbqQueue("trackCustom", eventName, parameters);
      console.log(`[Meta Pixel] Queued custom event: ${eventName}`, parameters);
    }
  }
};

export const GOOGLE_CONVERSION_ID = "AW-18220446152";
export const GOOGLE_LEAD_CONVERSION_LABEL = "Wvi3CPaRibMdEMjjl_BD";
export const GOOGLE_LEAD_SEND_TO = `${GOOGLE_CONVERSION_ID}/${GOOGLE_LEAD_CONVERSION_LABEL}`;

/**
 * Fires the official Google Ads conversion event for Infiplus Firebase Lead
 */
export const trackGoogleLeadConversion = () => {
  if (typeof window !== "undefined") {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: GOOGLE_LEAD_SEND_TO,
      });
      window.gtag("event", "generate_lead", {
        event_category: "Hospital Demo",
        event_label: "Lead Form Submitted",
      });
      console.log(`[Google Ads] Conversion event fired: ${GOOGLE_LEAD_SEND_TO}`);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push([
        "event",
        "conversion",
        { send_to: GOOGLE_LEAD_SEND_TO },
      ]);
      console.log(`[Google Ads] Queued conversion event: ${GOOGLE_LEAD_SEND_TO}`);
    }
  }
};

/**
 * Official Google Ads conversion reporter function with callback support
 */
export const gtag_report_conversion = (url?: string) => {
  if (typeof window === "undefined") return false;
  const callback = () => {
    if (typeof url !== "undefined" && url) {
      window.location.href = url;
    }
  };
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: GOOGLE_LEAD_SEND_TO,
      event_callback: callback,
    });
    console.log(`[Google Ads] Conversion fired via gtag_report_conversion: ${GOOGLE_LEAD_SEND_TO}`);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push([
      "event",
      "conversion",
      { send_to: GOOGLE_LEAD_SEND_TO, event_callback: callback },
    ]);
  }
  return false;
};

/**
 * Updates the browser URL query parameter (?status=lead-submitted or ?status=meeting-booked)
 * so that advertising platforms (Meta Ads, Google Ads) can track conversion URLs.
 * Preserves existing UTM tags, updates browser history, and triggers Meta Pixel and Google Tag conversion events.
 */
export const updateUrlConversionStatus = (
  status: "lead-submitted" | "meeting-booked"
) => {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("status", status);

    if (status === "lead-submitted") {
      url.searchParams.set("lead", "submitted");
      url.searchParams.delete("meeting");
    } else if (status === "meeting-booked") {
      url.searchParams.set("meeting", "booked");
      url.searchParams.delete("lead");
    }

    window.history.pushState({ status }, "", url.toString());
    window.dispatchEvent(new Event("popstate"));

    // Track PageView with the updated conversion URL in Meta Pixel
    pageview();

    // Trigger Google Tag conversion event
    if (status === "lead-submitted") {
      trackGoogleLeadConversion();
    }

    // Notify Google Tag of the updated page_view
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_location: url.toString(),
        page_path: url.pathname + url.search,
      });
    }

    console.log(`[Conversion URL] Address bar updated for ad tracking: ${url.toString()}`);
  } catch (e) {
    console.warn("Could not update URL conversion status:", e);
  }
};
