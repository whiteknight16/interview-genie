import { getResume } from "@/actions/resume";
import ResumeBuilder from "../_components/ResumeBuilder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6 mb-16">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
