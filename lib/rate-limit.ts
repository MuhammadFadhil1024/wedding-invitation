import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ipSalt = process.env.IP_SALT!;

if (!supabaseUrl || !supabaseServiceRoleKey || !ipSalt) {
  throw new Error("Missing rate limit environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const MAX_REQUESTS = 3;
const WINDOW_SECONDS = 600;

function hashIp(ip: string): string {
  let hash = 0;
  const salted = ip + ipSalt;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetAt: number;
}> {
  const ipHash = hashIp(ip);
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - WINDOW_SECONDS;

  const { data: existing } = await supabase
    .from("rate_limits")
    .select("count, created_at")
    .eq("ip_hash", ipHash)
    .gte("created_at", windowStart)
    .single();

  if (existing) {
    const count = existing.count + 1;
    if (count > MAX_REQUESTS) {
      const resetAt = existing.created_at + WINDOW_SECONDS;
      return { allowed: false, remaining: 0, resetAt };
    }

    await supabase
      .from("rate_limits")
      .update({ count })
      .eq("ip_hash", ipHash)
      .eq("created_at", existing.created_at);

    return { allowed: true, remaining: MAX_REQUESTS - count, resetAt: existing.created_at + WINDOW_SECONDS };
  }

  await supabase.from("rate_limits").insert({
    ip_hash: ipHash,
    count: 1,
    created_at: now,
  });

  return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_SECONDS };
}