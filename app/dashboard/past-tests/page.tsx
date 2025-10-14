
import { getSupabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PastTestsPage = async () => {
    const supabase = getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return notFound();
    }

    const { data: tests, error } = await supabase
        .from('test_results')
        .select('id, test_name, score, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching past tests:", error);
        return <div>Error loading tests.</div>
    }

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-6">Past Tests</h1>
            <div className="space-y-4">
                {tests.map(test => (
                    <Card key={test.id}>
                        <CardHeader>
                            <CardTitle>{test.test_name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Score: {test.score}</p>
                            <p>Date: {new Date(test.created_at).toLocaleDateString()}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PastTestsPage;
