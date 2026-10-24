import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, X-Admin-Token",
};

const ADMIN_TOKEN = Deno.env.get("EXPORT_ADMIN_TOKEN");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const providedToken = req.headers.get("X-Admin-Token");

    if (!ADMIN_TOKEN || !providedToken || !timingSafeEqual(providedToken, ADMIN_TOKEN)) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("inquiries")
      .select("created_at, name, email, interest, message")
      .order("created_at", { ascending: true });

    if (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch inquiries" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const rows = data ?? [];
    const total = rows.length;

    // --- Interest breakdown ---
    const interestCounts: Record<string, number> = {};
    for (const r of rows) {
      const key = r.interest ?? "General enquiry";
      interestCounts[key] = (interestCounts[key] ?? 0) + 1;
    }
    const byInterest = Object.entries(interestCounts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);

    // --- Daily trend (last 30 days, including zero days) ---
    const now = new Date();
    const dayBuckets: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      dayBuckets.push({ date: d.toISOString().slice(0, 10), count: 0 });
    }
    const bucketMap: Record<string, number> = {};
    dayBuckets.forEach((b) => (bucketMap[b.date] = 0));
    for (const r of rows) {
      const day = new Date(r.created_at).toISOString().slice(0, 10);
      if (day in bucketMap) bucketMap[day]++;
    }
    dayBuckets.forEach((b) => (b.count = bucketMap[b.date]));

    // --- Weekly trend (last 12 weeks) ---
    const weekBuckets: { weekStart: string; count: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i * 7);
      const dayOfWeek = d.getDay();
      d.setDate(d.getDate() - dayOfWeek);
      weekBuckets.push({ weekStart: d.toISOString().slice(0, 10), count: 0 });
    }
    const weekMap: Record<string, number> = {};
    weekBuckets.forEach((b) => (weekMap[b.weekStart] = 0));
    for (const r of rows) {
      const d = new Date(r.created_at);
      const dayOfWeek = d.getDay();
      d.setDate(d.getDate() - dayOfWeek);
      const wk = d.toISOString().slice(0, 10);
      if (wk in weekMap) weekMap[wk]++;
    }
    weekBuckets.forEach((b) => (b.count = weekMap[b.weekStart]));

    // --- Recent submissions (last 5) ---
    const recent = rows
      .slice(-5)
      .reverse()
      .map((r) => ({
        name: r.name,
        email: r.email,
        interest: r.interest,
        created_at: r.created_at,
      }));

    const firstDate = total > 0 ? rows[0].created_at : null;
    const lastDate = total > 0 ? rows[rows.length - 1].created_at : null;

    return new Response(
      JSON.stringify({
        total,
        firstDate,
        lastDate,
        byInterest,
        daily: dayBuckets,
        weekly: weekBuckets,
        recent,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const bufA = enc.encode(a);
  const bufB = enc.encode(b);
  if (bufA.length !== bufB.length) return false;
  let diff = 0;
  for (let i = 0; i < bufA.length; i++) {
    diff |= bufA[i] ^ bufB[i];
  }
  return diff === 0;
}
