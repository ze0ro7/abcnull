import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TestMarksChart } from "@/components/dashboard/test-marks-chart"
import { QuestionStats } from "@/components/dashboard/question-stats"
import { StreakCalendar } from "@/components/dashboard/streak-calendar"
import { Badges } from "@/components/dashboard/badges"
import { getTestResults } from "@/lib/test-results"

export default async function DashboardPage() {
  const supabase = getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const [profile, testResults] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, exam, branch, institution")
      .eq("user_id", user.id)
      .maybeSingle(),
    getTestResults(),
  ]);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Welcome{profile?.data?.full_name ? `, ${profile.data.full_name}` : ""}</h1>
      <p className="text-muted-foreground mt-2">Your personalized practice and analytics hub.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TestMarksChart testResults={testResults} />
        </div>
        <QuestionStats testResults={testResults} />
        <div className="lg:col-span-3">
          <StreakCalendar testResults={testResults} />
        </div>
        <Badges />

        {profile?.data?.exam === "GATE" && profile?.data?.branch === "CHE" && (
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
                Exam: {profile?.data?.exam || "—"}
                {profile?.data?.exam === "GATE" && profile?.data?.branch ? ` • Branch: ${profile.data.branch}` : ""}
                <br />
                Institute: {profile?.data?.institution || "—"}
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
