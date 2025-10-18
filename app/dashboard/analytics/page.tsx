import { getSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTestResults } from "@/lib/test-results";
import AiChatWidget from "@/components/dashboard/ai-chat-widget";

export default async function AnalyticsPage() {
  const supabase = getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const testResults = await getTestResults();

  const pyqsTests = testResults
    ? testResults.filter(test => test.test_name && test.test_name.toLowerCase().includes('pyqs'))
    : [];

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Test Analytics</h1>
      <p className="text-muted-foreground mt-2">
        Analyze your past test performances.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pyqsTests.length > 0 ? (
          pyqsTests.map((test) => (
            <Card key={test.id}>
              <CardHeader>
                <CardTitle>{test.test_name ? `GATE CHE ${test.test_name.split('-')[0]} PYQs` : 'PYQs Test'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Date: {new Date(test.created_at).toLocaleDateString()}
                </p>
                <Link href={`/che/2025-pyqs/results?id=${test.id}`}>
                  <Button className="cursor pointer">Analyze</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No PYQS tests have been attempted yet.</p>
        )}
      </div>

      <div className="mt-10">
        <AiChatWidget />
      </div>
    </main>
  );
}
