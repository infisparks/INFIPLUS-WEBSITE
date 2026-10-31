/**
 * Client-Side WhatsApp Evolution API Helper
 * Sends automated booking confirmation message directly from client browser
 * All credentials, instances, meeting URLs, and support numbers are strictly loaded from environment variables.
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
    const baseUrl = process.env.NEXT_PUBLIC_WHATSAPP_API_BASE_URL;
    const instance = process.env.NEXT_PUBLIC_WHATSAPP_INSTANCE;
    const apiKey = process.env.NEXT_PUBLIC_WHATSAPP_API_KEY;
    const meetingUrl = process.env.NEXT_PUBLIC_GOOGLE_MEET_URL || "";
    const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "";

    if (!baseUrl || !instance || !apiKey) {
      console.warn("WhatsApp API environment variables (NEXT_PUBLIC_WHATSAPP_*) are not configured.");
      return { success: false, error: "WhatsApp API environment configuration missing." };
    }

    // Sanitize phone number (strip non-digits)
    let cleanPhone = String(phone).replace(/\D/g, "");
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith("0")) {
      cleanPhone = `91${cleanPhone.slice(1)}`;
    }

    const meetingLinkSection = meetingUrl
      ? `\n🔗 *Meeting Link:* ${meetingUrl}\n\nPlease join using the Google Meet link at your scheduled time:\n👉 ${meetingUrl}\n`
      : "";

    const contactSection = supportPhone
      ? `\nNeed to reschedule or have immediate queries?\nReply directly to this WhatsApp message or call us at +${supportPhone}.`
      : "";

    const formattedMessage = `🏥 *INFIPLUS HOSPITAL MANAGEMENT ERP*
*Demo Meeting Confirmed!*

Dear *${name.trim()}*,
Thank you for scheduling a personalized demo for *${hospitalName.trim() || "your hospital/clinic"}*.

📅 *Date:* ${meetingDate}
⏰ *Time:* ${meetingTime} (IST)
💻 *Mode:* Google Meet Screen-Share (30 Mins)${meetingLinkSection}
👨‍⚕️ *Consultant:* Healthcare ERP Specialist

Our specialist will walk you through OPD, IPD, Digital Records, Fast Billing & WhatsApp patient notifications tailored to your hospital.${contactSection}

Best regards,
*Infiplus Healthcare Team*
🌐 https://infiplus.in`;

    const endpoint = `${baseUrl.replace(/\/+$/, "")}/${instance}`;
    const res = await fetch(endpoint, {
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

    const data = await res.json().catch(() => ({}));

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
