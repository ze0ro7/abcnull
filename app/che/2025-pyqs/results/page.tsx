'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const SectionPerformanceChart = dynamic(() => 
  import('@/app/components/charts').then(mod => mod.SectionPerformanceChart),
  {
    ssr: false,
    loading: () => <p>Loading chart...</p>
  }
)

const ResultsPage = () => {
  const [results, setResults] = useState(null)
  const [score, setScore] = useState(0)
  const [topicAnalysis, setTopicAnalysis] = useState({ weakTopics: [], strongTopics: [] })
  const [sectionPerformance, setSectionPerformance] = useState([]);

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults')
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults)
      setResults(parsedResults)

      let calculatedScore = 0
      const topicPerformance = {}
      const sectionData = {}

      parsedResults.questions.forEach(q => {
        const isCorrect = q.correctAnswer === parsedResults.answers[q.id]
        
        if (!topicPerformance[q.topic]) {
          topicPerformance[q.topic] = { correct: 0, total: 0 }
        }
        topicPerformance[q.topic].total += 1

        if (!sectionData[q.section]) {
          sectionData[q.section] = { correct: 0, total: 0, color: q.section.includes("Aptitude") ? '#8884d8' : '#82ca9d' };
        }
        sectionData[q.section].total += 1;

        if (isCorrect) {
          calculatedScore += q.marks
          topicPerformance[q.topic].correct += 1
          sectionData[q.section].correct += 1;
        }
      })

      setScore(calculatedScore)
      
      const sectionArray = Object.keys(sectionData).map(key => ({
          name: key,
          ...sectionData[key]
      }));
      setSectionPerformance(sectionArray);

      const weakTopics = []
      const strongTopics = []
      for (const topic in topicPerformance) {
        const accuracy = (topicPerformance[topic].correct / topicPerformance[topic].total) * 100
        if (accuracy < 50) {
          weakTopics.push(topic)
        } else if (accuracy > 80) {
          strongTopics.push(topic)
        }
      }
      setTopicAnalysis({ weakTopics, strongTopics })
    }
  }, [])

  if (!results) {
    return <div className="flex items-center justify-center h-screen">Loading results...</div>
  }

  const getStatusText = (status) => {
      switch(status) {
          case 'answered': return 'Answered';
          case 'notAnswered': return 'Not Answered';
          case 'reviewLater': return 'Marked for Review';
          case 'answeredAndReview': return 'Answered & Marked for Review';
          case 'notVisited': return 'Not Visited';
          default: return 'Not Visited';
      }
  }

  const getQuestionStatus = (question) => {
      if (results.statuses && results.statuses[question.id]) {
          return getStatusText(results.statuses[question.id]);
      }
      // Fallback for old data without statuses
      if (results.answers && results.answers[question.id]) {
          return 'Answered';
      }
      return 'Not Answered';
  }

  const correctAnswers = results.questions.filter(q => q.correctAnswer === results.answers[q.id]).length
  const attemptedQuestions = results.answers ? Object.keys(results.answers).length : 0;
  const accuracy = attemptedQuestions > 0 ? (correctAnswers / attemptedQuestions) * 100 : 0;

  return (
    <div className="container mx-auto p-4 sm:p-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Test Results & Analytics</h1>
             <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
            </Link>
        </div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{score} / 100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Time Taken</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{Math.floor(results.timeTaken / 60)} mins</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {accuracy.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Section Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SectionPerformanceChart data={sectionPerformance} />
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Topic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Strong Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {topicAnalysis.strongTopics.map(topic => (
                            <span key={topic} className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{topic}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-2">Weak Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {topicAnalysis.weakTopics.map(topic => (
                            <span key={topic} className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{topic}</span>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Question-wise Analysis</CardTitle>
        </CardHeader>
        <CardContent>
            {results.questions.map((q, index) => (
                <div key={q.id} className="mb-4 border-b pb-4">
                    <p className="font-semibold">Q{index+1}: {q.questionText}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-sm">
                        <p><span className="font-medium">Your Answer: </span> {results.answers[q.id] ? results.answers[q.id] : 'Not Answered'}</p>
                        <p><span className="font-medium">Correct Answer: </span> {q.correctAnswer}</p>
                        <p><span className="font-medium">Status: </span> {getQuestionStatus(q)}</p>
                    </div>
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default ResultsPage
