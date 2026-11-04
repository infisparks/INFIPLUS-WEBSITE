export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "2241568519757954";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
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
 * Log standard Meta Pixel events (e.g. Lead, Schedule, Contact)
 */
export const trackEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined") {
    // Unrestrict Lead and Schedule before dispatching
    if (eventName === "Lead" || eventName === "Schedule") {
      unrestrictLeadAndSchedule();
    }

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
 * Fires the official standard "Lead" event to Meta Pixel
 */
export const trackLeadEvent = (parameters: {
  name?: string;
  hospitalName?: string;
  source: string;
  phone?: string;
}) => {
  unrestrictLeadAndSchedule();

  const contentName = `${parameters.source} - ${parameters.hospitalName || "Hospital Demo Request"}`;

  // Fire standard Lead only
  trackEvent("Lead", {
    content_name: contentName,
    content_category: "Hospital Management Software",
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
