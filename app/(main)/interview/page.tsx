import { getAssessments } from "@/actions/interview";
import StatsCards from "../_components/StatsCards";
import PerformanceChart from "../_components/PerformanceChart";
import QuizList from "../_components/QuizList";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div>
      <div className="flex items-center justify-between mb-5"></div>
      <div className="space-y-6 mb-16">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
