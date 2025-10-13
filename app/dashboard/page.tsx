import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Continue tests, browse PYQs, or start a mock.</p>
          </CardContent>
        </Card>

        {profile?.exam === "GATE" && profile?.branch === "CHE" && (
            <Card>
                <CardHeader>
                    <CardTitle>Chemical Engineering PYQs</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Practice with the 2025 Previous Year Questions.
                    </p>
                    <Link href="/che/2025-pyqs">
                        <Button>Start Test</Button>
                    </Link>
                </CardContent>
            </Card>
        )}

        <Card>
            <CardHeader>
                <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-sm text-muted-foreground">
                Exam: {profile?.exam || "—"}
                {profile?.exam === "GATE" && profile?.branch ? ` • Branch: ${profile.branch}` : ""}
                <br />
                Institute: {profile?.institution || "—"}
            </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>AI Credits</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Track and top-up your credits for assistance.</p>
            </CardContent>
        </Card>
      </div>
    </main>
  )
}
