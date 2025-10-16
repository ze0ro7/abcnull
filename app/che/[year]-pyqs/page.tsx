import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { TestProvider } from "@/context/TestContext";
import TestClientPage from "@/components/test/TestClientPage";
import { getQuestions } from "@/lib/get-questions";

export default async function PYQPage({ params }: { params: { year: string } }) {
  const supabase = getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const questions = await getQuestions(params.year);

  return (
    <TestProvider questions={questions}>
      <TestClientPage
        examTitle={`GATE CHE ${params.year} PYQ`}
        userId={user.id}
        examType="pyq"
        year={params.year}
      />
    </TestProvider>
  );
}
