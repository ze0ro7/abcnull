'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StreakCalendar({ testResults }) {
    const submissions = new Array(365).fill(0);
    let totalActiveDays = 0;
    let maxStreak = 0;
    let currentStreak = 0;

    if (testResults) {
        const today = new Date();
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

        const submissionDates = testResults.map(result => new Date(result.created_at));

        for (let i = 0; i < 365; i++) {
            const date = new Date(oneYearAgo);
            date.setDate(oneYearAgo.getDate() + i);

            const hasSubmission = submissionDates.some(
                (submissionDate) =>
                    submissionDate.getFullYear() === date.getFullYear() &&
                    submissionDate.getMonth() === date.getMonth() &&
                    submissionDate.getDate() === date.getDate()
            );

            if (hasSubmission) {
                submissions[i] = 1;
                totalActiveDays++;
                currentStreak++;
            } else {
                if (currentStreak > maxStreak) {
                    maxStreak = currentStreak;
                }
                currentStreak = 0;
            }
        }

        if (currentStreak > maxStreak) {
            maxStreak = currentStreak;
        }
    }

    const totalSubmissions = submissions.reduce((a, b) => a + b, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{totalSubmissions} submissions in the past one year</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Total active days: {totalActiveDays}</span>
                    <span>Max streak: {maxStreak}</span>
                </div>
                <div className="grid grid-cols-52 grid-rows-7 gap-1 mt-2">
                    {submissions.map((submission, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-sm ${
                                submission > 0 ? "bg-green-500" : "bg-gray-200"
                            }`}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
