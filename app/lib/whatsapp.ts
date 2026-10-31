/**
 * Client-Side WhatsApp Evolution API Helper
 * Sends automated booking confirmation message directly from client browser
 */

export interface SendWhatsAppParams {
  name: string;
  hospitalName: string;
  phone: string;
  meetingDate: string;
  meetingTime: string;
}

export async function sendBookingWhatsAppNotification({
  name,
  hospitalName,
  phone,
  meetingDate,
  meetingTime,
}: SendWhatsAppParams): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    // Sanitize phone number (strip non-digits)
    let cleanPhone = String(phone).replace(/\D/g, "");
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith("0")) {
      cleanPhone = `91${cleanPhone.slice(1)}`;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_WHATSAPP_API_BASE_URL ||
      "https://evo.infispark.in/message/sendText";
    const instance =
      process.env.NEXT_PUBLIC_WHATSAPP_INSTANCE || "mudassir";
    const apiKey =
      process.env.NEXT_PUBLIC_WHATSAPP_API_KEY ||
      "vR39h6avY69g7kAU3YQbS6V6XEvudson";

    const formattedMessage = `🏥 *INFIPLUS HOSPITAL MANAGEMENT ERP*
*Demo Meeting Confirmed!*

Dear *${name.trim()}*,
Thank you for scheduling a personalized demo for *${hospitalName.trim() || "your hospital/clinic"}*.

📅 *Date:* ${meetingDate}
⏰ *Time:* ${meetingTime} (IST)
💻 *Mode:* Google Meet Screen-Share (30 Mins)
👨‍⚕️ *Consultant:* Healthcare ERP Specialist

Our specialist will connect with you at your chosen time slot to walk you through OPD, IPD, Digital Records, Fast Billing & WhatsApp patient notifications.

Need to reschedule or have immediate queries?
Reply directly to this WhatsApp message or call us at +91 99583 99157.

Best regards,
*Infiplus Healthcare Team*
🌐 https://infiplus.in`;

    let endpoint = `${baseUrl.replace(/\/+$/, "")}/${instance}`;
    let res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify({
        number: cleanPhone,
        text: formattedMessage,
      }),
    });

    let data = await res.json().catch(() => ({}));

    // Fallback instance if primary returns 404
    if (res.status === 404 && instance !== "medzeal") {
      endpoint = `${baseUrl.replace(/\/+$/, "")}/medzeal`;
      res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
        },
        body: JSON.stringify({
          number: cleanPhone,
          text: formattedMessage,
        }),
      });
      data = await res.json().catch(() => ({}));
    }

    if (!res.ok) {
      console.warn("Client WhatsApp API call error:", data);
      return { success: false, error: data?.response?.message || "WhatsApp sending failed", data };
    }

    return { success: true, data };
  } catch (error: any) {
    console.warn("Client WhatsApp exception:", error);
    return { success: false, error: error.message || "Failed to dispatch WhatsApp message" };
  }
}
