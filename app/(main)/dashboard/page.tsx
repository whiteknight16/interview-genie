import React from "react";
import { getOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
async function DashboardPage() {
  const { isOnboarded } = await getOnBoardingStatus();
  if (!isOnboarded) {
    //Redirect to dashboard
    redirect("/onboarding");
  }
  return <div>Dashboard</div>;
}

export default DashboardPage;
