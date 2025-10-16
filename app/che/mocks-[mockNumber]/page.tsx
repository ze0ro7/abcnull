import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { TestProvider } from "@/context/TestContext";
import TestClientPage from "@/components/test/TestClientPage";
import { getQuestions } from "@/lib/get-questions";

export default async function MockPage({ params }: { params: { mockNumber: string } }) {
  const supabase = getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const questions = await getQuestions(params.mockNumber);

  return (
    <TestProvider questions={questions}>
      <TestClientPage
        examTitle={`GATE CHE Mock Test ${params.mockNumber}`}
        userId={user.id}
        examType="mock"
        year={params.mockNumber}
      />
    </TestProvider>
  );
}
