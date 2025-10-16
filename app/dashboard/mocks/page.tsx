import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const branchMap = {
    CHE: "Chemical Engineering",
    CSE: "Computer Science and Information Technology",
    CE: "Civil Engineering",
    ECE: "Electronics and Communication Engineering",
    ME: "Mechanical Engineering",
    EE: "Electrical Engineering",
};

export default async function MocksPage({ searchParams }: { searchParams: { exam?: string, branch?: string } }) {
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
  
  const exam = searchParams.exam || profile?.exam;
  const branch = searchParams.branch || profile?.branch;

  const mocks = Array.from({ length: 10 }, (_, i) => i + 1);
  const userBranch = branch as keyof typeof branchMap;
  const branchName = userBranch ? branchMap[userBranch] : null;

  return (
    <main className="container mx-auto px-4 pt-6 pb-10">
      <h1 className="text-3xl md:text-4xl font-bold">Mock Tests</h1>
      <p className="text-muted-foreground mt-2">Practice with mock tests from your selected branch.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exam === "GATE" && userBranch && branchName ? (
            <>
                {mocks.map((mockNumber) => (
                    <Card key={mockNumber} className="transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20">
                        <CardHeader>
                            <CardTitle>{branchName} - Mock Test {mockNumber}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Full-length mock test based on the latest pattern.
                            </p>
                            <Link href={`/${userBranch.toLowerCase()}/mocks-${mockNumber}`}>
                                <Button className="cursor-pointer">Start Test</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </>
        ) : (
            <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                    <CardTitle>No Mock Tests Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        We couldn't find any mock tests for your selected branch, or your profile isn't fully updated. Please make sure your exam and branch are set correctly in your settings or use the search above.
                    </p>
                </CardContent>
            </Card>
        )}
      </div>
    </main>
  )
}
