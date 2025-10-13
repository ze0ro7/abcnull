"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import questions from "../2025-che-pyqs.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const QuizPage = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 3 hours in seconds
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...questions]));
  }, []);

  useEffect(() => {
    if (quizStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted]);

  const handleStartQuiz = () => {
    setShowGuidelines(false);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    const results = {
      questions: shuffledQuestions,
      answers: selectedAnswers,
      timeTaken: 180 * 60 - timeLeft,
    };
    localStorage.setItem("quizResults", JSON.stringify(results));
    router.push(`/che/2025-pyqs/results`);
  };

  if (showGuidelines) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>GATE 2025 - Chemical Engineering PYQs Test</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Test Guidelines</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Total Questions: 65</li>
              <li>Time Limit: 180 minutes (3 hours)</li>
              <li>
                Questions 1-5 (General Aptitude) and 11-35 (Chemical Eng.) carry 1 mark each.
              </li>
              <li>
                Questions 6-10 (General Aptitude) and 36-65 (Chemical Eng.) carry 2 marks each.
              </li>
               <li>
                Incorrect MCQ answers will result in negative marks. For 1-mark questions, 1/3 mark will be deducted. For 2-mark questions, 2/3 mark will be deducted.
              </li>
              <li>There are no negative marks for NAT (Numerical Answer Type) or MSQ (Multiple Select Questions).</li>
              <li>You can use the calculator provided.</li>
              <li>Do not refresh the page during the test.</li>
            </ul>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleStartQuiz}>Start Test</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const openCalculator = () => {
    alert("Calculator functionality to be added.");
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chemical Engineering Test</h1>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">
              Time Left: {Math.floor(timeLeft / 60)}:
              {('''0''' + (timeLeft % 60)).slice(-2)}
            </span>
            <Button variant="outline" onClick={openCalculator}>Calculator</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Submit</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will end your test and submit your answers. You cannot undo this action.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <Progress
          value={((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}
          className="mb-4"
        />
        {currentQuestion && (
          <Card>
            <CardHeader>
              <CardTitle>
                Question {currentQuestionIndex + 1}
              </CardTitle>
               <p className="text-sm text-muted-foreground pt-2">
                Section: {currentQuestion.section} | Marks: {currentQuestion.marks} | Type: {currentQuestion.questionType}
              </p>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{currentQuestion.questionText}</p>
              {currentQuestion.questionType === 'MCQ' && 
                <RadioGroup
                  onValueChange={(value) =>
                    handleAnswerSelect(currentQuestion.id, value)
                  }
                  value={selectedAnswers[currentQuestion.id] || ""}
                >
                  {Object.entries(currentQuestion.options).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <RadioGroupItem value={key} id={`${currentQuestion.id}-${key}`} />
                      <Label htmlFor={`${currentQuestion.id}-${key}`}>{key}: {value}</Label>
                    </div>
                  ))}
                </RadioGroup>
              }
              {currentQuestion.questionType === 'MSQ' && <div>MSQ input to be implemented</div>}
              {currentQuestion.questionType === 'NAT' && <div>NAT input to be implemented</div>}
            </CardContent>
          </Card>
        )}
        <div className="mt-4 flex justify-between">
          <Button
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(shuffledQuestions.length - 1, prev + 1)
              )
            }
            disabled={currentQuestionIndex === shuffledQuestions.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="w-1/4 p-4 border-l overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Questions</h2>
        <div className="grid grid-cols-4 gap-2">
          {shuffledQuestions.map((q, index) => (
            <Button
              key={q.id}
              variant={
                selectedAnswers[q.id]
                  ? "default"
                  : "outline"
              }
              className={`w-12 h-12 ${
                currentQuestionIndex === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;