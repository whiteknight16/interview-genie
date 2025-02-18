import React from "react";
import Footer from "@/components/Footer";
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
