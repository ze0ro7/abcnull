"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const calculateResults = (questions, answers) => {
  let score = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unanswered = 0;
  const topicAnalysis = {};

  questions.forEach((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    const topic = q.section;

    if (!topicAnalysis[topic]) {
      topicAnalysis[topic] = { total: 0, correct: 0 };
    }
    topicAnalysis[topic].total++;

    if (userAnswer) {
      if (isCorrect) {
        score += q.marks;
        correctAnswers++;
        topicAnalysis[topic].correct++;
      } else {
        if (q.questionType === "MCQ") {
          score -= q.marks === 1 ? 1 / 3 : 2 / 3;
        }
        incorrectAnswers++;
      }
    } else {
      unanswered++;
    }
  });

  return {
    score: score.toFixed(2),
    correctAnswers,
    incorrectAnswers,
    unanswered,
    topicAnalysis,
  };
};

const ResultsPage = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults");
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
    }
  }, []);

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading results...
      </div>
    );
  }

  const { questions, answers } = results;
  const { score, correctAnswers, incorrectAnswers, unanswered, topicAnalysis } =
    calculateResults(questions, answers);

  return (
    <div className="container mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Test Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Final Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{score}</p>
              <p className="text-muted-foreground">/ 100</p>
            </CardContent>
          </Card>
          <Card className="text-center">
             <CardHeader>
              <CardTitle>Correct</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-500">{correctAnswers}</p>
            </CardContent>
          </Card>
           <Card className="text-center">
             <CardHeader>
              <CardTitle>Incorrect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-500">{incorrectAnswers}</p>
            </CardContent>
          </Card>
           <Card className="text-center">
             <CardHeader>
              <CardTitle>Unanswered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-500">{unanswered}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Topic Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(topicAnalysis).map(([topic, data]) => (
            <div key={topic} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-semibold">{topic}</span>
                <span>
                  {data.correct} / {data.total} Correct
                </span>
              </div>
              <Progress value={(data.correct / data.total) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Q#</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Your Answer</TableHead>
                <TableHead>Correct Answer</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((q, index) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                let status;
                if (!userAnswer) {
                    status = <Badge variant="secondary">Unanswered</Badge>
                } else if (isCorrect) {
                    status = <Badge variant="default" className="bg-green-500">Correct</Badge>
                } else {
                    status = <Badge variant="destructive">Incorrect</Badge>
                }

                return (
                  <TableRow key={q.id}>
                    <TableCell>{q.questionNumber}</TableCell>
                    <TableCell className="max-w-xs truncate">{q.questionText}</TableCell>
                    <TableCell>{userAnswer || "—"}</TableCell>
                    <TableCell>{q.correctAnswer}</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <div className="mt-8 text-center">
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
        </div>
    </div>
  );
};

export default ResultsPage;
