import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizResultProps {
  result: {
    quizScore: number;
    improvementTip?: string;
    questions: {
      question: string;
      userAnswer: string;
      answer: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
  hideStartNew?: boolean;
  onStartNew: () => void;
}

function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}: QuizResultProps) {
  if (!result) return null;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Title */}
      <h1 className="flex items-center gap-2 text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <Card className="mt-4 dark:bg-gray-900 bg-white shadow-lg dark:border-gray-700 border-gray-200 mb-16">
        <CardContent className="space-y-6">
          {/* Score Overview */}
          <div className="text-center space-y-3 ">
            <h3 className="text-2xl font-bold mt-3">
              {result.quizScore.toFixed(1)}%
            </h3>
            <Progress value={result.quizScore} className="w-full" />
          </div>

          {/* Improvement Tip */}
          {result.improvementTip && (
            <div className="dark:bg-gray-800 bg-gray-100 p-4 rounded-lg">
              <p className="font-medium dark:text-gray-300">Improvement Tip:</p>
              <p className="text-gray-600 dark:text-gray-400">
                {result.improvementTip}
              </p>
            </div>
          )}

          {/* Questions Review */}
          <div className="space-y-4">
            <h3 className="font-medium dark:text-gray-300">Question Review</h3>
            {result.questions.map((q, index) => (
              <div
                key={index}
                className="border dark:border-gray-700 rounded-lg p-4 space-y-2 dark:bg-gray-800"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium dark:text-gray-300">{q.question}</p>
                  {q.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Your answer: {q.userAnswer}</p>
                  {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
                </div>
                <div className="text-sm dark:bg-gray-700 bg-gray-200 p-2 rounded">
                  <p className="font-medium dark:text-gray-300">Explanation:</p>
                  <p className="dark:text-gray-400">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        {!hideStartNew && (
          <CardFooter>
            <Button onClick={onStartNew} className="w-full">
              Start New Quiz
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default QuizResult;
