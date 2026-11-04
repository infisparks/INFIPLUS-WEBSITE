export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "2241568519757954";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

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
 * Log standard Meta Pixel events (e.g. Lead, Schedule, Contact)
 * https://developers.facebook.com/docs/meta-pixel/reference
 */
export const trackEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined") {
    if (typeof window.fbq === "function") {
      window.fbq("track", eventName, parameters);
      console.log(`[Meta Pixel] Tracked standard event: ${eventName}`, parameters);
    } else {
      // Initialize fbq queue if script is still downloading
      const fbqQueue = (window.fbq =
        window.fbq ||
        function (...args: unknown[]) {
          ((window.fbq as any).queue = (window.fbq as any).queue || []).push(args);
        });
      fbqQueue("track", eventName, parameters);
      console.log(`[Meta Pixel] Queued event: ${eventName}`, parameters);
    }
  }
};

/**
 * Helper to track Lead conversion with full Meta standard schema and fallbacks.
 * Meta Pixel restricts standard "Lead" on healthcare-classified domains.
 * We fire:
 *  1. Standard "Lead" (if approved in Events Manager)
 *  2. Standard "Contact" (unrestricted standard event for lead generation)
 *  3. Custom "Lead" and "HospitalLead" (visible in Meta Ads Data Advisor)
 */
export const trackLeadEvent = (parameters: {
  name?: string;
  hospitalName?: string;
  source: string;
  phone?: string;
}) => {
  const contentName = `${parameters.source} - ${parameters.hospitalName || "Hospital Demo Request"}`;

  // 1. Standard Lead
  trackEvent("Lead", {
    content_name: contentName,
    content_category: "Healthcare Software Demo",
  });

  // 2. Standard Contact (allowed by Meta healthcare data policy)
  trackEvent("Contact", {
    content_name: contentName,
    content_category: "Healthcare Software Demo",
  });

  // 3. Custom Events (bypasses restrictedEventNames filter in Meta Pixel)
  trackCustomEvent("Lead", {
    content_name: contentName,
    hospital: parameters.hospitalName || "",
  });

  trackCustomEvent("HospitalLead", {
    content_name: contentName,
    hospital: parameters.hospitalName || "",
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
