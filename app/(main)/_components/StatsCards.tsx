import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Average Score Card */}
      <Card className="dark:bg-gray-900 bg-white shadow-md dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium dark:text-gray-300">
            Average Score
          </CardTitle>
          <Trophy className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-gray-200">
            {getAverageScore()}%
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      {/* Questions Practiced Card */}
      <Card className="dark:bg-gray-900 bg-white shadow-md dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium dark:text-gray-300">
            Questions Practiced
          </CardTitle>
          <Brain className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-gray-200">
            {getTotalQuestions()}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Total questions
          </p>
        </CardContent>
      </Card>

      {/* Latest Score Card */}
      <Card className="dark:bg-gray-900 bg-white shadow-md dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium dark:text-gray-300">
            Latest Score
          </CardTitle>
          <Target className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-gray-200">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Most recent quiz
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
