import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = getSupabaseServer()
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()
  if (userErr || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const payload = {
    user_id: user.id,
    full_name: body.full_name ?? null,
    exam: body.exam ?? null,
    branch: body.exam === "GATE" ? (body.branch ?? null) : null,
    institution: body.institution ?? null,
  }

  const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "user_id" })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ ok: true })
}
