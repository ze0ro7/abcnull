'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip, YAxis } from 'recharts';

export function TestMarksChart({ testResults }) {
    const chartData = testResults?.map(result => ({
        name: new Date(result.created_at).toLocaleDateString(),
        marks: result.score,
    })) || [];

    const latestTest = testResults?.[0];
    const highestScore = testResults?.reduce((max, current) => (current.score > max ? current.score : max), 0) || 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Test Marks</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <div>
                        <div className="text-3xl font-bold">{latestTest?.score || 0}</div>
                        <div className="text-sm text-muted-foreground">Latest Test Score</div>
                        <div className="text-sm text-muted-foreground">Attended: {testResults?.length || 0}</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold">{highestScore}</div>
                        <div className="text-sm text-muted-foreground">Highest Score</div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={chartData}>
                        <Line type="monotone" dataKey="marks" stroke="#f97316" strokeWidth={2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
