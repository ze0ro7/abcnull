
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = getSupabaseServer();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const testData = await req.json();

        const { data, error } = await supabase
            .from('test_results')
            .insert([
                {
                    user_id: user.id,
                    test_name: testData.test_name, // Changed from hardcoded value
                    score: testData.score,
                    time_taken: testData.timeTaken,
                    results: testData.results,
                },
            ]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Test results saved successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
