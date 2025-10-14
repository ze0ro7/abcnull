'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { ThemeToggle } from "@/components/theme-toggle";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 3 hours in seconds
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/2025-che-pyqs.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        const initialStatus = {};
        data.forEach((q) => {
          initialStatus[q.id] = "notVisited";
        });
        setQuestionStatus(initialStatus);
      })
      .catch(error => {
        console.error("Error fetching question data:", error);
      });
  }, []);

  useEffect(() => {
    if (quizStarted) {
      const currentQuestionId = questions[currentQuestionIndex]?.id;
      if (currentQuestionId && questionStatus[currentQuestionId] === "notVisited") {
        setQuestionStatus(prevStatus => ({
          ...prevStatus,
          [currentQuestionId]: "notAnswered",
        }));
      }
    }
  }, [currentQuestionIndex, questions, quizStarted, questionStatus]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
        handleSubmit();
    }
  }, [quizStarted, timeLeft]);

  const handleStartQuiz = () => {
    if (questions.length > 0) {
      setShowGuidelines(false);
      setQuizStarted(true);
      const firstQuestionId = questions[0]?.id;
      if(firstQuestionId) {
        setQuestionStatus(prevStatus => ({
          ...prevStatus,
          [firstQuestionId]: "notAnswered",
        }));
      }
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
    setQuestionStatus(prevStatus => ({
      ...prevStatus,
      [questionId]: "answered",
    }));
  };

  const handleMarkForReview = () => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    const currentStatus = questionStatus[currentQuestionId];

    if (currentStatus === "answered") {
      setQuestionStatus(prevStatus => ({
        ...prevStatus,
        [currentQuestionId]: "answeredAndReview",
      }));
    } else if(currentStatus !== 'reviewLater') {
      setQuestionStatus(prevStatus => ({
        ...prevStatus,
        [currentQuestionId]: "reviewLater",
      }));
    } else {
       setQuestionStatus(prevStatus => ({
        ...prevStatus,
        [currentQuestionId]: selectedAnswers[currentQuestionId] ? 'answered' : 'notAnswered',
      }));
    }
  };

  const handleSubmit = async () => {
    const score = questions.reduce((acc, q) => {
        if (q.correctAnswer === selectedAnswers[q.id]) {
            return acc + q.marks;
        }
        return acc;
    }, 0);

    const results = {
      questions: questions,
      answers: selectedAnswers,
      statuses: questionStatus,
      timeTaken: 180 * 60 - timeLeft,
    };

    try {
      await fetch('/api/save-test', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
              score, 
              timeTaken: results.timeTaken, 
              results: results 
            }),
      });
    } catch (error) {
      console.error("Error saving test results:", error);
    }

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
              <Button className="cursor-pointer" onClick={handleStartQuiz} disabled={questions.length === 0}>
                {questions.length === 0 ? "Loading Questions..." : "Start Test"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const openCalculator = () => {
    alert("Calculator functionality to be added.");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "answered":
        return "bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white";
      case "notAnswered":
        return "bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-white";
      case "notVisited":
        return "bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white";
      case "reviewLater":
        return "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white";
      case "answeredAndReview":
        return "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white";
      default:
        return "bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white";
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chemical Engineering Test</h1>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">
              Time Left: {Math.floor(timeLeft / 60)}:
              {('0' + (timeLeft % 60)).slice(-2)}
            </span>
            <ThemeToggle />
            <Button variant="outline" onClick={openCalculator}>Calculator</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="cursor-pointer" variant="destructive">Submit</Button>
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
          value={((currentQuestionIndex + 1) / questions.length) * 100}
          className="mb-4"
        />
        {currentQuestion ? (
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
              <p className="mb-4 whitespace-pre-wrap">{currentQuestion.questionText}</p>
              {currentQuestion.questionType === 'MCQ' &&
                <RadioGroup
                  onValueChange={(value) =>
                    handleAnswerSelect(currentQuestion.id, value)
                  }
                  value={selectedAnswers[currentQuestion.id] || ""}
                >
                  {currentQuestion.options && Object.entries(currentQuestion.options).map(([key, value]) => (
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
        ) : (
          <div>Loading question...</div>
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
           <Button onClick={handleMarkForReview} variant="outline">
            Mark for Review
          </Button>
          <Button
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(questions.length - 1, prev + 1)
              )
            }
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="w-1/4 p-4 border-l overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Questions</h2>
         <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-500 dark:bg-green-700 mr-2"></span>Answered</div>
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-red-500 dark:bg-red-700 mr-2"></span>Not Answered</div>
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-600 mr-2"></span>Not Visited</div>
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-yellow-500 dark:bg-yellow-600 mr-2"></span>Review Later</div>
            <div className="flex items-center col-span-2"><span className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></span>Answered & Marked for Review</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {questions.map((q, index) => (
            <Button
              key={q.id}
              variant={
                currentQuestionIndex === index ? "default" : "outline"
              }
              className={`w-12 h-12 ${getStatusColor(questionStatus[q.id])} ${currentQuestionIndex === index ? "ring-2 ring-primary" : ""}`}
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