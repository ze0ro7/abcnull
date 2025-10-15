
import { getSupabaseServer } from '@/lib/supabase/server';

export async function getTestResults() {
    const supabase = getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        console.error('Error fetching test results:', error);
        return null;
    }

    return data;
}
