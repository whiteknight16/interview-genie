import React from "react";
import { Suspense } from "react";
import Loading from "../../../components/Loading";

function CoverLetterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white flex flex-col items-center px-2 py-2">
      <div className="w-full max-w-7xl bg-white-800 dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h1 className="text-2xl  text-center dark:text-white font-bold">
          Cover<span className="text-primary ">Letter</span>
        </h1>
      </div>
      <div className="w-full max-w-7xl">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}

export default CoverLetterLayout;
