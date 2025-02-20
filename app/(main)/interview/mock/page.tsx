import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuizComponent from "../../_components/QuizComponent";

function MockInterviewPage() {
  return (
    <div>
      <div>
        <Link href={"/interview"}>
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        <QuizComponent />
      </div>
    </div>
  );
}

export default MockInterviewPage;
