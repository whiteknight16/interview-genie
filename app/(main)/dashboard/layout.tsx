import React from "react";
import { Suspense } from "react";
import Loading from "../../../components/Loading";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-4xl bg-white-800 dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h1 className="text-2xl  text-center dark:text-white font-bold">
          Industry <span className="text-primary ">Insights</span>
        </h1>
      </div>
      <div className="w-full max-w-4xl mt-6">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}

export default DashboardLayout;
