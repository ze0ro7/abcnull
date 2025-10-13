import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function PYQsPage() {
  const supabase = getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("exam, branch")
    .eq("user_id", user.id)
    .maybeSingle()

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Previous Year Questions</h1>
      <p className="text-muted-foreground mt-2">Practice with PYQs from your selected branch.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profile?.exam === "GATE" && profile?.branch === "CHE" ? (
            <Card>
                <CardHeader>
                    <CardTitle>Chemical Engineering - 2025</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Full-length mock test based on the 2025 paper.
                    </p>
                    <Link href="/che/2025-pyqs">
                        <Button>Start Test</Button>
                    </Link>
                </CardContent>
            </Card>
        ) : (
            <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                    <CardTitle>No PYQs Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        We couldn't find any PYQs for your selected branch, or your profile isn't fully updated. Please make sure your exam and branch are set correctly in your settings.
                    </p>
                </CardContent>
            </Card>
        )}
      </div>
    </main>
  )
}
