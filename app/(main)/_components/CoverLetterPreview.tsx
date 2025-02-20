"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-4 dark:bg-gray-900 dark:text-white">
      <MDEditor
        value={content}
        preview="preview"
        height={700}
        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
};

export default CoverLetterPreview;
