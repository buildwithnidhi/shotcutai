import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: string; email?: string };
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    console.log("[shotcut.waitlist]", { name, email, ts: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}


