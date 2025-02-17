import React from "react";

function Footer() {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900">
      © {new Date().getFullYear()} All Rights Reserved.
    </footer>
  );
}

export default Footer;
