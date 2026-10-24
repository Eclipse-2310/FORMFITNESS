import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const NOTIFICATION_EMAIL = "afylipse2523@gmail.com";
const FROM_EMAIL = "afylipse2523@gmail.com";
const FROM_NAME = "FORM / FITNESS";

async function sendEmail(
  to: { email: string; name?: string },
  subject: string,
  html: string,
  replyTo?: string,
): Promise<Response> {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY!,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: FROM_EMAIL, name: FROM_NAME },
      to: [to],
      replyTo: replyTo ? { email: replyTo } : undefined,
      subject,
      htmlContent: html,
    }),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    if (!record?.name || !record?.email || !record?.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!BREVO_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: inquiry } = await supabase
      .from("inquiries")
      .select("id, name, email, interest, message, created_at")
      .eq("id", record.id)
      .maybeSingle();

    const row = inquiry ?? record;

    const ownerHtml = `\
<div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #23211D;">
  <h2 style="font-size: 20px; margin: 0 0 8px;">New inquiry from your website</h2>
  <p style="color: #5A574F; margin: 0 0 24px; font-size: 14px;">${new Date(row.created_at ?? Date.now()).toLocaleString()}</p>
  <table style="width: 100%; font-size: 15px; line-height: 1.6;">
    <tr><td style="padding: 4px 0; color: #5A574F; width: 90px; vertical-align: top;">Name</td><td style="padding: 4px 0;"><strong>${escapeHtml(row.name)}</strong></td></tr>
    <tr><td style="padding: 4px 0; color: #5A574F; vertical-align: top;">Email</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(row.email)}" style="color: #5E6738;">${escapeHtml(row.email)}</a></td></tr>
    <tr><td style="padding: 4px 0; color: #5A574F; vertical-align: top;">Interest</td><td style="padding: 4px 0;">${escapeHtml(row.interest ?? "General enquiry")}</td></tr>
  </table>
  <h3 style="font-size: 15px; margin: 24px 0 8px; color: #5A574F;">Message</h3>
  <div style="background: #F4F1EA; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(row.message)}</div>
  <p style="margin: 32px 0 0; font-size: 13px; color: #5A574F;">This notification was sent from the FORM / FITNESS contact form.</p>
</div>`;

    const visitorHtml = `\
<div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #23211D;">
  <h1 style="font-size: 24px; font-weight: 300; margin: 0 0 16px;">Thanks for getting in touch, ${escapeHtml(row.name.split(" ")[0])}.</h1>
  <p style="font-size: 16px; line-height: 1.6; color: #5A574F; margin: 0 0 16px;">
    Your message has been received and I will reply to you at <a href="mailto:${escapeHtml(row.email)}" style="color: #5E6738;">${escapeHtml(row.email)}</a> within a day.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #5A574F; margin: 0 0 16px;">
    If you would rather chat sooner, you can also reach me on WhatsApp or by email using the details below.
  </p>
  <div style="background: #F4F1EA; border-radius: 8px; padding: 16px; margin: 24px 0; font-size: 15px; line-height: 1.6;">
    <p style="margin: 0 0 8px;"><strong>WhatsApp:</strong> +1 (555) 555-0100</p>
    <p style="margin: 0 0 8px;"><strong>Email:</strong> hello@formfitness.example</p>
    <p style="margin: 0;"><strong>Hours:</strong> Mon–Sat, 06:00–20:00</p>
  </div>
  <p style="font-size: 16px; line-height: 1.6; color: #5A574F; margin: 0 0 16px;">
    Here is what you sent, for your records:
  </p>
  <div style="background: #F4F1EA; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(row.message)}</div>
  <p style="margin: 32px 0 0; font-size: 13px; color: #5A574F;">This is an automated confirmation from the FORM / FITNESS contact form. No reply is needed.</p>
</div>`;

    const results = await Promise.allSettled([
      sendEmail(
        { email: NOTIFICATION_EMAIL, name: "Coach" },
        `New inquiry: ${row.interest ?? "General enquiry"} — ${row.name}`,
        ownerHtml,
        row.email,
      ),
      sendEmail(
        { email: row.email, name: row.name },
        "Thanks for your message — FORM / FITNESS",
        visitorHtml,
      ),
    ]);

    const [ownerResult, visitorResult] = results;
    const failures: string[] = [];
    if (ownerResult.status === "rejected") failures.push("owner notification failed");
    else if (!ownerResult.value.ok) failures.push("owner notification failed");
    if (visitorResult.status === "rejected") failures.push("visitor confirmation failed");
    else if (!visitorResult.value.ok) failures.push("visitor confirmation failed");

    if (failures.length === 2) {
      return new Response(
        JSON.stringify({ error: "All emails failed", detail: failures.join("; ") }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ sent: true, warnings: failures.length ? failures : undefined }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
