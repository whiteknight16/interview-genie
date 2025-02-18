import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
