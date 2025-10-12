import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, exam, branch, institution")
    .eq("user_id", user.id)
    .maybeSingle()

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}</h1>
      <p className="text-muted-foreground mt-2">Your personalized practice and analytics hub.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 bg-card">
          <h2 className="text-lg font-semibold">Quick Start</h2>
          <p className="text-sm text-muted-foreground mt-2">Continue tests, browse PYQs, or start a mock.</p>
        </div>
        <div className="rounded-xl border p-6 bg-card">
          <h2 className="text-lg font-semibold">Account</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Exam: {profile?.exam || "—"}
            {profile?.exam === "GATE" && profile?.branch ? ` • Branch: ${profile.branch}` : ""}
            <br />
            Institute: {profile?.institution || "—"}
          </p>
        </div>
        <div className="rounded-xl border p-6 bg-card">
          <h2 className="text-lg font-semibold">AI Credits</h2>
          <p className="text-sm text-muted-foreground mt-2">Track and top-up your credits for assistance.</p>
        </div>
      </div>
    </main>
  )
}
