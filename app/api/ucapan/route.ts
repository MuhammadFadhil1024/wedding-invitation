import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { validateUcapanInput, isHoneypotFilled } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";
import type { Ucapan, Attendance } from "@/types";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function GET(): Promise<NextResponse> {
  try {
    const { data, error } = await supabaseServer
      .from("ucapan")
      .select("id, name, message, attendance, created_at, is_visible")
      .eq("is_visible", true)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Gagal memuat ucapan" }, { status: 500 });
    }

    return NextResponse.json(data as Ucapan[]);
  } catch (err) {
    console.error("GET /api/ucapan error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const ip = getClientIp(request);
    const rateLimit = await checkRateLimit(ip);

    if (!rateLimit.allowed) {
      const resetIn = Math.max(0, rateLimit.resetAt - Math.floor(Date.now() / 1000));
      const minutes = Math.ceil(resetIn / 60);
      return NextResponse.json(
        { error: `Terlalu sering mengirim. Coba lagi dalam ${minutes} menit.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, message, attendance, slug, website } = body as Partial<{
      name: string;
      message: string;
      attendance: Attendance;
      slug: string;
      website: string;
    }>;

    const validation = validateUcapanInput({ name: name || "", message: message || "", attendance: attendance || "hadir", slug: slug || "", website: website || "" });

    if (!validation.ok) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    if (isHoneypotFilled({ name: name || "", message: message || "", attendance: attendance || "hadir", slug: slug || "", website: website || "" })) {
      return NextResponse.json({ ok: true, message: "Terima kasih" }, { status: 201 });
    }

    const { error } = await supabaseServer.from("ucapan").insert({
      name: validation.data!.name,
      message: validation.data!.message,
      attendance: validation.data!.attendance,
      guest_slug: validation.data!.slug,
      is_visible: true,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Gagal menyimpan ucapan" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/ucapan error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}