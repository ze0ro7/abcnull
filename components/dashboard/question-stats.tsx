'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function QuestionStats({ testResults }) {
    const totalQuestions = 1300;
    const aptitudeQuestions = 200;
    const branchCoreQuestions = 1100;
    const solvedQuestions = testResults?.reduce((acc, result) => acc + result.score, 0) || 0;
    const attemptedQuestions = solvedQuestions; // Placeholder: Data for attempted questions is not available

    return (
        <Card>
            <CardHeader>
                <CardTitle>Questions Solved</CardTitle>
                <CardDescription>You've solved {solvedQuestions} out of {totalQuestions} questions.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-around">
                <div className="relative w-32 h-32">
                    <Progress value={(solvedQuestions / totalQuestions) * 100} className="w-full h-full rounded-full" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">{solvedQuestions}/{totalQuestions}</span>
                        <span className="text-sm text-muted-foreground">Solved</span>
                    </div>
                </div>
                <div>
                    <div className="text-sm">Aptitude: {aptitudeQuestions}</div>
                    <div className="text-sm">Branch Core: {branchCoreQuestions}</div>
                    <div className="text-sm text-muted-foreground mt-2">{attemptedQuestions} Attempted</div>
                </div>
            </CardContent>
        </Card>
    );
}
